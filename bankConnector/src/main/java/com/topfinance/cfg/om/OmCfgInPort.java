package com.topfinance.cfg.om;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.cfg.ICfgTransportInfo;

public class OmCfgInPort implements ICfgInPort {
    @Attribute(required=false)
    private String oid;
    @Attribute(required=false)
    private String name;
    @Element(required=false)
    private ICfgProtocol protocol;
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

    public ICfgProtocol getProtocol() {
        return protocol;
    }

    public void setProtocol(ICfgProtocol protocol) {
        this.protocol = protocol;
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
