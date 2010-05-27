package com.topfinance.runtime;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.ICfgInPort;
import org.apache.camel.Exchange;


public class UWMessageContext extends MessageContext implements CfgConstants{
    
    public UWMessageContext(Exchange exchange) {
        super(exchange);
        setDirection(DIRECTION_UP);
        
    }

    
}
