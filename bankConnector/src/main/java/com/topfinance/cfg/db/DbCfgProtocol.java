package com.topfinance.cfg.db;

import com.cnaps2.cncc.ebo.ConfProtocolEbo;
import com.topfinance.cfg.ICfgProtocol;

public class DbCfgProtocol implements ICfgProtocol {
    
    ConfProtocolEbo ebo;
    public DbCfgProtocol(ConfProtocolEbo ebo) {
        this.ebo = ebo;
    }
    
    public Integer getUid() {
        return ebo.getUid();
    }
    
    
    public String getDownRecievePPAck() {
        // TODO Auto-generated method stub
        return null;
    }

    public String getPluginName() {
        return ebo.getPluginName();
    }
    public String getName() {
        
        return ebo.getName();
    }
    
    

    public String getUpSendAckToPP() {
        // TODO Auto-generated method stub
        return null;
    }

    public void setDownRecievePPAck(String downRecievePPAck) {
        // TODO Auto-generated method stub

    }

    public void setPluginName(String pluginName) {
        // TODO Auto-generated method stub

    }

    public void setUpSendAckToPP(String upSendAckToPP) {
        // TODO Auto-generated method stub

    }


    public void setName(String name) {
        // TODO Auto-generated method stub

    }

}
