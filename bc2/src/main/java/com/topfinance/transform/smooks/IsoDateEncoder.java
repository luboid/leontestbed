package com.topfinance.transform.smooks;

import java.text.ParseException;
import java.util.Date;

import org.apache.commons.beanutils.BeanUtils;
import org.jpos.iso.ISODate;

public class IsoDateEncoder {
	public String encode(java.util.Date date) {
//		return "abc";
		return ISODate.getDateTime((Date)date);
	}
	
	public String encode2(String in) {
		try {
			return encode(new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S z").parse(in));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "ERROR";
		}
	}
	
	public String encode3(Object o) {

		debug("o="+o+", "+ (o==null? "null" : o.getClass().getName()));

		return "";
	}
	
	public void debug(String s) {
		System.out.println(s);
	}

}
