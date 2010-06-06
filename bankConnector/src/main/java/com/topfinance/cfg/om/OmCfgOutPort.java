package com.topfinance.cfg.om;

import com.topfinance.cfg.ICfgNode;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgTransportInfo;
import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

public class OmCfgOutPort implements ICfgOutPort{
    @Attribute(required=false)
    private String oid;
    @Attribute(required=false)
    private String name;
    @Element(required=false)
    private ICfgNode node;
    @Attribute(required=false)
    private String direction;
    @Element(required=false)
    private ICfgTransportInfo transportInfo;
    @Attribute(required=false)
    private String url;
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
    public ICfgNode getNode() {
        return node;
    }
    public void setNode(ICfgNode node) {
        this.node = node;
    }
    public String getDirection() {
        return direction;
    }
    public void setDirection(String direction) {
        this.direction = direction;
    }

    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }
    public ICfgTransportInfo getTransportInfo() {
        return transportInfo;
    }
    public void setTransportInfo(ICfgTransportInfo transportInfo) {
        this.transportInfo = transportInfo;
    }
    
    
    
}
