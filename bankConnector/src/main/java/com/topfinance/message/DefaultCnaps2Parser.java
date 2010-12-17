package com.topfinance.message;

import org.apache.log4j.Logger;
import com.topfinance.cfg.TestDummy;
import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.plugin.cnaps2.AckRoot;
import com.topfinance.plugin.cnaps2.Cnaps2Constants;
import com.topfinance.plugin.cnaps2.MsgHeader;
import com.topfinance.runtime.BcException;
import com.topfinance.util.BCUtils;

public class DefaultCnaps2Parser  {
    private String mesgId;
    private String mesgRefId;
    private String mesgType;
    private String origSender;
    private String origReceiver;
    
    private String docId;
    private String opName;
    private String origDocId;
    
    static Logger logger = Logger.getLogger(DefaultCnaps2Parser.class);
    
    // to be overridden ??
    protected String getJaxbPackageName(String opName) {
        return Iso8583ToXml.getPackageName(opName);
    }
    
    public Object parse(String msg) throws FatalParseException {
        Object parsedObj = null;
        
        String headerText = msg.substring(0, MsgHeader.TOTAL_LENGTH);
        String bodyText = msg.substring(MsgHeader.TOTAL_LENGTH);
        MsgHeader header = null;
        try {
            header = MsgHeader.fromText(headerText);
        } catch (Exception ex) {
            ex.printStackTrace();
            // no way to generate any meaningful ack
            throw new FatalParseException(ex);
        }        
        
        mesgId = header.getMesgID();
        mesgRefId = header.getMesgRefID();
        mesgType = header.getMesgType();
        origSender = header.getOrigSender();
        origReceiver = header.getOrigReceiver();
        
        if (TestDummy.OPERATION_990.equals(mesgType)) {
            try {
                parsedObj = AckRoot.loadFromString(bodyText);
            } catch (BcException ex) {
                logger.warn("failed to parse ack: "+ex.getMessage(), ex);
            }           
        } else {
            // Parse xml body
            String pkgName = getJaxbPackageName(mesgType);
            try {
                parsedObj = new Iso8583ToXml(pkgName).xmlToObject(bodyText);
            } catch (Exception ex) {
                logger.warn("failed to parse response: "+ex.getMessage(), ex);
            }
            if(parsedObj!=null) {
                docId = BCUtils.extractMsgId(parsedObj);
                origDocId = BCUtils.extractOrigMsgId(parsedObj, mesgType, Cnaps2Constants.OPATHS_ORIG_MSG_ID);
            }
            logger.info("bodyText: "+bodyText);
            logger.info("docId="+docId+", origDocId: "+origDocId);
        }
        
        
        
        return parsedObj;
    }

    public String getMesgId() {
        return mesgId;
    }

    public String getMesgRefId() {
        return mesgRefId;
    }

    public String getMesgType() {
        return mesgType;
    }

    public String getOrigSender() {
        return origSender;
    }

    public String getOrigReceiver() {
        return origReceiver;
    }
    
    public String getDocId() {
        return docId;
    }

    public String getOpName() {
        return opName;
    }

    public String getOrigDocId() {
        return origDocId;
    }
}
