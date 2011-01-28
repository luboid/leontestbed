package com.topfinance.message;

import java.io.InputStream;

public interface IDownOutMsgHandler {

    public Object convert(Object obj, String opName, InputStream mapping);
    
    public String pack(Object obj, String origSender, String origReceiver, String mesgType, String mesgId, String mesgRefId);
}
