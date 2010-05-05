package com.tibco.cmidemo.web.dwr;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.tibco.cmidemo.dao.ColumnConst;
import com.tibco.cmidemo.hibernate.GiLocation;
import com.tibco.cmidemo.hibernate.GiPartner;
import com.tibco.cmidemo.util.DBUtil;
import com.tibco.cmidemo.web.WebAppException;

/**
 * 
 * Participant
 * 
 * @author xliu
 * 
 */
public class PARTNER extends DWR {

    public static List<GiPartner> getPAList() throws WebAppException {
        
        return getList(GiPartner.class);
        
    }

    public static GiPartner getPA(long id) throws WebAppException {
        
        return getById(GiPartner.class, id);
    }
    
    @SuppressWarnings("unchecked")
    public static List<GiPartner> getHostPAList() throws WebAppException {
        
        try {
            return DAO().getList(DBUtil.createCriteria(ColumnConst.PA_CAT_HOST));
        } catch (DataAccessException de) {
            throw new WebAppException(de.getMessage());
        }
    }
    
    @SuppressWarnings("unchecked")
    public static List<GiPartner> getPartnerPAList() throws WebAppException {
        
        try {
            return DAO().getList(DBUtil.createCriteria(ColumnConst.PA_CAT_PARTNER));
        } catch (DataAccessException de) {
            throw new WebAppException(de.getMessage());
        }
        
    }
    
    public static void savePA(GiPartner partner) throws WebAppException {
        
        boolean insert = partner.getBinindex() == null;
        save(partner);
        if(insert) {
            GiLocation headquarters = new GiLocation("Headquarters", partner.getBinindex());
            LOCATION.saveLoc(headquarters);
        }
            
    }
    
    public static void removePA(List<Long> partners) throws WebAppException {
        
        remove(partners, GiPartner.class);
    }
    
    
    
}
