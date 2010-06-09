package com.topfinance.cfg.db;

import com.topfinance.cfg.ICfgPort;

public abstract class DbCfgPort implements ICfgPort {
    
    public abstract String getDirection();

    public abstract String getUrl();
    
    public abstract String getName();
    
    public abstract Integer getTransportId();
    
    public abstract Integer getNodeId();
    
    
}
