package com.topfinance.message;

import java.io.InputStream;
import java.util.Map;

import org.apache.log4j.Logger;
import org.jpos.iso.ISOBasePackager;
import org.jpos.iso.ISOMsg;

import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.plugin.cnaps2.utils.ISOIBPSPackager;
import com.topfinance.runtime.BcConstants;
import com.topfinance.util.Iso8583Util;

public class DefaultCnaps2To8583DownOutMH implements IDownOutMsgHandler {
    
    static Logger logger = Logger.getLogger(DefaultCnaps2To8583DownOutMH.class);
    
    // default value
    private String iso8583packagerClazz = ISOIBPSPackager.class.getName();  

    // do not override
    public void setIso8583PackagerClazz(String clazz) {
        iso8583packagerClazz = clazz;
    }
    
    protected String get8583PackagerClazz() {
        // default 
        return iso8583packagerClazz;
    }    
    
    public Object convert(Object obj, String opName, InputStream mapping)  {
        
        Map<String, String> mappings = Iso8583ToXml.loadMappings(mapping);
        ISOMsg isoMsg = Iso8583ToXml.objectToIso8583(getPackager(), obj, mappings);
        try {
            Iso8583Util.setField(isoMsg, BcConstants.ISO8583_OP_NAME, opName);
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
        return isoMsg;
    }

    public String pack(Object obj, String origSender, String origReceiver, String mesgType, String mesgId,
                       String mesgRefId) {
        ISOMsg isoMsg = (ISOMsg)obj;
        String msg = Iso8583Util.packMsg(isoMsg);
        logger.debug("packed="+msg);
        return msg;
    }
    private ISOBasePackager getPackager() {
        ISOBasePackager res = null;
        String clazz = get8583PackagerClazz();
        try {
            res = (ISOBasePackager)Class.forName(clazz).newInstance();
        } catch (Exception ex) {
            logger.error("cannot load packager class: "+clazz, ex);
            throw new RuntimeException("cannot load packager class: "+clazz);
        }
        return res;
    }
}
