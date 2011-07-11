package com.appspot.twitteybot.datastore;

import com.google.appengine.api.datastore.Key;

import java.util.Collections;
import java.util.List;

import javax.cache.Cache;
import javax.cache.CacheException;
import javax.cache.CacheManager;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable(identityType = IdentityType.APPLICATION)
public class ApplicationProperty {

    public static final String UNIT_PRICE = "unit_price";
    public static final String PAYEE_ACCOUNT = "payee_account";
    
    
    public static final String IS_TESTING = "is_test";
    
	public static final String CONSUMER_KEY = "consumer_key";
	public static final String CONSUMER_SECRET = "consumer_secret";
	
	public static final String SHORTENER_URL = "shortener_url";
	
	public static final String ADMIN_EMAIL = "adminEmail";
	public static final String ADMIN_NAME = "adminName";
	public static final String SITE_NAME = "siteName";
	
	public static final String USE_PAYPAL_TESTBED = "usePayPalTestBed";
	
	private static final String APPLICATION_PROPERTIES = "application_properties";

	   public static final boolean isTesting() {
	        
	        String isTesting = read(IS_TESTING);
	        if(isTesting==null) {
	            return false;
	        }
	        try {
	            Boolean d = Boolean.parseBoolean(isTesting);
	            return d;           
	        } catch (Exception ex) {
	            throw new RuntimeException(ex);
	        }       
	    }
       public static final boolean usePayPalTestBed() {
           
           String isTesting = read(USE_PAYPAL_TESTBED);
           if(isTesting==null) {
               // by default use testbed 
               return true;
           }
           try {
               Boolean d = Boolean.parseBoolean(isTesting);
               return d;           
           } catch (Exception ex) {
               throw new RuntimeException(ex);
           }       
       }	   
	public static final String getPayeeAccount() {
	    return read(PAYEE_ACCOUNT);
	}
	public static final double getUnitPrice() {
	    
	    String unitPriceStr = read(UNIT_PRICE);
	    if(unitPriceStr==null) {
	        return 0;
	    }
	    try {
	        Double d = Double.parseDouble(unitPriceStr);
	        return d;	        
	    } catch (Exception ex) {
	        return 0;
	    }	    
	}
	
	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private Key id;

	@Persistent
	private String key;
	@Persistent
	private String value;

	public ApplicationProperty(String key, String value) {
		this.key = key;
		this.value = value;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public Key getId() {
		return id;
	}

	public void setId(Key id) {
		this.id = id;
	}

	@SuppressWarnings("unchecked")
	public static String read(String key) {
		Cache cache = ApplicationProperty.getApplicationCache();
		Object obj = cache.get(key);
		String result = null;
		if (obj instanceof String) {
			result = (String) obj;
		}
		if (result != null) {
			return result;
		}

		PersistenceManager pm = PMF.get().getPersistenceManager();
		Query query = pm.newQuery(ApplicationProperty.class);
		query.setFilter("key == keyVar");
		query.declareParameters("String keyVar");
		List<ApplicationProperty> properties = (List<ApplicationProperty>) query.execute(key);
		if (properties.size() > 0) {
			result = ((ApplicationProperty) properties.get(0)).getValue();
		}
		cache.put(key, result);
		query.closeAll();
		pm.close();
		return result;
	}

	@SuppressWarnings("unchecked")
	public static void write(String key, String value) {
		Cache cache = ApplicationProperty.getApplicationCache();
		cache.put(key, value);
		PersistenceManager pm = PMF.get().getPersistenceManager();
		ApplicationProperty prop = new ApplicationProperty(key, value);
		Query query = pm.newQuery(ApplicationProperty.class);
		query.setFilter("key == keyVar");
		query.declareParameters("String keyVar");
		List<ApplicationProperty> properties = (List<ApplicationProperty>) query.execute(key);
		if (properties.size() != 0) {
			prop = properties.get(0);
		}
		prop.setKey(key);
		prop.setValue(value);
		pm.makePersistent(prop);
		pm.close();
	}

	private static Cache getApplicationCache() {
		CacheManager cacheManager = CacheManager.getInstance();
		Cache cache = cacheManager.getCache(APPLICATION_PROPERTIES);
		if (cache == null) {
			try {
				cache = cacheManager.getCacheFactory().createCache(Collections.emptyMap());
			} catch (CacheException e) {
				throw new RuntimeException("Could not create Cache", e);
			}
			cacheManager.registerCache(APPLICATION_PROPERTIES, cache);
		}
		return cache;
	}
}
