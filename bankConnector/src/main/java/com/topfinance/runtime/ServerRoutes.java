
package com.topfinance.runtime;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.plugin.BasePlugin;
import com.topfinance.util.BCUtils;

import java.util.List;

import org.apache.camel.CamelContext;
import org.apache.camel.Endpoint;
import org.apache.camel.Exchange;
import org.apache.camel.ExchangePattern;
import org.apache.camel.Producer;
import org.apache.camel.builder.RouteBuilder;

public class ServerRoutes extends RouteBuilder implements CfgConstants{
    
    private CamelContext camel;
    private ServerRoutes() {
    }
    private static ServerRoutes instance;
    
    
    public static void init(CamelContext camel) {
        instance = new ServerRoutes();
        instance.setContext(camel);
    }
    
    public static ServerRoutes getInstance() {
        if(instance == null) {
            throw new RuntimeException("ServerRoutes not initialized");
        }
        return instance;
    }
    
    
    public void produce(String url, String bodyText, boolean isInOnly)  {
        try {
            Endpoint outEp = camel.getEndpoint(url);
            Producer producer = outEp.createProducer();
            ExchangePattern expatn = isInOnly ? ExchangePattern.InOnly : ExchangePattern.InOut;
            Exchange destExchange = producer.createExchange(expatn);
            destExchange.getIn().setBody(bodyText);

            producer.process(destExchange);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    @Override
    public void configure() throws Exception {
        
        ICfgReader reader = CfgImplFactory.loadCfgReader();
        
        // 1. load a list of URLs, which are belong to the inbound ports configured.
        List<ICfgInPort> inPorts = reader.getListOfEnabledInport();
        
        // 2. iterate and start listening on each URL, and direct them to next step of RuntimeController.
        int i=0;
        for(ICfgInPort inPort : inPorts) {
            i++;
            String url = BCUtils.getFullUrlFromPort(inPort);
            System.out.println("url="+url);

            // TODO be careful that the processor instance will be shared by multiple threads
//            from(url).process(new Dispatcher(inPort,camel));
//                .recipientList().method(p, "route");        
            
            Dispatcher dis = new Dispatcher(inPort,camel);
            from(url).bean(dis, "preprocess").to("seda:process"+i);
            from("seda:process"+i).bean(dis, "process");
        }
        // 1 minute
        long period = 1000l*60;
        
        
        // start the poller
        // in a HA or LB clustering, the poller should only start from the primary instance
        from("timer://poller?period="+period).bean(new Poller(), "onPoll");
        
        // start the hibernate/resend msg listener
        // this is useful in LB clustering where multiple workers could take the job
        from(BcConstants.INTER_COMM_ALERT_RESEND).bean(new Dispatcher(), "processResendAlertMessage");
    }
    

    public static class Dispatcher {
        public Dispatcher() {
        }
        
        public Dispatcher(ICfgInPort inPort, CamelContext camel) {
            this.cfgIP = inPort;
            this.camel = camel;
        }
        private CamelContext camel;
        private ICfgInPort cfgIP;
        public void preprocess(Exchange exchange) throws Exception {
            String direction = cfgIP.getDirection();
            ICfgProtocol protocol = cfgIP.getProtocol();
            String pluginName = protocol.getPluginName();
            BasePlugin plugin = BasePlugin.loadPlugin(pluginName);
             
            AbstractProcessor p = null;
            MessageContext msgContext = null;
            // now the process instance is not shared
            if(DIRECTION_UP.equals(direction)) {
                msgContext = plugin.createUWMessageContext(cfgIP, exchange);
                p = plugin.createUpwardProcessor(camel);
            } else {
                msgContext = plugin.createDWMessageContext(cfgIP, exchange);
                p = plugin.createDownwardProcessor(camel);
            }
            p.setMsgContext(msgContext);
            p.preprocess();
            exchange.getIn().setHeader("ctx", msgContext);
        }
        
        public void process(Exchange exchange) throws Exception {
            String direction = cfgIP.getDirection();
            ICfgProtocol protocol = cfgIP.getProtocol();
            String pluginName = protocol.getPluginName();
            BasePlugin plugin = BasePlugin.loadPlugin(pluginName);
             
            AbstractProcessor p = null;
            // now the process instance is not shared
            if(DIRECTION_UP.equals(direction)) {
                p = plugin.createUpwardProcessor(camel);
            } else {
                p = plugin.createDownwardProcessor(camel);
            }
            MessageContext ctx = (MessageContext)exchange.getIn().getHeader("ctx");
            p.setMsgContext(ctx);
            p.process();
        }       
        
        public void processResendAlertMessage(Exchange exchange) throws Exception {
            // todo get protocol from msg header
            String pluginName = "";
            BasePlugin plugin = BasePlugin.loadPlugin(pluginName);
            String resendkey = exchange.getIn().getBody(String.class);
            plugin.processResendAlertMessage(resendkey);
            
        }
    }

}

