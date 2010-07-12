package com.topfinance.cfg.xml;

import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgProtocol;
import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

public class OmCfgOperation implements ICfgOperation {
    
    @Attribute(required=false)
    private String oid;
    
    @Attribute(required=false)
    private String name;
    
    @Element(required=false)
    private ICfgProtocol protocol;
    
    @Attribute(required=false)
    private String upIsEnabled;
    
    @Attribute(required=false)
    private String upPpReplyType;
    
    @Attribute(required=false)
    private String upReplyType;
    
    @Attribute(required=false)
    private String upIsReply;
    
    @Attribute(required=false)
    private String upAckType;
    
    @Attribute(required=false)
    private String upFormat;
    
    
    @Attribute(required=false)
    private String downIsEnabled;
    
    @Attribute(required=false)
    private String downPpReplyType;
    
    @Attribute(required=false)
    private String downReplyType;
    
    @Attribute(required=false)
    private String downIsReply;
    
    @Attribute(required=false)
    private String downAckType;

    @Attribute(required=false)
    private String downFormat;
    
    public ICfgProtocol getProtocol() {
        return protocol;
    }

    public void setProtocol(ICfgProtocol protocol) {
        this.protocol = protocol;
    }

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

    public String getUpIsEnabled() {
        return upIsEnabled;
    }

    public void setUpIsEnabled(String upIsEnabled) {
        this.upIsEnabled = upIsEnabled;
    }



    public String getDownIsEnabled() {
        return downIsEnabled;
    }

    public void setDownIsEnabled(String downIsEnabled) {
        this.downIsEnabled = downIsEnabled;
    }

    public String getUpReplyType() {
        return upReplyType;
    }

    public void setUpReplyType(String upReplyType) {
        this.upReplyType = upReplyType;
    }

    public String getUpIsReply() {
        return upIsReply;
    }

    public void setUpIsReply(String upIsReply) {
        this.upIsReply = upIsReply;
    }

    public String getDownReplyType() {
        return downReplyType;
    }

    public void setDownReplyType(String downReplyType) {
        this.downReplyType = downReplyType;
    }

    public String getDownIsReply() {
        return downIsReply;
    }

    public void setDownIsReply(String downIsReply) {
        this.downIsReply = downIsReply;
    }

    public String getUpAckType() {
        return upAckType;
    }

    public void setUpAckType(String upAckType) {
        this.upAckType = upAckType;
    }

    public String getDownAckType() {
        return downAckType;
    }

    public void setDownAckType(String downAckType) {
        this.downAckType = downAckType;
    }

    public String getUpPpReplyType() {
        return upPpReplyType;
    }

    public void setUpPpReplyType(String upPpReplyType) {
        this.upPpReplyType = upPpReplyType;
    }

    public String getDownPpReplyType() {
        return downPpReplyType;
    }

    public void setDownPpReplyType(String downPpReplyType) {
        this.downPpReplyType = downPpReplyType;
    }

    public String getUpFormat() {
        return upFormat;
    }

    public void setUpFormat(String upFormat) {
        this.upFormat = upFormat;
    }

    public String getDownFormat() {
        return downFormat;
    }

    public void setDownFormat(String downFormat) {
        this.downFormat = downFormat;
    }




    
}
