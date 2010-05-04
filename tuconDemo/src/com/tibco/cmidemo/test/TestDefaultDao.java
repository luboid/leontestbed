package com.tibco.cmidemo.test;

import com.tibco.cmidemo.dao.ColumnConst;
import com.tibco.cmidemo.dao.Condition;
import com.tibco.cmidemo.dao.Criteria;
import com.tibco.cmidemo.dao.DAO;
import com.tibco.cmidemo.hibernate.GiPartner;

public class TestDefaultDao extends BaseDaoTest {
    public void testInsertPA() {
        try {
            
            GiPartner p = new GiPartner();
            p.setName("p1");
            p.setCategory("Host");
            
            DAO dao = getDAO();
            dao.save(p);
            
            System.out.println("Done");
            
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    public void testUpdatePA() {
        try {
            Criteria c = new Criteria(GiPartner.class);
            c.addCondition(new Condition(ColumnConst.PA_NAME, Condition.EQUALS, "p1"));
            
            GiPartner p = (GiPartner)getDAO().getOne(c);
            p.setIsActive(true);
            p.setDescription("test host");
            
            DAO dao = getDAO();
            dao.save(p);
            
            System.out.println("Done");
            
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    public void testDeletePA() {
        try {
            Criteria c = new Criteria(GiPartner.class);
            c.addCondition(new Condition(ColumnConst.PA_NAME, Condition.EQUALS, "p1"));
            
            GiPartner p = (GiPartner)getDAO().getOne(c);

            Long id = p.getBinindex();
            
            DAO dao = getDAO();
            dao.deleteById(id, GiPartner.class);
            
            System.out.println("Done");
            
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    
}
