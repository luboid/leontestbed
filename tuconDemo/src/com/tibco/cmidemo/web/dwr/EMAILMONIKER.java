package com.tibco.cmidemo.web.dwr;

import java.util.List;

import com.tibco.cmidemo.dao.ColumnConst;
import com.tibco.cmidemo.hibernate.GiEmailmoniker;
import com.tibco.cmidemo.web.WebAppException;

/**
 * 
 * EmailMoniker
 * 
 * @author xliu May 4, 2010
 *
 */
public class EMAILMONIKER extends DWR {

    public static List<GiEmailmoniker> getEmailList(String parentId) throws WebAppException {
        
        return getList(GiEmailmoniker.class, parentId, ColumnConst.E_BININDEX);
    }
    
    public static GiEmailmoniker getEmailByID(long id) throws WebAppException {
        
        return getById(GiEmailmoniker.class, id);
    }
    
    public static GiEmailmoniker saveEmail(GiEmailmoniker email) throws WebAppException {
        
        save(email);
        
        return email;
    }
    
    public static void removeEmail(List<Long> emails) throws WebAppException {
        
        remove(emails, GiEmailmoniker.class);
    }
}
