package com.topfinance.db;

import java.util.HashMap;
import java.util.Map;

import com.topfinance.util.BCUtils;

public class AuditTransactionDetail {
    
    public static final String PREFIX = "Detail";
    
    private static final String UID = "U_ID";
    public static final String AUDIT_ID = "AUDIT_ID";
    private static final String STATUS = "STATUS";
    private static final String STATE = "STATE";
    private static final String DESC = "DESCRIPTION";
    
    private Map<String, Object> fields = new HashMap<String, Object>();
    
    public AuditTransactionDetail() {
        setUId(BCUtils.getUniqueId(PREFIX));
    }
    
    public void setUId(String uId) {
        setField(UID, uId);
    }
    public String getUId() {
        return (String)getField(UID);
    }
    
    public void setAuditId(String auditId) {
        setField(AUDIT_ID, auditId);
    }
    public String getAuditId() {
        return (String)getField(AUDIT_ID);
    }
    public void setState(String state) {
        setField(STATE, state);
    }
    public String getState() {
        return (String)getField(STATE);
    }
    public void setStatus(String status) {
        setField(STATUS, status);
    }
    public String getStatus() {
        return (String)getField(STATUS);
    }
    public void setDesc(String desc) {
        setField(DESC, desc);
    }
    public String getDesc() {
        return (String)getField(DESC);
    }
    
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
}
