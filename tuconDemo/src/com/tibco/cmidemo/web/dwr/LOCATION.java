package com.tibco.cmidemo.web.dwr;

import java.util.List;

import com.tibco.cmidemo.dao.ColumnConst;
import com.tibco.cmidemo.hibernate.GiLocation;
import com.tibco.cmidemo.web.WebAppException;

/**
 * 
 * BizLocation
 * 
 * @author xliu May 4, 2010
 *
 */
public class LOCATION extends DWR {

    public static List<GiLocation> getLocListByPA(String parentId) throws WebAppException {
        
        return getList(GiLocation.class, parentId, ColumnConst.TP_BININDEX);
    }
    
    public static GiLocation getLocByID(long id) throws WebAppException {
       
        return getById(GiLocation.class, id);
    }
    
    public static void saveLoc(GiLocation loc) throws WebAppException {
        
        save(loc);
    }
    
    public static void removeLoc(List<Long> locs) throws WebAppException {
        
        remove(locs, GiLocation.class);
    }
}
