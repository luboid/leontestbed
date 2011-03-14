package com.topfinance.util;

import org.apache.log4j.Logger;

public class PerfUtil {
	
	private static Logger logger = Logger.getLogger(PerfUtil.class);
    public static long time() {
    	return System.currentTimeMillis();
    }
    public static void perfLog(String s) {
    	String log = new StringBuffer()
    	.append(" t=").append(System.currentTimeMillis())
    	.append(", m=").append(s)
    	.append("[").append(Thread.currentThread().getName()).append("]")
    	.toString();
    	logger.warn(log);
    }
}
