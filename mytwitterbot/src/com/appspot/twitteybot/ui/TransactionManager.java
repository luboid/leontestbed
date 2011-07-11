package com.appspot.twitteybot.ui;

import com.appspot.twitteybot.datastore.AppUser;
import com.appspot.twitteybot.datastore.ApplicationProperty;
import com.appspot.twitteybot.datastore.DsHelper;
import com.appspot.twitteybot.datastore.PMF;
import com.appspot.twitteybot.datastore.Transact;
import com.appspot.twitteybot.datastore.TwitterStatus;
import com.appspot.twitteybot.datastore.AppUser.PayType;
import com.appspot.twitteybot.datastore.Transact.TxnState;
import com.appspot.twitteybot.pay.PaypalStandard;
import com.google.appengine.api.users.User;
import freemarker.template.TemplateException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
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
//            resp.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
//            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
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
        } else if (action.equalsIgnoreCase(Pages.PARAM_TXN_ACTION_PAYPAL_RETURN)) {
            this.processPaypalReturn(req, resp, pm);   
        } else if (action.equalsIgnoreCase(Pages.PARAM_TXN_ACTION_PAYPAL_NOTIFY)) {
            this.processPaypalNotify(req, resp, pm);             
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
        User user = AuthFilter.getCurrentUser(req).getOpenId();
        List<Transact> list = DsHelper.getTransactList(false, req.getParameter(Pages.PARAM_SCREENNAME), pm, start, end, user);
        this.constructResponse(list,
                "Showing " + (end - start) + " transactions", LEVEL_INFO, req,  resp, start, end);
    }
    private void processPayTxn(HttpServletRequest req, HttpServletResponse resp, PersistenceManager pm) throws IOException {
        // test only
        long txnId = getTxnId(req);
        
        User user = AuthFilter.getCurrentUser(req).getOpenId();
        Transact transact = txnPaySucceeded(txnId, pm);
        log.info("DummyTesting: transaction="+txnId+" is paid and confirmed.");
        
        this.constructResponse(DsHelper.getTransactList(false, req.getParameter(Pages.PARAM_SCREENNAME), pm, 0, PAGE_SIZE, user),
                "Showing " + PAGE_SIZE + " transactions", LEVEL_INFO, req, resp, 0, PAGE_SIZE);
        
    }
    
    private Transact txnPaySucceeded(long txnId, PersistenceManager pm) {
        Transact transact = DsHelper.getTransact(txnId, pm);
        if(transact.getTxnState()==TxnState.PAID) {
            // already marked as paid. This is to handle the case of receiving multiple NOTIFY from PayPal
            return transact;
        }
        if(transact!=null) {
            
            List<TwitterStatus> statuss = DsHelper.getTwitterStatus(txnId, pm, -1, -1);
            for(TwitterStatus ts : statuss) {
                ts.setState(TwitterStatus.State.SCHEDULED);
            }
            // TODO make it transaction??
            // this won't work as not in same group
            // currently overcome it by set datanucleus.appengine.autoCreateDatastoreTxns=false in jdoconfig.xml, see appengine doc
            pm.makePersistentAll(statuss);
//            for(TwitterStatus ts : statuss) {
//                pm.makePersistent(ts);
//            }
            transact.setTxnState(TxnState.PAID);
            pm.makePersistent(transact);
        }        
        return transact;
    }
    
    private void processPaypalReturn(HttpServletRequest req, HttpServletResponse resp, PersistenceManager pm) throws IOException {
        // back from paypal
        long txnId = getTxnId(req);
        Transact transact = txnPaySucceeded(txnId, pm);
        log.warning("Returned from Paypal for transaction="+txnId+". queryString="+req.getQueryString());
        showConfirmPage(transact, resp);
        
    }
    
    private void processPaypalNotify(HttpServletRequest req, HttpServletResponse resp, PersistenceManager pm) throws IOException {
        // Refer to PayPal Document: 5_PayPal_IPN&PDT_Guide_V1.0.pdf
        long txnId = getTxnId(req);
        Enumeration en = req.getParameterNames();
        String str = "cmd=_notify-validate";
        while(en.hasMoreElements()){
            String paramName = (String)en.nextElement();
            String paramValue = req.getParameter(paramName);
            str = str + "&" + paramName + "=" + URLEncoder.encode(paramValue, "iso-8859-1");
        }
        log.warning("Will post back to verify: Received Notfification from Paypal for transaction="+txnId+". paras="+str);
        
        //将信息 POST 回给 PayPal 进行验证
        //设置 HTTP 的头信息
        //在 Sandbox 情况下，设置：
        String url = ApplicationProperty.usePayPalTestBed() ? 
                "http://www.sandbox.paypal.com/cgi-bin/webscr" :
                    "http://www.paypal.com/cgi-bin/webscr";  
        URL u = new URL(url);
        URLConnection uc = u.openConnection();
        uc.setDoOutput(true);
        uc.setRequestProperty("Content-Type","application/x-www-form-urlencoded");
        PrintWriter pw = new PrintWriter(uc.getOutputStream());
        pw.println(str);
        pw.close();
        //接受 PayPal 对 IPN 回发的回复信息
        BufferedReader in= new BufferedReader(new InputStreamReader(uc.getInputStream()));
        String res = in.readLine();
        in.close();

        //将 POST 信息分配给本地变量，可以根据您的需要添加
        //该付款明细所有变量可参考：
        //https://www.paypal.com/IntegrationCenter/ic_ipn-pdt-variable-reference.html
        String itemName = req.getParameter("item_name");
        String itemNumber = req.getParameter("item_number");
        String paymentStatus = req.getParameter("payment_status");
        String paymentAmount = req.getParameter("mc_gross");
        String paymentCurrency = req.getParameter("mc_currency");
        String txn_Id = req.getParameter("txn_id");
        String receiverEmail = req.getParameter("receiver_email");
        String payerEmail = req.getParameter("payer_email");
        
        boolean success = false;
        //…
        //获取 PayPal 对回发信息的回复信息，判断刚才的通知是否为 PayPal 发出的
        if(res.equals("VERIFIED")) {
        //检查付款状态
        //检查 txn_id 是否已经处理过
        //检查 receiver_email 是否是您的 PayPal 账户中的 EMAIL 地址
        //检查付款金额和货币单位是否正确
        //处理其他数据，包括写数据库
            log.warning("Validation check succeeded for Notfification received from Paypal for transaction="+txnId);
            
            if("Completed".equalsIgnoreCase(paymentStatus)) {
                txnPaySucceeded(txnId, pm);
                success = true;
            }
        }else if(res.equals("INVALID")) {
        //非法信息，可以将此记录到您的日志文件中以备调查
            log.warning("Validation check failed for Notfification received from Paypal for transaction="+txnId+", paras="+str);
        }else {
        //处理其他错误
            log.warning("Validation check failed with unknown reason for Notfification received from Paypal for transaction="+txnId+", paras="+str+", res="+res);
        }
        
        if(!success) {
            // return 400 error
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
        }
        else {
            // return OK
            resp.getOutputStream().write("OK".getBytes());
        }
    }
    
    
    
    private void showConfirmPage(Transact transact, HttpServletResponse resp) throws IOException {
        log.info("showConfirmPage!!!!!!");
        Map<String, Object> templateValues = new HashMap<String, Object>();
        templateValues.put(Pages.FTLVAR_TWITTER_TXN, transact);
        FreeMarkerConfiguration.writeResponse(templateValues, Pages.TEMPLATE_CONFIRM_PAYPAL, resp.getWriter());
    }    
    
    private void processCancelOne(HttpServletRequest req, HttpServletResponse resp, PersistenceManager pm) throws IOException {
        User user = AuthFilter.getCurrentUser(req).getOpenId();
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
        User user = AuthFilter.getCurrentUser(req).getOpenId();
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
        AppUser appUser = AuthFilter.getCurrentUser(req);
        User user = appUser.getOpenId();
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
                transact.setAmount(PayType.FREE==appUser.getPayType()? 0 : transact.getUnitPrice() * size);
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
        AppUser appUser = AuthFilter.getCurrentUser(req);
        User user = appUser.getOpenId();

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
            txn.setAmount(PayType.FREE==appUser.getPayType()? 0 : size * txn.getUnitPrice());
            
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
        AppUser appUser = AuthFilter.getCurrentUser(req);
        Map<String, Object> templateValues = new HashMap<String, Object>();
        templateValues.put(Pages.FTLVAR_ISTESTING, ApplicationProperty.isTesting());
        templateValues.put(Pages.FTLVAR_ISUSER_BANNED, appUser.isBanned());
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
