package com.appspot.twitteybot;

import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;

import java.io.File;

import junit.framework.TestCase;
import org.apache.tools.ant.util.FileUtils;

public class BaseDataStoreTestCase extends TestCase {

//    private final LocalServiceTestHelper helper =
//        new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());
	
    private LocalServiceTestHelper helper;
    
    protected void setUp() throws Exception {
    	System.out.println("BaseDataStoreTestCase setup");
//        ApiProxy.setEnvironmentForCurrentThread(new TestEnvironment());
//        String path=getDbStorePath();
//        System.out.println("initializing datastore with path: "+path);
//        ApiProxy.setDelegate(new ApiProxyLocalImpl(new File(path)){});
//        
//        if(needCleanOnStartup()) {
//        	ApiProxyLocalImpl proxy = (ApiProxyLocalImpl) ApiProxy.getDelegate();
//        	proxy.setProperty(LocalDatastoreService.NO_STORAGE_PROPERTY, Boolean.TRUE.toString());
//        	clearDS();
//        }
    	
    	LocalDatastoreServiceTestConfig config = new LocalDatastoreServiceTestConfig();
    	config.setNoStorage(noStorage());
    	config.setBackingStoreLocation(getDbStorePath());
    	helper = new LocalServiceTestHelper(config);
    	helper.setEnvAppId("myhelloword");
    	helper.setEnvVersionId("2");
    	helper.setEnvAuthDomain("gmail.com");
    	helper.setEnvRequestNamespace("");
    	helper.setUp();
    	
    	System.out.println("end of BaseDataStoreTestCase setup");
        

    }
    
    protected boolean noStorage() {
        return false;
    }
    public void setNameSpace(String ns) {
        helper.setEnvRequestNamespace(ns);
        
//        helper.setUp();
    }
    protected void clearDS() {
		System.out.println("cleanning datastore...");
//		ApiProxyLocalImpl proxy = (ApiProxyLocalImpl) ApiProxy.getDelegate();
//		LocalDatastoreService datastoreService = (LocalDatastoreService) proxy.getService("datastore_v3");
//		datastoreService.clearProfiles();
    }
    
    protected String getDbStorePath() {
//    	return "D:/JCommerce/JCommerceGae2/war"+"/WEB-INF/appengine-generated/local_db.bin";
        return "D:/JCommerce/code.google/twitteybot/local_db.bin";
    }
    protected boolean needCleanOnStartup() {
    	return false;
    }
    
//    protected boolean needCleanOnStartup() {
//    	return true;
//    }
    private void cleanDataStore() {
        FileUtils.delete(new File(getDbStorePath()));
    }
    @Override
    public void tearDown() throws Exception {
    	System.out.println("BaseDataStoreTestCase tearDown");
    	
    	
        if(needCleanOnStartup()) {
//            cleanDataStore();
            helper.tearDown();
        }
        // not strictly necessary to null these out but there's no harm either
//        ApiProxy.setDelegate(null);
//        ApiProxy.setEnvironmentForCurrentThread(null);
    }
}
