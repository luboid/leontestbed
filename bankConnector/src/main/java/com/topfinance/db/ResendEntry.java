package com.topfinance.db;

import java.util.HashMap;
import java.util.Map;

public class ResendEntry {
    public static final String STATUS_ACTIVE = "active";
    // TODO this is to mark the expiration alert has been triggered but not yet deleted?
    public static final String STATUS_INACTIVE = "inactive";
    
    public static final String COL_RESEND_KEY = "RESENDKEY";
    public static final String COL_AUDIT_ID = "AUDIT_ID";
    public static final String COL_STATUS = "STATUS";
    public static final String COL_TS = "TS";
    public static final String COL_EXPIRATION = "EXPIRATION";
    public static final String COL_INPORT_NAME = "INPORT_NAME";
    public static final String COL_BIN = "BIN";
    public static final String COL_RETRY_COUNT = "RETRY_COUNT";
    public static final String COL_DIRECTION = "DIRECTION";
    
    private Map<String, Object> fields = new HashMap<String, Object>();
    
    public void setField(String field, Object value) {
        fields.put(field, value);
    }
    public Object getField(String field) {
        return fields.get(field);
    }
    public Map<String, Object> getFields() {
        return fields;
    }
    public void setFields(Map<String, Object> fields) {
        this.fields = fields;
    }
    
    public String getResendkey() {
        return (String)getField(COL_RESEND_KEY);
    }
    public void setResendkey(String resendkey) {
        setField(COL_RESEND_KEY, resendkey);
    }

    public String getAuditId() {
        return (String)getField(COL_AUDIT_ID);
    }
    public void setAuditId(String auditId) {
        setField(COL_AUDIT_ID, auditId);
    }
    public String getStatus() {
        return (String)getField(COL_STATUS);
    }
    public void setStatus(String status) {
        setField(COL_STATUS, status);
    }
    public String getTs() {
        return (String)getField(COL_TS);
    }
    public void setTs(String ts) {
        setField(COL_TS, ts);
    }
    public Long getExpiration() {
        Object obj = getField(COL_EXPIRATION);
        return (Long)obj;
    }
    public void setExpiration(Long expiration) {
        setField(COL_EXPIRATION, expiration);
    }
    
    public byte[] getBin() {
        Object obj = getField(COL_BIN);
        return (byte[])obj;
    }
    public void setBin(byte[] bin) {
        setField(COL_BIN, bin);
    }
    public String getInPortName() {
        return (String)getField(COL_INPORT_NAME);
    }
    public void setInPortName(String inPort) {
        setField(COL_INPORT_NAME, inPort);
    }
    
    public Integer getRetryCount() {
        return (Integer)getField(COL_RETRY_COUNT);
    }
    public void setRetryCount(int retryCount) {
        setField(COL_RETRY_COUNT, retryCount);
    }
    public String getDirection() {
        return (String)getField(COL_DIRECTION);
    }
    public void setDirection(String direction) {
        setField(COL_DIRECTION, direction);
    }
}
