package com.topfinance.message;

import java.io.InputStream;

import org.apache.log4j.Logger;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.plugin.cnaps2.Cnaps2Constants;
import com.topfinance.plugin.cnaps2.MsgHeader;
import com.topfinance.runtime.OpInfo;
import com.topfinance.transform.smooks.SmooksTransformer;
import com.topfinance.util.PerfUtil;

public class DefaultCnaps2Packer  {

    // do not override
	private static Logger logger = Logger.getLogger(DefaultCnaps2Packer.class);
	
	public final String packBody(Object ebo, ICfgOperation cfgOpn, OpInfo opInfo) {
		return packBody(ebo, cfgOpn.getName(), opInfo);
	}
    public final String packBody(Object ebo, String msgCode, OpInfo opInfo) {
        // TODO refactor
    	
    	// TODO handle origMsgId that is not in pp mapping? 
    	
        // ebo2jaxb
    	
    	long s = PerfUtil.time();
        InputStream mapping = FormatFactory.loadPluginMapping(opInfo, CfgConstants.DIRECTION_UP);
        long e1 = PerfUtil.time();
        PerfUtil.perfLog(" cost "+(e1-s)+", end loadPluginMapping" );
        
        Object jaxbObj = SmooksTransformer.java2Java(opInfo.toString(), ebo, mapping);
        long e2 = PerfUtil.time();
        PerfUtil.perfLog(" cost "+(e2-e1)+", end java2Java" );
        
        
        String pkgName = Cnaps2Constants.getPackageName(msgCode);
        Iso8583ToXml converter = new Iso8583ToXml(pkgName);
        

        String body = converter.objectToXml(jaxbObj);
        long e3 = PerfUtil.time();
        PerfUtil.perfLog(" cost "+(e3-e2)+", end objectToXml" );
        
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
    	logger.debug(s);
    }
}
