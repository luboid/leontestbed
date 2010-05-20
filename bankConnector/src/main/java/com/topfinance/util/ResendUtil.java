package com.topfinance.util;

import com.topfinance.db.HiberEntry;
import com.topfinance.db.ResendEntry;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class ResendUtil {
    
    public static final String TBL_NAME = "TBL_RESEND";
    
    
    public static final String SQL_GET_ALERT = "select resendkey from "+TBL_NAME +" where status=? and EXPIRATION<?";
    
    public static final String SQL_GET = "select * from "+TBL_NAME +" where status=? and resendkey=?  "; 
    public static final String SQL_UPDATE = "update "+TBL_NAME +" set status=? where resendkey=?";
    
    // TODO the reverse to trigger resend from GUI
    public static void resetResend(String hiberkey) {
        String[] params = new String[]{ResendEntry.STATUS_INACTIVE, hiberkey};
        DbUtils.executeUpdate(SQL_UPDATE, params);
    }
    
    
    // for poll
    public static List<String> getResendAlerts() {
        Long expiry = new Date().getTime();
        Object[] params = new Object[]{ResendEntry.STATUS_ACTIVE, expiry};
        List<String> res = DbUtils.executeQueryForList(SQL_GET_ALERT, params, String.class);
        return res;
        
    }
    
    // for ack or poll process
    public static ResendEntry resurrectResend(String resendkey) {

        // get and mark as inactive
        // todo anyway to make it atomic? 
        String[] params = new String[]{ResendEntry.STATUS_ACTIVE, resendkey};
        
        // TODO concurrent confliction
        // potential risk is if another ack or poll event comes concurrently, both will execute
        // in such case, will see the audit log marked as succeed but error alert sent to pp

        // workaround: we will always honor the timeout auditlog rather than the ack-recieved one, if both are in audit-log
        
        
        Map<String, Object> fields = DbUtils.executeQuery(SQL_GET, params);
        if(fields==null || fields.isEmpty()) {
            throw new HiberException("resendEntry field with key{"+resendkey+"} not found");
        } else {
            resetResend(resendkey);
        }
        
        ResendEntry hiber = new ResendEntry();
        for(String key:fields.keySet()) {
            Object val = fields.get(key);
            System.out.println("key="+key+", val="+val+", val.type="+val.getClass().getName());
            if(val instanceof BigInteger) {
                val = ((BigInteger)val).longValue();
            }
            hiber.setField(key, val);
       }
        
        Long expi = hiber.getExpiration();
        String status = hiber.getStatus();
        if(expi < System.currentTimeMillis() || !status.equals(HiberEntry.STATUS_CREATED)) {
            throw new HiberException("resendEntry entry with key{"+resendkey+"} is invalid");
        }
        
        return hiber;
    }
    
    public static void saveResend(String resendkey, String auditId, String status, byte[] bin, String inPortName) {
        
        ResendEntry resend = new ResendEntry();
        
        resend.setResendkey(resendkey);
        resend.setAuditId(auditId);
        
        // TODO 1min, moved to configuration
        Long expiry = 1000l*60;
        resend.setExpiration(expiry+System.currentTimeMillis());
        resend.setStatus(ResendEntry.STATUS_ACTIVE);
        resend.setRetryCount(0);
        resend.setInPortName(inPortName);
        resend.setBin(bin);
        
        Map<String, Object> fields = resend.getFields();
        StringBuffer buf = new StringBuffer();
        List<Object> params = new ArrayList<Object>();
        
        DbUtils.buildInsertSql(TBL_NAME, fields, buf, params);
        
        String sql = buf.toString();
        
        // TODO handle duplicate error
        DbUtils.executeUpdate(sql, params.toArray());       

    }
}
