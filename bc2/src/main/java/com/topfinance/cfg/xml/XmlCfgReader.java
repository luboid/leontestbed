package com.topfinance.cfg.xml;

import java.io.ByteArrayInputStream;
import java.io.File;
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


import com.topfinance.cfg.CfgAccessException;
import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.ICfgFormat;
import com.topfinance.cfg.ICfgFormat8583;
import com.topfinance.cfg.ICfgPortIn;
import com.topfinance.cfg.ICfgNode;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgPortOut;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgRouteRule;
import com.topfinance.cfg.ICfgTransIn;
import com.topfinance.cfg.ICfgTransOut;
import com.topfinance.cfg.util.CfgUtils;
import com.topfinance.runtime.OpInfo;
import com.topfinance.transform.simple.SimpleMappingRule;
import com.topfinance.transform.util.IsoSchema;
import com.topfinance.transform.util.IsoSchema.IsoField;
import com.topfinance.util.BCUtils;

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
            
            
            OmCfgFormat format = null;
            // dummy 8583
            for(OmCfgFormat f : dataHolder.listFormat) {
            	if(f.getFormat().equals(CfgConstants.FORMAT_8583)) {
            		format = f;
            		break;
            	}
            }
            
            IsoSchema schema = new IsoSchema();
            int i=0;
            for(IsoField f: schema.getFields() ) {
            	i++;
            	OmCfgFormat8583 f8583 = new OmCfgFormat8583();
            	f8583.setType(f.getType());
            	f8583.setLength(f.getLength());
            	f8583.setDesc(f.getDesc());
            	f8583.setFormat(format);
            	f8583.setPos(i);
            	dataHolder.listFormat8583.add(f8583);
            }
            
            logger.info("Done");
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    } 
    
    public static class DataHolder {
        
//        @ElementList
//        public List<OmCfgUpInMH> listUpInMH = new ArrayList<OmCfgUpInMH>();
//        @ElementList
//        public List<OmCfgDownOutMH> listDownOutMH = new ArrayList<OmCfgDownOutMH>();
//        
        @ElementList
        public List<OmCfgFormat> listFormat = new ArrayList<OmCfgFormat>();
        
        @ElementList
        public List<OmCfgTransIn> listTransIn = new ArrayList<OmCfgTransIn>();

        @ElementList
        public List<OmCfgTransOut> listTransOut = new ArrayList<OmCfgTransOut>();
        
        @ElementList
        public List<OmCfgProtocol> listProtocol = new ArrayList<OmCfgProtocol>();
        
        @ElementList
        public List<OmCfgOperation> listOperation = new ArrayList<OmCfgOperation>();
    
        @ElementList
        public List<OmCfgMappingRule> listMappingRule = new ArrayList<OmCfgMappingRule>();
        
        @ElementList
        public List<OmCfgPortIn> listInPort = new ArrayList<OmCfgPortIn>();
    
        @ElementList
        public List<OmCfgPortOut> listOutPort = new ArrayList<OmCfgPortOut>();
    
        @ElementList
        public List<OmCfgNode> listNode = new ArrayList<OmCfgNode>();
        
        @ElementList
        public List<OmCfgRouteRule> listRouteRule = new ArrayList<OmCfgRouteRule>();
        
        public List<OmCfgFormat8583> listFormat8583 = new ArrayList<OmCfgFormat8583>();
        
    }
    

    
//    public List<ICfgUpInMH> getListOfUpInMH() {
//        List<ICfgUpInMH> res = new ArrayList<ICfgUpInMH>();
//        res.addAll(getDataHolder().listUpInMH);
//        return res;
//    }
//    public List<ICfgDownOutMH> getListOfDownOutMH() {
//        List<ICfgDownOutMH> res = new ArrayList<ICfgDownOutMH>();
//        res.addAll(getDataHolder().listDownOutMH);
//        return res;
//    }
//    public ICfgDownOutMH getDownOutMHByPort(ICfgPortOut port) {
//        return ((OmCfgPortOut)port).getDownOutMH();
//    }
//
//    public ICfgDownOutMH getSyncReplyDownOutMHByPort(ICfgPortIn port) {
//        return ((OmCfgPortIn)port).getSyncReplyDownOutMH();
//    }
//
//    public ICfgUpInMH getUpInMHByPort(ICfgPortIn port) {
//        return ((OmCfgPortIn)port).getUpInMH();
//    }
    
    
    public List<ICfgProtocol> getListProtocol() {
        List<ICfgProtocol> res = new ArrayList<ICfgProtocol>();
        res.addAll(getDataHolder().listProtocol);
        return res;
    }

    
    public List<ICfgPortIn> getListOfEnabledInport() {
        List<ICfgPortIn> res = new ArrayList<ICfgPortIn>();
        res.addAll(getDataHolder().listInPort);
        return res;
    }
    public List<ICfgPortOut> getListOfEnabledOutport() {
        List<ICfgPortOut> res = new ArrayList<ICfgPortOut>();
        res.addAll(getDataHolder().listOutPort);
        return res;
    }
    public List<ICfgTransIn> getListOfTransIn() {
        List<ICfgTransIn> res = new ArrayList<ICfgTransIn>();
        res.addAll(getDataHolder().listTransIn);
        return res;
    }
    public List<ICfgTransOut> getListOfTransOut() {
        List<ICfgTransOut> res = new ArrayList<ICfgTransOut>();
        res.addAll(getDataHolder().listTransOut);
        return res;
    }
