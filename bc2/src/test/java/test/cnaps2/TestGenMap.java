package test.cnaps2;

import java.io.FileInputStream;
import java.io.ObjectInputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;

import junit.framework.TestCase;

import org.apache.commons.lang.StringUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

import com.topfinance.cfg.CfgAccessException;
import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.db.dao.IDao;
import com.topfinance.frame.exception.AppException;
import com.topfinance.payment.ebo.TC2BisEleBscEbo;
import com.topfinance.plugin.cnaps2.Cnaps2Constants;
import com.topfinance.runtime.OpInfo;
import com.topfinance.ui.UIBizHelper;
import com.topfinance.util.BCUtils;
import com.topfinance.util.OpTester;
import com.topfinance.util.ParseSampleXml;
import com.topfinance.util.ParseSampleXml.DataEle;

public class TestGenMap extends TestCase {

	// TODO change the path
	//public final static String DBSTORE = "D:/bankConnector/source/bin/runBC-A-config-DB.xml";
	public final static String DBSTORE = "E:/DevSpace/bc2/bin/runBC-A-config-DB.xml";

	// TODO change it to true when you are ready to connect to DB
	public final static boolean USE_DB = false;
	
	// TODO change it to true when you are ready to connect to DB
	public final static boolean TO_GENERATE = false;
	
	//private static final String basePath = "D:/bankConnector/source/generated_test";
	private static final String basePath = "E:/DevSpace/bc2/generated_test";

