package com.tibco.cmidemo.web.dwr;

import java.util.List;

import com.tibco.cmidemo.hibernate.GiBizagreement;
import com.tibco.cmidemo.web.WebAppException;

/**
 * 
 * BizAgreement
 * 
 * @author xliu May 4, 2010
 *
 */
public class BIZAGREEMENT extends DWR {

    
    public static List<GiBizagreement> getBAList() throws WebAppException {
        
        return getList(GiBizagreement.class);
    }
    
    public static GiBizagreement getBAByID(long id) throws WebAppException {
        
        return getById(GiBizagreement.class, id);
    }
    
    public static void saveBA (GiBizagreement ba) throws WebAppException {
        
        save(ba);
    }
    
    public static void removeBA(List<Long> bas) throws WebAppException {
        
        remove(bas, GiBizagreement.class);
    }
    
}
