package com.topfinance.cfg.db;

import com.cnaps2.cncc.ebo.ConfInPortEbo;
import com.cnaps2.cncc.ebo.ConfNodeEbo;
import com.cnaps2.cncc.ebo.ConfOutPortEbo;
import com.cnaps2.cncc.ebo.ConfProtocolEbo;
import com.cnaps2.cncc.ebo.ConfTransportEbo;
import com.cnaps2.cncc.service.IInPortManager;
import com.cnaps2.cncc.service.INodeManager;
import com.cnaps2.cncc.service.IOutPortManager;
import com.cnaps2.cncc.service.IProtocolManager;
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

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class DbCfgReader implements ICfgReader {
    private ApplicationContext ctx;
    
    private DbCfgReader() {
        ctx = new ClassPathXmlApplicationContext("/test/applicationContext.xml");
    }
    private static DbCfgReader instance;
    public static DbCfgReader getInstance() {
        if(instance == null) {
            instance = new DbCfgReader();
        }
        return instance;
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
        List<ICfgInPort> res = new ArrayList<ICfgInPort>();
        
        try {
            IInPortManager mgr = (IInPortManager)ctx.getBean("inPortManager");
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
        // TODO Auto-generated method stub
        return null;
    }

    public List<ICfgNode> getListOfNodes() {
        // TODO Auto-generated method stub
        return null;
    }

    public List<ICfgTransportInfo> getListOfTransportInfo() {
        List<ICfgTransportInfo> res = new ArrayList<ICfgTransportInfo>();
        
        try {
            ITransportManager mgr = (ITransportManager)ctx.getBean("transportManager");
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
        // TODO Auto-generated method stub
        return null;
    }

    public InputStream getMappingRule(String mesgType, String direction) {
        // TODO Auto-generated method stub
        return null;
    }

    public ICfgOperation getOperation(ICfgProtocol protocol, String name) {
        // TODO Auto-generated method stub
        return null;
    }

    
    
    
    
    
    
    
    
    public ICfgProtocol getProtByOpn(ICfgOperation opn) {
        DbCfgOperation ebo = (DbCfgOperation)opn;
        
        return null;
    }


    public ICfgOutPort getAckPortByIP(ICfgInPort ip) {
        ICfgOutPort res = null;
        
        DbCfgInPort db = (DbCfgInPort)ip;
        Integer nid = db.getAckPortId();
        try {
            IOutPortManager mgr = (IOutPortManager)ctx.getBean("outPortManager");
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
            INodeManager mgr = (INodeManager)ctx.getBean("nodeManager");
            ConfNodeEbo ebo = mgr.getNode(nid);
            res = new DbCfgNode(ebo);
        } catch (Exception ex) {
            throw new ConfigAccessException(ex);
        }
        
        return res;
    }


    public ICfgOutPort getOutPortByRR(ICfgRouteRule rr) {
        // TODO Auto-generated method stub
        return null;
    }


    public ICfgProtocol getProtByInPort(ICfgInPort ip) {
        ICfgProtocol res = null;
        
        DbCfgInPort db = (DbCfgInPort)ip;
        Integer pid = db.getProtocolId();
        try {
            IProtocolManager mgr = (IProtocolManager)ctx.getBean("protocolManager");
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
            ITransportManager mgr = (ITransportManager)ctx.getBean("transportManager");
            ConfTransportEbo ebo = mgr.getTrans(tid);
            res = new DbCfgTransportInfo(ebo);
        } catch (Exception ex) {
            throw new ConfigAccessException(ex);
        }
        
        return res;
    }

}
