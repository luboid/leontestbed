package com.topfinance.runtime;

import com.topfinance.cfg.ICfgInPort;
import org.apache.camel.Exchange;

public class DWMessageContext extends MessageContext {
    
    public DWMessageContext(Exchange exchange) {
        super(exchange);
    }
    
}
