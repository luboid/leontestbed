package com.topfinance.cfg;

import java.util.List;

public interface ICfgRoute extends ICfgItem{
    
    
    public String getDirection();
    public void setDirection(String direction);
    
    public ICfgProtocolBinding getProtocolBinding();
    public void setProtocolBinding(ICfgProtocolBinding protocolBinding);
    
    public ICfgInPort getInPort();
    public void setInPort(ICfgInPort inPort);
    
//    public List<ICfgRouteRule> getListRouteRule();
//    public void setListRouteRule(List<ICfgRouteRule> listRouteRule);
}
