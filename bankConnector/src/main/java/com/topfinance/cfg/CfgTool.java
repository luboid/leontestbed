package com.topfinance.cfg;

import com.topfinance.cfg.jpa.JpaCfgTransportAMQ;
import com.topfinance.cfg.jpa.JpaCfgDownOutMH;
import com.topfinance.cfg.jpa.JpaCfgInPort;
import com.topfinance.cfg.jpa.JpaCfgNode;
import com.topfinance.cfg.jpa.JpaCfgOperation;
import com.topfinance.cfg.jpa.JpaCfgOutPort;
import com.topfinance.cfg.jpa.JpaCfgProtocol;
import com.topfinance.cfg.jpa.JpaCfgReader;
import com.topfinance.cfg.jpa.JpaCfgRouteRule;
import com.topfinance.cfg.jpa.JpaCfgTransport8583;
import com.topfinance.cfg.jpa.JpaCfgTransportIBMMQ;
import com.topfinance.cfg.jpa.JpaCfgTransportInfo;
import com.topfinance.cfg.jpa.JpaCfgTransportJetty;
import com.topfinance.cfg.jpa.JpaCfgUpInMH;
import com.topfinance.cfg.xml.OmCfgTransport8583;
import com.topfinance.cfg.xml.OmCfgTransportAMQ;
import com.topfinance.cfg.xml.OmCfgInPort;
import com.topfinance.cfg.xml.OmCfgTransportJetty;
import com.topfinance.cfg.xml.OmCfgOperation;
import com.topfinance.cfg.xml.OmCfgOutPort;
import com.topfinance.cfg.xml.OmCfgRouteRule;
import com.topfinance.cfg.xml.OmCfgTransportIBMMQ;
import com.topfinance.cfg.xml.OmCfgTransportInfo;
import com.topfinance.cfg.xml.XmlCfgReader;
import com.topfinance.db.dao.IDao;

import java.beans.PropertyDescriptor;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

public class CfgTool {
    
    private static Logger logger = Logger.getLogger(CfgTool.class);
    
//    public final static String DBSTORE = "/spring-config-db.xml";
//    public final static String XMLSTORE = "D:/bankConnector/source/bin/runBC-A-config-FILE.xml";
    
    private ApplicationContext ctx;
    
    Map<Object, Object> mapping = new HashMap<Object, Object>();
    
    public void init(String sourceXmlConfig, String targetDbConfig) {
        logger.info("initializing DbCfgReader with spring: " + targetDbConfig + "...");
        ctx = new FileSystemXmlApplicationContext(targetDbConfig);
        logger.info("Done");
        
        xmlReader = XmlCfgReader.getInstance(sourceXmlConfig);

        jpaReader = JpaCfgReader.getInstance(targetDbConfig);
    }
    
    public CfgTool(String sourceXmlConfig, String targetDbConfig) {
        init(sourceXmlConfig, targetDbConfig);
    }
    
    XmlCfgReader xmlReader;
    JpaCfgReader jpaReader;
    
    private XmlCfgReader getXmlReader() {
        return xmlReader;
    }

    
    public void convertXml2Db() throws Exception {
        // clear everything
        testClear();
        
        
        // insert
        testInsertDownOutMH();
        testInsertUpInMH();
        testInsertNodes();
        testInsertTransportInfos();
        testInsertProtocols();
        
        testInsertOperations();
        testInsertOutPorts();
        testInsertInPorts();
        testInsertRouteRules();
        
        // read
        
        List<ICfgProtocol> prots = jpaReader.getListProtocol();
        System.out.println("prots: "+prots.size());
        
        for(ICfgProtocol prot : prots) {
            ICfgOperation opn = jpaReader.getOperation(prot, "101");
            System.out.println("prot="+prot.getName()+", opn="+opn);
        }
        
        ICfgInPort ip = jpaReader.getInportByName("HTTPURL_UP_IN_PP");
        System.out.println("url="+ip.getUrl());
        
        
    }
    
