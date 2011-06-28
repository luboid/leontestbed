package com.topfinance.stubs.external;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.ScheduledThreadPoolExecutor;

import org.apache.activemq.camel.component.ActiveMQComponent;
import org.apache.camel.CamelContext;
import org.apache.camel.Component;
import org.apache.camel.Endpoint;
import org.apache.camel.Exchange;
import org.apache.camel.ExchangePattern;
import org.apache.camel.Processor;
import org.apache.camel.Producer;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.impl.DefaultCamelContext;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.PosixParser;
import org.apache.log4j.Logger;
import org.jpos.iso.ISOMsg;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

import com.topfinance.cfg.CfgAccessException;
import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgFormat;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgPortIn;
import com.topfinance.cfg.ICfgPortOut;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgTransIn;
import com.topfinance.cfg.ICfgTransOut;
import com.topfinance.cfg.TestDummy;
import com.topfinance.cfg.jpa.JpaCfgReader;
import com.topfinance.cfg.xml.XmlCfgReader;
import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.message.DefaultCnaps2Packer;
import com.topfinance.message.FormatFactory;
import com.topfinance.message.IMsgParser;
import com.topfinance.plugin.cnaps2.AckRoot;
import com.topfinance.plugin.cnaps2.Cnaps2Constants;
import com.topfinance.plugin.cnaps2.MsgHeader;
import com.topfinance.runtime.BcException;
import com.topfinance.runtime.OpInfo;
import com.topfinance.transform.util.ISOIBPSPackager;
import com.topfinance.transform.util.Iso8583Util;
import com.topfinance.transform.util.IsoHelper;
import com.topfinance.util.BCUtils;
import com.topfinance.util.FilePathHelper;
import com.topfinance.util.PerfUtil;

public class Broker implements Processor, CfgConstants{
    private static Logger logger = Logger.getLogger(Broker.class.getName());
    
    public static void log(String msg) {
        logger.debug("in Broker: "+msg);
    }
//    public static void perfLog(String s) {
//    	String log = new StringBuffer()
//    	.append(" t=").append(System.currentTimeMillis())
//    	.append(", m=").append(s)
//    	.append("[").append(Thread.currentThread().getName()).append("]")
//    	.toString();
//    	logger.warn(log);
//    }
    
    private static ApplicationContext ctx;
    
    public static class Dispatcher {
        public Dispatcher() {
        }
        
        public void preprocess(Exchange exchange) throws Exception {
        	String inUrl = exchange.getFromEndpoint().getEndpointUri();
        	exchange.getIn().setHeader("inUrl", inUrl);
        }
    }
    public static class MyRoute extends RouteBuilder{
        Processor processor;
        public MyRoute(Processor processor) {
            this.processor = processor;
        }
        public void configure() throws Exception {
        	Dispatcher dis = new Dispatcher();
        	
        	int threadSize = 32;
        	
            for (String inUrl : inUrlsA) {
                logger.info("listening on url: "+inUrl);

//                String seda="seda:process?waitForTaskToComplete=Always&timeout="+BcConstants.CHANNEL_DEFAULT_TIMEOUT+"&concurrentConsumers="+threadSize;
//                from(inUrl).bean(dis, "preprocess").to(seda);
//                from(seda).process(processor);
                from(inUrl).process(processor);
            }
            for (String inUrl : inUrlsB) {
                logger.info("listening on url: "+inUrl);
                
//                String seda2="seda:process2?waitForTaskToComplete=Always&timeout="+BcConstants.CHANNEL_DEFAULT_TIMEOUT+"&concurrentConsumers="+threadSize;
//                from(inUrl).bean(dis, "preprocess").to(seda2);
//                from(seda2).process(processor);
                from(inUrl).process(processor);
            }
        }        
    }        
    
    CamelContext camel;
    static ICfgReader readerA;
    static ICfgReader readerB;
    private final ExecutorService executor = new ScheduledThreadPoolExecutor(32);
    
