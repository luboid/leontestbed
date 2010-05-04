package com.tibco.cmidemo.web.dwr;

import java.util.List;

import com.tibco.cmidemo.dao.ColumnConst;
import com.tibco.cmidemo.hibernate.GiOpbinding;
import com.tibco.cmidemo.web.WebAppException;

/**
 * 
 * OperationBinding
 * 
 * @author xliu May 4, 2010
 *
 */
public class OPBINDING extends DWR {

    public static List<GiOpbinding> getOpBindingList(String parentId) throws WebAppException {
        
        return getList(GiOpbinding.class, parentId, ColumnConst.PBV_BININDEX);
    }
    
    public static GiOpbinding getOpBindingByID(long id) throws WebAppException {
        
       return getById(GiOpbinding.class, id);
        
    }
    
    public static void saveOpBinding(GiOpbinding opb) throws WebAppException {
        
        save(opb);
    }
    
    public static void removeOpBinding(List<Long> opbs) throws WebAppException {
        
        remove(opbs, GiOpbinding.class);
    }
}
