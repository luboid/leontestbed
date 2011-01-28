package com.topfinance.cfg;

public interface ICfgPortIn  extends ICfgItem{
    
//    public String getUpInMHClazz();
    
//    public String getSyncReplyDownOutMHClazz();
    
//    public ICfgProtocol getProtocol();
//    public void setProtocol(ICfgProtocol protocol);
    
//    public ICfgPortOut getAckPort();
//    public void setAckPort(ICfgPortOut outPort);
	
	
	
    public String getDirection();
    public void setDirection(String direction);
    
//    public ICfgTransportInfo getTransportInfo();
//    public void setTransportInfo(ICfgTransportInfo transportInfo);
    
    public String getUrl();
    public void setUrl(String url);
    
//    public ICfgNode getNode();
//    public void setNode(ICfgNode node);
	
}
