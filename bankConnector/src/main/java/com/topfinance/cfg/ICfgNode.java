package com.topfinance.cfg;

public interface ICfgNode extends ICfgItem {
    
    public ICfgNode getParent();
    public void setParent(ICfgNode parent);
    
    public String getType();
    public void setType(String type);
    
    public String getIdentity();
    public void setIdentity(String identity);
    
    
}