    public void testClear() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");
        Class[] classes = new Class[] {
           JpaCfgRouteRule.class,
           JpaCfgInPort.class,
           JpaCfgOutPort.class,
           JpaCfgOperation.class,
           JpaCfgProtocol.class,
           
           JpaCfgNode.class,
           JpaCfgTransportInfo.class,
           JpaCfgDownOutMH.class,
           JpaCfgUpInMH.class,
           
        };
        
        
        for(Class clazz : classes) {
            List objs = dao.getAll(clazz);
            for(Object obj : objs) {
                dao.remove(obj);
            }
        }
        
    }
    public void testInsertDownOutMH() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");
        
        XmlCfgReader reader = getXmlReader();
        for(ICfgDownOutMH xml : reader.dataHolder.listDownOutMH) {
            JpaCfgDownOutMH jpa = new JpaCfgDownOutMH();
            jpa.setName(xml.getName());
            jpa.setClazz(xml.getClazz());
            mapping.put(xml, jpa);
            dao.save(jpa);
        }
        // varify
        List<ICfgDownOutMH> downoutmh = dao.getAll(ICfgDownOutMH.class);
        System.out.println("number of downoutmh: "+downoutmh.size());
    }
    public void testInsertUpInMH() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");
        
        XmlCfgReader reader = getXmlReader();
        for(ICfgUpInMH xml : reader.dataHolder.listUpInMH) {
            JpaCfgUpInMH jpa = new JpaCfgUpInMH();
            jpa.setName(xml.getName());
            jpa.setClazz(xml.getClazz());
            mapping.put(xml, jpa);
            dao.save(jpa);
        }
        // varify
        List<ICfgUpInMH> upinmh = dao.getAll(ICfgUpInMH.class);
        System.out.println("number of upinmh: "+upinmh.size());
    }
    public void testInsertNodes() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");
        
        XmlCfgReader reader = getXmlReader();
        for(ICfgNode xml : reader.dataHolder.listNode) {
            JpaCfgNode jpa = new JpaCfgNode();
            jpa.setName(xml.getName());
            jpa.setType(xml.getType());
            mapping.put(xml, jpa);
            dao.save(jpa);
        }
        
        // varify
        List<ICfgNode> nodes = dao.getAll(ICfgNode.class);
        System.out.println("number of nodes: "+nodes.size());
    }
    
    
    public void testInsertTransportInfos() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");
        
        XmlCfgReader reader = getXmlReader();
        for(OmCfgTransportInfo xml : reader.dataHolder.listTransportInfo) {
            JpaCfgTransportInfo jpa = null;
            if(xml instanceof OmCfgTransportAMQ) {
                jpa = new JpaCfgTransportAMQ();
            }else if(xml instanceof OmCfgTransportIBMMQ) {
                jpa = new JpaCfgTransportIBMMQ();
            }else if(xml instanceof OmCfgTransportJetty) {
                jpa = new JpaCfgTransportJetty();
            }else if(xml instanceof OmCfgTransport8583) {
                jpa = new JpaCfgTransport8583();
            }else {
                throw new RuntimeException("unknown type of transport: "+xml.getClass().getName());
            }
            
            jpa.setName(xml.getName());
            jpa.setProvider(xml.getProvider());
            jpa.setPrefix(xml.getPrefix());
            
            Map<String, String> config = xml.getConfig();
            if(config!=null) {
                jpa.getMap().putAll(config);
            }else {
                System.out.println("============!!!!!!!!!!!!!!!!xxxxxxxxxxxxxxx");
            }
            
            
            mapping.put(xml, jpa);
            dao.save(jpa);
            
        }
        // varify
        List<ICfgTransportInfo> tis = dao.getAll(ICfgTransportInfo.class);
        System.out.println("number of transportinfos: "+tis.size());
    }
    
    public void testInsertProtocols() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");
        XmlCfgReader reader = getXmlReader();
        for(ICfgProtocol xml : reader.dataHolder.listProtocol) {
            JpaCfgProtocol jpa = new JpaCfgProtocol();
            jpa.setName(xml.getName());
            mapping.put(xml, jpa);
            dao.save(jpa);
        }
        // varify
        List<ICfgProtocol> ps = dao.getAll(ICfgProtocol.class);
        System.out.println("number of protocols: "+ps.size());
    }
    public void testInsertOperations() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");
        XmlCfgReader reader = getXmlReader();
        for(OmCfgOperation xml : reader.dataHolder.listOperation) {
            JpaCfgOperation jpa = new JpaCfgOperation();
            copy(xml, jpa);
            jpa.setProtocol((JpaCfgProtocol)mapping.get(xml.getProtocol()));
            
            mapping.put(xml, jpa);
            dao.save(jpa);
        }
        // varify
        List<ICfgOperation> opns = dao.getAll(ICfgOperation.class);
        System.out.println("number of operations: "+opns.size());
    }
    
    
    
    public void testInsertOutPorts() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");
        XmlCfgReader reader = getXmlReader();
        for(OmCfgOutPort xml : reader.dataHolder.listOutPort) {
            JpaCfgOutPort jpa = new JpaCfgOutPort();
            copy(xml, jpa);
            jpa.setNode((JpaCfgNode)mapping.get(xml.getNode()));
            jpa.setTransportInfo((JpaCfgTransportInfo)mapping.get(xml.getTransportInfo()));
            jpa.setDownOutMH((JpaCfgDownOutMH)mapping.get(xml.getDownOutMH()));
            mapping.put(xml, jpa);
            dao.save(jpa);
        }
        // varify
        List<ICfgOutPort> ops = dao.getAll(ICfgOutPort.class);
        System.out.println("number of outPorts: "+ops.size());
        
    }
    
    public void testInsertInPorts() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");
        XmlCfgReader reader = getXmlReader();
        for(OmCfgInPort xml : reader.dataHolder.listInPort) {
            JpaCfgInPort jpa = new JpaCfgInPort();
            copy(xml, jpa);
            jpa.setNode((JpaCfgNode)mapping.get(xml.getNode()));
            jpa.setAckPort((JpaCfgOutPort)mapping.get(xml.getAckPort()));
            jpa.setProtocol((JpaCfgProtocol)mapping.get(xml.getProtocol()));
            jpa.setTransportInfo((JpaCfgTransportInfo)mapping.get(xml.getTransportInfo()));
            jpa.setSyncReplyDownOutMH((JpaCfgDownOutMH)mapping.get(xml.getSyncReplyDownOutMH()));
            jpa.setUpInMH((JpaCfgUpInMH)mapping.get(xml.getUpInMH()));
            
            mapping.put(xml, jpa);
            dao.save(jpa);
        }
        
        // varify
        List<ICfgInPort> ips = dao.getAll(ICfgInPort.class);
        System.out.println("number of inPorts: "+ips.size());
    }
    
    public void testInsertRouteRules() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");
        XmlCfgReader reader = getXmlReader();
        for(OmCfgRouteRule xml : reader.dataHolder.listRouteRule) {
            JpaCfgRouteRule jpa = new JpaCfgRouteRule();
            copy(xml, jpa);
            
            jpa.setOutPort((JpaCfgOutPort)mapping.get(xml.getOutPort()));
            mapping.put(xml, jpa);
            dao.save(jpa);
        }
        
        // varify
        List<ICfgRouteRule> rrs = dao.getAll(ICfgRouteRule.class);
        System.out.println("number of routerules: "+rrs.size());
    }
    
    
    public static void copy(Object src, Object dest) throws Exception {
       PropertyDescriptor[] props = PropertyUtils.getPropertyDescriptors(dest);
       for(PropertyDescriptor prop : props) {
           Class clazz = prop.getPropertyType();
           String name = prop.getName();
//           System.out.println("name="+prop.getName()+", clazz: "+clazz);
           if(name.equals("class")) {
               continue;
           }
           
           PropertyDescriptor srcProp = PropertyUtils.getPropertyDescriptor(src, name);
           if(srcProp!=null) {
               Class srcClazz = srcProp.getPropertyType();
               if(srcClazz.equals(clazz)) {
                   Object value = BeanUtils.getProperty(src, name);
                   BeanUtils.setProperty(dest, name, value);
                   continue;
               }
           }
//           System.out.println("skipping name="+name);
       }
    }
    
    public final static String DBSTORE = "D:/bankConnector/source/bin/runBC-A-config-DB.xml";
    public final static String XMLSTORE = "D:/bankConnector/source/bin/runBC-A-config-FILE.xml";
//    public final static String DBSTORE = "D:/bankConnector/source/bin/runBC-B-config-DB.xml";
//    public final static String XMLSTORE = "D:/bankConnector/source/bin/runBC-B-config-FILE.xml";
    public static void main(String[] args) throws Exception {

        new CfgTool(XMLSTORE, DBSTORE).convertXml2Db();
        
        System.out.println("Done");
    }
    
}
