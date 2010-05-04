package com.tibco.cmidemo.web.dwr;

import java.util.List;

import com.tibco.cmidemo.dao.ColumnConst;
import com.tibco.cmidemo.hibernate.GiContact;
import com.tibco.cmidemo.web.WebAppException;

/**
 * 
 * Contact
 * 
 * @author xliu May 4, 2010
 *
 */
public class CONTACT extends DWR {

    public static List<GiContact> getContListByLoc(String parentId) throws WebAppException {
        
        return getList(GiContact.class, parentId, ColumnConst.L_BININDEX);
    }
    
    public static GiContact getContListByID(long id) throws WebAppException {
        
        return getById(GiContact.class, id);
    }
    
    public static void saveCont(GiContact cont) throws WebAppException {
        
        save(cont);
    }
    
    public static void removeCont(List<Long> conts) throws WebAppException {
        
        remove(conts, GiContact.class);
    }
}
