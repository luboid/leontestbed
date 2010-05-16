package com.topfinance.util;

import com.topfinance.db.HiberEntry;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class HiberUtil {
    
    public static final String TBL_NAME = "TBL_HIBERENTRY";
    
    public static final String SQL_GET = "select * from "+TBL_NAME +" where hiberkey=?"; 
    public static final String SQL_DELETE = "delete from "+TBL_NAME +" where hiberkey=?";
    
    public static HiberEntry retrieveHiber(String hiberkey) {
        
        
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
            System.out.println("key="+key+", val="+val+", val.type="+val.getClass().getName());
            if(val instanceof BigInteger) {
                val = ((BigInteger)val).longValue();
            }
            hiber.setField(key, val);
       }
        
//        HiberEntry hiber = (HiberEntry)DbUtils.executeQuery(SQL_GET, params, HiberEntry.class);
//        if (hiber == null) {
//            throw new HiberException("hibernation field with key{" + hiberkey + "} not found");
//        } else {
//            DbUtils.executeUpdate(SQL_DELETE, params);
//        }
        Long expi = hiber.getExpiration();
        String status = hiber.getStatus();
        if(expi < System.currentTimeMillis() || !status.equals(HiberEntry.STATUS_CREATED)) {
            throw new HiberException("hibernation entry with key{"+hiberkey+"} is invalid");
        }
        
        
        return hiber;
    }
    
    public static void saveHiber(String hiberkey, String txId, String auditId) {
        
        HiberEntry hiber = new HiberEntry();
        
        hiber.setHiberkey(hiberkey);
        hiber.setTxId(txId);
        hiber.setAuditId(auditId);
        
        // TODO 1min, moved to configuration
        Long expiry = 1000l*60;
        hiber.setExpiration(expiry+System.currentTimeMillis());
        hiber.setStatus(HiberEntry.STATUS_CREATED);
        
        
        Map<String, Object> fields = hiber.getFields();
        StringBuffer buf = new StringBuffer("insert into ").append(TBL_NAME).append("(");
        StringBuffer buf2 = new StringBuffer(" values (");
        int i=0;
        List<Object> params = new ArrayList<Object>();
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
        
        // TODO handle duplicate error
        DbUtils.executeUpdate(sql, params.toArray());       

    }
}
