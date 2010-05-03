/**
* Author: Bob Chen
*/

package com.tibco.cmidemo.dao.impl;

import com.tibco.cmidemo.dao.DAO;
import com.tibco.cmidemo.hibernate.ModelObject;

import java.io.Serializable;
import java.sql.SQLException;
import java.util.Collection;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

public class DAOImpl extends HibernateDaoSupport implements DAO {
    protected Log log = LogFactory.getLog(getClass());


//    public int getCount(String hql){  
//        Number count = (Number)getHibernateTemplate().find("select count(*) "+hql).listIterator().next();
//        return count.intValue();
//    }
    
    public List getList(String hql){          
        return getHibernateTemplate().find(hql);
    }
    
    public List getList(Class clazz){        
        return getHibernateTemplate().find("from " + clazz.getSimpleName());
    }
    

    
    public ModelObject getById(Long id, Class clazz){
        return (ModelObject)getHibernateTemplate().get(clazz, id);
    }
    
    public void save(ModelObject obj) {
        if (obj == null) {
            throw new IllegalArgumentException("obj = null");
        }
//        if (getById(getId(obj), obj.getClass()) == null) {
        if(getId(obj)==null) {
            Serializable id = getHibernateTemplate().save(obj);
            setId(obj, (Long)id);
        } else {
            getHibernateTemplate().update(obj);
        }
//        ModelObject _obj = (ModelObject)getHibernateTemplate().merge(obj);
//        setId(obj, getId(_obj));
    }    

    
    public boolean deleteById(Long id, Class clazz) {
        ModelObject obj = getById(id, clazz);
        if (obj == null) {
//            throw new RuntimeException("Object not found for ID: "+id);
            return false;
        }
        
        getHibernateTemplate().delete(obj);
        return true;
    }    
    
    public boolean delete(ModelObject obj) {
        if (obj == null) {
            throw new IllegalArgumentException("obj = null");
        }
        
        getHibernateTemplate().delete(obj);
        return true;
    }    
    
    public void deleteAll(Collection<ModelObject> objs) {
        if (objs == null) {
            throw new IllegalArgumentException("objs = null");
        }
        
        getHibernateTemplate().deleteAll(objs);
    }    
    

    
    /**
     * Require all ModelObject have a getId() or getID() method
     */
    private Long getId(ModelObject obj) {

            return obj.getBinindex();

    }
    
    private void setId(ModelObject obj, Long id) {
        obj.setBinindex(id);

    }
}
