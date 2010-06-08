
package com.topfinance.runtime;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.plugin.BasePlugin;
import com.topfinance.util.BCUtils;
import com.topfinance.util.DbUtils;

import java.util.ArrayList;
import java.util.List;

import org.apache.camel.CamelContext;
import org.apache.camel.Endpoint;
import org.apache.camel.Exchange;
import org.apache.camel.ExchangePattern;
import org.apache.camel.Producer;
import org.apache.camel.builder.RouteBuilder;
import org.apache.log4j.Logger;

public class ServerRoutes extends RouteBuilder implements CfgConstants{
    private static Logger logger = Logger.getLogger(ServerRoutes.class);
    
    
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
    
    
    public String produce(String url, String bodyText, boolean isInOnly) throws Exception {
        String syncResp = null;
        Endpoint outEp = getContext().getEndpoint(url);
        Producer producer = outEp.createProducer();
        ExchangePattern expatn = isInOnly ? ExchangePattern.InOnly : ExchangePattern.InOut;
        Exchange destExchange = producer.createExchange(expatn);
        destExchange.getIn().setBody(bodyText);
        producer.process(destExchange);
        
        if(!isInOnly) {
            syncResp = destExchange.getOut().getBody(String.class);
        }
        
        return syncResp;
    }
    
    @Override
    public void configure() throws Exception {
        
        ICfgReader reader = CfgImplFactory.loadCfgReader();
        
        // 1. load a list of URLs, which are belong to the inbound ports configured.
        List<ICfgInPort> inPorts = reader.getListOfEnabledInport();
        
        // 2. iterate and start listening on each URL, and direct them to next step of RuntimeController.
        int i=0;
        Dispatcher dis = new Dispatcher();
//        for(ICfgInPort inPort : inPorts) {
//            i++;
//            String url = BCUtils.getFullUrlFromPort(inPort);
//            System.out.println("url="+url);
//
//            // TODO be careful that the processor instance will be shared by multiple threads
////            from(url).process(new Dispatcher(inPort,camel));
////                .recipientList().method(p, "route");        
//            from(url).bean(dis, "preprocess").to("seda:process"+i);
//            from("seda:process"+i).bean(dis, "process");
//        }
        
        
        List<String> inUrls = new ArrayList<String>();
        for(ICfgInPort inPort : inPorts) {
            i++;
            String url = BCUtils.getFullUrlFromPort(inPort);
            logger.info("listening on url="+url);
            inUrls.add(url);
        }

        from(inUrls.toArray(new String[0])).bean(dis, "preprocess").to("seda:process");
        // two phases using separate thread pool
        from("seda:process").bean(dis, "process");        
        
        // todo move to configuration
        // 1 minute
        // start the poller
        // in a HA or LB clustering, the poller should only start from the primary instance
        from("timer://poller?period="+BcConstants.INTERVAL_POLLER).bean(new Poller(), "onPoll");
        
        
        // start the hibernate/resend msg listener
        // this is useful in LB clustering where multiple workers could take the job
        from(BcConstants.INTER_COMM_ALERT_RESEND).bean(dis, "processResendAlertMessage");
        from(BcConstants.INTER_COMM_ALERT_HIBER).bean(dis, "processHiberAlertMessage");
    }
    

    public static class Dispatcher {
        public Dispatcher() {
        }
        
        public void preprocess(Exchange exchange) throws Exception {
            String inUri = exchange.getFromEndpoint().getEndpointUri();
            logger.debug("inUri="+inUri);
            ICfgReader reader = CfgImplFactory.loadCfgReader();
            ICfgInPort cfgIP = reader.getInPortByUri(inUri);
            String direction = cfgIP.getDirection();
            ICfgProtocol protocol = cfgIP.getProtocol();
            String pluginName = protocol.getPluginName();
            BasePlugin plugin = BasePlugin.loadPlugin(pluginName);
             
            AbstractProcessor p = null;
            MessageContext msgContext = null;
            // now the process instance is not shared
            if(DIRECTION_UP.equals(direction)) {
                msgContext = plugin.createUWMessageContext(exchange);
                p = plugin.createUpwardProcessor();
            } else {
                msgContext = plugin.createDWMessageContext(exchange);
                p = plugin.createDownwardProcessor();
            }
            
            msgContext.setCfgInPort(cfgIP);
            msgContext.setProtocol(protocol);
            p.setMsgContext(msgContext);
            p.preprocess();
            exchange.getIn().setHeader("ctx", msgContext);
        }
        
        public void process(Exchange exchange) throws Exception {
            MessageContext ctx = (MessageContext)exchange.getIn().getHeader("ctx");
            ICfgInPort cfgIP = ctx.getCfgInPort();    
            String direction = cfgIP.getDirection();
            ICfgProtocol protocol = cfgIP.getProtocol();
            String pluginName = protocol.getPluginName();
            BasePlugin plugin = BasePlugin.loadPlugin(pluginName);
             
            AbstractProcessor p = null;
            // now the process instance is not shared
            if(DIRECTION_UP.equals(direction)) {
                p = plugin.createUpwardProcessor();
            } else {
                p = plugin.createDownwardProcessor();
            }
            p.setMsgContext(ctx);
            p.process();
        }       
        
        public void processResendAlertMessage(Exchange exchange) throws Exception {
            logger.info("processResendAlertMessage......");
            // TODO get protocol from msg header
            String pluginName = "";
            BasePlugin plugin = BasePlugin.loadPlugin(pluginName);
            String resendkey = exchange.getIn().getBody(String.class);
            plugin.processResendAlertMessage(resendkey);
        }
        
        public void processHiberAlertMessage(Exchange exchange) throws Exception {
            logger.info("processHiberAlertMessage......");
            // TODO get protocol from msg header
            String pluginName = "";
            BasePlugin plugin = BasePlugin.loadPlugin(pluginName);
            String resendkey = exchange.getIn().getBody(String.class);
            plugin.processHiberAlertMessage(resendkey);
        }
    }

}

