package com.topfinance.message;

import java.io.InputStream;

public interface IUpInMsgHandler {
    
    public Object parse(String msg) throws FatalParseException;
    public Object convert(Object obj, String opName, InputStream mapping);
    
    public String getOpName();
    public String getDocId();
    public String getOrigDocId();
    
    
    public String getMesgId();

    public String getMesgRefId();

    public String getMesgType();

    public String getOrigSender();

    public String getOrigReceiver();
}
