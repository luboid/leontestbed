package com.topfinance.message;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.ICfgFormat;
import com.topfinance.cfg.ICfgFormat8583;
import com.topfinance.cfg.ICfgFormatXml;
import com.topfinance.runtime.OpInfo;
import com.topfinance.util.FilePathHelper;

public class FormatFactory implements CfgConstants{
	static Logger logger = Logger.getLogger(FormatFactory.class);
	
	public static IMsgParser getMsgParser(ICfgFormat format) {
		IMsgParser res = null;
		if(format.getFormat().equals(FORMAT_8583)) {
			res = new MsgParser8583();

		}else if(format.getFormat().equals(FORMAT_XML)) {
//			res = new 
		}
		

		return res;
	}
	public static IMsgPacker getMsgPacker(ICfgFormat format) {
		IMsgPacker res = null;
		if(format.getFormat().equals(FORMAT_8583)) {
			res = new MsgPacker8583();

		}else if(format.getFormat().equals(FORMAT_XML)) {
//			res = new 
		}
		
//		res.setConfig(format);		
		return res;
	}
	
	
	static Map<String, String> converters = new HashMap<String, String>();
	static {
		String pkgName = "com.topfinance.message";
//		converters.put(FORMAT_XML+"2"+FORMAT_8583, );
		
		
	}
	
//	public static IMsgConverter getMsgConverter(ICfgOperation opn,  String direction) {
//		IMsgConverter res = null;
//		
//		// TODO cache of smooks instance (which parses mapping)
//		
//		String ppFormat = CfgImplFactory.loadCfgReader().getFormatByOpn(opn).getFormat();
//		
//
//		if(FORMAT_8583.equals(ppFormat)) {
////			if(DIRECTION_UP.equals(direction)) {
//			res = new MsgConverterJava2Java();
//		}
//		else if(FORMAT_XML.equals(ppFormat)) {
//			// TODO
//			
//		}else {
//			logger.error("no converter found for ppFormat="+ppFormat);
//			throw new RuntimeException("no converter found for ppFormat="+ppFormat);
//		}
//		
//		res.setMapping(loadPpMapping(opn, direction));
//		
//		return res;
//	}
	
//	public static InputStream loadPpMapping(ICfgOperation opn, String direction) {
//		
////		String mappingFile = DIRECTION_UP.equals(direction) ? opn.getUpMappingFile() : opn.getDownMappingFile();
//		
//		String opnName = opn.getName();
//		String mappingFile = FilePathHelper.configMapping(opnName, direction);
//		
//		InputStream mapping = null;
//		try {
//			mapping = new FileInputStream(mappingFile);
//		} catch (FileNotFoundException ex) {
//			// TODO custom exception
//			logger.error(ex);
//			throw new RuntimeException (ex);
//		}
//		return mapping;
//	}
	
	public static InputStream loadPluginMapping(OpInfo opInfo, String direction){
		// TODO handle different protocol?
//		String bcHome = BCUtils.getHomeDir();
//		String type = DIRECTION_UP.equals(direction) ? "ebo2Jaxb" : "xml2ebo";
//		String mappingFile = bcHome+"/sample/map/"+opnName+"-"+type+".map";
		
		String mappingFile = FilePathHelper.configMapping(opInfo, direction);
		
		// TODO
//		CfgImplFactory.loadCfgReader().getMappingRule(opn, direction);
		
		InputStream mapping = null;
		try {
			mapping = new FileInputStream(mappingFile);
			return mapping;
		} catch (FileNotFoundException e) {
			String msg = "mapping file not found at"+mappingFile;
			logger.error(msg);
			throw new RuntimeException(msg);
		}
	}
	

}
