package com.topfinance.transform.simple;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.ElementList;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;

import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.jpa.JpaCfgReader;
import com.topfinance.payment.ebo.TCfgFmtEleMapFileEbo;
import com.topfinance.payment.ebo.TCfgFmtEleMapRuleEbo;

public class SimpleMappingRule {
	
//    public static String EBO_101 = "com.topfinance.ebo.msg.Ibps10100101";
//    public static String EBO_102 = "com.topfinance.ebo.msg.Ibps10200101";
//    public static String EBO_601 = "com.topfinance.ebo.msg.Saps60100101";
//    public static String EBO_111 = "com.topfinance.ebo.msg.Hvps11100101";
//    public static String EBO_604 = "com.topfinance.ebo.msg.Saps60400101";
//    public static Map<String, String> MSGCODE_EBOCLS = new HashMap<String, String>();
//    static {
//        // TODO this is a static list according to spec
//    	MSGCODE_EBOCLS.put(TestDummy.OPERATION_101, EBO_101);
//    	MSGCODE_EBOCLS.put(TestDummy.OPERATION_102, EBO_102);
//    	MSGCODE_EBOCLS.put(TestDummy.OPERATION_601, EBO_601);
//    	
//    	MSGCODE_EBOCLS.put(TestDummy.OPERATION_111, EBO_111);
//    	MSGCODE_EBOCLS.put(TestDummy.OPERATION_604, EBO_604);
//    }

    public final static String DIRECTION_UP = "U";
	static final String EBO_PKG = "com.topfinance.ebo.msg.";
	static final String ISOOBJ_CLAZZ = "com.topfinance.transform.util.IsoObj";
	
	// 注，这个是必填。
	// if targetMode=Java, this is target's className 
	// (especially if target is a JAXB tree, this is the Document object's className)
	@Attribute(required=false)
	String targetName;

	
	// 注，暂时可先不管mode，默认都为javaBean
	// {JavaBean, JAXB}
	@Attribute(required=false)
	String targetMode;
	// TODO optionally, we can always use JAXB to parse XML first without having to cast it as DOM.
	// {XML, JavaBean}
	@Attribute(required=false)
	String srcMode;
	

	@Attribute(required=false)
	String srcName;

	@ElementList
	List<Mapping> mappings = new ArrayList<Mapping>();
	
	
	public static class Mapping {
		public Mapping() {
			
		}
		public Mapping(String srcPath, String targetPath) {
			this.srcPath = srcPath;
			this.targetPath = targetPath;
		}

		// 必填
		// Simplified XPATH expression. Could be used to fetch Java object tree
		@Attribute(required=false)
		String srcPath;
		// Path或Value二选一
		@Attribute(required=false)
		String value;
		
		// MAPPING/AUTO/FIXED
		@Attribute(required=false)
		String mode;
		
		@Attribute(required=false)
		String targetPath;

		
		// 当为某些特殊类型时必填，如ISODate等，可选的值参见 IType接口
		// Type in {Date, Decimal, ISODate, etc)
		@Attribute(required=false)
		String targetType;
		// like date/decimal format pattern
//		String targetFormat;
		@Attribute(required=false)
		String srcType;
		
		
		public String getTargetPath() {
			return targetPath;
		}
		public void setTargetPath(String targetPath) {
			this.targetPath = targetPath;
		}
		public String getTargetType() {
			return targetType;
		}
		public void setTargetType(String targetType) {
			this.targetType = targetType;
		}
		public String getSrcPath() {
			return srcPath;
		}
		public void setSrcPath(String srcPath) {
			this.srcPath = srcPath;
		}
		public String getSrcType() {
			return srcType;
		}
		public void setSrcType(String srcType) {
			this.srcType = srcType;
		}
		public String getValue() {
			return value;
		}
		public void setValue(String value) {
			this.value = value;
		}
		public String getMode() {
			return mode;
		}
		public void setMode(String mode) {
			this.mode = mode;
		}
		
	}




	public String getTargetMode() {
		return targetMode;
	}




	public void setTargetMode(String targetMode) {
		this.targetMode = targetMode;
	}




	public String getTargetName() {
		return targetName;
	}




	public void setTargetName(String targetName) {
		this.targetName = targetName;
	}




	public String getSrcMode() {
		return srcMode;
	}




	public void setSrcMode(String srcMode) {
		this.srcMode = srcMode;
	}




	public String getSrcName() {
		return srcName;
	}




	public void setSrcName(String srcName) {
		this.srcName = srcName;
	}




	public List<Mapping> getMappings() {
		return mappings;
	}




	public void setMappings(List<Mapping> mappings) {
		this.mappings = mappings;
	}
	
	
	public static SimpleMappingRule fromXml(InputStream in) {
	        try {
	            Serializer serializer = new Persister();
	            SimpleMappingRule rule = serializer.read(SimpleMappingRule.class, in);
	            return rule;
	        } catch (Exception ex) {
	            throw new RuntimeException(ex);
	        }
	}
	
	public byte[] toXml() {
		try {
        Serializer serializer = new Persister();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        serializer.write(this, out);
        System.out.println("Done");
        return out.toByteArray();

		} catch (Exception ex) {
			throw new RuntimeException(ex);
		}
	}
	
