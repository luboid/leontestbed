package com.topfinance.stubs.internal;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgTransportInfo;
import com.topfinance.cfg.dummy.TestDummy;
import com.topfinance.cfg.om.OmCfgAMQInfo;
import com.topfinance.cfg.om.OmCfgJettyInfo;
import com.topfinance.plugin.cnaps2.DocRoot;
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

public class PPResponder implements Processor, CfgConstants{
    public static class MyRoute extends RouteBuilder{
        Processor processor;
        public MyRoute(Processor processor) {
            this.processor = processor;
        }
        public void configure() throws Exception {
            ICfgReader reader = CfgImplFactory.loadCfgReader();
            // server's down out is pp's down in
            List<ICfgOutPort> outPorts = reader.getListOfEnabledOutport();
            for (ICfgOutPort outPort : outPorts) {
                if (DIRECTION_UP.equals(outPort.getDirection())) {
                    continue;
                }
                String url = outPort.getUrl();
                // handle URL prefix
                ICfgTransportInfo ti = outPort.getTransportInfo();
                String prefix = ti.getPrefix();
                url = prefix + ":" + url;
                System.out.println("url=" + url);
                from(url).process(processor);
            }
        }        
    }        
    public static void log(String msg) {
        System.out.println("in PPResponder: "+msg);
    }
    CamelContext camel;
    ICfgReader reader;
    private final ExecutorService executor = new ScheduledThreadPoolExecutor(5);
    
    public static void main(String[] args) throws Exception{
        System.out.println("starting PPResponder...");
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
        new PPResponder().start();
    }
    
    public void start() throws Exception{
        camel = new DefaultCamelContext();
        // load configurations
        reader = CfgImplFactory.loadCfgReader();
        
        // init Camel Components
        // each component owns a set of settings shared by all bound inPorts or outPorts

        List<ICfgTransportInfo> listTi = reader.getListOfTransportInfo();
        for(ICfgTransportInfo ti : listTi) {
            String provider = ti.getProvider();
            if(CfgConstants.JMS_PROVIDER_AMQ.equals(provider)) {
                ActiveMQComponent amq = new ActiveMQComponent();
                // ?? won't work unless define as normal JMSComponent
//                amq.setConnectionFactory(jmsInfo.getConnectionFactory());
                OmCfgAMQInfo amqji = (OmCfgAMQInfo)ti;
                amq.setBrokerURL(amqji.getBrokerUrl());
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
        
        // add route/listen
        camel.addRoutes(new MyRoute(this));
        camel.start();

    }


    public void process(Exchange exchange) throws Exception {

        String msg = exchange.getIn().getBody(String.class);
        log("received msg: "+msg);
        DocRoot request = DocRoot.loadFromString(msg);
        String opName = request.getOpName();
        String docId = request.getDocId();
        String hostIdentity = request.getHostIdentity();
        String partnerIdentity = request.getPartnerIdentity();
        // send sync pp ack
        exchange.getOut().setBody("OK");
        
        
        if(!TestDummy.OPERATION_101.equals(opName)) {
            return;
        }
        
        // prepare async pp resp
        DocRoot asyncResp = new DocRoot();
        asyncResp.setDocId(BCUtils.getUniqueDocId());
        asyncResp.setOrigDocId(docId);
        // swap host/partner
        asyncResp.setHostIdentity(partnerIdentity);
        asyncResp.setPartnerIdentity(hostIdentity);
        asyncResp.setOpName(TestDummy.OPERATION_102);
        final String respText = asyncResp.toText();

        // send async pp resp in separate thread
        executor.execute(new Runnable() {
            public void run() {
                try {

                    List<ICfgInPort> inPorts = reader.getListOfEnabledInport();

                    String url = null;
                    // server's up in port is pp's up out port 
                    for(ICfgInPort inPort : inPorts) {
                        if(DIRECTION_DOWN.equals(inPort.getDirection())) {
                            continue;
                        }
                        // send to first port found
                        url = BCUtils.getFullUrlFromPort(inPort);
                        break;
                    }
                    System.out.println("url="+url);

                    
                    // get the endpoint from the camel context
                    Endpoint endpoint = camel.getEndpoint(url);

                    // create the exchange used for the communication
                    // we use the in out pattern for a synchronized exchange
                    // where we expect a response
                    Exchange exchange = endpoint.createExchange(ExchangePattern.InOut);
                    // set the input on the in body
                    // must you correct type to match the expected type of an
                    // Integer object
                    exchange.getIn().setBody(respText);

                    // to send the exchange we need an producer to do it for us
                    Producer producer = endpoint.createProducer();
                    // start the producer so it can operate
                    producer.start();

                    System.out.println("sending resp {"+respText+"} to url: "+url);
                    producer.process(exchange);

                    // sync pp ack
                    String ack = exchange.getOut().getBody(String.class);
                    System.out.println("... received ack: " + ack);

                    // stop and exit the client
                    producer.stop();
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        });
        
    }
}
