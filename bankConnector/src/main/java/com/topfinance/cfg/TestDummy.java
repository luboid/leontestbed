package com.topfinance.cfg;

import com.topfinance.cfg.xml.OmCfgTransportAMQ;
import com.topfinance.cfg.xml.OmCfgInPort;
import com.topfinance.cfg.xml.OmCfgTransportJetty;
import com.topfinance.cfg.xml.OmCfgNode;
import com.topfinance.cfg.xml.OmCfgOperation;
import com.topfinance.cfg.xml.OmCfgOutPort;
import com.topfinance.cfg.xml.OmCfgProtocol;
import com.topfinance.cfg.xml.OmCfgRouteRule;
import com.topfinance.cfg.xml.XmlCfgReader;
import com.topfinance.plugin.cnaps2.AckRoot;

import java.io.File;
import java.io.FileWriter;

import junit.framework.TestCase;
import org.apache.commons.io.IOUtils;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;
import org.simpleframework.xml.strategy.CycleStrategy;
import org.simpleframework.xml.strategy.Strategy;

public class TestDummy extends TestCase implements CfgConstants{
    public static String PREFIX_HOST_AMQ = "amqhost";
    public static String BROKER_URL_HOST = "tcp://localhost:61610";
    
    public static String PREFIX_PARTNER_AMQ = "amqpartner";
    public static String BROKER_URL_PARTNER = "tcp://localhost:61111";
    
    // TODO this has to be "jetty", refering to JettyHttpComponent.createEndpoint(). 
    // This has to be regarded as a bug which deny usage of non-default schema name
    public static String PREFIX_HOST_JETTY = "jettyhost";
    public static String HTTPURL_UP_IN_ECHO = "http://127.0.0.1:6060/echo";
    
    public static String QUEUE_UP_IN_ECHO = "queue:up_in_echo";
    
    public static String QUEUE_UP_OUT_ECHO = "queue:up_out_echo";
    
    public static String OPERATION_101 = "ibps.101.001.01";
    public static String OPERATION_102 = "ibps.102.001.01";
    public static String OPERATION_601 = "saps.601.001.01";
    public static String OPERATION_990 = "ccms.990.001.01";
    
