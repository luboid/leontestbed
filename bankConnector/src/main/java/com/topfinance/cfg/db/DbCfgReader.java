package com.topfinance.cfg.db;

import java.io.InputStream;
import java.util.List;

import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgNode;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgPort;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgRouteRule;
import com.topfinance.cfg.ICfgTransportInfo;

public class DbCfgReader implements ICfgReader {
    
    public DbCfgReader(String config) {
//        init(config);
    }
    
    private static DbCfgReader instance;
    public static DbCfgReader getInstance(String config) {
        if(instance == null) {
            instance = new DbCfgReader(config);
        }
        return instance;
    }
    
    public ICfgOutPort getAckPortByIP(ICfgInPort ip) {
        // TODO Auto-generated method stub
        return null;
    }

    public ICfgInPort getInPortByUri(String uri) {
        // TODO Auto-generated method stub
        return null;
    }

    public ICfgInPort getInportByName(String name) {
        // TODO Auto-generated method stub
        return null;
    }

    public List<ICfgRouteRule> getListDownRoute() {
        // TODO Auto-generated method stub
        return null;
    }

    public List<ICfgInPort> getListOfEnabledInport() {
        // TODO Auto-generated method stub
        return null;
    }

    public List<ICfgOutPort> getListOfEnabledOutport() {
        // TODO Auto-generated method stub
        return null;
    }

    public List<ICfgTransportInfo> getListOfTransportInfo() {
        // TODO Auto-generated method stub
        return null;
    }

    public List<ICfgRouteRule> getListUpRoute() {
        // TODO Auto-generated method stub
        return null;
    }

    public InputStream getMappingRule(String mesgType, String direction) {
        // TODO Auto-generated method stub
        return null;
    }

    public ICfgNode getNodeByPort(ICfgPort port) {
        // TODO Auto-generated method stub
        return null;
    }

    public ICfgOperation getOperation(ICfgProtocol protocol, String name) {
        // TODO Auto-generated method stub
        return null;
    }

    public ICfgOutPort getOutPortByRR(ICfgRouteRule rr) {
        // TODO Auto-generated method stub
        return null;
    }

    public ICfgProtocol getProtByInPort(ICfgInPort ip) {
        // TODO Auto-generated method stub
        return null;
    }

    public ICfgProtocol getProtByOpn(ICfgOperation opn) {
        // TODO Auto-generated method stub
        return null;
    }

    public ICfgTransportInfo getTransInfoByPort(ICfgPort port) {
        // TODO Auto-generated method stub
        return null;
    }

    public void init(String config) {
        // TODO Auto-generated method stub

    }

}
