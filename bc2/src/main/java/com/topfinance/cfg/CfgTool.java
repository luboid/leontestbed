package com.topfinance.cfg;

import java.beans.PropertyDescriptor;
import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;

import com.topfinance.cfg.jpa.JpaCfgFormat;
import com.topfinance.cfg.jpa.JpaCfgFormat8583;
import com.topfinance.cfg.jpa.JpaCfgPortIn;
import com.topfinance.cfg.jpa.JpaCfgNode;
import com.topfinance.cfg.jpa.JpaCfgOperation;
import com.topfinance.cfg.jpa.JpaCfgPortOut;
import com.topfinance.cfg.jpa.JpaCfgProtocol;
import com.topfinance.cfg.jpa.JpaCfgReader;
import com.topfinance.cfg.jpa.JpaCfgRouteRule;
import com.topfinance.cfg.jpa.JpaCfgTransIn;
import com.topfinance.cfg.jpa.JpaCfgTransIn8583;
import com.topfinance.cfg.jpa.JpaCfgTransInAMQ;
import com.topfinance.cfg.jpa.JpaCfgTransInIBMMQ;
import com.topfinance.cfg.jpa.JpaCfgTransInJetty;
import com.topfinance.cfg.jpa.JpaCfgTransOut;
import com.topfinance.cfg.jpa.JpaCfgTransOut8583;
import com.topfinance.cfg.jpa.JpaCfgTransOutAMQ;
import com.topfinance.cfg.jpa.TC2BisEleBscEbo;
import com.topfinance.cfg.jpa.TCfgMapRuleDetailEbo;
import com.topfinance.cfg.jpa.TCfgMapRuleEbo;
import com.topfinance.cfg.xml.OmCfgFormat8583;
import com.topfinance.cfg.xml.OmCfgPortIn;
import com.topfinance.cfg.xml.OmCfgMappingRule;
import com.topfinance.cfg.xml.OmCfgOperation;
import com.topfinance.cfg.xml.OmCfgPortOut;
import com.topfinance.cfg.xml.OmCfgRouteRule;
import com.topfinance.cfg.xml.OmCfgTransIn;
import com.topfinance.cfg.xml.OmCfgTransIn8583;
import com.topfinance.cfg.xml.OmCfgTransInAMQ;
import com.topfinance.cfg.xml.OmCfgTransInIBMMQ;
import com.topfinance.cfg.xml.OmCfgTransInJetty;
import com.topfinance.cfg.xml.OmCfgTransOut;
import com.topfinance.cfg.xml.OmCfgTransOut8583;
import com.topfinance.cfg.xml.OmCfgTransOutAMQ;
import com.topfinance.cfg.xml.XmlCfgReader;
import com.topfinance.db.dao.IDao;
import com.topfinance.transform.simple.SimpleMappingRule;
import com.topfinance.transform.simple.SimpleMappingRule.Mapping;
import com.topfinance.util.BCUtils;

public class CfgTool {
   
	
	public static void debug(String s) {
		System.out.println(s);
	}
	
    private static Logger logger = Logger.getLogger(CfgTool.class);
    
//    public final static String DBSTORE = "/spring-config-db.xml";
//    public final static String XMLSTORE = "D:/bankConnector/source/bin/runBC-A-config-FILE.xml";
    
    private ApplicationContext ctx;
    
    private ApplicationContext spring;
    
    Map<Object, Object> mapping = new HashMap<Object, Object>();
    
    Map<Integer, Object> map8583 = new HashMap<Integer, Object>();
    Map<String, Object> mapBscEle = new HashMap<String, Object>();
    
