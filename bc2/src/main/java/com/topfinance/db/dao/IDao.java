package com.topfinance.db.dao;



import java.io.Serializable;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.LockMode;
import org.hibernate.Query;
import org.hibernate.criterion.Criterion;

public interface IDao {

    /**
     * 根据ID获取对象. 如果对象不存在，抛出异常.
     */
    public abstract <T> T get(Class<T> entityClass, Serializable id) throws DbException;

    /**
     * 获取全部对象.
     */
    public abstract <T> List<T> getAll(Class<T> entityClass) throws DbException;

    /**
     * 获取全部对象,带排序字段与升降序参数.
     */
    public abstract <T> List<T> getAll(Class<T> entityClass, String orderBy, boolean isAsc)
        throws DbException;

    /**
     * 保存对象.
     */
    public abstract void save(Object obj) throws DbException;

    public abstract <T> T merge(Class<T> entityClass) throws DbException;

    public abstract void update(Object obj) throws DbException;

    public abstract void saveOrUpdate(Object obj) throws DbException;

    /**
     * 删除对象.
     */
    public abstract void remove(Object o) throws DbException;

    /**
     * 根据ID删除对象.
     */
    public abstract <T> void removeById(Class<T> entityClass, Serializable id) throws DbException;

    public abstract void flush() throws DbException;

    public abstract void clear() throws DbException;

    /**
     * 创建Query对象.
     * 对于需要first,max,fetchsize,cache,cacheRegion等诸多设置的函数,可以在返回Query后自行设置.
     * 留意可以连续设置,如下：
     * 
     * <pre>
     * dao.getQuery(hql).setMaxResult(100).setCacheable(true).list();
     * </pre>
     * 
     * 调用方式如下：
     * 
     * <pre>
     *          dao.createQuery(hql)
     *          dao.createQuery(hql,arg0);
     *          dao.createQuery(hql,arg0,arg1);
     *          dao.createQuery(hql,new Object[arg0,arg1,arg2])
     * </pre>
     * 
     * @param values
     *            可变参数.
     */
    public abstract Query createQuery(String hql, Object... values) throws DbException;

    public abstract Query createNativeQuery(String hql, Object... values) throws DbException;

    public abstract Query createNativeQuery(String hql, Class classz, Object... values) throws DbException;

    /**
     * 
     * @param hql
     * @param valueBean
     * @return
     * @throws DbException
     */
    public abstract Query createQueryWithValueBean(String hql, Object valueBean) throws DbException;

    /**
     * 创建Criteria对象.
     * 
     * @param criterions
     *            可变的Restrictions条件列表,见{@link #createQuery(String,Object...)}
     */
    public abstract <T> Criteria createCriteria(Class<T> entityClass, Criterion... criterions)
        throws DbException;

    /**
     * 创建Criteria对象，带排序字段与升降序字段.
     * 
     * @see #createCriteria(Class,Criterion[])
     */
    public abstract <T> Criteria createCriteria(Class<T> entityClass, String orderBy, boolean isAsc,
                                                Criterion... criterions) throws DbException;

    /**
     * 创建Criteria对象
     * List集合中的数组元素包含三个子元素（依次为字段名、检索值和匹配条件）
     * 匹配条件:min;max;like;exactitude;order如有其它需求可再添加
     * @param <T>
     * @param entityClass
     * @param reasons
     * @return
     * @throws DbException
     */
    public abstract <T> Criteria createCriteria(Class<T> entityClass, List reasons) throws DbException;

    /**
     * 根据hql查询,直接使用HibernateTemplate的find函数.
     * 
     * @param values
     *            可变参数,见{@link #createQuery(String,Object...)}
     */
    public abstract List find(String hql, Object... values) throws DbException;

    /**
     * 用native sql来检索
     * @param hql
     * @param values
     * @return
     * @throws DbException
     */
    public abstract List findByNativSql(String hql, Class classz, Object... values) throws DbException;

    public abstract List findByNativSql(String hql, Object... values) throws DbException;

    public abstract List findByNativSql(String hql) throws DbException;

