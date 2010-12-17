package com.topfinance.message;

import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.runtime.BcConstants;
import com.topfinance.util.Iso8583Util;

import java.io.InputStream;
import java.util.Map;

import org.apache.log4j.Logger;
import org.jpos.iso.ISOMsg;

public class DefaultCnaps2ToXmlDownOutMH implements IDownOutMsgHandler {

    static Logger logger = Logger.getLogger(DefaultCnaps2ToXmlDownOutMH.class);
    
    public Object convert(Object obj, String opName, InputStream mapping) {
        
        // TODO convert
        
        // now just keep the original xml;
        return obj;
    }

    public String pack(Object obj, String origSender, String origReceiver, String mesgType, String mesgId,
                       String mesgRefId) {
        Iso8583ToXml main = new Iso8583ToXml(Iso8583ToXml.getPackageName(mesgType));
        String msg = main.objectToXml(obj);
        return msg;
    }

}
