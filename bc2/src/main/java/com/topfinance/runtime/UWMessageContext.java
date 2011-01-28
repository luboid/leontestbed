package com.topfinance.runtime;

import org.apache.camel.Exchange;

import com.topfinance.cfg.CfgConstants;


public class UWMessageContext extends MessageContext implements CfgConstants{
    
    public UWMessageContext(Exchange exchange) {
        super(exchange);
        setDirection(DIRECTION_UP);
        
    }

    
}