    // maps of hostIds->outportUrl
//    static Map<String, String> routing = new HashMap<String, String>();
//    static List<String> inUrls = new ArrayList<String>();
    
    
    static List<String> inUrlsA = new ArrayList<String>();
    static List<String> outUrlsA = new ArrayList<String>();
    static List<String> inUrlsB = new ArrayList<String>();
    static List<String> outUrlsB = new ArrayList<String>();    
    
    
    
    public static void main(String[] args) throws Exception{
        
        
        System.out.println("starting Broker...");
        BCUtils.registerConverter();
        
        Options options = new Options();
        options.addOption("spring", true, "spring configuration file");
        options.addOption("cfgType", true, "configuration type");
        options.addOption("cfgA", true, "configuration file");
        options.addOption("cfgB", true, "configuration file");
        
        CommandLineParser parser = new PosixParser();
        CommandLine cmd = parser.parse( options, args);
        String spring=null, cfgA=null, cfgB=null, cfgType=null;

        // make sure it is there
        BCUtils.getHomeDir();

        if( cmd.hasOption( "spring" ) ) {
            spring = cmd.getOptionValue( "spring" );
        }
        log("spring="+spring);
        ctx = new FileSystemXmlApplicationContext(spring);
        
        if(cmd.hasOption("cfgType")) {
            cfgType = cmd.getOptionValue("cfgType");
            if(!CfgImplFactory.getSupportedTypes().contains(cfgType)) {
                throw new RuntimeException("cfgType ["+cfgType+"] not supported");
            }
        }
        
        if(cmd.hasOption("cfgA")) {
            cfgA = cmd.getOptionValue("cfgA");
        }
        log("cfgA="+cfgA);   
        
        if(cmd.hasOption("cfgB")) {
            cfgB = cmd.getOptionValue("cfgB");
        }
        log("cfgB="+cfgB);
        
        
        // hardcode
        if(CfgImplFactory.TYPE_DB.equals(cfgType)) {
            readerA = new JpaCfgReader(cfgA);
            readerB = new JpaCfgReader(cfgB);
            
            CfgImplFactory.setType(CfgImplFactory.TYPE_DB);
            CfgImplFactory.setConfig(cfgA);
        }
        else {
            readerA = new XmlCfgReader(cfgA);
            readerB = new XmlCfgReader(cfgB);
            CfgImplFactory.setType(CfgImplFactory.TYPE_FILE);
            CfgImplFactory.setConfig(cfgA);
        }
        
        new Broker().start();
    }
    
    public void start() throws Exception{
        camel = new DefaultCamelContext();
        
        loadPortConfig(readerA, inUrlsA, outUrlsA);
        loadPortConfig(readerB, inUrlsB, outUrlsB);
        
//         add route/listen
        camel.addRoutes(new MyRoute(this));
        camel.start();

    }

    private String findForwardUrl(String inUrl) {
        
        if(inUrlsA.contains(inUrl)) {
            return outUrlsB.get(0);  
        } else if(inUrlsB.contains(inUrl)){
            return outUrlsA.get(0);
        } else {
            throw new RuntimeException("cannot find forward url for inurl="+inUrl);
        }
        
    }
    
    private String findAckUrl(String inUrl) {
        if(inUrlsA.contains(inUrl)) {
            return outUrlsA.get(0);  
        } else if(inUrlsB.contains(inUrl)){
            return outUrlsB.get(0);
        } else {
            throw new RuntimeException("cannot find ack url for inurl="+inUrl);
        }
    }
    
