package com.topfinance.cfg.om;

import javax.jms.ConnectionFactory;

import org.simpleframework.xml.Attribute;

import com.topfinance.cfg.ICfgTransportInfo;

public abstract class OmCfgTransportInfo implements ICfgTransportInfo {
    @Attribute(required=false)
    private String oid;
    @Attribute(required=false)
    private String name;
    @Attribute(required=false)
    private String provider;
    @Attribute(required=false)
    private String prefix;
    
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
}
