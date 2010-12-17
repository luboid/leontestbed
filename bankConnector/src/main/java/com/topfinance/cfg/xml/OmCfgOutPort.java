package com.topfinance.cfg.xml;

import com.topfinance.cfg.ICfgDownOutMH;
import com.topfinance.cfg.ICfgOutPort;
import org.simpleframework.xml.Element;

public class OmCfgOutPort extends OmCfgPort implements ICfgOutPort{

    @Element(required=false)
    private ICfgDownOutMH downOutMH;

    public ICfgDownOutMH getDownOutMH() {
        return downOutMH;
    }

    public void setDownOutMH(ICfgDownOutMH downOutMH) {
        this.downOutMH = downOutMH;
    }



    
    
}
