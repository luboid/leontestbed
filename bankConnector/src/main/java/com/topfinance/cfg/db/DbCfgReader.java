package com.topfinance.cfg.db;

import com.cnaps2.cncc.ebo.ConfInPortEbo;
import com.cnaps2.cncc.ebo.ConfNodeEbo;
import com.cnaps2.cncc.ebo.ConfOperationEbo;
import com.cnaps2.cncc.ebo.ConfOutPortEbo;
import com.cnaps2.cncc.ebo.ConfProtocolEbo;
import com.cnaps2.cncc.ebo.ConfRouteRuleEbo;
import com.cnaps2.cncc.ebo.ConfTransportEbo;
import com.cnaps2.cncc.service.IInPortManager;
import com.cnaps2.cncc.service.INodeManager;
import com.cnaps2.cncc.service.IOperationManager;
import com.cnaps2.cncc.service.IOutPortManager;
import com.cnaps2.cncc.service.IProtocolManager;
import com.cnaps2.cncc.service.IRouteRuleManager;
import com.cnaps2.cncc.service.ITransportManager;
import com.topfinance.cfg.ConfigAccessException;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgNode;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgPort;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgRouteRule;
import com.topfinance.cfg.ICfgTransportInfo;
import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.util.BCUtils;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class DbCfgReader implements ICfgReader {
    private static Logger logger = Logger.getLogger(DbCfgReader.class);
    
    private ApplicationContext ctx;
    
    public final static String DBSTORE = "/test/applicationContext.xml";
    
    public void init(String config) {
        logger.info("initializing DbCfgReader with spring: " + config + "...");
        ctx = new ClassPathXmlApplicationContext(config);
        logger.info("Done");
    }
    
    // not strict singleton, allow new instance for Broker 
    public DbCfgReader(String config) {
        init(config);
    }
    
    private static DbCfgReader instance;
    public static DbCfgReader getInstance(String config) {
        if(instance == null) {
            instance = new DbCfgReader(config);
        }
        return instance;
    }
    
    
    public ICfgInPort getInPortByUri(String uri) {
        ICfgInPort res = null;
        
        try {
            IInPortManager mgr = (IInPortManager)getCtx().getBean("inPortManager");
            List list = mgr.getAllInPortList();
            for(int i=0;i<list.size();i++) {
                ConfInPortEbo ebo = (ConfInPortEbo)list.get(i);
                ICfgInPort ip = new DbCfgInPort(ebo); 
                if(uri.equals(BCUtils.getFullUrlFromPort(ip))) {
                    res = ip;
                    break;
                }

            }
        } catch (Exception ex) {
            throw new ConfigAccessException(ex);
        }
        
        return res;
    }

    public ICfgInPort getInportByName(String name) {
        ICfgInPort res = null;
        
        try {
            IInPortManager mgr = (IInPortManager)getCtx().getBean("inPortManager");
            List list = mgr.getAllInPortList();
            for(int i=0;i<list.size();i++) {
                ConfInPortEbo ebo = (ConfInPortEbo)list.get(i);
                if(ebo.getName().equals(name)) {
                    res = new DbCfgInPort(ebo);
                }
            }
        } catch (Exception ex) {
            throw new ConfigAccessException(ex);
        }
        
        return res;
    }



    public List<ICfgInPort> getListOfEnabledInport() {
        List<ICfgInPort> res = new ArrayList<ICfgInPort>();
        
        try {
            IInPortManager mgr = (IInPortManager)getCtx().getBean("inPortManager");
            List list = mgr.getAllInPortList();
            for(int i=0;i<list.size();i++) {
                ConfInPortEbo ebo = (ConfInPortEbo)list.get(i);
                res.add(new DbCfgInPort(ebo));
            }
        } catch (Exception ex) {
            throw new ConfigAccessException(ex);
        }
        
        return res;
    }

    public List<ICfgOutPort> getListOfEnabledOutport() {
        List<ICfgOutPort> res = new ArrayList<ICfgOutPort>();
        
        try {
            IOutPortManager mgr = (IOutPortManager)getCtx().getBean("outPortManager");
            List list = mgr.getAllOutPortList();
            for(int i=0;i<list.size();i++) {
                ConfOutPortEbo ebo = (ConfOutPortEbo)list.get(i);
                res.add(new DbCfgOutPort(ebo));
            }
        } catch (Exception ex) {
            throw new ConfigAccessException(ex);
        }
        
        return res;
    }



    public List<ICfgTransportInfo> getListOfTransportInfo() {
        List<ICfgTransportInfo> res = new ArrayList<ICfgTransportInfo>();
        
        try {
            ITransportManager mgr = (ITransportManager)getCtx().getBean("transportManager");
            List list = mgr.getAllTransList();
            for(int i=0;i<list.size();i++) {
                ConfTransportEbo ebo = (ConfTransportEbo)list.get(i);
                res.add(new DbCfgTransportInfo(ebo));
            }
        } catch (Exception ex) {
            throw new ConfigAccessException(ex);
        }
        
        return res;
    }

    public List<ICfgRouteRule> getListUpRoute() {
        List<ICfgRouteRule> res = new ArrayList<ICfgRouteRule>();
        
        try {
            IRouteRuleManager mgr = (IRouteRuleManager)getCtx().getBean("routeManager");
            List list = mgr.getAllRouteList();
            for(int i=0;i<list.size();i++) {
                ConfRouteRuleEbo ebo = (ConfRouteRuleEbo)list.get(i);
                if(DIRECTION_UP.equals(ebo.getDirection())) {
                    res.add(new DbCfgRouteRule(ebo));
                }
            }
        } catch (Exception ex) {
            throw new ConfigAccessException(ex);
        }
        
        return res;
    }
    public List<ICfgRouteRule> getListDownRoute() {
        List<ICfgRouteRule> res = new ArrayList<ICfgRouteRule>();
        
        try {
            IRouteRuleManager mgr = (IRouteRuleManager)getCtx().getBean("routeManager");
            List list = mgr.getAllRouteList();
            for(int i=0;i<list.size();i++) {
                ConfRouteRuleEbo ebo = (ConfRouteRuleEbo)list.get(i);
                if(DIRECTION_DOWN.equals(ebo.getDirection())) {
                    res.add(new DbCfgRouteRule(ebo));
                }
            }
        } catch (Exception ex) {
            throw new ConfigAccessException(ex);
        }
        
        return res;
    }
    
    public InputStream getMappingRule(String mesgType, String direction) {
        return getMappingRuleFromFS(mesgType, direction);
    }
    public static InputStream getMappingRuleFromFS(String mesgType, String direction) {
        
        // TODO now load mapfile from filesystem
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

    public ICfgOperation getOperation(ICfgProtocol protocol, String name) {
        ICfgOperation res = null;
        
        DbCfgProtocol db = (DbCfgProtocol)protocol;
        Integer protId = db.getUid();
        
        try {
            IOperationManager mgr = (IOperationManager)getCtx().getBean("operManager");
            List list = mgr.getAllOperList();
            for(int i=0;i<list.size();i++) {
                ConfOperationEbo ebo = (ConfOperationEbo)list.get(i);
                if(ebo.getPrtclEbo().getUid().equals(protId) || ebo.getName().equals(name)) {
                    res = new DbCfgOperation(ebo);
                    break;
                }
            }
        } catch (Exception ex) {
            throw new ConfigAccessException(ex);
        }
        return res;
    }

    
    
    
    
    
    
    
    
    public ICfgProtocol getProtByOpn(ICfgOperation opn) {
        ICfgProtocol res = null;
        
        DbCfgOperation db = (DbCfgOperation)opn;
        Integer nid = db.getProtId();
        try {
            IProtocolManager mgr = (IProtocolManager)getCtx().getBean("protocolManager");
            ConfProtocolEbo ebo = mgr.getProtocol(nid);
            res = new DbCfgProtocol(ebo);
        } catch (Exception ex) {
            throw new ConfigAccessException(ex);
        }
        return res;
        
    }


    public ICfgOutPort getAckPortByIP(ICfgInPort ip) {
        ICfgOutPort res = null;
        
        DbCfgInPort db = (DbCfgInPort)ip;
        Integer nid = db.getAckPortId();
        try {
            IOutPortManager mgr = (IOutPortManager)getCtx().getBean("outPortManager");
            ConfOutPortEbo ebo = mgr.getOutPort(nid);
            res = new DbCfgOutPort(ebo);
        } catch (Exception ex) {
            throw new ConfigAccessException(ex);
        }
        return res;
    }

    

    public ICfgNode getNodeByPort(ICfgPort port) {
        ICfgNode res = null;
        DbCfgPort db = (DbCfgPort)port;
        Integer nid = db.getNodeId();
        try {
            INodeManager mgr = (INodeManager)getCtx().getBean("nodeManager");
            ConfNodeEbo ebo = mgr.getNode(nid);
            res = new DbCfgNode(ebo);
        } catch (Exception ex) {
            throw new ConfigAccessException(ex);
        }
        
        return res;
    }


    public ICfgOutPort getOutPortByRR(ICfgRouteRule rr) {
        ICfgOutPort res = null;
        
        DbCfgRouteRule db = (DbCfgRouteRule)rr;
        Integer id = db.getOutPortId();
        try {
            IOutPortManager mgr = (IOutPortManager)getCtx().getBean("outPortManager");
            ConfOutPortEbo ebo = mgr.getOutPort(id);
            res = new DbCfgOutPort(ebo);
        } catch (Exception ex) {
            throw new ConfigAccessException(ex);
        }
        
        return res;
    }


    public ICfgProtocol getProtByInPort(ICfgInPort ip) {
        ICfgProtocol res = null;
        
        DbCfgInPort db = (DbCfgInPort)ip;
        Integer pid = db.getProtocolId();
        try {
            IProtocolManager mgr = (IProtocolManager)getCtx().getBean("protocolManager");
            ConfProtocolEbo ebo = mgr.getProtocol(pid);
            res = new DbCfgProtocol(ebo);
        } catch (Exception ex) {
            throw new ConfigAccessException(ex);
        }
        
        return res;
    }


    public ICfgTransportInfo getTransInfoByPort(ICfgPort port) {
        ICfgTransportInfo res = null;
        
        DbCfgPort db = (DbCfgPort)port;
        Integer tid = db.getTransportId();
        try {
            ITransportManager mgr = (ITransportManager)getCtx().getBean("transportManager");
            ConfTransportEbo ebo = mgr.getTrans(tid);
            res = new DbCfgTransportInfo(ebo);
        } catch (Exception ex) {
            throw new ConfigAccessException(ex);
        }
        
        return res;
    }

    public ApplicationContext getCtx() {
        if(ctx==null) {
            throw new RuntimeException("DbCfgReader not initialized...");
        }
        return ctx;
    }

    public void setCtx(ApplicationContext ctx) {
        this.ctx = ctx;
    }

}
