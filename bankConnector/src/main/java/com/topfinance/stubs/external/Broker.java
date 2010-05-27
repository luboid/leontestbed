package com.topfinance.stubs.external;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgNode;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgTransportInfo;
import com.topfinance.cfg.dummy.TestDummy;
import com.topfinance.cfg.om.OmCfgAMQInfo;
import com.topfinance.cfg.om.OmCfgJettyInfo;
import com.topfinance.plugin.cnaps2.AckRoot;
import com.topfinance.plugin.cnaps2.DocRoot;
import com.topfinance.plugin.cnaps2.MsgHeader;
import com.topfinance.runtime.BcException;
import com.topfinance.util.BCUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.ScheduledThreadPoolExecutor;

import org.apache.activemq.camel.component.ActiveMQComponent;
import org.apache.camel.CamelContext;
import org.apache.camel.Endpoint;
import org.apache.camel.Exchange;
import org.apache.camel.ExchangePattern;
import org.apache.camel.Processor;
import org.apache.camel.Producer;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.jetty.JettyHttpComponent;
import org.apache.camel.impl.DefaultCamelContext;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.PosixParser;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

public class Broker implements Processor, CfgConstants{
    public static void log(String msg) {
        System.out.println("in Broker: "+msg);
    }
    private static ApplicationContext ctx;
    public static class MyRoute extends RouteBuilder{
        Processor processor;
        public MyRoute(Processor processor) {
            this.processor = processor;
        }
        public void configure() throws Exception {
            for (String inUrl : inUrls) {
                log("listening on url: "+inUrl);
                from(inUrl).process(processor);
            }
        }        
    }        
    
    CamelContext camel;
    static ICfgReader readerA;
    static ICfgReader readerB;
    private final ExecutorService executor = new ScheduledThreadPoolExecutor(5);
    
    // maps of hostIds->outportUrl
    static Map<String, String> routing = new HashMap<String, String>();
    
    static List<String> inUrls = new ArrayList<String>();
    
    public static void main(String[] args) throws Exception{
        System.out.println("starting Broker...");
        Options options = new Options();
        options.addOption("spring", true, "spring configuration file");
        options.addOption("cfgA", true, "configuration file");
        options.addOption("cfgB", true, "configuration file");
        
        CommandLineParser parser = new PosixParser();
        CommandLine cmd = parser.parse( options, args);
        String spring=null, cfgA=null, cfgB=null;
        
        if( cmd.hasOption( "spring" ) ) {
            spring = cmd.getOptionValue( "spring" );
        }
        log("spring="+spring);
        ctx = new FileSystemXmlApplicationContext(spring);
        
        if(cmd.hasOption("cfgA")) {
            cfgA = cmd.getOptionValue("cfgA");
        }
        log("cfgA="+cfgA);   
        
        if(cmd.hasOption("cfgB")) {
            cfgB = cmd.getOptionValue("cfgB");
        }
        log("cfgB="+cfgB);
        
        CfgImplFactory.init(cfgA);
        readerA = CfgImplFactory.loadCfgReader();
        CfgImplFactory.init(cfgB);
        readerB = CfgImplFactory.loadCfgReader();
        
        new Broker().start();
    }
    
    public void start() throws Exception{
        camel = new DefaultCamelContext();
        
        loadPortConfig(readerA);
        loadPortConfig(readerB);
        
//         add route/listen
        camel.addRoutes(new MyRoute(this));
        camel.start();

    }

