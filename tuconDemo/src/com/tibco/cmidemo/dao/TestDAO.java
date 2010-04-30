package com.tibco.cmidemo.dao;

import com.tibco.cmidemo.model.Test;

import java.util.List;

public interface TestDAO {
    public List<Test> getTestList();

    public Test getTest(int id);

    public void saveTest(Test obj);

    public void removeTest(int id);
}
