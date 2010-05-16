package com.topfinance.plugin;

import com.topfinance.cfg.ICfgInPort;
import com.topfinance.runtime.DWMessageContext;
import com.topfinance.runtime.DownwardProcessor;
import com.topfinance.runtime.UWMessageContext;
import com.topfinance.runtime.UpwardProcessor;
import org.apache.camel.CamelContext;
import org.apache.camel.Exchange;

public interface IPlugin {
    
    public DWMessageContext createDWMessageContext(ICfgInPort cfgInPort, Exchange exchange);
    public UWMessageContext createUWMessageContext(ICfgInPort cfgInPort, Exchange exchange);
    
    public UpwardProcessor createUpwardProcessor(UWMessageContext msgContext, CamelContext camel);
    public DownwardProcessor createDownwardProcessor(DWMessageContext msgContext, CamelContext camel);
    
}
