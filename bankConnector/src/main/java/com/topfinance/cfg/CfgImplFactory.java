package com.topfinance.cfg;

import com.topfinance.cfg.db.DbCfgReader;
import com.topfinance.cfg.dummy.DummyCfgReader;

public class CfgImplFactory {
     
    public static final String TYPE_FILE = "FILE";
    public static final String TYPE_DB = "DB";
    
    public static final String DEFAULT = TYPE_FILE;
    
    public static ICfgReader loadCfgReader() {
        return loadCfgReader(DEFAULT);
    }
    
    public static void init(String fileName) {
        DummyCfgReader.init(fileName);
    }
    public static void init() {
        DummyCfgReader.init();
    }    
    
    public static ICfgReader loadCfgReader(String type) {
        ICfgReader res = null;
    
        if(TYPE_FILE.equals(type)) {
            res =  DummyCfgReader.getInstance();
        }else if(TYPE_DB.equals(type)) {
            res =  DbCfgReader.getInstance();
        }
        return res;
    }
}
