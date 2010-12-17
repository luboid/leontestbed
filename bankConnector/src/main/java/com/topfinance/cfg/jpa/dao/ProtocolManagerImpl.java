package com.topfinance.cfg.jpa.dao;

import com.topfinance.cfg.jpa.JpaCfgProtocol;
import com.topfinance.db.dao.DbException;
import com.topfinance.db.dao.HibernateEntityDao;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 该类自动实现了dao的一般方法，如add, remove, update
 * 在service中出现的大部分情况下是在向后台提交数据前的处理(如校验)及获取后台数据后的处理等
 * @author
 *
 */

public class ProtocolManagerImpl extends HibernateEntityDao<JpaCfgProtocol> implements IProtocolManager {

	private static final Log log = LogFactory.getLog(ProtocolManagerImpl.class);

	public void addProtocol(JpaCfgProtocol o) throws DbException{
    	save(o);
    }
	
	public void editProtocol(JpaCfgProtocol o) throws DbException{
		// 删除原始传输协议和部门映射
		//ConfProtocolEbo user = get(o.getUserId());
		//deleteDepartUserMap(o.getUserId());
		//flush();
		//clear();
		// 保存传输协议
    	saveOrUpdate(o);
    	//save(sysDepartmentUserMapEbo);
    }
	
	//获得传输协议	
	public JpaCfgProtocol getProtocol(Integer uid) throws DbException{
		return (JpaCfgProtocol)get(uid);
	}

	public void deleteProtocol(JpaCfgProtocol o) throws DbException{
		removeById(o.getClass(),o.getUid());
    }
	public void deleteProtocol(Integer id) throws DbException{
		removeById(JpaCfgProtocol.class,id);
	}

	//获得传输协议列表
	public List getAllProtocolList() throws DbException{
		String hql = " from ConfProtocolEbo t " ;
		String where = "";
		List<Object> paramList = new ArrayList<Object>();
		if (isNotBlank(where)) {
			where = " where " + where;
		}
		hql = hql + where;
		return find(hql,paramList.toArray());		
	}
}
