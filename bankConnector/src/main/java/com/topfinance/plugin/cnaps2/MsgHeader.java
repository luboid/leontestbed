package com.topfinance.plugin.cnaps2;

import java.util.HashMap;
import java.util.Map;

import org.springframework.util.StringUtils;

public class MsgHeader {
    
    private static final MsgField[] metas = new MsgField[] {
       MsgField.BEGIN_FLAG,
       MsgField.VERSION_ID,
       MsgField.ORIG_SENDER,
       MsgField.ORIG_SENDER_SID,
       MsgField.ORIG_RECEIVER,
       MsgField.ORIG_RECEIVER_SID,
       MsgField.ORIG_SEND_DATE,
       MsgField.ORIG_SEND_TIME,
       MsgField.STRUCT_TYPE,
       MsgField.MESG_TYPE,
       MsgField.MESG_ID,
       MsgField.MESG_REF_ID
    };
    
    
    public static final char X_SURFIX = 0x20;
    public static final char N_PREFIX = 0x30;
    public static int TOTAL_LENGTH;
    
    static {
        int total = 0;
        for(MsgField meta: metas) {
            total+=meta.getLength();
        }
        TOTAL_LENGTH = total;
    }
    
    private MsgHeader() {
    }
    
    // minimum constructor
    public MsgHeader(String origSender, String origReceiver, String mesgType, String mesgId, String mesgRefId) {
        setOrigSender(origSender);
        setOrigReceiver(origReceiver);
        setMesgType(mesgType);
        setMesgID(mesgId);
        setMesgRefID(mesgRefId);
    }
    
    private Map<MsgField, Object> fields = new HashMap<MsgField, Object>();  
    
    public String toText() {
        StringBuffer buf = new StringBuffer();
        for(MsgField meta : metas) {
            Object val = fields.get(meta);
            if(val == null) {
                val = meta.getDefaultVal();
            }
            if(val==null || val.toString().isEmpty()) {
                if(meta.isRequired()) {
                    // TODO validate required
                    // throw 
                    val = "";
                }else {
                    val = "";
                }
            }
            String content = val.toString();
            int length = meta.getLength();
            String type = meta.getType();
            if(content.length()>length) {
                // TODO validate and throw
                content = content.substring(0, length);
            }
            
            // TODO elaborate on MsgHeader parsing
            if(type.equals(MsgField.TYPE_X)) {
                StringBuffer temp = new StringBuffer(content);
                // pad to length
                for(int i=0;i<length-content.length();i++) {
                    temp.append(X_SURFIX);
                }
                content = temp.toString();
                
            }else if(type.equals(MsgField.TYPE_N)) {
                StringBuffer temp = new StringBuffer();
                // pad to length
                for(int i=0;i<length-content.length();i++) {
                    temp.append(N_PREFIX);
                }
                temp.append(content);
                content = temp.toString();
            } else if(type.equals(MsgField.TYPE_D)) {
                StringBuffer temp = new StringBuffer();
                // pad to length
                for(int i=0;i<length-content.length();i++) {
                    temp.append(N_PREFIX);
                }
                temp.append(content);
                content = temp.toString();
            }  else if(type.equals(MsgField.TYPE_T)) {
                StringBuffer temp = new StringBuffer();
                // pad to length
                for(int i=0;i<length-content.length();i++) {
                    temp.append(N_PREFIX);
                }
                temp.append(content);
                content = temp.toString();
            } 
            
            // TODO it cause problem to make msgHeader upper case, when parsing content and matching configuration
//            content = content.toUpperCase();
            
            buf.append(content);
        }
        return buf.toString();
        
    }
    public static MsgHeader fromText(String text) {
        System.out.println("text="+text);
        MsgHeader res = new MsgHeader();
        for(MsgField meta : metas) {
            String name = meta.getName();
            int pos = meta.getPos();
            int length = meta.getLength();
            String type = meta.getType();

            String content = text.substring(pos, pos+length);
            if(type.equals(MsgField.TYPE_X)) {
                // remove surfixing 0x20
                content = StringUtils.trimTrailingCharacter(content, X_SURFIX);                
            }else if(type.equals(MsgField.TYPE_N)) {
                // remove prefixing 0x30
                content = StringUtils.trimLeadingCharacter(content, N_PREFIX);
                
            } else if(type.equals(MsgField.TYPE_D)) {
                // remove prefixing 0x30
                content = StringUtils.trimLeadingCharacter(content, N_PREFIX);
                
            } else if(type.equals(MsgField.TYPE_T)) {
                // remove prefixing 0x30
                content = StringUtils.trimLeadingCharacter(content, N_PREFIX);
                
            }
//            System.out.println("name="+name+", pos="+pos+", length="+length+", type="+type+", content="+content+";");
            res.setField(meta, content);
        }
        
        return res;
    }
    
    private void setField(MsgField key, Object obj) {
        fields.put(key, obj);
    }
    
    public void setOrigSender(String obj) {
        fields.put(MsgField.ORIG_SENDER, obj);
    }
    public String getOrigSender() {
        return (String)fields.get(MsgField.ORIG_SENDER);
    }
    
    public void setOrigReceiver(String obj) {
        fields.put(MsgField.ORIG_RECEIVER, obj);
    }
    public String getOrigReceiver() {
        return (String)fields.get(MsgField.ORIG_RECEIVER);
    }
    
    public String getMesgType() {
        return (String)fields.get(MsgField.MESG_TYPE);
    }
    public void setMesgType(String msgType) {
        fields.put(MsgField.MESG_TYPE, msgType);
    }    
    public String getMesgID() {
        return (String)fields.get(MsgField.MESG_ID);
    }
    public void setMesgID(String msgID) {
        fields.put(MsgField.MESG_ID, msgID);
    }        
    public String getMesgRefID() {
        return (String)fields.get(MsgField.MESG_REF_ID);
    }
    public void setMesgRefID(String msgRefID) {
        fields.put(MsgField.MESG_REF_ID, msgRefID);
    }        
}
