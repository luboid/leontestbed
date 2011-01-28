package com.topfinance.db.dao;



import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.LockMode;
import org.hibernate.Query;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Expression;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.impl.CriteriaImpl;
import org.hibernate.metadata.ClassMetadata;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.util.Assert;
import org.springframework.util.ReflectionUtils;

/**
 * Hibernate Dao的泛型基类.
 * 
 * @author mz
 * @see HibernateDaoSupport
 * @see HibernateEntityDao
 */
@SuppressWarnings("unchecked")
public class HibernateGenericDao extends HibernateDaoSupport implements IDao  {
	private static Log log = LogFactory.getLog(HibernateGenericDao.class);
    protected static int DEFAULT_FETCH_SIZE = 1000; 
	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#get(java.lang.Class, java.io.Serializable)
     */
	public <T> T get(Class<T> entityClass, Serializable id) throws DbException{
		T t = null;
		try {
			t = (T) getHibernateTemplate().get(entityClass, id);
		} catch (Exception e) {
			handleException(e);
		}
		return t;
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#getAll(java.lang.Class)
     */
	public <T> List<T> getAll(Class<T> entityClass) throws DbException{
		List<T> list = null;
		try {
			list = getHibernateTemplate().loadAll(entityClass);
		} catch (Exception e) {
			handleException(e);
		}
		return list;
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#getAll(java.lang.Class, java.lang.String, boolean)
     */
	public <T> List<T> getAll(Class<T> entityClass, String orderBy,
			boolean isAsc) throws DbException{
		List<T> list = null;
		try {
			Assert.hasText(orderBy);
			if (isAsc) {
				list = getHibernateTemplate().findByCriteria(
						DetachedCriteria.forClass(entityClass).addOrder(
								Order.asc(orderBy)));
			} else {
				list = getHibernateTemplate().findByCriteria(
						DetachedCriteria.forClass(entityClass).addOrder(
								Order.desc(orderBy)));
			}
		} catch (Exception e) {
			handleException(e);
		}
		return list;
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#save(java.lang.Object)
     */
	public void save(Object obj) throws DbException {
		try {
			getHibernateTemplate().save(obj);
		} catch (Exception e) {
			handleException(e);
		}
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#merge(java.lang.Class)
     */
	public <T> T merge(Class<T> entityClass) throws DbException {
		T t = null;
		log.debug("merging "+entityClass.getClass().getName()+" instance");
		try {
			t = (T) getHibernateTemplate().merge(entityClass);
			log.debug("merge successful");
			//return t;
		} catch (Exception e) {
			log.error("merge failed", e);
			handleException (e);
		}
		return t;
	}
	
	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#update(java.lang.Object)
     */
	public void update(Object obj) throws DbException {
		try {
			getHibernateTemplate().update(obj);
		} catch (Exception e) {
			handleException(e);
		}
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#saveOrUpdate(java.lang.Object)
     */
	public void saveOrUpdate(Object obj) throws DbException{
		try {
			getHibernateTemplate().saveOrUpdate(obj);
		} catch (Exception e) {
			handleException(e);
		}
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#remove(java.lang.Object)
     */
	public void remove(Object o) throws DbException {
		try {
			getHibernateTemplate().delete(o);
		}  catch (Exception e) {
			handleException(e);
		}
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#removeById(java.lang.Class, java.io.Serializable)
     */
	public <T> void removeById(Class<T> entityClass, Serializable id) throws DbException {
		try {
			remove(get(entityClass, id));
		} catch (Exception e) {
			handleException(e);
		}
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#flush()
     */
	public void flush() throws DbException {
		try {
			getHibernateTemplate().flush();
		} catch (Exception e) {
			handleException(e);
		}
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#clear()
     */
	public void clear() throws DbException {
		try {
			getHibernateTemplate().clear();
		} catch (Exception e) {
			handleException(e);
		}
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#createQuery(java.lang.String, java.lang.Object)
     */
	public Query createQuery(String hql, Object... values) throws DbException {
		Query query = null;
		try {
			Assert.hasText(hql);
			query = getSession().createQuery(hql);
			for (int i = 0; i < values.length; i++) {
				query.setParameter(i, values[i]);
			}
		} catch (Exception e) {
			handleException(e);
		}
		return query;		
	}
	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#createNativeQuery(java.lang.String, java.lang.Object)
     */
	public Query createNativeQuery(String hql,Object... values) throws DbException{
		return this.createNativeQuery(hql,null, values);
	}
	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#createNativeQuery(java.lang.String, java.lang.Class, java.lang.Object)
     */
	public Query createNativeQuery(String hql,Class classz, Object... values) throws DbException {
		Query query = null;
		try {
			Assert.hasText(hql);
			if(classz==null){
			    query = getSession().createSQLQuery(hql);
			}else{
				query = getSession().createSQLQuery(hql).addEntity(classz);
			}
			for (int i = 0; i < values.length; i++) {
				query.setParameter(i, values[i]);
			}
		} catch (Exception e) {
			handleException(e);
		}
		return query;		
	}
	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#createQueryWithValueBean(java.lang.String, java.lang.Object)
     */
	public Query createQueryWithValueBean(String hql, Object valueBean) throws DbException {
		Query query = null;
		try {
			Assert.hasText(hql);
			query = getSession().createQuery(hql);
			query.setProperties(valueBean);
		} catch (Exception e) {
			handleException(e);
		}
		return query;		
	}
	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#createCriteria(java.lang.Class, org.hibernate.criterion.Criterion)
     */
	public <T> Criteria createCriteria(Class<T> entityClass,
			Criterion... criterions) throws DbException{
		Criteria criteria = null;
		try {
			criteria = getSession().createCriteria(entityClass);
			for (Criterion c : criterions) {
				criteria.add(c);
			}
		} catch (Exception e) {
			handleException(e);
		}
		return criteria;
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#createCriteria(java.lang.Class, java.lang.String, boolean, org.hibernate.criterion.Criterion)
     */
	public <T> Criteria createCriteria(Class<T> entityClass, String orderBy,
			boolean isAsc, Criterion... criterions) throws DbException {
		Criteria criteria = null;
		try {
			Assert.hasText(orderBy);
			criteria = createCriteria(entityClass, criterions);
			if (isAsc) {
				criteria.addOrder(Order.asc(orderBy));
			} else {
				criteria.addOrder(Order.desc(orderBy));
			}			
		} catch (Exception e) {
			handleException(e);
		}
		return criteria;
	}
	
	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#createCriteria(java.lang.Class, java.util.List)
     */
	public <T> Criteria createCriteria(Class<T> entityClass, List reasons) throws DbException{
		Criteria criteria = null;
		try {
			criteria = getSession().createCriteria(entityClass);
			if(reasons!=null && reasons.size()>0)
	        for (int i = 0; i < reasons.size(); i++) {
	            Object[] objects = (Object[]) reasons.get(i);
	            Criterion criterion = null;
	            if (objects.length == 2) {     // List集合中的数组元素包含两个子元素（依次为字段名和检索值）
	                criterion = Expression.eq((String) objects[0], objects[1]);
	            } else {     // List集合中的数组元素包含三个子元素（依次为字段名、检索值和匹配条件）
	                String type = (String) objects[2];
	                if (type.equals("min")) {     // 匹配条件为检索大于检索值的记录
                        criterion = Expression.ge((String) objects[0], objects[1]);
	                } else if (type.equals("max")) {     // 匹配条件为检索小于检索值的记录
                        criterion = Expression.le((String) objects[0], objects[1]);
	                } else if (type.equals("like")) {     // 匹配条件为模糊查询
	                    criterion = Expression.like((String) objects[0],"%" + objects[1] + "%");
	                } else if (type.equals("exactitude")) {     // 匹配条件为精确查询
	                    criterion = Expression.eq((String) objects[0], objects[1]);
	                } 
	                else if (type.equals("order")) {     // 对检索结果排序
	                    String order = (String) objects[1];
	                    if (order.equals("asc")) {
	                        criteria.addOrder(Order.asc((String) objects[0]));
	                    } else {
	                        criteria.addOrder(Order.desc((String) objects[0]));
	                    }
	                }
	            }
	            if (criterion!=null)
	            	criteria.add(criterion);
			}
		} catch (Exception e) {
			handleException(e);
		}
		return criteria;
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#find(java.lang.String, java.lang.Object)
     */
	public List find(String hql, Object... values) throws DbException {
		List list = null;
		try {
			Assert.hasText(hql);
			list = getHibernateTemplate().find(hql, values);
			createCriteria(String.class, new ArrayList()).list();
		} catch (Exception e) {
			handleException(e);
		}
		return list;
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#findByNativSql(java.lang.String, java.lang.Class, java.lang.Object)
     */
    public List findByNativSql(String hql, Class classz,Object... values) throws DbException {
        List list = null;
        try {
            Assert.hasText(hql);
            Query query = createNativeQuery(hql,classz,values);
            query.setMaxResults(DEFAULT_FETCH_SIZE);
            list = query.list();
        } catch (Exception e) {
            handleException(e);
        }
        return list;
    }
    
    /* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#findByNativSql(java.lang.String, java.lang.Object)
     */
    public List findByNativSql(String hql,Object... values) throws DbException {
        return findByNativSql(hql,null,values);
    }
    /* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#findByNativSql(java.lang.String)
     */
    public List findByNativSql(String hql) throws DbException {
        return findByNativSql(hql,null,null);
    }   
	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#find(java.lang.String, java.lang.Integer)
     */
	public List find(String hql, Integer rownum ) throws DbException {
		try {
			if (rownum != null && rownum > 0){
				Query query = this.getSession().createQuery(hql);
				query.setMaxResults(rownum);
				return query.list();
			}
			else
				return getHibernateTemplate().find(hql);
		} catch (RuntimeException re) {
			log.error("find " + hql, re);
			throw re;
		}
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#retrieveWithLock(java.lang.String, java.lang.String, org.hibernate.LockMode)
     */
	public List retrieveWithLock(String hql, String aliasName, final LockMode lockMode)
			throws DbException {
		try {
			Query query = this.getSession().createQuery(hql);
			query.setLockMode(aliasName, lockMode);			
			return query.list();
		} catch (RuntimeException re) {
			log.error("find " + hql, re);
			throw re;
		}
	}
	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#findBy(java.lang.Class, java.lang.String, java.lang.Object)
     */
	public <T> List<T> findBy(Class<T> entityClass, String propertyName,
			Object value) throws DbException {
		List<T> list = null;
		try {
			Assert.hasText(propertyName);
			list = createCriteria(entityClass, Restrictions.eq(propertyName, value))
					.list();
		} catch (Exception e) {
			handleException(e);
		}
		return list;
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#findBy(java.lang.Class, java.lang.String, java.lang.Object, java.lang.String, boolean)
     */
	public <T> List<T> findBy(Class<T> entityClass, String propertyName,
			Object value, String orderBy, boolean isAsc) throws DbException {
		List<T> list = null;
		try {
			Assert.hasText(propertyName);
			Assert.hasText(orderBy);
			list =  createCriteria(entityClass, orderBy, isAsc,
					Restrictions.eq(propertyName, value)).list();
		} catch (Exception e) {
			handleException(e);
		}
		return list;
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#findUniqueBy(java.lang.Class, java.lang.String, java.lang.Object)
     */
	public <T> T findUniqueBy(Class<T> entityClass, String propertyName,
			Object value) throws DbException {
		T t = null;
		try {
			Assert.hasText(propertyName);
			t = (T) createCriteria(entityClass,
					Restrictions.eq(propertyName, value)).uniqueResult();
		} catch (Exception e) {
			handleException(e);
		}
		return t;
	}
	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#pagedQueryByNativeSql(java.lang.String, com.topfinance.db.dao.PageReq, java.lang.Object)
     */
	public Page pagedQueryByNativeSql(String hql, PageReq pageReq, Object... values) throws DbException {
		return this.pagedQueryByNativeSql(hql, pageReq, null, values);
	}
	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#pagedQueryByNativeSql(java.lang.String, com.topfinance.db.dao.PageReq, java.lang.Class, java.lang.Object)
     */
	public Page pagedQueryByNativeSql(String hql, PageReq pageReq, Class classz,Object... values) throws DbException {
		Page page = null;
		try {
			log.debug("hql:" +hql);
			Assert.hasText(hql);
			Assert.isTrue(pageReq.getPageNumber() >= 1,
					"pageNo should start from 1");
			//检查是否超出最大值，最大可以fetch1000条记录
			pageReq.setPageSize(checkPageSize(pageReq.getPageSize()));
			page = new Page();
			page.setPageNumber(pageReq.getPageNumber());
			page.setPageSize(pageReq.getPageSize());
			log.debug("pageReq.getCountRec(): " + pageReq.getCountRec());

			if (pageReq.getCountRec()) {
				// Count查询
				String countQueryString = getCountSql(hql);
				Query query = createNativeQuery(countQueryString, values);
				List countlist = query.list();
				int totalRecs = ((BigDecimal) countlist.get(0)).intValue();
				page.setTotalRecs(totalRecs);
				int totalPages = 0;
				int pageSize = pageReq.getPageSize();
				log.debug("pageSize: " + pageSize);
				if (pageSize > 0) {
					totalPages = totalRecs / pageSize;
					if (totalRecs % pageSize > 0) {
						totalPages++;
					}
				}
				page.setTotalPages(totalPages);
			}
			log.debug("page.getTotalPages(): " + page.getTotalPages());
			List list = null;
			if (!pageReq.getCountRec() || !pageReq.getAutoLast()
					|| page.getTotalPages() == 0
					|| (pageReq.getPageNumber() <= page.getTotalPages())) {
				int pageSize = pageReq.getPageSize();
				int startIndex = (pageReq.getPageNumber() - 1) * pageSize;
				Query query = createNativeQuery(hql,classz,values);
				if (pageSize != 0) {
					query.setFirstResult(startIndex);
					query.setMaxResults(pageSize);
				}
				list = query.list();
			} else {
				int lastPage = page.getTotalPages() - 1;
				log.info("There's no data in selected page. Jump to the last page!"
						+ lastPage);
				pageReq.setPageNumber(lastPage);
				int pageSize = pageReq.getPageSize();
				int startIndex = (pageReq.getPageNumber() - 1) * pageSize;
				Query query = createNativeQuery(hql, classz, values);
				if (pageSize != 0) {
					query.setFirstResult(startIndex);
					query.setMaxResults(pageSize);
				}
				list = query.list();
			}
			page.setList(list);
			if(list!=null){
	            log.debug("total count:" +list.size());
			} else{
				log.debug("no data!");
			}
		} catch (Exception e) {
			handleException(e);
		}
		return page;
	}

	private int checkPageSize(int pageSize) {
		pageSize = pageSize>DEFAULT_FETCH_SIZE?DEFAULT_FETCH_SIZE:pageSize;
		return pageSize;
	}
	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#pagedQuery(java.lang.String, com.topfinance.db.dao.PageReq, java.lang.Object)
     */
	public Page pagedQuery(String hql, PageReq pageReq, Object... values) throws DbException {
		Page page = null;
		try {
			log.debug("hql:" +hql);
			Assert.hasText(hql);
			Assert.isTrue(pageReq.getPageNumber() >= 1,
					"pageNo should start from 1");
			//检查是否超出最大值，最大可以fetch1000条记录
			pageReq.setPageSize(checkPageSize(pageReq.getPageSize()));
			page = new Page();
			page.setPageNumber(pageReq.getPageNumber());
			page.setPageSize(pageReq.getPageSize());
			log.debug("pageReq.getCountRec(): " + pageReq.getCountRec());

			if (pageReq.getCountRec()) {
				// Count查询
				String countQueryString = getCountSql(hql);
				List countlist = getHibernateTemplate().find(countQueryString,
						values);
				int totalRecs = ((Long) countlist.get(0)).intValue();
				page.setTotalRecs(totalRecs);
				int totalPages = 0;
				int pageSize = pageReq.getPageSize();
				log.debug("pageSize: " + pageSize);
				if (pageSize > 0) {
					totalPages = totalRecs / pageSize;
					if (totalRecs % pageSize > 0) {
						totalPages++;
					}
				}
				page.setTotalPages(totalPages);
			}
			log.debug("page.getTotalPages(): " + page.getTotalPages());
			List list = null;
			if (!pageReq.getCountRec() || !pageReq.getAutoLast()
					|| page.getTotalPages() == 0
					|| (pageReq.getPageNumber() <= page.getTotalPages())) {
				int pageSize = pageReq.getPageSize();
				int startIndex = (pageReq.getPageNumber() - 1) * pageSize;
				Query query = createQuery(hql, values);
				if (pageSize != 0) {
					query.setFirstResult(startIndex);
					query.setMaxResults(pageSize);
				}
				list = query.list();
			} else {
				int lastPage = page.getTotalPages() - 1;
				log.info("There's no data in selected page. Jump to the last page!"
						+ lastPage);
				pageReq.setPageNumber(lastPage);
				int pageSize = pageReq.getPageSize();
				int startIndex = (pageReq.getPageNumber() - 1) * pageSize;
				Query query = createQuery(hql, values);
				if (pageSize != 0) {
					query.setFirstResult(startIndex);
					query.setMaxResults(pageSize);
				}
				list = query.list();
			}
			page.setList(list);
			if(list!=null){
	            log.debug("total count:" +list.size());
			} else{
				log.debug("no data!");
			}
		} catch (Exception e) {
			handleException(e);
		}
		return page;
	}

	private String getCountSql(String hql) {
		if(hql.indexOf("UNION")>0 || hql.indexOf("union")>0){
			return "select count(*) from (" + hql +")";
		}
		String countQueryString = " select count (*) "
				+ removeSelect(removeOrders(hql));
		return countQueryString;
	}
	
	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#pagedQueryWithValueBean(java.lang.String, com.topfinance.db.dao.PageReq, java.lang.Object)
     */
	public Page pagedQueryWithValueBean(String hql, PageReq pageReq, Object valueBean) throws DbException {
		Page page = null;
		try {
			log.debug("hql:" +hql);
			Assert.hasText(hql);
			Assert.isTrue(pageReq.getPageNumber() >= 1,
					"pageNo should start from 1");
			//检查是否超出最大值，最大可以fetch1000条记录
			pageReq.setPageSize(checkPageSize(pageReq.getPageSize()));
			page = new Page();
			page.setPageNumber(pageReq.getPageNumber());
			page.setPageSize(pageReq.getPageSize());
			log.debug("pageReq.getCountRec(): " + pageReq.getCountRec());

			if (pageReq.getCountRec()) {
				String countQueryString = getCountSql(hql);
				List countlist = getHibernateTemplate().findByValueBean(countQueryString,
						valueBean);
				int totalRecs = ((Long) countlist.get(0)).intValue();
				page.setTotalRecs(totalRecs);
				int totalPages = 0;
				int pageSize = pageReq.getPageSize();
				log.debug("pageSize: " + pageSize);
				if (pageSize > 0) {
					totalPages = totalRecs / pageSize;
					if (totalRecs % pageSize > 0) {
						totalPages++;
					}
				}
				page.setTotalPages(totalPages);
			}
			log.debug("page.getTotalPages(): " + page.getTotalPages());
			List list = null;
			if (!pageReq.getCountRec() || !pageReq.getAutoLast()
					|| page.getTotalPages() == 0
					|| (pageReq.getPageNumber() <= page.getTotalPages())) {
				int pageSize = pageReq.getPageSize();
				int startIndex = (pageReq.getPageNumber() - 1) * pageSize;
				Query query = createQueryWithValueBean(hql, valueBean);
				if (pageSize != 0) {
					query.setFirstResult(startIndex);
					query.setMaxResults(pageSize);
				}
				list = query.list();
			} else {
				int lastPage = page.getTotalPages() - 1;
				log.info("There's no data in selected page. Jump to the last page!"
						+ lastPage);
				pageReq.setPageNumber(lastPage);
				int pageSize = pageReq.getPageSize();
				int startIndex = (pageReq.getPageNumber() - 1) * pageSize;
				Query query = createQueryWithValueBean(hql, valueBean);
				if (pageSize != 0) {
					query.setFirstResult(startIndex);
					query.setMaxResults(pageSize);
				}
				list = query.list();
			}
			page.setList(list);
			if(list!=null){
	            log.debug("total count:" +list.size());
			} else{
				log.debug("no data!");
			}
		} catch (Exception e) {
			handleException(e);
		}
		return page;
	}
	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#retrieveCount(java.lang.String, java.lang.Object)
     */
	public long retrieveCount(String hql,Object... values) throws DbException{
		long rtnValue =0 ;
		try {
			Iterator iterator = getHibernateTemplate().iterate(hql, values);
			if(iterator!=null){
				rtnValue = ((Long)iterator.next()).longValue();
			}
		} catch (Exception e) {
			handleException(e);
		}
		return rtnValue;
	}
	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#retrieveCountWithValueBean(java.lang.String, java.lang.Object)
     */
	public long retrieveCountWithValueBean(String hql,Object valueBean) throws DbException{
		long rtnValue =0 ;
		try {
			Query query = createQueryWithValueBean(hql, valueBean);
			if(query!=null){
				rtnValue = ((Long)((Object[])query.list().get(0))[0]).longValue();
			}
		} catch (Exception e) {
			handleException(e);
		}
		return rtnValue;
	}	
	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#pagedQuery(org.hibernate.Criteria, com.topfinance.db.dao.PageReq)
     */
	public Page pagedQuery(Criteria criteria, PageReq pageReq) throws DbException {
		Page page = null;
		try {
			Assert.notNull(criteria);
			Assert.isTrue(pageReq.getPageNumber() >= 1,
					"pageNo should start from 1");
			//检查是否超出最大值，最大可以fetch1000条记录
			pageReq.setPageSize(checkPageSize(pageReq.getPageSize()));
			page = new Page();
			page.setPageNumber(pageReq.getPageNumber());
			page.setPageSize(pageReq.getPageSize());
			log.debug("pageReq.getCountRec(): " + pageReq.getCountRec());
			CriteriaImpl impl = (CriteriaImpl) criteria;

			// 先把Projection和OrderBy条件取出来,清空两者来执行Count操作
			Projection projection = impl.getProjection();
			List<CriteriaImpl.OrderEntry> orderEntries;
			try {
				orderEntries = (List) BeanUtilsEx.forceGetProperty(impl,
						"orderEntries");
				BeanUtilsEx.forceSetProperty(impl, "orderEntries", new ArrayList());
			} catch (Exception e) {
				throw new InternalError(" Runtime Exception impossibility throw ");
			}

			if (pageReq.getCountRec()) {
				// Count查询//todo
				int totalRecs = (Integer) criteria.setProjection(
						Projections.rowCount()).uniqueResult();
				page.setTotalRecs(totalRecs);
				int totalPages = 0;
				int pageSize = pageReq.getPageSize();
				log.debug("pageSize: " + pageSize);
				if (pageSize > 0) {
					totalPages = totalRecs / pageSize;
					if (totalRecs % pageSize > 0) {
						totalPages++;
					}
				}
				page.setTotalPages(totalPages);
			}

			// 将之前的Projection和OrderBy条件重新设回去
			criteria.setProjection(projection);
			if (projection == null) {
				criteria.setResultTransformer(CriteriaSpecification.ROOT_ENTITY);
			}

			try {
				BeanUtilsEx.forceSetProperty(impl, "orderEntries", orderEntries);
			} catch (Exception e) {
				throw new InternalError(" Runtime Exception impossibility throw ");
			}
			List list = null;
			if (!pageReq.getCountRec() || !pageReq.getAutoLast()
					|| page.getTotalPages() == 0
					|| (pageReq.getPageNumber() <= page.getTotalPages())) {
				int pageSize = pageReq.getPageSize();
				int startIndex = (pageReq.getPageNumber() - 1) * pageSize;
				if (pageSize != 0) {
					criteria.setFirstResult(startIndex);
					criteria.setMaxResults(pageSize);
				}
				list = criteria.list();
			} else {
				int lastPage = page.getTotalPages() - 1;
				log.info("There's no data in selected page. Jump to the last page!"
						+ lastPage);
				pageReq.setPageNumber(lastPage);
				int pageSize = pageReq.getPageSize();
				int startIndex = (pageReq.getPageNumber() - 1) * pageSize;
				if (pageSize != 0) {
					criteria.setFirstResult(startIndex);
					criteria.setMaxResults(pageSize);
				}
				list = criteria.list();
			}

			page.setList(list);
			if(list!=null){
	            log.debug("total count:" +list.size());
			} else{
				log.debug("no data!");
			}			
			return page;
		} catch (Exception e) {
			handleException(e);
		}
		return page;
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#pagedQuery(java.lang.Class, com.topfinance.db.dao.PageReq, org.hibernate.criterion.Criterion)
     */
	public Page pagedQuery(Class entityClass, PageReq pageReq,
			Criterion... criterions) throws DbException{
		Page page = null;
		try {
			Criteria criteria = createCriteria(entityClass, criterions);
			page =  pagedQuery(criteria, pageReq);
		} catch (Exception e) {
			handleException(e);
		}
		return page;
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#pagedQuery(java.lang.Class, com.topfinance.db.dao.PageReq, java.lang.String, boolean, org.hibernate.criterion.Criterion)
     */
	public Page pagedQuery(Class entityClass, PageReq pageReq, String orderBy,
			boolean isAsc, Criterion... criterions) throws DbException {
		Page page = null;
		try {
			Criteria criteria = createCriteria(entityClass, orderBy, isAsc,
					criterions);
			page =  pagedQuery(criteria, pageReq);
		} catch (Exception e) {
			handleException(e);
		}
		return page;
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#isUnique(java.lang.Class, java.lang.Object, java.lang.String)
     */
	public <T> boolean isUnique(Class<T> entityClass, Object entity,
			String uniquePropertyNames) throws DbException{
		boolean rtnResult = false;
		try {
			Assert.hasText(uniquePropertyNames);
			Criteria criteria = createCriteria(entityClass).setProjection(
					Projections.rowCount());
			String[] nameList = uniquePropertyNames.split(",");
			try {
				// 循环加入唯一列
				for (String name : nameList) {
					criteria.add(Restrictions.eq(name, PropertyUtils.getProperty(
							entity, name)));
				}
				// 以下代码为了如果是update的情况,排除entity自身.
				String idName = getIdName(entityClass);
				// 取得entity的主键值
				Serializable id = getId(entityClass, entity);
				// 如果id!=null,说明对象已存在,该操作为update,加入排除自身的判断
				if (id != null){
					criteria.add(Restrictions.not(Restrictions.eq(idName, id)));
				}
			} catch (Exception e) {
				ReflectionUtils.handleReflectionException(e);
			}
			rtnResult = (Integer) criteria.uniqueResult() == 0;
		} catch (Exception e) {
			handleException(e);
		}
		return rtnResult;
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#getId(java.lang.Class, java.lang.Object)
     */
	public Serializable getId(Class entityClass, Object entity) throws DbException{
		Serializable id = null;
		try {
			Assert.notNull(entity);
			Assert.notNull(entityClass);
			id = (Serializable) PropertyUtils.getProperty(entity,
					getIdName(entityClass));
		} catch (Exception e) {
			handleException(e);
		}
		return id;
	}

	/* (non-Javadoc)
     * @see com.topfinance.db.dao.IDao#getIdName(java.lang.Class)
     */
	public String getIdName(Class clazz) throws DbException {
		String idName =null;
		try {
			Assert.notNull(clazz);
			ClassMetadata meta = getSessionFactory().getClassMetadata(clazz);
			Assert.notNull(meta, "Class " + clazz
					+ " not define in hibernate session factory.");
			idName = meta.getIdentifierPropertyName();
			Assert.hasText(idName, clazz.getSimpleName()
					+ " has no identifier property define.");
		} catch (Exception e) {
			handleException(e);
		}
		return idName;
	}

	protected void handleException(Exception e) throws DbException {
		log.error("error:",e);
		if (e instanceof DbException) {
			throw (DbException) e;
		} else {
			throw new DbException(e);
		}
	}
	
	/**
	 * 去除hql的select 子句，未考虑union的情况,用于pagedQuery.
	 * 
	 * @see #pagedQuery(String,int,int,Object[])
	 */
	private static String removeSelect(String hql) {
			Assert.hasText(hql);
			int beginPos = hql.toLowerCase().indexOf("from");
			Assert.isTrue(beginPos != -1, " hql : " + hql
					+ " must has a keyword 'from'");
			return hql.substring(beginPos);
	}

	/**
	 * 去除hql的orderby 子句，用于pagedQuery.
	 * 
	 * @see #pagedQuery(String,int,int,Object[])
	 */
	private static String removeOrders(String hql) {
		Assert.hasText(hql);
		Pattern p = Pattern.compile("order\\s*by[\\w|\\W|\\s|\\S]*",
				Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(hql);
		StringBuffer sb = new StringBuffer();
		while (m.find()) {
			m.appendReplacement(sb, "");
		}
		m.appendTail(sb);
		return sb.toString();
	}
	/**
	 * 拼sql
	 * @param originalWhere
	 * @param newPart
	 * @return
	 */
    protected String appendSqlWhere(String originalWhere, String newPart) {
        return appendSqlWhere(originalWhere,newPart,"and");
    }
    /**
     * 拼sql
     * @param originalWhere
     * @param newPart
     * @param conditionRelationShip
     * @return
     */
    protected String appendSqlWhere(String originalWhere, String newPart,String conditionRelationShip) {
        log.debug("originalWhere:" +originalWhere+";newPart:"+newPart+";conditionRelationShip" +conditionRelationShip);
    	String rtnStr = originalWhere;
    	if(StringUtils.isBlank(newPart)){
    		log.error("newPart is blank, please check it.");
    		return rtnStr;
    	}
        if(StringUtils.isBlank(rtnStr)){
        	return newPart;
        }
   		rtnStr = rtnStr + " " + conditionRelationShip +" " + newPart;
        return rtnStr;
    }
    /**
     *  Checks if a String is whitespace, empty ("") or null.
     *  shortcut
     * @param value
     */
    protected boolean isBlank(String str){
    	return StringUtils.isBlank(str);
    }
    /**
     *  Checks if a String is not empty (""), not null and not whitespace only.
     *  Just shortcut
     * @param str
     * @return
     */
    protected boolean isNotBlank(String str) {
    	return StringUtils.isNotBlank(str);
    }
    /**
     *  Checks if a String is empty ("") or null.
     *  shortcut
     * @param value
     */
    protected boolean isEmpty(String str){
    	return StringUtils.isEmpty(str);
    }
    /**
     *  Checks if a String is not empty ("") and not null.
     *  Just shortcut
     * @param str
     * @return
     */
    protected boolean isNotEmpty(String str) {
    	return StringUtils.isNotEmpty(str);
    }
//	protected PageReq getPageReq(PagedForm pagedForm) {
//		if(pagedForm==null){
//			return new PageReq();
//		}
//		PageReq pageReq = new PageReq();
//		pageReq.setPageNumber(pagedForm.get_pageNumber());
//		if (pagedForm.get_pageSize() > 0) {
//			pageReq.setPageSize(pagedForm.get_pageSize());
//		}
//		return pageReq;
//	}
}