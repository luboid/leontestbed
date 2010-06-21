package com.topfinance.util;

import com.topfinance.db.HiberEntry;
import com.topfinance.db.ResendEntry;
import com.topfinance.runtime.BcConstants;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

public class HiberUtil {
    private static Logger logger = Logger.getLogger(HiberUtil.class);
    public static final String TBL_NAME = "TBL_HIBER";
    
    public static final String SQL_GET_ALERT = "select hiberkey from "+TBL_NAME +" where status=? and EXPIRATION<?";
    public static final String SQL_GET = "select * from "+TBL_NAME +" where hiberkey=?"; 
    public static final String SQL_UPDATE = "update "+TBL_NAME +" set status=? where hiberkey=? and status=? ";
    public static final String SQL_DELETE = "delete from "+TBL_NAME +" where hiberkey=?";
    

    public static boolean resetHiber(String hiberkey) {
        String[] params = new String[]{ResendEntry.STATUS_INACTIVE, hiberkey, ResendEntry.STATUS_ACTIVE};
        int res = DbUtils.executeUpdate(SQL_UPDATE, params);
        // success where one and only one row updated
        return res==1;
    }
    
    // for poll
    public static List<String> getHiberAlerts() {
        Long expiry = new Date().getTime();
        Object[] params = new Object[]{HiberEntry.STATUS_ACTIVE, expiry};
        List<String> res = DbUtils.executeQueryForList(SQL_GET_ALERT, params, String.class);
        return res;
    }
    
    
    // see ResendUtil
    // for async reply or poll process
    // get and delete
    public static HiberEntry resurrectHiber(String hiberkey) {
        boolean suc = resetHiber(hiberkey);
        if(!suc) {
            // no active record matched. possibly reset by another thread 
            return null;
        }
        
        
        String[] params = new String[]{hiberkey};
        
        Map<String, Object> fields = DbUtils.executeQuery(SQL_GET, params);
        if(fields==null || fields.isEmpty()) {
            throw new HiberException("hibernation field with key{"+hiberkey+"} not found");
        } else {
            DbUtils.executeUpdate(SQL_DELETE, params);
        }
        
        HiberEntry hiber = new HiberEntry();
        for(String key:fields.keySet()) {
            Object val = fields.get(key);
            logger.trace("key="+key+", val="+val+", val.type="+val.getClass().getName());
            if(val instanceof BigInteger) {
                val = ((BigInteger)val).longValue();
            }
            hiber.setField(key, val);
       }
        

//        Long expi = hiber.getExpiration();
//        String status = hiber.getStatus();
//        if(expi < System.currentTimeMillis()) {
//            throw new HiberException("hibernation entry with key{"+hiberkey+"} is invalid");
//        }
        
        
        return hiber;
    }
    
    public static void saveHiber(String hiberkey, String direction, String txId, String auditId, String operation) {
        
        HiberEntry hiber = new HiberEntry();
        
        hiber.setHiberkey(hiberkey);
        hiber.setTxId(txId);
        hiber.setAuditId(auditId);
        hiber.setDirection(direction);
        hiber.setOperation(operation);
        
        // TODO 5min, moved to configuration
        hiber.setExpiration(BcConstants.EXPIRY_HIBER+System.currentTimeMillis());
        hiber.setStatus(HiberEntry.STATUS_ACTIVE);
        
        
        Map<String, Object> fields = hiber.getFields();
        StringBuffer buf = new StringBuffer();
        List<Object> params = new ArrayList<Object>();
        
        DbUtils.buildInsertSql(TBL_NAME, fields, buf, params);
        
        String sql = buf.toString();
        
        // TODO handle duplicate error
        DbUtils.executeUpdate(sql, params.toArray());       

    }


}