	public static final String PATH_SAMPLE_MAPPING = "/cnaps2/sample/mapping/";
	public static String sampleMappingSimple(String msgCode, String tpCode, String clsCode, String direction, String basePath) {
		String s = DIRECTION_UP.equals(direction) ? "iso2ebo" : "ebo2iso";
		return basePath+PATH_SAMPLE_MAPPING+msgCode+"_"+tpCode+"_"+clsCode+"-"+s+"-simple.map";
	}
    
//	public static SimpleMappingRule fromDb(TCfgMapRuleEbo cfg, String direction) {
//        try {
//            SimpleMappingRule rule = new SimpleMappingRule();
//            if(CfgConstants.DIRECTION_UP.equals(direction)) {
//            	// iso2ebo
//            	// TODO
//            	rule.setTargetName(Cnaps2Constants.MSGCODE_EBOCLS.get(cfg.getMsgCode()));
//            	for(TCfgMapRuleDetailEbo detail : cfg.getMappings()) {
//            		Mapping m = new Mapping();
//            		rule.getMappings().add(m);
//            		m.setTargetPath(detail.getBizFldPath());
//            		m.setTargetType(detail.getBizFldType());
//            		m.setSrcPath(detail.getPteFldPath());
//            		m.setSrcType(detail.getPteFldType());
//            		m.setValue(detail.getBizFldValue());
//            		// TODO
//            		m.setMode("");
//            	}
//            }
//            else {
//            	// ebo2Iso
//            	rule.setTargetName(IsoObj.class.getName());
//            	for(TCfgMapRuleDetailEbo detail : cfg.getMappings()) {
//            		Mapping m = new Mapping();
//            		rule.getMappings().add(m);
//            		m.setSrcPath(detail.getBizFldPath());
//            		m.setSrcType(detail.getBizFldType());
//            		m.setTargetPath(detail.getPteFldPath());
//            		m.setTargetType(detail.getPteFldType());
//            		m.setValue(detail.getBizFldValue());
//            		// TODO
//            		m.setMode("");
//            	}
//            	
//            }
//            
//            
//            return rule;
//        } catch (Exception ex) {
//            throw new RuntimeException(ex);
//        }
//	}
	
	public static String getPosSequn(String pos, TCfgFmtEleMapFileEbo cfg) {
		
		// to get formatId:  cfg.getTCfgFormat().getUid();
		
		return ((JpaCfgReader)CfgImplFactory.loadCfgReader()).getPosSequn(pos);
	}
	
	
	
    public static String getEboClassNameFromOp(String mesgType, String opType, String opClass) {
    	
    	// this should be same as in ParseSampleXml.getEboClassNameFromOp
    	String op = mesgType+opType+opClass;
        return EBO_PKG+StringUtils.capitalize(StringUtils.remove(op, '.'));
    }
	public static SimpleMappingRule fromDb(TCfgFmtEleMapFileEbo cfg, String direction) {
        try {
            SimpleMappingRule rule = new SimpleMappingRule();
            if(DIRECTION_UP.equals(direction)) {
            	// iso2ebo
            	// TODO
//            	rule.setTargetName(Cnaps2Constants.MSGCODE_EBOCLS.get(cfg.getMsgCode()));
            	rule.setTargetName(getEboClassNameFromOp(cfg.getMsgCode(), cfg.getTpCode(), cfg.getClsCode()));
            	
            	for(TCfgFmtEleMapRuleEbo detail : cfg.getMappings()) {
            		Mapping m = new Mapping();
            		rule.getMappings().add(m);
            		
//            		m.setTargetPath(detail.getBizFldPath());
            		m.setTargetPath(StringUtils.uncapitalize(detail.getBizFldEleId()));
            		
//            		m.setTargetType(detail.getBizFldType());
            		if("ISODateTime".equalsIgnoreCase(detail.getBizFldType())) {
            			m.setTargetType("JAVADATE");
            			m.setSrcType("ISODATE");
            		}
            		
//            		m.setSrcPath(detail.getPteFldPath());
            		String pos = getPosSequn(detail.getPteFldPath(), cfg);
            		m.setSrcPath("f"+pos);
            		
            		
            		m.setValue(detail.getBizFldValue());
            		// TODO
            		m.setMode("");
            	}
            }
            else {
            	// ebo2Iso
            	rule.setTargetName(ISOOBJ_CLAZZ);
            	for(TCfgFmtEleMapRuleEbo detail : cfg.getMappings()) {
            		Mapping m = new Mapping();
            		rule.getMappings().add(m);
//            		m.setSrcPath(detail.getBizFldPath());
            		m.setSrcPath(StringUtils.uncapitalize(detail.getBizFldEleId()));
            		

            		
//            		m.setTargetPath(detail.getPteFldPath());
            		String pos = getPosSequn(detail.getPteFldPath(), cfg);
            		m.setTargetPath("f"+pos);
            		
            		
//            		m.setTargetType(detail.getPteFldType());
//            		m.setSrcType(detail.getBizFldType());
            		if("ISODateTime".equalsIgnoreCase(detail.getBizFldType())) {
            			m.setTargetType("ISODATE");
            			m.setSrcType("JAVADATE");
            		}
            		
            		
            		m.setValue(detail.getBizFldValue());
            		// TODO
            		m.setMode("");
            	}
            	
            }
            
            
            return rule;
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
	}
	
}
