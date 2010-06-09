package com.topfinance.cfg.db;

import com.cnaps2.cncc.ebo.ConfTransportEbo;
import com.topfinance.cfg.ICfgTransportInfo;

public class DbCfgTransportInfo implements ICfgTransportInfo{
    private ConfTransportEbo ebo;
    public DbCfgTransportInfo(ConfTransportEbo ebo) {
        this.ebo = ebo;
    }
    
    
    public String getPrefix() {
        return ebo.getPrefix();
    }
    
    public String getProvider() {
        return ebo.getProvider();
    }


    public String getName() {
        return ebo.getName();
    }




    public ConfTransportEbo getEbo() {
        return ebo;
    }


    public void setEbo(ConfTransportEbo ebo) {
        this.ebo = ebo;
    }


    public void setName(String name) {
        // TODO Auto-generated method stub
        
    }


    public void setPrefix(String prefix) {
        // TODO Auto-generated method stub
        
    }


    public void setProvider(String provider) {
        // TODO Auto-generated method stub
        
    }
    
    
}
