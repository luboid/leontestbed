package com.tibco.cmidemo.web.dwr;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.tibco.cmidemo.dao.DAO;
import com.tibco.cmidemo.hibernate.ModelObject;
import com.tibco.cmidemo.util.DBUtil;
import com.tibco.cmidemo.util.SpringUtil;
import com.tibco.cmidemo.web.WebAppException;

/**
 * @author xliu May 4, 2010
 * 
 */
public class DWR {

    protected static DAO DAO() {
        return SpringUtil.getDAO();
    }

    @SuppressWarnings("unchecked")
    protected static <T> List<T> getList(Class<T> clazz, String parentId, String parentColumn) throws WebAppException {

        try {
            return DAO().getList(DBUtil.createCriteria(clazz, parentColumn, parentId));
        } catch (DataAccessException de) {
            throw new WebAppException(de.getMessage());
        }
    }
    
    @SuppressWarnings("unchecked")
    protected static <T> List<T> getList(Class<T> clazz) throws WebAppException {

        try {
            return DAO().getList(clazz);
        } catch (DataAccessException de) {
            throw new WebAppException(de.getMessage());
        }
    }

    @SuppressWarnings("unchecked")
    protected static <T> T getById(Class<T> clazz, long id) throws WebAppException {

        try {
            return (T) DAO().getById(id, clazz);
        } catch (DataAccessException de) {
            throw new WebAppException(de.getMessage());
        }

    }

    protected static void save(ModelObject mo) throws WebAppException {

        try {
            DAO().save(mo);
        } catch (DataAccessException de) {
            throw new WebAppException(de.getMessage());
        }

    }

    protected static void remove(ModelObject mo) throws WebAppException {

        try {
            DAO().delete(mo);
        } catch (DataAccessException de) {
            throw new WebAppException(de.getMessage());
        }

    }

    protected static void remove(List<Long> ids, Class<? extends ModelObject> clazz) throws WebAppException {

        try {
            for(Long id : ids) {
                DAO().deleteById(id, clazz);
            }
        } catch (DataAccessException de) {
            throw new WebAppException(de.getMessage());
        }

    }

}
