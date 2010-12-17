package com.topfinance.cfg.xml;

import com.topfinance.cfg.ICfgTransportInfo;

import java.util.HashMap;
import java.util.Map;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.ElementMap;

public abstract class OmCfgTransportInfo implements ICfgTransportInfo {
    @Attribute(required=false)
    private String oid;
    @Attribute(required=false)
    private String name;
    @Attribute(required=false)
    private String provider;
    @Attribute(required=false)
    private String prefix;
    
    @ElementMap(entry="config", key="key", attribute=true, inline=true, required=false)
    private Map<String, String> config;
    
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
    public Map<String, String> getConfig() {
        return config;
    }
    public void setConfig(Map<String, String> config) {
        this.config = config;
    }
}
