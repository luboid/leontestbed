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
import com.topfinance.cfg.dummy.TestDummy;
import com.topfinance.db.HiberEntry;
import com.topfinance.plugin.cnaps2.AckRoot;
import com.topfinance.plugin.cnaps2.DocRoot;
import com.topfinance.plugin.cnaps2.MsgHeader;
import com.topfinance.util.BCUtils;
import com.topfinance.util.HiberUtil;

import java.util.List;

import org.apache.camel.CamelContext;
import org.apache.camel.Component;
import org.apache.camel.Endpoint;
import org.apache.camel.Exchange;
import org.apache.camel.ExchangePattern;
import org.apache.camel.Message;
import org.apache.camel.Producer;
import org.apache.commons.lang.StringUtils;

public class DownwardProcessor extends AbstractProcessor{
    public void log(String msg) {
        System.out.println("in DownwardProcessor: "+msg);
    }
    public DownwardProcessor(DWMessageContext messageContext, CamelContext camel) {
        this.msgContext = messageContext;
        this.camel = camel;
    }

    
    public void process() throws Exception {
        // flow for downward
        
        // load the plugin impl class
        // by the bizProtocol attribute of the CfgInport, and then the plugin attribute
        
        // let the plugin impl to parse the msg body
        // the type of input msg body(tcp8583/cmt) can be known from the CfgInPort's type
        logReceiveMsg();
        
        String validateStatus = validateAndParse();
        // TODO handle outbound async ack? 
        // now always generate sync ack
        pkgAndsendSyncAck(validateStatus);

        if(!validateStatus.equals(AckRoot.MSG_PRO_CD_SUCCESS)) {
            // parse error, nothing more to do? 
            return;
        }
        
        // TODO do below in separate thread
        
        // save or resurrect hibernate
        loadTxContext();
        
        // transform and package
        packageReq();
        
        // find outPort
        findRoute();

        String syncReply = send();
        
        handlePPSyncResponse(syncReply);
        
    }

    
    
