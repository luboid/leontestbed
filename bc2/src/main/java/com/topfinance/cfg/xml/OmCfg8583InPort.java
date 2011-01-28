package com.topfinance.cfg.xml;

import org.simpleframework.xml.Attribute;
import com.topfinance.cfg.ICfg8583InPort;

public class OmCfg8583InPort extends OmCfgInPort implements ICfg8583InPort{
    
    @Attribute(required=true)
    private String isSync;

    public String getIsSync() {
        return isSync;
    }

    public void setIsSync(String isSync) {
        this.isSync = isSync;
    }
    
    
    
}
