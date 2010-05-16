package com.topfinance.runtime;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.db.AuditTransaction;
import com.topfinance.db.AuditTransactionDetail;
import com.topfinance.util.AuditUtil;
import org.apache.camel.CamelContext;

public abstract class AbstractProcessor implements CfgConstants {
    
    public static final String STATE_RECEIVED_REQ = "RECEIVED_MSG";
    public static final String STATE_PARSE_VALIDATION = "PARSE_AND_VALIDATION";
    public static final String STATE_SEND_ACK = "SEND_ACK";
    public static final String STATE_INITIALISE_CONTEXT = "INITIALISE_CONTEXT";
    public static final String STATE_PKG_OUT_MSG = "PKG_OUT_MSG";
    public static final String STATE_SENT_OUT_MSG = "SEND_OUT_MSG";
    public static final String STATE_RECEIVED_RESP = "RECEIVED_RESPONSE";
    
    public static final String STATUS_PENDING = "PENDING";
    public static final String STATUS_COMPLETED = "COMPLETED";
    public static final String STATUS_ERROR = "ERROR";

    protected abstract void process() throws Exception;

    protected MessageContext msgContext;
    protected CamelContext camel;

    public void auditLog(String state, String desc, String status) {
        try {
            AuditTransaction auditTx = msgContext.getAuditTx();
            auditTx.setDocId(msgContext.getDocId());
            auditTx.setTxId(msgContext.getTxId());
            auditTx.setOpName(msgContext.getOperationName());
            auditTx.setStatus(status);
//            auditTx.setDesc(desc);
            auditTx.setDirection(msgContext.getDirection());
            
            AuditTransactionDetail detail = new AuditTransactionDetail();
            detail.setStatus(status);
            detail.setState(state);
            detail.setDesc(desc);
            
            AuditUtil.saveAuditLog(auditTx, detail);
            
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    public void auditLog(String auditId, String state, String desc, String status) {
        try {
            AuditTransaction auditTx = new AuditTransaction();
            auditTx.setAuditId(auditId);
            auditTx.setStatus(status);

            AuditTransactionDetail detail = new AuditTransactionDetail();
            detail.setStatus(status);
            detail.setState(state);
            detail.setDesc(desc);
            
            AuditUtil.updateAuditLogStatus(auditTx, detail);
            
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    protected ICfgOperation getCfgOperation() {
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        String opName = msgContext.getOperationName();
        ICfgOperation cfgOpn = cfgReader.getOperation(msgContext.getProtocol(), opName);
        return cfgOpn;
    }
    
    public CamelContext getCamel() {
        return camel;
    }

    public void setCamel(CamelContext camel) {
        this.camel = camel;
    }
}
