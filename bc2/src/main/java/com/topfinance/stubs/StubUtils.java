package com.topfinance.stubs;

import com.topfinance.cfg.CfgAccessException;
import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.ICfgPortIn;
import com.topfinance.cfg.ICfgPortOut;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgTransIn;
import com.topfinance.cfg.ICfgTransOut;
import com.topfinance.runtime.BcConstants;

public class StubUtils {
	
	// ports are reversed from server's config
	
    public static String getFullUrlFromPortOut(ICfgPortIn port, ICfgReader reader, boolean isInOnly) throws CfgAccessException{
        String url = port.getUrl();
        // handle URL prefix
        
        ICfgTransIn ti = reader.getTransByPortIn(port);
        String prefix = ti.getPrefix();
        url = prefix+"://"+url;
        
        if(CfgConstants.TCP_PROVIDER_8583.equals(ti.getProvider())) {
            // decide sync parameter: see mina doc on http://camel.apache.org/mina.html
//            String isSync = "";
//            if(port instanceof ICfgPortIn) {
//            // TODO more mina configuration
//                ICfg8583InPort in8583 = (ICfg8583InPort)port;
//                isSync = in8583.getIsSync();
//            }else if(port instanceof ICfgPortOut) {
//                ICfg8583OutPort out8583 = (ICfg8583OutPort)port;
//                isSync = out8583.getIsSync();
//            }
//            url+= CfgConstants.BOOLEAN_TRUE.equals(isSync)? "?sync=true" : "?sync=false";
            
            url += isInOnly? "?sync=false" : "?sync=true";
            url+=("&timeout="+BcConstants.CHANNEL_DEFAULT_TIMEOUT);
            url+=("&disconnect=true");
//            url+=("&disconnect=false");
        }
        
        return url;
    }
    
    
    public static String getFullUrlFromPortIn(ICfgPortOut port, ICfgReader reader, boolean isInOnly) throws CfgAccessException{
        String url = port.getUrl();
        // handle URL prefix
        
        ICfgTransOut ti = reader.getTransByPortOut(port);
        String prefix = ti.getPrefix();
        url = prefix+"://"+url;
        
        if(CfgConstants.TCP_PROVIDER_8583.equals(ti.getProvider())) {
            
            // decide sync parameter: see mina doc on http://camel.apache.org/mina.html
            
//            String isSync = "";
//            if(port instanceof ICfgPortIn) {
//            // TODO more mina configuration
//                ICfg8583InPort in8583 = (ICfg8583InPort)port;
//                isSync = in8583.getIsSync();
//            }else if(port instanceof ICfgPortOut) {
//                ICfg8583OutPort out8583 = (ICfg8583OutPort)port;
//                isSync = out8583.getIsSync();
//            }
//            url+= CfgConstants.BOOLEAN_TRUE.equals(isSync)? "?sync=true" : "?sync=false";
            
            url += isInOnly? "?sync=false" : "?sync=true&disconnectOnNoReply=true&noReplyLogLevel=OFF";
            
//            url+=("&timeout="+BcConstants.CHANNEL_DEFAULT_TIMEOUT);
        }
        
        return url;
    }
}
