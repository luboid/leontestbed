package com.topfinance.cfg.dummy;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.ICfgNode;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.cfg.ICfgRouteRule;
import com.topfinance.cfg.om.OmCfgAMQInPort;
import com.topfinance.cfg.om.OmCfgAMQInfo;
import com.topfinance.cfg.om.OmCfgAMQOutPort;
import com.topfinance.cfg.om.OmCfgJettyInfo;
import com.topfinance.cfg.om.OmCfgNode;
import com.topfinance.cfg.om.OmCfgOperation;
import com.topfinance.cfg.om.OmCfgProtocol;
import com.topfinance.cfg.om.OmCfgRouteRule;
import com.topfinance.plugin.cnaps2.AckRoot;
import com.topfinance.plugin.cnaps2.DocRoot;

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
    public static String OPERATION_102 = "ibps.101.001.02";
    public static String OPERATION_601 = "saps.601.001.01";
    public static String OPERATION_900 = "ccms.900.001.01";
    
    public void testLoadConfigure() {
        try {
            System.out.println("testLoadConfigure...");

            DummyCfgReader instance = DummyCfgReader.getInstance();
            
            System.out.println("size of protocols: "+instance.listProtocol.size());
            System.out.println("size of operations: "+instance.listOperation.size());
            System.out.println("protocol belong to peration: "+
                               (instance.listOperation.get(0).getProtocol()==instance.listProtocol.get(0)));
            

            
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    };

    
    public void testDumpConfigure() {
        try {
        System.out.println("serialize configuration...");
        DummyCfgReader instance = new DummyCfgReader();
        // build the dummy data for testing

        // transportInfo
        OmCfgAMQInfo ti1 = new OmCfgAMQInfo();
        ti1.setName("PREFIX_HOST_AMQ");
        ti1.setProvider(JMS_PROVIDER_AMQ);
        ti1.setPrefix(PREFIX_HOST_AMQ);
        ti1.setBrokerUrl(BROKER_URL_HOST);
        instance.listTransportInfo.add(ti1);
        
        OmCfgAMQInfo ti2 = new OmCfgAMQInfo();
        ti2.setName("PREFIX_PARTNER_AMQ");
        ti2.setProvider(JMS_PROVIDER_AMQ);
        ti2.setPrefix(PREFIX_PARTNER_AMQ);
        ti2.setBrokerUrl(BROKER_URL_PARTNER);
        instance.listTransportInfo.add(ti2);
        
        OmCfgJettyInfo ti3 = new OmCfgJettyInfo();
        ti3.setName("PREFIX_HOST_JETTY");
        ti3.setProvider(HTTP_PROVIDER_JETTY);
        ti3.setPrefix(PREFIX_HOST_JETTY);
        instance.listTransportInfo.add(ti3);
        
        
        // protocol
        ICfgProtocol protocol = new OmCfgProtocol();
        protocol.setName("PROTOCOL_CNAPS2");
        protocol.setPluginName(PROTOCOL_CNAPS2);
        protocol.setUpSendAckToPP(BOOLEAN_FALSE);
        protocol.setDownRecievePPAck(BOOLEAN_FALSE);
        instance.listProtocol.add(protocol);
        
        // operation
        
        ICfgOperation opn1 = new OmCfgOperation();
        opn1.setName(OPERATION_101);
        opn1.setProtocol(protocol);
        opn1.setUpIsEnabled(BOOLEAN_TRUE);
        opn1.setUpReplyType(OP_REPLY_TYPE_ASYNC);
        opn1.setUpIsReply(BOOLEAN_FALSE);
        opn1.setDownIsEnabled(BOOLEAN_TRUE);
        opn1.setDownReplyType(OP_REPLY_TYPE_ASYNC);
        opn1.setDownIsReply(BOOLEAN_FALSE);
        instance.listOperation.add(opn1);
        
        ICfgOperation opn2 = new OmCfgOperation();
        opn2.setName(OPERATION_102);
        opn2.setProtocol(protocol);
        opn2.setUpIsEnabled(BOOLEAN_TRUE);
        opn2.setUpReplyType(OP_REPLY_TYPE_NOTIFY);
        opn1.setUpIsReply(BOOLEAN_TRUE);
        opn2.setDownIsEnabled(BOOLEAN_FALSE);
        instance.listOperation.add(opn2);
        
        ICfgOperation opn3 = new OmCfgOperation();
        opn3.setName(OPERATION_601);
        opn3.setProtocol(protocol);
        opn3.setUpIsEnabled(BOOLEAN_FALSE);
        opn3.setDownIsEnabled(BOOLEAN_TRUE);
        opn3.setDownReplyType(OP_REPLY_TYPE_NOTIFY);
        opn1.setDownIsReply(BOOLEAN_TRUE);
        instance.listOperation.add(opn3);
        
        // Inport
        OmCfgAMQInPort ip1 = new OmCfgAMQInPort();
        ip1.setName("QUEUE_UP_IN_ECHO");
        ip1.setTransportInfo(ti1);
        ip1.setUrl(QUEUE_UP_IN_ECHO);
        ip1.setDirection(DIRECTION_UP);
        ip1.setProtocol(protocol);
        instance.listInPort.add(ip1);
        
        OmCfgAMQInPort ip2 = new OmCfgAMQInPort();
        ip2.setName("HTTPURL_UP_IN_ECHO");
        ip2.setTransportInfo(ti3);
        ip2.setUrl(HTTPURL_UP_IN_ECHO);
        ip2.setDirection(DIRECTION_UP);
        ip2.setProtocol(protocol);
        instance.listInPort.add(ip2);
        
        // OutPort
        OmCfgAMQOutPort op1 = new OmCfgAMQOutPort();
        op1.setTransportInfo(ti2);
        op1.setUrl(QUEUE_UP_OUT_ECHO);
        op1.setName("QUEUE_UP_OUT_ECHO");
        op1.setDirection(DIRECTION_UP);
        instance.listOutPort.add(op1);
        
        // nodes
        ICfgNode host1 = new OmCfgNode();
        host1.setName("host1");
        host1.setType(NODETYPE_HOST);
//        host1.setIdentity("host1");
        instance.listNode.add(host1);
        
        ICfgNode host2 = new OmCfgNode();
        host2.setName("host2");
        host2.setType(NODETYPE_HOST);
//        host2.setIdentity("host2");
        instance.listNode.add(host2);
        
        ICfgNode partner1 = new OmCfgNode();
        partner1.setName("partner1");
        partner1.setType(NODETYPE_PARTNER);
//        partner1.setIdentity("partner1");
        instance.listNode.add(partner1);
        
        
        ICfgRouteRule rr1 = new OmCfgRouteRule();
        rr1.setName("rr1");
        rr1.setOperationMask("ibps.");
        rr1.setOutPort(op1);
        rr1.setSequence(1);
//        rr1.setInPort(ip1);
        rr1.setDirection(DIRECTION_UP);
        instance.listRouteRule.add(rr1);
        Strategy strategy = new CycleStrategy("id", "ref");
        Serializer serializer = new Persister(strategy);
        
        File result = new File(DummyCfgReader.FILESTORE);

        serializer.write(instance, result);
        System.out.println("Done");
    } catch (Exception ex) {
        ex.printStackTrace();
    }
    }
    
    public void testDumpDoc() {
        try {
            System.out.println("serialize sample document...");
            DocRoot docRoot = new DocRoot();
            docRoot.setDocId("123");
            docRoot.setHostIdentity("1234");
            docRoot.setPartnerIdentity("5678");
            docRoot.setOpName("ibps.102.001.01");
            docRoot.setOrigDocId("");
            String res = docRoot.toText();
            IOUtils.write(res, new FileWriter(new File(DummyCfgReader.SAMPLEDOC)));           

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
            IOUtils.write(res, new FileWriter(new File(DummyCfgReader.SAMPLEACK)));
            System.out.println("Done");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
