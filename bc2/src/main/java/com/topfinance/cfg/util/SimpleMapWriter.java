package com.topfinance.cfg.util;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

public class SimpleMapWriter {
	public static String write(Map<String, String> map) {
        StringBuffer buf = new StringBuffer();
        for(String key:map.keySet()) {
            if(buf.length()!=0) {
                buf.append("|");
            }
            buf.append(key).append("=").append(map.get(key));
        }
        return buf.toString();
	}
	public static Map<String, String> read(String config) {
		
		Map<String, String> res = new HashMap<String, String>();
        if(!StringUtils.isEmpty(config)) {
            String[] entries = StringUtils.split(config, "|");
            for(String entry : entries) {
                String[] pair = StringUtils.split(entry, "=");
                if(pair.length!=2) {
                    throw new RuntimeException("sth wrong in parsing entry: "+entry);
                }
                res.put(pair[0], pair[1]);
            }
        }
        return res;
	}
}
