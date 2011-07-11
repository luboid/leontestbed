package com.appspot.twitteybot.pay;

import com.appspot.twitteybot.datastore.ApplicationProperty;
import com.appspot.twitteybot.datastore.Transact;
import com.appspot.twitteybot.ui.FreeMarkerConfiguration;
import com.appspot.twitteybot.ui.Pages;
import com.appspot.twitteybot.ui.TransactionManager;
import freemarker.template.TemplateException;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

public class PaypalStandard extends Pay{
    
    public static final String VAR_SELLER = "seller";
    public static final String VAR_GOODSNAME = "goodsName";
    public static final String VAR_AMOUNT = "amount";
    public static final String VAR_CURRENCY = "currency";
    public static final String VAR_LOCATION = "location";
    public static final String VAR_RETURN = "returnUrl";
    public static final String VAR_NOTIFY = "notifyUrl";    
    public static final String VAR_TESTBED = "testBed";


    
    
    private static final Logger log = Logger.getLogger(TransactionManager.class.getName());
    
    private static String constructResponse(Transact transact, String serverName) throws TemplateException, IOException {
        log.info("constructResponse!!!!!!");
        Map<String, Object> templateValues = new HashMap<String, Object>();
        templateValues.put(VAR_SELLER, ApplicationProperty.getPayeeAccount());
        templateValues.put(VAR_GOODSNAME, transact.getNumberOfStatus() + " status from tweetbot");
        templateValues.put(VAR_AMOUNT, transact.getAmount());
        templateValues.put(VAR_CURRENCY, "USD");
        templateValues.put(VAR_LOCATION, "US");
        templateValues.put(VAR_TESTBED, ApplicationProperty.usePayPalTestBed());
        StringBuffer returnUrl = new StringBuffer().append(
            "http://").append(serverName).append("/pages/transaction?action=").append(Pages.PARAM_TXN_ACTION_PAYPAL_RETURN)
            .append("&").append(Pages.PARAM_TXN_ID).append("=").append(transact.getKeyId());
        
        templateValues.put(VAR_RETURN, returnUrl.toString());
        
        StringBuffer notifyUrl = new StringBuffer().append(
            "http://").append(serverName).append("/paypal?action=").append(Pages.PARAM_TXN_ACTION_PAYPAL_NOTIFY)
            .append("&").append(Pages.PARAM_TXN_ID).append("=").append(transact.getKeyId())
            .append("&").append(Pages.PARAM_SCREENNAME).append("=DUMMY");
        
        templateValues.put(VAR_NOTIFY, notifyUrl.toString());
        return FreeMarkerConfiguration.getProcessedTemplate(templateValues, Pages.TEMPLATE_PAYPALBUTTON);
        

    }
    
    public static void renderPaypalButton(Transact transact, String serverName) throws TemplateException, IOException {
        transact.setPaypalButton(constructResponse(transact, serverName));
    }
    
    public static void renderPaypalButton(List<Transact> list, String serverName) throws TemplateException, IOException {
        for(Transact transact : list) {
            transact.setPaypalButton(constructResponse(transact, serverName));
        }
    }
}
