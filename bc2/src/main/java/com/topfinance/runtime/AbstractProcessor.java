package com.topfinance.runtime;

import com.topfinance.cfg.CfgAccessException;
import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.db.AuditTransaction;
import com.topfinance.db.AuditTransactionDetail;
import com.topfinance.util.AuditUtil;
import com.topfinance.util.PerfUtil;

public abstract class AbstractProcessor implements CfgConstants, BcConstants {
    


    protected abstract void preprocess() throws Exception;
    protected abstract void process() throws Exception;

    protected MessageContext msgContext;
//    protected CamelContext camel;

    public void auditLog(String state, String desc, String status) {
        try {
        	long e0 = PerfUtil.time();
            AuditTransaction auditTx = msgContext.getAuditTx();
            auditTx.setDocId(msgContext.getDocId());
            auditTx.setTxId(msgContext.getTxId());
            auditTx.setOpName(msgContext.getOpInfo().getMesgType());
            auditTx.setStatus(status);
            auditTx.setDirection(msgContext.getDirection());
            
            auditTx.setHost(msgContext.getHnName());
            auditTx.setPartner(msgContext.getPnName());
            auditTx.setInPort(msgContext.getCfgInPort() == null? "" : msgContext.getCfgInPort().getName());
            auditTx.setOutPort(msgContext.getCfgOutPort() == null? "" : msgContext.getCfgOutPort().getName());
            
            AuditTransactionDetail detail = new AuditTransactionDetail();
            detail.setStatus(status);
            detail.setState(state);
            detail.setDesc(desc);
            
            AuditUtil.saveAuditLog(auditTx, detail);
            long e1 = PerfUtil.time();
            PerfUtil.perfLog(" cost "+(e1-e0)+", end AbstractProcessor.auditLog" );
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    

    
    protected ICfgOperation getCfgOperation() throws CfgAccessException{
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        String opName = msgContext.getOpInfo().getMesgType();
        ICfgOperation cfgOpn = cfgReader.getOperation(msgContext.getProtocol(), opName);
        return cfgOpn;
    }
    
//    public CamelContext getCamel() {
//        return camel;
//    }
//
//    public void setCamel(CamelContext camel) {
//        this.camel = camel;
//    }
    public MessageContext getMsgContext() {
        return msgContext;
    }
    public void setMsgContext(MessageContext msgContext) {
        this.msgContext = msgContext;
    }
}
