package com.tibco.cmidemo.web.dwr;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.apache.commons.lang.StringUtils;

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

    private static Properties installed_operations = null;
    
    public static List<GiOpbinding> getOpBindingList(String parentId) throws WebAppException {
        
        return getList(GiOpbinding.class, parentId, ColumnConst.PBV_BININDEX);
    }
    
    public static GiOpbinding getOpBindingByID(long id) throws WebAppException {
        
       return getById(GiOpbinding.class, id);
        
    }
    
    public static List<String> getAvailableOpList(String prot, String parentId) throws WebAppException {
        
        if(installed_operations == null) {
            
            InputStream inStream = OPBINDING.class.getClassLoader().getResourceAsStream("/com/tibco/cmidemo/web/dwr/installed_operations.properties");
            installed_operations = new Properties();
            try {
                installed_operations.load(new InputStreamReader(inStream));
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        
        List<String> availabled = new ArrayList<String>();
        List<String> selected = new ArrayList<String>();
        List<GiOpbinding> temp = getOpBindingList(parentId);
        for(GiOpbinding opb : temp) {
            selected.add(opb.getTxId());
        }
        
        String opIds = (String) installed_operations.get(prot);
        if(StringUtils.isBlank(opIds))
            throw new WebAppException("can not find operations of protocol [" + prot + "]");
        
        for(String name : opIds.split(",")) {
            if(!selected.contains(name))
                availabled.add(name);
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
