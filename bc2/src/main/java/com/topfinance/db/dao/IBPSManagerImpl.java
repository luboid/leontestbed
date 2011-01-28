package com.topfinance.db.dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.cnaps2.cncc.service.IIBPSManager;

/**
 * 该类自动实现了dao的一般方法，如add, remove, update
 * 在service中出现的大部分情况下是在向后台提交数据前的处理(如校验)及获取后台数据后的处理等
 * 
 * @author
 * 
 */

public class IBPSManagerImpl extends HibernateEntityDao implements IIBPSManager {

	private static final Log log = LogFactory.getLog(IBPSManagerImpl.class);

	// 获得IBPS101列表
	public List getIbps101List() throws DbException {
		String hql = " from Ibps101 t ";
		String where = "";
		List<Object> paramList = new ArrayList<Object>();
		if (isNotBlank(where)) {
			where = " where " + where;
		}
		hql = hql + where;
		return find(hql, paramList.toArray());
	}

	// 获得MsgTree列表
	public List getMsgTree() throws DbException {
		String hql = " select distinct t.type from MsgListEbo t ";
		String where = "";
		List<Object> paramList = new ArrayList<Object>();
		if (isNotBlank(where)) {
			where = " where " + where;
		}
		hql = hql + where;
		List list = find(hql, paramList.toArray());
		int size = list.size();
		for(int i=0;i<size;i++){
			list.set(i,new SingleDto(list.get(i).toString()));
		}
		return list;
	}

	// 获得MsgList列表
	public List getMsgList() throws DbException {
		String hql = " from MsgListEbo t ";
		String where = "";
		List<Object> paramList = new ArrayList<Object>();
		if (isNotBlank(where)) {
			where = " where " + where;
		}
		hql = hql + where;
		return find(hql, paramList.toArray());
	}

	// 获得MsgList数据列表
	public List getList(Class msg) throws DbException {
		log.debug("[ClassPkg]" + msg);
		return createCriteria(msg).list();
	}

	// 获得列表中文定义
	public Hashtable getColumnDef(String tableName) throws DbException {
		List list = new ArrayList();
		final String sql = "select column_name,comments from user_col_comments where table_name = '" + tableName + "'";
		list = this.getHibernateTemplate().executeFind(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createSQLQuery(sql);// 创建SESSION
				// query.setFirstResult(startPage);//分页设置
				// query.setMaxResults(endPage);
				List list = query.list();// 获取结果
				return list;// 返回值
			}
		});
		
		Hashtable columnHash = new Hashtable();
		int size = list.size();
		String column = null;
		String comment = null;
		for(int i=0;i<size;i++){
			Object []row = (Object [])list.get(i);
			column = row[0].toString();
			if(row[1] != null)
				comment = row[1].toString();
			else
				comment = column; 
			columnHash.put(column, comment);
		}
		//log.debug("[TName:" + tableName + "]=" + size);
		return columnHash;
	}
}
