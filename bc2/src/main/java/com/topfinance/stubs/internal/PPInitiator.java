package com.topfinance.stubs.internal;

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

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgPortIn;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgPortOut;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgTransIn;
import com.topfinance.cfg.ICfgTransOut;
import com.topfinance.cfg.TestDummy;
import com.topfinance.plugin.cnaps2.utils.ISOIBPSPackager;
import com.topfinance.runtime.BcConstants;
import com.topfinance.runtime.OpInfo;
import com.topfinance.stubs.StubUtils;
import com.topfinance.util.BCUtils;
import com.topfinance.util.FilePathHelper;
import com.topfinance.util.Iso8583Util;

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
            List<ICfgPortOut> outPorts = reader.getListOfEnabledOutport();
            for(ICfgPortOut outPort : outPorts) {
                if(DIRECTION_UP.equals(outPort.getDirection())) {
                    continue;
                }
                String url = StubUtils.getFullUrlFromPortIn(outPort, reader, false);
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
    String msgCode;
    
    public static void main(String[] args) throws Exception{
        System.out.println("starting PPInitiator...");
        System.out.println("log4j conf is "+System.getProperty("log4j.configuration"));
        logger.info("log4j is working...");
        
        Options options = new Options();
        options.addOption("cfg", true, "configuration file");
        options.addOption("cfgType", true, "configuration type");
        options.addOption("outPortName", true, "outPort name");
        options.addOption("msgCode", true, "msg to send");
        
        CommandLineParser parser = new PosixParser();
        CommandLine cmd = parser.parse( options, args);
        String cfg=null, cfgType=null, msgCode=null;

        // make sure it is there
        BCUtils.getHomeDir();

        
        if(cmd.hasOption("msgCode")) {
        	msgCode = cmd.getOptionValue("msgCode");
        }
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
        pp.setMsgCode(msgCode);
        
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
        List<ICfgTransIn> listTiIn = reader.getListOfTransIn();
        for (ICfgTransIn ti : listTiIn) {
            try {
                BCUtils.initCamelComponentIn(camel, ti);
            } catch (Exception ex) {
                logger.error("failed initializing camel components, quit...", ex);
                System.exit(0);
            }
        }
        
        List<ICfgTransOut> listTiOut = reader.getListOfTransOut();
        for(ICfgTransOut ti : listTiOut) {
            try {
                BCUtils.initCamelComponentOut(camel, ti);
            } catch (Exception ex) {
                logger.error("failed initializing camel components, quit...", ex);
                System.exit(0);
            }
        }
    }

    private void sendRequest() throws Exception {
        // prepare pp request
        List<ICfgPortIn> inPorts = reader.getListOfEnabledInport();
        
        
        ICfgPortIn chosenInPort = null;
        // server's up in port is pp's up out port 
        for(ICfgPortIn inPort : inPorts) {
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
//        String op = TestDummy.OPERATION_101;
//        OpInfo opInfo = TestDummy.OPINFO_101;
        
        OpInfo opInfo = null;
        if(msgCode==null) {
        	opInfo = TestDummy.OPINFO_111;
        }else if("111".equals(msgCode)) {
        	opInfo = TestDummy.OPINFO_111;
        }else if("101".equals(msgCode)) {
        	opInfo = TestDummy.OPINFO_101;
        }
        
        logger.info("msgCode="+msgCode+", opInfo="+opInfo.toString());
        
        ICfgOperation cfgOpn= reader.getOperation(reader.getProtByInPort(chosenInPort), opInfo.getMesgType());
        
        boolean wantSyncReply = CfgConstants.OP_REPLY_TYPE_SYNC.equals(cfgOpn.getUpPpReplyType()); 
            
        // package request
        if(TCP_PROVIDER_8583.equals(reader.getTransByPortIn(chosenInPort).getProvider())) {
            
            ISOMsg m1 = Iso8583Util.createDummyISOMsg(new ISOIBPSPackager(), FilePathHelper.sample8583(opInfo));
//            Iso8583Util.setField(m1, BcConstants.ISO8583_OP_NAME, opInfo.toString());
            Iso8583Util.setField(m1, BcConstants.ISO8583_DOC_ID, docId);
            Iso8583Util.setField(m1, BcConstants.ISO8583_ORIG_DOC_ID, "");
//            Iso8583Util.setField(m1, BcConstants.ISO8583_HOST_ID, hostIdentity);
//            Iso8583Util.setField(m1, BcConstants.ISO8583_HOST_ID, partnerIdentity);
            
            requestText = Iso8583Util.packMsg(m1);
            
        } else {
            throw new RuntimeException("should go thru 8583");
        }
        
        
        boolean isInOnly = !wantSyncReply;
        // send reques
        String url = StubUtils.getFullUrlFromPortOut(chosenInPort, reader, isInOnly);
        
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
            	// hard coded
                ISOMsg iso = Iso8583Util.unpackMsg(syncResp, new ISOIBPSPackager());
//                ISOMsg iso = (ISOMsg)new Default8583ToCnaps2UpInMH().parseConvert(syncResp);
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
        
        ICfgPortIn cfgIP = reader.getInPortByUri(inUri);
        // TODO try to unpack the msg and verify
        try {
            if(inUri.contains("queue")) {
                
            }else {
            	// hard coded
            ISOMsg iso = Iso8583Util.unpackMsg(msg, new ISOIBPSPackager());
//                ISOMsg iso = (ISOMsg)new Default8583ToCnaps2UpInMH().parseConvert(msg);
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
	public String getMsgCode() {
		return msgCode;
	}
	public void setMsgCode(String msgCode) {
		this.msgCode = msgCode;
	}
}
