package com.appspot.twitteybot.ui;

import com.appspot.twitteybot.datastore.ApplicationProperty;
import com.appspot.twitteybot.datastore.DsHelper;
import com.appspot.twitteybot.datastore.PMF;
import com.appspot.twitteybot.datastore.Transact;
import com.appspot.twitteybot.datastore.TwitterStatus;
import com.appspot.twitteybot.datastore.Transact.TxnState;
import com.appspot.twitteybot.pay.PaypalStandard;
import com.google.appengine.api.users.User;
import freemarker.template.TemplateException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.datanucleus.util.StringUtils;
public class TransactionManager extends BaseServlet {
    private static final String LEVEL_INFO = "info";
    private static final String LEVEL_ERROR = "error";
    private static final String LEVEL_WARN = "warn";
    private static final Logger log = Logger.getLogger(TransactionManager.class.getName());
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String action = req.getParameter(Pages.PARAM_ACTION);
        PersistenceManager pm = PMF.get().getPersistenceManager();
        pm.currentTransaction().begin();
        String twitterScreenName = req.getParameter(Pages.PARAM_SCREENNAME);
        if(StringUtils.isEmpty(twitterScreenName)) {
            throw new RuntimeException("twitterScreenName is empty, sth wrong...");
        }
        
        String txnId =null;
        try {
            txnId = req.getParameter(Pages.PARAM_TXN_ID);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        log.warning("action=="+action+", txnId="+txnId);
        
        try {
        if (action == null) {
            resp.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        } else if (action.equalsIgnoreCase(Pages.PARAM_TXN_ACTION_ADD)) {
            this.processAdd(req, resp, pm);
        } else if (action.equalsIgnoreCase(Pages.PARAM_TXN_ACTION_SHOW)) {
            this.processShow(req, resp, pm);   
        } else if (action.equalsIgnoreCase(Pages.PARAM_TXN_ACTION_CANCEL)) {
            this.processCancel(req, resp, pm);     
        } else if (action.equalsIgnoreCase(Pages.PARAM_TXN_ACTION_CANCELONE)) {
            this.processCancelOne(req, resp, pm);            
        } else if (action.equalsIgnoreCase(Pages.PARAM_TXN_ACTION_MERGE)) {
            this.processMerge(req, resp, pm);               
        } else if (action.equalsIgnoreCase(Pages.PARAM_TXN_ACTION_PAYTXN)) {
            this.processPayTxn(req, resp, pm);                      
//        } else if (action.equalsIgnoreCase(Pages.PARAM_ACTION_DELETE ) || action.equalsIgnoreCase(Pages.PARAM_ACTION_UPDATE) ) {
//            // forwarded to here when submitting from StatusManage with txnId
//            // recalculate the txn amount and show the statusOftxn page
//            this.processUpdateTxn(req, resp);
        } else if (action.equalsIgnoreCase(Pages.PARAM_TXN_ACTION_CONFIRM_PAYPAL)) {
            this.processConfirmPayTxn(req, resp, pm);           
        } else {
            resp.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        }
        } finally {
            if(pm!=null) {
                pm.currentTransaction().commit();
                pm.close();
            }
        }
    }
    
