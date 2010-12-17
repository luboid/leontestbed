package com.topfinance.util;

import com.topfinance.plugin.cnaps2.utils.ISOIBPSPackager;
import com.topfinance.runtime.BcConstants;

import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.jpos.iso.ISOBasePackager;
import org.jpos.iso.ISOField;
import org.jpos.iso.ISOMsg;
import org.jpos.iso.ISOUtil;

public class Iso8583Util {
    private static Logger logger = Logger.getLogger(Iso8583Util.class);
    private static void info(String msg) {
        logger.info(msg);
    }
    public static ISOMsg unpackMsg(String msg, ISOBasePackager packager) {
        try {
            ISOMsg m = new ISOMsg();
            m.setPackager(packager);
            m.unpack(ISOUtil.hex2byte(msg));
            return m;
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
    public static String packMsg(ISOMsg m) {
        try {
            String msg = ISOUtil.hexString(m.pack());
            return msg;
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
    public static ISOMsg emptyMsg(ISOBasePackager packager) {
        try {
            ISOMsg msg = new ISOMsg();
            msg.setPackager(packager);
            msg.set(new ISOField(BcConstants.ISO8583_START, BcConstants.ISO8583_START_VALUE));
            return msg;
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
    public static String GBKToISO8859(String str) throws Exception {
//        return new String(str.getBytes("GBK"), "ISO-8859-1");
//        return new String(str.getBytes("UTF-8"), "ISO-8859-1");
        return str;
    }

    public static String ISO8859ToGBK(String str) throws Exception {
//        return new String(str.getBytes("ISO-8859-1"), "GBK");
//        return new String(str.getBytes("ISO-8859-1"), "UTF-8");
        return str;
    }
    public static void setField(ISOMsg msg, int pos, String s) {
        try {
            msg.set(new ISOField(pos, GBKToISO8859(s)));
            
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
    public static String getField(ISOMsg msg, int pos) {
        try {
           return ISO8859ToGBK((String)msg.getValue(pos));
        } catch (Exception ex) {
            throw new RuntimeException("error in retrieving value of pos["+pos+"]", ex);
        }
    }
    
    public static ISOMsg createDummyISOMsg(ISOBasePackager packager, String sample8583FileName) {
        
        // construct a dummy ISOMsg from the generated sample 8583 file,
        // which could be changed manually (by default it contains value extracted from sample xml)
        
        ISOMsg msg = emptyMsg(packager);
        
        List<String> lines = null;
        try {
            lines = IOUtils.readLines(new InputStreamReader(new FileInputStream(sample8583FileName),
                                                            BcConstants.ENCODING));
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
        
        for (String line : lines) {
            try {
                if(StringUtils.isBlank(line)) {
                    continue;
                }
                String[] arr = StringUtils.split(line, "=");
                int pos = Integer.valueOf(arr[0]);
                String val = arr[1];
                
                setField(msg, pos, val);
                
            } catch (Exception ex) {
                info("error in line"+line);
                throw new RuntimeException("error in line: " + line, ex);
            }

        }

        return msg;

    }
}
