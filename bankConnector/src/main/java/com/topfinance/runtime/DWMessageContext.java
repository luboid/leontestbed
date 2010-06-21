package com.topfinance.runtime;

import com.topfinance.cfg.CfgConstants;
import org.apache.camel.Exchange;

public class DWMessageContext extends MessageContext implements CfgConstants{
    
    public DWMessageContext(Exchange exchange) {
        super(exchange);
        setDirection(DIRECTION_DOWN);
    }
    
}
