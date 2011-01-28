package com.topfinance.runtime;

import java.util.List;

import org.apache.camel.Exchange;
import org.apache.log4j.Logger;

import com.topfinance.util.HiberUtil;
import com.topfinance.util.ResendUtil;

public class Poller {
    
    private static Logger logger = Logger.getLogger(Poller.class);
    
    public void onPoll(Exchange exchange) {
        
        logger.info("onPoll......................");
        List<String> resendList = ResendUtil.getResendAlerts();
        for(String resendkey : resendList) {
            try {
                ServerRoutes.getInstance().produce(BcConstants.INTER_COMM_ALERT_RESEND, resendkey, true);
            } catch (Exception ex) {
                ex.printStackTrace();
                logger.warn("failed to send resend alert for key: "+resendkey, ex);
            }
        }
        
        List<String> hiberList = HiberUtil.getHiberAlerts();
        for(String hiberkey : hiberList) {
            try {
                ServerRoutes.getInstance().produce(BcConstants.INTER_COMM_ALERT_HIBER, hiberkey, true);
            } catch (Exception ex) {
                ex.printStackTrace();
                logger.warn("failed to send hiber alert for key: "+hiberkey, ex);
            }
        }
    }
    
    
}
