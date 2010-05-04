package com.tibco.cmidemo.web.dwr;

import java.util.List;

import com.tibco.cmidemo.dao.ColumnConst;
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

    public static List<GiDomainid> getDomainIdList(String parentId) throws WebAppException {
        
        return getList(GiDomainid.class, parentId, ColumnConst.P_BININDEX);
    }
    
    public static GiDomainid getDomainId(long id) throws WebAppException {
        
        return getById(GiDomainid.class, id);
    }
    
    public static void saveDomainId(GiDomainid di) throws WebAppException {
        
        save(di);
    }
    
    public static void removeDomainId(List<Long> dis) throws WebAppException {
        
        remove(dis, GiDomainid.class);
    }
}
