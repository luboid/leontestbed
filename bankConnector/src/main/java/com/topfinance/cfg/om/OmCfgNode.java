package com.topfinance.cfg.om;

import org.simpleframework.xml.Attribute;
import com.topfinance.cfg.ICfgNode;

public class OmCfgNode implements ICfgNode{
    @Attribute(required=false)
    private String oid;
    @Attribute(required=false)
    private String name;
    private ICfgNode parent;
    @Attribute(required=false)
    private String type;
    @Attribute(required=false)
    private String identity;
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
    public ICfgNode getParent() {
        return parent;
    }
    public void setParent(ICfgNode parent) {
        this.parent = parent;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getIdentity() {
        return identity;
    }
    public void setIdentity(String identity) {
        this.identity = identity;
    }
    
}
