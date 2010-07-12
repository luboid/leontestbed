package com.topfinance.stubs.internal;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgTransportInfo;
import com.topfinance.cfg.TestDummy;
import com.topfinance.runtime.BcConstants;
import com.topfinance.util.BCUtils;
import com.topfinance.util.Iso8583Util;

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
import org.jpos.iso.ISOMsg;

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
        System.out.println("log4j conf is "+System.getProperty("log4j.configuration"));
        logger.info("log4j is working...");
        
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
        ICfgOperation cfgOpn= reader.getOperation(reader.getProtByInPort(chosenInPort), op);
        
        boolean wantSyncReply = CfgConstants.OP_REPLY_TYPE_SYNC.equals(cfgOpn.getUpPpReplyType()); 
            
        // package request
        if(TCP_PROVIDER_8583.equals(reader.getTransInfoByPort(chosenInPort).getProvider())) {
            
            ISOMsg m1 = Iso8583Util.createDummyISOMsg(BCUtils.getHomeDir()+"/sample/8583/"+op+".8583");
            Iso8583Util.setField(m1, BcConstants.ISO8583_OP_NAME, op);
            Iso8583Util.setField(m1, BcConstants.ISO8583_DOC_ID, docId);
            Iso8583Util.setField(m1, BcConstants.ISO8583_ORIG_DOC_ID, "");
            Iso8583Util.setField(m1, BcConstants.ISO8583_HOST_ID, hostIdentity);
            Iso8583Util.setField(m1, BcConstants.ISO8583_HOST_ID, partnerIdentity);
            
            requestText = Iso8583Util.packMsg(m1);
            
        } else {
            throw new RuntimeException("should go thru 8583");
        }
        
        
        // send reques
        String url = BCUtils.getFullUrlFromPort(chosenInPort);
        
        // MUST start a new camel context!!!
        CamelContext newCamel = new DefaultCamelContext();
        initCamel(newCamel);
        // get the endpoint from the camel context
        Endpoint endpoint = newCamel.getEndpoint(url);


        Exchange exchange = endpoint.createExchange(wantSyncReply? ExchangePattern.InOut : ExchangePattern.InOnly);
        exchange.getIn().setBody(requestText);

        Producer producer = endpoint.createProducer();
        // start the producer so it can operate
        producer.start();

        logger.info("sending pp request docId="+docId+", to url: "+url);
        logger.debug("rawMsg="+requestText);
        
        producer.process(exchange);
        
        if(wantSyncReply) {
            logger.info("waiting for sync reply...");
        }else {
            logger.info("waiting for async reply...");
        }
        
        if(wantSyncReply) {
            String syncResp = exchange.getOut().getBody(String.class);
            if(syncResp.equals(BcConstants.MSG_PP_ERROR)) {
                logger.warn("received error msg!!!!!!!");    
            } else {
                ISOMsg iso = Iso8583Util.unpackMsg(syncResp);
                String iso601Id = Iso8583Util.getField(iso, BcConstants.ISO8583_DOC_ID);
                logger.info("received sync reply: docId="+iso601Id);
            }
            // stop and exit the client
            producer.stop();
            System.exit(0);
        }


    }



    
    public void process(Exchange exchange) throws Exception {
 
        // process async response or ack
        String inUri = exchange.getFromEndpoint().getEndpointUri();
        String msg = exchange.getIn().getBody(String.class);
        logger.info("received async message from url="+exchange.getFromEndpoint().getEndpointUri());
        logger.info("rawMsg="+msg);
        
        // TODO handle error msg
        if(msg.equals(BcConstants.MSG_PP_ERROR)) {
            logger.warn("received error msg!!!!!!!");
            return;
        }
        
        ICfgInPort cfgIP = reader.getInPortByUri(inUri);
        // TODO try to unpack the msg and verify
        try {
            if(inUri.contains("queue")) {
                
            }else {
            ISOMsg iso = Iso8583Util.unpackMsg(msg);
            String iso601Id = Iso8583Util.getField(iso, BcConstants.ISO8583_DOC_ID);
            logger.info("received async reply: docId="+iso601Id);
            }
        } catch (Exception ex) {
            
        }
        
        // send sync pp ack
        //exchange.getOut().setBody("OK");
        //log("sent pp ack: OK");
        System.exit(0);
    }

    public String getOutPortName() {
        return outPortName;
    }

    public void setOutPortName(String outPortName) {
        this.outPortName = outPortName;
    }
}
