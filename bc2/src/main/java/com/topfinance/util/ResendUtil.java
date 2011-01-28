package com.topfinance.util;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.topfinance.db.ResendEntry;
import com.topfinance.runtime.BcConstants;

public class ResendUtil {
    private static Logger logger = Logger.getLogger(ResendUtil.class);
    public static final String TBL_NAME = "TBL_RESEND";
    
    
    public static final String SQL_GET_ALERT = "select resendkey from "+TBL_NAME +" where status=? and EXPIRATION<?";
    
    public static final String SQL_GET = "select * from "+TBL_NAME +" where resendkey=?  "; 
    public static final String SQL_UPDATE = "update "+TBL_NAME +" set status=? where resendkey=? and status=? ";
    
    // TODO the reverse to trigger resend from GUI
    public static boolean resetResend(String resendkey) {
        String[] params = new String[]{ResendEntry.STATUS_INACTIVE, resendkey, ResendEntry.STATUS_ACTIVE};
        int res = DbUtils.executeUpdate(SQL_UPDATE, params);
        // success where one and only one row updated
        return res==1;
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

        // NOTE: possible concurrent confliction
        // potential risk is if another ack or poll event comes concurrently
        
        // the resetResend() will ensure only the first calling will success. the following will return false and thus will be ingored
        boolean suc = resetResend(resendkey);
        if(!suc) {
            // no active record matched. possibly reset by another thread 
            return null;
        }
        
        String[] params = new String[]{resendkey};
        Map<String, Object> fields = DbUtils.executeQuery(SQL_GET, params);
        if(fields==null || fields.isEmpty()) {
            throw new HiberException("resendEntry field with key{"+resendkey+"} not found");
        } 
        
        ResendEntry hiber = new ResendEntry();
        for(String key:fields.keySet()) {
            Object val = fields.get(key);
            logger.trace("key="+key+", val="+val+", val.type="+val.getClass().getName());
            if(val instanceof BigInteger) {
                val = ((BigInteger)val).longValue();
            }
            hiber.setField(key, val);
       }
        
        // do not test this condition. 
        // If ack comes earlier than poller, even though the expiration might have passed, we still treat it as a good ack. 
//        Long expi = hiber.getExpiration();
//        String status = hiber.getStatus();
//        if(expi < System.currentTimeMillis()) {
//            throw new HiberException("resendEntry entry with key{"+resendkey+"} is invalid");
//        }
        
        return hiber;
    }
    
    public static void saveResend(String resendkey, String direction, String auditId, String status, byte[] bin, String inPortName) {
        
        ResendEntry resend = new ResendEntry();
        
        resend.setResendkey(resendkey);
        resend.setAuditId(auditId);
        resend.setDirection(direction);
        
        // TODO 5min, moved to configuration
        resend.setExpiration(BcConstants.EXPIRY_RESEND+System.currentTimeMillis());
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
