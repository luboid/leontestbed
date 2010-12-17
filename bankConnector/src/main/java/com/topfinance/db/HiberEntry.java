package com.topfinance.db;

import java.util.HashMap;
import java.util.Map;

public class HiberEntry {
    
    public static final String STATUS_ACTIVE = "active";
    // TODO this is to mark the expiration alert has been triggered but not yet deleted?
    public static final String STATUS_INACTIVE = "inactive";
    
    public static final String COL_HIBER_KEY = "HIBERKEY";
    public static final String COL_TX_ID = "TX_ID";
    public static final String COL_AUDIT_ID = "AUDIT_ID";
    public static final String COL_STATUS = "STATUS";
    public static final String COL_TS = "TS";
    public static final String COL_EXPIRATION = "EXPIRATION";
    public static final String COL_INPORT_NAME = "INPORT_NAME";
    public static final String COL_DIRECTION = "DIRECTION";
    public static final String COL_OPERATION = "OPERATION";
    
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
    public String getHiberkey() {
        return (String)getField(COL_HIBER_KEY);
    }
    public void setHiberkey(String hiberkey) {
        setField(COL_HIBER_KEY, hiberkey);
    }
    public String getTxId() {
        return (String)getField(COL_TX_ID);
    }
    public void setTxId(String txId) {
        setField(COL_TX_ID, txId);
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
    public String getDirection() {
        return (String)getField(COL_DIRECTION);
    }
    public void setDirection(String direction) {
        setField(COL_DIRECTION, direction);
    }
    public String getOperation() {
        return (String)getField(COL_OPERATION);
    }
    public void setOperation(String operation) {
        setField(COL_OPERATION, operation);
    }
    public String getInPortName() {
        return (String)getField(COL_INPORT_NAME);
    }
    public void setInPortName(String inPort) {
        setField(COL_INPORT_NAME, inPort);
    }
}
