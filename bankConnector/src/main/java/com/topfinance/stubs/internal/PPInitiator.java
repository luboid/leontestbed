package com.topfinance.stubs.internal;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgNode;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgTransportInfo;
import com.topfinance.cfg.om.OmCfgAMQInfo;
import com.topfinance.cfg.om.OmCfgJettyInfo;
import com.topfinance.plugin.cnaps2.DocRoot;
import com.topfinance.stubs.internal.PPResponder.MyRoute;
import com.topfinance.util.BCUtils;

import java.util.List;
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

public class PPInitiator implements Runnable, Processor, CfgConstants{
    public static class MyRoute extends RouteBuilder{
        Processor processor;
        public MyRoute(Processor processor) {
            this.processor = processor;
        }
        @Override
        public void configure() throws Exception {
            ICfgReader reader = CfgImplFactory.loadCfgReader();
            // server's down out is pp's down in 
            List<ICfgOutPort> outPorts = reader.getListOfEnabledOutport();
            for(ICfgOutPort outPort : outPorts) {
                if(DIRECTION_UP.equals(outPort.getDirection())) {
                    continue;
                }
                String url = outPort.getUrl();
                // handle URL prefix
                ICfgTransportInfo ti = outPort.getTransportInfo();
                String prefix = ti.getPrefix();
                url = prefix+":"+url;
                System.out.println("url="+url);
                from(url).process(processor);
            }
        } 
    }        
    public static void log(String msg) {
        System.out.println("in PPInitator: "+msg);
    }
    CamelContext camel;
    ICfgReader reader;

    
    public static void main(String[] args) throws Exception{
        System.out.println("starting PPInitiator...");
        Options options = new Options();
        options.addOption("cfg", true, "configuration file");
        CommandLineParser parser = new PosixParser();
        CommandLine cmd = parser.parse( options, args);
        String cfg=null;

        if(cmd.hasOption("cfg")) {
            cfg = cmd.getOptionValue("cfg");
        }
        log("cfg="+cfg);        
        CfgImplFactory.init(cfg);
        new PPInitiator().go();
    }
    
    public void run() {
        try {
            System.out.println("running camel...");
            camel.start();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    };
    
    public void go() throws Exception{
        camel = new DefaultCamelContext();
        // load configurations
        reader = CfgImplFactory.loadCfgReader();
        // init Camel Components
        // each component owns a set of settings shared by all bound inPorts or outPorts
        initCamel(camel);
        // add route/listen
        camel.addRoutes(new MyRoute(this));
        
        log("start listening..");
        new Thread(this).start();

        
        sendRequest();

    }

    private void initCamel(CamelContext camel) {
        List<ICfgTransportInfo> listTi = reader.getListOfTransportInfo();
        for (ICfgTransportInfo ti : listTi) {
            String provider = ti.getProvider();
            if (CfgConstants.JMS_PROVIDER_AMQ.equals(provider)) {
                ActiveMQComponent amq = new ActiveMQComponent();
                // ?? won't work unless define as normal JMSComponent
                // amq.setConnectionFactory(jmsInfo.getConnectionFactory());
                OmCfgAMQInfo amqji = (OmCfgAMQInfo)ti;
                amq.setBrokerURL(amqji.getBrokerUrl());
                camel.addComponent(ti.getPrefix(), amq);
                log("adding component: " + ti.getPrefix()  + ", brokerUrl="
                    + amqji.getBrokerUrl());
            } else if (CfgConstants.HTTP_PROVIDER_JETTY.equals(provider)) {
                JettyHttpComponent jetty = new JettyHttpComponent();
                OmCfgJettyInfo jettyti = (OmCfgJettyInfo)ti;
                // TODO setting up JettyHttpComponent with jettyti
                camel.addComponent(ti.getPrefix(), jetty);
                log("adding component: " + ti.getPrefix());
            }
        }
    }

    private void sendRequest() throws Exception {
        // prepare pp request
        List<ICfgInPort> inPorts = reader.getListOfEnabledInport();
        String url = null;
        // server's up in port is pp's up out port 
        for(ICfgInPort inPort : inPorts) {
            if(DIRECTION_DOWN.equals(inPort.getDirection())) {
                continue;
            }
            // send to first port found
            url = inPort.getUrl();
            // handle URL prefix
            ICfgTransportInfo ti = inPort.getTransportInfo();
            String prefix = ti.getPrefix();
            url = prefix+":"+url;
            break;
        }
        System.out.println("url="+url);

        String hostIdentity = null;
        String partnerIdentity = null;
        List<ICfgNode> nodes = reader.getListOfNodes();
        for(ICfgNode node : nodes) {
            if(NODETYPE_HOST.equals(node.getType())){
                hostIdentity = node.getIdentity();
            }
            if(NODETYPE_PARTNER.equals(node.getType())) {
                partnerIdentity = node.getIdentity();
            }
        }
        System.out.println("1");
        // send request
        DocRoot request = new DocRoot();
        
        request.setDocId(BCUtils.getUniqueDocId());
        request.setHostIdentity(hostIdentity);
        request.setPartnerIdentity(partnerIdentity);
        request.setOpName("ibps.101.001.01");
        String requestText = request.toText();
        
        
        // MUST start a new camel context!!!
        CamelContext newCamel = new DefaultCamelContext();
        initCamel(newCamel);
        // get the endpoint from the camel context
        Endpoint endpoint = newCamel.getEndpoint(url);

        // create the exchange used for the communication
        // we use the in out pattern for a synchronized exchange
        // where we expect a response
        Exchange exchange = endpoint.createExchange(ExchangePattern.InOut);
        // set the input on the in body
        // must you correct type to match the expected type of an
        // Integer object
        exchange.getIn().setBody(requestText);

        // to send the exchange we need an producer to do it for us
        Producer producer = endpoint.createProducer();
        // start the producer so it can operate
        producer.start();

        log("sending pp request {"+requestText+"} to url: "+url);
        producer.process(exchange);

        // sync pp ack
        String ack = exchange.getOut().getBody(String.class);
        log("... received pp ack: " + ack);

        // stop and exit the client
        producer.stop();
    }



    
    public void process(Exchange exchange) throws Exception {
        // process async response
        String msg = exchange.getIn().getBody(String.class);
        log("received tp msg: "+msg);
        DocRoot asyncresp = DocRoot.loadFromString(msg);
        String opName = asyncresp.getOpName();
        String docId = asyncresp.getDocId();
        String hostIdentity = asyncresp.getHostIdentity();
        String partnerIdentity = asyncresp.getPartnerIdentity();
        // send sync pp ack
        exchange.getOut().setBody("OK");
        log("sent pp ack: OK");

    }
}
