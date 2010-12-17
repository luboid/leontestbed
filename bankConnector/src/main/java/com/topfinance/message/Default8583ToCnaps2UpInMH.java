package com.topfinance.message;

import java.io.InputStream;
import java.util.Map;

import com.topfinance.cfg.TestDummy;
import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.plugin.cnaps2.Cnaps2Constants;
import com.topfinance.plugin.cnaps2.utils.ISOIBPSPackager;
import com.topfinance.runtime.BcConstants;
import com.topfinance.util.Iso8583Util;
import org.apache.log4j.Logger;
import org.jpos.iso.ISOBasePackager;
import org.jpos.iso.ISOMsg;

public class Default8583ToCnaps2UpInMH implements IUpInMsgHandler {
    private static Logger logger = Logger.getLogger(Default8583ToCnaps2UpInMH.class);
    private String docId;
    private String opName;
    private String origDocId;
    
    // default value
    private String iso8583packagerClazz = ISOIBPSPackager.class.getName();  
    
    // do not override
    protected final String getJaxbPackageName(String opName) {
        return Iso8583ToXml.getPackageName(opName);
    }
    
    // do not override
    public void setIso8583PackagerClazz(String clazz) {
        iso8583packagerClazz = clazz;
    }
    
    protected String get8583PackagerClazz() {
        // default 
        return iso8583packagerClazz;
    }
    
    // do not override
    public final Object convert(Object obj , String opName, InputStream mapping) {
//      String pkgName = Iso8583ToXml.getPackageName(mesgType);
//      Map<String, String> mappings = Iso8583ToXml.loadMappings(mapFile);
//      if(TestDummy.OPERATION_102.equals(mesgType)){
//          // upward 102
//          // NOTE this is not necessary if generated mapping rule was modified to take care of orig_msg_id
//          mappings.put(Cnaps2Constants.ORIG_MSG_ID_102, getMsgContext().getOrigDocId());
//      }
//      ISOMsg msg = (ISOMsg)getMsgContext().getParsedMsg();
//      Iso8583ToXml converter = new Iso8583ToXml(pkgName);
//      Object jaxbObj = converter.iso8583ToObject(msg, mappings);
//      body = converter.objectToXml(jaxbObj);
        
//        Iso8583ToXml
        
        Map<String, String> mappings = Iso8583ToXml.loadMappings(mapping);
        if(TestDummy.OPERATION_102.equals(opName)){
          // upward 102
          // NOTE this is not necessary if generated mapping rule was modified to take care of orig_msg_id
//          mappings.put(Cnaps2Constants.ORIG_MSG_ID_102, getMsgContext().getOrigDocId());
            mappings.put(Cnaps2Constants.ORIG_MSG_ID_102, "ISO["+BcConstants.ISO8583_ORIG_DOC_ID+"]");
        }
        ISOMsg msg = (ISOMsg)obj;
        String pkgName = getJaxbPackageName(opName);
        Iso8583ToXml converter = new Iso8583ToXml(pkgName);
        Object jaxbObj = converter.iso8583ToObject(msg, mappings);
        
        return jaxbObj;
    }
    
    // do not override
    public final Object parse(String msg) throws FatalParseException{
        Object parsedMsg = Iso8583Util.unpackMsg(msg, getPackager());
        ISOMsg iso = (ISOMsg)parsedMsg;
        docId = iso.getString(BcConstants.ISO8583_DOC_ID);
        opName = iso.getString(BcConstants.ISO8583_OP_NAME);
        origDocId = iso.getString(BcConstants.ISO8583_ORIG_DOC_ID);
        return parsedMsg;
    }
    
    private ISOBasePackager getPackager() throws FatalParseException{
        ISOBasePackager res = null;
        String clazz = get8583PackagerClazz();
        try {
            res = (ISOBasePackager)Class.forName(clazz).newInstance();
        } catch (Exception ex) {
            logger.error("cannot load packager class: "+clazz, ex);
            throw new FatalParseException("cannot load packager class: "+clazz);
        }
        return res;
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

    
    public String getMesgId() {
        throw new UnsupportedOperationException("getMesgId");
    }

    public String getMesgRefId() {
        throw new UnsupportedOperationException("getMesgRefId");
    }

    public String getMesgType() {
        throw new UnsupportedOperationException("getMesgType");
    }

    public String getOrigReceiver() {
        throw new UnsupportedOperationException("getOrigReceiver");
    }

    public String getOrigSender() {
        throw new UnsupportedOperationException("getOrigSender");
    }

}
