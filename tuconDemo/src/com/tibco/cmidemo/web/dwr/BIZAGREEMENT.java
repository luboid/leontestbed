package com.tibco.cmidemo.web.dwr;

import com.tibco.cmidemo.dao.ColumnConst;
import com.tibco.cmidemo.dao.Condition;
import com.tibco.cmidemo.dao.Criteria;
import com.tibco.cmidemo.hibernate.GiBizagreement;
import com.tibco.cmidemo.hibernate.GiPartner;
import com.tibco.cmidemo.web.WebAppException;

import java.util.ArrayList;
import java.util.List;

import org.springframework.dao.DataAccessException;

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
    
    public static boolean exists(long hostId, long partnerId) throws WebAppException {
        
        List result = null;
        try {
            Criteria c = new Criteria(GiBizagreement.class);
            c.addCondition(new Condition(ColumnConst.HBinindex, Condition.EQUALS, String.valueOf(hostId)));
            c.addCondition(new Condition(ColumnConst.TP_BININDEX, Condition.EQUALS, String.valueOf(partnerId)));
            result = DAO().getList(c);
        } catch (DataAccessException de) {
            throw new WebAppException(de);
        }
        
        return (result != null && result.size() > 0);
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
