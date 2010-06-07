package com.topfinance.runtime;

import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgNode;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgRouteRule;
import com.topfinance.cfg.dummy.TestDummy;
import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.db.HiberEntry;
import com.topfinance.db.ResendEntry;
import com.topfinance.plugin.cnaps2.AckRoot;
import com.topfinance.plugin.cnaps2.MsgHeader;
import com.topfinance.util.AuditUtil;
import com.topfinance.util.BCUtils;
import com.topfinance.util.HiberUtil;
import com.topfinance.util.ResendUtil;

import java.util.List;

import org.apache.camel.Endpoint;
import org.apache.camel.Exchange;
import org.apache.camel.ExchangePattern;
import org.apache.camel.Message;
import org.apache.commons.lang.StringUtils;

public class DownwardProcessor extends AbstractProcessor{
    public void log(String msg) {
        System.out.println("in DownwardProcessor: "+msg);
    }
    public DownwardProcessor() {
        
    }

    public void preprocess() throws Exception {
        log("preprocess() in "+Thread.currentThread().getName());
    }
    public void process() throws Exception {
        log("process() in "+Thread.currentThread().getName());
        // flow for downward
        
        // load the plugin impl class
        // by the bizProtocol attribute of the CfgInport, and then the plugin attribute
        
        // let the plugin impl to parse the msg body
        // the type of input msg body(tcp8583/cmt) can be known from the CfgInPort's type
        logReceiveMsg();
        
        String validateStatus = validateAndParse();
        
        // no ack of ack
        if (getMsgContext().isAck()) {
            return;
        }

        if (!validateStatus.equals(AckRoot.MSG_PRO_CD_SUCCESS)) {
            // parse error, nothing more to do?
            pkgAndsendAck(validateStatus);
            return;
        }

        // TODO do below in separate thread
        try {
            // transform and package
            packageReq();


        } catch (Exception ex) {
            ex.printStackTrace();
            validateStatus = AckRoot.MSG_PRO_CD_FAIL_VERIFY;
        }

        // send ack before sending to pp
        pkgAndsendAck(validateStatus);

        String syncReply = send();

        handlePPSyncResponse(syncReply);

        
    }

    
    
