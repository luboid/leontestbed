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
    private String upPpReplyType;
    
    @Attribute(required=false)
    private String upMappingFile;
    
//    @Attribute(required=false)
//    private String upFormat;
    
//    @Attribute(required=false)
//    private String upIsEnabled;
//        
//    @Attribute(required=false)
//    private String upReplyType;
//    
//    @Attribute(required=false)
//    private String upIsReply;
//    
//    @Attribute(required=false)
//    private String upAckType;
    

    
    @Attribute(required=false)
    private String downPpReplyType;
    
    @Attribute(required=false)
    private String downMappingFile;
//    @Attribute(required=false)
//    private String downFormat;
    
//    @Attribute(required=false)
//    private String downIsEnabled;
//
//    @Attribute(required=false)
//    private String downReplyType;
//    
//    @Attribute(required=false)
//    private String downIsReply;
//    
//    @Attribute(required=false)
//    private String downAckType;


    
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

    public String getUpMappingFile() {
        return upMappingFile;
    }

    public void setUpMappingFile(String upMappingFile) {
        this.upMappingFile = upMappingFile;
    }

    public String getDownMappingFile() {
        return downMappingFile;
    }

    public void setDownMappingFile(String downMappingFile) {
        this.downMappingFile = downMappingFile;
    }






    
}
