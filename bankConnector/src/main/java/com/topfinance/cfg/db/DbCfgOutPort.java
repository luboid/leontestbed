package com.topfinance.cfg.db;

import com.cnaps2.cncc.ebo.ConfOutPortEbo;
import com.topfinance.cfg.ICfgOutPort;

public class DbCfgOutPort extends DbCfgPort implements ICfgOutPort{
    ConfOutPortEbo ebo;
    
    public DbCfgOutPort(ConfOutPortEbo ebo) {
        this.ebo = ebo;
    }
    
    public Integer getTransportId() {
        return ebo.getTransEbo().getUid();
    }
    public Integer getNodeId() {
        return ebo.getNodeEbo().getUid();
    }
    
    public String getDirection() {
        return ebo.getDirection();
    }

    public String getUrl() {
        return ebo.getDirection();
    }
    
    public String getName() {
        return ebo.getName();
    }

    
    
    public void setDirection(String direction) {
        // TODO Auto-generated method stub
        
    }

    public void setUrl(String url) {
        // TODO Auto-generated method stub
        
    }


    public void setName(String name) {
        // TODO Auto-generated method stub
        
    }

}
