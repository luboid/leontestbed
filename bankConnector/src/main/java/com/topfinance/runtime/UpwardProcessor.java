package com.topfinance.runtime;

import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgNode;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgRouteRule;
import com.topfinance.cfg.TestDummy;
import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.db.HiberEntry;
import com.topfinance.db.ResendEntry;
import com.topfinance.plugin.cnaps2.AckRoot;
import com.topfinance.plugin.cnaps2.Cnaps2Constants;
import com.topfinance.plugin.cnaps2.MsgHeader;
import com.topfinance.util.AuditMsgUtil;
import com.topfinance.util.AuditUtil;
import com.topfinance.util.BCUtils;
import com.topfinance.util.HiberUtil;
import com.topfinance.util.Iso8583Util;
import com.topfinance.util.ResendUtil;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

import org.apache.camel.Endpoint;
import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.jpos.iso.ISOMsg;

public class UpwardProcessor extends AbstractProcessor implements MessageListener{
    
    private static Logger logger = Logger.getLogger(UpwardProcessor.class);
    
    
    public void onMessage(MessageEvent event) {
        logger.debug("onMessage.............");
        boolean accepted = false;
        if(event instanceof MessageAckEvent) {
            if(getMsgContext().getMesgId().equals(event.getOrigMsgId())) {
                // accept this event
                getMsgContext().setParsedSyncReplyMsg(event.getParsedMsg());
                getMsgContext().setPackagedSyncReplyMsg(event.getPackagedMsg());
                accepted = true;
            }
            
        }else if(event instanceof MessageReplyEvent) {
            if(getMsgContext().getDocId().equals(event.getOrigDocId())) {
                getMsgContext().setParsedSyncReplyMsg(event.getParsedMsg());
                getMsgContext().setPackagedSyncReplyMsg(event.getPackagedMsg());
                accepted = true;
            }
        }
        
        if(accepted) {
            getMsgContext().setAsyncMsgReceived(true);
        }

    }
    public void log(String msg) {
        logger.debug(msg);
    }
    
    public UpwardProcessor() {
        
    }
    
    