    private String logReceiveMsg() {
        Exchange exchange = getMsgContext().getSrcExchange();
        Endpoint inEp = exchange.getFromEndpoint();
        String uri = inEp.getEndpointUri();
        
        Message min = exchange.getIn();
        String tpreq = min.getBody(String.class);
        log("inport=" + inEp + ", inport-type=" + inEp.getClass() + ", uri=" + uri+", tpreq=" + tpreq);

        return tpreq;
    }
    
    
    protected String validateAndParse() {
        

        // calling the parser...
        // possibly be isoMessage or cmtMessage
//        IsoMessage isoMsg = new IsoMessage();
//        int type = isoMsg.getType();
        
        
        // TODO handle inbound async ack?
        // the inbound msg is an ack of previous outbound msg
        String message = getMsgContext().getSrcExchange().getIn().getBody(String.class);
        String headerText = message.substring(0, MsgHeader.TOTAL_LENGTH);
        String bodyText = message.substring(MsgHeader.TOTAL_LENGTH);
        MsgHeader header = null;
        try {
            header = MsgHeader.fromText(headerText);
        } catch (Exception ex) {
            ex.printStackTrace();
            // no way to generate any meaningful ack
            throw new RuntimeException(ex);
        }        
        
        String mesgId = header.getMesgID();
        String mesgRefId = header.getMesgRefID();
        String mesgType = header.getMesgType();
        String origSender = header.getOrigSender();
        String origReceiver = header.getOrigReceiver();
        
        String validateStatus = AckRoot.MSG_PRO_CD_SUCCESS;
        // TODO validation of header
        // if(!header.validate) {
        // // best-effort to fill the ack
        //      syncAck = new AckRoot();
        // }

        
        // set context
        getMsgContext().setMesgId(mesgId);
        getMsgContext().setOrigMesgId(mesgRefId);
        getMsgContext().setOperationName(mesgType);
        getMsgContext().setOrigSender(origSender);
        getMsgContext().setOrigReceiver(origReceiver);
        
        if(!getMsgContext().isAck()) {
            // TODO auditlog should be done after parsing and know whether it's ack or not
            auditLog(STATE_RECEIVED_REQ, "Received Message over transport: ", STATUS_PENDING);
        }
        
        // TODO swap host and parter when testing on two machines
        String hIdentity = origReceiver;
        String pIdentity = origSender; 
//        String hIdentity = origSender;
//        String pIdentity = origReceiver;


        // find outPort
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        List<ICfgRouteRule> listRouteRule = cfgReader.getListDownRoute();  
        
        ICfgOutPort outPort = BCUtils.findRoute(listRouteRule, getMsgContext().getOperationName());
        
        
//        ICfgNode cfgHN = cfgReader.getNodeByIdentity(hIdentity);
//        ICfgNode cfgPN = cfgReader.getNodeByIdentity(pIdentity);   
//        if( cfgHN==null || cfgPN==null ) {
//            log("cannot find host with id{"+hIdentity+"} or partner with id{"+pIdentity+"}");
//            validateStatus = AckRoot.MSG_PRO_CD_FAIL_VERIFY;
//        } else if(!NODETYPE_HOST.equals(cfgHN.getType()) || !NODETYPE_PARTNER.equals(cfgPN.getType()) ) {
//            log("must swap host with id{"+hIdentity+"} and partner with id{"+pIdentity+"}");
//            validateStatus = AckRoot.MSG_PRO_CD_FAIL_VERIFY;
//        }
         if(outPort ==null) {
             log("cannot find route rule matching");
             validateStatus = AckRoot.MSG_PRO_CD_FAIL_VERIFY;             
         } else {
             getMsgContext().setCfgOutPort(outPort);
             ICfgNode cfgHN = getMsgContext().getCfgInPort().getNode();
             ICfgNode cfgPN = outPort.getNode();  
             String hName = cfgHN.getName();
             String pName = cfgPN.getName();
             getMsgContext().setHnName(hName);
             getMsgContext().setPnName(pName);
             getMsgContext().setCfgHN(cfgHN);
             getMsgContext().setCfgPN(cfgPN);
          }
             
        // todo: check duplication
        // checkDuplicate();
        
        // validate others
        
        
        if (getMsgContext().isAck()) {
            AckRoot ack = null;
            try {
                ack = AckRoot.loadFromString(bodyText);
            } catch (BcException ex) {
                validateStatus = AckRoot.MSG_PRO_CD_FAIL_VERIFY;
            }
            if (ack != null) {
                getMsgContext().setParsedMsg(ack);
            }            
        } else {
            
            // Parse xml body
            String pkgName = Iso8583ToXml.getPackageName(mesgType);

            Object jaxbObj = null;
            try {
                jaxbObj = new Iso8583ToXml(pkgName).xmlToObject(bodyText);
            } catch (Exception ex) {
                ex.printStackTrace();
                validateStatus = AckRoot.MSG_PRO_CD_FAIL_VERIFY;
            }
            if(jaxbObj!=null) {
                getMsgContext().setParsedMsg(jaxbObj);
                String msgId = BCUtils.extractMsgId(jaxbObj);
                getMsgContext().setDocId(msgId);
            }
 
//            DocRoot body = null;
//            try {
//                body = DocRoot.loadFromString(bodyText);
//            } catch (BcException ex) {
//                validateStatus = AckRoot.MSG_PRO_CD_FAIL_VERIFY;
//            }
//            if (body != null) {
//                getMsgContext().setDocId(body.getDocId());
//                getMsgContext().setOrigDocId(body.getOrigDocId());
//                getMsgContext().setParsedMsg(body);
//            }
        }
        
        // save or resurrect hibernate
        try {
            loadTxContext();
        } catch (Exception ex) {
            ex.printStackTrace();
            validateStatus = AckRoot.MSG_PRO_CD_FAIL_VERIFY;
        }
        
        if (!getMsgContext().isAck()) {
            if (!validateStatus.equals(AckRoot.MSG_PRO_CD_SUCCESS)) {
                // do not proceed
                auditLog(STATE_PARSE_VALIDATION, "msg failed to validated", STATUS_ERROR);
            } else {
                auditLog(STATE_PARSE_VALIDATION, "msg validated", STATUS_PENDING);
            }
        } else {
            if (!validateStatus.equals(AckRoot.MSG_PRO_CD_SUCCESS)) {
                // do not proceed
                AuditUtil.updateOtherAuditLogStatus(getMsgContext().getAuditTx().getAuditId(),
                                                    STATE_PARSE_VALIDATION, "ack failed to validated", STATUS_ERROR);
            } else {
                AuditUtil.updateOtherAuditLogStatus(getMsgContext().getAuditTx().getAuditId(),
                                                    STATE_PARSE_VALIDATION, "ack validated", STATUS_PENDING);
            }        
        }
        
        return validateStatus;
    }    
    
