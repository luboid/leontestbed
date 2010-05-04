package com.tibco.cmidemo.web.dwr;

import java.util.List;

import com.tibco.cmidemo.dao.ColumnConst;
import com.tibco.cmidemo.hibernate.GiPkistoreitem;
import com.tibco.cmidemo.web.WebAppException;

/**
 * @author xliu May 4, 2010
 *
 */
public class PKISTOREITEM extends DWR {

    public static List<GiPkistoreitem> getCredList(String parentId) throws WebAppException {
        
        return getList(GiPkistoreitem.class, parentId, ColumnConst.TP_BININDEX);
    }
    
    public static GiPkistoreitem getCredByID(long id) throws WebAppException {
        
        return getById(GiPkistoreitem.class, id);
    }
    
    public static void saveCred(GiPkistoreitem cred) throws WebAppException {
        
        save(cred);
    }
    
    public static void removeCred(List<Long> creds) throws WebAppException {
        
        remove(creds, GiPkistoreitem.class);
    }
}
