package com.tibco.cmidemo.web.dwr;

import com.tibco.cmidemo.hibernate.GiBizagreement;
import com.tibco.cmidemo.hibernate.GiPartner;
import com.tibco.cmidemo.web.WebAppException;

import java.util.List;

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
        if(ba.getBinindex()==null) {
            // new BA
            Long hid = ba.getHBinindex();
            Long pid = ba.getTpBinindex();
            GiPartner host = PARTNER.getPA(hid);
            GiPartner partner = PARTNER.getPA(pid);
            String displayName = partner.getName()+"-"+host.getName();
            ba.setDisplayName(displayName);
        }

        save(ba);
    }
    
    public static void removeBA(List<Long> bas) throws WebAppException {
        
        remove(bas, GiBizagreement.class);
    }
    
}