    private void processShow(HttpServletRequest req, HttpServletResponse resp, PersistenceManager pm) throws IOException {
        long start = 0;
        long end = PAGE_SIZE;
        try {
            start = Long.parseLong(req.getParameter(Pages.PARAM_START));
        } catch (NumberFormatException e) {
        }
        try {
            end = Long.parseLong(req.getParameter(Pages.PARAM_END));
        } catch (NumberFormatException e) {
        }
        User user = AuthFilter.getCurrentUser(req);
        List<Transact> list = DsHelper.getTransactList(false, req.getParameter(Pages.PARAM_SCREENNAME), pm, start, end, user);
        this.constructResponse(list,
                "Showing " + (end - start) + " transactions", LEVEL_INFO, req,  resp, start, end);
    }
    private void processPayTxn(HttpServletRequest req, HttpServletResponse resp, PersistenceManager pm) throws IOException {
        // test only
        long txnId = -1;
        try {
            txnId = Long.parseLong(req.getParameter(Pages.PARAM_TXN_ID));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        
        User user = AuthFilter.getCurrentUser(req);
        Transact transact = DsHelper.getTransact(txnId, pm);
        
        List<TwitterStatus> statuss = DsHelper.getTwitterStatus(txnId, pm, -1, -1);
        for(TwitterStatus ts : statuss) {
            ts.setState(TwitterStatus.State.SCHEDULED);
        }
        // TODO make it transaction??
        // this won't work as not in same group
        // currently overcome it by set datanucleus.appengine.autoCreateDatastoreTxns=false in jdoconfig.xml, see appengine doc
        pm.makePersistentAll(statuss);
//        for(TwitterStatus ts : statuss) {
//            pm.makePersistent(ts);
//        }
        
        transact.setTxnState(TxnState.PAID);
        pm.makePersistent(transact);
        
        log.info("transaction="+txnId+" is paid and confirmed.");
        
        this.constructResponse(DsHelper.getTransactList(false, req.getParameter(Pages.PARAM_SCREENNAME), pm, 0, PAGE_SIZE, user),
                "Showing " + PAGE_SIZE + " transactions", LEVEL_INFO, req, resp, 0, PAGE_SIZE);
        
    }
    
    private void processConfirmPayTxn(HttpServletRequest req, HttpServletResponse resp, PersistenceManager pm) throws IOException {
        // back from paypal
        long txnId = -1;
        try {
            txnId = Long.parseLong(req.getParameter(Pages.PARAM_TXN_ID));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        
        Transact transact = DsHelper.getTransact(txnId, pm);
        if(transact!=null) {
            
            List<TwitterStatus> statuss = DsHelper.getTwitterStatus(txnId, pm, -1, -1);
            for(TwitterStatus ts : statuss) {
                ts.setState(TwitterStatus.State.SCHEDULED);
            }
            pm.makePersistentAll(statuss);
            transact.setTxnState(TxnState.PAID);
            pm.makePersistent(transact);
            log.warning("transaction="+txnId+" is paid and confirmed. queryString="+req.getQueryString());
        }
        
        showConfirmPage(transact, resp);
        
    }
    private void showConfirmPage(Transact transact, HttpServletResponse resp) throws IOException {
        log.info("showConfirmPage!!!!!!");
        Map<String, Object> templateValues = new HashMap<String, Object>();
        templateValues.put(Pages.FTLVAR_TWITTER_TXN, transact);
        FreeMarkerConfiguration.writeResponse(templateValues, Pages.TEMPLATE_CONFIRM_PAYPAL, resp.getWriter());
    }    
    
    private void processCancelOne(HttpServletRequest req, HttpServletResponse resp, PersistenceManager pm) throws IOException {
        User user = AuthFilter.getCurrentUser(req);
        long txnId = getTxnId(req);
        Transact transact = DsHelper.getTransact(txnId, pm);
        List<TwitterStatus> tweets = DsHelper.getTwitterStatus(txnId, pm, -1, -1);
        pm.deletePersistentAll(tweets);
        pm.deletePersistent(transact);                

        List<Transact> list = DsHelper.getTransactList(false, req.getParameter(Pages.PARAM_SCREENNAME), pm, 0, PAGE_SIZE, user);
        String message = "transaction "+txnId + " is cancelled";
        this.constructResponse(list,
                message, LEVEL_INFO, req, resp, 0, PAGE_SIZE);
        
    }
    
    
    private void processCancel(HttpServletRequest req, HttpServletResponse resp, PersistenceManager pm) throws IOException {
        User user = AuthFilter.getCurrentUser(req);
        int totalItems = Integer.parseInt(req.getParameter(Pages.PARAM_TOTAL_ITEMS));
        int count=0;
        for (int i = 0; i <= totalItems; i++) {
            if (this.getBoolFromParam(req.getParameter(Pages.PARAM_STATUS_CANADD + i), "on")) {
                count++;
                long txnId = getLongPara(req, Pages.PARAM_STATUS_KEY + i, NO_TXN);
                Transact transact = DsHelper.getTransact(txnId, pm);
                List<TwitterStatus> tweets = DsHelper.getTwitterStatus(txnId, pm, -1, -1);
                pm.deletePersistentAll(tweets);
                pm.deletePersistent(transact);                
            }
        }
        List<Transact> list = DsHelper.getTransactList(false, req.getParameter(Pages.PARAM_SCREENNAME), pm, 0, PAGE_SIZE, user);
        String message = count+" transactions cancelled";
        this.constructResponse(list, message, LEVEL_INFO, req, resp, 0, PAGE_SIZE);
        
    }
    
    private void processMerge(HttpServletRequest req, HttpServletResponse resp, PersistenceManager pm) throws IOException {
        User user = AuthFilter.getCurrentUser(req);
        int totalItems = Integer.parseInt(req.getParameter(Pages.PARAM_TOTAL_ITEMS));
        
        List<Transact> transToDelete = new ArrayList<Transact>();
        Transact transToMergeTo = null;
        List<Transact> transList = new ArrayList<Transact>();
        List<TwitterStatus> tweetsList = new ArrayList<TwitterStatus>();
        for (int i = 0; i <= totalItems; i++) {
            if (this.getBoolFromParam(req.getParameter(Pages.PARAM_STATUS_CANADD + i), "on")) {
                long txnId = getLongPara(req, Pages.PARAM_STATUS_KEY + i, NO_TXN);
                Transact transact = DsHelper.getTransact(txnId, pm);
                List<TwitterStatus> tweets = DsHelper.getTwitterStatus(txnId, pm, -1, -1);
                tweetsList.addAll(tweets);
                transList.add(transact);                
            }
        }
        
        int i=0;
        if(transList.size()>1) {
        for (Transact transact : transList) {
            i++;
            if (i == 1) {
                transToMergeTo = transact;
                // merge into the first
                long txnId = transact.getKeyId();
                for (TwitterStatus tweet : tweetsList) {
                    tweet.setTransactionId(txnId);
                }
                // re-calculate
                int size = tweetsList.size();
                transact.setNumberOfStatus(size);
                transact.setAmount(transact.getUnitPrice() * size);
            } else {
                transToDelete.add(transact);
            }
        }
        pm.makePersistentAll(tweetsList);
        pm.makePersistent(transToMergeTo);
        pm.deletePersistentAll(transToDelete);
        }
        String message = i +" transactions merged"; 
        List<Transact> list = DsHelper.getTransactList(false, req.getParameter(Pages.PARAM_SCREENNAME), pm, 0, PAGE_SIZE, user);

        this.constructResponse(list,message, LEVEL_INFO, req, resp, 0, PAGE_SIZE);
        
    }
    
    private void processAdd(HttpServletRequest req, HttpServletResponse resp, PersistenceManager pm) throws IOException {
        int totalItems = Integer.parseInt(req.getParameter(Pages.PARAM_TOTAL_ITEMS));
        String screenName = req.getParameter(Pages.PARAM_SCREENNAME);
        User user = AuthFilter.getCurrentUser(req);

        String message = null;
        String level = LEVEL_INFO;

        if (screenName == null || screenName == "") {
            message = "Twitter Screen Name was null and hence, could not add tweets";
            level = LEVEL_ERROR;
            log.log(Level.SEVERE, "ScerenName supplied was null");
        } else {
            
            List<TwitterStatus> twitterStatuses = new ArrayList<TwitterStatus>();
            int failedTweetCount = 0;
            for (int i = 0; i <= totalItems; i++) {
                if (this.getBoolFromParam(req.getParameter(Pages.PARAM_STATUS_CANADD + i), "on")) {
                    try {
                        
                        twitterStatuses.add(new TwitterStatus(user, screenName, req
                                .getParameter(Pages.PARAM_STATUS_SOURCE + i), req
                                .getParameter(Pages.PARAM_STATUS_UPDATE_DATE + i), req
                                .getParameter(Pages.PARAM_STATUS_STATUS + i), this.getBoolFromParam(
                                req.getParameter(Pages.PARAM_STATUS_CAN_DELETE + i), "on")));
                        
                    } catch (RuntimeException e) {
                        message = "There were errors parsing the time for tweets." + (++failedTweetCount)
                                + " tweets were not added.";
                        level = LEVEL_WARN;
                        log.log(Level.WARNING, "Could not add " + req.getParameter(Pages.PARAM_STATUS_UPDATE_DATE + i)
                                + " as parsing failed");
                    }
                }
            }
            if (message == null) {
                message = twitterStatuses.size() + " Tweets Successfully added to this account.";
            }
            
            int size = twitterStatuses.size();
            
            Transact txn = new Transact();
            txn.setCreatedTime(new Date());            
            txn.setNumberOfStatus(size);
            txn.setTxnState(Transact.TxnState.UNPAID);
            txn.setTwitterScreenName(screenName);
            txn.setUnitPrice(ApplicationProperty.getUnitPrice());
            txn.setUpdatedTime(new Date());        
            txn.setUser(user);
            txn.setAmount(size * txn.getUnitPrice());
            
            pm.makePersistent(txn);
            
            String encodedKey = txn.getEncodedKey();
            long key = txn.getKeyId();
            log.info("encodedKey"+encodedKey+", key="+key);
            
            for(TwitterStatus status : twitterStatuses) {
                status.setTransactionId(key);
            }
//            txn.set
            pm.makePersistentAll(twitterStatuses);
        }
        
        List<Transact> unPaidTransact = getTransactList(false, screenName, pm, user);
//        this.constructResponse(this.getTwitterStatus(screenName, pm), message, level, resp);

        this.constructResponse(unPaidTransact, message, level, req, resp);
    }
    private void constructResponse(List<Transact> list, String message, String level, HttpServletRequest req, HttpServletResponse resp,
            long start, long end) throws IOException {
        log.info("constructResponse!!!!!!");
        try {
            PaypalStandard.renderPaypalButton(list, req.getServerName());
        } catch (TemplateException e) {
            log.log(Level.WARNING, "PaypalStandard.renderPaypalButton", e);
            e.printStackTrace(resp.getWriter());
        }
        Map<String, Object> templateValues = new HashMap<String, Object>();
        templateValues.put(Pages.FTLVAR_TXN, list);
        templateValues.put(Pages.FTLVAR_TXN_LEVEL, level);
        templateValues.put(Pages.FTLVAR_TXN_START, start);
        templateValues.put(Pages.FTLVAR_TXN_END, start + list.size());
        templateValues.put(Pages.FTLVAR_TXN_MESSAGE, message);
        FreeMarkerConfiguration.writeResponse(templateValues, Pages.TEMPLATE_TXNPAGE, resp.getWriter());
    }
    
    private void constructResponse(List<Transact> list, String message,
            String level, HttpServletRequest req, HttpServletResponse resp) throws IOException {
        this.constructResponse(list, message, level, req, resp, 0, PAGE_SIZE);
    }
    
    private boolean getBoolFromParam(String param, String trueValue) {
        if (param != null && param.equals(trueValue)) {
            return true;
        } else {
            return false;
        }
    }
    
    private List<Transact> getTransactList(boolean getpaid, String screenName, PersistenceManager pm, User user) {
        return DsHelper.getTransactList(getpaid, screenName, pm, 0, PAGE_SIZE, user);
    }
}