    public void testLoadConfigure() {
        try {
            System.out.println("testLoadConfigure...");

            XmlCfgReader instance = XmlCfgReader.getInstance(XmlCfgReader.FILESTORE);
            
            System.out.println("size of protocols: "+instance.getDataHolder().listProtocol.size());
            System.out.println("size of operations: "+instance.getDataHolder().listOperation.size());
//            System.out.println("protocol belong to peration: "+
//                               (instance.listOperation.get(0).getProtocol()==instance.listProtocol.get(0)));
//            

            
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    };

    
    public void testDumpConfigure() {
        try {
        System.out.println("serialize configuration...");
        XmlCfgReader instance = new XmlCfgReader(XmlCfgReader.FILESTORE);
        // build the dummy data for testing

        // transportInfo
        OmCfgTransportAMQ ti1 = new OmCfgTransportAMQ();
        ti1.setName("PREFIX_HOST_AMQ");
        ti1.setProvider(JMS_PROVIDER_AMQ);
        ti1.setPrefix(PREFIX_HOST_AMQ);
        ti1.setBrokerUrl(BROKER_URL_HOST);
        instance.getDataHolder().listTransportInfo.add(ti1);
        
        OmCfgTransportAMQ ti2 = new OmCfgTransportAMQ();
        ti2.setName("PREFIX_PARTNER_AMQ");
        ti2.setProvider(JMS_PROVIDER_AMQ);
        ti2.setPrefix(PREFIX_PARTNER_AMQ);
        ti2.setBrokerUrl(BROKER_URL_PARTNER);
        instance.getDataHolder().listTransportInfo.add(ti2);
        
        OmCfgTransportJetty ti3 = new OmCfgTransportJetty();
        ti3.setName("PREFIX_HOST_JETTY");
        ti3.setProvider(HTTP_PROVIDER_JETTY);
        ti3.setPrefix(PREFIX_HOST_JETTY);
        instance.getDataHolder().listTransportInfo.add(ti3);
        
        
        // protocol
        OmCfgProtocol protocol = new OmCfgProtocol();
        protocol.setName("PROTOCOL_CNAPS2");
        protocol.setName(PROTOCOL_CNAPS2);
//        protocol.setUpSendAckToPP(BOOLEAN_FALSE);
//        protocol.setDownRecievePPAck(BOOLEAN_FALSE);
        instance.getDataHolder().listProtocol.add(protocol);
        
        // operation
        
        OmCfgOperation opn1 = new OmCfgOperation();
        opn1.setName(OPERATION_101);
        opn1.setProtocol(protocol);
//        opn1.setUpIsEnabled(BOOLEAN_TRUE);
//        opn1.setUpReplyType(OP_REPLY_TYPE_ASYNC);
//        opn1.setUpIsReply(BOOLEAN_FALSE);
//        opn1.setDownIsEnabled(BOOLEAN_TRUE);
//        opn1.setDownReplyType(OP_REPLY_TYPE_ASYNC);
//        opn1.setDownIsReply(BOOLEAN_FALSE);
        instance.getDataHolder().listOperation.add(opn1);
        
        OmCfgOperation opn2 = new OmCfgOperation();
        opn2.setName(OPERATION_102);
        opn2.setProtocol(protocol);
//        opn2.setUpIsEnabled(BOOLEAN_TRUE);
//        opn2.setUpReplyType(OP_REPLY_TYPE_NOTIFY);
//        opn1.setUpIsReply(BOOLEAN_TRUE);
//        opn2.setDownIsEnabled(BOOLEAN_FALSE);
        instance.getDataHolder().listOperation.add(opn2);
        
        OmCfgOperation opn3 = new OmCfgOperation();
        opn3.setName(OPERATION_601);
        opn3.setProtocol(protocol);
//        opn3.setUpIsEnabled(BOOLEAN_FALSE);
//        opn3.setDownIsEnabled(BOOLEAN_TRUE);
//        opn3.setDownReplyType(OP_REPLY_TYPE_NOTIFY);
//        opn1.setDownIsReply(BOOLEAN_TRUE);
        instance.getDataHolder().listOperation.add(opn3);
        
        // Inport
        OmCfgInPort ip1 = new OmCfgInPort();
        ip1.setName("QUEUE_UP_IN_ECHO");
        ip1.setTransportInfo(ti1);
        ip1.setUrl(QUEUE_UP_IN_ECHO);
        ip1.setDirection(DIRECTION_UP);
        ip1.setProtocol(protocol);
        instance.getDataHolder().listInPort.add(ip1);
        
        OmCfgInPort ip2 = new OmCfgInPort();
        ip2.setName("HTTPURL_UP_IN_ECHO");
        ip2.setTransportInfo(ti3);
        ip2.setUrl(HTTPURL_UP_IN_ECHO);
        ip2.setDirection(DIRECTION_UP);
        ip2.setProtocol(protocol);
        instance.getDataHolder().listInPort.add(ip2);
        
        // OutPort
        OmCfgOutPort op1 = new OmCfgOutPort();
        op1.setTransportInfo(ti2);
        op1.setUrl(QUEUE_UP_OUT_ECHO);
        op1.setName("QUEUE_UP_OUT_ECHO");
        op1.setDirection(DIRECTION_UP);
        instance.getDataHolder().listOutPort.add(op1);
        
        // nodes
        OmCfgNode host1 = new OmCfgNode();
        host1.setName("host1");
        host1.setType(NODETYPE_HOST);
//        host1.setIdentity("host1");
        instance.getDataHolder().listNode.add(host1);
        
        OmCfgNode host2 = new OmCfgNode();
        host2.setName("host2");
        host2.setType(NODETYPE_HOST);
//        host2.setIdentity("host2");
        instance.getDataHolder().listNode.add(host2);
        
        OmCfgNode partner1 = new OmCfgNode();
        partner1.setName("partner1");
        partner1.setType(NODETYPE_PARTNER);
//        partner1.setIdentity("partner1");
        instance.getDataHolder().listNode.add(partner1);
        
        
        OmCfgRouteRule rr1 = new OmCfgRouteRule();
        rr1.setName("rr1");
        rr1.setOperationMask("ibps.");
        rr1.setOutPort(op1);
        rr1.setSequence(1);
//        rr1.setInPort(ip1);
        rr1.setDirection(DIRECTION_UP);
        instance.getDataHolder().listRouteRule.add(rr1);
        Strategy strategy = new CycleStrategy("id", "ref");
        Serializer serializer = new Persister(strategy);
        
        File result = new File(XmlCfgReader.FILESTORE);

        serializer.write(instance, result);
        System.out.println("Done");
    } catch (Exception ex) {
        ex.printStackTrace();
    }
    }
    
    public void testDumpDoc() {
        try {
            System.out.println("serialize sample document...");
//            DocRoot docRoot = new DocRoot();
//            docRoot.setDocId("123");
//            docRoot.setHostIdentity("1234");
//            docRoot.setPartnerIdentity("5678");
//            docRoot.setOpName("ibps.102.001.01");
//            docRoot.setOrigDocId("");
//            String res = docRoot.toText();
//            IOUtils.write(res, new FileWriter(new File(DummyCfgReader.SAMPLEDOC)));           

            System.out.println("Done");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    public void testDumpAck() {
        try {
            System.out.println("serialize sample ack...");
            AckRoot ackRoot = new AckRoot();
            ackRoot.setMsgId("abc");
            ackRoot.setMsgProCd(AckRoot.MSG_PRO_CD_SUCCESS);
            
            String res = ackRoot.dumpToString();
            IOUtils.write(res, new FileWriter(new File(XmlCfgReader.SAMPLEACK)));
            System.out.println("Done");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
