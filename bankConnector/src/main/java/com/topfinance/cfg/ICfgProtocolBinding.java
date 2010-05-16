package com.topfinance.cfg;

import java.util.List;

public interface ICfgProtocolBinding extends ICfgItem{
    
    public ICfgPassway getPassway();
    public void setPassway(ICfgPassway passway);
    
//    public List<ICfgRouteRule> getListUpRouteRule();
//    public void setListUpRouteRule(List<ICfgRouteRule> upRoute);
//    
//    public List<ICfgRouteRule> getListDownRouteRule();
//    public void setListDownRouteRule(List<ICfgRouteRule> downRoute);
    
    public ICfgProtocol getProtocol();
    public void setProtocol(ICfgProtocol protocol);
}
