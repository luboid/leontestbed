package com.topfinance.cfg;

import java.io.InputStream;
import java.util.List;

public interface ICfgReader extends CfgConstants{
    
    public void init(String config);
    
    // remove explicit relation
    public ICfgProtocol getProtByOpn(ICfgOperation opn) throws CfgAccessException;
    public ICfgProtocol getProtByInPort(ICfgInPort ip) throws CfgAccessException;
    public ICfgOutPort getAckPortByIP(ICfgInPort ip) throws CfgAccessException;
    public ICfgOutPort getOutPortByRR(ICfgRouteRule rr) throws CfgAccessException;
    public ICfgTransportInfo getTransInfoByPort(ICfgPort port) throws CfgAccessException;
    public ICfgNode getNodeByPort(ICfgPort port) throws CfgAccessException;
    
    public ICfgDownOutMH getSyncReplyDownOutMHByPort(ICfgInPort port) throws CfgAccessException;
    public ICfgUpInMH getUpInMHByPort(ICfgInPort port)  throws CfgAccessException;
    public ICfgDownOutMH getDownOutMHByPort(ICfgOutPort port) throws CfgAccessException;
    
    public List<ICfgInPort> getListOfEnabledInport() throws CfgAccessException;
    public ICfgInPort getInportByName(String name) throws CfgAccessException;
    public List<ICfgOutPort> getListOfEnabledOutport() throws CfgAccessException;
    public List<ICfgTransportInfo> getListOfTransportInfo() throws CfgAccessException;

    public ICfgOperation getOperation(ICfgProtocol protocol, String name) throws CfgAccessException;
    public List<ICfgProtocol> getListProtocol() throws CfgAccessException;
    
    public List<ICfgRouteRule> getListUpRoute() throws CfgAccessException;
    public List<ICfgRouteRule> getListDownRoute() throws CfgAccessException;    
    
    public ICfgInPort getInPortByUri(String uri) throws CfgAccessException;
    
    public List<ICfgUpInMH> getListOfUpInMH() throws CfgAccessException;
    public List<ICfgDownOutMH> getListOfDownOutMH() throws CfgAccessException;
    
//    public InputStream getMappingRule(String mesgType, String direction);
    public InputStream getMappingRule(ICfgOperation cfgOpn, String direction) throws CfgAccessException;
    public ICfgProtocol getProtocolByName(String name) throws CfgAccessException;
    

    
    
}



