package com.topfinance.cfg.dummy;

import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgNode;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgRouteRule;
import com.topfinance.cfg.ICfgTransportInfo;
import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.util.BCUtils;

import java.io.File;
import java.io.InputStream;
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
    
//    @ElementList
//    public List<ICfgPassway> listPassway = new ArrayList<ICfgPassway>();
//    @ElementList
//    public List<ICfgProtocolBinding> listProtocolBinding = new ArrayList<ICfgProtocolBinding>();
    
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
    
    public List<ICfgRouteRule> getListUpRoute() {
        List<ICfgRouteRule> result = new ArrayList<ICfgRouteRule>();
        for(ICfgRouteRule rr : listRouteRule) {
            if( 
                DIRECTION_UP.equals(rr.getDirection())) {
                result.add(rr);
            }
        }
        return result;
    }
    public List<ICfgRouteRule> getListDownRoute() {
        List<ICfgRouteRule> result = new ArrayList<ICfgRouteRule>();
        for(ICfgRouteRule rr : listRouteRule) {
            if( 
                DIRECTION_DOWN.equals(rr.getDirection())) {
                result.add(rr);
            }
        }
        return result;
    } 
    
    
    public ICfgInPort getInPortByUri(String uri) {
        ICfgInPort res = null;
        for(ICfgInPort ip : listInPort) {
            System.out.println("in getInPortByUri: "+BCUtils.getFullUrlFromPort(ip));
            if(uri.equals(BCUtils.getFullUrlFromPort(ip))) {
                res = ip;
                break;
            }
        }
        return res;
    }
    

    
    public InputStream getMappingRule(String mesgType, String direction) {
        String mapFileName = "";
        if (mesgType.equals(TestDummy.OPERATION_101)) {
        	if(DIRECTION_UP.equals(direction)) {
        		mapFileName = "/com/topfinance/plugin/cnaps2/v00800102-up.map";
        	}
        	else {
        		mapFileName = "/com/topfinance/plugin/cnaps2/v00800102-down.map";
        	}
        } else if(mesgType.equals(TestDummy.OPERATION_102)) {
        	if(DIRECTION_UP.equals(direction)) {
        		mapFileName = "/com/topfinance/plugin/cnaps2/v00200103-up.map";
        	}else {
        		mapFileName = "/com/topfinance/plugin/cnaps2/v00200103-down.map";
        	}
        } else if(mesgType.equals(TestDummy.OPERATION_601)) {
        	if(DIRECTION_UP.equals(direction)) {
        		mapFileName = "/com/topfinance/plugin/cnaps2/v05400102-up.map";
        	}else {
        		mapFileName = "/com/topfinance/plugin/cnaps2/v05400102-down.map";
        	}
        }        
        InputStream mapFile = Iso8583ToXml.class.getResourceAsStream(mapFileName);
        System.out.println("mapFile=" + mapFile);
        return mapFile;
    }    
    
}