package com.topfinance.converter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * jaxb2 customized converter
 * see http://java.sun.com/webservices/docs/1.5/tutorial/doc/JAXBUsing4.html#wp155652
 */
public class Cnaps2DataTypeConverter {
    
     
    // see 附件一，3.2 数据类型
    private static final String PATTERN_DATE = "yyyy-MM-dd";
    private static final String PATTERN_DATE_TIME = "yyyy-MM-dd'T'HH:mm:SS";
    
    
 // TODO timezone or locale??
    public static Calendar parseDate(String value) {
        
        try {
            SimpleDateFormat tf = new SimpleDateFormat(PATTERN_DATE);
            Date date = tf.parse(value);
            Calendar res = Calendar.getInstance();
            res.setTime(date);
            return res;
        } catch (ParseException e) {
            
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        
        
    }
    
    public static String printDate(Calendar value) {
        
        SimpleDateFormat tf = new SimpleDateFormat(PATTERN_DATE);
        String res = tf.format(value.getTime());
        return res;
        
    }
    
    public static Calendar parseDateTime(String value) {
        try {
            SimpleDateFormat tf = new SimpleDateFormat(PATTERN_DATE_TIME);
            Date date = tf.parse(value);
            Calendar res = Calendar.getInstance();
            res.setTime(date);
            return res;
        } catch (ParseException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        
    }
    
    public static String printDateTime(Calendar value) {
        
        SimpleDateFormat tf = new SimpleDateFormat(PATTERN_DATE_TIME);
        String res = tf.format(value.getTime());
        return res;
        
    }
}
