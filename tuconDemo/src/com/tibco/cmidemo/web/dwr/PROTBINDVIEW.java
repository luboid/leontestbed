package com.tibco.cmidemo.web.dwr;

import java.util.List;

import com.tibco.cmidemo.dao.ColumnConst;
import com.tibco.cmidemo.hibernate.GiProtbindview;
import com.tibco.cmidemo.web.WebAppException;

/**
 * 
 * ProtocolBindingView
 * 
 * @author xliu May 4, 2010
 *
 */
public class PROTBINDVIEW extends DWR {

    public static List<GiProtbindview> getProtBindingViewList(String parentId) throws WebAppException {
        
        return getList(GiProtbindview.class, parentId ,ColumnConst.PB_BININDEX);
    }
    
    public static GiProtbindview getProtBindingViewByID(long id) throws WebAppException {
        
        return getById(GiProtbindview.class, id);
    }
    
    public static void saveProtBindingView(GiProtbindview pbv) throws WebAppException {
        
        save(pbv);
    }
    
    public static void removeProtBindingView(List<Long> pbvs) throws WebAppException {
        
        remove(pbvs, GiProtbindview.class);
    }
}
