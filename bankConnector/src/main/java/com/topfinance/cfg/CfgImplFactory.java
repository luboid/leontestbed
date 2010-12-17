package com.topfinance.cfg;

import com.topfinance.cfg.jpa.JpaCfgReader;
import com.topfinance.cfg.xml.XmlCfgReader;

import java.util.ArrayList;
import java.util.List;

public class CfgImplFactory {
     
    public static final String TYPE_FILE = "FILE";
    public static final String TYPE_DB = "DB";
    
    public static List<String> getSupportedTypes() {
        List<String> types = new ArrayList<String>();
        types.add(TYPE_DB);
        types.add(TYPE_FILE);
        return types;
    }
    // default
    private static String type = TYPE_FILE;
    private static String config = null;
    
    public static void setType(String newtype) {
        type = newtype;
    }
    public static void setConfig(String newconfig) {
        config = newconfig;
    }
    
    public static ICfgReader loadCfgReader() {
        return loadCfgReader(type);
    }
    
    public static ICfgReader loadCfgReader(String type) {
        ICfgReader res = null;
    
        if(TYPE_FILE.equals(type)) {
            res =  XmlCfgReader.getInstance(config);
        }else if(TYPE_DB.equals(type)) {
            res =  JpaCfgReader.getInstance(config);
        }
        return res;
    }
}
