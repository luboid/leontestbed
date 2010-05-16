package com.topfinance.plugin;

import org.apache.camel.CamelContext;
import org.apache.camel.Exchange;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.plugin.cnaps2.Cnaps2Plugin;
import com.topfinance.runtime.DWMessageContext;
import com.topfinance.runtime.DownwardProcessor;
import com.topfinance.runtime.UWMessageContext;
import com.topfinance.runtime.UpwardProcessor;

public class BasePlugin {
    
    public static BasePlugin loadPlugin(String name) {
        return new Cnaps2Plugin();
    }
    public DWMessageContext createDWMessageContext(ICfgInPort cfgInPort, Exchange exchange) {
        return new DWMessageContext(cfgInPort, exchange);
    }

    public DownwardProcessor createDownwardProcessor(DWMessageContext msgContext, CamelContext camel) {
        return new DownwardProcessor(msgContext,camel);
    }

    public UWMessageContext createUWMessageContext(ICfgInPort cfgInPort, Exchange exchange) {
        return new UWMessageContext(cfgInPort, exchange);
    }

    public UpwardProcessor createUpwardProcessor(UWMessageContext msgContext, CamelContext camel) {
        return new UpwardProcessor(msgContext,camel);
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