    private String logReceiveMsg() {
        Exchange exchange = getMsgContext().getSrcExchange();
        Endpoint inEp = exchange.getFromEndpoint();
        String uri = inEp.getEndpointUri();
        log("inport=" + inEp + ", inport-type=" + inEp.getClass() + ", uri=" + uri);
        Message min = exchange.getIn();
        String tpreq = min.getBody(String.class);
        log("tpreq=" + tpreq);

        auditLog(STATE_RECEIVED_REQ, "Received Message over transport: "+uri, STATUS_PENDING);
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
        
        // TODO swap host and parter when testing on two machines
        String hIdentity = origReceiver;
        String pIdentity = origSender; 
//        String hIdentity = origSender;
//        String pIdentity = origReceiver;

        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();

        
        ICfgNode cfgHN = cfgReader.getNodeByIdentity(hIdentity);
        ICfgNode cfgPN = cfgReader.getNodeByIdentity(pIdentity);   
        if( cfgHN==null || cfgPN==null ) {
            log("cannot find host with id{"+hIdentity+"} or partner with id{"+pIdentity+"}");
            validateStatus = AckRoot.MSG_PRO_CD_FAIL_VERIFY;
        } else if(!NODETYPE_HOST.equals(cfgHN.getType()) || !NODETYPE_PARTNER.equals(cfgPN.getType()) ) {
            log("must swap host with id{"+hIdentity+"} and partner with id{"+pIdentity+"}");
            validateStatus = AckRoot.MSG_PRO_CD_FAIL_VERIFY;
        }
        else {
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
        
        DocRoot body = null;
        try {
            body = DocRoot.loadFromString(bodyText);
        } catch (BcException ex) {
            validateStatus = AckRoot.MSG_PRO_CD_FAIL_VERIFY;
        }
        if(body!=null) {
            getMsgContext().setDocId(body.getDocId());
            getMsgContext().setOrigDocId(body.getOrigDocId());
            getMsgContext().setParsedMsg(body);            
        }
        
        if (!validateStatus.equals(AckRoot.MSG_PRO_CD_SUCCESS)) {
            // do not proceed
            auditLog(STATE_PARSE_VALIDATION, "msg failed to validated", STATUS_ERROR);
        } else {
            auditLog(STATE_PARSE_VALIDATION, "msg validated", STATUS_PENDING);
        }
        return validateStatus;
    }    
    
    private void pkgAndsendSyncAck(String validateStatus) {
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();

        AckRoot ack = null;
        ICfgOperation cfgOp = cfgReader.getOperation(getMsgContext().getProtocol(), getMsgContext().getOperationName());
        log("cfgOp="+(cfgOp==null? "null":cfgOp.getName()));
        if (OP_REPLY_TYPE_SYNC.equals(cfgOp.getDownReplyType())) {
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
        
        // send 
        getMsgContext().getSrcExchange().getOut().setBody(ackText);
        if (!ack.getMsgProCd().equals(AckRoot.MSG_PRO_CD_SUCCESS)) {
            // do not proceed
            auditLog(STATE_SEND_ACK, "sent ack with failure flag", STATUS_ERROR);
        } else {
            auditLog(STATE_SEND_ACK, "sent ack with success flag", STATUS_PENDING);
        }
    }
    
    
    private void loadTxContext() {
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        String opName = getMsgContext().getOperationName();
         
        ICfgOperation cfgOpn = cfgReader.getOperation(getMsgContext().getProtocol(), opName);
        
        if(BOOLEAN_FALSE.equals(cfgOpn.getDownIsEnabled())) {
            sendErrMsg();
            throw new RuntimeException("down is not enabled on the op {"+opName+"}");
        }

        
        if(BOOLEAN_TRUE.equals(cfgOpn.getDownIsReply())) {
            // get async reply
            String origDocId = getMsgContext().getOrigDocId();   
            if(StringUtils.isEmpty(origDocId)) {
                throw new RuntimeException("origDocId should not be null if op is reply");
            }
            else {
                // TODO resurrect hibernation and set the txID  
                HiberEntry hiber = HiberUtil.retrieveHiber(origDocId);
                
                String auditId = hiber.getAuditId();
                // TODO to update the orig audit entry, about receiving reply? 
                auditLog(auditId, STATE_RECEIVED_RESP, "received async reply", STATUS_COMPLETED);
                
                getMsgContext().setTxId(hiber.getTxId());
            }
            auditLog(STATE_INITIALISE_CONTEXT, "retrieved transactionID["+getMsgContext().getTxId()+"] by matching the async reply with original request", STATUS_PENDING);
        } else {
            auditLog(STATE_INITIALISE_CONTEXT, "created transactionID[" + getMsgContext().getTxId() + "]", STATUS_PENDING);
        }
        
        // go this even if the down request itself is a reply
        // inbound request
        if (OP_REPLY_TYPE_NOTIFY.equals(cfgOpn.getDownReplyType())) {
            // nothing
        } else if (OP_REPLY_TYPE_SYNC.equals(cfgOpn.getDownReplyType())) {

        } else {
            // async
            // TODO save the hibernation
            String hiberkey = getMsgContext().getDocId();
            String txId = getMsgContext().getTxId();
            String auditId = getMsgContext().getAuditTx().getAuditId();
            HiberUtil.saveHiber(hiberkey, txId, auditId);

        }
        
    
        
        
    }    
    private void sendErrMsg() {
        log("sendErrMsg!!!!");
    }
    protected void packageReq() {
        // plugin impl need compose the output msg format
        // either from the input msg body, or from config 

        String ppReq = ((DocRoot)getMsgContext().getParsedMsg()).toText();
        // simply do nothing
        String request = ppReq;
        getMsgContext().setPackagedMsg(request);
        
        auditLog(STATE_PKG_OUT_MSG, "packaged message to PP", STATUS_PENDING);
    }
    
    
    protected void findRoute() {
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        // filling in some info of CfgOutPort( which is known) for the next step routing
        // the info can be carried either in a header or property of exchange
        ICfgPassway cfgPassway = cfgReader.getPassway(getMsgContext().getCfgHN(), getMsgContext().getCfgPN());
        ICfgOperation cfgOp = cfgReader.getOperation(getMsgContext().getProtocol(), getMsgContext().getOperationName());
        ICfgProtocolBinding cfgPB = cfgReader.getProtocolBindingByProtocol(cfgPassway, getMsgContext().getProtocol());
        log("cfgPB="+cfgPB);
        
        List<ICfgRouteRule> listRouteRule = cfgReader.getListDownRoute(cfgPB);    
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
        
        if(result==null) {
            throw new RuntimeException("cannot found matching route for operation: "+cfgOp.getName());
        }
        
        getMsgContext().setCfgOutPort(result.getOutPort());
        
    }
    
    
    private String send() throws Exception {
        ICfgOutPort cfgOP = getMsgContext().getCfgOutPort();
        String url = BCUtils.getFullUrlFromPort(cfgOP);

        String syncReply = null;
        Endpoint outEp = camel.getEndpoint(url);
        Producer producer = outEp.createProducer();
        
        // exchangepattern always inout, either resp or ack
        // send
        Exchange destExchange = producer.createExchange(ExchangePattern.InOut);
        getMsgContext().setDestExchange(destExchange);
        destExchange.getIn().setBody(getMsgContext().getPackagedMsg());
        
        log("directly dispatching to outport: "+cfgOP.getName());
        producer.process(destExchange);
        
        syncReply = destExchange.getOut().getBody(String.class);    

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
            auditLog(STATE_SENT_OUT_MSG, "sent pp syncReply to tp", STATUS_COMPLETED);            
        } else {
            // async or notify
            String ppack = syncReply;
            log("received pp ack="+ppack);

            
            String nextStatus = "", nextDesc="";
            if(OP_REPLY_TYPE_ASYNC.equals(cfgOpn.getUpReplyType())) {
                nextStatus = STATUS_PENDING;
                nextDesc = "message sent to PP, waiting for async reply";
            }else {
                // notify
                nextStatus = STATUS_COMPLETED;
                nextDesc = "message sent to PP";
            }
            
            // verify the ack
            // TODO handle PP ack?
            if(true) {
                // ack successed
                auditLog(STATE_SENT_OUT_MSG, nextDesc, nextStatus);
            } else {
                // ack failed
                auditLog(STATE_SENT_OUT_MSG, "pp Ack failed", STATUS_ERROR);
            }
            
            // TODO send the ack to tp
            
           
        }
        

    }
    
    
    
    public DWMessageContext getMsgContext() {
        return (DWMessageContext)msgContext;
    }

    public void setMsgContext(DWMessageContext messageContext) {
        this.msgContext = messageContext;
    }

}
