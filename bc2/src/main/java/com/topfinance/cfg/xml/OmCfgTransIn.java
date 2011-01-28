package com.topfinance.cfg.xml;

import java.util.Map;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.ElementMap;

import com.topfinance.cfg.ICfgTransIn;

public abstract class OmCfgTransIn implements ICfgTransIn {
    @Attribute(required=false)
    private String oid;
    @Attribute(required=false)
    private String name;
    @Attribute(required=false)
    private String provider;
    @Attribute(required=false)
    private String prefix;

    @Attribute(required=false)
    private String isPrivate;
    

    
//    @Attribute(required=false)
//    private String format;
//    

    
    @ElementMap(entry="config", key="key", attribute=true, inline=true, required=false)
    private Map<String, String> providerConfig;
    
    public String getOid() {
        return oid;
    }
    public void setOid(String oid) {
        this.oid = oid;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getProvider() {
        return provider;
    }
    public void setProvider(String provider) {
        this.provider = provider;
    }
    public String getPrefix() {
        return prefix;
    }
    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }
    public Map<String, String> getProviderConfig() {
        return providerConfig;
    }
    public void setProviderConfig(Map<String, String> config) {
        this.providerConfig = config;
    }
	public String getIsPrivate() {
		return isPrivate;
	}
	public void setIsPrivate(String isPrivate) {
		this.isPrivate = isPrivate;
	}



}
