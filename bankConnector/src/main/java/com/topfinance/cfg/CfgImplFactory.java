package com.topfinance.cfg;

import com.topfinance.cfg.dummy.DummyCfgReader;

public class CfgImplFactory {
    
    public static ICfgReader loadCfgReader() {
        return DummyCfgReader.getInstance();
    }
    
    public static void init(String fileName) {
        DummyCfgReader.init(fileName);
    }
    public static void init() {
        DummyCfgReader.init();
    }    
}