    public void processAsyncAck() {
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        AckRoot ack = (AckRoot)getMsgContext().getParsedMsg();
        String origMesgId = ack.getMsgId();
        String ackCode = ack.getMsgProCd();
        
        ResendEntry resend = ResendUtil.resurrectResend(origMesgId);
        if(resend!=null) {
            String auditId = resend.getAuditId();
            // all follow-up auditlog must use the retrieved auditId (which will be currentAuditId)
            getMsgContext().getAuditTx().setAuditId(auditId);
            if(AckRoot.MSG_PRO_CD_SUCCESS.equals(ackCode)) {
                String opName = ack.getMsgTp();
                ICfgOperation cfgOpn = cfgReader.getOperation(getMsgContext().getProtocol(), opName);
                
                // TODO handle if async reply comes ealier than ack
                // possible, including last status in hiber/resend entry
                
                String nextStatus = STATUS_COMPLETED;
                if(OP_REPLY_TYPE_ASYNC.equals(cfgOpn.getUpReplyType())) {
                    // expect async reply
                    nextStatus = STATUS_PENDING;
                }
                AuditUtil.updateOtherAuditLogStatus(auditId, 
                                               STATE_SENT_OUT_MSG, "received sync ack from tp and send to pp", nextStatus);    
            }
            else {
                AuditUtil.updateOtherAuditLogStatus(auditId, 
                                               STATE_SENT_OUT_MSG, "received sync ack with fail mark", STATUS_ERROR);
            }
        } else {
            // not matched, this ack is just discarded
            // do nothing
            log("received ack which the original message is not found: "+origMesgId);
        }
    }
    
    
    private void pkgAndsendAck(String validateStatus) {
        

            
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();

        AckRoot ack = null;
        ICfgOperation cfgOpn = cfgReader.getOperation(getMsgContext().getProtocol(), getMsgContext().getOperationName());
        log("cfgOp="+(cfgOpn==null? "null":cfgOpn.getName()));
        if (OP_REPLY_TYPE_SYNC.equals(cfgOpn.getDownReplyType())
            || OP_ACK_TYPE_NONE.equals(cfgOpn.getDownAckType())) {
            // TODO what do with sync-req-resp which may still need a sync reply?
            return;
        } 
        
        // send ack only when async or notify
        ack = new AckRoot();
        ack.setMsgId(getMsgContext().getMesgId());
        ack.setMsgRefId(getMsgContext().getOrigMesgId());
        ack.setOrigSndr(getMsgContext().getOrigSender());
        ack.setMsgTp(getMsgContext().getOperationName());
        ack.setMsgProCd(validateStatus);
        
        // package ack
        MsgHeader msgHeader = new MsgHeader(
           getMsgContext().getOrigSender(),
           getMsgContext().getOrigReceiver(),
           TestDummy.OPERATION_900,
           getMsgContext().getMesgId(),
           getMsgContext().getOrigMesgId()
        ); 
        String ackText = msgHeader.toText()+ack.dumpToString();
        
        if (OP_ACK_TYPE_SYNC.equals(cfgOpn.getDownAckType())) {
            // send sync ack
            getMsgContext().getSrcExchange().getOut().setBody(ackText);
            if (!ack.getMsgProCd().equals(AckRoot.MSG_PRO_CD_SUCCESS)) {
                // do not proceed
                auditLog(STATE_SEND_ACK, "sent ack with failure flag", STATUS_ERROR);
            } else {
                auditLog(STATE_SEND_ACK, "sent ack with success flag", STATUS_PENDING);
            }
        } else {
            // send async ack
            try {
                sendAsyncAck(ackText);
            } catch (Exception ex) {
                ex.printStackTrace();
                auditLog(STATE_SEND_ACK, "failed to send ack", STATUS_ERROR);
            }
            if (!ack.getMsgProCd().equals(AckRoot.MSG_PRO_CD_SUCCESS)) {
                
                // do not proceed
                auditLog(STATE_SEND_ACK, "sent ack with failure flag", STATUS_ERROR);
            } else {
                auditLog(STATE_SEND_ACK, "sent ack with success flag", STATUS_PENDING);
            }
            
            
        }
    }
    
    
    private void loadTxContext() {
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        if(getMsgContext().isAck()) {
            // is async ack
            processAsyncAck();
            return;
        }

        String opName = getMsgContext().getOperationName();
        ICfgOperation cfgOpn = cfgReader.getOperation(getMsgContext().getProtocol(), opName);
        
        String error = "";
        boolean logged = false;
        
        if(BOOLEAN_FALSE.equals(cfgOpn.getDownIsEnabled())) {
            sendErrMsg();
            error = "down is not enabled on the op {"+opName+"}";
        }
        else {
            
        if(BOOLEAN_TRUE.equals(cfgOpn.getDownIsReply())) {
            // get async reply
            String origDocId = getMsgContext().getOrigDocId();   
            if(StringUtils.isEmpty(origDocId)) {
                error="origDocId should not be null if op is reply";
            }
            else {
                // TODO resurrect hibernation and set the txID  
                HiberEntry hiber = HiberUtil.resurrectHiber(origDocId);
                if(hiber==null) {
                    error="Can not find the matching hibernated record with id="+origDocId;
                }
                else {
                    String auditId = hiber.getAuditId();
                    // TODO to update the orig audit entry, about receiving reply? 
                    AuditUtil.updateOtherAuditLogStatus(auditId, STATE_RECEIVED_RESP, "received async reply", STATUS_COMPLETED);
                    getMsgContext().setTxId(hiber.getTxId());
                    auditLog(STATE_INITIALISE_CONTEXT, "retrieved transactionID["+getMsgContext().getTxId()
                         +"] by matching the async reply with original request", STATUS_PENDING);
                    logged = true;                
                }
            }

        } 
        }
        
        if(logged==false) {
            auditLog(STATE_INITIALISE_CONTEXT, "created transactionID[" + getMsgContext().getTxId() + "]", STATUS_PENDING);
        }
        
        if(error.length()>0) {
            throw new RuntimeException(error);
        }
        
        
    }    
    private void sendErrMsg() {
        log("sendErrMsg!!!!");
    }
    protected void packageReq() {
        // plugin impl need compose the output msg format
        // either from the input msg body, or from config 
//        String ppReq = ((DocRoot)getMsgContext().getParsedMsg()).toText();
//        
//        // simply do nothing
//        String request = ppReq;
//        getMsgContext().setPackagedMsg(request);
        
        auditLog(STATE_PKG_OUT_MSG, "packaged message to PP", STATUS_PENDING);
    }
    
    

    
    private void sendAsyncAck(String ackText) throws Exception {
        
        ICfgInPort inPort = getMsgContext().getCfgInPort();
        ICfgOutPort ackPort = inPort.getAckPort();
        
        String url = BCUtils.getFullUrlFromPort(ackPort);

        // always InOnly
        // send
        
        log("dispatching async ack {"+ackText+"} to outport: "+ackPort.getName());
        ServerRoutes.getInstance().produce(url, ackText, true);
        
        return;
    }
    private String send() throws Exception {

        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        
        ICfgOperation cfgOpn = cfgReader.getOperation(getMsgContext().getProtocol(), getMsgContext().getOperationName());
        // acktype is for 990
        // here for pp ack, always active to trigger timeout or alert
        String resendStatus = ResendEntry.STATUS_ACTIVE;
        
        // save resend
        Object obj = getMsgContext().getParsedMsg();
        // TODO serialize
        DocRoot doc = (DocRoot)obj;
        byte[] bin = doc.toText().getBytes();
        // 990 is sent before here. so ackPort is useless
        String inPortName = "";
        ResendUtil.saveResend(getMsgContext().getMesgId(), 
                              DIRECTION_DOWN,
                              getMsgContext().getAuditTx().getAuditId(),
                              resendStatus,                                  
                              bin,
                              inPortName
                              );
        
        // go this even if the down request itself is a reply
        if(OP_REPLY_TYPE_ASYNC.equals(cfgOpn.getDownReplyType())){
            String hiberkey = getMsgContext().getDocId();
            String txId = getMsgContext().getTxId();
            String auditId = getMsgContext().getAuditTx().getAuditId();
            HiberUtil.saveHiber(hiberkey, DIRECTION_DOWN, txId, auditId);
        }
        
        ICfgOutPort cfgOP = getMsgContext().getCfgOutPort();
        String url = BCUtils.getFullUrlFromPort(cfgOP);

        String syncReply = null;

        // send
        boolean isInOnly = true;
        ExchangePattern expatn = ExchangePattern.InOnly;
        if(OP_REPLY_TYPE_SYNC.equals(cfgOpn.getDownReplyType())) {
            isInOnly = false;
            expatn = ExchangePattern.InOut;
        }
        

        
        log("directly dispatching to outport: "+cfgOP.getName());
        try {
            syncReply = ServerRoutes.getInstance().produce(url, getMsgContext().getPackagedMsg(), isInOnly);
            
            // reset the resend entry
            ResendUtil.resetResend(getMsgContext().getMesgId());
        } catch (Exception ex) {
            // TODO retry
            // do nothing and waiting for timeout
            ex.printStackTrace();
            auditLog(STATE_SENT_OUT_MSG, "failed to send msg to pp, reason: "+ex.getMessage(), STATUS_ERROR);
        }

        return syncReply;
    }
    
