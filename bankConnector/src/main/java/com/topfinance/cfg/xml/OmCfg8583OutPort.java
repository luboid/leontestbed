package com.topfinance.cfg.xml;

import org.simpleframework.xml.Attribute;
import com.topfinance.cfg.ICfg8583OutPort;

public class OmCfg8583OutPort extends OmCfgOutPort implements ICfg8583OutPort{
    @Attribute(required=true)
    private String isSync;

    public String getIsSync() {
        return isSync;
    }

    public void setIsSync(String isSync) {
        this.isSync = isSync;
    }
}
