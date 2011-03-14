package com.topfinance.cfg.xml;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;

import org.apache.commons.io.IOUtils;
import org.simpleframework.xml.Attribute;

import com.topfinance.cfg.CfgAccessException;
import com.topfinance.cfg.ICfgMappingRule;
import com.topfinance.runtime.OpInfo;
import com.topfinance.util.BCUtils;
import com.topfinance.util.FilePathHelper;


public class OmCfgMappingRule implements ICfgMappingRule{
	
    @Attribute(required=false)
	private String mesgType;
    
    @Attribute(required=false)
	private String opType;

    @Attribute(required=false)
	private String opClass;
    
    @Attribute(required=false)
    private String direction;
    


	public String getDirection() {
		return direction;
	}
	public void setDirection(String direction) {
		this.direction = direction;
	}
	
	public byte[] getMapping() {
		try {
			String filePath = FilePathHelper.sampleMappingSimple(new OpInfo(mesgType, opType, opClass), direction);
			BCUtils.testFileExist(filePath, false);
			
				ByteArrayOutputStream out = new ByteArrayOutputStream();
				IOUtils.copy(new FileInputStream(filePath), out);
				return out.toByteArray();
		} catch (Exception ex) {
			throw new CfgAccessException(ex);
		}
	}
	public static byte[] getMapping(String mesgType, String opType, String opClass, String direction) {
		try {
			String filePath = FilePathHelper.sampleMappingSimple(new OpInfo(mesgType, opType, opClass), direction);
			BCUtils.testFileExist(filePath, false);
			
				ByteArrayOutputStream out = new ByteArrayOutputStream();
				IOUtils.copy(new FileInputStream(filePath), out);
				return out.toByteArray();
		} catch (Exception ex) {
			throw new CfgAccessException(ex);
		}
	}
	public void setMapping(byte[] mapping) {
	}
	
	public String getMesgType() {
		return mesgType;
	}
	public void setMesgType(String mesgType) {
		this.mesgType = mesgType;
	}
	public String getOpType() {
		return opType;
	}
	public void setOpType(String opType) {
		this.opType = opType;
	}
	public String getOpClass() {
		return opClass;
	}
	public void setOpClass(String opClass) {
		this.opClass = opClass;
	}


    
    
	
}
