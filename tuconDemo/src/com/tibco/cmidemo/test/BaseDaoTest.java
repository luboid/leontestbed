package com.tibco.cmidemo.test;

import com.tibco.cmidemo.dao.DAO;
import junit.framework.TestCase;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class BaseDaoTest extends TestCase {

    protected ApplicationContext ctx;
    protected void setUp() throws Exception {
        super.setUp();
        ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
    }
    
    protected DAO getDAO() {
        DAO dao = (DAO)ctx.getBean("DAO");
        return dao;
    }

}
