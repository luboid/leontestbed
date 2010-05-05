package com.tibco.cmidemo.web.dwr;

import com.tibco.cmidemo.dao.ColumnConst;
import com.tibco.cmidemo.dao.Condition;
import com.tibco.cmidemo.dao.Criteria;
import com.tibco.cmidemo.hibernate.GiContact;
import com.tibco.cmidemo.web.WebAppException;

import java.util.List;

/**
 * 
 * Contact
 * 
 * @author xliu May 4, 2010
 *
 */
public class CONTACT extends DWR {

    public static List<GiContact> getContListByLoc(String parentId) throws WebAppException {
        return getList(GiContact.class, parentId, ColumnConst.L_BININDEX);
    }
    
    public static List<GiContact> getLegalContListByLoc(String parentId) throws WebAppException {
        Criteria c = new Criteria(GiContact.class);
        c.addCondition(new Condition(ColumnConst.L_BININDEX, Condition.EQUALS, parentId));
        c.addCondition(new Condition(ColumnConst.CATEGORY, Condition.EQUALS, ColumnConst.CONTACT_TYPE_LEGAL));
        return DAO().getList(c);
    }
    
    public static List<GiContact> getSupportContListByLoc(String parentId) throws WebAppException {
        Criteria c = new Criteria(GiContact.class);
        c.addCondition(new Condition(ColumnConst.L_BININDEX, Condition.EQUALS, parentId));
        c.addCondition(new Condition(ColumnConst.CATEGORY, Condition.EQUALS, ColumnConst.CONTACT_TYPE_SUPPORT));
        return DAO().getList(c);
    }
    
    
    public static GiContact getContListByID(long id) throws WebAppException {
        
        return getById(GiContact.class, id);
    }
    
    public static void saveCont(GiContact cont) throws WebAppException {
        String f = cont.getFName();
        String l = cont.getLName();
        cont.setName(f+" "+l);
        save(cont);
    }
    
    public static void removeCont(List<Long> conts) throws WebAppException {
        
        remove(conts, GiContact.class);
    }
}
