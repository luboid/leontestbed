package com.topfinance.cfg.om;

import com.topfinance.cfg.ICfgPassway;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.cfg.ICfgProtocolBinding;
import com.topfinance.cfg.ICfgRouteRule;

import java.util.ArrayList;
import java.util.List;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

public class OmCfgProtocolBinding implements ICfgProtocolBinding{
    @Attribute(required=false)
    private String oid;
    @Attribute(required=false)
    private String name;
    private List<ICfgRouteRule> listUpRouteRule= new ArrayList<ICfgRouteRule>();
    private List<ICfgRouteRule> listDownRouteRule= new ArrayList<ICfgRouteRule>();
    @Element(required=false)
    private ICfgPassway passway;
    @Element(required=false)
    private ICfgProtocol protocol;
    
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

    public ICfgPassway getPassway() {
        return passway;
    }
    public void setPassway(ICfgPassway passway) {
        this.passway = passway;
    }
    public List<ICfgRouteRule> getListUpRouteRule() {
        return listUpRouteRule;
    }
    public void setListUpRouteRule(List<ICfgRouteRule> listUpRouteRule) {
        this.listUpRouteRule = listUpRouteRule;
    }
    public List<ICfgRouteRule> getListDownRouteRule() {
        return listDownRouteRule;
    }
    public void setListDownRouteRule(List<ICfgRouteRule> listDownRouteRule) {
        this.listDownRouteRule = listDownRouteRule;
    }
    public ICfgProtocol getProtocol() {
        return protocol;
    }
    public void setProtocol(ICfgProtocol protocol) {
        this.protocol = protocol;
    }

}
