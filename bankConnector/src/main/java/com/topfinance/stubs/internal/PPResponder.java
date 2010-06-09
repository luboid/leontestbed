package com.topfinance.stubs.internal;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgTransportInfo;
import com.topfinance.cfg.dummy.TestDummy;
import com.topfinance.plugin.cnaps2.utils.ISOIBPSPackager;
import com.topfinance.runtime.BcConstants;
import com.topfinance.util.BCUtils;

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
import org.jpos.iso.ISOField;
import org.jpos.iso.ISOMsg;
import org.jpos.iso.ISOPackager;

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
            List<ICfgOutPort> outPorts = reader.getListOfEnabledOutport();
            for (ICfgOutPort outPort : outPorts) {
                if (DIRECTION_UP.equals(outPort.getDirection())) {
                    continue;
                }
                String url = BCUtils.getFullUrlFromPort(outPort);
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
            BCUtils.initCamelComponent(camel, ti);
        }
        
        // add route/listen
        camel.addRoutes(new MyRoute(this));
        camel.start();

    }


    public void process(Exchange exchange) throws Exception {

        String msg = exchange.getIn().getBody(String.class);
        logger.info("received message from url=" + exchange.getFromEndpoint().getEndpointUri());
        logger.debug("rawMsg="+msg);

        ISOMsg m = new ISOMsg();
        m.setPackager(new ISOIBPSPackager());
        m.unpack(msg.getBytes(BcConstants.ENCODING));
        String docId_101 = (String)m.getValue(BcConstants.ISO8583_DOC_ID);
        
        String opName = m.getString(BcConstants.ISO8583_OP_NAME);
        logger.info("received opName="+opName+", docId="+docId_101);
        
        if(!TestDummy.OPERATION_101.equals(opName)) {
            // only handle 101
            return;
        }

        List<ICfgInPort> inPorts = reader.getListOfEnabledInport();

        String url = null;
        ICfgInPort chosenInPort = null;
        // server's up in port is pp's up out port 
        for(ICfgInPort inPort : inPorts) {
            if(DIRECTION_DOWN.equals(inPort.getDirection())) {
                continue;
            }
            
            // send to first 8583 port found
            if(TCP_PROVIDER_8583.equals(reader.getTransInfoByPort(inPort).getProvider())) {
                chosenInPort = inPort;
                break;                
            }
        }
        
        url = BCUtils.getFullUrlFromPort(chosenInPort);
        
        String docId_102 = BCUtils.getUniqueDocId();
        String respText = "";
        if(TCP_PROVIDER_8583.equals(reader.getTransInfoByPort(chosenInPort).getProvider())) {
            ISOMsg m1 = new ISOMsg();
            ISOPackager packager = new ISOIBPSPackager();
            m1.setPackager (packager);
            // prepare 102
            m1.set (new ISOField (BcConstants.ISO8583_START,  BcConstants.ISO8583_START_VALUE));
            m1.set (new ISOField (BcConstants.ISO8583_OP_NAME,  TestDummy.OPERATION_102));
            m1.set (new ISOField (BcConstants.ISO8583_DOC_ID, docId_102));
            m1.set (new ISOField (BcConstants.ISO8583_ORIG_DOC_ID,  docId_101));

            respText = new String(m1.pack(), BcConstants.ENCODING);
        } else {
            throw new RuntimeException("should go thru 8583");
        }
        


        logger.info("dispatching 102 docId="+docId_102+", to url="+url);
        logger.debug("rawMsg="+respText);
        // send async pp resp in separate thread
        executor.execute(new SendJob(url, camel, respText));
        
    }
    
    public static class SendJob implements Runnable{
        String url;
        CamelContext camel;
        String text;
        public SendJob(String url, CamelContext camel, String text) {
            this.url = url;
            this.camel = camel;
            this.text = text;
        }
            public void run() {
                try {
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