    private void loadPortConfig(ICfgReader reader, List<String> inUrls, List<String> outUrls) throws CfgAccessException{
        List<ICfgTransIn> listTiIn = reader.getListOfTransIn();
        for(ICfgTransIn ti : listTiIn) {
            try {
                BCUtils.initCamelComponentIn(camel, ti);
            } catch (Exception ex) {
                logger.error("failed initializing camel components, quit...", ex);
                System.exit(0);
            }
//            String provider = ti.getProvider();
//            if(CfgConstants.JMS_PROVIDER_AMQ.equals(provider)) {
//                ActiveMQComponent amq = new ActiveMQComponent();
//                // ?? won't work unless define as normal JMSComponent
////                amq.setConnectionFactory(jmsInfo.getConnectionFactory());
//                ICfgAMQInfo amqji = (ICfgAMQInfo)ti;
//                amq.setBrokerURL(amqji.getBrokerUrl());
//                if(camel.getComponent(ti.getPrefix())!=null) {
//                    log("skip adding existed component: "+ti.getPrefix());
//                    continue;
//                }
//                camel.addComponent(ti.getPrefix(), amq);
//                log("adding component: "+ti.getPrefix()+", brokerUrl="+amqji.getBrokerUrl());
//            }
//            else if(CfgConstants.HTTP_PROVIDER_JETTY.equals(provider)) {
//                JettyHttpComponent jetty = new JettyHttpComponent();
//                ICfgJettyInfo jettyti = (ICfgJettyInfo)ti;
//                // TODO setting up JettyHttpComponent with jettyti
//                camel.addComponent(ti.getPrefix(), jetty);
//                log("adding component: "+ti.getPrefix());
//            }
        }
        
        List<ICfgTransOut> listTiOut = reader.getListOfTransOut();
        for(ICfgTransOut ti : listTiOut) {
            try {
                BCUtils.initCamelComponentOut(camel, ti);
                
                // TODO move broker configuration to separate XML instead of composing from A and B
                int threadSize = 32;
                String provider = ti.getProvider();
                Component comp = null;
                if(CfgConstants.JMS_PROVIDER_AMQ.equals(provider)) {
                	comp = camel.getComponent(ti.getPrefix());
                	((ActiveMQComponent)comp).setMaxConcurrentConsumers(threadSize);
                }
                
            } catch (Exception ex) {
                logger.error("failed initializing camel components, quit...", ex);
                System.exit(0);
            }
        }
        // for broker it's always async thus inonly
        boolean isInOnly = true;
        
        // bc's down in port is broker's out port
        // TODO consider multiple Down in port? 
        List<ICfgPortIn> ips = reader.getListOfEnabledInport();
        for(ICfgPortIn ip : ips) {
            if(DIRECTION_DOWN.equals(ip.getDirection())) {
                
                String url = BCUtils.getFullUrlFromPortIn(ip, reader, isInOnly);
                outUrls.add(url);
            }
        }
        
        // bc's up-out-port is broker's in port
        List<ICfgPortOut> ops = reader.getListOfEnabledOutport();
        for(ICfgPortOut op : ops) {
            if(DIRECTION_UP.equals(op.getDirection())) {
                inUrls.add(BCUtils.getFullUrlFromPortOut(op, reader, isInOnly));
            }
        }
    }

