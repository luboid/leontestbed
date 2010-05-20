package com.topfinance.plugin;

import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.db.ResendEntry;
import com.topfinance.plugin.cnaps2.Cnaps2Plugin;
import com.topfinance.runtime.BcConstants;
import com.topfinance.runtime.DWMessageContext;
import com.topfinance.runtime.DownwardProcessor;
import com.topfinance.runtime.ServerRoutes;
import com.topfinance.runtime.UWMessageContext;
import com.topfinance.runtime.UpwardProcessor;
import com.topfinance.util.AuditUtil;
import com.topfinance.util.BCUtils;
import com.topfinance.util.ResendUtil;
import org.apache.camel.CamelContext;
import org.apache.camel.Exchange;
import org.apache.commons.lang.StringUtils;

public class BasePlugin implements BcConstants{
    
    public static BasePlugin loadPlugin(String name) {
        return new Cnaps2Plugin();
    }
    public DWMessageContext createDWMessageContext(ICfgInPort cfgInPort, Exchange exchange) {
        return new DWMessageContext(cfgInPort, exchange);
    }

    public DownwardProcessor createDownwardProcessor(CamelContext camel) {
        return new DownwardProcessor(camel);
    }

    public UWMessageContext createUWMessageContext(ICfgInPort cfgInPort, Exchange exchange) {
        return new UWMessageContext(cfgInPort, exchange);
    }

    public UpwardProcessor createUpwardProcessor(CamelContext camel) {
        return new UpwardProcessor(camel);
    }
    
    public void processResendAlertMessage(String resendkey) {
        try {
            ResendEntry resend = ResendUtil.resurrectResend(resendkey);
            String inPortName = resend.getInPortName();
            String auditId = resend.getAuditId();
            
            if(StringUtils.isEmpty(inPortName)) {
                // for upward. need send back error to pp
                ICfgReader reader = CfgImplFactory.loadCfgReader();
                ICfgInPort inPort = reader.getInportByName(inPortName);
                ICfgOutPort outPort = inPort.getAckPort();
                String url = BCUtils.getFullUrlFromPort(outPort);
                
                String errorText = "ERROR!!";
                ServerRoutes.getInstance().produce(url, errorText, true);
                AuditUtil.updateAuditLogStatus(auditId, STATE_SENT_OUT_MSG, "tp ack not received before timeout", STATUS_ERROR);
            }
            else {
                // for downward, 
                // TODO need alert by email
                AuditUtil.updateAuditLogStatus(auditId, STATE_SENT_OUT_MSG, "failed to send to pp before timeout", STATUS_ERROR);
                
            }
            
        } catch (Exception ex) {
            ex.printStackTrace();
            // todo: do nothing? 
           
        }
    }
    
//    public AuditTransactionContext createAuditTransactionContext(MessageContext msgContext) {
//        IParticipant toPartner = msgContext.getToParticipant();
//        IParticipant fromPartner = msgContext.getFromParticipant();
//        String toPartnerName = (toPartner != null) ? toPartner.getName() : null;
//        String fromPartnerName = (fromPartner != null) ? fromPartner.getName() : null;
//        int msgDirection = msgContext.getDirection();
//        String opID = msgContext.getOperationID();
//        String closureID = msgContext instanceof OBMessageContext
//                            ? ((OBMessageContext)msgContext).getClosureID()
//                            : msgContext.getMessageID();
//
//       return createAuditTransactionContext(toPartnerName, fromPartnerName, msgDirection, opID, closureID);
//    }
//    
//    public AuditTransactionContext createAuditTransactionContext(String toPartnerName, String fromPartnerName,
//                                                                 int msgDirection, String opID, String closureID) {
//
//     AuditTransactionContext context = DbAccessFactory.createAuditTransactionContext();
//     context.setProtocolName(mProtocolName);
//     context.setProtocolVersion(mProtocolVersion);
//     context.setInstallationName(mInstanceName);
//     context.setOperationID(opID);
//     context.setAUX1(closureID);
//
//     if(msgDirection == MSG_DIRECTION_OB)
//         context.setHostInitiates(true);
//     else
//         context.setHostInitiates(false);
//
//     String hostName = toPartnerName;
//     String partnerName = fromPartnerName;
//     if(msgDirection == MSG_DIRECTION_OB) {
//         hostName = fromPartnerName;
//         partnerName = toPartnerName;
//     }
//
//     if(hostName != null) {
//         context.setHostName(hostName);
//         context.setHostID(hostName);
//     }
//     if(partnerName != null) {
//         context.setTPName(partnerName);
//         context.setTPID(partnerName);
//     }
//     return context;
// }
}
