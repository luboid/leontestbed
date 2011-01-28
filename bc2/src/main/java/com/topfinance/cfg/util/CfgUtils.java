package com.topfinance.cfg.util;

public class CfgUtils {
	public static boolean matchUrl(String url1, String url2) {
		// remove the option and compare url part only
		int i1 = url1.indexOf("?");
		String u1 = i1<0 ? url1 : url1.substring(0, i1);
		
		int i2 = url2.indexOf("?");
		String u2 = i2<0 ? url2 : url2.substring(0, i2);
		
		return u1.equals(u2);
		
	}
}
