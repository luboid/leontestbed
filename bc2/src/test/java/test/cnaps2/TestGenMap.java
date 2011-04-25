package test.cnaps2;

import java.util.ArrayList;
import java.util.List;

import junit.framework.TestCase;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

import com.topfinance.cfg.CfgAccessException;
import com.topfinance.db.dao.IDao;
import com.topfinance.payment.ebo.TC2BisEleBscEbo;
import com.topfinance.runtime.OpInfo;
import com.topfinance.util.BCUtils;
import com.topfinance.util.OpTester;
import com.topfinance.util.ParseSampleXml;
import com.topfinance.util.ParseSampleXml.Entry;

public class TestGenMap extends TestCase {

	// TODO change the path 
    public final static String DBSTORE = "D:/bankConnector/source/bin/runBC-A-config-DB.xml";
    
    // TODO change it to true when you are ready to connect to DB
    public final static boolean USE_DB = false;
    
    @Override
    protected void setUp() throws Exception {
        super.setUp();
        if(USE_DB) {
        	init(DBSTORE);
        }
    }
    
    public void debug(String s) {
        System.out.println(s);
    }
    private ApplicationContext ctx;

    public void init(String config) {
        debug("initializing JpaCfgReader with spring: " + config + "...");
        ctx = new FileSystemXmlApplicationContext(config);
        debug("Done");
    }
    private IDao getDao() {
        IDao dao = (IDao) ctx.getBean("dao");
        return dao;
    }
    
    
    private List<TC2BisEleBscEbo> getBizEle(String msgCode, String tpCode, String clsCode) {
        try {
            // This need to be changed to fetch set of (bisEle+extEle) for a {msgCode, tpCode, clsCode}
        	if(USE_DB) {
        		String hql = "from "+TC2BisEleBscEbo.class.getSimpleName() + " where msgCode=?";
        		Object[] paras = new Object[] {msgCode};
        		List list = getDao().find(hql, paras);
        		return list;
        	}
        	
        	else {
            // now we just mock-up without querying DB
            List<TC2BisEleBscEbo> list = new ArrayList<TC2BisEleBscEbo>();
            TC2BisEleBscEbo ebo1 = new TC2BisEleBscEbo();
            ebo1.setPath("/Document/FIToFICstmrCdtTrf/GrpHdr/MsgId");
            ebo1.setEleId("MsgId");
            ebo1.setType("Max35Text");
            
            list.add(ebo1);
            
            return list;
        	}
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new CfgAccessException(ex);
        }
       
        
    }
    
    
    public void testGenerated() {
    	
    	String basePath = "D:/bankConnector/source/generated_test";
    	
    	// This is a sample to handle the XML that needs to be stored in a parent-child table 
        String mesgType = "testNested";
        String tpCode = "";
        String clsCode = "";
    	
//        String mesgType = "hvps.111.001.01";
//        String tpCode = "A100";
//        String clsCode = "02101";
        OpInfo opInfo = new OpInfo(mesgType, tpCode, clsCode);
        debug("===========================start testGenerated for op="+opInfo+"============================");
        
        
        try {    
//        CfgImplFactory.setType(CfgImplFactory.TYPE_FILE);
//        CfgImplFactory.setConfig("D:/bankConnector/source/bin/runBC-A-config-FILE.xml");
        
        BCUtils.setHomeDir(basePath);
        OpTester tester = new OpTester();
//      tester.up(opInfo);
//      tester.down(opInfo);
        
        debug("==========================================test Xml2Ebo conversion=========================================");
        Object ebo = tester.downPublic(opInfo);
        
        debug("ebo="+ebo);
        // to Store this ebo to DB
        if(USE_DB) {
        	getDao().save(ebo);
        }
        
        
        debug("==========================================test Ebo2XML conversion=========================================");
        // fetch a clean ebo from DB, rather than use the above ebo instance.
        if(USE_DB) {
        	// find by ID, assume always uuid
        	// TODO change it accordingly
        	String idField = "uuid";
        	String idValue = BeanUtils.getProperty(ebo, idField);
        	String hql = "from "+ebo.getClass().getSimpleName()+ " where "+idField+"=?";
    		Object[] paras = new Object[] {idValue};
    		List list = getDao().find(hql, paras);        	
        	ebo = list.size()>0? list.get(0) : null;
        }
        String xml = tester.upPublic(ebo, opInfo);
        
        } catch (Exception ex) {
        	ex.printStackTrace();
        }
        debug("end testGenerated for op="+opInfo+", basePath="+basePath+"...");
        
    }
    
    
//    public void testGenPrivateMap() throws Exception {
//        debug("start testGenPrivateMap...");
//        
//        String mesgType = "hvps.111.001.01";
//        String tpCode = "A100";
//        String clsCode = "02101";
//        String direction = CfgConstants.DIRECTION_UP;
//        OpInfo opInfo = new OpInfo(mesgType, tpCode, clsCode);
//        
//        String basePath = "D:/bankConnector/source/generated";
//        
//        
//        TCfgFmtEleMapFileEbo ruleDb = getJpaReader().getMapFile(mesgType, tpCode, clsCode);
//        CfgImplFactory.setType(CfgImplFactory.TYPE_DB);
//        CfgImplFactory.setConfig(DBSTORE);
//        
//        savePrivateMap(direction, opInfo, basePath, ruleDb);
//        savePrivateMap(CfgConstants.DIRECTION_DOWN, opInfo, basePath, ruleDb);
//        
//        debug("end testGenPrivateMap...");
//    }
//    private void savePrivateMap(String direction, OpInfo opInfo,
//            String basePath, TCfgFmtEleMapFileEbo ruleDb) throws IOException {
//        SimpleMappingRule rule = SimpleMappingRule.fromDb(ruleDb, direction);
//        byte[] ruleXml = rule.toXml();
//        String outFile = FilePathHelper.sampleMappingSimple(opInfo, direction,  basePath);
//        FileUtils.writeByteArrayToFile(new File(outFile), ruleXml);
//    }
    
    
    