    private void loadPortConfig(ICfgReader reader) {
        List<ICfgTransportInfo> listTi = reader.getListOfTransportInfo();
        for(ICfgTransportInfo ti : listTi) {
            String provider = ti.getProvider();
            if(CfgConstants.JMS_PROVIDER_AMQ.equals(provider)) {
                ActiveMQComponent amq = new ActiveMQComponent();
                // ?? won't work unless define as normal JMSComponent
//                amq.setConnectionFactory(jmsInfo.getConnectionFactory());
                OmCfgAMQInfo amqji = (OmCfgAMQInfo)ti;
                amq.setBrokerURL(amqji.getBrokerUrl());
                if(camel.getComponent(ti.getPrefix())!=null) {
                    log("skip adding existed component: "+ti.getPrefix());
                    continue;
                }
                camel.addComponent(ti.getPrefix(), amq);
                log("adding component: "+ti.getPrefix()+", brokerUrl="+amqji.getBrokerUrl());
            }
            else if(CfgConstants.HTTP_PROVIDER_JETTY.equals(provider)) {
                JettyHttpComponent jetty = new JettyHttpComponent();
                OmCfgJettyInfo jettyti = (OmCfgJettyInfo)ti;
                // TODO setting up JettyHttpComponent with jettyti
                camel.addComponent(ti.getPrefix(), jetty);
                log("adding component: "+ti.getPrefix());
            }
        }
        
        List<ICfgNode> nodes = reader.getListOfNodes();
        List<String> hostIds = new ArrayList<String>();
        for(ICfgNode node : nodes) {
            if(NODETYPE_HOST.equals(node.getType())) {
                hostIds.add(node.getIdentity());
            }
        }
        
        // bc's down in port is broker's out port
        // TODO consider multiple Down in port? 
        List<ICfgInPort> ips = reader.getListOfEnabledInport();
        for(ICfgInPort ip : ips) {
            if(DIRECTION_DOWN.equals(ip.getDirection())) {
                String url = BCUtils.getFullUrlFromPort(ip);
                for(String hostId : hostIds) {
                    routing.put(hostId, url);
                }
            }
        }
        
        // bc's up-out-port is broker's in port
        List<ICfgOutPort> ops = reader.getListOfEnabledOutport();
        for(ICfgOutPort op : ops) {
            if(DIRECTION_UP.equals(op.getDirection())) {
                inUrls.add(BCUtils.getFullUrlFromPort(op));
            }
        }
    }

