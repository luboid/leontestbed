package com.topfinance.cfg.jpa;

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
import com.topfinance.db.dao.DbException;
import com.topfinance.db.dao.IDao;
import com.topfinance.util.BCUtils;

import java.io.InputStream;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

public class JpaCfgReader implements ICfgReader {
    private static Logger logger = Logger.getLogger(JpaCfgReader.class);
    
    private ApplicationContext ctx;
    
//    public final static String DBSTORE = "/spring-config-db.xml";
    
    public void init(String config) {
        logger.info("initializing JpaCfgReader with spring: " + config + "...");
        ctx = new FileSystemXmlApplicationContext(config);
        logger.info("Done");
    }
    private IDao getDao() {
        IDao dao = (IDao)ctx.getBean("dao");
        return dao;
    }
    // not strict singleton, allow new instance for Broker 
    public JpaCfgReader(String config) {
        init(config);
    }
    
    private static JpaCfgReader instance;
    public static JpaCfgReader getInstance(String config) {
        if(instance == null) {
            instance = new JpaCfgReader(config);
        }
        return instance;
    }
    
    public ICfgOutPort getAckPortByIP(ICfgInPort ip) {
        return ((JpaCfgInPort)ip).getAckPort();
    }

    public ICfgInPort getInPortByUri(String uri) {
        ICfgInPort res = null;

            List<ICfgInPort> ips = getListOfEnabledInport();
            for(ICfgInPort ip : ips) {
                // todo this is tricky
                logger.debug("in getInPortByUri: "+BCUtils.getFullUrlFromPortForConsumer(ip));

                if(uri.equals(BCUtils.getFullUrlFromPortForConsumer(ip))) {
                    res = ip;
                    break;
                }
            }
            return res;

    }

    public ICfgInPort getInportByName(String name) {
        try {
            String hql = "from "+JpaCfgInPort.class.getSimpleName()+" ip where ip.name = ?";
            Object[] paras = new Object[] {name};
            List list = getDao().find(hql, paras);
            return list.size()>0 ? (ICfgInPort)list.get(0) : null;
        } catch (DbException ex) {
            throw new CfgAccessException(ex);
        }
    }



    public List<ICfgInPort> getListOfEnabledInport() {
        try {
            return getDao().getAll(ICfgInPort.class);
        } catch (DbException ex) {
            throw new CfgAccessException(ex);
        }
    }

    public List<ICfgOutPort> getListOfEnabledOutport() {
        try {
            return getDao().getAll(ICfgOutPort.class);
        } catch (DbException ex) {
            throw new CfgAccessException(ex);
        }
    }

    public List<ICfgTransportInfo> getListOfTransportInfo() {
        try {
            return getDao().getAll(ICfgTransportInfo.class);
        } catch (DbException ex) {
            throw new CfgAccessException(ex);
        }
    }

    public List<ICfgRouteRule> getListUpRoute() {
        try {
            String hql = "from "+JpaCfgRouteRule.class.getSimpleName()+" obj where obj.direction = ?";
            Object[] paras = new Object[] {DIRECTION_UP};
            List list = getDao().find(hql, paras);
            return list;
        } catch (DbException ex) {
            throw new CfgAccessException(ex);
        }
    }

    public List<ICfgRouteRule> getListDownRoute() {
        try {
            String hql = "from "+JpaCfgRouteRule.class.getSimpleName()+" obj where obj.direction = ?";
            Object[] paras = new Object[] {DIRECTION_DOWN};
            List list = getDao().find(hql, paras);
            return list;
        } catch (DbException ex) {
            throw new CfgAccessException(ex);
        }
    }

    public ICfgNode getNodeByPort(ICfgPort port) {
        return ((JpaCfgPort)port).getNode();
    }
    
    public List<ICfgProtocol> getListProtocol() {
        try {
            return getDao().getAll(ICfgProtocol.class);
        } catch (DbException ex) {
            throw new CfgAccessException(ex);
        }
    }
    
    public ICfgOperation getOperation(ICfgProtocol protocol, String name) {
        ICfgOperation res = null;
        try {
            String hql = "from "+JpaCfgOperation.class.getSimpleName()+" obj where obj.name = ? and obj.protocol=?";
            Object[] paras = new Object[] {name, protocol};
            List list = getDao().find(hql, paras);
            if(list!=null && list.size()>0) {
                res = (ICfgOperation)list.get(0);
            }
            
//            List<ICfgOperation> opns = getDao().getAll(ICfgOperation.class);
//            for(ICfgOperation opn : opns) {
//                Object protId = ((JpaCfgOperation)opn).getProtocol().getUid();
//                if(((JpaCfgProtocol)protocol).getUid().equals(protId)) {
//                    res = opn;
//                }
//            }
            return res;
        } catch (DbException ex) {
            throw new CfgAccessException(ex);
        }
    }

    public ICfgOutPort getOutPortByRR(ICfgRouteRule rr) {
        return ((JpaCfgRouteRule)rr).getOutPort();
    }

    public ICfgProtocol getProtByInPort(ICfgInPort ip) {
        return ((JpaCfgInPort)ip).getProtocol();
    }

    public ICfgProtocol getProtByOpn(ICfgOperation opn) {
        return ((JpaCfgOperation)opn).getProtocol();
    }

    public ICfgTransportInfo getTransInfoByPort(ICfgPort port) {
        return ((JpaCfgPort)port).getTransportInfo();
    }



    public List<ICfgDownOutMH> getListOfDownOutMH() {
        try {
            return getDao().getAll(ICfgDownOutMH.class);
        } catch (DbException ex) {
            throw new CfgAccessException(ex);
        }
    }

    public List<ICfgUpInMH> getListOfUpInMH() {
        try {
            return getDao().getAll(ICfgUpInMH.class);
        } catch (DbException ex) {
            throw new CfgAccessException(ex);
        }
    }

    public ICfgDownOutMH getDownOutMHByPort(ICfgOutPort port) {
        return ((JpaCfgOutPort)port).getDownOutMH();
    }

    public ICfgDownOutMH getSyncReplyDownOutMHByPort(ICfgInPort port) {
        return ((JpaCfgInPort)port).getSyncReplyDownOutMH();
    }

    public ICfgUpInMH getUpInMHByPort(ICfgInPort port) {
        return ((JpaCfgInPort)port).getUpInMH();
    }
    
    public ICfgProtocol getProtocolByName(String name) throws CfgAccessException {
        try {
            String hql = "from "+JpaCfgProtocol.class.getSimpleName()+" obj where obj.name = ?";
            Object[] paras = new Object[] {name};
            List list = getDao().find(hql, paras);
            return list.size()>0 ? (ICfgProtocol)list.get(0) : null;
        } catch (DbException ex) {
            throw new CfgAccessException(ex);
        }
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

}
