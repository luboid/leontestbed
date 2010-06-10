package com.topfinance.cfg.db;

import com.cnaps2.cncc.ebo.ConfRouteRuleEbo;
import com.topfinance.cfg.ICfgRouteRule;

public class DbCfgRouteRule implements ICfgRouteRule{
    ConfRouteRuleEbo ebo;
    public DbCfgRouteRule(ConfRouteRuleEbo ebo) {
        this.ebo = ebo;
    }
    
    public Integer getOutPortId () {
        return ebo.getOutportEbo().getUid();
    }
    
    public String getDirection() {
        return ebo.getDirection();
    }

    public String getOperationMask() {
        return ebo.getOpname();
    }

    public int getSequence() {
        return ebo.getOpseq();
    }

    public String getName() {
        return "";
    }
    
    public void setDirection(String direction) {
        // TODO Auto-generated method stub
        
    }

    public void setOperationMask(String operationMask) {
        // TODO Auto-generated method stub
        
    }

    public void setSequence(int sequence) {
        // TODO Auto-generated method stub
        
    }

    public void setName(String name) {
        // TODO Auto-generated method stub
        
    }

}
