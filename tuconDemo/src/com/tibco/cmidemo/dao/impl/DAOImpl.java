/**
* Author: Bob Chen
*/

package com.tibco.cmidemo.dao.impl;

import com.tibco.cmidemo.dao.Condition;
import com.tibco.cmidemo.dao.Criteria;
import com.tibco.cmidemo.dao.DAO;
import com.tibco.cmidemo.dao.Order;
import com.tibco.cmidemo.hibernate.ModelObject;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.Collection;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
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
    
    public List getList(Criteria criteria){
        String hql = getHql(criteria);
        return getHibernateTemplate().find(hql);
    }
    
    public List getList(Class clazz){        
        return getHibernateTemplate().find("from " + clazz.getSimpleName());
    }
    

    
    public ModelObject getById(Long id, Class clazz){
        return (ModelObject)getHibernateTemplate().get(clazz, id);
    }
    public ModelObject getOne(Criteria criteria) {
        ModelObject obj = null;
        List list = getList(criteria);
        if(list!=null && !list.isEmpty()) {
            obj = (ModelObject)list.get(0);
        }
        return obj;
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
    
    
    protected String getHql(Criteria criteria) {
        String className = criteria.getModelClazz().getSimpleName();
        StringBuffer hql = new StringBuffer("from " + className + " " + className);

        hql.append(getWhereClause(criteria));
        return hql.toString();

    }
    
    

    
    protected String getWhereClause(Criteria criteria) {
        String objName = criteria.getModelClazz().getSimpleName();
        StringBuffer hql = new StringBuffer();
        if (criteria != null && criteria.getConditions().size() > 0) {
            hql.append(" where ");
            
            boolean first = true;
            List<Condition> conds = criteria.getConditions();
            for (Condition cond : conds) {
                if (!first) {
                    hql.append(" and ");
                }
                first = false;
                addCondtion(criteria.getModelClazz(), hql, cond, objName);
            }
        }
        if (criteria != null && criteria.getOrders().size() > 0) {
            hql.append(" order by ");
            
            boolean first = true;
            List<Order> orders = criteria.getOrders();
            for (Order order : orders) {
                if (!first) {
                    hql.append(", ");
                }
                first = false;
                hql.append(objName).append("."+order.getField());
                if (order.isAscend()) {
                    hql.append(" asc");
                } else {
                    hql.append(" desc");
                }
            }
        }
        return hql.toString();
    }

    
    private void addCondtion(Class modelClazz, StringBuffer hql, Condition cond, String objName) {
        int op = cond.getOperator();
        if (op == Condition.LIKE) {
            hql.append(objName).append("."+cond.getField());
            hql.append(" LIKE '%").append(cond.getValue()).append("%'");
        } else if (op == Condition.CONTAINS) {
            hql.append(cond.getValue()).append(" member of ").append(objName).append("."+cond.getField());
        } else if (op == Condition.GREATERTHAN) {
            hql.append(objName).append("."+cond.getField());
            hql.append(" >= ").append(cond.getValue());
        } else if (op == Condition.LESSTHAN) {
            hql.append(objName).append("."+cond.getField());
            hql.append(" <= ").append(cond.getValue());
        } else if (op == Condition.EQUALS) {
            hql.append(objName).append("."+cond.getField());
            hql.append(" = ");
            Field fld = null;
            try {
                fld = modelClazz.getDeclaredField(cond.getField());
            } catch (SecurityException e) {
                throw new RuntimeException(e.toString());
            } catch (NoSuchFieldException e) {
                throw new RuntimeException("No field found: " + cond.getField());
            }
            
            if (fld.getType() == String.class) {
                hql.append("'").append(cond.getValue()).append("'");
            } else {
                hql.append(cond.getValue());
            }
        } else {
            throw new RuntimeException("Unknown operator: " + op);
        }
    }    
}
