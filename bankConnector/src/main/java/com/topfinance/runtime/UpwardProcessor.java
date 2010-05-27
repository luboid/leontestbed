package com.topfinance.runtime;

import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgNode;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgPassway;
import com.topfinance.cfg.ICfgProtocolBinding;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgRouteRule;
import com.topfinance.db.HiberEntry;
import com.topfinance.db.ResendEntry;
import com.topfinance.plugin.cnaps2.AckRoot;
import com.topfinance.plugin.cnaps2.DocRoot;
import com.topfinance.plugin.cnaps2.MsgHeader;
import com.topfinance.util.AuditUtil;
import com.topfinance.util.BCUtils;
import com.topfinance.util.HiberUtil;
import com.topfinance.util.ResendUtil;

import java.util.List;

import org.apache.camel.Endpoint;
import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.commons.lang.StringUtils;

public class UpwardProcessor extends AbstractProcessor{
    
    public void log(String msg) {
        System.out.println("in UpwardProcessor: "+msg);
    }
    
    public UpwardProcessor() {
        
    }
    
    

    public void preprocess() throws Exception {
        log("preprocess() in "+Thread.currentThread().getName());

        getMsgContext().setUserTxId("xxxx");
        
        logReceiveMsg();
        
        parseMessage();        
        
    }
    
    
    public void process() throws Exception {
        log("process() in "+Thread.currentThread().getName());
        try {
        String utx = getMsgContext().getUserTxId();
        log("utx="+utx);
        

        
        // save or resurrect hibernate
        loadTxContext();
        
        // transform and package
        packageReq();
        
        // find outPort
        findRoute();

        String syncReply = send();
        
        handleTPSyncResponse(syncReply);
        } catch (Exception ex) {
            ex.printStackTrace();
            sendErrMsg();
        }
    }

    private void loadTxContext() {
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        String opName = getMsgContext().getOperationName();
        ICfgOperation cfgOpn = cfgReader.getOperation(getMsgContext().getProtocol(), opName);
        
        if(BOOLEAN_FALSE.equals(cfgOpn.getUpIsEnabled())) {
            
            throw new RuntimeException("up is not enabled on the op");
        }
        
        if(BOOLEAN_TRUE.equals(cfgOpn.getUpIsReply())) {
            String origDocId = getMsgContext().getOrigDocId();   
            if(StringUtils.isEmpty(origDocId)) {
                throw new RuntimeException("origDocId should not be null if op is reply");
            }
            else {
                // TODO resurrect hibernation and set the txID
                // origDocId is the hiberKey used
                HiberEntry hiber = HiberUtil.resurrectHiber(origDocId);
                if(hiber==null) {
                    // TODO hiber is null
                }
                String auditId = hiber.getAuditId();
                // TODO to update the orig audit entry, about receiving reply? 
                AuditUtil.updateOtherAuditLogStatus(auditId, STATE_RECEIVED_RESP, "received async reply", STATUS_COMPLETED);
                
                getMsgContext().setTxId(hiber.getTxId());
                
            }
            auditLog(STATE_INITIALISE_CONTEXT, "retrieved transactionID["+getMsgContext().getTxId()+"] by matching the async reply with original request", STATUS_PENDING);
        } else {
            auditLog(STATE_INITIALISE_CONTEXT, "created transactionID[" + getMsgContext().getTxId() + "]", STATUS_PENDING);
        }
        
        

    }
    