    public void init(String sourceXmlConfig, String targetDbConfig) {
        logger.info("initializing DbCfgReader with spring: " + targetDbConfig + "...");
        ctx = new FileSystemXmlApplicationContext(targetDbConfig);
        
        spring = new FileSystemXmlApplicationContext("D:/bankConnector/source/bin/runBC-A-spring.xml");
        
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
    
    public JdbcTemplate getJdbcTemplate() {
        return (JdbcTemplate)spring.getBean("jdbcTemplate");
    }
    
    public void clearMeta() throws Exception {
    	String[] tables = new String[]{
    			"t_c2_proc_cdlst"
//    			,"T_C2_MSG_PAIR"
//    			,"T_C2_MSG_LIST"
    			,"T_C2_REF_DICT"
    			, "T_C2_BIS_TP_MSG"
    			, "T_C2_BIS_CLAS"
    			, "T_C2_BIS_TYPE"
    			, "T_C2_BIS_CATG"
    			,"T_C2_BIS_ELE_EXT"};
    	
    	for(String table : tables) {
    		String sql = "delete from "+table;
    		int i = getJdbcTemplate().update(sql);
    		debug("deleted "+i+" records from table="+table);
    	}
    }
    public void loadMeta() throws Exception{
    	
//    	clearMeta();
//    	String sql1 = "insert into T_C2_BIS_CATG(CAT_CODE,NAME,MEMO) values ('C','实时贷记业务',null)";
//    	getJdbcTemplate().update(sql1);
//
////    	String sql2 = "insert into T_C2_BIS_CATG(CAT_CODE,NAME,MEMO) values (?,?,?)";
////    	Object[] params = new Object[] {"C", "实时贷记业务", ""};
////    	getJdbcTemplate().update(sql2, params);
//    	
//    	String sql = "select * from T_C2_BIS_CATG where CAT_CODE = 'C'";
//    	Map res = getJdbcTemplate().queryForMap(sql);
//    	for(Object o : res.keySet()) {
//    		debug("key="+o+", value="+res.get(o));
//    	}
    	
    	String sqlfile = "D:/bankConnector/source/sql/mysql/init_data_utf8.sql";
    	runSql(sqlfile);
    	
    	String sqlfile2 = "D:/bankConnector/source/sql/mysql/ele_ext.sql";
    	runSql(sqlfile2);
    	
    }
    public void runSql(String sqlfile)  throws Exception{
    	List<String> lines = IOUtils.readLines(new InputStreamReader(new FileInputStream(sqlfile), "UTF-8"));
    	for(String line : lines) {
    		if(line.trim().length()==0 || line.trim().startsWith("--") || line.contains("commit")) {
    			continue;
    		}
    		debug("line="+line);
    		int i = getJdbcTemplate().update(line);
    		debug("inserted");
    	}    	
    }
    
    public void loadMetaAndRule2Db() throws Exception {
    	
    	
    	testInsertFormat8583s();
//    	testInsertBscEles();
    	testInsertMappingRules();
    	
    }
    public void clearMetaAndRule() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");
        Class[] classes = new Class[] {
        		
           TCfgMapRuleDetailEbo.class,
           TCfgMapRuleEbo.class,
           JpaCfgFormat8583.class,
//           TC2BisEleBscEbo.class
        };
        
        
        for(Class clazz : classes) {
            List objs = dao.getAll(clazz);
            for(Object obj : objs) {
                dao.remove(obj);
            }
        }
    }
    public void testInsertFormat8583s() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");
        
        List<ICfgFormat> formats = jpaReader.getListFormat();
        ICfgFormat demo8583 = null;
        for(ICfgFormat f : formats) {
        	if(f.getName().equals("demo8583")) {
        		demo8583 = f;
        		break;
        	}
        }
        
        if(demo8583==null) {
        	throw new RuntimeException("should have a format named 'demo8583'");
        }
        
        JpaCfgFormat8583 jpa = null;
        XmlCfgReader reader = getXmlReader();

        for(OmCfgFormat8583 xml : reader.dataHolder.listFormat8583) {
            jpa = new JpaCfgFormat8583();
            copy(xml, jpa);
//            mapping.put(xml, jpa);
            jpa.setFormat((JpaCfgFormat)demo8583);
            jpa.setName("字段"+jpa.getPos());
            dao.save(jpa);
            map8583.put(jpa.getPos(), jpa);
        }
        
