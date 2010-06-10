package com.topfinance.cfg.xml;

import com.topfinance.cfg.ICfgProtocol;
import org.simpleframework.xml.Attribute;

public class OmCfgProtocol implements ICfgProtocol{
    @Attribute(required=false)
    private String oid;
    @Attribute(required=false)
    private String name;
    @Attribute(required=false)
    private String pluginName;
    @Attribute(required=false)
    private String upSendAckToPP;
    @Attribute(required=false)
    private String downRecievePPAck;
    
    
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
    public String getPluginName() {
        return pluginName;
    }
    public void setPluginName(String pluginName) {
        this.pluginName = pluginName;
    }
    public String getUpSendAckToPP() {
        return upSendAckToPP;
    }
    public void setUpSendAckToPP(String upSendAckToPP) {
        this.upSendAckToPP = upSendAckToPP;
    }
    public String getDownRecievePPAck() {
        return downRecievePPAck;
    }
    public void setDownRecievePPAck(String downRecievePPAck) {
        this.downRecievePPAck = downRecievePPAck;
    }

}