    private void sendErrMsg() {
        // for upward. need send back error to pp
        try {
        ICfgInPort inPort = getMsgContext().getCfgInPort();
        ICfgOutPort outPort = inPort.getAckPort();
        String url = BCUtils.getFullUrlFromPort(outPort);
        
        String errorText = BcConstants.MSG_PP_ERROR;
        log("sendErrMsg!!!!");
        ServerRoutes.getInstance().produce(url, errorText, true);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        
    }
    
    private String logReceiveMsg() {
        Exchange exchange = getMsgContext().getSrcExchange();
        Endpoint inEp = exchange.getFromEndpoint();
        String uri = inEp.getEndpointUri();
        log("inport=" + inEp + ", inport-type=" + inEp.getClass() + ", uri=" + uri);
        Message min = exchange.getIn();
        String ppreq = min.getBody(String.class);
        log("ppreq=" + ppreq);

        auditLog(STATE_RECEIVED_REQ, "Received Message", STATUS_PENDING);
        return ppreq;
    }
    
    protected void parseMessage() {

        // get the type of input msg body(tcp8583/cmt) 
        // 1. can be known from the CfgInPort's type
        // 2. can be know from operation's upFormat
        // or we can do verification of 8583 matching here
     
        
        
        // calling the parser...
        // possibly be isoMessage or cmtMessage
//        IsoMessage isoMsg = new IsoMessage();
//        int type = isoMsg.getType();
        
        // TODO This docRoot is in fact like a header.
        // here we just use this as both header and body.
        DocRoot msg = null;
        try {
            msg = DocRoot.loadFromString(getMsgContext().getSrcExchange().getIn().getBody(String.class));
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
        getMsgContext().setParsedMsg(msg);
        
                
        // now we have no PP msg header,
        // so just extract these fields from payload
        String hIdentity = msg.getHostIdentity();
        String pIdentity = msg.getPartnerIdentity();
        String opName = msg.getOpName();
        String docId = msg.getDocId();
        String origDocId = msg.getOrigDocId();
        
        getMsgContext().setDocId(docId);
        getMsgContext().setOrigDocId(origDocId);
        getMsgContext().setOperationName(opName);
        
        // todo: verify the pp msg
        
        // let the plugin impl to find the CfgBizOperation
        // by matching certain field in msg body (either tcp8583 or cmt which is known ) with another in CfgBizOperation        
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        ICfgOperation cfgOp = cfgReader.getOperation(getMsgContext().getProtocol(), getMsgContext().getOperationName());
        log("cfgOp="+(cfgOp==null? "null":cfgOp.getName()));
        ICfgNode cfgHN = cfgReader.getNodeByIdentity(hIdentity);
        ICfgNode cfgPN = cfgReader.getNodeByIdentity(pIdentity);
        // todo: verify the cfg existed
        
        String hName = cfgHN.getName();
        String pName = cfgPN.getName();
        getMsgContext().setHnName(hName);
        getMsgContext().setPnName(pName);
        getMsgContext().setCfgHN(cfgHN);
        getMsgContext().setCfgPN(cfgPN);
        
        auditLog(STATE_PARSE_VALIDATION, "msg validated", STATUS_PENDING);
        // TODO error handling
     
    }
    
    protected void packageReq() {
        // plugin impl need compose the output msg format
        // either from the input msg body, or from config
        String mesgId = BCUtils.getUniqueMesgId();
        getMsgContext().setMesgId(mesgId);
        String mesgType = getMsgContext().getOperationName();
        // TODO need mesgRefId be filled in an async msg, rather than in ack? 
        String mesgRefId = ""; 
        String origSender = getMsgContext().getCfgHN().getIdentity();
        String origReceiver = getMsgContext().getCfgPN().getIdentity();
        
        MsgHeader header = new MsgHeader(origSender, origReceiver, mesgType, mesgId, mesgRefId);
        String body = this.getMsgContext().getSrcExchange().getIn().getBody(String.class);
        // simply do nothing to body
        String request = header.toText()+body;
        getMsgContext().setPackagedMsg(request);
        
        auditLog(STATE_PKG_OUT_MSG, "packaged message to TP", STATUS_PENDING);
    }
    
    private String send() throws Exception {
        ICfgOutPort cfgOP = getMsgContext().getCfgOutPort();

        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        String opName = getMsgContext().getOperationName();
        ICfgOperation cfgOpn = cfgReader.getOperation(getMsgContext().getProtocol(), opName);
        String ackType = cfgOpn.getUpAckType();
        
        String resendStatus = OP_ACK_TYPE_ASYNC.equals(ackType)? ResendEntry.STATUS_ACTIVE : ResendEntry.STATUS_INACTIVE; 
            // save resend
            String docRoot = getMsgContext().getPackagedMsg();
            // TODO serialize
            byte[] bin = docRoot.getBytes();
            String inPortName = getMsgContext().getCfgInPort().getName();
            
            ResendUtil.saveResend(getMsgContext().getMesgId(), 
                                  DIRECTION_UP,
                                  getMsgContext().getAuditTx().getAuditId(),
                                  resendStatus,                                  
                                  bin,
                                  inPortName
                                  );
        
        
        
        // go this even if the up request itself is a reply
        if(OP_REPLY_TYPE_ASYNC.equals(cfgOpn.getUpReplyType())){
            String hiberkey = getMsgContext().getDocId();
            String txId = getMsgContext().getTxId();
            String auditId = getMsgContext().getAuditTx().getAuditId();
            HiberUtil.saveHiber(hiberkey, DIRECTION_UP, txId, auditId);
        }
        
        
        
        String url = BCUtils.getFullUrlFromPort(cfgOP);
        String syncReply = null;
        
        // exchangepattern always inout, either resp or ack
        // send
        boolean isInOnly = OP_ACK_TYPE_SYNC.equals(ackType) ?  false : true;
        
        log("directly dispatching to outport: "+cfgOP.getName());
        syncReply = ServerRoutes.getInstance().produce(url, getMsgContext().getPackagedMsg(), isInOnly);

        auditLog(STATE_SEND_OUT_MSG, "sending msg to TP", STATUS_PENDING);     

        return syncReply;
    }
    
    protected void findRoute() {
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        // filling in some info of CfgOutPort( which is known) for the next step routing
        // the info can be carried either in a header or property of exchange
        ICfgPassway cfgPassway = cfgReader.getPassway(getMsgContext().getCfgHN(), getMsgContext().getCfgPN());
        ICfgOperation cfgOp = cfgReader.getOperation(getMsgContext().getProtocol(), getMsgContext().getOperationName());
        ICfgProtocolBinding cfgPB = cfgReader.getProtocolBindingByProtocol(cfgPassway, getMsgContext().getProtocol());
        log("cfgPB="+cfgPB);
        
        List<ICfgRouteRule> listRouteRule = cfgReader.getListUpRoute(cfgPB);    
        ICfgRouteRule result = null;
        for(ICfgRouteRule rr : listRouteRule) {
            String operationMask = rr.getOperationMask();
            ICfgInPort ip = rr.getInPort();
            if( cfgOp.getName().startsWith(operationMask)
                // TODO need match Inport ?
                // && ip.getName().equals(inPort.getName())
                ) {
                result = rr;
                break;
            }
        }
        
        getMsgContext().setCfgOutPort(result.getOutPort());
        
    }
    
    
    protected void handleTPSyncResponse(String syncReply) {
        
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        String opName = getMsgContext().getOperationName();
        ICfgOperation cfgOpn = cfgReader.getOperation(getMsgContext().getProtocol(), opName);
        if(OP_REPLY_TYPE_SYNC.equals(cfgOpn.getUpReplyType())) {
            log("received tp syncReply="+syncReply);
            // send back to pp
            log("send tp syncReply to pp");
            getMsgContext().getSrcExchange().getOut().setBody(syncReply);
            auditLog(STATE_SENT_OUT_MSG, "received sync ack from tp and send to pp", STATUS_COMPLETED);            
        } else {
            // async or notify
            
            if(!OP_ACK_TYPE_SYNC.equals(cfgOpn.getUpAckType())) {
                return;
            }
            
            String ack = syncReply;
            log("received tp ack="+ack);
            
            String headerText = ack.substring(0, MsgHeader.TOTAL_LENGTH);
            String bodyText = ack.substring(MsgHeader.TOTAL_LENGTH);
            MsgHeader header = null;
            try {
                header = MsgHeader.fromText(headerText);
            } catch (Exception ex) {
                ex.printStackTrace();
                // no way to generate any meaningful ack
                throw new RuntimeException(ex);
            }      
            
            // verify the ack
            AckRoot ackRoot = null;
            try {
                ackRoot = AckRoot.loadFromString(bodyText);
            } catch (BcException ex) {
                // do nothing
            }
            
            String nextStatus = "", nextDesc="";
            if(OP_REPLY_TYPE_ASYNC.equals(cfgOpn.getUpReplyType())) {
                nextStatus = STATUS_PENDING;
                nextDesc = "message sent to TP, waiting for async reply";
            }else {
                // notify
                nextStatus = STATUS_COMPLETED;
                nextDesc = "message sent to PP";
            }
            
            if(ackRoot==null || !AckRoot.MSG_PRO_CD_SUCCESS.equals(ackRoot.getMsgProCd())) {
                // ack failed
                auditLog(STATE_SENT_OUT_MSG, "Ack failed", STATUS_ERROR);
            } else {
                // ack successed
                auditLog(STATE_SENT_OUT_MSG, nextDesc, nextStatus);
            }
            
            // TODO send the ack to pp
        }

    }
    


    public UWMessageContext getMsgContext() {
        return (UWMessageContext)msgContext;
    }

    public void setMsgContext(UWMessageContext messageContext) {
        this.msgContext = messageContext;
    }

}
