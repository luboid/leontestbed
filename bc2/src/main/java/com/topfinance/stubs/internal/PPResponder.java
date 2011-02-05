package com.topfinance.stubs.internal;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.ScheduledThreadPoolExecutor;

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

public class PPResponder implements Processor, CfgConstants{
    
    private static Logger logger = Logger.getLogger(PPResponder.class.getName());
    
    public static class MyRoute extends RouteBuilder{
        Processor processor;
        public MyRoute(Processor processor) {
            this.processor = processor;
        }
        public void configure() throws Exception {
            ICfgReader reader = CfgImplFactory.loadCfgReader();
            // server's down out is pp's down in
            List<ICfgPortOut> outPorts = reader.getListOfEnabledOutport();
            for (ICfgPortOut outPort : outPorts) {
                if (DIRECTION_UP.equals(outPort.getDirection())) {
                    continue;
                }
                String url = StubUtils.getFullUrlFromPortIn(outPort, reader, false);
                logger.info("listenning on url=" + url);
                from(url).process(processor);
            }
        }        
    }        
    public static void log(String msg) {
        logger.debug(msg);
    }
    CamelContext camel;
    ICfgReader reader;
    private final ExecutorService executor = new ScheduledThreadPoolExecutor(5);
    
    public static void main(String[] args) throws Exception{
        System.out.println("starting PPResponder...");
        Options options = new Options();
        options.addOption("cfg", true, "configuration file");
        options.addOption("cfgType", true, "configuration type");
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
        
        log("cfg="+cfg+", cfgType="+cfgType);
        
        CfgImplFactory.setConfig(cfg);
        CfgImplFactory.setType(cfgType);
        
        new PPResponder().start();
    }
    
    public void start() throws Exception{
        camel = new DefaultCamelContext();
        // load configurations
        reader = CfgImplFactory.loadCfgReader();
        
        // init Camel Components
        // each component owns a set of settings shared by all bound inPorts or outPorts

        List<ICfgTransIn> listTiIn = reader.getListOfTransIn();
        for(ICfgTransIn ti : listTiIn) {
            BCUtils.initCamelComponentIn(camel, ti);
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
        
        // add route/listen
        camel.addRoutes(new MyRoute(this));
        camel.start();

    }


    public void process(Exchange exchange) throws Exception {

        String msg = exchange.getIn().getBody(String.class);
        logger.info("received async message from url=" + exchange.getFromEndpoint().getEndpointUri());
        logger.debug("rawMsg="+msg);

        ISOMsg m = Iso8583Util.unpackMsg(msg, new ISOIBPSPackager());
//        ISOMsg m = (ISOMsg)new Default8583ToCnaps2UpInMH().parseConvert(msg);
        String docId_101 = Iso8583Util.getField(m, BcConstants.ISO8583_DOC_ID);
        
        String opInfostr = m.getString(BcConstants.ISO8583_OP_NAME);
        logger.info("received opInfo="+opInfostr+", docId="+docId_101);
        
        if(!opInfostr.contains(TestDummy.OPERATION_101)) {
            // only handle 101
            return;
        }

        List<ICfgPortIn> inPorts = reader.getListOfEnabledInport();

        String url = null;
        ICfgPortIn chosenInPort = null;
        // server's up in port is pp's up out port 
        for(ICfgPortIn inPort : inPorts) {
            if(DIRECTION_DOWN.equals(inPort.getDirection())) {
                continue;
            }
            
            // send to first 8583 port found
            if(TCP_PROVIDER_8583.equals(reader.getTransByPortIn(inPort).getProvider())) {
                chosenInPort = inPort;
                break;                
            }
        }

        // send async pp resp in separate thread
//        String op = TestDummy.OPERATION_102;
        OpInfo opInfo = TestDummy.OPINFO_102;
        ICfgOperation cfgOpn= reader.getOperation(reader.getProtByInPort(chosenInPort), opInfo.getMesgType());
        boolean wantSyncReply = CfgConstants.OP_REPLY_TYPE_SYNC.equals(cfgOpn.getUpPpReplyType());
        
        
        boolean isInOnly = !wantSyncReply;
        url = StubUtils.getFullUrlFromPortOut(chosenInPort, reader, isInOnly);
        
        String docId_102 = BCUtils.getUniqueDocId();
        String respText = "";
        if(TCP_PROVIDER_8583.equals(reader.getTransByPortIn(chosenInPort).getProvider())) {
            ISOMsg m1 = Iso8583Util.createDummyISOMsg(new ISOIBPSPackager(), FilePathHelper.sample8583(opInfo));
            // prepare 102
//            Iso8583Util.setField(m1, BcConstants.ISO8583_OP_NAME, op);
            Iso8583Util.setField(m1, BcConstants.ISO8583_DOC_ID, docId_102);
            Iso8583Util.setField(m1, BcConstants.ISO8583_ORIG_DOC_ID, docId_101);   

            respText = Iso8583Util.packMsg(m1);
        } else {
            throw new RuntimeException("should go thru 8583");
        }
        

        System.out.println();
        System.out.println("Press [enter] to trigger sending of 102 message (asynchronous reply)...");
        BufferedReader stdIn=new BufferedReader(new InputStreamReader(System.in));
        String s = stdIn.readLine();
        
        logger.info("dispatching 102 docId="+docId_102+", to url="+url);
        logger.debug("rawMsg="+respText); 
        
        executor.execute(new SendJob(url, camel, respText, wantSyncReply));
        
    }
    
    public static class SendJob implements Runnable{
        String url;
        CamelContext camel;
        String text;
        boolean wantSyncReply;
        public SendJob(String url, CamelContext camel, String text, boolean wantSyncReply) {
            this.url = url;
            this.camel = camel;
            this.text = text;
            this.wantSyncReply = wantSyncReply;
        }
            public void run() {
                try {
                    // get the endpoint from the camel context
                    Endpoint endpoint = camel.getEndpoint(url);

                    // create the exchange used for the communication
                    // we use the in out pattern for a synchronized exchange
                    // where we expect a response

                    
                    Exchange exchange = endpoint.createExchange(wantSyncReply? ExchangePattern.InOut : ExchangePattern.InOnly);
                    // set the input on the in body
                    // must you correct type to match the expected type of an
                    // Integer object
                    exchange.getIn().setBody(text);

                    // to send the exchange we need an producer to do it for us
                    Producer producer = endpoint.createProducer();
                    // start the producer so it can operate
                    producer.start();
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
                            ISOMsg iso = Iso8583Util.unpackMsg(syncResp, new ISOIBPSPackager());
//                            ISOMsg iso = (ISOMsg)new Default8583ToCnaps2UpInMH().parseConvert(syncResp);
                            String iso601Id = Iso8583Util.getField(iso, BcConstants.ISO8583_DOC_ID);
                            logger.info("received sync reply: docId="+iso601Id);
                        }
                    }
                    
                    // sync pp ack
//                    String ack = exchange.getOut().getBody(String.class);
//                    System.out.println("... received ack: " + ack);

                    // stop and exit the client
                    producer.stop();
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
    
    }
    
}
