package com.topfinance.cfg.db;

import com.cnaps2.cncc.ebo.ConfInPortEbo;
import com.topfinance.cfg.ICfgInPort;

public class DbCfgInPort extends DbCfgPort implements ICfgInPort {
    ConfInPortEbo ebo;
    
    
    public DbCfgInPort(ConfInPortEbo ebo) {
        this.ebo=ebo;
    }
    
    public Integer getProtocolId() {
        // todo potential session terminated problem
        return ebo.getPrtclEbo().getUid();
    }
    public Integer getTransportId() {
        return ebo.getTransEbo().getUid();
    }
    public Integer getNodeId() {
        return ebo.getNodeEbo().getUid();
    }
    public Integer getAckPortId() {
//        return ebo.get
        throw new RuntimeException("need add ackport!!!!!!");
    }
    
    public String getDirection() {
        return ebo.getDirection();
    }

    public String getUrl() {
        return ebo.getURL();
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
