package com.topfinance.stubs.internal;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgNode;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgTransportInfo;
import com.topfinance.cfg.dummy.TestDummy;
import com.topfinance.components.tcp8583.ISO8583BjobPackager;
import com.topfinance.plugin.cnaps2.DocRoot;
import com.topfinance.runtime.BcConstants;
import com.topfinance.util.BCUtils;

import java.util.List;

import org.apache.camel.CamelContext;
import org.apache.camel.Endpoint;
import org.apache.camel.Exchange;
import org.apache.camel.ExchangePattern;
import org.apache.camel.Processor;
import org.apache.camel.Producer;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.impl.DefaultCamelContext;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.PosixParser;
import org.apache.commons.lang.StringUtils;
import org.jpos.iso.ISOField;
import org.jpos.iso.ISOMsg;
import org.jpos.iso.ISOPackager;

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
                String url = BCUtils.getFullUrlFromPort(outPort);
                
                from(url).process(processor);
            }
        } 
    }        
    public static void log(String msg) {
        System.out.println("in PPInitator: "+msg);
    }
    CamelContext camel;
    ICfgReader reader;

    String outPortName;
    
    public static void main(String[] args) throws Exception{
        System.out.println("starting PPInitiator...");
        Options options = new Options();
        options.addOption("cfg", true, "configuration file");
        options.addOption("outPortName", true, "outPort name");
        
        CommandLineParser parser = new PosixParser();
        CommandLine cmd = parser.parse( options, args);
        String cfg=null;

        if(cmd.hasOption("cfg")) {
            cfg = cmd.getOptionValue("cfg");
        }
        log("cfg="+cfg);        
        CfgImplFactory.init(cfg);
        
        String op = "";
        if(cmd.hasOption("outPortName")) {
            op = cmd.getOptionValue("outPortName");
        }
        
        log("op="+op);
        
        PPInitiator pp = new PPInitiator();
        pp.setOutPortName(op);
        
        pp.go();
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
            BCUtils.initCamelComponent(camel, ti);
        }
    }

    private void sendRequest() throws Exception {
        // prepare pp request
        List<ICfgInPort> inPorts = reader.getListOfEnabledInport();
        
        
        ICfgInPort chosenInPort = null;
        // server's up in port is pp's up out port 
        for(ICfgInPort inPort : inPorts) {
            if(DIRECTION_DOWN.equals(inPort.getDirection())) {
                continue;
            }
            if(StringUtils.isNotEmpty(getOutPortName()) && 
                   !inPort.getName().equals(getOutPortName())) {
                continue;
            }
            
            // if getOutPortName() is empty, sent to first port found
            chosenInPort = inPort;
            break;
        }


        String hostIdentity = "BankA";
        String partnerIdentity = "BankB";

        
        String requestText = "";
        // package request
        if(TCP_PROVIDER_8583.equals(chosenInPort.getTransportInfo().getProvider())) {
            ISOMsg m1 = new ISOMsg();
            ISOPackager packager = new ISO8583BjobPackager();
            m1.setPackager (packager);
            
            m1.set (new ISOField (BcConstants.ISO8583_START,  BcConstants.ISO8583_START_VALUE));
            m1.set (new ISOField (BcConstants.ISO8583_OP_NAME,  TestDummy.OPERATION_101));
            m1.set (new ISOField (BcConstants.ISO8583_DOC_ID,  BCUtils.getUniqueDocId()));
            m1.set (new ISOField (BcConstants.ISO8583_ORIG_DOC_ID,  ""));
            m1.set (new ISOField (BcConstants.ISO8583_HOST_ID,  hostIdentity));
            m1.set (new ISOField (BcConstants.ISO8583_PARTNER_ID,  partnerIdentity));
            requestText = new String(m1.pack(), BcConstants.ENCODING);
            
        } else {
            DocRoot request = new DocRoot();

            request.setDocId(BCUtils.getUniqueDocId());
            request.setHostIdentity(hostIdentity);
            request.setPartnerIdentity(partnerIdentity);
            request.setOpName(TestDummy.OPERATION_101);
            requestText = request.toText();
        }
        
        log("requestText="+requestText);
        
        // send reques
        String url = BCUtils.getFullUrlFromPort(chosenInPort);
        
        // MUST start a new camel context!!!
        CamelContext newCamel = new DefaultCamelContext();
        initCamel(newCamel);
        // get the endpoint from the camel context
        Endpoint endpoint = newCamel.getEndpoint(url);

        // create the exchange used for the communication
        // we use the in out pattern for a synchronized exchange
        // where we expect a response
        Exchange exchange = endpoint.createExchange(ExchangePattern.InOnly);
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


        // stop and exit the client
        producer.stop();
    }



    
    public void process(Exchange exchange) throws Exception {
 
        // process async response or ack
        String inUri = exchange.getFromEndpoint().getEndpointUri();
        String msg = exchange.getIn().getBody(String.class);
        log("received message=" + msg+", from url="+exchange.getFromEndpoint().getEndpointUri());
        
        // TODO handle error msg
        if(msg.equals(BcConstants.MSG_PP_ERROR)) {
            log("received error msg!!!!!!!");
            return;
        }
        
        ICfgInPort cfgIP = reader.getInPortByUri(inUri);
        // TODO try to unpack the msg and verify
        try {
            
        DocRoot asyncresp = DocRoot.loadFromString(msg);
        String opName = asyncresp.getOpName();
        String docId = asyncresp.getDocId();
        String hostIdentity = asyncresp.getHostIdentity();
        String partnerIdentity = asyncresp.getPartnerIdentity();
        
        } catch (Exception ex) {
            
        }
        
        // send sync pp ack
        //exchange.getOut().setBody("OK");
        //log("sent pp ack: OK");

    }

    public String getOutPortName() {
        return outPortName;
    }

    public void setOutPortName(String outPortName) {
        this.outPortName = outPortName;
    }
}
