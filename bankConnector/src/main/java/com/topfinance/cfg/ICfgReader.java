package com.topfinance.cfg;

import java.io.InputStream;
import java.util.List;

public interface ICfgReader extends CfgConstants{
    
    // remove explicit relation
    public ICfgProtocol getProtByOpn(ICfgOperation opn);
    public ICfgProtocol getProtByInPort(ICfgInPort ip);
    public ICfgOutPort getAckPortByIP(ICfgInPort ip);
    public ICfgOutPort getOutPortByRR(ICfgRouteRule rr);
    public ICfgTransportInfo getTransInfoByPort(ICfgPort port);
    public ICfgNode getNodeByPort(ICfgPort port);
    
//    public List<ICfgNode> getListOfNodes();
    public List<ICfgInPort> getListOfEnabledInport();
    public ICfgInPort getInportByName(String name);
    public List<ICfgOutPort> getListOfEnabledOutport();
    public List<ICfgTransportInfo> getListOfTransportInfo();

    public ICfgOperation getOperation(ICfgProtocol protocol, String name);

    public List<ICfgRouteRule> getListUpRoute();
    public List<ICfgRouteRule> getListDownRoute();    
    
    public ICfgInPort getInPortByUri(String uri);
    
    
    public InputStream getMappingRule(String mesgType, String direction);
}