    public void process(Exchange exchange) throws Exception {
        
        // parse header and doc
    	try {
    		long s = PerfUtil.time();
    		PerfUtil.perfLog("start process");
    		
        String inUrl = exchange.getFromEndpoint().getEndpointUri();
//    	String inUrl = (String)exchange.getIn().getHeader("inUrl");
    		
        String message = exchange.getIn().getBody(String.class);
        logger.info("received message from url="+inUrl);
        logger.debug("rawMsg="+message);
        
        String headerText = message.substring(0, MsgHeader.TOTAL_LENGTH);
        logger.debug("header="+headerText);
        String bodyText = message.substring(MsgHeader.TOTAL_LENGTH);
        logger.debug("body="+bodyText);
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
        
        logger.info("mesgId="+mesgId+", mesgType="+mesgType+", sender="+origSender+", receiver="+origReceiver);
//        Writer w = new OutputStreamWriter(new FileOutputStream(BCUtils.getHomeDir()+"/bin/brokerlogs/"+mesgId+".log"), BcConstants.ENCODING);
//        w.write(bodyText);
//        w.flush();
//        w.close();
        
        
        if(mesgType.equals(TestDummy.OPERATION_990)) {
            // received ack
            AckRoot ackRoot = null;
            try {
                ackRoot = AckRoot.loadFromString(bodyText);
                String code = ackRoot.getMsgProCd();
                String ackMesgId = ackRoot.getMsgId();
                if(AckRoot.MSG_PRO_CD_SUCCESS.equals(code)) {
                    logger.info("received good ack for message: "+ackMesgId);
                }
                else {
                    logger.info("received bad ack for message: "+ackMesgId);
                }
            } catch (BcException ex) {
                ex.printStackTrace();
            }
            return;
        }
        
        
        String validateStatus = AckRoot.MSG_PRO_CD_SUCCESS;
        
        String ackUrl = findAckUrl(inUrl);
        String outUrl = findForwardUrl(inUrl);
        if(ackUrl==null) {
            logger.warn("!!!!cannot find ackUrl--downurl for parter with id{"+origSender+"}");
            validateStatus = AckRoot.MSG_PRO_CD_FAIL_VERIFY;
        }
        if(outUrl==null) {
            logger.warn("!!!!cannot find outUrl--downurl for parter with id{"+origReceiver+"}");
            validateStatus = AckRoot.MSG_PRO_CD_FAIL_VERIFY;
        }
        
        long s1 = PerfUtil.time();
        String pkgName = Cnaps2Constants.getPackageName(mesgType);
        Object jaxbObj = null;
        try {
//            jaxbObj = new Iso8583ToXml(pkgName).xmlToObject(bodyText);
        } catch (Exception ex) {
            ex.printStackTrace();
            validateStatus = AckRoot.MSG_PRO_CD_FAIL_VERIFY;
        }
        long e1 = PerfUtil.time();
        PerfUtil.perfLog(" cost "+(e1-s1)+", end xmlToObject" );
        
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
           TestDummy.OPERATION_990,
           // ??
           BCUtils.getUniqueMesgId(),
           mesgRefId
        ); 
        String ackText = msgHeader.toText()+ack.dumpToString();
        logger.info("sending 990 ack="+ackText);
        // send sync ack
//        exchange.getOut().setBody(ackText);
        
        // send async ack
//        executor.execute(new SendJob(ackText, ackUrl, camel));
        new SendJob(ackText, ackUrl, camel).run();
        
        
        // prepare and send response, hardcoded
        
        String outText = null;
        MsgHeader outHeader = null;
        if(mesgType.equals(TestDummy.OPERATION_101)){
            
            // forward 101 to B
            
            // header contains new unique mesgId??
            outHeader = new MsgHeader(
                                                origSender,
                                                origReceiver,
                                                mesgType,
                                                // always generate unique header level id
                                                BCUtils.getUniqueMesgId(), 
                                                mesgRefId
                                             );   
            // body no change
            outText = outHeader.toText()+bodyText;
            logger.info("forwarding 101 to BankB on url="+outUrl);
            executor.execute(new SendJob(outText, outUrl, camel));
        } else if(mesgType.equals(TestDummy.OPERATION_111) 
        		|| mesgType.equals(TestDummy.OPERATION_112)
        		|| mesgType.equals(TestDummy.OPERATION_122)) {
            // forward 111 to B
            
            // header contains new unique mesgId??
            outHeader = new MsgHeader(
                                                origSender,
                                                origReceiver,
                                                mesgType,
                                                // always generate unique header level id
                                                BCUtils.getUniqueMesgId(), 
                                                mesgRefId
                                             );   
            // body no change
            outText = outHeader.toText()+bodyText;
            logger.info("================forwarding "+mesgType+" to BankB on url="+outUrl);
            executor.execute(new SendJob(outText, outUrl, camel));   
            
            
//            String docId_111 = BCUtils.extractMsgId(jaxbObj);
//            // send 604 to A
//            OpInfo opInfo = TestDummy.OPINFO_604;
//            outHeader = new MsgHeader(
//                    origSender,
//                    origReceiver,
//                    opInfo.getMesgType(),
//                    // always generate unique header level id
//                    BCUtils.getUniqueId(), 
//                    mesgRefId
//                 );
//
//            // TODO 
//            ICfgProtocol prot = readerA.getProtocolByName(CfgConstants.PROTOCOL_CNAPS2);
//            ICfgOperation cfgOpn = readerA.getOperation(prot, opInfo.getMesgType()); 
//            Object ebo = createEbo(opInfo, prot, cfgOpn);
//            
//    		BeanUtils.setProperty(ebo, Cnaps2Constants.ORIG_MSG_ID_604_EBOFLD, docId_111);
//    		BeanUtils.setProperty(ebo, Cnaps2Constants.MSG_ID_EBOFLD, BCUtils.getUniqueDocId());
//    		// TODO check docid, opId, etc? 
//    		DefaultCnaps2Packer packer = new DefaultCnaps2Packer();
//    		String body = packer.packBody(ebo, cfgOpn, opInfo);
//    		outText = outHeader.toText()+body;
//            logger.info("=================forwarding 601 to BankA on url="+ackUrl);
//            executor.execute(new SendJob(outText, ackUrl, camel));
            
            
        } else if(mesgType.equals(TestDummy.OPERATION_102)) {
            String docId_102 = null, docId_101=null;
            
            if(jaxbObj!=null) {
                docId_102 = BCUtils.extractMsgId(jaxbObj);
                docId_101 = BCUtils.extractOrigMsgId(jaxbObj, mesgType, Cnaps2Constants.OPATHS_ORIG_MSG_ID);
                
            }
            
            
            
            // send 601 to A
            outHeader = new MsgHeader(
                                                origSender,
                                                origReceiver,
                                                TestDummy.OPERATION_601,
                                                // always generate unique header level id
                                                BCUtils.getUniqueId(), 
                                                mesgRefId
                                             );             

            // todo use a more generic way to generate jaxb obj
//            String op = TestDummy.OPERATION_601;
            OpInfo opInfo = TestDummy.OPINFO_601;
            // TODO 
            ICfgProtocol prot = readerA.getProtocolByName(CfgConstants.PROTOCOL_CNAPS2);
            ICfgOperation cfgOpn = readerA.getOperation(prot, opInfo.getMesgType()); 
            Object ebo = createEbo(opInfo, prot, cfgOpn);
    		
    		BeanUtils.setProperty(ebo, Cnaps2Constants.ORIG_MSG_ID_601_EBOFLD, docId_101);
    		BeanUtils.setProperty(ebo, Cnaps2Constants.MSG_ID_EBOFLD, BCUtils.getUniqueDocId());
    		// TODO check docid, opId, etc? 
    		DefaultCnaps2Packer packer = new DefaultCnaps2Packer();
    		String body = packer.packBody(ebo, cfgOpn, opInfo);
//    		outText = packer.addHeader(body, origSender, origReceiver, mesgType, mesgId, mesgRefId);
    		outText = outHeader.toText()+body;

//            Map<String, String> mapping = Iso8583ToXml.loadMappings(null);
//            if(true)
//            throw new RuntimeException("TODO");
//            
//            // however control the msgid fields with real data
//            mapping.put(Cnaps2Constants.MSG_ID_601, BCUtils.getUniqueDocId());
//            mapping.put(Cnaps2Constants.ORIG_MSG_ID_601, docId_101);            
//
//            
//            String pkg = Iso8583ToXml.getPackageName(TestDummy.OPERATION_601);
//            Iso8583ToXml converter = new Iso8583ToXml(pkg);
//            Object outBody = converter.iso8583ToObject(iso601, mapping);
//            outText = outHeader.toText()+converter.objectToXml(outBody);
            
            logger.info("forwarding 601 to BankA on url="+outUrl);
            executor.execute(new SendJob(outText, outUrl, camel));
            
            log("======================================================");
            // send 601 to B
            outHeader = new MsgHeader(
                                      // swap sender and receiver
                                                origReceiver,
                                                origSender,
                                                TestDummy.OPERATION_601,
                                                // always generate unique header level id
                                                BCUtils.getUniqueId(), 
                                                mesgRefId
                                             );             
            
//            mapping.put(Cnaps2Constants.MSG_ID_601, BCUtils.getUniqueDocId());
//            mapping.put(Cnaps2Constants.ORIG_MSG_ID_601, docId_102);  
//            converter = new Iso8583ToXml(pkg);
//            outBody = converter.iso8583ToObject(iso601, mapping);
//            outText = outHeader.toText()+converter.objectToXml(outBody);
            
    		BeanUtils.setProperty(ebo, Cnaps2Constants.ORIG_MSG_ID_601_EBOFLD, docId_102);
    		BeanUtils.setProperty(ebo, Cnaps2Constants.MSG_ID_EBOFLD, BCUtils.getUniqueDocId());
    		// TODO check docid, opId, etc? 
    		body = new DefaultCnaps2Packer().packBody(ebo, cfgOpn, opInfo);
    		outText = outHeader.toText()+body;
            logger.info("forwarding 601 to BankB on url="+ackUrl);
            executor.execute(new SendJob(outText, ackUrl, camel));
            
            
        }
        long e = PerfUtil.time();
        PerfUtil.perfLog(" cost "+(e-s)+", end process");
        
    	} catch (Exception ex) {
    		logger.error("ERROR IN BROKER!!!"+ex.getMessage());
    	}
    }
    public Object createEbo(OpInfo opInfo, ICfgProtocol prot, ICfgOperation cfgOpn) throws Exception{
        String iso8583601Sample = FilePathHelper.sample8583(opInfo);
        
        // todo Maybe a Cnaps2Util and a createDummyCnaps2 method
        //load other data from sample. 
        ISOMsg iso601 = Iso8583Util.createDummyISOMsg(IsoHelper.getDefaultISOPackager(), iso8583601Sample);
        

//        SimpleMappingRule rule = readerA.getMappingRule(null, cfgOpn, DIRECTION_UP);
        ICfgFormat format = readerA.getFormatByOpn(cfgOpn);
        
		String msg = Iso8583Util.packMsg(iso601);
		
		// process
		IMsgParser parser = FormatFactory.getMsgParser(format);
		Object ebo = parser.parseConvert(msg, format, prot); 
		
		return ebo;
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
            	
            	long s = PerfUtil.time();
                // get the endpoint from the camel context
                Endpoint endpoint = camel.getEndpoint(url);
                long e1 = PerfUtil.time();
                PerfUtil.perfLog(" cost "+(e1-s)+", end camel.getEndpoint" );
                
                // create the exchange used for the communication
                // we use the in out pattern for a synchronized exchange
                // where we expect a response
                Exchange exchange = endpoint.createExchange(ExchangePattern.InOnly);
                long e2 = PerfUtil.time();
                PerfUtil.perfLog(" cost "+(e2-e1)+", end endpoint.createExchange" );
                
                // set the input on the in body
                // must you correct type to match the expected type of an
                // Integer object
                exchange.getIn().setBody(text);

                // to send the exchange we need an producer to do it for us
                Producer producer = endpoint.createProducer();
                long e3 = PerfUtil.time();
                PerfUtil.perfLog(" cost "+(e3-e2)+", end createProducer" );
                
                // start the producer so it can operate
                producer.start();
                long e4 = PerfUtil.time();
                PerfUtil.perfLog(" cost "+(e4-e3)+", end producer.start()" );
                
                producer.process(exchange);
                long e5 = PerfUtil.time();
                PerfUtil.perfLog(" cost "+(e5-e4)+", end producer.process" );
                
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
