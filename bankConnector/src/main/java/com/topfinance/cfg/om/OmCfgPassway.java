package com.topfinance.cfg.om;

import com.topfinance.cfg.ICfgNode;
import com.topfinance.cfg.ICfgPassway;
import com.topfinance.cfg.ICfgProtocolBinding;
import com.topfinance.cfg.ICfgRouteRule;

import java.util.ArrayList;
import java.util.List;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

public class OmCfgPassway implements ICfgPassway {
    @Attribute(required=false)
    private String oid;
    @Attribute(required=false)
    private String name;
    @Element(required=false)
    private ICfgNode hostNode;
    @Element(required=false)
    private ICfgNode partnerNode;
    
    private List<ICfgProtocolBinding> listProtocolBinding= new ArrayList<ICfgProtocolBinding>();

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

    public ICfgNode getHostNode() {
        return hostNode;
    }

    public void setHostNode(ICfgNode hostNode) {
        this.hostNode = hostNode;
    }

    public ICfgNode getPartnerNode() {
        return partnerNode;
    }

    public void setPartnerNode(ICfgNode partnerNode) {
        this.partnerNode = partnerNode;
    }

    public List<ICfgProtocolBinding> getListProtocolBinding() {
        return listProtocolBinding;
    }

    public void setListProtocolBinding(List<ICfgProtocolBinding> listProtocolBinding) {
        this.listProtocolBinding = listProtocolBinding;
    }
}
