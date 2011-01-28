package com.topfinance.transform.simple;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.ElementList;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;

import test.transform.IsoObj;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.jpa.TCfgMapRuleDetailEbo;
import com.topfinance.cfg.jpa.TCfgMapRuleEbo;
import com.topfinance.plugin.cnaps2.Cnaps2Constants;

public class SimpleMappingRule {
	


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
	
	public static SimpleMappingRule fromDb(TCfgMapRuleEbo cfg, String direction) {
        try {
            SimpleMappingRule rule = new SimpleMappingRule();
            if(CfgConstants.DIRECTION_UP.equals(direction)) {
            	// iso2ebo
            	// TODO
            	rule.setTargetName(Cnaps2Constants.MSGCODE_EBOCLS.get(cfg.getMsgCode()));
            	for(TCfgMapRuleDetailEbo detail : cfg.getMappings()) {
            		Mapping m = new Mapping();
            		rule.getMappings().add(m);
            		m.setTargetPath(detail.getBizFldPath());
            		m.setTargetType(detail.getBizFldType());
            		m.setSrcPath(detail.getPteFldPath());
            		m.setSrcType(detail.getPteFldType());
            		m.setValue(detail.getBizFldValue());
            		// TODO
            		m.setMode("");
            	}
            }
            else {
            	// ebo2Iso
            	rule.setTargetName(IsoObj.class.getName());
            	for(TCfgMapRuleDetailEbo detail : cfg.getMappings()) {
            		Mapping m = new Mapping();
            		rule.getMappings().add(m);
            		m.setSrcPath(detail.getBizFldPath());
            		m.setSrcType(detail.getBizFldType());
            		m.setTargetPath(detail.getPteFldPath());
            		m.setTargetType(detail.getPteFldType());
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
