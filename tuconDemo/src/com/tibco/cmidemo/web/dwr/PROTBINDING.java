package com.tibco.cmidemo.web.dwr;

import java.util.List;

import com.tibco.cmidemo.dao.ColumnConst;
import com.tibco.cmidemo.hibernate.GiProtbinding;
import com.tibco.cmidemo.hibernate.GiProtbindview;
import com.tibco.cmidemo.web.WebAppException;
import com.tibco.cmidemo.web.dwr.DWR;

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
        
        boolean insert = pb.getBinindex() == null;
        
        save(pb);
        
        if (insert) {
            
            GiProtbindview hostView = new GiProtbindview();
            hostView.setPbBinindex(pb.getBinindex());
            hostView.setType(ColumnConst.PA_CAT_HOST);
            save(hostView);
            
            GiProtbindview partnerView = new GiProtbindview();
            partnerView.setPbBinindex(pb.getBinindex());
            partnerView.setType(ColumnConst.PA_CAT_PARTNER);
            save(partnerView);
        }
        
    }
    
    public static void removeProtBinding(List<Long> pbs) throws WebAppException {
        
        remove(pbs, GiProtbinding.class);
    }
    
    
}
