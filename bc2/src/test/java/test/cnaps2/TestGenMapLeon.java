package test.cnaps2;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathFactory;

import junit.framework.TestCase;

import org.apache.commons.lang.StringUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import com.topfinance.cfg.CfgAccessException;
import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.db.dao.IDao;
import com.topfinance.ebo.msg.Beps12200101;
import com.topfinance.ebo.msg.Beps12200101FinCdtTrfInf;
import com.topfinance.ebo.msg.Beps12200101NtlTrsrCdtInfDtls;
import com.topfinance.frame.exception.AppException;
import com.topfinance.message.DefaultCnaps2Parser;
import com.topfinance.payment.ebo.TC2BisEleBscEbo;
import com.topfinance.runtime.BcConstants;
import com.topfinance.runtime.OpInfo;
import com.topfinance.transform.smooks.SmooksTransformer;
import com.topfinance.transform.util.IsoObj;
import com.topfinance.ui.UIBizHelper;
import com.topfinance.util.AuditMsgUtil;
import com.topfinance.util.BCUtils;
import com.topfinance.util.FilePathHelper;
import com.topfinance.util.MetaHolder;
import com.topfinance.util.MetaJaxbElement;
import com.topfinance.util.MetaJaxbElement.Value;
import com.topfinance.util.OpTester;
import com.topfinance.util.ParseSampleXml;
import com.topfinance.util.ParseSampleXml.DataEle;

public class TestGenMapLeon extends TestCase {



	// TODO change it to true when you are ready to connect to DB
	public final static boolean USE_DB = false;
	
	public final static boolean LIST_META_ONLY = true;
	
	// TODO change it to true when you want to generate map files
	public final static boolean TO_GENERATE = true;
	public final static boolean TO_GEN_PRIVATE = true;
	public final static boolean TO_GEN_PRIVATE_MAP = true;
	
	public final static boolean TEST_XML2EBO_ONLY = false;	
	public final static boolean TEST_PRIVATE = true;
	
	private static final String BC2_HOME = "D:/bankConnector/source/";
	private static final String BASE_PATH = BC2_HOME+"generated_test";
	// TODO change the path
	public final static String DBSTORE = BC2_HOME+"/bin/runBC-A-spring.xml";
	
	
	@Override
	protected void setUp() throws Exception {
		super.setUp();
		BCUtils.setHomeDir(getBasePath());
		if (USE_DB) {
			init(DBSTORE);
		}
	}

