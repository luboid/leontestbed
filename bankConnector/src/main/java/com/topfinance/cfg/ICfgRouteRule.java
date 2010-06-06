package com.topfinance.cfg;

public interface ICfgRouteRule extends ICfgItem{
    
    public String getDirection();
    public void setDirection(String direction);
    
    public int getSequence();
    public void setSequence(int sequence);
    
    public ICfgOutPort getOutPort();
    public void setOutPort(ICfgOutPort outPort);
    
    public ICfgInPort getInPort();
    public void setInPort(ICfgInPort inPort);
    
    public String getOperationMask();
    public void setOperationMask(String operationMask);
    

}
