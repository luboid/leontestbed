package com.topfinance.cfg;

import java.io.InputStream;
import java.util.List;

public interface ICfgReader extends CfgConstants{
    

//    public ICfgTransportInfo getTransportInfoByName(String name);
    public List<ICfgNode> getListOfNodes();
    public List<ICfgInPort> getListOfEnabledInport();
    public ICfgInPort getInportByName(String name);
    public List<ICfgOutPort> getListOfEnabledOutport();
    public List<ICfgTransportInfo> getListOfTransportInfo();
    
//    public ICfgNode getNodeByIdentity(String identity);
    
//    public ICfgPassway getPassway(ICfgNode host, ICfgNode partner);
    
//    public ICfgProtocolBinding getProtocolBindingByProtocol(ICfgPassway passway, ICfgProtocol protocol);
    
    public ICfgOperation getOperation(ICfgProtocol protocol, String name);
    
//    public List<ICfgRouteRule> getListUpRoute(ICfgProtocolBinding cfgPB);
//    public List<ICfgRouteRule> getListDownRoute(ICfgProtocolBinding cfgPB);
    
    public List<ICfgRouteRule> getListUpRoute();
    public List<ICfgRouteRule> getListDownRoute();    
    
    public ICfgInPort getInPortByUri(String uri);
    
    
    public InputStream getMappingRule(String mesgType, String direction);
}



