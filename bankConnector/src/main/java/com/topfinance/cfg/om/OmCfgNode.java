package com.topfinance.cfg.om;

import com.topfinance.cfg.ICfgNode;
import org.simpleframework.xml.Attribute;

public class OmCfgNode implements ICfgNode{
    @Attribute(required=false)
    private String oid;
    @Attribute(required=false)
    private String name;
    
//    private ICfgNode parent;
    @Attribute(required=false)
    private String type;
//    @Attribute(required=false)
//    private String identity;
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

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    
}