    public String getKeyFromBizFldPath(String xpath)  throws Exception {
        String key = null;
        StringBuffer buf = new StringBuffer();
        
        String[] tokens = StringUtils.split(xpath, "/");
        for(int i=1;i<tokens.length;i++) {
            if(i!=1) {
                buf.append(".");
            }
            String oPath="";
            if(tokens[i].equalsIgnoreCase("FIToFICstmrCdtTrf")) {
                oPath = "fiToFICstmrCdtTrf";
            }else if(tokens[i].equalsIgnoreCase("cdtTrfTxInf")) {
                oPath = "cdtTrfTxInf[0]";
            }else {
                oPath = StringUtils.uncapitalize(tokens[i]);
            }
            buf.append(oPath);
        }
        
            
        
        return buf.toString();
        
    }
    
    
    public Class getJaxbTypeFromBizFldType(String bizFldType)  throws Exception{
        String clazz = null;
        Class res = null;
        
        if(bizFldType.contains("Text")) {
            clazz = "java.lang.String";
        }else if(bizFldType.toLowerCase().contains("code")){
            clazz = "java.lang.String";
        } else if(bizFldType.equalsIgnoreCase("ActiveCurrencyAndAmount")) {
            clazz = "java.math.BigDecimal";
        } else if(bizFldType.equalsIgnoreCase("ISODateTime")) {
            clazz = "java.util.Date";
        }
        
        
        if(clazz!=null) {
            res = Class.forName(clazz);
        }
        else {
            throw new RuntimeException("no clazz matched for bizFldType= "+bizFldType);
        }
        return res;
        
    }
    public void testGenPublicMap() throws Exception {
        
        
        // TODO change these setting accordingly
        String basePath = "D:/bankConnector/source/generated_test";
//        String msgCode = "hvps.111.001.01";
        String msgCode = "hvps.111.001.01";
        String tpCode = "A100";
        String clsCode = "02101";
        OpInfo op = new OpInfo(msgCode, tpCode, clsCode);
        
        debug("start testGenPublicMap for op="+op+"...");
        
        try {
        
        List<TC2BisEleBscEbo> list = getBizEle(msgCode, tpCode, clsCode);
        
        ParseSampleXml main = new ParseSampleXml(basePath,op);
        
        for(TC2BisEleBscEbo detail : list) {
            String key = getKeyFromBizFldPath(detail.getPath());
            String value = "";
            Class jaxbType = getJaxbTypeFromBizFldType(detail.getType());
            
            String eblFldName = detail.getEleId();
            Entry entry = new Entry(key, value, jaxbType);
            entry.eboFldName = eblFldName;
            main.parsed.add(entry);
        }
        
        
        for(Entry entry : main.parsed) {
            debug("=="+entry);
        }
        
        main.generateMapEbo2Jaxb();
        main.generateDdlAndEbo();
        } catch (Exception ex) {
        	ex.printStackTrace();
        }
        debug("end testGenPublicMap for op="+op+", basePath="+basePath+"...");
    }

    
}
