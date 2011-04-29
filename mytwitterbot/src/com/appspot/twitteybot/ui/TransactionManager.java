package com.appspot.twitteybot.ui;

import com.appspot.twitteybot.datastore.DsHelper;
import com.appspot.twitteybot.datastore.PMF;
import com.appspot.twitteybot.datastore.Transact;
import com.appspot.twitteybot.datastore.TwitterStatus;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserServiceFactory;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
public class TransactionManager extends HttpServlet {
    private static final String LEVEL_INFO = "info";
    private static final String LEVEL_ERROR = "error";
    private static final String LEVEL_WARN = "warn";
    private static final long PAGE_SIZE = 30;    
    private static final Logger log = Logger.getLogger(TransactionManager.class.getName());
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String action = req.getParameter(Pages.PARAM_ACTION);
        log.info("action"+action);
        if (action == null) {
            resp.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        } else if (action.equalsIgnoreCase(Pages.PARAM_TXN_ACTION_ADD)) {
            this.processAdd(req, resp);
        } else if (action.equalsIgnoreCase(Pages.PARAM_TXN_ACTION_SHOW)) {
            this.processShow(req, resp);   
        } else if (action.equalsIgnoreCase(Pages.PARAM_TXN_ACTION_CANCEL)) {
            this.processCancel(req, resp);              
        } else {
            resp.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        }
    }
    
    private void processShow(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        PersistenceManager pm = PMF.get().getPersistenceManager();
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
        this.constructResponse(DsHelper.getTransactList(false, req.getParameter(Pages.PARAM_SCREENNAME), pm, start, end),
                "Showing " + (end - start) + " transactions", LEVEL_INFO, resp, start, end);
        pm.close();
    }
    
    private void processCancel(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        long txnId = -1;
        try {
            txnId = Long.parseLong(req.getParameter(Pages.PARAM_TXN_ID));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        
        PersistenceManager pm = PMF.get().getPersistenceManager();
        Transact transact = DsHelper.getTransact(txnId, pm);
        List<TwitterStatus> tweets = DsHelper.getTwitterStatus(txnId, pm, -1, -1);
        pm.deletePersistentAll(tweets);
        pm.deletePersistent(transact);
        
        this.constructResponse(DsHelper.getTransactList(false, req.getParameter(Pages.PARAM_SCREENNAME), pm, 0, PAGE_SIZE),
                "Showing " + PAGE_SIZE + " transactions", LEVEL_INFO, resp, 0, PAGE_SIZE);
        pm.close();
        
    }
    private void processAdd(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        int totalItems = Integer.parseInt(req.getParameter(Pages.PARAM_TOTAL_ITEMS));
        PersistenceManager pm = PMF.get().getPersistenceManager();
        String screenName = req.getParameter(Pages.PARAM_SCREENNAME);
        User user = UserServiceFactory.getUserService().getCurrentUser();

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
            txn.setUnitPrice(Const.UNIT_PRICE);
            txn.setUpdatedTime(new Date());        
            txn.setUser(UserServiceFactory.getUserService().getCurrentUser());
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
        
        List<Transact> unPaidTransact = getTransactList(false, screenName, pm);
//        this.constructResponse(this.getTwitterStatus(screenName, pm), message, level, resp);
        this.constructResponse(unPaidTransact, message, level, resp);
        pm.close();
    }
    private void constructResponse(List<Transact> list, String message, String level, HttpServletResponse resp,
            long start, long end) throws IOException {
        log.info("constructResponse!!!!!!");
        Map<String, Object> templateValues = new HashMap<String, Object>();
        templateValues.put(Pages.FTLVAR_TXN, list);
        templateValues.put(Pages.FTLVAR_TXN_LEVEL, level);
        templateValues.put(Pages.FTLVAR_TXN_START, start);
        templateValues.put(Pages.FTLVAR_TXN_END, start + list.size());
        templateValues.put(Pages.FTLVAR_TXN_MESSAGE, message);
        FreeMarkerConfiguration.writeResponse(templateValues, Pages.TEMPLATE_TXNPAGE, resp.getWriter());
    }
    
    private void constructResponse(List<Transact> list, String message,
            String level, HttpServletResponse resp) throws IOException {
        this.constructResponse(list, message, level, resp, 0, PAGE_SIZE);
    }
    
    private boolean getBoolFromParam(String param, String trueValue) {
        if (param != null && param.equals(trueValue)) {
            return true;
        } else {
            return false;
        }
    }
    
    private List<Transact> getTransactList(boolean getpaid, String screenName, PersistenceManager pm) {
        return DsHelper.getTransactList(getpaid, screenName, pm, 0, PAGE_SIZE);
    }
}
