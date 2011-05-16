package com.appspot.twitteybot.pay;

import com.appspot.twitteybot.datastore.ApplicationProperty;
import com.appspot.twitteybot.datastore.DsHelper;
import com.appspot.twitteybot.datastore.PMF;
import com.appspot.twitteybot.datastore.Transact;
import com.appspot.twitteybot.datastore.Transact.TxnState;
import com.appspot.twitteybot.ui.FreeMarkerConfiguration;
import com.appspot.twitteybot.ui.Pages;
import com.appspot.twitteybot.ui.TransactionManager;
import freemarker.template.TemplateException;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class PaypalStandard extends Pay{
    
    public static final String VAR_SELLER = "seller";
    public static final String VAR_GOODSNAME = "goodsName";
    public static final String VAR_AMOUNT = "amount";
    public static final String VAR_CURRENCY = "currency";
    public static final String VAR_LOCATION = "location";
    public static final String VAR_RETURN = "returnUrl";
    

    
    
    private static final Logger log = Logger.getLogger(TransactionManager.class.getName());
    
    private static String constructResponse(Transact transact, String serverName) throws TemplateException, IOException {
        log.info("constructResponse!!!!!!");
        Map<String, Object> templateValues = new HashMap<String, Object>();
        templateValues.put(VAR_SELLER, ApplicationProperty.getPayeeAccount());
        templateValues.put(VAR_GOODSNAME, transact.getNumberOfStatus() + " status from tweetbot");
        templateValues.put(VAR_AMOUNT, transact.getAmount());
        templateValues.put(VAR_CURRENCY, "USD");
        templateValues.put(VAR_LOCATION, "US");
        templateValues.put(VAR_RETURN, "http://"+serverName+"/pages/transaction?action="+Pages.PARAM_TXN_ACTION_CONFIRM_PAYPAL+"&"+Pages.PARAM_TXN_ID+"="+transact.getKeyId());
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
