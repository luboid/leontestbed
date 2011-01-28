package com.topfinance.db.dao;



import java.io.Serializable;

public interface IBaseManager {
	/**
	 * 保存对象.
	 */
	public abstract void save(Object obj) throws DbException;

	public abstract void update(Object obj) throws DbException;

	public abstract void saveOrUpdate(Object obj) throws DbException;

	/**
	 * 删除对象.
	 */
	public abstract void remove(Object o) throws DbException;
	/**
	 * 根据ID移除对象.
	 * 
	 * @throws DbException
	 * 
	 * @see HibernateGenericDao#removeById(Class,Serializable)
	 */
	public void removeById(Serializable id) throws DbException;
}
