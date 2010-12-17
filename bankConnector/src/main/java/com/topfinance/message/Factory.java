package com.topfinance.message;

import org.apache.log4j.Logger;

public class Factory {
    
    static Logger logger = Logger.getLogger(Factory.class);
    
    public static IUpInMsgHandler loadParser(String parserClazz) {
        try {
            logger.debug("loading parser for: "+parserClazz);
            IUpInMsgHandler res = (IUpInMsgHandler)Class.forName(parserClazz).newInstance();
            return res;
        } catch (Exception ex) {
            logger.error("failed to load parser", ex);
            throw new RuntimeException(ex);
        }
    }
    
    public static IDownOutMsgHandler loadHandler(String handlerClazz) {
        try {
            logger.debug("loading handler for: "+handlerClazz);
            IDownOutMsgHandler res = (IDownOutMsgHandler)Class.forName(handlerClazz).newInstance();
            return res;
        } catch (Exception ex) {
            logger.error("failed to load handler", ex);
            throw new RuntimeException(ex);
        }
    }
}
