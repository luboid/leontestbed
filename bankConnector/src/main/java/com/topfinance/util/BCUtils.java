package com.topfinance.util;

import com.topfinance.cfg.ICfgPort;
import com.topfinance.cfg.ICfgTransportInfo;


public class BCUtils {
    
    public static String getUniqueId() {
        return getUniqueId("uid-");
        
    }
    
    public static String getUniqueId(String prefix, int maxLength) {
        String id = prefix+System.nanoTime()+"-"+Math.random()*1000000l;
        if(id.length()>maxLength) {
            id = id.substring(0, maxLength);
        }
        return id;
    }
    
    public static String getUniqueId(String prefix) {
        return getUniqueId(prefix, 100);
    }
    public static String getUniqueDocId() {
        return getUniqueId("docid-");
    }    
    public static String getUniqueTxId() {
        return getUniqueId("txid-");
    }
    public static String getUniqueMesgId() {
        return getUniqueId("m-", 20);
    }    
    public static String getFullUrlFromPort(ICfgPort port) {
        String url = port.getUrl();
        // handle URL prefix
        ICfgTransportInfo ti = port.getTransportInfo();
        String prefix = ti.getPrefix();
        url = prefix+"://"+url;
        return url;
    }
}
