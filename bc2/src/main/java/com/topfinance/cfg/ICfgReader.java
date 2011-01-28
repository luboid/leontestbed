package com.topfinance.cfg;

import java.util.List;

import com.topfinance.runtime.OpInfo;
import com.topfinance.transform.simple.SimpleMappingRule;

public interface ICfgReader extends CfgConstants{
    
    public void init(String config);
    
    // remove explicit relation
    public ICfgProtocol getProtByOpn(ICfgOperation opn) throws CfgAccessException;
    public ICfgProtocol getProtByInPort(ICfgPortIn ip) throws CfgAccessException;
    public ICfgPortOut getAckPortByIP(ICfgPortIn ip) throws CfgAccessException;
    public ICfgPortOut getOutPortByRR(ICfgRouteRule rr) throws CfgAccessException;
    
    public ICfgFormat getFormatByPortIn(ICfgPortIn port) throws CfgAccessException;
    public ICfgTransIn getTransByPortIn(ICfgPortIn port) throws CfgAccessException;
    public ICfgNode getNodeByPortIn(ICfgPortIn port) throws CfgAccessException;
    
    public ICfgFormat getFormatByPortOut(ICfgPortOut port) throws CfgAccessException;
    public ICfgTransOut getTransByPortOut(ICfgPortOut port) throws CfgAccessException;
    public ICfgNode getNodeByPortOut(ICfgPortOut port) throws CfgAccessException;
    
    public ICfgFormat getFormatByOpn(ICfgOperation opn) throws CfgAccessException;
	
//    public ICfgDownOutMH getSyncReplyDownOutMHByPort(ICfgPortIn port) throws CfgAccessException;
//    public ICfgUpInMH getUpInMHByPort(ICfgPortIn port)  throws CfgAccessException;
//    public ICfgDownOutMH getDownOutMHByPort(ICfgPortOut port) throws CfgAccessException;
//    public List<ICfgUpInMH> getListOfUpInMH() throws CfgAccessException;
//    public List<ICfgDownOutMH> getListOfDownOutMH() throws CfgAccessException;
 
    
    
    public List<ICfgPortIn> getListOfEnabledInport() throws CfgAccessException;
    public ICfgPortIn getInportByName(String name) throws CfgAccessException;
    public List<ICfgPortOut> getListOfEnabledOutport() throws CfgAccessException;
    public List<ICfgTransIn> getListOfTransIn() throws CfgAccessException;
    public List<ICfgTransOut> getListOfTransOut() throws CfgAccessException;

    public ICfgOperation getOperation(ICfgProtocol protocol, String name) throws CfgAccessException;
    public List<ICfgProtocol> getListProtocol() throws CfgAccessException;
    
    public List<ICfgRouteRule> getListUpRoute() throws CfgAccessException;
    public List<ICfgRouteRule> getListDownRoute() throws CfgAccessException;    
    
    public ICfgPortIn getInPortByUri(String uri) throws CfgAccessException;
    
   
//    public InputStream getMappingRule(String mesgType, String direction);
//    public InputStream getMappingRule(ICfgOperation cfgOpn, String direction) throws CfgAccessException;
    
    public SimpleMappingRule getMappingRule(OpInfo opInfo, ICfgOperation cfgOpn, String direction) throws CfgAccessException;
    
    public List<ICfgFormat8583> getFormat8583(ICfgFormat format) throws CfgAccessException;
    
    public ICfgProtocol getProtocolByName(String name) throws CfgAccessException;
    
    public List<ICfgFormat> getListFormat() throws CfgAccessException;
    
    
}



