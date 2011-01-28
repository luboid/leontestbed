package com.topfinance.runtime;

public class MessageEvent {
    
    private String origDocId;
    private String origMsgId;
    
    private Object parsedMsg;
    private String packagedMsg;
    


    public String getOrigDocId() {
        return origDocId;
    }
    public void setOrigDocId(String origDocId) {
        this.origDocId = origDocId;
    }
    public String getOrigMsgId() {
        return origMsgId;
    }
    public void setOrigMsgId(String origMsgId) {
        this.origMsgId = origMsgId;
    }
    public Object getParsedMsg() {
        return parsedMsg;
    }
    public void setParsedMsg(Object parsedMsg) {
        this.parsedMsg = parsedMsg;
    }
    public String getPackagedMsg() {
        return packagedMsg;
    }
    public void setPackagedMsg(String packagedMsg) {
        this.packagedMsg = packagedMsg;
    }
    

    
    
    
}
