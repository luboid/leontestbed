package com.topfinance.cfg.dummy;

import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgNode;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgPassway;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.cfg.ICfgProtocolBinding;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgRouteRule;
import com.topfinance.cfg.ICfgTransportInfo;
import com.topfinance.cfg.om.OmCfgAMQInPort;
import com.topfinance.cfg.om.OmCfgAMQInfo;
import com.topfinance.cfg.om.OmCfgAMQOutPort;
import com.topfinance.cfg.om.OmCfgJettyInfo;
import com.topfinance.cfg.om.OmCfgNode;
import com.topfinance.cfg.om.OmCfgOperation;
import com.topfinance.cfg.om.OmCfgPassway;
import com.topfinance.cfg.om.OmCfgProtocol;
import com.topfinance.cfg.om.OmCfgProtocolBinding;
import com.topfinance.cfg.om.OmCfgRouteRule;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import junit.framework.TestCase;
import org.simpleframework.xml.ElementList;
import org.simpleframework.xml.Root;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;
import org.simpleframework.xml.strategy.CycleStrategy;
import org.simpleframework.xml.strategy.Strategy;

@Root
public class DummyCfgReader extends TestCase implements ICfgReader {
    
    public final static String FILESTORE = "D:/bankConnector/dummyConfig.xml";
    public final static String SAMPLEDOC = "D:/bankConnector/dummyDoc.xml";
    public final static String SAMPLEACK = "D:/bankConnector/dummyAck.xml";
    

    
    
    private static DummyCfgReader instance;
    public DummyCfgReader() {
        
    }
    public static DummyCfgReader getInstance() {
        if(instance==null) {
            throw new RuntimeException("DummyCfgReader not initialized...");
        }
        return instance;
    }    
    public static void init() {
        init(FILESTORE);
    }
    public static void init(String fileName) {
        try {
            System.out.println("Deserialize configuration from " + fileName + "...");
            Strategy strategy = new CycleStrategy("id", "ref");
            Serializer serializer = new Persister(strategy);
            File result = new File(fileName);
            instance = serializer.read(DummyCfgReader.class, result);
            System.out.println("Done");
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    } 
    
    
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
    public List<ICfgPassway> listPassway = new ArrayList<ICfgPassway>();
    @ElementList
    public List<ICfgProtocolBinding> listProtocolBinding = new ArrayList<ICfgProtocolBinding>();
    @ElementList
    public List<ICfgRouteRule> listRouteRule = new ArrayList<ICfgRouteRule>();
    

    


    public List<ICfgInPort> getListOfEnabledInport() {

        return listInPort;
    }
    
    public ICfgInPort getInportByName(String name) {
        ICfgInPort res = null;
        for(ICfgInPort inp : listInPort) {
            if(inp.getName().equals(name)) {
                res = inp;
            }
        }
        return res;
        
    }
    
    public List<ICfgOutPort> getListOfEnabledOutport() {
        return listOutPort;
    }
    
    public List<ICfgTransportInfo> getListOfTransportInfo() {
        return listTransportInfo;
    }
    public List<ICfgNode> getListOfNodes() {
        return listNode;
    }

    
    public ICfgNode getNodeByIdentity(String identity) {
        ICfgNode result = null;
        for(ICfgNode node:listNode) {
            if(node.getIdentity().equals(identity)) {
                result = node;
                break;
            }
        }
        return result;
    }

    public ICfgPassway getPassway(ICfgNode host, ICfgNode partner) {
        ICfgPassway result = null;
        for(ICfgPassway passway : listPassway) {
            if(passway.getHostNode().getIdentity().equals(host.getIdentity()) && 
                passway.getPartnerNode().getIdentity().equals(partner.getIdentity())) {
                result = passway;
                break;
            }
        }
        return result;
    }
    
    public ICfgProtocolBinding getProtocolBindingByProtocol(ICfgPassway passway, ICfgProtocol protocol) {
        ICfgProtocolBinding result = null;
        for(ICfgProtocolBinding pb : listProtocolBinding) {
            if(pb.getPassway().getName().equals(passway.getName()) &&
                pb.getProtocol().getName().equals(protocol.getName()) ) {
                result = pb;
                break;
            }
        }
        
        return result;
    }
    
    public ICfgOperation getOperation(ICfgProtocol protocol, String name) {
        ICfgOperation result = null;
        for(ICfgOperation op : listOperation) {
            if(op.getProtocol().getName().equals(protocol.getName()) && op.getName().equals(name)) {
                result = op;
                break;
            }
        }
        return result;
    }
    
    public List<ICfgRouteRule> getListUpRoute(ICfgProtocolBinding cfgPB) {
        List<ICfgRouteRule> result = new ArrayList<ICfgRouteRule>();
        for(ICfgRouteRule rr : listRouteRule) {
            if(rr.getProtocolBinding().getName().equals(cfgPB.getName()) && 
                DIRECTION_UP.equals(rr.getDirection())) {
                result.add(rr);
            }
        }
        return result;
    }
    public List<ICfgRouteRule> getListDownRoute(ICfgProtocolBinding cfgPB) {
        List<ICfgRouteRule> result = new ArrayList<ICfgRouteRule>();
        for(ICfgRouteRule rr : listRouteRule) {
            if(rr.getProtocolBinding().getName().equals(cfgPB.getName()) && 
                DIRECTION_DOWN.equals(rr.getDirection())) {
                result.add(rr);
            }
        }
        return result;
    }    
}
