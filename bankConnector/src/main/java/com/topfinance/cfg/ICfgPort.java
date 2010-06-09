package com.topfinance.cfg;

public interface ICfgPort extends ICfgItem{
    public String getDirection();
    public void setDirection(String direction);
    
//    public ICfgTransportInfo getTransportInfo();
//    public void setTransportInfo(ICfgTransportInfo transportInfo);
    
    public String getUrl();
    public void setUrl(String url);
    
//    public ICfgNode getNode();
//    public void setNode(ICfgNode node);
}
