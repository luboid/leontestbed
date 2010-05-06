package com.tibco.cmidemo.web.dwr;

import java.util.List;

import com.tibco.cmidemo.dao.ColumnConst;
import com.tibco.cmidemo.hibernate.GiLocation;
import com.tibco.cmidemo.hibernate.GiPartner;
import com.tibco.cmidemo.hibernate.GiTransport;
import com.tibco.cmidemo.web.WebAppException;

/**
 * 
 * Transport
 * 
 * @author xliu May 4, 2010
 *
 */
public class TRANSPORT extends DWR {

    public static List<GiTransport> getTransportList(String parentId) throws WebAppException {
        
        return getList(GiTransport.class, parentId, ColumnConst.E_BININDEX);
    }
    
    public static GiTransport getTransportByID(long id)throws WebAppException {
        
        return getById(GiTransport.class, id);
    }
    
    public static void saveTransport(GiTransport transport) throws WebAppException {

        save(transport);

            
    }
}
