package com.tibco.cmidemo.test;

import com.tibco.cmidemo.web.dwr.DOMAIN;

import java.util.List;

import junit.framework.TestCase;

public class TestMisc extends TestCase {
    public void testGetDomainList() {
        try {
            List<String> list = DOMAIN.getDomainList();
            for (String s : list) {
                System.out.println("s=" + s);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
