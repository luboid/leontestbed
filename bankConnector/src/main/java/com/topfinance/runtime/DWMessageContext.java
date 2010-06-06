package com.topfinance.runtime;

import org.apache.camel.Exchange;

public class DWMessageContext extends MessageContext {
    
    public DWMessageContext(Exchange exchange) {
        super(exchange);
    }
    
}
