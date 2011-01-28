package com.topfinance.cfg;

public interface ICfgRouteRule extends ICfgItem{
    
    public String getDirection();
    public void setDirection(String direction);
    
    public int getSequence();
    public void setSequence(int sequence);
    
//    public ICfgPortOut getOutPort();
//    public void setOutPort(ICfgPortOut outPort);
//    
//    public ICfgPortIn getInPort();
//    public void setInPort(ICfgPortIn inPort);
    
    public String getOperationMask();
    public void setOperationMask(String operationMask);
    

}
