package com.topfinance.util;

import com.topfinance.db.AuditTransaction;
import com.topfinance.db.AuditTransactionDetail;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class AuditUtil {
    
    private final static String TBL_NAME_AUDIT = "TBL_TRANSACTION";
    private final static String TBL_NAME_DETAIL = "TBL_TRANSACTION_DETAIL";
    
    private final static String SQL_INSERT_AUDIT = "insert into TBL_TRANSACTION (first_name,last_name) values(?,?);";
    private final static String SQL_UPDATE_AUDIT = "update TBL_TRANSACTION set first_name = ?, last_name = ? where id =?";
    
        
    public static void saveAuditLog(AuditTransaction audit, AuditTransactionDetail detail) throws Exception{
            // TODO introduce transaction
        
            if(AuditTransaction.STATE_CREATE==audit.getMState()) {
                insertAuditLog(audit);
            }else {
                updateAuditLog(audit);
            }
            detail.setAuditId(audit.getAuditId());
            insertAuditDetailLog(detail);

    }
    public static void updateAuditLogStatus(AuditTransaction audit, AuditTransactionDetail detail) throws Exception{
        // TODO introduce transaction
    
        updateAuditLogStatus(audit);
        
        detail.setAuditId(audit.getAuditId());
        insertAuditDetailLog(detail);

    }
    
    public static void updateAuditLogStatus(String auditId, String state, String desc, String status) {
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
    
    private static void insertAuditLog(AuditTransaction audit) throws Exception{
        
        Map<String, Object> fields = audit.getFields();
        List<Object> params = new ArrayList<Object>();
        String sql = getInsertSql(fields, params, TBL_NAME_AUDIT);
                
        DbUtils.executeUpdate(sql, params.toArray());        
        audit.setMState(AuditTransaction.STATE_UDPATE_DETAIL);
        
    }

    private static String getInsertSql(Map<String, Object> fields, List<Object> params, String tableName) {
        StringBuffer buf = new StringBuffer("insert into ").append(tableName).append("(");
        StringBuffer buf2 = new StringBuffer(" values (");
        int i=0;
        
        for(String key: fields.keySet()) {
            Object val = fields.get(key);
            if(val==null) {
                continue;
            }
            if(i==0) {
                buf.append(key).append("");
                buf2.append("?");
            }else {
                buf.append(", ").append(key);
                buf2.append(", ").append("?");
            }
            i++;
            params.add(fields.get(key));
        }
        buf.append(")").append(buf2.append(")"));
        
        String sql = buf.toString();
        return sql;
    }
    
    private static void insertAuditDetailLog(AuditTransactionDetail detail) throws Exception{
        
        Map<String, Object> fields = detail.getFields();
        List<Object> params = new ArrayList<Object>();
        String sql = getInsertSql(fields, params, TBL_NAME_DETAIL);
                
        DbUtils.executeUpdate(sql, params.toArray());        
        
        
    }    
    
    
    private static void updateAuditLog(AuditTransaction audit) throws Exception{
        Map<String, Object> fields = audit.getFields();
        StringBuffer buf = new StringBuffer("update ").append(TBL_NAME_AUDIT).append(" set ");
        int i=0;
        List<Object> params = new ArrayList<Object>();
        for(String key: fields.keySet()) {
            Object val = fields.get(key);
            if(val==null) {
                continue;
            }            
            if(key.equals(AuditTransaction.AUDIT_ID)) {
                continue;
            }
            if(i==0) {
                buf.append(key).append("= ?");
            }else {
                buf.append(", ").append(key).append("= ?");
            }
            i++;
            params.add(fields.get(key));
        }
        
        buf.append(" where ").append(AuditTransaction.AUDIT_ID).append("=?");
        params.add(fields.get(AuditTransaction.AUDIT_ID));
        
        String sql = buf.toString();
                
        DbUtils.executeUpdate(sql, params.toArray());
    }
    
    private static void updateAuditLogStatus(AuditTransaction audit) throws Exception{
        Map<String, Object> fields = audit.getFields();
        StringBuffer buf = new StringBuffer("update ").append(TBL_NAME_AUDIT).append(" set status=? ");
        buf.append(" where ").append(AuditTransaction.AUDIT_ID).append("=?");
        
        List<Object> params = new ArrayList<Object>();
        params.add(audit.getStatus());
        params.add(fields.get(AuditTransaction.AUDIT_ID));
        
        String sql = buf.toString();
                
        DbUtils.executeUpdate(sql, params.toArray());
    }
}