	protected String getBasePath() {
		return BASE_PATH;
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
			OpInfo op = new OpInfo(msgCode, tpCode, clsCode);
			String fn = "D:/bankConnector/data/mydata"+op.toString(); // for 737
//			String fn = "D:/DEV.WORK/EBO/bc2/generated_test/cnaps2/sample/xml/"+op.toString(); // for 393			
			// This need to be changed to fetch set of (bisEle+extEle) for a
			// {msgCode, tpCode, clsCode}
			if (USE_DB) {
				try {
					List<TC2BisEleBscEbo> list = UIBizHelper.getInstance().getBizFields(msgCode, tpCode, clsCode);
					ObjectOutputStream oo = new ObjectOutputStream(new FileOutputStream(fn));
					oo.writeObject(list);
					oo.close();
					return list;
				} catch (AppException e) {
					e.printStackTrace();
					throw new RuntimeException(e);
				}
				
				// String hql = "from " + TC2BisEleBscEbo.class.getSimpleName()
				// + " where msgCode=?";
				// Object[] paras = new Object[] { msgCode };
				// List list = getDao().find(hql, paras);
				// return list;
			}

			else {
				// now we just mock-up without querying DB
//				List<TC2BisEleBscEbo> list = new ArrayList<TC2BisEleBscEbo>();
//				TC2BisEleBscEbo ebo1 = new TC2BisEleBscEbo();
//				ebo1.setPath("/Document/FIToFICstmrCdtTrf/GrpHdr/MsgId");
//				ebo1.setEleId("MsgId");
//				ebo1.setType("Max35Text");
//				list.add(ebo1);
//				return list;
				ObjectInputStream in = new ObjectInputStream(new FileInputStream(fn));
				List<TC2BisEleBscEbo> list = (List<TC2BisEleBscEbo>)in.readObject();
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
		
		
		OpInfo simpleOp = new OpInfo(msgCode, "", "");
		
		OpInfo opInfo = new OpInfo(msgCode, tpCode, clsCode);
		debug("===========================start testGenerated for op=" + opInfo + "============================");

		try {
			// CfgImplFactory.setType(CfgImplFactory.TYPE_FILE);
			// CfgImplFactory.setConfig("D:/bankConnector/source/bin/runBC-A-config-FILE.xml");


			OpTester tester = new OpTester();
			Object ebo = null;
			 //tester.up(opInfo);
			 //tester.down(opInfo);

//			debug("==========================================test Xml2Ebo conversion=========================================");
//			ebo = tester.downPublic(simpleOp);
//			debug("ebo=" + ebo);
//			// to Store this ebo to DB
//			if (USE_DB) {
//				getDao().save(ebo);
//			}
//			
//			// debug only
//			Beps12200101 e = (Beps12200101)ebo;
//			int size = e.getFinCdtTrfInf().size();
//			debug("size="+size);
//			
//			
//			if(TEST_PRIVATE) {
//				Object iso = tester.downPrivate(opInfo, ebo);
//				debug("iso="+iso);
//			}

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
				if(TEST_PRIVATE) {
					ebo = tester.upPrivate(opInfo);
				}
				
				Beps12200101 cloned = (Beps12200101)((Beps12200101)ebo).clone();
				
				debug("ebo before save=="+ebo.getClass().getName());
				if (USE_DB) {
					getDao().save(ebo);
				}				
				
				debug("ebo after save=="+ebo.getClass().getName());
				
				
				String xml = tester.upPublic(ebo, simpleOp);
				
				Beps12200101 b = (Beps12200101)ebo;
				b.setid(1001);
				Beps12200101FinCdtTrfInf b1 = b.getFinCdtTrfInf().iterator().next();
				b1.setid(1002);
				b1.setFid(b);
				
				Beps12200101NtlTrsrCdtInfDtls b2 = b1.getNtlTrsrCdtInfDtls().iterator().next();
				b2.setid(1003);
				b2.setFid(b1);
				
				String xml2 = tester.upPublic(b, simpleOp);
				
				String xml3 = tester.upPublic(cloned, simpleOp);
				
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




	public void atest_beps_133_001_01() throws Exception {
		String msgCode = "beps.133.001.01";
		String tpCode = "";
		String clsCode = "";		
//		String tpCode = "C101";		
//		String clsCode = "00100";

		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}

	
	public void atest_beps_123_001_01() throws Exception {
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
	
	public void test_hvps_111_001_01() throws Exception {
        String msgCode = "hvps.111.001.01";
        String[][] pairs = new String[][] {
        		new String[] {"A105", "02018"},
        		new String[] {"A100", "02116"},
        		new String[] {"A201", ""},
        		new String[] {"A202", ""},
        };
        String tpCode = "";
        String clsCode = "";
        if (TO_GENERATE) {
//            _testGenPublicMap(msgCode, tpCode, clsCode);
            _testGenPublicMap(msgCode, pairs);
        } else {
        	_testGenerated(msgCode, tpCode, clsCode);
        }
    }
	
	public void test_hvps_112_001_01() throws Exception {
        String msgCode = "hvps.112.001.01";
        String[][] pairs = new String[][] {
        		new String[] {"", ""}
        };
        String tpCode = "A200";
        String clsCode = "02118";
        

        if (TO_GENERATE) {
            if(TO_GEN_PRIVATE) {
            	testGenPrivate8583(msgCode, tpCode, clsCode);
            }else {
//            _testGenPublicMap(msgCode, tpCode, clsCode);
            	_testGenPublicMap(msgCode, pairs);
            }
        } else {
        	_testGenerated(msgCode, tpCode, clsCode);
        }
    }
	
	public void test_beps_122_001_01() throws Exception {
        String msgCode = "beps.122.001.01";
        String[][] pairs = new String[][] {
        		new String[] {"", ""}
        };
        String tpCode = "A104";
        String clsCode = "02201";
        

        if (TO_GENERATE) {
            if(TO_GEN_PRIVATE) {
            	testGenPrivate8583(msgCode, tpCode, clsCode);
            }else {
//            _testGenPublicMap(msgCode, tpCode, clsCode);
            	_testGenPublicMap(msgCode, pairs);
            }
        } else {
        	_testGenerated(msgCode, tpCode, clsCode);
        }
    }
	
	public void test_hvps_141_001_01() throws Exception {
        String msgCode = "hvps.141.001.01";
        String[][] pairs = new String[][] {
        		new String[] {"", ""}
        };
        String tpCode = "A200";
        String clsCode = "02118";
        

        if (TO_GENERATE) {
            if(TO_GEN_PRIVATE) {
            	testGenPrivate8583(msgCode, tpCode, clsCode);
            }else {
//            _testGenPublicMap(msgCode, tpCode, clsCode);
            	_testGenPublicMap(msgCode, pairs);
            }
        } else {
        	_testGenerated(msgCode, tpCode, clsCode);
        }
    }
	
	public void atest_beps_393_001_01() throws Exception {
		String msgCode = "beps.393.001.01";
		String tpCode = "";
		String clsCode = "";
		if(TO_GENERATE) {
			_testGenPublicMap(msgCode, tpCode, clsCode);
		} else {
			_testGenerated(msgCode, tpCode, clsCode);
		}
	}
	
	public void atest_saps_737_001_01() throws Exception {
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

	public void atestNested() throws Exception {
		String msgCode = "testNested";
		String tpCode = "";
		String clsCode = "";
//		if(TO_GENERATE)
//			_testGenPublicMap(msgCode, tpCode, clsCode);
		_testGenerated(msgCode, tpCode, clsCode);
	}	

	private List<TC2BisEleBscEbo> mergeMeta (String msgCode, String[][] tpClsPairs) {
		
		List<TC2BisEleBscEbo> res = new ArrayList<TC2BisEleBscEbo>();
		Map<Integer, Object> map = new HashMap<Integer, Object>(); 
		for(String[] pair : tpClsPairs) {
			String tpCode = pair[0];
			String clsCode = pair[1];
			List<TC2BisEleBscEbo> list = getBizEle(msgCode, tpCode, clsCode);
			for(TC2BisEleBscEbo ebo: list) {
				if(map.containsKey(ebo.getId())) {
					// skip
					continue;
				}
				map.put(ebo.getId(), ebo);
				res.add(ebo);
			}
		}
		
		return res;
	}
	
    // should be same as BcConstants.ISO8583_DOC_ID, as the first element is always the grpHdr.msgId
    public static final int ISO8583_MAP_START_POS = 50;
    public static final int ISO8583_VALUE_MAX_LENGTH = 50;
    public static final boolean PRINT_EXTRA_NEWLINE = true; 
    public static final String ENCODING = "UTF-8";
    public static final String TEMPLATE_NAME_MAP_PRIVATE_ISO2EBO = "map-private-iso2ebo.ftl";
    public static final String TEMPLATE_NAME_MAP_PRIVATE_EBO2ISO = "map-private-ebo2iso.ftl";    
	
	
	private void testGenPrivate8583(String msgCode, String tpCode, String clsCode) {
		
		try {
			
			List<TC2BisEleBscEbo> list = getBizEle(msgCode, tpCode, clsCode);
			for (TC2BisEleBscEbo detail : list) {
				debug("TC2BisEleBscEbo="+detail);
			}
			if(LIST_META_ONLY) {
				return;
			}
			
			@SuppressWarnings("unused")
			// this is fake, as have only one sample xml 
			OpInfo simpleOp = new OpInfo(msgCode, "", "");
			String xmlfn = FilePathHelper.sampleXml(simpleOp, getBasePath());
			debug("xmlfn="+xmlfn);
			
			OpInfo opInfo = new OpInfo(msgCode, tpCode, clsCode);
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
//		factory.setNamespaceAware(true); // never forget this!
			factory.setNamespaceAware(false); // cannot get value if given true, todo 
			DocumentBuilder builder = factory.newDocumentBuilder();
			Document doc = builder.parse(new InputSource(new InputStreamReader(new FileInputStream(xmlfn), "UTF-8")));
			XPathFactory xpathFac = XPathFactory.newInstance();
			XPath xpath = xpathFac.newXPath();
			

			StringBuffer sample8583Buf = new StringBuffer();
            MetaJaxbElement metaIso2Ebo = new MetaJaxbElement();
            MetaJaxbElement metaEbo2Iso = new MetaJaxbElement();
            String templatePath = getBasePath()+"/cnaps2/template"; 
            String eboPkgName = ParseSampleXml.EBO_PKG_NAME;
            String eboClassName = ParseSampleXml.getEboClassNameFromOp(simpleOp);
            String outMapPrivateIso2EboFile = FilePathHelper.sampleMapping(opInfo, CfgConstants.DIRECTION_UP,  getBasePath());   //basePath+"/sample/mapping/"+op+"-iso2ebo.map";
            String outMapPrivateEbo2IsoFile = FilePathHelper.sampleMapping(opInfo, CfgConstants.DIRECTION_DOWN,getBasePath());
            String outSample8583File = FilePathHelper.sample8583(opInfo, getBasePath()); //basePath+"/sample/8583/"+op+".8583";
			int i=0;
			for(TC2BisEleBscEbo ebo : list) {
				if(StringUtils.isEmpty(ebo.getType())) {
					// array of sub-elements?
					continue;
				}
				String value = DefaultCnaps2Parser.extract(xpath, ebo.getPath(), doc);
				debug("path="+ebo.getPath()+", v="+value);
//				value = DefaultCnaps2Parser.truncateHeadingXX(value);
				
				String this8583Pos = String.valueOf(ISO8583_MAP_START_POS+i);
                if(i==0) {
                    if(!ebo.getPath().endsWith("GrpHdr/MsgId")) {
                        throw new RuntimeException("first is not grpHdr.msgId?? sth wrong?");
                    }
                    this8583Pos = String.valueOf(BcConstants.ISO8583_DOC_ID);
                }
				

				StringBuffer sample8583Line = new StringBuffer();
                if(i==0) {
                	// just insert OPID as the first line
                    sample8583Line.append(BcConstants.ISO8583_OP_NAME).append("=").append(opInfo.toString());
                    sample8583Line.append("\r\n");
                }
                
                if(value.length()>ISO8583_VALUE_MAX_LENGTH) {
                    // truncate the value field
                    value = value.substring(0, ISO8583_VALUE_MAX_LENGTH);
                }
                sample8583Line.append(this8583Pos).append("=").append(value);
                sample8583Line.append("\r\n");
                // additional new line
                if (PRINT_EXTRA_NEWLINE) {
                    sample8583Line.append("\r\n");
                }
                sample8583Buf.append(sample8583Line.toString());
                
                Writer sample8583Out = new OutputStreamWriter(new FileOutputStream(new File(outSample8583File)), ENCODING);
                sample8583Out.write(sample8583Buf.toString());
                sample8583Out.flush();
                
                // for iso2ebo and ebo2iso

                String eboPropertyName = StringUtils.uncapitalize(ebo.getEleId());
                @SuppressWarnings("rawtypes")
                Class eboClass = Class.forName(eboPkgName+"."+eboClassName);
                
                
                debug("============eboClassName="+eboClassName+", eboPropertyName="+eboPropertyName+"=======================");
                String decoder = "";
                try {
                    if("id".equalsIgnoreCase(eboPropertyName)) {
                    	throw new NoSuchFieldException("");
                    }
                Field f= eboClass.getDeclaredField(eboPropertyName);
                String clazz = f.getType().getSimpleName();
        		if("Date".equals(clazz)) {
        			decoder = "Date";
        		}else if("BigDecimal".equals(clazz)) {
        			decoder = "BigDecimal";
        		}else {
        			decoder = "NULL";
        		}
                } catch (java.lang.NoSuchFieldException e ) {
                	// field not found!!!!!!!
                	// need manual change!!!!!
                	eboPropertyName += "_____"+ebo.getPath();
    				decoder="NULL";
    			}
                
                // iso2ebo
                Value valIso2Ebo = new Value();
//                valIso2Ebo.setData("/test.transform.IsoObj/f"+this8583Pos);
                // use this instead. see template for reason 
                valIso2Ebo.setData("f"+this8583Pos);
                valIso2Ebo.setProperty(eboPropertyName);
                valIso2Ebo.setDecoder(decoder);                
                metaIso2Ebo.getValues().add(valIso2Ebo);

    			
                // ebo2iso
                Value valEbo2Iso = new Value();
//                valEbo2Iso.setData("/"+eboPkgName+"."+eboClassName+"/"+StringUtils.uncapitalize(capitizedJavaName));
                valEbo2Iso.setData(eboPropertyName);
             // use this instead. see template for reason 
                valEbo2Iso.setProperty("f"+this8583Pos);
                metaEbo2Iso.getValues().add(valEbo2Iso);
                valEbo2Iso.setDecoder(decoder);
                i++;
			}
			
			debug("sample8583="+sample8583Buf.toString());
			
			if(!TO_GEN_PRIVATE_MAP) {
				return;
			}
            // iso2ebo
            MetaHolder mhIso2Ebo = new MetaHolder();
            mhIso2Ebo.setInputClassName(IsoObj.class.getName());
            mhIso2Ebo.getMetas().add(metaIso2Ebo);
            metaIso2Ebo.setBeanId(SmooksTransformer.ROOT_BEAN_ID);
            metaIso2Ebo.setBeanClass(eboPkgName+"."+eboClassName);
//            
            Writer out1 = new OutputStreamWriter(new FileOutputStream(new File(outMapPrivateIso2EboFile)), ENCODING);
            String map1 = ParseSampleXml.renderTemplate(mhIso2Ebo, TEMPLATE_NAME_MAP_PRIVATE_ISO2EBO, templatePath);
            out1.write(map1);
            out1.flush();
            System.out.println("generated outMapPrivateIso2EboFile at " + outMapPrivateIso2EboFile);
            
            // ebo2iso
            MetaHolder mhEbo2Iso = new MetaHolder();
            mhEbo2Iso.setInputClassName(eboPkgName+"."+eboClassName);
            mhEbo2Iso.getMetas().add(metaEbo2Iso);
            metaEbo2Iso.setBeanId(SmooksTransformer.ROOT_BEAN_ID);
            metaEbo2Iso.setBeanClass(IsoObj.class.getName());
            
            Writer out2 = new OutputStreamWriter(new FileOutputStream(new File(outMapPrivateEbo2IsoFile)), ENCODING);
            String map2 = ParseSampleXml.renderTemplate(mhEbo2Iso, TEMPLATE_NAME_MAP_PRIVATE_EBO2ISO, templatePath);
            out2.write(map2);
            out2.flush();
            System.out.println("generated outMapPrivateEbo2IsoFile at " + outMapPrivateEbo2IsoFile);
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
	
	public void _testGenPublicMap(String msgCode, String tpCode, String clsCode) throws Exception {
		_testGenPublicMap(msgCode, new String[][] {new String[]{tpCode, clsCode}});
	}
	
	@SuppressWarnings("unused")
	public void _testGenPublicMap(String msgCode, String[][] tpClsPairs) throws Exception {
		
		// this is old..
//		OpInfo op = new OpInfo(msgCode, tpCode, clsCode);
//		List<TC2BisEleBscEbo> list = getBizEle(msgCode, tpCode, clsCode);
		
		// this is new..
		OpInfo op = new OpInfo(msgCode, "", "");
		List<TC2BisEleBscEbo> list = mergeMeta(msgCode, tpClsPairs);
		
		debug("start testGenPublicMap for op=" + op + "...");

		try {
			
			Map<Integer, DataEle> hookPoints = new HashMap<Integer, DataEle>();
			

			
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
			
//            CfgImplFactory.setType(cfgType);
            CfgImplFactory.setConfig(BC2_HOME+"/bin/runBC-A-config-FILE.xml");
            
            
//			testGenerated_311();
//		    test_hvps_111_001_01();
		    
//		    test_hvps_112_001_01();
		    
            test_beps_122_001_01();
//            System.setProperty("bc2.saveMsgFile", "true");
//            AuditMsgUtil.saveMsgAsFile(CfgConstants.DIRECTION_UP, "abc", "xxx");
		    
//		    test_hvps_141_001_01();
		    
//			test_beps_133_001_01();

//			test_saps_737_001_01();

			
//			test_beps_123_001_01();
//			test_beps_393_001_01();
//			testNested();
			
//			Field f = InstgPty1.class.getDeclaredField("instgIndrctPty");
//			debug("f="+f);
		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		}		
		
	}
	
}
