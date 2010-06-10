package com.topfinance.cfg.db;

import com.cnaps2.cncc.ebo.ConfOperationEbo;
import com.topfinance.cfg.ICfgOperation;

public class DbCfgOperation implements ICfgOperation {
    private ConfOperationEbo ebo;
    
    public DbCfgOperation(ConfOperationEbo ebo) {
        this.ebo = ebo;
    }
    
    public Integer getProtId() {
        return ebo.getPrtclEbo().getUid();
    }
    
    public String getDownAckType() {
        return ebo.getAckMsgDw();
    }

    public String getDownIsEnabled() {
        return ebo.getIsPermitDw();
    }

    public String getDownIsReply() {
        return ebo.getIsAckDw();
    }

    public String getDownReplyType() {
        return ebo.getFormatDw();
    }

    public String getUpAckType() {
        return ebo.getAckMsgUp();
    }

    public String getUpIsEnabled() {
        return ebo.getIsPermitUp();
    }

    public String getUpIsReply() {
        return ebo.getIsAckUp();
    }

    public String getUpReplyType() {
        return ebo.getFormatUp();
    }

    public void setDownAckType(String downAckType) {
        // TODO Auto-generated method stub

    }

    public void setDownIsEnabled(String downIsEnabled) {
        // TODO Auto-generated method stub

    }

    public void setDownIsReply(String downIsReply) {
        // TODO Auto-generated method stub

    }

    public void setDownReplyType(String downReplyType) {
        // TODO Auto-generated method stub

    }

    public void setUpAckType(String upAckType) {
        // TODO Auto-generated method stub

    }

    public void setUpIsEnabled(String upIsEnabled) {
        // TODO Auto-generated method stub

    }

    public void setUpIsReply(String upIsReply) {
        // TODO Auto-generated method stub

    }

    public void setUpReplyType(String upReplyType) {
        // TODO Auto-generated method stub

    }

    public String getName() {
        return ebo.getName();
    }

    public void setName(String name) {
        // TODO Auto-generated method stub

    }

}