	@Override
	protected void setUp() throws Exception {
		super.setUp();
		if (USE_DB) {
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

			BCUtils.setHomeDir(basePath);
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
			String xml = tester.upPublic(ebo, opInfo);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		debug("end testGenerated for op=" + opInfo + ", basePath=" + basePath + "...");
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

	public String getKeyFromBizFldPath(String xpath, OpInfo op) throws Exception {
		String key = null;
		StringBuffer buf = new StringBuffer();

		
		
		String[] tokens = StringUtils.split(xpath, "/");
		for (int i = 1; i < tokens.length; i++) {
			if (i != 1) {
				buf.append(".");
			}
			String oPath = "";
			if (tokens[i].equalsIgnoreCase("FIToFICstmrCdtTrf")) {
				oPath = "fiToFICstmrCdtTrf";
			} else if (tokens[i].equalsIgnoreCase("cdtTrfTxInf")) {
				// in com.cnaps2.xml.iso20022.pacs.v00800102.FIToFICustomerCreditTransferV02
				oPath = "cdtTrfTxInf[0]";
			} else {
				oPath = StringUtils.uncapitalize(tokens[i]);
			}
			buf.append(oPath);
		}
		
		Stack<String> pathStack = new Stack<String>();
		String jaxbPkgName = Cnaps2Constants.getPackageName(op.getMesgType());
		Class parentClass = Class.forName(jaxbPkgName + ".Document");
		for (int i = 1; i < tokens.length; i++) {
//			debug("tokens["+i+"]="+tokens[i]);
			String name = ParseSampleXml.getJavaName(tokens[i]);
//			if(i==1) {
//				pathStack.push(name);
//				// skip Document which is root
//				continue;
//			}
			
			Field thisField = ParseSampleXml.findField(pathStack, name, parentClass);
			Class thisClass = thisField.getType();
			if(i!=tokens.length-1) {
				// not leaf
				if(ParseSampleXml.isCollection(thisClass)) {
	                // TODO probably [1][2].. ???
	                name =name+"[0]";
	                pathStack.push(name);
	            }else {
	    			pathStack.push(name);
	            }
			}
			else {
				// leaf
	            boolean needAppendValue = false;
	            Class valueClass = null;
	            // test if collection is here
	            if(ParseSampleXml.isCollection(thisClass)) {
	                // TODO probably [1][2].. ???
	            	name =name+"[0]";
	                valueClass = Iso8583ToXml.getCollectionGenericType(thisField);
	            } else {
	                valueClass = ParseSampleXml.getValueClassIfHave(thisClass);
	                if(valueClass==null) {
	                    valueClass = thisClass;
	                }
	                else {
	                    needAppendValue = true;
	                }
	            }
	            
	            String xmlPath = ParseSampleXml.printStack(pathStack);
//	            String value = guessDateValue(name, ele.getText());
	            String elementPath = xmlPath+"."+name;
	            
	            return needAppendValue? elementPath+".value" : elementPath;				
			}
			
			


		}
		return buf.toString();
	}

	public Class getJaxbTypeFromBizFldType(String bizFldType) throws Exception {
		String clazz = null;
		Class res = null;

		if(StringUtils.isEmpty(bizFldType)) {
			return null;
			
		}
		else if (bizFldType.contains("Text")) {
			clazz = "java.lang.String";
		} else if (bizFldType.toLowerCase().contains("code")) {
			clazz = "java.lang.String";
		} else if (bizFldType.equalsIgnoreCase("ActiveCurrencyAndAmount")) {
			clazz = "java.math.BigDecimal";
		} else if (bizFldType.equalsIgnoreCase("ISODateTime")) {
			clazz = "java.util.Date";
		} else if (bizFldType.equalsIgnoreCase("ISODate")) {
			clazz = "java.lang.String";
		} else if (bizFldType.equalsIgnoreCase("Any")) {
			clazz = "java.lang.String";
		} else {
			clazz = "java.lang.String";
		}

		if (clazz != null) {
			res = Class.forName(clazz);
		} else {
			throw new RuntimeException("no clazz matched for bizFldType= " + bizFldType);
		}
		return res;
	}

	public void testGenerated_990_001_02() throws Exception {
		String msgCode = "ccms.990.001.02";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}

	public void testGenerated_991() throws Exception {
		String msgCode = "ccms.991.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}

	public void testGenerated_311() throws Exception {
		String msgCode = "ccms.311.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	public void atestGenerated_312() throws Exception {
		String msgCode = "ccms.312.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_313() throws Exception {
		String msgCode = "ccms.313.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_314() throws Exception {
		String msgCode = "ccms.314.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_315() throws Exception {
		String msgCode = "ccms.315.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_801() throws Exception {
		String msgCode = "ccms.801.001.02";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_805() throws Exception {
		String msgCode = "ccms.805.001.02";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_806() throws Exception {
		String msgCode = "ccms.806.001.02";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_807() throws Exception {
		String msgCode = "ccms.807.001.02";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_811() throws Exception {
		String msgCode = "ccms.811.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_900() throws Exception {
		String msgCode = "ccms.900.001.02";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_903() throws Exception {
		String msgCode = "ccms.903.001.02";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_911() throws Exception {
		String msgCode = "ccms.911.001.02";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_358() throws Exception {
		String msgCode = "saps.358.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_359() throws Exception {
		String msgCode = "saps.359.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_361() throws Exception {
		String msgCode = "saps.361.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_362() throws Exception {
		String msgCode = "saps.362.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_363() throws Exception {
		String msgCode = "saps.363.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_365() throws Exception {
		String msgCode = "saps.365.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_366() throws Exception {
		String msgCode = "saps.366.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_368() throws Exception {
		String msgCode = "saps.368.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_370() throws Exception {
		String msgCode = "saps.370.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_371() throws Exception {
		String msgCode = "saps.371.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_372() throws Exception {
		String msgCode = "saps.372.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_374() throws Exception {
		String msgCode = "saps.374.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_375() throws Exception {
		String msgCode = "saps.375.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_604() throws Exception {
		String msgCode = "saps.604.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_606() throws Exception {
		String msgCode = "saps.606.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_609() throws Exception {
		String msgCode = "saps.609.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_612() throws Exception {
		String msgCode = "saps.612.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_613() throws Exception {
		String msgCode = "saps.613.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_614() throws Exception {
		String msgCode = "saps.614.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_734() throws Exception {
		String msgCode = "saps.734.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_142() throws Exception {
		String msgCode = "hvps.142.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_143() throws Exception {
		String msgCode = "hvps.143.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_144() throws Exception {
		String msgCode = "hvps.144.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_151() throws Exception {
		String msgCode = "hvps.151.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_152() throws Exception {
		String msgCode = "hvps.152.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_153() throws Exception {
		String msgCode = "hvps.153.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_710() throws Exception {
		String msgCode = "hvps.710.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void btestGenerated_711() throws Exception {
		String msgCode = "hvps.711.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void btestGenerated_712() throws Exception {
		String msgCode = "hvps.712.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void btestGenerated_713() throws Exception {
		String msgCode = "hvps.713.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void btestGenerated_714() throws Exception {
		String msgCode = "hvps.714.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_715() throws Exception {
		String msgCode = "hvps.715.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void btestGenerated_716() throws Exception {
		String msgCode = "hvps.716.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void btestGenerated_717() throws Exception {
		String msgCode = "hvps.717.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void testGenerated_saps_737_001_01() throws Exception {
		String msgCode = "saps.737.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestGenerated_608() throws Exception {
		String msgCode = "ccms.608.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atestNested() throws Exception {
		String msgCode = "testNested";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE)
			_testGenPublicMap(msgCode, tpCode, clsCode);
		//_testGenerated(msgCode, tpCode, clsCode);
	}	

	public void _testGenPublicMap(String msgCode, String tpCode, String clsCode) throws Exception {
		OpInfo op = new OpInfo(msgCode, tpCode, clsCode);

		debug("start testGenPublicMap for op=" + op + "...");

		try {
			
			Map<Integer, DataEle> hookPoints = new HashMap<Integer, DataEle>();
			
////			List<TC2BisEleBscEbo> list1 = getBizEle(msgCode, tpCode, clsCode);
//			String fn = "D:/bankConnector/data/mydata";
//			
////			ObjectOutputStream oo = new ObjectOutputStream(new FileOutputStream(fn));
////			oo.writeObject(list1);
////			oo.close();
//			
//			ObjectInputStream in = new ObjectInputStream(new FileInputStream(fn));
//			List<TC2BisEleBscEbo> list = (List<TC2BisEleBscEbo>)in.readObject();
				
			
			List<TC2BisEleBscEbo> list = getBizEle(msgCode, tpCode, clsCode);
			
			ParseSampleXml main = new ParseSampleXml(basePath, op);
			for (TC2BisEleBscEbo detail : list) {
				
				debug("TC2BisEleBscEbo="+detail);
				
				String key = getKeyFromBizFldPath(detail.getPath(), op);
				
//				debug("path="+detail.getPath()+", key="+key);
				
				String value = "";
				Class jaxbType = getJaxbTypeFromBizFldType(detail.getType());
				String eblFldName = detail.getEleId();
				DataEle dataEle = new DataEle(key, value, jaxbType);
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
				
				if(jaxbType==null) {
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
		debug("end testGenPublicMap for op=" + op + ", basePath=" + basePath + "...");
	}

	
	public void testMe() throws Exception{
		try {
//			testGenerated_311();
			
			testGenerated_saps_737_001_01();
//			Field f = InstgPty1.class.getDeclaredField("instgIndrctPty");
//			debug("f="+f);
		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		}		
		
	}
}
