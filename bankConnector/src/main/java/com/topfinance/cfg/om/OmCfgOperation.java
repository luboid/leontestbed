package com.topfinance.cfg.om;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgProtocol;

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
    private String upReplyType;
    
    @Attribute(required=false)
    private String upIsReply;
    
    @Attribute(required=false)
    private String upAckType;
    
    @Attribute(required=false)
    private String downIsEnabled;
    
    @Attribute(required=false)
    private String downReplyType;
    
    @Attribute(required=false)
    private String downIsReply;
    
    @Attribute(required=false)
    private String downAckType;
    
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




    
}