        // varify
        List<ICfgFormat8583> format8583s = dao.getAll(ICfgFormat8583.class);
        System.out.println("number of format8583s: "+format8583s.size());
        List<ICfgFormat8583> res = jpaReader.getFormat8583(jpa.getFormat());
        for(ICfgFormat8583 f : res) {
        	System.out.println("f: pos="+f.getPos());
        }
    }
    public void testInsertBscEles()throws Exception {
    	IDao dao = (IDao)ctx.getBean("dao");
    	String file = "D:/bankConnector/source/cnaps2/ele_bsc.sql";
    	BCUtils.testFileExist(file, false);
    	Reader reader = new InputStreamReader(new FileInputStream(file), "UTF-16");
    	List<String> lines = IOUtils.readLines(reader);
    	for(String line: lines) {
    		debug(line);
    		int x = line.indexOf("values");
    		int y = line.indexOf("(", x);
    		int z = line.indexOf(")", x);
    		if(x<0) {
    			continue;
    		}
    		String s = line.substring(y+1, z);
    		String[] ss = StringUtils.split(s, ",");
    		List<String> fields = new ArrayList<String>();
    		for(String sss : ss) {
    			String field = trim(sss);
    			fields.add(field);
    			debug(sss + " --> "+field);
    		}
    		TC2BisEleBscEbo ebo = new TC2BisEleBscEbo();
    		ebo.setMsgCode(fields.get(0));
    		ebo.setEleId(fields.get(1));
    		ebo.setEleName(fields.get(2));
    		ebo.setSequn(Integer.valueOf(fields.get(3)));
    		ebo.setUpseq(0);
    		ebo.setType(fields.get(5));
    		ebo.setLengh(0);
    		ebo.setIsRequired(fields.get(7).length()>0? fields.get(7).charAt(0) : 'N');
    		ebo.setIsBis(fields.get(8).length()>0? fields.get(8).charAt(0) : 'N');
    		ebo.setDefValue(fields.get(9));
    		ebo.setRefCode(fields.get(10));
    		ebo.setPath(fields.get(11));
    		dao.save(ebo);
    		mapBscEle.put(ebo.getPath(), ebo);
    	}
    	
    }
    
    private String trim(String field) {
    	return StringUtils.substringBetween(field, "'", "'");
    }
    
    
    public void convertXml2Db() throws Exception {

        
        
        // insert
//        testInsertDownOutMH();
//        testInsertUpInMH();
//        testInsertMappingRules();
        testInsertFormats();
//        testInsertFormat8583s();
        testInsertNodes();
        testInsertTransIns();
        testInsertTransOuts();
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
        
        ICfgPortIn ip = jpaReader.getInportByName("HTTPURL_UP_IN_PP");
        System.out.println("url="+ip.getUrl());
        
        
    }
    
    public void testClear() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");
        Class[] classes = new Class[] {
        		
//           TCfgMapRuleDetailEbo.class,
//           TCfgMapRuleEbo.class,
           JpaCfgRouteRule.class,
           JpaCfgPortIn.class,
           JpaCfgPortOut.class,
           JpaCfgOperation.class,
           JpaCfgProtocol.class,
           
           JpaCfgNode.class,
           JpaCfgTransIn.class,
           JpaCfgTransOut.class,

//           JpaCfgFormat8583.class,
           JpaCfgFormat.class

        };
        
        
        for(Class clazz : classes) {
            List objs = dao.getAll(clazz);
            for(Object obj : objs) {
                dao.remove(obj);
            }
        }
        
    }
    
