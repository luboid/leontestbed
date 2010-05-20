package com.topfinance.runtime;

import com.topfinance.util.ResendUtil;

import java.util.List;

import org.apache.camel.Exchange;

public class Poller {
    
    public void onPoll(Exchange exchange) {
        
        List<String> list = ResendUtil.getResendAlerts();
        for(String resendkey : list) {
            ServerRoutes.getInstance().produce(BcConstants.INTER_COMM_ALERT_RESEND, resendkey, true);
        }
    }
    
    
}
