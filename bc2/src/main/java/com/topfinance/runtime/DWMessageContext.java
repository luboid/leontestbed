package com.topfinance.runtime;

import org.apache.camel.Exchange;

import com.topfinance.cfg.CfgConstants;

public class DWMessageContext extends MessageContext implements CfgConstants{
    
    public DWMessageContext(Exchange exchange) {
        super(exchange);
        setDirection(DIRECTION_DOWN);
    }
    
}
