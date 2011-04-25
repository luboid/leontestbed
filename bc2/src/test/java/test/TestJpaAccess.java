package test;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import junit.framework.TestCase;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgPortIn;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.cfg.ICfgRouteRule;
import com.topfinance.cfg.TestDummy;
import com.topfinance.cfg.jpa.JpaCfgOperation;
import com.topfinance.cfg.jpa.JpaCfgProtocol;
import com.topfinance.cfg.jpa.JpaCfgReader;
import com.topfinance.cfg.jpa.JpaCfgTransIn;
import com.topfinance.cfg.jpa.dao.IProtocolManager;
import com.topfinance.cfg.xml.XmlCfgReader;
import com.topfinance.db.dao.IDao;
import com.topfinance.payment.ebo.TCfgFmtEleMapFileEbo;
import com.topfinance.payment.ebo.TCfgFmtEleMapRuleEbo;
import com.topfinance.runtime.OpInfo;
import com.topfinance.transform.simple.SimpleMappingRule;
import com.topfinance.util.BCUtils;
import com.topfinance.util.FilePathHelper;
import com.topfinance.util.OpTester;
import com.topfinance.util.ParseSampleXml;
import com.topfinance.util.ParseSampleXml.Entry;

public class TestJpaAccess extends TestCase {
    private static Logger logger = Logger.getLogger(TestJpaAccess.class);
//    public final static String DBSTORE = "/test/applicationContext-db.xml";
    public final static String DBSTORE = "D:/bankConnector/source/bin/runBC-A-config-DB.xml";
    
    public final static String XMLSTORE = "D:/bankConnector/source/bin/runBC-A-config-FILE.xml";
    
    
    private ApplicationContext ctx;
    
    public void debug(String s) {
        System.out.println(s);
    }
    
    Map<Object, Object> mapping = new HashMap<Object, Object>();
    
    public void init(String config) {
        logger.info("initializing DbCfgReader with spring: " + config + "...");
        ctx = new FileSystemXmlApplicationContext(config);
        logger.info("Done");
    }
    protected void setUp() throws Exception {
        super.setUp();
        init(DBSTORE);
    }
    
    private XmlCfgReader getXmlReader() {
        return XmlCfgReader.getInstance(XMLSTORE);
    }    
    
    private JpaCfgReader getJpaReader() {
        return JpaCfgReader.getInstance(DBSTORE);
    }
    
    public void testReadProtocol() throws Exception {
        
        IProtocolManager dao = (IProtocolManager)ctx.getBean("protocolManager");
        dao.getAllProtocolList();
        
    }
    public void testReadInheritance() {
        try {
            IDao dao = (IDao) ctx.getBean("dao");
            String hql = "from " + JpaCfgTransIn.class.getSimpleName()
                    + " ti";
            Object[] paras = new Object[] {};
            List list = dao.find(hql, paras);
            for (Object o : list) {
                JpaCfgTransIn ti = (JpaCfgTransIn) o;
                System.out.println("ti.class="+ti.getClass().getName()+", name="+ti.getName());
            }
            
            debug("Done");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    
    public void testWriteandReadProtocol() throws Exception {
        
        IProtocolManager dao = (IProtocolManager)ctx.getBean("protocolManager");
        JpaCfgProtocol ebo = new JpaCfgProtocol();
        ebo.setName("cnaps");

        dao.save(ebo);
        
        List ebos = dao.getAllProtocolList();
        for(Object o : ebos) {
            JpaCfgProtocol eb = (JpaCfgProtocol)o;
            System.out.println("name="+eb.getName());
            
        }
        
    }
    public void testWriteAndReadHierarchy() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");;
        JpaCfgProtocol ebo = new JpaCfgProtocol();
        ebo.setName("cnaps");
        
//        ebo.setPluginName("xxx");
//        ebo.setUpSendAckToPP("T");
//        ebo.setDownRecievePPAck("F");
        
        dao.save(ebo);
        
        List ebos = dao.getAll(JpaCfgProtocol.class);
        
        JpaCfgProtocol eb = (JpaCfgProtocol)ebos.get(0);
        
        JpaCfgOperation opn = new JpaCfgOperation();
        opn.setProtocol(eb);
        opn.setName("101");
        dao.save(opn);
    }
    
    public void testQuery() throws Exception{
        IDao dao = (IDao)ctx.getBean("dao");;
        // get operation by protocol
        String hql = "from "+JpaCfgOperation.class.getSimpleName()+" opn where opn.protocol.uid = ? and opn.name=? ";
        Object[] paras = new Object[] {3004, "101"};
        List list = dao.find(hql, paras);
        
        for(Object o : list ) {
            JpaCfgOperation opn = (JpaCfgOperation)o;
            System.out.println("opn id="+opn.getUid()+", name="+opn.getName());
            System.out.println("protocol="+opn.getProtocol().getName());
        }
        
        System.out.println("done");
        
    }
    
    public void testWriteAndReadConfig() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");;
        JpaCfgProtocol p1 = new JpaCfgProtocol();
        p1.setName("abc");
        p1.setKey1("key1");
        p1.setKey2("2");
        
        dao.save(p1);
        int id = p1.getUid();
        System.out.println("p1="+p1+", id="+id);
        
        p1 = dao.get(JpaCfgProtocol.class, id);
        System.out.println("p1="+p1+", key1="+p1.getKey1()+", key2="+p1.getKey2());
        
    }
    
    public void testUpdateAndReadConfig() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");
        int id = 2;
        JpaCfgProtocol p1 = dao.get(JpaCfgProtocol.class, id);
        System.out.println("p1="+p1+", key1="+p1.getKey1()+", key2="+p1.getKey2());
        
        p1.setKey2(p1.getKey2()+"-c");
        
        dao.update(p1);
        System.out.println("p1="+p1+", id="+id);
        
    }
    
    public void testJpaCfgReader() throws Exception {

        // read
        
        List<ICfgProtocol> prots = getJpaReader().getListProtocol();
        System.out.println("prots: "+prots.size());
        
        for(ICfgProtocol prot : prots) {
            ICfgOperation opn = getJpaReader().getOperation(prot, "101");
            System.out.println("prot="+prot.getName()+", opn="+opn);
        }
        
        ICfgPortIn ip = getJpaReader().getInportByName("HTTPURL_UP_IN_PP");
        System.out.println("url="+ip.getUrl());
        
        List<ICfgRouteRule> rrs = getJpaReader().getListUpRoute();
        System.out.println("size of rrs: "+rrs.size());
        
        ICfgOperation opn = getJpaReader().getOperation(prots.get(0), TestDummy.OPERATION_101);
        System.out.println("opn: "+opn.getName());
        
        
    }

}
