package com.topfinance.cfg.om;

import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgProtocolBinding;
import com.topfinance.cfg.ICfgRoute;

public class OmCfgRoute implements ICfgRoute{
    private String oid;
    private String name;
    private ICfgInPort inPort;
    private ICfgOutPort outPort;
    private String direction;
    private ICfgProtocolBinding protocolBinding;
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
    public ICfgInPort getInPort() {
        return inPort;
    }
    public void setInPort(ICfgInPort inPort) {
        this.inPort = inPort;
    }
    public ICfgOutPort getOutPort() {
        return outPort;
    }
    public void setOutPort(ICfgOutPort outPort) {
        this.outPort = outPort;
    }
    public String getDirection() {
        return direction;
    }
    public void setDirection(String direction) {
        this.direction = direction;
    }
    public ICfgProtocolBinding getProtocolBinding() {
        return protocolBinding;
    }
    public void setProtocolBinding(ICfgProtocolBinding protocolBinding) {
        this.protocolBinding = protocolBinding;
    }
}
