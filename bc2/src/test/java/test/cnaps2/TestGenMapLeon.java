package test.cnaps2;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import junit.framework.TestCase;

import org.apache.commons.lang.StringUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

import com.topfinance.cfg.CfgAccessException;
import com.topfinance.db.dao.IDao;
import com.topfinance.frame.exception.AppException;
import com.topfinance.payment.ebo.TC2BisEleBscEbo;
import com.topfinance.runtime.OpInfo;
import com.topfinance.ui.UIBizHelper;
import com.topfinance.util.BCUtils;
import com.topfinance.util.OpTester;
import com.topfinance.util.ParseSampleXml;
import com.topfinance.util.ParseSampleXml.DataEle;

public class TestGenMapLeon extends TestCase {

	// TODO change the path
	public final static String DBSTORE = "D:/bankConnector/source/bin/runBC-A-config-DB.xml";

	// TODO change it to true when you are ready to connect to DB
	public final static boolean USE_DB = false;
	
	public final static boolean LIST_META_ONLY = false;
	
	// TODO change it to true when you are ready to connect to DB
	public final static boolean TO_GENERATE = false;
	
	public final static boolean TEST_XML2EBO_ONLY = false;
	
	private static final String basePath = "D:/bankConnector/source/generated_test";

	
	
	@Override
	protected void setUp() throws Exception {
		super.setUp();
		if (USE_DB) {
			init(DBSTORE);
		}
	}