    /**
     * 根据hql查询,直接使用HibernateTemplate的find函数.
     * @param hql
     * @param rownum: 取有限条数
     * @param values
     * @return
     * @throws DbException
     */
    public abstract List find(String hql, Integer rownum) throws DbException;

    public abstract List retrieveWithLock(String hql, String aliasName, final LockMode lockMode)
        throws DbException;

    /**
     * 根据属性名和属性值查询对象.
     * 
     * @return 符合条件的对象列表
     */
    public abstract <T> List<T> findBy(Class<T> entityClass, String propertyName, Object value)
        throws DbException;

    /**
     * 根据属性名和属性值查询对象,带排序参数.
     */
    public abstract <T> List<T> findBy(Class<T> entityClass, String propertyName, Object value,
                                       String orderBy, boolean isAsc) throws DbException;

    /**
     * 根据属性名和属性值查询唯一对象.
     * 
     * @return 符合条件的唯一对象 or null if not found.
     */
    public abstract <T> T findUniqueBy(Class<T> entityClass, String propertyName, Object value)
        throws DbException;

    public abstract Page pagedQueryByNativeSql(String hql, PageReq pageReq, Object... values)
        throws DbException;

    /**
     * 分页查询函数，使用hql.
     * 参数的格式是占位符的写，即形如from User user where user.name like ?
     * @param pageNo 页号.
     */
    public abstract Page pagedQueryByNativeSql(String hql, PageReq pageReq, Class classz, Object... values)
        throws DbException;

    /**
     * 分页查询函数，使用hql.
     * 参数的格式是占位符的写，即形如from User user where user.name like ?
     * @param pageNo 页号.
     */
    public abstract Page pagedQuery(String hql, PageReq pageReq, Object... values) throws DbException;

    /**
     * 分页查询函数，使用hql.
     * 参数将用valueBean的形式传入，即形如from User user where user.name like :name
     * 则传入的Object中，必须含有getName()方法
     * @param pageNo 页号.
     */
    public abstract Page pagedQueryWithValueBean(String hql, PageReq pageReq, Object valueBean)
        throws DbException;

    /**
     * with ? format
     * @param hql
     * @param values
     * @return
     * @throws DbException
     */
    public abstract long retrieveCount(String hql, Object... values) throws DbException;

    /**
     * with ? format
     * @param hql
     * @param values
     * @return
     * @throws DbException
     */
    public abstract long retrieveCountWithValueBean(String hql, Object valueBean) throws DbException;

    /**
     * 分页查询函数，使用已设好查询条件与排序的<code>Criteria</code>.
     * 
     * @param pageNo
     *            页号,从1开始.
     * @return 含总记录数和当前页数据的Page对象.
     */
    public abstract Page pagedQuery(Criteria criteria, PageReq pageReq) throws DbException;

    /**
     * 分页查询函数，根据entityClass和查询条件参数创建默认的<code>Criteria</code>.
     * 
     * @param pageNo
     *            页号,从1开始.
     * @return 含总记录数和当前页数据的Page对象.
     */
    public abstract Page pagedQuery(Class entityClass, PageReq pageReq, Criterion... criterions)
        throws DbException;

    /**
     * 分页查询函数，根据entityClass和查询条件参数,排序参数创建默认的<code>Criteria</code>.
     * 
     * @param pageNo
     *            页号,从1开始.
     * @return 含总记录数和当前页数据的Page对象.
     */
    public abstract Page pagedQuery(Class entityClass, PageReq pageReq, String orderBy, boolean isAsc,
                                    Criterion... criterions) throws DbException;

    /**
     * 判断对象某些属性的值在数据库中是否唯一.
     * 
     * @param uniquePropertyNames
     *            在POJO里不能重复的属性列表,以逗号分割 如"name,loginid,password"
     */
    public abstract <T> boolean isUnique(Class<T> entityClass, Object entity, String uniquePropertyNames)
        throws DbException;

    /**
     * 取得对象的主键值,辅助函数.
     */
    public abstract Serializable getId(Class entityClass, Object entity) throws DbException;

    /**
     * 取得对象的主键名,辅助函数.
     */
    public abstract String getIdName(Class clazz) throws DbException;

}