    public void process(Exchange exchange) throws Exception {
        
        // parse header and doc
        String message = exchange.getIn().getBody(String.class);
        log("received message=" + message+", from url="+exchange.getFromEndpoint().getEndpointUri());
        
        String headerText = message.substring(0, MsgHeader.TOTAL_LENGTH);
        String bodyText = message.substring(MsgHeader.TOTAL_LENGTH);
        MsgHeader header = null;
        try {
            header = MsgHeader.fromText(headerText);
        } catch (Exception ex) {
            ex.printStackTrace();
            // no way to generate any meaningful ack
            throw new RuntimeException(ex);
        }        
        
        String mesgId = header.getMesgID();
        String mesgRefId = header.getMesgRefID();
        String mesgType = header.getMesgType();
        String origSender = header.getOrigSender();
        String origReceiver = header.getOrigReceiver();
        
        
        if(mesgType.equals(TestDummy.OPERATION_900)) {
            // received ack
            AckRoot ackRoot = null;
            try {
                ackRoot = AckRoot.loadFromString(bodyText);
                String code = ackRoot.getMsgProCd();
                String ackMesgId = ackRoot.getMsgId();
                if(AckRoot.MSG_PRO_CD_SUCCESS.equals(code)) {
                    log("received good ack for message: "+ackMesgId);
                }
                else {
                    log("received bad ack for message: "+ackMesgId);
                }
            } catch (BcException ex) {
                ex.printStackTrace();
            }
            return;
        }
        
        
        String validateStatus = AckRoot.MSG_PRO_CD_SUCCESS;
        
        String ackUrl = routing.get(origSender);
        String outUrl = routing.get(origReceiver);
        if(ackUrl==null) {
            log("!!!!cannot find ackUrl--downurl for parter with id{"+origSender+"}");
            validateStatus = AckRoot.MSG_PRO_CD_FAIL_VERIFY;
        }
        if(outUrl==null) {
            log("!!!!cannot find outUrl--downurl for parter with id{"+origReceiver+"}");
            validateStatus = AckRoot.MSG_PRO_CD_FAIL_VERIFY;
        }
        DocRoot body = null;
        try {
            body = DocRoot.loadFromString(bodyText);
        } catch (BcException ex) {
            validateStatus = AckRoot.MSG_PRO_CD_FAIL_VERIFY;
        }
        String docId = body.getDocId();
        String origDocId = body.getOrigDocId();
        
        
        
        AckRoot ack = null;
        // TODO handle sync-req-reply and notify
        // send ack only when async or notify
        ack = new AckRoot();
        ack.setMsgId(mesgId);
        ack.setMsgRefId(mesgRefId);
        ack.setOrigSndr(origSender);
        ack.setMsgTp(mesgType);
        ack.setMsgProCd(validateStatus);
        
        // package ack
        MsgHeader msgHeader = new MsgHeader(
           // swap sender and receiver                                 
           origReceiver,
           origSender,
           TestDummy.OPERATION_900,
           // ??
           BCUtils.getUniqueMesgId(),
           mesgRefId
        ); 
        String ackText = msgHeader.toText()+ack.dumpToString();
        log("sending ack="+ackText);
        // send sync ack
//        exchange.getOut().setBody(ackText);
        
        // send async ack
        new SendJob(ackText, ackUrl, camel).run();
        
        
        // prepare and send response, hardcoded
        DocRoot outBody = null;
        String newdocId = null;
        
        String outText = null;
        MsgHeader outHeader = null;
        if(mesgType.equals(TestDummy.OPERATION_101)){
            outHeader = new MsgHeader(
                                                origSender,
                                                origReceiver,
                                                mesgType,
                                                // always generate unique header level id
                                                BCUtils.getUniqueMesgId(), 
                                                mesgRefId
                                             );   
            newdocId = docId;
            outBody = new DocRoot();
            outBody.setDocId(newdocId);
            outBody.setOrigDocId(null);
            outBody.setOpName(body.getOpName());
            outBody.setHostIdentity(body.getHostIdentity());
            outBody.setPartnerIdentity(body.getPartnerIdentity());
            
            outText = outHeader.toText()+outBody.toText();

            executor.execute(new SendJob(outText, outUrl, camel));
            
        } else if(mesgType.equals(TestDummy.OPERATION_102)) {
            
            // send to A
            outHeader = new MsgHeader(
                                                origSender,
                                                origReceiver,
                                                TestDummy.OPERATION_601,
                                                // always generate unique header level id
                                                BCUtils.getUniqueId(), 
                                                mesgRefId
                                             );             
            newdocId = BCUtils.getUniqueDocId();
            outBody = new DocRoot();
            outBody.setDocId(newdocId);
            //
            outBody.setOrigDocId(origDocId);
            outBody.setOpName(TestDummy.OPERATION_601);
            outBody.setHostIdentity(body.getHostIdentity());
            outBody.setPartnerIdentity(body.getPartnerIdentity());

            outText = outHeader.toText()+outBody.toText();
            //
            executor.execute(new SendJob(outText, outUrl, camel));
            
            log("======================================================");
            // send to B
            outHeader = new MsgHeader(
                                      // swap sender and receiver
                                                origReceiver,
                                                origSender,
                                                TestDummy.OPERATION_601,
                                                // always generate unique header level id
                                                BCUtils.getUniqueId(), 
                                                mesgRefId
                                             );             
            newdocId = BCUtils.getUniqueId("docid-");
            outBody = new DocRoot();
            outBody.setDocId(newdocId);
            //
            outBody.setOrigDocId(docId);
            outBody.setOpName(TestDummy.OPERATION_601);
            // swap
            outBody.setHostIdentity(body.getPartnerIdentity());
            outBody.setPartnerIdentity(body.getHostIdentity());

            outText = outHeader.toText()+outBody.toText();
            //
            executor.execute(new SendJob(outText, outUrl, camel));
            
            
        }
         
        
        
        
    }
    
    public static class SendJob implements Runnable{
        private String text;
        private String url;

        CamelContext camel;
        public SendJob(String text, String url, CamelContext camel) {
            this.text = text;
            this.url = url;
            this.camel = camel;
        }

        public void run() {
            try {
                System.out.println("sending msg {"+text+"} to url: "+url);
                // get the endpoint from the camel context
                Endpoint endpoint = camel.getEndpoint(url);

                // create the exchange used for the communication
                // we use the in out pattern for a synchronized exchange
                // where we expect a response
                Exchange exchange = endpoint.createExchange(ExchangePattern.InOnly);
                
                // set the input on the in body
                // must you correct type to match the expected type of an
                // Integer object
                exchange.getIn().setBody(text);

                // to send the exchange we need an producer to do it for us
                Producer producer = endpoint.createProducer();
                // start the producer so it can operate
                producer.start();

                
                producer.process(exchange);

                // sync pp ack
//                String ack = exchange.getOut().getBody(String.class);
//                System.out.println("... received ack: " + ack);
                
                

                // stop and exit the client
                producer.stop();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            
        }
        
        
    }
}
