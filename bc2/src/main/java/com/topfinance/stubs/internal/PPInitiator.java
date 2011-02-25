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
import com.topfinance.runtime.BcConstants;
import com.topfinance.runtime.OpInfo;
import com.topfinance.stubs.StubUtils;
import com.topfinance.transform.util.ISOIBPSPackager;
import com.topfinance.transform.util.Iso8583Util;
import com.topfinance.util.BCUtils;
import com.topfinance.util.FilePathHelper;

public class PPInitiator implements CfgConstants{
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
    
    public static class Sender implements Runnable {
//      CamelContext camel;
    	public ICfgReader reader;
        String outPortName;
        String msgCode;
        
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
    	
    	PPInitiator pp;
    	
    	public Sender(PPInitiator pp, int maxtx, int interval) {
    		this.pp = pp;
    		this.reader = pp.reader;
    		this.maxtx = maxtx;
    		this.interval = interval;
    		init();
    	}
    	public void init() {
            // MUST start a new camel context!!!
            camel = new DefaultCamelContext();
            try {
            // init Camel Components
            // each component owns a set of settings shared by all bound inPorts or outPorts
            pp.initCamel(camel);
            } catch (Exception ex) {
            	throw new RuntimeException(ex);
            }
    	}
        CamelContext camel;
        int maxtx;
        int interval;
        
        public void run() {
            try {
            	logger.info("running camel...");
                if(maxtx==-1) {
                	maxtx = Integer.MAX_VALUE; 
                }
                long count=0;
                for(int i=0;i<maxtx;i++) {
                	count++;
                	sendRequest();
                	Thread.sleep(interval*1000);
                }
                logger.info("Thread["+Thread.currentThread().getId()+"] ended.. sent "+count+" txns.");
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        };
        
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
//            String op = TestDummy.OPERATION_101;
//            OpInfo opInfo = TestDummy.OPINFO_101;
            
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
//                Iso8583Util.setField(m1, BcConstants.ISO8583_OP_NAME, opInfo.toString());
                Iso8583Util.setField(m1, BcConstants.ISO8583_DOC_ID, docId);
                Iso8583Util.setField(m1, BcConstants.ISO8583_ORIG_DOC_ID, "");
//                Iso8583Util.setField(m1, BcConstants.ISO8583_HOST_ID, hostIdentity);
//                Iso8583Util.setField(m1, BcConstants.ISO8583_HOST_ID, partnerIdentity);
                
                requestText = Iso8583Util.packMsg(m1);
                
            } else {
                throw new RuntimeException("should go thru 8583");
            }
            
            
            boolean isInOnly = !wantSyncReply;
            // send reques
            String url = StubUtils.getFullUrlFromPortOut(chosenInPort, reader, isInOnly);
            


            // get the endpoint from the camel context
            Endpoint endpoint = camel.getEndpoint(url);


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
//                    ISOMsg iso = (ISOMsg)new Default8583ToCnaps2UpInMH().parseConvert(syncResp);
                    String iso601Id = Iso8583Util.getField(iso, BcConstants.ISO8583_DOC_ID);
                    logger.info("received sync reply: docId="+iso601Id);
                }
                // stop and exit the client
                producer.stop();
                System.exit(0);
            }
            
            producer.stop();

        }
        
    }
    
    public static class Receiver implements Runnable, Processor{
    	PPInitiator pp;
    	public Receiver(PPInitiator pp) {
    		this.pp = pp;
    		init();

    	}
    	public void init() {
            camel = new DefaultCamelContext();
            try {
            // init Camel Components
            // each component owns a set of settings shared by all bound inPorts or outPorts
            pp.initCamel(camel);
            // add route/listen
            camel.addRoutes(new MyRoute(this));
            camel.start();
            } catch (Exception ex) {
            	throw new RuntimeException(ex);
            }
    	}
      CamelContext camel;
      public void run() {
          try {
              System.out.println("running camel...");
              
          } catch (Exception ex) {
              ex.printStackTrace();
          }
      };
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
          
          ICfgPortIn cfgIP = pp.reader.getInPortByUri(inUri);
          // TODO try to unpack the msg and verify
          try {
              if(inUri.contains("queue")) {
                  
              }else {
              	// hard coded
              ISOMsg iso = Iso8583Util.unpackMsg(msg, new ISOIBPSPackager());
//                  ISOMsg iso = (ISOMsg)new Default8583ToCnaps2UpInMH().parseConvert(msg);
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
      
    }
    
    public static void log(String msg) {
        System.out.println("in PPInitator: "+msg);
    }
    public static void info(String msg) {
        System.out.println("[INFO] "+msg);
    }

    
    public static void main(String[] args) throws Exception{
        System.out.println("starting PPInitiator...");
        System.out.println("log4j conf is "+System.getProperty("log4j.configuration"));
        logger.info("log4j is working...");
        
        Options options = new Options();
        options.addOption("cfg", true, "configuration file");
        options.addOption("cfgType", true, "configuration type");
        options.addOption("outPortName", true, "outPort name");
        options.addOption("msgCode", true, "msg to send");
        options.addOption("maxthread", true, "no. of concurrent thread");
        options.addOption("maxtx", true, "no. of tx per thread");
        options.addOption("interval", true, "interval of sending in sec");
        
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
        int maxthread = 1;
        int maxtx = 1;
        int interval = 10;
        if(cmd.hasOption("maxthread")) {
        	maxthread = Integer.valueOf(cmd.getOptionValue("maxthread"));
        }
        if(cmd.hasOption("maxtx")) {
        	maxtx = Integer.valueOf(cmd.getOptionValue("maxtx"));
        }
        if(cmd.hasOption("interval")) {
        	interval = Integer.valueOf(cmd.getOptionValue("interval"));
        }
        
        log("cfg="+cfg+", cfgType="+cfgType+", op="+op);
        
        CfgImplFactory.setType(cfgType);
        CfgImplFactory.setConfig(cfg);
        
        
        PPInitiator pp = new PPInitiator();
        pp.init();
//        pp.setOutPortName(op);
//        pp.setMsgCode(msgCode);
        
        Receiver receiver = new Receiver(pp);
        log("start listening..");
        new Thread(receiver).start();
        

        for(int i=0;i<maxthread;i++) {
        	Sender sender = new Sender(pp, maxtx, interval);
        	sender.setOutPortName(op);
        	sender.setMsgCode(msgCode);
        	new Thread(sender).start();
        }
        
        
    }
    

    
    public void init() throws Exception{
        // load configurations
        reader = CfgImplFactory.loadCfgReader();

    }

    public void initCamel(CamelContext camel) {
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



  public ICfgReader reader;

    



}
