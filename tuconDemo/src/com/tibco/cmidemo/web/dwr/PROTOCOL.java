package com.tibco.cmidemo.web.dwr;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import com.tibco.cmidemo.dao.ColumnConst;
import com.tibco.cmidemo.hibernate.GiProtocol;
import com.tibco.cmidemo.web.WebAppException;

/**
 * 
 * EnabledProtocol
 * 
 * @author xliu May 4, 2010
 *
 */
public class PROTOCOL extends DWR {
    
    private static Properties installed_protocols = null; 

    public static List<GiProtocol> getEnabledProtocolList(String parentId) throws WebAppException {
        
        return getList(GiProtocol.class, parentId, ColumnConst.TP_BININDEX);
    }
    
    public static List<String> getDisabledProtocolList(String parentId) throws WebAppException {
        
        if(installed_protocols == null) {
            InputStream inStream = PROTOCOL.class.getResourceAsStream("/com/tibco/cmidemo/web/dwr/installed_protocols.properties");
            installed_protocols = new Properties();
            try {
                installed_protocols.load(new InputStreamReader(inStream));
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        
        List<String> disabled = new ArrayList<String>();
        List<String> enabled = new ArrayList<String>();
        List<GiProtocol> temp = getEnabledProtocolList(parentId);
        for(GiProtocol e_prot : temp) {
            enabled.add(e_prot.getName());
        }
        for(Iterator<Object> itr = installed_protocols.keySet().iterator(); itr.hasNext();) {
            String name = (String) itr.next();
            if(!enabled.contains(name))
                disabled.add(name);
        }
        
        
       return disabled;
    }
    
    public static GiProtocol getProtocol(long id) throws WebAppException {
        
        return getById(GiProtocol.class, id);
    }
    
    public static void enableProtocols(Long partnerId, List<String> protNames) throws WebAppException {
        
        for(String protName : protNames) {
            // leon: default to be 1 which is same as in bc
            GiProtocol prot = new GiProtocol(protName, partnerId, 1);
            save(prot);
        }
    }
    
    public static void disableProtocols(List<Long> prots) throws WebAppException {
        
        remove(prots, GiProtocol.class);
    }
}
