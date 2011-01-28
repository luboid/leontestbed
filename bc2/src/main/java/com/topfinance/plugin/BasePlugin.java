package com.topfinance.plugin;

import java.util.HashMap;
import java.util.Map;

import org.apache.camel.Exchange;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgPortIn;
import com.topfinance.cfg.ICfgPortOut;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.db.HiberEntry;
import com.topfinance.db.ResendEntry;
import com.topfinance.runtime.BcConstants;
import com.topfinance.runtime.DWMessageContext;
import com.topfinance.runtime.DownwardProcessor;
import com.topfinance.runtime.OperationDefinitions;
import com.topfinance.runtime.ServerRoutes;
import com.topfinance.runtime.UWMessageContext;
import com.topfinance.runtime.UpwardProcessor;
import com.topfinance.util.AuditUtil;
import com.topfinance.util.HiberUtil;
import com.topfinance.util.ResendUtil;

public abstract class BasePlugin implements BcConstants, CfgConstants{
    
    static Logger logger = Logger.getLogger(BasePlugin.class);
    
    
    private static Map<String, String> pluginNames = new HashMap<String, String>();
    
    static {
        pluginNames.put(CfgConstants.PROTOCOL_CNAPS2, "com.topfinance.plugin.cnaps2.Cnaps2Plugin");
    }
    
    private static Map<String, BasePlugin> plugins = new HashMap<String, BasePlugin>();

    public static void createPlugin(String name, String clazz) {
        try {
            BasePlugin plugin = (BasePlugin)Class.forName(clazz).newInstance();
            plugins.put(name, plugin);
        } catch (Exception ex) {
            logger.error("error when creating plugin for "+name, ex);
            throw new RuntimeException(ex);
        }
    }
    
    public abstract OperationDefinitions loadOperationDefinitions();
    
    public static BasePlugin loadPlugin(String name) {
        BasePlugin res = plugins.get(name);
        if(res ==null) {
            String clazz = pluginNames.get(name);
            if(clazz==null) {
                throw new RuntimeException("plugin ["+name+"] not supported");
            }
            BasePlugin.createPlugin(name, clazz);
            res = plugins.get(name);
        }
        return res;
    }
    
    public DWMessageContext createDWMessageContext(Exchange exchange) {
        return new DWMessageContext(exchange);
    }

    public DownwardProcessor createDownwardProcessor() {
        return new DownwardProcessor();
    }

    public UWMessageContext createUWMessageContext(Exchange exchange) {
        return new UWMessageContext(exchange);
    }

    public UpwardProcessor createUpwardProcessor() {
        return new UpwardProcessor();
    }
    
    public void processResendAlertMessage(String resendkey) {
        try {
            ResendEntry resend = ResendUtil.resurrectResend(resendkey);
            if(resend==null) {
                // do nothing. ack has arrived before resend expiry alert processed.
                return;
            }
            
            String inPortName = resend.getInPortName();
            String auditId = resend.getAuditId();
            
            if(DIRECTION_UP.equals(resend.getDirection())) {
                if(StringUtils.isNotEmpty(inPortName)) {
                    // for upward. need send back error to pp
                    ICfgReader reader = CfgImplFactory.loadCfgReader();
                    ICfgPortIn inPort = reader.getInportByName(inPortName);
                    ICfgPortOut outPort = reader.getAckPortByIP(inPort);
                    
                    String errorText = BcConstants.MSG_PP_ERROR;
                    ServerRoutes.getInstance().produce(outPort, errorText, true);
                    
                }
                AuditUtil.updateOtherAuditLogStatus(auditId, STATE_SENT_OUT_MSG, "tp ack not received before timeout", STATUS_ERROR);
                // TODO delete the HiberEntry (if have) to deny the following async reply                
            }
            else {
                // for downward, 
                // TODO need alert by email
                AuditUtil.updateOtherAuditLogStatus(auditId, STATE_SENT_OUT_MSG, "failed to send to pp before timeout", STATUS_ERROR);
                
            }
            
        } catch (Exception ex) {
            ex.printStackTrace();
            // todo: do nothing? 
           
        }
    }
    
    public void processHiberAlertMessage(String resendkey) {
        try {
            HiberEntry resend = HiberUtil.resurrectHiber(resendkey);
            if(resend==null) {
                // do nothing. ack has arrived before resend expiry alert processed.
                return;
            }
            
            String inPortName = null; 
            // resend.getInPortName();
            String auditId = resend.getAuditId();
            
            if(DIRECTION_UP.equals(resend.getDirection())) {
                if(StringUtils.isNotEmpty(inPortName)) {
                    // TODO for upward. need send back error to pp
                    ICfgReader reader = CfgImplFactory.loadCfgReader();
                    ICfgPortIn inPort = reader.getInportByName(inPortName);
                    ICfgPortOut outPort = reader.getAckPortByIP(inPort);
                    
                    String errorText = "ERROR!!";
                    ServerRoutes.getInstance().produce(outPort, errorText, true);
                }
                AuditUtil.updateOtherAuditLogStatus(auditId, STATE_SENT_OUT_MSG, "tp async reply not received before timeout", STATUS_ERROR);
                // TODO delete the HiberEntry (if have) to deny the following async reply                
                
            }
            else {
                // for downward, 
                // TODO need alert by email
                AuditUtil.updateOtherAuditLogStatus(auditId, STATE_SENT_OUT_MSG, "pp async reply not received before timeout", STATUS_ERROR);
                
            }
            
        } catch (Exception ex) {
            ex.printStackTrace();
            // todo: do nothing? 
        }
    }

}
