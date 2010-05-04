package com.tibco.cmidemo.web.dwr;

import java.util.List;

import com.tibco.cmidemo.dao.ColumnConst;
import com.tibco.cmidemo.hibernate.GiProtbinding;
import com.tibco.cmidemo.web.WebAppException;

/**
 * 
 * ProtocolBinding
 * 
 * @author xliu May 4, 2010
 *
 */
public class PROTBINDING extends DWR {

    public static List<GiProtbinding> getProtBindingList(String parentId) throws WebAppException {
        
        return getList(GiProtbinding.class, parentId, ColumnConst.B_BININDEX);
    }
    
    public static GiProtbinding getProtBindingByID(long id) throws WebAppException {
        
        return getById(GiProtbinding.class, id);
    }
    
    public static void saveProtBinding(GiProtbinding pb) throws WebAppException {
        
        save(pb);
    }
    
    public static void removeProtBinding(List<Long> pbs) throws WebAppException {
        
        remove(pbs, GiProtbinding.class);
    }
    
    
}
