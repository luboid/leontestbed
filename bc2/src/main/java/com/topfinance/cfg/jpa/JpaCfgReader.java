package com.topfinance.cfg.jpa;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

import com.topfinance.cfg.CfgAccessException;
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
import com.topfinance.db.dao.DbException;
import com.topfinance.db.dao.IDao;
import com.topfinance.payment.ebo.JpaCfgFmtEleMapFileEbo;
import com.topfinance.runtime.OpInfo;
import com.topfinance.transform.simple.SimpleMappingRule;
import com.topfinance.util.BCUtils;

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
    
    public ICfgPortOut getAckPortByIP(ICfgPortIn ip) {
        return ((JpaCfgPortIn)ip).getAckPort();
    }

    public ICfgPortIn getInPortByUri(String uri) {
        ICfgPortIn res = null;

            List<ICfgPortIn> ips = getListOfEnabledInport();
            for(ICfgPortIn ip : ips) {
                // todo this is tricky
            	String cfgUrl = BCUtils.getFullUrlFromPortIn(ip, this, false);
                logger.debug("in getInPortByUri: "+cfgUrl);

//                if(uri.equals(BCUtils.getFullUrlFromPortIn(ip, this, false))) {
                if(CfgUtils.matchUrl(uri, cfgUrl)) {
                    res = ip;
                    break;
                }
            }
            return res;

    }

    public ICfgPortIn getInportByName(String name) {
        try {
            String hql = "from "+JpaCfgPortIn.class.getSimpleName()+" ip where ip.name = ?";
            Object[] paras = new Object[] {name};
            List list = getDao().find(hql, paras);
            return list.size()>0 ? (ICfgPortIn)list.get(0) : null;
        } catch (DbException ex) {
            throw new CfgAccessException(ex);
        }
    }



    public List<ICfgPortIn> getListOfEnabledInport() {
        try {
            return getDao().getAll(ICfgPortIn.class);
        } catch (DbException ex) {
            throw new CfgAccessException(ex);
        }
    }

    public List<ICfgPortOut> getListOfEnabledOutport() {
        try {
            return getDao().getAll(ICfgPortOut.class);
        } catch (DbException ex) {
            throw new CfgAccessException(ex);
        }
    }

    public List<ICfgTransIn> getListOfTransIn() {
        try {
            return getDao().getAll(ICfgTransIn.class);
        } catch (DbException ex) {
            throw new CfgAccessException(ex);
        }
    }
	public List<ICfgTransOut> getListOfTransOut() throws CfgAccessException {
        try {
            return getDao().getAll(ICfgTransOut.class);
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

    public ICfgNode getNodeByPortIn(ICfgPortIn port) {
        return ((JpaCfgPortIn)port).getNode();
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

    public ICfgPortOut getOutPortByRR(ICfgRouteRule rr) {
        return ((JpaCfgRouteRule)rr).getOutPort();
    }

    public ICfgProtocol getProtByInPort(ICfgPortIn ip) {
        return ((JpaCfgPortIn)ip).getProtocol();
    }

    public ICfgProtocol getProtByOpn(ICfgOperation opn) {
        return ((JpaCfgOperation)opn).getProtocol();
    }

    public ICfgTransIn getTransByPortIn(ICfgPortIn port) {
        return ((JpaCfgPortIn)port).getTransIn();
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
    
	public SimpleMappingRule getMappingRule(OpInfo opInfo, ICfgOperation cfgOpn,
			String direction) throws CfgAccessException {
		try {
			String hql = "from "
					+ TCfgMapRuleEbo.class.getSimpleName()
					+ " obj where obj.msgCode = ? and obj.tpCode=? and obj.clsCode=? ";
			Object[] paras = new Object[] { opInfo.getMesgType(),opInfo.getOpType(), opInfo.getOpClass()};
			List list = getDao().find(hql, paras);
			TCfgMapRuleEbo rule = list.size() > 0 ? (TCfgMapRuleEbo) list.get(0) : null;
			
			throw new RuntimeException("===========not implemented========");
//			return SimpleMappingRule.fromDb(rule, direction);
		} catch (DbException ex) {
			throw new CfgAccessException(ex);
		}
	}
	
	public List<ICfgFormat8583> getFormat8583(ICfgFormat format) throws CfgAccessException {
        try {
            String hql = "from "+JpaCfgFormat8583.class.getSimpleName()+" obj where obj.format = ? order by pos";
            Object[] paras = new Object[] {format};
            List<ICfgFormat8583> list = getDao().find(hql, paras);
            
            // order it, as the pos field is varchar
            Map<Integer, ICfgFormat8583> map = new HashMap<Integer, ICfgFormat8583>();
            for(ICfgFormat8583 f8583 : list) {
            	map.put(Integer.valueOf(f8583.getPos()), f8583);
            }
            
            
            List<ICfgFormat8583> res = new ArrayList<ICfgFormat8583>();
            for(int i=1;i<=129;i++) {
            	res.add(map.get(i));
            }
            
            return res;
        } catch (DbException ex) {
            throw new CfgAccessException(ex);
        }
	}
	
	
//    public InputStream getMappingRule(ICfgOperation cfgOpn, String direction) {
//        String fileName = "";
//        if(DIRECTION_UP.equals(direction)) {
//            fileName=cfgOpn.getUpMappingFile();
//        }else {
//            fileName=cfgOpn.getDownMappingFile();
//        }
//        
//        return BCUtils.getMappingRuleFromFS(fileName);
//    }
    
	public ICfgFormat getFormatByOpn(ICfgOperation opn)
	throws CfgAccessException {
		return ((JpaCfgOperation)opn).getFormat();	
	}
	public ICfgFormat getFormatByPortIn(ICfgPortIn port)
			throws CfgAccessException {
		return ((JpaCfgPortIn)port).getFormat();
	}
	public ICfgFormat getFormatByPortOut(ICfgPortOut port)
			throws CfgAccessException {
		return ((JpaCfgPortOut)port).getFormat();
	}
	public ICfgTransOut getTransByPortOut(ICfgPortOut port)
			throws CfgAccessException {
		return ((JpaCfgPortOut)port).getTransOut();
	}
	public ICfgNode getNodeByPortOut(ICfgPortOut port)
			throws CfgAccessException {
		return ((JpaCfgPortOut)port).getNode();
	}
	
	public List<ICfgFormat> getListFormat() throws CfgAccessException {
        try {
            String hql = "from "+JpaCfgFormat.class.getSimpleName();
            Object[] paras = new Object[] {};
            List<ICfgFormat> list = getDao().find(hql, paras);
            
            return list;
        } catch (DbException ex) {
            throw new CfgAccessException(ex);
        }
	}
    public JpaCfgFmtEleMapFileEbo getMapFile(String mesgType, String tpCode, String clsCode) {
        try {
            String hql = "from "+JpaCfgFmtEleMapFileEbo.class.getSimpleName()+" o where o.msgCode = ? and o.tpCode=? and o.clsCode=?";
            Object[] paras = new Object[] {mesgType, tpCode, clsCode};
            List list = getDao().find(hql, paras);
            return list.size()>0 ? (JpaCfgFmtEleMapFileEbo)list.get(0) : null;
        } catch (DbException ex) {
            throw new CfgAccessException(ex);
        }
    }
    public String getPosSequn(String pos) {
        try {
        	String hql = "select f.sequn from JpaCfgFormat8583 f where f.format.uid = "+1;
			hql += " and f.pos ='" + pos + "'";
//            Object[] paras = new Object[] {mesgType, tpCode, clsCode};
            List list = getDao().find(hql);
			if(list.size() == 1)
				return list.get(0).toString();
			else
				throw new RuntimeException("[找不到对于的位置]FmtOID="+1+",POSITION=" + pos);

        } catch (DbException ex) {
            throw new CfgAccessException(ex);
        }
    }
}
