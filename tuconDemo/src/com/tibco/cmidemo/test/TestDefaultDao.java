package com.tibco.cmidemo.test;

import com.tibco.cmidemo.dao.ColumnConst;
import com.tibco.cmidemo.dao.Condition;
import com.tibco.cmidemo.dao.Criteria;
import com.tibco.cmidemo.dao.DAO;
import com.tibco.cmidemo.dao.Order;
import com.tibco.cmidemo.hibernate.GiPartner;
import com.tibco.cmidemo.hibernate.GiPkistoreitem;

import java.util.List;

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
    public void testGetListPAOrder() {
        try {
            
            GiPartner p = new GiPartner();
            p.setName("deftestGetListPAOrder1");
            p.setCategory(ColumnConst.PA_CAT_PARTNER);
            
            GiPartner p2 = new GiPartner();
            p2.setName("abctestGetListPAOrder1");
            p2.setCategory(ColumnConst.PA_CAT_PARTNER);
            
            DAO dao = getDAO();
            dao.save(p);
            dao.save(p2);
            
            
            Criteria c = new Criteria(GiPartner.class);
            c.addOrder(new Order(ColumnConst.PA_NAME, Order.DESCEND));
            List<GiPartner> list = dao.getList(c);
            for(GiPartner pp : list) {
                System.out.println("p.name="+pp.getName());
            }
            
            dao.deleteAll(list);
            
            System.out.println("Done");
            
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    public void testPKI() {
        try {
            GiPkistoreitem pki = new GiPkistoreitem();
            pki.setTpBinindex(1000l);
            pki.setName("xxx");
            pki.setUrl("url");
            pki.setContent("abc".getBytes());
            
            getDAO().save(pki);
            
            List<GiPkistoreitem> res = getDAO().getList(GiPkistoreitem.class);
            for(GiPkistoreitem p : res) {
                System.out.println("url="+p.getUrl());
                System.out.println("content="+new String(p.getContent()));
            }
            
            System.out.println("Done");
            
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    
}
