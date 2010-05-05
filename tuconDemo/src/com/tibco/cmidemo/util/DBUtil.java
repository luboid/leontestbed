package com.tibco.cmidemo.util;

import com.tibco.cmidemo.dao.ColumnConst;
import com.tibco.cmidemo.dao.Condition;
import com.tibco.cmidemo.dao.Criteria;
import com.tibco.cmidemo.hibernate.GiPartner;

/**
 * @author xliu May 4, 2010
 *
 */
public class DBUtil {

    public static <T> Criteria createCriteria(Class<T> clazz, String parentColumn, String parentId) {
        
        Criteria c = new Criteria(clazz);
        c.addCondition(new Condition(parentColumn, Condition.EQUALS, parentId));
        
        return c;
    }
    
    public static Criteria createCriteria(String paCat) {
        
        Criteria c = new Criteria(GiPartner.class);
        c.addCondition(new Condition(ColumnConst.CATEGORY, Condition.EQUALS, paCat));
        
        return c;
    }
}
