package com.topfinance.db;

import com.topfinance.util.BCUtils;

import java.util.HashMap;
import java.util.Map;


public class AuditTransaction {
    
    public static final int STATE_CREATE                      = 0;
    public static final int STATE_UDPATE_DETAIL               = 1;

    public static final String PREFIX = "AUDIT";
    
    public static final String AUDIT_ID = "AUDIT_ID";
    private static final String DOC_ID = "DOC_ID";
    private static final String TX_ID = "TX_ID";
    private static final String OP_NAME = "OP_NAME";
    private static final String HOST = "HOST";
    private static final String PARTNER = "PARTNER";
    private static final String DIRECTION = "DIRECTION";
    private static final String STATUS = "STATUS";
    private static final String DESC = "DESCRIPTION";
    private static final String TS = "TS";
    private static final String STARTDATE = "STARTDATE";
    private static final String ORIDOC_ID = "ORIDOC_ID";
    private static final String REPLYDOC_ID = "REPLYDOC_ID";

    protected int mState;
    
    private Map<String, Object> fields = new HashMap<String, Object>();
    
    public AuditTransaction() {
        mState = STATE_CREATE;
        setAuditId(BCUtils.getUniqueId(PREFIX));
    }
    
    
    

    public void setAuditId(String auditId) {
        setField(AUDIT_ID, auditId);
    }
    public String getAuditId() {
        return (String)getField(AUDIT_ID);
    }
    public void setOpName(String opName) {
        setField(OP_NAME, opName);
    }
    public String getOpName() {
        return (String)getField(OP_NAME);
    }   
    public void setDocId(String docId) {
        setField(DOC_ID, docId);
    }
    public String getDocId() {
        return (String)getField(DOC_ID);
    }
    public void setTxId(String txId) {
        setField(TX_ID, txId);
    }
    public String getTxId() {
        return (String)getField(TX_ID);
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
    public void setDirection(String direction) {
        setField(DIRECTION, direction);
    }
    public String getDirection() {
        return (String)getField(DIRECTION);
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
    public void setMState(int state) {
        mState = state;
    }
    public int getMState() {
        return mState;
    }    
    
    
}