//    public void testInsertDownOutMH() throws Exception {
//        IDao dao = (IDao)ctx.getBean("dao");
//        
//        XmlCfgReader reader = getXmlReader();
//        for(ICfgDownOutMH xml : reader.dataHolder.listDownOutMH) {
//            JpaCfgDownOutMH jpa = new JpaCfgDownOutMH();
//            jpa.setName(xml.getName());
//            jpa.setClazz(xml.getClazz());
//            mapping.put(xml, jpa);
//            dao.save(jpa);
//        }
//        // varify
//        List<ICfgDownOutMH> downoutmh = dao.getAll(ICfgDownOutMH.class);
//        System.out.println("number of downoutmh: "+downoutmh.size());
//    }
//    public void testInsertUpInMH() throws Exception {
//        IDao dao = (IDao)ctx.getBean("dao");
//        
//        XmlCfgReader reader = getXmlReader();
//        for(ICfgUpInMH xml : reader.dataHolder.listUpInMH) {
//            JpaCfgUpInMH jpa = new JpaCfgUpInMH();
//            jpa.setName(xml.getName());
//            jpa.setClazz(xml.getClazz());
//            mapping.put(xml, jpa);
//            dao.save(jpa);
//        }
//        // varify
//        List<ICfgUpInMH> upinmh = dao.getAll(ICfgUpInMH.class);
//        System.out.println("number of upinmh: "+upinmh.size());
//    }
    public void testInsertMappingRules() throws Exception{
        IDao dao = (IDao)ctx.getBean("dao");
        
        XmlCfgReader reader = getXmlReader();
        
        for(OmCfgMappingRule xml : reader.dataHolder.listMappingRule) {
        	
        	if(CfgConstants.DIRECTION_DOWN.equals(xml.getDirection()))  {
        		// because no direction in ebo
        		continue;
        	}
        
        	SimpleMappingRule rule = SimpleMappingRule.fromXml(new ByteArrayInputStream(xml.getMapping()));
        	
        	TCfgMapRuleEbo jpa = new TCfgMapRuleEbo();
        	jpa.setMsgCode(xml.getMesgType());
        	jpa.setTpCode(xml.getOpType());
        	jpa.setClsCode(xml.getOpClass());
        	
        	for(Mapping m : rule.getMappings()) {
        		TCfgMapRuleDetailEbo detail = new TCfgMapRuleDetailEbo();
        		
        		detail.setPteFldId(Integer.valueOf(m.getSrcPath().substring(1)));
//        		detail.setBizFldEleId(bizFldEleId);
        		 
        		detail.setRule(jpa);
        		detail.setPteFldPath(m.getSrcPath());
        		
        		detail.setPteFldType(m.getSrcType());
        		detail.setBizFldPath(m.getTargetPath());
        		detail.setBizFldType(m.getTargetType());
        		detail.setBizFldValue(m.getValue());
        		detail.setBizFldMode(m.getValue());
        		jpa.getMappings().add(detail);
        	}
        	
            mapping.put(xml, jpa);
            dao.save(jpa);
            System.out.println("mapping rule content: ");
        }
        
    	
    }
    
    
    public void testInsertFormats() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");
        
        XmlCfgReader reader = getXmlReader();
        for(ICfgFormat xml : reader.dataHolder.listFormat) {
            JpaCfgFormat jpa = new JpaCfgFormat();
//            if(xml instanceof OmCfgFormat8583) {
//                jpa = new JpaCfgFormat8583();
//            }else {
//                throw new RuntimeException("unknown type of format: "+xml.getClass().getName());
//            }
            copy(xml, jpa);
            mapping.put(xml, jpa);
            dao.save(jpa);
        }
        
        // varify
        List<ICfgFormat> nodes = dao.getAll(ICfgFormat.class);
        System.out.println("number of formats: "+nodes.size());
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
    
    
    public void testInsertTransIns() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");
        
        XmlCfgReader reader = getXmlReader();
        for(OmCfgTransIn xml : reader.dataHolder.listTransIn) {
            JpaCfgTransIn jpa = null;
            if(xml instanceof OmCfgTransInAMQ) {
                jpa = new JpaCfgTransInAMQ();
                
            }else if(xml instanceof OmCfgTransInIBMMQ) {
                jpa = new JpaCfgTransInIBMMQ();
            }else if(xml instanceof OmCfgTransInJetty) {
                jpa = new JpaCfgTransInJetty();
            }else if(xml instanceof OmCfgTransIn8583) {
                jpa = new JpaCfgTransIn8583();
            }else {
                throw new RuntimeException("unknown type of transport: "+xml.getClass().getName());
            }
            
            copy(xml, jpa);
            
//            Map<String, String> config = xml.getProviderConfig();
//            if(config!=null) {
//                jpa.getMap().putAll(config);
//            }else {
//                System.out.println("============!!!!!!!!!!!!!!!!xxxxxxxxxxxxxxx");
//            }
            
            
            mapping.put(xml, jpa);
            dao.save(jpa);
            
        }
        // varify
        List<ICfgTransIn> tis = dao.getAll(ICfgTransIn.class);
        System.out.println("number of transIns: "+tis.size());
    }
    
    public void testInsertTransOuts() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");
        
        XmlCfgReader reader = getXmlReader();
        for(OmCfgTransOut xml : reader.dataHolder.listTransOut) {
            JpaCfgTransOut jpa = null;
            if(xml instanceof OmCfgTransOutAMQ) {
                jpa = new JpaCfgTransOutAMQ();
//            }else if(xml instanceof OmCfgTransOutIBMMQ) {
//                jpa = new JpaCfgTransInIBMMQ();
//            }else if(xml instanceof OmCfgTransOutJetty) {
//                jpa = new JpaCfgTransInJetty();
            }else if(xml instanceof OmCfgTransOut8583) {
                jpa = new JpaCfgTransOut8583();
            }else {
                throw new RuntimeException("unknown type of transport: "+xml.getClass().getName());
            }
            
            copy(xml, jpa);
            
//            Map<String, String> config = xml.getProviderConfig();
//            if(config!=null) {
//                jpa.getMap().putAll(config);
//            }else {
//                System.out.println("============!!!!!!!!!!!!!!!!xxxxxxxxxxxxxxx");
//            }
            
            
            mapping.put(xml, jpa);
            dao.save(jpa);
            
        }
        // varify
        List<ICfgTransOut> tis = dao.getAll(ICfgTransOut.class);
        System.out.println("number of transOuts: "+tis.size());
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
            jpa.setFormat((JpaCfgFormat)mapping.get(xml.getFormat()));
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
        for(OmCfgPortOut xml : reader.dataHolder.listOutPort) {
            JpaCfgPortOut jpa = new JpaCfgPortOut();
            copy(xml, jpa);
            jpa.setNode((JpaCfgNode)mapping.get(xml.getNode()));
            jpa.setTransOut((JpaCfgTransOut)mapping.get(xml.getTransOut()));
//            jpa.setDownOutMH((JpaCfgDownOutMH)mapping.get(xml.getDownOutMH()));
            
            jpa.setFormat((JpaCfgFormat)mapping.get(xml.getFormat()));
            
            mapping.put(xml, jpa);
            dao.save(jpa);
        }
        // varify
        List<ICfgPortOut> ops = dao.getAll(ICfgPortOut.class);
        System.out.println("number of outPorts: "+ops.size());
        
    }
    
    public void testInsertInPorts() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");
        XmlCfgReader reader = getXmlReader();
        for(OmCfgPortIn xml : reader.dataHolder.listInPort) {
            JpaCfgPortIn jpa = new JpaCfgPortIn();
            copy(xml, jpa);
            jpa.setNode((JpaCfgNode)mapping.get(xml.getNode()));
            jpa.setAckPort((JpaCfgPortOut)mapping.get(xml.getAckPort()));
            jpa.setProtocol((JpaCfgProtocol)mapping.get(xml.getProtocol()));
            jpa.setTransIn((JpaCfgTransIn)mapping.get(xml.getTransIn()));
            jpa.setFormat((JpaCfgFormat)mapping.get(xml.getFormat()));
//            jpa.setSyncReplyDownOutMH((JpaCfgDownOutMH)mapping.get(xml.getSyncReplyDownOutMH()));
//            jpa.setUpInMH((JpaCfgUpInMH)mapping.get(xml.getUpInMH()));
            
            mapping.put(xml, jpa);
            dao.save(jpa);
        }
        
        // varify
        List<ICfgPortIn> ips = dao.getAll(ICfgPortIn.class);
        System.out.println("number of inPorts: "+ips.size());
    }
    
    public void testInsertRouteRules() throws Exception {
        IDao dao = (IDao)ctx.getBean("dao");
        XmlCfgReader reader = getXmlReader();
        for(OmCfgRouteRule xml : reader.dataHolder.listRouteRule) {
            JpaCfgRouteRule jpa = new JpaCfgRouteRule();
            copy(xml, jpa);
            
            jpa.setOutPort((JpaCfgPortOut)mapping.get(xml.getOutPort()));
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
           if(Map.class.isAssignableFrom(clazz)) {
        	   // skip
        	   continue;
           }
//           if(byte[].class.isAssignableFrom(clazz)) {
//        	   // skip big binaries
//        	   // continue
//           }
           
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

    	BCUtils.setHomeDir("D:/bankConnector/source");
    	CfgTool tool = new CfgTool(XMLSTORE, DBSTORE);
        // clear everything
//    	tool.clearMeta();
    	tool.clearMetaAndRule();
//        tool.testClear();
//    	tool.convertXml2Db();
    	tool.loadMetaAndRule2Db();
//    	tool.loadMeta();  
        
        System.out.println("Done");
    }
    
}
