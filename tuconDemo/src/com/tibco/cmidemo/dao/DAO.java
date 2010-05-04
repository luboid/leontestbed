package com.tibco.cmidemo.dao;

import com.tibco.cmidemo.hibernate.ModelObject;

import java.util.Collection;
import java.util.List;


public interface DAO {

    public List getList(String hql);
    public List getList(Criteria criteria);
    public List getList(Class clazz);
    
    public ModelObject getById(Long id, Class clazz);
    public ModelObject getOne(Criteria criteria);
    
    public void save(ModelObject obj);
    public boolean deleteById(Long id, Class clazz);
    public boolean delete(ModelObject obj);
    public void deleteAll(List objs);
    

}
