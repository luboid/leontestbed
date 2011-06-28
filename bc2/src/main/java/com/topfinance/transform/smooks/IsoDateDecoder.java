package com.topfinance.transform.smooks;

import java.util.Date;

import org.jpos.iso.ISODate;
import org.milyn.javabean.DataDecodeException;
import org.milyn.javabean.DataDecoder;

public class IsoDateDecoder implements DataDecoder {
    private void info(String msg) {
        System.out.println(msg);
    }
	public Object decode(String data) throws DataDecodeException {
        Date dd = null;
        try {
            // TODO
            dd = ISODate.parseISODate((String)data);
        } catch (Exception ex) {
        	
            info("in[CalendarConverter] failed to convert to ISODate from a value="+data);
            ex.printStackTrace();
            dd = new Date();
        }
        return dd;
	}
	
	public String encode(java.util.Date date) {
		return "abc";
//		return ISODate.getDateTime((Date)date);
	}

}
