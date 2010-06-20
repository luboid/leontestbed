package com.topfinance.cfg.xml;

import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgNode;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgPort;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgRouteRule;
import com.topfinance.cfg.ICfgTransportInfo;
import com.topfinance.util.BCUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import junit.framework.TestCase;
import org.apache.log4j.Logger;
import org.simpleframework.xml.ElementList;
import org.simpleframework.xml.Root;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;
import org.simpleframework.xml.strategy.CycleStrategy;
import org.simpleframework.xml.strategy.Strategy;

@Root
public class XmlCfgReader extends TestCase implements ICfgReader {
    private static Logger logger = Logger.getLogger(XmlCfgReader.class);
    
    
    public final static String FILESTORE = "D:/bankConnector/dummyConfig.xml";
    public final static String SAMPLEDOC = "D:/bankConnector/dummyDoc.xml";
    public final static String SAMPLEACK = "D:/bankConnector/dummyAck.xml";
    
    DataHolder dataHolder;
    
    private static XmlCfgReader instance;
    
    // not strict singleton, allow new instance for Broker
    public XmlCfgReader(String config) {
        init(config);
    }
    
    public static XmlCfgReader getInstance(String config) {
        if(instance==null) {
            instance = new XmlCfgReader(config);
        }
        return instance;
    }    

    public void init(String fileName) {
        try {
            logger.info("Deserialize configuration from " + fileName + "...");
            Strategy strategy = new CycleStrategy("id", "ref");
            Serializer serializer = new Persister(strategy);
            File result = new File(fileName);
            dataHolder = serializer.read(DataHolder.class, result);
            logger.info("Done");
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    } 
    
    public static class DataHolder {    
        @ElementList
        public List<ICfgTransportInfo> listTransportInfo = new ArrayList<ICfgTransportInfo>();
    
        @ElementList
        public List<ICfgProtocol> listProtocol = new ArrayList<ICfgProtocol>();
    
        @ElementList
        public List<ICfgOperation> listOperation = new ArrayList<ICfgOperation>();
    
        @ElementList
        public List<ICfgInPort> listInPort = new ArrayList<ICfgInPort>();
    
        @ElementList
        public List<ICfgOutPort> listOutPort = new ArrayList<ICfgOutPort>();
    
        @ElementList
        public List<ICfgNode> listNode = new ArrayList<ICfgNode>();
        
        @ElementList
        public List<ICfgRouteRule> listRouteRule = new ArrayList<ICfgRouteRule>();
        
    }
    

    
    

    public List<ICfgInPort> getListOfEnabledInport() {
        return getDataHolder().listInPort;
    }
    public List<ICfgOutPort> getListOfEnabledOutport() {
        return getDataHolder().listOutPort;
    }
    public List<ICfgTransportInfo> getListOfTransportInfo() {
        return getDataHolder().listTransportInfo;
    }
    
//    public List<ICfgNode> getListOfNodes() {
//        return listNode;
//    }
    
    

    public ICfgProtocol getProtByOpn(ICfgOperation opn) {
        return ((OmCfgOperation)opn).getProtocol();
    }
    public ICfgOutPort getAckPortByIP(ICfgInPort ip) {
        
        return ((OmCfgInPort)ip).getAckPort();
    }
    public ICfgNode getNodeByPort(ICfgPort port) {
        
        return ((OmCfgPort)port).getNode();
    }
    public ICfgOutPort getOutPortByRR(ICfgRouteRule rr) {
        return ((OmCfgRouteRule)rr).getOutPort();
    }
    public ICfgProtocol getProtByInPort(ICfgInPort ip) {

        return ((OmCfgInPort)ip).getProtocol();
    }
    public ICfgTransportInfo getTransInfoByPort(ICfgPort port) {
        return ((OmCfgPort)port).getTransportInfo();
    }    
    
    
    
    
    
    
    
    public ICfgInPort getInportByName(String name) {
        ICfgInPort res = null;
        for(ICfgInPort inp : getDataHolder().listInPort) {
            if(inp.getName().equals(name)) {
                res = inp;
            }
        }
        return res;
        
    }
    public ICfgOperation getOperation(ICfgProtocol protocol, String name) {
        ICfgOperation result = null;
        for(ICfgOperation op : getDataHolder().listOperation) {
            if(getProtByOpn(op).getName().equals(protocol.getName()) && op.getName().equals(name)) {
                result = op;
                break;
            }
        }
        return result;
    }
    
    public List<ICfgRouteRule> getListUpRoute() {
        List<ICfgRouteRule> result = new ArrayList<ICfgRouteRule>();
        for(ICfgRouteRule rr : getDataHolder().listRouteRule) {
            if( 
                DIRECTION_UP.equals(rr.getDirection())) {
                result.add(rr);
            }
        }
        return result;
    }
    public List<ICfgRouteRule> getListDownRoute() {
        List<ICfgRouteRule> result = new ArrayList<ICfgRouteRule>();
        for(ICfgRouteRule rr : getDataHolder().listRouteRule) {
            if( 
                DIRECTION_DOWN.equals(rr.getDirection())) {
                result.add(rr);
            }
        }
        return result;
    } 
    
    
    public ICfgInPort getInPortByUri(String uri) {
        ICfgInPort res = null;
        for(ICfgInPort ip : getDataHolder().listInPort) {
            logger.debug("in getInPortByUri: "+BCUtils.getFullUrlFromPort(ip));
            if(uri.equals(BCUtils.getFullUrlFromPort(ip))) {
                res = ip;
                break;
            }
        }
        return res;
    }
    
    
    public InputStream getMappingRule(String mesgType, String direction) {
        return getMappingRuleFromFS(mesgType, direction);
    }
    
    
    public static InputStream getMappingRuleFromFS(String mesgType, String direction) {
        String surfix = "";
        if(DIRECTION_UP.equals(direction)) {
            surfix="-up";
        }else {
            surfix="-down";
        }
        String mapFileName = BCUtils.getHomeDir()+"/sample/map/"+mesgType+surfix+".map";
        BCUtils.testFileExist(mapFileName, false);
        try {
            InputStream mapFile = new FileInputStream(mapFileName);
            return mapFile;
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
    
    
    public DataHolder getDataHolder() {
        if(dataHolder==null) {
            throw new RuntimeException("XmlCfgReader not initialized...");
        }
        return dataHolder;
    }
    public void setDataHolder(DataHolder dataHolder) {
        this.dataHolder = dataHolder;
    }

    
}
