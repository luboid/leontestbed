package com.topfinance.message;

import java.io.InputStream;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.plugin.cnaps2.Cnaps2Constants;
import com.topfinance.plugin.cnaps2.MsgHeader;
import com.topfinance.runtime.OpInfo;
import com.topfinance.transform.smooks.SmooksTransformer;

public class DefaultCnaps2Packer  {

    // do not override
	
    public final String packBody(Object ebo, ICfgOperation cfgOpn, OpInfo opInfo) {
        // TODO refactor
    	
    	// TODO handle origMsgId that is not in pp mapping? 
    	
        // ebo2jaxb
        InputStream mapping = FormatFactory.loadPluginMapping(opInfo, CfgConstants.DIRECTION_UP);
        Object jaxbObj = SmooksTransformer.java2Java(ebo, mapping);
    	
        String pkgName = Cnaps2Constants.getPackageName(cfgOpn.getName());
        Iso8583ToXml converter = new Iso8583ToXml(pkgName);
        
        String body = converter.objectToXml(jaxbObj);
        return body;
    }
    

    public final String addHeader(String body, String origSender, String origReceiver, String mesgType, String mesgId, String mesgRefId) {
    	
        MsgHeader header = new MsgHeader(origSender, origReceiver, mesgType, mesgId, mesgRefId);
        String headerstr = header.toText();
        debug("header="+headerstr+", length="+headerstr.length()+", should be="+MsgHeader.TOTAL_LENGTH);
        
        String res = headerstr+body;
        
        
        return res;
    }

    public static void debug(String s) {
    	System.out.println(s);
    }
}
