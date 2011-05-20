package com.topfinance.util;

import org.apache.commons.lang.StringUtils;

import com.topfinance.util.ParseSampleXml.DataEle;



public class ParseSampleXmlHelper {
	/**
	 * convert between path in jaxb classes and in XML
	 * @param xpath
	 * @return
	 */
	public static String xpath2opath(String xpath) {
		String name = ParseSampleXml.getJavaName(xpath);
		// special case to handle
        if(name.equals("fIToFICstmrCdtTrf")) {
            // for 101 
            name = "fiToFICstmrCdtTrf";
        } else if(name.equals("fIToFIPmtStsRpt")) {
            // for 102
            name = "fiToFIPmtStsRpt";
        } else if(name.equals("fIToFICstmrDrctDbt")) {
            // for beps.133
            name = "fiToFiCstmrDrctDbt";            
        }
		return name;
	}
	
	public static String opath2xpath(String jaxb) {
		String xmlPath = "";
    	if("fiToFICstmrCdtTrf".equals(jaxb)) {
    		xmlPath="FIToFICstmrCdtTrf";
    	}else if("fiToFIPmtStsRpt".equals(jaxb)) {
    		xmlPath="FIToFIPmtStsRpt";
    	}else if("fiToFiCstmrDrctDbt".equals(jaxb)) {
            // for beps.133    		
    		xmlPath="FIToFICstmrDrctDbt";    		
    	} else {
    		xmlPath = jaxb;
    	}
    	return xmlPath;
    	
	}
	
	
    // mapping of type to EboType
    public static String getEboTypeFromMetaType(DataEle pp, EboInfo subEbo) {
    	if(pp.isList()) {
    		return "java.util.Set<"+subEbo.getDestinationClassName()+">";
    	}

        String clazz = "";
        
        String metaType = pp.type;
		if(StringUtils.isEmpty(pp.type)) {
			clazz = "";
		}
		else if (metaType.contains("Text")) {
			clazz = "String";
		} else if (metaType.toLowerCase().contains("code")) {
			clazz = "String";
		} else if (metaType.equalsIgnoreCase("DecimalNumber")) {
			clazz = "Double";
		} else if (metaType.equalsIgnoreCase("CurrencyAndAmount")) {
			clazz = "Double";
		} else if (metaType.equalsIgnoreCase("ActiveCurrencyAndAmount")) {
			clazz = "Double";
		} else if (metaType.equalsIgnoreCase("ISODateTime")) {
			clazz = "DateTime";
		} else if (metaType.equalsIgnoreCase("ISODate")) {
			clazz = "Date";
		} else if (metaType.equalsIgnoreCase("Any")) {
			clazz = "String";
		}  else if (metaType.equalsIgnoreCase("SystemStatus")) {
			clazz = "String";

		}



        
        return clazz;
    }
    
    
    // mapping of type to DbType
    public static String getOracleDbTypeFromJaxbType(DataEle pp) {
    	
    	if(pp.isList()) {
    		return "";
    	}
    	String metaType = pp.type;
        String DB_BOOLEAN = "CHAR(1)";
        String DB_SHORT_STRING = "VARCHAR2(20)";
        String DB_STRING = "VARCHAR2(200)";
        String DB_DATE = "DATE";
        String DB_NUMBER = "NUMBER";
        
        
        String res = "";
        
		if(StringUtils.isEmpty(pp.type)) {
			res = "";
		}
		else if (metaType.contains("Text")) {
			res = DB_STRING;
		} else if (metaType.toLowerCase().contains("code")) {
			res = DB_STRING;
		} else if (metaType.equalsIgnoreCase("ActiveCurrencyAndAmount")) {
			res = DB_NUMBER;
		} else if (metaType.equalsIgnoreCase("DecimalNumber") ||
				metaType.equalsIgnoreCase("CurrencyAndAmount")||
				metaType.equalsIgnoreCase("PercentageRate")) {
			res = DB_NUMBER;
			
		} else if (metaType.equalsIgnoreCase("ISODateTime")) {
			res = DB_DATE;
		} else if (metaType.equalsIgnoreCase("ISODate")) {
			res = DB_DATE;			
		} else {
			// what is it? 
			throw new RuntimeException("==============no matching Oracle DB types for metatype=: "+metaType);
		}
        return res;
    }
    public static String getMysqlDbTypeFromJaxbType(DataEle pp) {
    	String metaType = pp.type;
    	if(pp.isList()) {
    		return "";
    	}
    	
        String DB_BOOLEAN = "CHAR(1)";
        String DB_SHORT_STRING = "VARCHAR(20)";
        String DB_STRING = "VARCHAR(200)";
        String DB_DATE = "DATE";
        String DB_NUMBER = "DOUBLE";
        
        
        String res = "";
        
		if(StringUtils.isEmpty(pp.type)) {
			res = "";
		}
		else if (metaType.contains("Text")) {
			res = DB_STRING;
		} else if (metaType.toLowerCase().contains("code")) {
			res = DB_STRING;
		} else if (metaType.equalsIgnoreCase("ActiveCurrencyAndAmount")) {
			res = DB_NUMBER;
		} else if (metaType.equalsIgnoreCase("DecimalNumber") ||
				metaType.equalsIgnoreCase("CurrencyAndAmount")||
				metaType.equalsIgnoreCase("PercentageRate")) {
			res = DB_NUMBER;
			
		} else if (metaType.equalsIgnoreCase("ISODateTime")) {
			res = DB_DATE;
		} else if (metaType.equalsIgnoreCase("ISODate")) {
			res = DB_DATE;			
		} else {
			// what is it? 
			throw new RuntimeException("==============no matching Oracle DB types for metatype=: "+metaType);
		}
		

        return res;
    }
}
