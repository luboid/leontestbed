package com.topfinance.util;

import com.topfinance.plugin.cnaps2.utils.ISOIBPSPackager;
import com.topfinance.runtime.BcConstants;

import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.jpos.iso.ISOField;
import org.jpos.iso.ISOMsg;
import org.jpos.iso.ISOUtil;
import test.tcp8583.TestIBPSMsg;

public class Iso8583Util {
    private static Logger logger = Logger.getLogger(Iso8583Util.class);
    private static void info(String msg) {
        logger.info(msg);
    }
    public static ISOMsg unpackMsg(String msg) {
        try {
            ISOMsg m = new ISOMsg();
            m.setPackager(new ISOIBPSPackager());
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
    public static ISOMsg emptyMsg() {
        try {
            ISOMsg msg = new ISOMsg();
            msg.setPackager(new ISOIBPSPackager());
            msg.set(new ISOField(BcConstants.ISO8583_START, BcConstants.ISO8583_START_VALUE));
            return msg;
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
    
    public static void setField(ISOMsg msg, int pos, String s) {
        try {
            msg.set(new ISOField(pos, TestIBPSMsg.GBKToISO8859(s)));
            
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
    public static String getField(ISOMsg msg, int pos) {
        try {
           return TestIBPSMsg.ISO8859ToGBK((String)msg.getValue(pos));
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
    
    public static ISOMsg createDummyISOMsg(String sample8583FileName) {
        
        // construct a dummy ISOMsg from the generated sample 8583 file,
        // which could be changed manually (by default it contains value extracted from sample xml)
        
        ISOMsg msg = emptyMsg();
        
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
