package com.topfinance.stubs.internal;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgTransportInfo;
import com.topfinance.cfg.TestDummy;
import com.topfinance.converter.Iso8583ToXml;
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
import org.apache.log4j.Logger;
import org.jpos.iso.ISOField;
import org.jpos.iso.ISOMsg;
import org.jpos.iso.ISOUtil;

public class PPInitiator implements Runnable, Processor, CfgConstants{
    private static Logger logger = Logger.getLogger(PPInitiator.class.getName());
    
    
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
                System.out.println("listenning on url=" + url);
                from(url).process(processor);
            }
        } 
    }        
    public static void log(String msg) {
        System.out.println("in PPInitator: "+msg);
    }
    public static void info(String msg) {
        System.out.println("[INFO] "+msg);
    }
    CamelContext camel;
    ICfgReader reader;

    String outPortName;
    
    
    public static void main(String[] args) throws Exception{
        System.out.println("starting PPInitiator...");
        Options options = new Options();
        options.addOption("cfg", true, "configuration file");
        options.addOption("cfgType", true, "configuration type");
        options.addOption("outPortName", true, "outPort name");
        
        CommandLineParser parser = new PosixParser();
        CommandLine cmd = parser.parse( options, args);
        String cfg=null, cfgType=null;

        // make sure it is there
        BCUtils.getHomeDir();

        
        
        if(cmd.hasOption("cfg")) {
            cfg = cmd.getOptionValue("cfg");
        }
        if(cmd.hasOption("cfgType")) {
            cfgType = cmd.getOptionValue("cfgType");
            if(!CfgImplFactory.getSupportedTypes().contains(cfgType)) {
                throw new RuntimeException("cfgType ["+cfgType+"] not supported");
            }
        }
        String op = "";
        if(cmd.hasOption("outPortName")) {
            op = cmd.getOptionValue("outPortName");
        }
        
        log("cfg="+cfg+", cfgType="+cfgType+", op="+op);
        
        CfgImplFactory.setType(cfgType);
        CfgImplFactory.setConfig(cfg);
        
        
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

        String docId = BCUtils.getUniqueDocId();
        String requestText = "";
        String op = TestDummy.OPERATION_101;
        // package request
        if(TCP_PROVIDER_8583.equals(reader.getTransInfoByPort(chosenInPort).getProvider())) {
            
            ISOMsg m1 = Iso8583ToXml.createDummyISOMsg(BCUtils.getHomeDir()+"/sample/8583/"+op+".8583");
            
            m1.set (new ISOField (BcConstants.ISO8583_OP_NAME, op));
            m1.set (new ISOField (BcConstants.ISO8583_DOC_ID, docId ));
            m1.set (new ISOField (BcConstants.ISO8583_ORIG_DOC_ID,  ""));
            m1.set (new ISOField (BcConstants.ISO8583_HOST_ID,  hostIdentity));
            m1.set (new ISOField (BcConstants.ISO8583_PARTNER_ID,  partnerIdentity));
            
            requestText = ISOUtil.hexString(m1.pack());
            
        } else {
            throw new RuntimeException("should go thru 8583");
//            DocRoot request = new DocRoot();
//
//            request.setDocId(BCUtils.getUniqueDocId());
//            request.setHostIdentity(hostIdentity);
//            request.setPartnerIdentity(partnerIdentity);
//            request.setOpName(TestDummy.OPERATION_101);
//            requestText = request.toText();
        }
        
        
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

        logger.info("sending pp request docId="+docId+", to url: "+url);
        logger.debug("rawMsg="+requestText);
        
        producer.process(exchange);


        // stop and exit the client
        producer.stop();
    }



    
    public void process(Exchange exchange) throws Exception {
 
        // process async response or ack
        String inUri = exchange.getFromEndpoint().getEndpointUri();
        String msg = exchange.getIn().getBody(String.class);
        logger.info("received message from url="+exchange.getFromEndpoint().getEndpointUri());
        logger.debug("rawMsg="+msg);
        
        // TODO handle error msg
        if(msg.equals(BcConstants.MSG_PP_ERROR)) {
            logger.warn("received error msg!!!!!!!");
            return;
        }
        
        ICfgInPort cfgIP = reader.getInPortByUri(inUri);
        // TODO try to unpack the msg and verify
        try {

//            DocRoot asyncresp = DocRoot.loadFromString(msg);
//            String opName = asyncresp.getOpName();
//            String docId = asyncresp.getDocId();
//            String hostIdentity = asyncresp.getHostIdentity();
//            String partnerIdentity = asyncresp.getPartnerIdentity();

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
