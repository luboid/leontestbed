package com.topfinance.cfg.db;

import com.cnaps2.cncc.ebo.ConfNodeEbo;
import com.topfinance.cfg.ICfgNode;

public class DbCfgNode implements ICfgNode {
    ConfNodeEbo ebo;
    public DbCfgNode(ConfNodeEbo ebo) {
        this.ebo = ebo;
    }
    
    public String getType() {
        return ebo.getType();
    }
    public String getName() {
        return ebo.getName();
    }

    
    public void setType(String type) {
        // TODO Auto-generated method stub

    }


    public void setName(String name) {
        // TODO Auto-generated method stub

    }

}
