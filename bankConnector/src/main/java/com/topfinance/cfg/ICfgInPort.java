package com.topfinance.cfg;

public interface ICfgInPort extends ICfgPort {
    
    public ICfgProtocol getProtocol();
    public void setProtocol(ICfgProtocol protocol);
    
    public ICfgOutPort getAckPort();
    public void setAckPort(ICfgOutPort outPort);
}