    protected void handlePPSyncResponse(String syncReply) {
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        String opName = getMsgContext().getOperationName();
        ICfgOperation cfgOpn = cfgReader.getOperation(getMsgContext().getProtocol(), opName); 
        
        if(OP_REPLY_TYPE_SYNC.equals(cfgOpn.getDownReplyType())) {
            log("received pp syncReply="+syncReply);      
            // send back to tp
            log("send pp syncReply to tp");
            getMsgContext().getSrcExchange().getOut().setBody(syncReply);
            auditLog(STATE_SENT_OUT_MSG, "received sync ack from pp and send to tp", STATUS_COMPLETED);            
        } else {
            // async or notify

            String nextStatus = "", nextDesc="";
            if(OP_REPLY_TYPE_ASYNC.equals(cfgOpn.getUpReplyType())) {
                nextStatus = STATUS_PENDING;
                nextDesc = "message sent to PP, waiting for async reply";
            }else {
                // notify
                nextStatus = STATUS_COMPLETED;
                nextDesc = "message sent to PP";
            }
            
            auditLog(STATE_SENT_OUT_MSG, nextDesc, nextStatus);

           
        }
        

    }
    
    
    
    public DWMessageContext getMsgContext() {
        return (DWMessageContext)msgContext;
    }

    public void setMsgContext(DWMessageContext messageContext) {
        this.msgContext = messageContext;
    }

}
