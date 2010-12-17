package com.topfinance.cfg.xml;

import com.topfinance.cfg.CfgAccessException;
import com.topfinance.cfg.ICfgDownOutMH;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgNode;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgPort;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgRouteRule;
import com.topfinance.cfg.ICfgTransportInfo;
import com.topfinance.cfg.ICfgUpInMH;
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
    
    public DataHolder dataHolder;
    
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
        public List<OmCfgUpInMH> listUpInMH = new ArrayList<OmCfgUpInMH>();
        @ElementList
        public List<OmCfgDownOutMH> listDownOutMH = new ArrayList<OmCfgDownOutMH>();
        
        @ElementList
        public List<OmCfgTransportInfo> listTransportInfo = new ArrayList<OmCfgTransportInfo>();
    
        @ElementList
        public List<OmCfgProtocol> listProtocol = new ArrayList<OmCfgProtocol>();
        
        @ElementList
        public List<OmCfgOperation> listOperation = new ArrayList<OmCfgOperation>();
    
        @ElementList
        public List<OmCfgInPort> listInPort = new ArrayList<OmCfgInPort>();
    
        @ElementList
        public List<OmCfgOutPort> listOutPort = new ArrayList<OmCfgOutPort>();
    
        @ElementList
        public List<OmCfgNode> listNode = new ArrayList<OmCfgNode>();
        
        @ElementList
        public List<OmCfgRouteRule> listRouteRule = new ArrayList<OmCfgRouteRule>();
        
    }
    

    
    public List<ICfgUpInMH> getListOfUpInMH() {
        List<ICfgUpInMH> res = new ArrayList<ICfgUpInMH>();
        res.addAll(getDataHolder().listUpInMH);
        return res;
    }
    public List<ICfgProtocol> getListProtocol() {
        List<ICfgProtocol> res = new ArrayList<ICfgProtocol>();
        res.addAll(getDataHolder().listProtocol);
        return res;
    }
    public List<ICfgDownOutMH> getListOfDownOutMH() {
        List<ICfgDownOutMH> res = new ArrayList<ICfgDownOutMH>();
        res.addAll(getDataHolder().listDownOutMH);
        return res;
    }
    
    public List<ICfgInPort> getListOfEnabledInport() {
        List<ICfgInPort> res = new ArrayList<ICfgInPort>();
        res.addAll(getDataHolder().listInPort);
        return res;
    }
    public List<ICfgOutPort> getListOfEnabledOutport() {
        List<ICfgOutPort> res = new ArrayList<ICfgOutPort>();
        res.addAll(getDataHolder().listOutPort);
        return res;
    }
    public List<ICfgTransportInfo> getListOfTransportInfo() {
        List<ICfgTransportInfo> res = new ArrayList<ICfgTransportInfo>();
        res.addAll(getDataHolder().listTransportInfo);
        return res;
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
            // todo this is tricky
            logger.debug("in getInPortByUri: "+BCUtils.getFullUrlFromPortForConsumer(ip));

            if(uri.equals(BCUtils.getFullUrlFromPortForConsumer(ip))) {
                res = ip;
                break;
            }
        }
        return res;
    }
    
    public ICfgProtocol getProtocolByName(String name) throws CfgAccessException {
        ICfgProtocol res = null; 
        for(ICfgProtocol prot : getDataHolder().listProtocol) {
            if(prot.getName().equals(name)) {
                res = prot;
            }
        }
        return res;
    }
    
    public InputStream getMappingRule(ICfgOperation cfgOpn, String direction) {
        String fileName = "";
        if(DIRECTION_UP.equals(direction)) {
            fileName=cfgOpn.getUpMappingFile();
        }else {
            fileName=cfgOpn.getDownMappingFile();
        }
        
        return BCUtils.getMappingRuleFromFS(fileName);
    }
    
    

    
//    private static InputStream getMappingRuleFromFS(String mesgType, String direction) {
//        
//        String surfix = "";
//        if(DIRECTION_UP.equals(direction)) {
//            surfix="-up";
//        }else {
//            surfix="-down";
//        }
//        String mapFileName = BCUtils.getHomeDir()+"/sample/map/"+mesgType+surfix+".map";
//        BCUtils.testFileExist(mapFileName, false);
//        try {
//            InputStream mapFile = new FileInputStream(mapFileName);
//            return mapFile;
//        } catch (Exception ex) {
//            throw new RuntimeException(ex);
//        }
//    }
    
    public DataHolder getDataHolder() {
        if(dataHolder==null) {
            throw new RuntimeException("XmlCfgReader not initialized...");
        }
        return dataHolder;
    }
    public void setDataHolder(DataHolder dataHolder) {
        this.dataHolder = dataHolder;
    }

    public ICfgDownOutMH getDownOutMHByPort(ICfgOutPort port) {
        return ((OmCfgOutPort)port).getDownOutMH();
    }

    public ICfgDownOutMH getSyncReplyDownOutMHByPort(ICfgInPort port) {
        return ((OmCfgInPort)port).getSyncReplyDownOutMH();
    }

    public ICfgUpInMH getUpInMHByPort(ICfgInPort port) {
        return ((OmCfgInPort)port).getUpInMH();
    }

    
}
