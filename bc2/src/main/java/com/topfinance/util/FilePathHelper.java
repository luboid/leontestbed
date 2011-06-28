package com.topfinance.util;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.runtime.OpInfo;


public class FilePathHelper {
	
	public static final String PATH_SAMPLE_MAPPING = "/cnaps2/sample/mapping/";
	public static final String PATH_CONFIG_MAPPING = "/cnaps2/config/mapping/";
	
//    inXmlFile = basePath+"/sample/xml/"+op+".xml";
//    templatePath = basePath+"/template";
//    jaxbPkgName = Iso8583ToXml.getPackageName(op);
//    
//    eboPkgName = EBO_PKG_NAME;
//    eboClassName = getEboClassNameFromOp(op);
//    tblName = TBL_NAME_PREFIX+StringUtils.upperCase(StringUtils.replace(op, ".", "_"));
//    
//    outSample8583File = basePath+"/sample/8583/"+op+".8583";
////    outMapFile = basePath+"/map/"+op+"-up.map";
////    outReverseMapFile = basePath+"/map/"+op+"-down.map";
//    outDdlOracleFile = basePath+"/ddl/"+"oracle-"+op+".sql";
//    outDdlMysqlFile = basePath+"/ddl/"+"mysql-"+op+".sql";
//    
//    outEboPath = basePath+"/java/"+StringUtils.replace(eboPkgName, ".", "/");
//    
//    outMapSmooksEbo2JaxbFile = basePath+"/config/mapping/"+op+"-ebo2jaxb.map";
//    outMapSmooksXml2EboFile = basePath+"/config/mapping/"+op+"-xml2ebo.map";
//    outMapPrivateIso2EboFile = basePath+"/sample/mapping/"+op+"-iso2ebo.map";
//    outMapPrivateEbo2IsoFile = basePath+"/sample/mapping/"+op+"-ebo2iso.map";
	
	public static String sampleXml(OpInfo op) {
		return sampleXml(op, BCUtils.getHomeDir());
	}
	public static String sampleXml(OpInfo op, String basePath) {
		return basePath+"/cnaps2/sample/xml/"+op+".xml";
	}
	
	public static String sample8583(OpInfo op) {
		return sample8583(op, BCUtils.getHomeDir());
	}
	public static String sample8583(OpInfo op, String basePath) {
		return basePath+"/cnaps2/sample/8583/"+op+".8583";
	}
	
	
	public static String sampleMapping(OpInfo opInfo, String direction) {
		return sampleMapping(opInfo, direction, BCUtils.getHomeDir());
	}
	public static String sampleMapping(OpInfo opInfo, String direction, String basePath) {
		String s = CfgConstants.DIRECTION_UP.equals(direction) ? "iso2ebo" : "ebo2iso";
		return basePath+PATH_SAMPLE_MAPPING+opInfo.toString()+"-"+s+".map";
	}
	
	public static String sampleMappingSimple(OpInfo opInfo, String direction) {
		return sampleMappingSimple(opInfo, direction, BCUtils.getHomeDir());
	}
	public static String sampleMappingSimple(OpInfo opInfo, String direction, String basePath) {
		String s = CfgConstants.DIRECTION_UP.equals(direction) ? "iso2ebo" : "ebo2iso";
		return basePath+PATH_SAMPLE_MAPPING+opInfo.toString()+"-"+s+"-simple.map";
	}
	
	public static String configMapping(OpInfo opInfo, String direction) {
		return configMapping(opInfo, direction,  BCUtils.getHomeDir());
	}
	
	public static String configMapping(OpInfo opInfo, String direction, String basePath) {
		String s = CfgConstants.DIRECTION_UP.equals(direction) ? "ebo2jaxb" : "xml2ebo";
		
		StringBuffer buf = new StringBuffer();
		buf.append(basePath).append(PATH_CONFIG_MAPPING).append(opInfo.getMesgType()).append("-")
		     // now public mapping only give to mesgType level
			//.append(deNull(opInfo.getOpType()))
			.append("-")
			//.append(deNull(opInfo.getOpClass()))
			.append("-").append(s).append(".map");
		return buf.toString();
	}
	
	public static String deNull(String s) {
		return s==null? "" : s;
	}
	
	public static String configOds() {
		return BCUtils.getHomeDir()+"/cnaps2/config/operations.xml";
	}
	
}
