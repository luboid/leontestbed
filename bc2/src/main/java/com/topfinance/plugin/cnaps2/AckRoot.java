package com.topfinance.plugin.cnaps2;

import java.io.File;
import java.io.StringReader;
import java.io.StringWriter;

import org.apache.log4j.Logger;
import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Root;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;

import com.topfinance.runtime.BcException;
import com.topfinance.runtime.BcRuntimeException;


@Root
public class AckRoot {
    
    private static Logger logger = Logger.getLogger(AckRoot.class);
//    0000报文接收成功
//    0001报文重复，本报文被丢弃
//    0002报文核验校验失败
//    0003报文解密失败

    public static final String MSG_PRO_CD_SUCCESS = "0000";
    public static final String MSG_PRO_CD_FAIL_DUPLICATE = "0001";
    public static final String MSG_PRO_CD_FAIL_VERIFY = "0002";
    public static final String MSG_PRO_CD_FAIL_DECRPT = "0003";
    
    

    
    @Attribute(required=false)
    private String OrigSndr;
    
    @Attribute(required=false)
    private String OrigSndDt;
    
    @Attribute(required=false)
    private String MsgTp;
    
    @Attribute(required=false)
    //MessageIdentification
    private String MsgId;

    @Attribute(required=false)
    private String MsgRefId;
    
    //MessageProcessCode
    @Attribute(required=false)
    private String MsgProCd;
    
    public String dumpToString() {
        try {
            Serializer serializer = new Persister();
            StringWriter writer = new StringWriter();
            serializer.write(this, writer);
            return writer.toString();
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new BcRuntimeException(ex); 
        }
    }
    public static AckRoot loadFromString(String str) throws BcException{
        AckRoot instance = null;
        try {
            logger.debug("load ack from string: "+str);
            Serializer serializer = new Persister();
            instance = serializer.read(AckRoot.class, new StringReader(str));

            logger.debug("Done");
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new BcException(ex);
        }
        return instance;
    }
    
    public static AckRoot loadFromFile(String path) {
        AckRoot instance = null;
        try {
            logger.debug("load ack from path: "+path);
            Serializer serializer = new Persister();
            File result = new File(path);    
            instance = serializer.read(AckRoot.class, result);

            logger.debug("Done");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return instance;
    }    
    
    public String getOrigSndr() {
        return OrigSndr;
    }
    public void setOrigSndr(String origSndr) {
        OrigSndr = origSndr;
    }
    public String getOrigSndDt() {
        return OrigSndDt;
    }
    public void setOrigSndDt(String origSndDt) {
        OrigSndDt = origSndDt;
    }
    public String getMsgTp() {
        return MsgTp;
    }
    public void setMsgTp(String msgTp) {
        MsgTp = msgTp;
    }
    public String getMsgId() {
        return MsgId;
    }
    public void setMsgId(String msgId) {
        MsgId = msgId;
    }
    public String getMsgRefId() {
        return MsgRefId;
    }
    public void setMsgRefId(String msgRefId) {
        MsgRefId = msgRefId;
    }
    public String getMsgProCd() {
        return MsgProCd;
    }
    public void setMsgProCd(String msgProCd) {
        MsgProCd = msgProCd;
    }
    
}