    public void preprocess() throws Exception {
        log("preprocess() in "+Thread.currentThread().getName());

        getMsgContext().setUserTxId("xxxx");
        
        logReceiveMsg();
        
        parseRequest();        
        
    }
    
    
    public void process() throws Exception {
        log("process() in "+Thread.currentThread().getName());
        try {
        String utx = getMsgContext().getUserTxId();
        log("utx="+utx);
        

        
        // save or resurrect hibernate
        loadTxContext();
        
        // transform and package
        packReq();

        String tpSyncReply = send();
        
        handlePpSyncResponse(tpSyncReply);
        
        
        
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
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
            String errorText = BcConstants.MSG_PP_ERROR;
            
            
            ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
            String opName = getMsgContext().getOperationName();
            ICfgOperation cfgOpn = cfgReader.getOperation(getMsgContext().getProtocol(), opName);
            
            
            if(OP_REPLY_TYPE_SYNC.equals(cfgOpn.getUpPpReplyType())) {
                // send error thru sync channel
                logger.info("unknown exception: send error msg to pp thru sync channel...");
                getMsgContext().getSrcExchange().getOut().setBody(errorText);
                
            }
            else {
                // send error thru async channel
                logger.info("unknown exception: send error msg to pp thru async channel...");
            ICfgReader reader = CfgImplFactory.loadCfgReader();
            
            ICfgInPort inPort = getMsgContext().getCfgInPort();
            ICfgOutPort outPort = reader.getAckPortByIP(inPort);
            
            String url = BCUtils.getFullUrlFromPort(outPort);

            
            
            ServerRoutes.getInstance().produce(url, errorText, true);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        
    }
    
    private String logReceiveMsg() {
        Exchange exchange = getMsgContext().getSrcExchange();
        Endpoint inEp = exchange.getFromEndpoint();
        String uri = inEp.getEndpointUri();
        Message min = exchange.getIn();
        String ppreq = min.getBody(String.class);
        logger.info("received msg on uri=" + uri);
        logger.debug("rawMsg=["+ppreq+"]");

        auditLog(STATE_RECEIVED_REQ, "Received Message", STATUS_PENDING);
        return ppreq;
    }
    
    protected void parseRequest() {

        // get the type of input msg body(tcp8583/cmt) 
        // 1. can be known from the CfgInPort's type
        // 2. can be know from operation's upFormat
        // or we can do verification of 8583 matching here
     
        // TODO get the type based on another cfg on InPort
        // could have:
        // CMT on HTTP
        // CMT on TCP (need define own codec impl)
        // CMT on 8583 (possible? use the 8583 codec but different body)        
        // 8583 on HTTP (possible?)
        // 8583 on 8583 (this is the default case we handling here)
        String hIdentity = null;
        String pIdentity = null;
        String opName = null;
        String docId = null;
        String origDocId = null;
        
        // calling the parser...
        // possibly be isoMessage or cmtMessage
//        IsoMessage isoMsg = new IsoMessage();
//        int type = isoMsg.getType();
        ICfgReader reader = CfgImplFactory.loadCfgReader();
        if(TCP_PROVIDER_8583.equals(reader.getTransInfoByPort(getMsgContext().getCfgInPort()).getProvider())) {

            String req = (String)getMsgContext().getSrcExchange().getIn().getBody();
            log("req="+req);
            ISOMsg msg = Iso8583Util.unpackMsg(req);

            getMsgContext().setParsedMsg(msg);
            
            opName = msg.getString(BcConstants.ISO8583_OP_NAME);
            docId = msg.getString(BcConstants.ISO8583_DOC_ID);
            origDocId = msg.getString(BcConstants.ISO8583_ORIG_DOC_ID);
            hIdentity = msg.getString(BcConstants.ISO8583_HOST_ID);
            pIdentity = msg.getString(BcConstants.ISO8583_PARTNER_ID);
            
            logger.info("opName="+opName+", docId="+docId+", origDocId="+origDocId);
            
        }
 
        else {

            throw new RuntimeException("should go thru 8583");
//        // TODO This docRoot is in fact like a header.
//        // here we just use this as both header and body.
//        DocRoot msg = null;
//        try {
//            msg = DocRoot.loadFromString(getMsgContext().getSrcExchange().getIn().getBody(String.class));
//        } catch (Exception ex) {
//            ex.printStackTrace();
//            throw new RuntimeException(ex);
//        }
//        getMsgContext().setParsedMsg(msg);
//        
//                
//        // now we have no PP msg header,
//        // so just extract these fields from payload
//        hIdentity = msg.getHostIdentity();
//        pIdentity = msg.getPartnerIdentity();
//        opName = msg.getOpName();
//        docId = msg.getDocId();
//        origDocId = msg.getOrigDocId();
        }
        
        
        getMsgContext().setDocId(docId);
        getMsgContext().setOrigDocId(origDocId);
        getMsgContext().setOperationName(opName);
        getMsgContext().setOrigSender(hIdentity);
        getMsgContext().setOrigReceiver(pIdentity);
        
        // todo: verify the pp msg
        
        // let the plugin impl to find the CfgBizOperation
        // by matching certain field in msg body (either tcp8583 or cmt which is known ) with another in CfgBizOperation        
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        ICfgOperation cfgOp = cfgReader.getOperation(getMsgContext().getProtocol(), getMsgContext().getOperationName());
        log("cfgOp="+(cfgOp==null? "null":cfgOp.getName()));
        
        // find outPort
        ICfgOutPort outPort = findRoute();
        getMsgContext().setCfgOutPort(outPort);
        
        ICfgNode cfgHN = cfgReader.getNodeByPort(getMsgContext().getCfgInPort());
        ICfgNode cfgPN = cfgReader.getNodeByPort(getMsgContext().getCfgOutPort());
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
    
    protected void packReq() {
        // plugin impl need compose the output msg format
        // either from the input msg body, or from config
        String mesgId = BCUtils.getUniqueMesgId();
        getMsgContext().setMesgId(mesgId);
        String mesgType = getMsgContext().getOperationName();
        // TODO need mesgRefId be filled in an async msg, rather than in ack? 
        String mesgRefId = ""; 
        String origSender = getMsgContext().getOrigSender();
        String origReceiver = getMsgContext().getOrigReceiver();
        
        MsgHeader header = new MsgHeader(origSender, origReceiver, mesgType, mesgId, mesgRefId);
        
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        String body = "";
        
        if (TCP_PROVIDER_8583.equals(cfgReader.getTransInfoByPort(getMsgContext().getCfgInPort()).getProvider())) {
            // TODO retrieve mapFile and pkgName based on opName, could be a db column

            InputStream mapFile = cfgReader.getMappingRule(mesgType, DIRECTION_UP); 
            String pkgName = Iso8583ToXml.getPackageName(mesgType);

            Map<String, String> mappings = Iso8583ToXml.loadMappings(mapFile);
            if(TestDummy.OPERATION_102.equals(mesgType)){
                // upward 102
                // NOTE this is not necessary if generated mapping rule was modified to take care of orig_msg_id
                mappings.put(Cnaps2Constants.ORIG_MSG_ID_102, getMsgContext().getOrigDocId());
            }
            
            ISOMsg msg = (ISOMsg)getMsgContext().getParsedMsg();
            Iso8583ToXml converter = new Iso8583ToXml(pkgName);
            Object jaxbObj = converter.iso8583ToObject(msg, mappings);
            body = converter.objectToXml(jaxbObj);
            // TODO use object to do biz level auditing
            
            AuditMsgUtil.saveMsg(jaxbObj, mesgType);
            
            
            
        } else {
            // simply do nothing to body
//            body = this.getMsgContext().getSrcExchange().getIn().getBody(String.class);
            throw new RuntimeException("should go thru 8583");
        }
        
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
            HiberUtil.saveHiber(hiberkey, DIRECTION_UP, txId, auditId, getMsgContext().getOperationName());
        }
        
        
        
        String url = BCUtils.getFullUrlFromPort(cfgOP);
        String syncReply = null;
        

        boolean isInOnly = OP_ACK_TYPE_SYNC.equals(ackType) ?  false : true;
        
        logger.info("dispatching to outport: "+cfgOP.getName()+", url="+url);
        logger.debug("rawMsg=["+getMsgContext().getPackagedMsg()+"]");
        
        syncReply = ServerRoutes.getInstance().produce(url, getMsgContext().getPackagedMsg(), isInOnly);

        auditLog(STATE_SEND_OUT_MSG, "sending msg to TP", STATUS_PENDING);     

        return syncReply;
    }
    
    protected ICfgOutPort findRoute() {
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        // filling in some info of CfgOutPort( which is known) for the next step routing
        // the info can be carried either in a header or property of exchange
        ICfgOperation cfgOp = cfgReader.getOperation(getMsgContext().getProtocol(), getMsgContext().getOperationName());
        List<ICfgRouteRule> listRouteRule = cfgReader.getListUpRoute();  
        
        return BCUtils.findRoute(listRouteRule, cfgOp.getName());
    }
    
    
    protected void handlePpSyncResponse(String syncReply) {
        
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        String opName = getMsgContext().getOperationName();
        ICfgOperation cfgOpn = cfgReader.getOperation(getMsgContext().getProtocol(), opName);
        
        
        if(OP_REPLY_TYPE_SYNC.equals(cfgOpn.getUpPpReplyType())) {

            if(OP_REPLY_TYPE_SYNC.equals(cfgOpn.getUpReplyType())) {
                // todo in fact should consider reply and ack together
                // now tp channel is always async so won't happen anyway
                log("received tp syncReply="+syncReply);
                // send back to pp
                log("send tp syncReply to pp");
                getMsgContext().getSrcExchange().getOut().setBody(syncReply);
                auditLog(STATE_SENT_OUT_MSG, "received sync ack from tp and send to pp", STATUS_COMPLETED);
                
            } else {
                // async (tp) to sync (pp)
                getMsgContext().setAsyncMsgReceived(false);
                
                MessageMonitor.registerListener(this);
                try {
                // poll and wait
                while(true) {
                    logger.debug("poll after 2 seconds...");
                    if(!getMsgContext().isAsyncMsgReceived()) {
                        try {
                            Thread.sleep(2000);
                        } catch (InterruptedException e) {
                        }
                    } else {
                        // check the status
                        Object msg = getMsgContext().getParsedSyncReplyMsg();
                        if(msg instanceof AckRoot) {
                            // is async ack
                            AckRoot ackRoot = (AckRoot)msg;
                            if(AckRoot.MSG_PRO_CD_SUCCESS.equals(ackRoot.getMsgProCd())){
                                // positive ack
                                // continue to wait async reply
                                logger.info("received positive ack... continue to wait async reply");
                                // reset flag
                                getMsgContext().setAsyncMsgReceived(false);
                                // back to poll loop
                                continue;
                                
                            } else {
                                // negative ack
                                logger.info("received negative ack... send to pp and stop processing");
                                // audit log done in Down
                                getMsgContext().getSrcExchange().getOut().setBody(getMsgContext().getPackagedSyncReplyMsg());
                                break;
                            }
                            
                        } else {
                            // is async reply
                            getMsgContext().getSrcExchange().getOut().setBody(getMsgContext().getPackagedSyncReplyMsg());
                            break;    
                        }  
                        
                    }
                }
                
                } finally {
                    // critical to avoid leak
                    MessageMonitor.deregisterListener(this);
                }
                
            }
            
        } else {
            
            // pp expect async reply ( now only when tp channel is async )
            if(!StringUtils.isEmpty(syncReply)) {
                String msg = "Do not support async pp chanel while tp chanel is sync";
                throw new RuntimeException(msg);
            }
            else {
                // do nothing. let DownwardProcessor handle it 
                return;
            }
            
        }
    }
    
//    protected void packAndSendSyncResponse() {

//            String ack = syncReply;
//            logger.info("received 990 ack="+ack);
//            
//            String headerText = ack.substring(0, MsgHeader.TOTAL_LENGTH);
//            String bodyText = ack.substring(MsgHeader.TOTAL_LENGTH);
//            MsgHeader header = null;
//            try {
//                header = MsgHeader.fromText(headerText);
//            } catch (Exception ex) {
//                ex.printStackTrace();
//                // no way to generate any meaningful ack
//                throw new RuntimeException(ex);
//            }      
//            
//            // verify the ack
//            AckRoot ackRoot = null;
//            try {
//                ackRoot = AckRoot.loadFromString(bodyText);
//            } catch (BcException ex) {
//                // do nothing
//            }
//            
//            String nextStatus = "", nextDesc="";
//            if(OP_REPLY_TYPE_ASYNC.equals(cfgOpn.getUpReplyType())) {
//                nextStatus = STATUS_PENDING;
//                nextDesc = "message sent to TP, waiting for async reply";
//            }else {
//                // notify
//                nextStatus = STATUS_COMPLETED;
//                nextDesc = "message sent to PP";
//            }
//            
//            if(ackRoot==null || !AckRoot.MSG_PRO_CD_SUCCESS.equals(ackRoot.getMsgProCd())) {
//                // ack failed
//                auditLog(STATE_SENT_OUT_MSG, "Ack failed", STATUS_ERROR);
//            } else {
//                // ack successed
//                auditLog(STATE_SENT_OUT_MSG, nextDesc, nextStatus);
//            }
            
            // TODO send the ack to pp
        

//    }
    


    public UWMessageContext getMsgContext() {
        return (UWMessageContext)msgContext;
    }

    public void setMsgContext(UWMessageContext messageContext) {
        this.msgContext = messageContext;
    }



}
