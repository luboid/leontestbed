package com.tibco.cmidemo.web.dwr;

import java.util.ArrayList;
import java.util.List;
import com.tibco.cmidemo.dao.ColumnConst;
import com.tibco.cmidemo.hibernate.GiOpbinding;
import com.tibco.cmidemo.util.DBUtil;
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
    
    public static List<String> getAvailableOpList(String prot, String parentId) throws WebAppException {
        
        List<String> availabled = new ArrayList<String>();
        List<String> selected = new ArrayList<String>();
        
        List<GiOpbinding> temp = getOpBindingList(parentId);
        if(temp != null) {
            for(GiOpbinding opb : temp) {
                selected.add(opb.getTxId());
            }
        }
        
        List<String> installed_operations = DBUtil.getOpListByProtName(prot);
        if(installed_operations != null) {
            for(String name : installed_operations) {
                if(!selected.contains(name))
                    availabled.add(name);
            }
        }
        
        return availabled;
    }
    
    public static void saveOpBinding(GiOpbinding opb) throws WebAppException {
        
        save(opb);
    }
    
    public static void removeOpBinding(List<Long> opbs) throws WebAppException {
        
        remove(opbs, GiOpbinding.class);
    }
}
