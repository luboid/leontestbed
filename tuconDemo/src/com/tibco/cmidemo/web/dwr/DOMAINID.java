package com.tibco.cmidemo.web.dwr;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.tibco.cmidemo.dao.ColumnConst;
import com.tibco.cmidemo.dao.Condition;
import com.tibco.cmidemo.dao.Criteria;
import com.tibco.cmidemo.hibernate.GiDomainid;
import com.tibco.cmidemo.web.WebAppException;

/**
 * 
 * Domain-ID
 * 
 * @author xliu May 4, 2010
 *
 */
public class DOMAINID extends DWR {

    public static List<GiDomainid> getDomainIdListByParentID(String parentId) throws WebAppException {
        
        return getList(GiDomainid.class, parentId, ColumnConst.P_BININDEX);
    }
    
    public static List<GiDomainid> getDomainIdListByAS2Flag(boolean isAS2) throws WebAppException {
        
        try {
            Criteria c = new Criteria(GiDomainid.class);
            c.addCondition(new Condition(ColumnConst.DOMAIN_TYPE, (isAS2 ? Condition.EQUALS : Condition.NOT_EQUALS), "AS2_ID"));
            return DAO().getList(c);
        } catch (DataAccessException de) {
            throw new WebAppException(de);
        }
        
    }

    public static GiDomainid getDomainIdByID(long id) throws WebAppException {
        
        return getById(GiDomainid.class, id);
    }
    
    public static void saveDomainId(GiDomainid di) throws WebAppException {
        
        save(di);
    }
    
    public static void removeDomainId(List<Long> dis) throws WebAppException {
        
        remove(dis, GiDomainid.class);
    }
}
