package com.topfinance.plugin.cnaps2;

import java.io.FileInputStream;
import java.io.InputStream;

import com.topfinance.plugin.BasePlugin;
import com.topfinance.runtime.OperationDefinitions;
import com.topfinance.util.FilePathHelper;

public class Cnaps2Plugin extends BasePlugin  {
    OperationDefinitions ods;
    
    public Cnaps2Plugin() {
        
    }
    
    public OperationDefinitions loadOperationDefinitions() {
        if(ods == null) {
        	try {
        	InputStream in = new FileInputStream(FilePathHelper.configOds());
//            InputStream in = this.getClass().getClassLoader()
//                .getResourceAsStream("com/topfinance/plugin/cnaps2/operations.xml");
            ods = OperationDefinitions.load(in);
        	} catch (Exception ex) {
        		throw new RuntimeException(ex);
        	}
        }
        return ods;
        
    }



}
