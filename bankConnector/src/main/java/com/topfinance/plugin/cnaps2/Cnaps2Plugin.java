package com.topfinance.plugin.cnaps2;

import com.topfinance.plugin.BasePlugin;
import com.topfinance.runtime.OperationDefinitions;

import java.io.InputStream;

public class Cnaps2Plugin extends BasePlugin  {
    OperationDefinitions ods;
    
    public Cnaps2Plugin() {
        
    }
    
    public OperationDefinitions loadOperationDefinitions() {
        if(ods == null) {
            InputStream in = this.getClass().getClassLoader()
                .getResourceAsStream("com/topfinance/plugin/cnaps2/operations.xml");
            ods = OperationDefinitions.load(in);
        }
        return ods;
        
    }



}