//    public List<ICfgNode> getListOfNodes() {
//        return listNode;
//    }
    
    

    public ICfgProtocol getProtByOpn(ICfgOperation opn) {
        return ((OmCfgOperation)opn).getProtocol();
    }
    public ICfgPortOut getAckPortByIP(ICfgPortIn ip) {
        
        return ((OmCfgPortIn)ip).getAckPort();
    }
    
    public ICfgNode getNodeByPortIn(ICfgPortIn port) {
        return ((OmCfgPortIn)port).getNode();
    }
    
    public ICfgNode getNodeByPortOut(ICfgPortOut port) {
        return ((OmCfgPortOut)port).getNode();
    }
    
    public ICfgPortOut getOutPortByRR(ICfgRouteRule rr) {
        return ((OmCfgRouteRule)rr).getOutPort();
    }
    public ICfgProtocol getProtByInPort(ICfgPortIn ip) {

        return ((OmCfgPortIn)ip).getProtocol();
    }
    public ICfgTransIn getTransByPortIn(ICfgPortIn port) {
        return ((OmCfgPortIn)port).getTransIn();
    }    
    public ICfgTransOut getTransByPortOut(ICfgPortOut port) {
        return ((OmCfgPortOut)port).getTransOut();
    }    
    
    
    
    
    
    
    public ICfgPortIn getInportByName(String name) {
        ICfgPortIn res = null;
        for(ICfgPortIn inp : getDataHolder().listInPort) {
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
    
    
    public ICfgPortIn getInPortByUri(String uri) {
        ICfgPortIn res = null;
        for(ICfgPortIn ip : getDataHolder().listInPort) {
            // todo this is tricky
        	String cfgUrl = BCUtils.getFullUrlFromPortIn(ip, this, false);
            logger.debug("in getInPortByUri: "+cfgUrl);

//            if(uri.equals(BCUtils.getFullUrlFromPortIn(ip, this, false))) {
            if(CfgUtils.matchUrl(uri, cfgUrl)) {
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
    
    public SimpleMappingRule getMappingRule(OpInfo opInfo, ICfgOperation cfgOpn, String direction) {
    	byte[] res = null;
//    	for(OmCfgMappingRule rule : getDataHolder().listMappingRule) {
//    		if(rule.getMesgType().equals(opInfo.getMesgType()) && 
//    				rule.getOpType().equals(opInfo.getOpType()) &&
//    				rule.getOpClass().equals(opInfo.getOpClass()) &&
//    				rule.getDirection().equals(direction)) {
//    			res = rule.getMapping();
//    		}
//
//    	}
    	res = OmCfgMappingRule.getMapping(opInfo.getMesgType(), opInfo.getOpType(), opInfo.getOpClass(), direction);
    	return SimpleMappingRule.fromXml(new ByteArrayInputStream(res));
    }
    public List<ICfgFormat8583> getFormat8583(ICfgFormat format) throws CfgAccessException {
    	List<ICfgFormat8583> res = new ArrayList<ICfgFormat8583>();
    	for(OmCfgFormat8583 f8583 : getDataHolder().listFormat8583) {
    		if(f8583.getFormat().getFormat().equals(format.getFormat())) {
    			res.add(f8583);
    		}
    	}
    	return res;
    }
    
    
//  public InputStream getMappingRule(ICfgOperation cfgOpn, String direction) {
//  String fileName = "";
//  if(DIRECTION_UP.equals(direction)) {
//      fileName=cfgOpn.getUpMappingFile();
//  }else {
//      fileName=cfgOpn.getDownMappingFile();
//  }
//  
//  return BCUtils.getMappingRuleFromFS(fileName);
//}    
    

    
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

	public ICfgFormat getFormatByPortIn(ICfgPortIn port)
			throws CfgAccessException {
		return ((OmCfgPortIn)port).getFormat();
	}

	public ICfgFormat getFormatByPortOut(ICfgPortOut port)
			throws CfgAccessException {
		return ((OmCfgPortOut)port).getFormat();
	}

	public ICfgFormat getFormatByOpn(ICfgOperation opn)
		throws CfgAccessException {
			return ((OmCfgOperation)opn).getFormat();	
	}

	public List<ICfgFormat> getListFormat() {
		List<ICfgFormat> res = new ArrayList<ICfgFormat>();
		res.addAll(dataHolder.listFormat);
		return res;
		
	}
}