	protected String getBasePath() {
		return basePath;
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
			// This need to be changed to fetch set of (bisEle+extEle) for a
			// {msgCode, tpCode, clsCode}
			if (USE_DB) {
				try {
					return UIBizHelper.getInstance().getBizFields(msgCode, tpCode, clsCode);
				} catch (AppException e) {
					e.printStackTrace();
				}
				return null;
				// String hql = "from " + TC2BisEleBscEbo.class.getSimpleName()
				// + " where msgCode=?";
				// Object[] paras = new Object[] { msgCode };
				// List list = getDao().find(hql, paras);
				// return list;
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

	public void _testGenerated(String msgCode, String tpCode, String clsCode) {

		// This is a sample to handle the XML that needs to be stored in a
		// parent-child table
//		String msgCode = "ccms.990.001.02";
//		String tpCode = "";
//		String clsCode = "";

		// String mesgType = "hvps.111.001.01";
		// String tpCode = "A100";
		// String clsCode = "02101";
		OpInfo opInfo = new OpInfo(msgCode, tpCode, clsCode);
		debug("===========================start testGenerated for op=" + opInfo + "============================");

		try {
			// CfgImplFactory.setType(CfgImplFactory.TYPE_FILE);
			// CfgImplFactory.setConfig("D:/bankConnector/source/bin/runBC-A-config-FILE.xml");

			BCUtils.setHomeDir(getBasePath());
			OpTester tester = new OpTester();
			 //tester.up(opInfo);
			 //tester.down(opInfo);

			debug("==========================================test Xml2Ebo conversion=========================================");
			Object ebo = tester.downPublic(opInfo);

			debug("ebo=" + ebo);
			// to Store this ebo to DB
			if (USE_DB) {
				getDao().save(ebo);
			}

			debug("==========================================test Ebo2XML conversion=========================================");
			// fetch a clean ebo from DB, rather than use the above ebo
			// instance.
//			if (USE_DB) {
//				// find by ID, assume always uuid
//				// TODO change it accordingly
//				String idField = "id";
//				String idValue = BeanUtils.getProperty(ebo, idField);
//				String hql = "from " + ebo.getClass().getSimpleName() + " where " + idField + "=?";
//				Object[] paras = new Object[] { idValue };
//				List list = getDao().find(hql, paras);
//				ebo = list.size() > 0 ? list.get(0) : null;
//			}
			
			if(!TEST_XML2EBO_ONLY) {
				String xml = tester.upPublic(ebo, opInfo);
			}
			
			
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		debug("end testGenerated for op=" + opInfo + ", basePath=" + getBasePath() + "...");
	}

	// public void testGenPrivateMap() throws Exception {
	// debug("start testGenPrivateMap...");
	//
	// String mesgType = "hvps.111.001.01";
	// String tpCode = "A100";
	// String clsCode = "02101";
	// String direction = CfgConstants.DIRECTION_UP;
	// OpInfo opInfo = new OpInfo(mesgType, tpCode, clsCode);
	//
	// String basePath = "D:/bankConnector/source/generated";
	//
	//
	// JpaCfgFmtEleMapFileEbo ruleDb = getJpaReader().getMapFile(mesgType, tpCode,
	// clsCode);
	// CfgImplFactory.setType(CfgImplFactory.TYPE_DB);
	// CfgImplFactory.setConfig(DBSTORE);
	//
	// savePrivateMap(direction, opInfo, basePath, ruleDb);
	// savePrivateMap(CfgConstants.DIRECTION_DOWN, opInfo, basePath, ruleDb);
	//
	// debug("end testGenPrivateMap...");
	// }
	// private void savePrivateMap(String direction, OpInfo opInfo,
	// String basePath, JpaCfgFmtEleMapFileEbo ruleDb) throws IOException {
	// SimpleMappingRule rule = SimpleMappingRule.fromDb(ruleDb, direction);
	// byte[] ruleXml = rule.toXml();
	// String outFile = FilePathHelper.sampleMappingSimple(opInfo, direction,
	// basePath);
	// FileUtils.writeByteArrayToFile(new File(outFile), ruleXml);
	// }






	
	public void test_beps_123_001_01() throws Exception {
		String msgCode = "beps.123.001.01";
		String tpCode = "C";
//		String tpCode = "C101";		
//		String clsCode = "00100";
		String clsCode = "0";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void test_beps_393_001_01() throws Exception {
		String msgCode = "beps.393.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void test_saps_737_001_01() throws Exception {
		String msgCode = "saps.737.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
		
		
//		Saps73700101 p = new Saps73700101();
//		p.setNbOfTxs("10");
//		Saps73700101TxList c = new Saps73700101TxList();
//		c.setInitlAmt("1");
//
//		c.setMmbId("1");
//		
//		
//		p.setTxList(new HashSet<Saps73700101TxList>());
//		p.getTxList().add(c);
//		
//		getDao().save(p);
		
	}

	public void testNested() throws Exception {
		String msgCode = "testNested";
		String tpCode = "";
		String clsCode = "";
//		if(TO_GENERATE)
//			_testGenPublicMap(msgCode, tpCode, clsCode);
		_testGenerated(msgCode, tpCode, clsCode);
	}	

	public void _testGenPublicMap(String msgCode, String tpCode, String clsCode) throws Exception {
		OpInfo op = new OpInfo(msgCode, tpCode, clsCode);

		debug("start testGenPublicMap for op=" + op + "...");

		try {
			
			Map<Integer, DataEle> hookPoints = new HashMap<Integer, DataEle>();
			
			
//			String fn = "D:/bankConnector/data/mydata"; // for 737
			String fn = "D:/bankConnector/data/mydata393"; // for 393
			
//			List<TC2BisEleBscEbo> list1 = getBizEle(msgCode, tpCode, clsCode);
//			ObjectOutputStream oo = new ObjectOutputStream(new FileOutputStream(fn));
//			oo.writeObject(list1);
//			oo.close();
			
			ObjectInputStream in = new ObjectInputStream(new FileInputStream(fn));
			List<TC2BisEleBscEbo> list = (List<TC2BisEleBscEbo>)in.readObject();
				
//			List<TC2BisEleBscEbo> list = getBizEle(msgCode, tpCode, clsCode);
			
			ParseSampleXml main = new ParseSampleXml(getBasePath(), op);
			
			for (TC2BisEleBscEbo detail : list) {
				debug("TC2BisEleBscEbo="+detail);
			}
			if(LIST_META_ONLY) {
				return;
			}
			
			for (TC2BisEleBscEbo detail : list) {
				
				debug("TC2BisEleBscEbo="+detail);
				
				String key = ParseSampleXml.getKeyFromBizFldPath(detail.getPath(), op);
//				debug("path="+detail.getPath()+", key="+key);
				String value = "";
//				Class jaxbType = getJaxbTypeFromBizFldType(detail.getType());
				String eblFldName = detail.getEleId();
				String prefix = StringUtils.substringBetween(detail.getDefValue(), "/", "/");
				if(prefix==null) {
					prefix="";
				}
				DataEle dataEle = new DataEle(key, value, detail.getType(), prefix);
				dataEle.eboFldName = eblFldName;
				
				Integer upseq = detail.getUpseq();
				// assume parent's seq always before its leaves
				if(upseq!=null) {
					DataEle parent = hookPoints.get(upseq);
					if(parent!=null) {
						parent.leaves.add(dataEle);
					} else {
						throw new RuntimeException("well.. leave come first, we have to handle this");
					}
				} else {
					// first layer elements
					main.parsed.add(dataEle);
				}
				
				if(StringUtils.isEmpty(detail.getType())) {
					// hookpoint? 

					hookPoints.put(detail.getSequn(), dataEle);
				}
			}

			for (DataEle dataEle : main.parsed) {
				debug("==" + dataEle);
			}

			main.generateMapEbo2Jaxb();
			main.generateDdlAndEbo();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		debug("end testGenPublicMap for op=" + op + ", basePath=" + getBasePath() + "...");
	}

	
	public void testMe() throws Exception{
		try {
//			testGenerated_311();
			
//			testGenerated_saps_737_001_01();
			
//			test_beps_123_001_01();
//			test_beps_393_001_01();
			testNested();
			
//			Field f = InstgPty1.class.getDeclaredField("instgIndrctPty");
//			debug("f="+f);
		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		}		
		
	}
	
}
