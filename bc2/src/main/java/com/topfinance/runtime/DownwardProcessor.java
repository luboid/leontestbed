package com.topfinance.runtime;

import java.util.List;

import org.apache.camel.Endpoint;
import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.topfinance.cfg.CfgAccessException;
import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgPortIn;
import com.topfinance.cfg.ICfgNode;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgPortOut;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgRouteRule;
import com.topfinance.cfg.TestDummy;
import com.topfinance.db.HiberEntry;
import com.topfinance.db.ResendEntry;
import com.topfinance.message.DefaultCnaps2Parser;
import com.topfinance.message.FatalParseException;
import com.topfinance.message.FormatFactory;
import com.topfinance.message.IMsgPacker;
import com.topfinance.plugin.cnaps2.AckRoot;
import com.topfinance.plugin.cnaps2.MsgHeader;
import com.topfinance.util.AuditMsgUtil;
import com.topfinance.util.AuditUtil;
import com.topfinance.util.BCUtils;
import com.topfinance.util.HiberUtil;
import com.topfinance.util.ResendUtil;

public class DownwardProcessor extends AbstractProcessor{
    
    private static Logger logger = Logger.getLogger(DownwardProcessor.class.getName());
    
    public void log(String msg) {
        logger.debug("in DownwardProcessor: "+msg);
    }
    public DownwardProcessor() {
        
    }

    public void preprocess() throws Exception {
        log("preprocess() in "+Thread.currentThread().getName());
    }
    public void process() throws Exception {
        log("process() in " + Thread.currentThread().getName());
        // flow for downward

        // load the plugin impl class
        // by the bizProtocol attribute of the CfgInport, and then the plugin
        // attribute

        // let the plugin impl to parse the msg body
        // the type of input msg body(tcp8583/cmt) can be known from the
        // CfgInPort's type
        logReceiveMsg();

        String validateStatus = validateAndParse();

        
        if (getMsgContext().isAck()) {
            
            packPpAck();
            
            // no ack of ack
            if (needConvertToSyncPpReply()) {
                MessageAckEvent event = new MessageAckEvent();
                event.setOrigMsgId(getMsgContext().getOrigMesgId());
                
                event.setParsedMsg(getMsgContext().getParsedMsg());
                event.setPackagedMsg(getMsgContext().getPackagedMsg());
                MessageMonitor.fireEvent(event);
            } else {
                // TODO if received ack is negative, still need send error to pp async
                // it 's not yet handled
            }
        } else {

            if (!validateStatus.equals(AckRoot.MSG_PRO_CD_SUCCESS)) {
                // parse error, nothing more to do?
                pkgAndsendTpAck(validateStatus);
                return;
            }

            // TODO do below in separate thread
            try {
                // transform and package
                packReq();
            } catch (Exception ex) {
                ex.printStackTrace();
                validateStatus = AckRoot.MSG_PRO_CD_FAIL_VERIFY;
            }

            // send ack before sending to pp
            pkgAndsendTpAck(validateStatus);

            if (needConvertToSyncPpReply()) {
                MessageReplyEvent event = new MessageReplyEvent();
                event.setOrigDocId(getMsgContext().getOrigDocId());
                event.setParsedMsg(getMsgContext().getParsedMsg());
                event.setPackagedMsg(getMsgContext().getPackagedMsg());
                MessageMonitor.fireEvent(event);
                // TODO what happened if 

                // async or notify
                logForAsyncOrNone();
            } else {
                String syncReply = send();
                handlePPSyncResponse(syncReply);
            }
        }
    }


    private boolean needConvertToSyncPpReply() throws CfgAccessException{
        
        boolean res = false;
        ICfgReader reader = CfgImplFactory.loadCfgReader();
        String opName = getMsgContext().getOpInfo().getMesgType();
        ICfgOperation thisOpn = reader.getOperation(getMsgContext().getProtocol(), opName);
        
        if (!getMsgContext().isAck() && 
            CfgConstants.BOOLEAN_FALSE.equals(getMsgContext().getOds().getOd(opName).getDownIsReply())) {
            // not ack and not a reply
            res = false;
            
        } else {
            String origOp = getMsgContext().getOrigOperation();
            
            ICfgOperation origOpn = null;
            if(StringUtils.isNotEmpty(origOp)) {
                origOpn = reader.getOperation(getMsgContext().getProtocol(), origOp);
            }
            res = origOpn==null? false : OP_REPLY_TYPE_SYNC.equals(origOpn.getUpPpReplyType());
            
            if(thisOpn!=null && OP_REPLY_TYPE_SYNC.equals(getMsgContext().getOds().getOd(opName).getDownReplyType()) && res) {
                // TODO this is not clear
                throw new RuntimeException("configuration error: sync mode in more than 2 level is not allowed");
            }
        }        
        logger.debug("needConvertToSyncPpReply() res="+res);
        return res;
    }
    
    private String logReceiveMsg() {
        Exchange exchange = getMsgContext().getSrcExchange();
        Endpoint inEp = exchange.getFromEndpoint();
        String uri = inEp.getEndpointUri();
        
        Message min = exchange.getIn();
        String tpreq = min.getBody(String.class);
        logger.info("received msg on uri=" + uri);
        logger.debug("rawMsg=[" + tpreq+"]");

        return tpreq;
    }
    
    
    protected String validateAndParse() throws CfgAccessException{
        

        // calling the parser...
        // possibly be isoMessage or cmtMessage
//        IsoMessage isoMsg = new IsoMessage();
//        int type = isoMsg.getType();
        
        
        // TODO handle inbound async ack?
        // the inbound msg is an ack of previous outbound msg
        String message = getMsgContext().getSrcExchange().getIn().getBody(String.class);

        
        String validateStatus = AckRoot.MSG_PRO_CD_SUCCESS;
        // TODO validation of header
        // if(!header.validate) {
        // // best-effort to fill the ack
        //      syncAck = new AckRoot();
        // }

        Object parsedMsg = null;
//        IUpInMsgHandler upMsgHandler = Factory.loadParser(getMsgContext().getCfgInPort().getParserClazz());
        DefaultCnaps2Parser parser = new DefaultCnaps2Parser();
        try {
        	String bodyText = parser.parseHeader(message); 
            parsedMsg = parser.parseBody(bodyText, parser.getOpInfo().getMesgType(), getMsgContext().getOds(), getMsgContext().getProtocol());
            
        } catch (FatalParseException ex) {
            ex.printStackTrace();
            // no way to generate any meaningful ack
            throw new RuntimeException(ex);
        }
        
        String mesgId = parser.getMesgId();
        String mesgRefId = parser.getMesgRefId();
        String origSender = parser.getOrigSender();
        String origReceiver = parser.getOrigReceiver();
        OpInfo opInfo = parser.getOpInfo();
//        String mesgType = parser.getOpInfo().getMesgType();
        String docId = parser.getDocId();
        String origDocId = parser.getOrigDocId();
        
        // set context
        getMsgContext().setMesgId(mesgId);
        getMsgContext().setOrigMesgId(mesgRefId);
        getMsgContext().setOpInfo(opInfo);
        getMsgContext().setOrigSender(origSender);
        getMsgContext().setOrigReceiver(origReceiver);
        
        AuditMsgUtil.saveMsgAsFile(CfgConstants.DIRECTION_DOWN, getMsgContext().getMesgId(), message);
        
        // TODO verify these value, especially mesgType
        
        if(!getMsgContext().isAck()) {
            // TODO auditlog should be done after parsing and know whether it's ack or not
            auditLog(STATE_RECEIVED_REQ, "Received Message over transport: ", STATUS_PENDING);
            // find outPort
            ICfgReader cfgReader = CfgImplFactory.loadCfgReader();

            ICfgPortOut outPort = findRoute();
            
             if(outPort == null) {
                 String origOperation = getMsgContext().getOrigOperation();
                 // check the origOperation
                 ICfgOperation origCfgOpn = null;
                 if(StringUtils.isNotEmpty(origOperation)) {
                     origCfgOpn = cfgReader.getOperation(getMsgContext().getProtocol(), origOperation);
                 }
                 
                 if(origCfgOpn==null || CfgConstants.OP_REPLY_TYPE_ASYNC.equals(origCfgOpn.getUpPpReplyType())) {
                     // if no orig, or orig operation expect async reply, need a route
                     logger.warn("cannot find route rule matching");
                     validateStatus = AckRoot.MSG_PRO_CD_FAIL_VERIFY;             
                 } else {
                     // else, it's ok to have no route
                 }

             } else {
                 getMsgContext().setCfgOutPort(outPort);
                 ICfgNode cfgHN = cfgReader.getNodeByPortIn(getMsgContext().getCfgInPort());
                 ICfgNode cfgPN = cfgReader.getNodeByPortOut(outPort);  
                 String hName = cfgHN.getName();
                 String pName = cfgPN.getName();
                 getMsgContext().setHnName(hName);
                 getMsgContext().setPnName(pName);
                 getMsgContext().setCfgHN(cfgHN);
                 getMsgContext().setCfgPN(cfgPN);
              }            
        }
        // todo: check duplication
        // checkDuplicate();
        
        // validate others
        
        if(parsedMsg!=null) {
            getMsgContext().setParsedMsg(parsedMsg);
            if(!getMsgContext().isAck()) {
                getMsgContext().setDocId(docId);
                getMsgContext().setOrigDocId(origDocId);
                logger.info("==========docId = "+docId+", origDocId="+origDocId);
                // TODO use object to do biz level auditing 
                AuditMsgUtil.saveMsg(parsedMsg);
                
            }
        } else {
            // must be sth wrong?  
            validateStatus = AckRoot.MSG_PRO_CD_FAIL_VERIFY;
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
            	
            	// TODO this will override the complete status when UpReplyType=N
//                AuditUtil.updateOtherAuditLogStatus(getMsgContext().getAuditTx().getAuditId(),
//                                                    STATE_PARSE_VALIDATION, "ack validated", STATUS_PENDING);
            }        
        }
        
        return validateStatus;
    }    
    private ICfgPortOut findRoute() throws CfgAccessException{
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        List<ICfgRouteRule> listRouteRule = cfgReader.getListDownRoute();
        ICfgPortOut outPort = BCUtils.findRoute(listRouteRule, getMsgContext().getOpInfo());
        return outPort;
    }
    private void loadTxContextForAsyncAck() throws CfgAccessException{
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
                String origOpName = ack.getMsgTp();
                getMsgContext().setOrigOperation(origOpName);
                
                ICfgOperation origCfgOpn = cfgReader.getOperation(getMsgContext().getProtocol(), origOpName);
                
                // TODO handle if async reply comes ealier than ack
                // possible, including last status in hiber/resend entry
                
                String nextStatus = STATUS_COMPLETED;
                if(OP_REPLY_TYPE_ASYNC.equals(getMsgContext().getOds().getOd(origOpName).getUpReplyType())) {
                    // expect async reply
                    nextStatus = STATUS_PENDING;
                } else {
                    // todo: sth wrong? expect sync reply but got async ack  
                }
                AuditUtil.updateOtherAuditLogStatus(auditId, 
                                               STATE_SENT_OUT_MSG, "message sent to tp successfully (received good ack)", nextStatus);    
            }
            else {
                AuditUtil.updateOtherAuditLogStatus(auditId, 
                                               STATE_SENT_OUT_MSG, "message sent to tp but received ack with fail mark", STATUS_ERROR);
            }
            

            
        } else {
            // not matched, this ack is just discarded
            // do nothing
            logger.warn("received ack which the original message is not found: "+origMesgId);
        }
        
        
    }
    private void loadTxContextForAsyncReply() throws CfgAccessException{
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        String mesgType = getMsgContext().getOpInfo().getMesgType();
        ICfgOperation cfgOpn = cfgReader.getOperation(getMsgContext().getProtocol(), mesgType);
        
        String error = "";
        boolean logged = false;
        
        if(BOOLEAN_FALSE.equals(getMsgContext().getOds().getOd(mesgType).getDownIsEnabled())) {
            sendErrMsg();
            error = "down is not enabled on the op {"+mesgType+"}";
        }
        else {
            
        if(BOOLEAN_TRUE.equals(getMsgContext().getOds().getOd(mesgType).getDownIsReply())) {
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
                    getMsgContext().setOrigOperation(hiber.getOperation());
                    getMsgContext().setOrigInPortName(hiber.getInPortName());
                    
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
    
    private void pkgAndsendTpAck(String validateStatus) throws CfgAccessException{
        

            
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        String mesgType = getMsgContext().getOpInfo().getMesgType();
        AckRoot ack = null;
        ICfgOperation cfgOpn = cfgReader.getOperation(getMsgContext().getProtocol(), mesgType);
        log("cfgOp="+(cfgOpn==null? "null":cfgOpn.getName()));
        if (OP_REPLY_TYPE_SYNC.equals(getMsgContext().getOds().getOd(mesgType).getDownReplyType())
            || OP_ACK_TYPE_NONE.equals(getMsgContext().getOds().getOd(mesgType).getDownAckType())) {
            // no ack if sync reply is expected
            // TODO what do with sync-req-resp which may still need a sync reply?
            return;
        } 
        
        // send ack only when async or notify
        ack = new AckRoot();
        ack.setMsgId(getMsgContext().getMesgId());
        ack.setMsgRefId(getMsgContext().getOrigMesgId());
        ack.setOrigSndr(getMsgContext().getOrigSender());
        ack.setMsgTp(getMsgContext().getOpInfo().getMesgType());
        ack.setMsgProCd(validateStatus);
        
        // package ack
        MsgHeader msgHeader = new MsgHeader(
           getMsgContext().getOrigSender(),
           getMsgContext().getOrigReceiver(),
           TestDummy.OPERATION_990,
           getMsgContext().getMesgId(),
           getMsgContext().getOrigMesgId()
        ); 
        String ackText = msgHeader.toText()+ack.dumpToString();
        
        if (OP_ACK_TYPE_SYNC.equals(getMsgContext().getOds().getOd(mesgType).getDownAckType())) {
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
                ICfgReader reader = CfgImplFactory.loadCfgReader();
                ICfgPortIn inPort = getMsgContext().getCfgInPort();
                ICfgPortOut ackPort = reader.getAckPortByIP(inPort);
                

                // always InOnly
                // send
                logger.info("dispatching async ack {"+ackText+"} to outport: "+ackPort.getName());
                ServerRoutes.getInstance().produce(ackPort, ackText, true);
                
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
    
    
    private void loadTxContext() throws CfgAccessException{

        if(getMsgContext().isAck()) {
            // is async ack
            loadTxContextForAsyncAck();
        }
        else {
            loadTxContextForAsyncReply();
        }
        
    }    
    private void sendErrMsg() {
        logger.warn("sendErrMsg!!!!");
    }
    
    protected void packPpAck() {
        String ppAck = "";
        AckRoot ackRoot = (AckRoot)getMsgContext().getParsedMsg();
        if(AckRoot.MSG_PRO_CD_SUCCESS.equals(ackRoot.getMsgProCd())){
            // do not forward to pp when receiving positive TpAck
        }
        else {
            // todo
            ppAck = BcConstants.MSG_PP_ERROR;
        }
        getMsgContext().setPackagedMsg(ppAck);
    }
    
    protected void packReq() throws CfgAccessException{
        // plugin impl need compose the output msg format
        // either from the input msg body, or from config 
//        String ppReq = ((DocRoot)getMsgContext().getParsedMsg()).toText();
//        
//        // simply do nothing
//        String request = ppReq;
//        getMsgContext().setPackagedMsg(request);
    	
        // TODO pack in different formats based on settings
        
    	String mesgType = getMsgContext().getOpInfo().getMesgType();
    	ICfgReader reader = CfgImplFactory.loadCfgReader();
    	ICfgOperation cfgOpn = reader.getOperation(getMsgContext().getProtocol(), mesgType);
    	

    	
    	// TODO remove it?
    	ICfgOperation origCfgOpn = null;
        String origOperation = getMsgContext().getOrigOperation();
        if(StringUtils.isNotEmpty(origOperation)) {
            origCfgOpn = reader.getOperation(getMsgContext().getProtocol(), origOperation);    
        } 
        
//        IDownOutMsgHandler handler = null;
//        // check the original upward request's origOperation
//        if(origCfgOpn==null || CfgConstants.OP_REPLY_TYPE_ASYNC.equals(origCfgOpn.getUpPpReplyType())) {
//            // no original, or original expect async reply, 
//            // will find the handler from outPort
//            handler = Factory.loadHandler(reader.getDownOutMHByPort(getMsgContext().getCfgOutPort()).getClazz());
//        } else if(CfgConstants.OP_REPLY_TYPE_SYNC.equals(origCfgOpn.getUpPpReplyType())){
//            // sync
//            ICfgPortIn origInPort = reader.getInportByName(getMsgContext().getOrigInPortName());
//            handler = Factory.loadHandler(reader.getSyncReplyDownOutMHByPort(origInPort).getClazz());
//        } else {
//            // notify??
//            throw new RuntimeException("should not comes here");
//        }
//    	
//    	Object convertedObj = handler.convert(jaxbObj, opName, mapFile);
//    	String msg = handler.pack(convertedObj, null, null, null, null, null);
        
        
        // TODO 
        // note: even if it's sync reply, the format is decided by this operation(down) rather than by original operation(up)
        // so the format in the down opn should be the same as the format of the orig inport, as we do not define a separate sync reply format
        
    	Object ebo = getMsgContext().getParsedMsg();
        IMsgPacker packer = FormatFactory.getMsgPacker(reader.getFormatByOpn(cfgOpn)); 
        try {
        String msg = packer.convertPack(ebo, cfgOpn, getMsgContext().getOpInfo());
        
    	logger.debug("packed="+msg);
        getMsgContext().setPackagedMsg(msg);
        } catch (Exception ex) {
        	logger.error("failed when convert and pack to internal msg", ex);
        	throw new RuntimeException("failed when convert and pack to internal msg", ex);
        }
        
//    	if(CfgConstants.OP_FORMAT_XML.equals(cfgOpn.getDownFormat())){
//    	    // TODO convert xml
//    	    
//    	    Iso8583ToXml main = new Iso8583ToXml(Iso8583ToXml.getPackageName(opName));
//    	    String msg = main.objectToXml(jaxbObj);
//    	    logger.debug("packed="+msg);
//    	    getMsgContext().setPackagedMsg(msg);
//    	}
//    	else  {
//    	    //if(CfgConstants.OP_FORMAT_8583.equals(cfgOpn.getDownFormat()))
//            
//            Map<String, String> mappings = Iso8583ToXml.loadMappings(mapFile);
//
//            Iso8583ToXml main = new Iso8583ToXml("com.topfinance.plugin.cnaps2.v00800102");
//            ISOMsg isoMsg = main.objectToIso8583(jaxbObj, mappings);
//            try {
//                Iso8583Util.setField(isoMsg, BcConstants.ISO8583_OP_NAME, opName);
//            } catch (Exception ex) {
//                ex.printStackTrace();
//                throw new RuntimeException(ex);
//            }
//            
//            logger.debug("obj="+isoMsg);
//            
//            try {
//                String msg = Iso8583Util.packMsg(isoMsg);
//                logger.debug("packed="+msg);
//                getMsgContext().setPackagedMsg(msg);
//                
//                
////                ISOMsg m = new ISOMsg();
////                m.setPackager(new ISOIBPSPackager());
////                m.unpack(b);
////                String docId = (String)m.getValue(BcConstants.ISO8583_DOC_ID);
////                logger.debug("=========docId="+docId);
//                
//            } catch (Exception ex) {
//                ex.printStackTrace();
//                throw new RuntimeException(ex);
//            }
//    	} 
//    	else {
//    	    throw new RuntimeException("should configure the format of the operation, currently either 8583 or xml");
//    	}
    	
        auditLog(STATE_PKG_OUT_MSG, "packaged message to PP", STATUS_PENDING);
    }
    
    

    

    private String send() throws Exception {

        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        
        ICfgOperation cfgOpn = cfgReader.getOperation(getMsgContext().getProtocol(), getMsgContext().getOpInfo().getMesgType());
        // acktype is for 990
        // here for pp ack, always active to trigger timeout or alert
        String resendStatus = ResendEntry.STATUS_ACTIVE;
        
        // save resend
        String msg = (String)getMsgContext().getPackagedMsg();
        
        // TODO serialize in other way
        // Java serialization has version problem
        byte[] bin = msg.getBytes(BcConstants.ENCODING);
        
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
        String mesgType = getMsgContext().getOpInfo().getMesgType();
        if(OP_REPLY_TYPE_ASYNC.equals(getMsgContext().getOds().getOd(mesgType).getDownReplyType())){
            String hiberkey = getMsgContext().getDocId();
            String txId = getMsgContext().getTxId();
            String auditId = getMsgContext().getAuditTx().getAuditId();
            HiberUtil.saveHiber(hiberkey, DIRECTION_DOWN, txId, auditId, mesgType, inPortName);
        } else {
            // handled in handlePPSyncResponse() ??
            // TODO what if PP response is async but TP side expect sync response? 
        }
        
        ICfgPortOut cfgOP = getMsgContext().getCfgOutPort();

        String syncReply = null;

        // send
        boolean isInOnly = true;
//        if(OP_REPLY_TYPE_SYNC.equals(getMsgContext().getOds().getOd(opName).getDownReplyType())) {
        // should check pp resp type rather than tp resp type
        if(OP_REPLY_TYPE_SYNC.equals(cfgOpn.getDownPpReplyType())) {
            isInOnly = false;
        }
        

        
        
        try {
            syncReply = ServerRoutes.getInstance().produce(cfgOP, getMsgContext().getPackagedMsg(), isInOnly);
            
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
    
    protected void handlePPSyncResponse(String syncReply) throws CfgAccessException{
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        String mesgType = getMsgContext().getOpInfo().getMesgType();
        ICfgOperation cfgOpn = cfgReader.getOperation(getMsgContext().getProtocol(), mesgType); 
        
        if(OP_REPLY_TYPE_SYNC.equals(getMsgContext().getOds().getOd(mesgType).getDownReplyType())) {
            log("received pp syncReply="+syncReply);      
            // send back to tp
            log("send pp syncReply to tp in sync");
            getMsgContext().getSrcExchange().getOut().setBody(syncReply);
            auditLog(STATE_SENT_OUT_MSG, "received sync reply from pp and send to tp", STATUS_COMPLETED);            
        } else {
            // async or notify
            // nothing to do with this sync pp response, as channel to TP is async
            logForAsyncOrNone();
            
           
        }
        

    }
    
    private void logForAsyncOrNone() {
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        String mesgType = getMsgContext().getOpInfo().getMesgType();
        ICfgOperation cfgOpn = cfgReader.getOperation(getMsgContext().getProtocol(), mesgType); 
        
        String nextStatus = "", nextDesc="";
        if(OP_REPLY_TYPE_ASYNC.equals(getMsgContext().getOds().getOd(mesgType).getDownReplyType())) {
            nextStatus = STATUS_PENDING;
            nextDesc = "message sent to PP, waiting for async reply";
        }else {
            // notify
            nextStatus = STATUS_COMPLETED;
            nextDesc = "message sent to PP";
        }
        auditLog(STATE_SENT_OUT_MSG, nextDesc, nextStatus);        
    }
    
    
    public DWMessageContext getMsgContext() {
        return (DWMessageContext)msgContext;
    }

    public void setMsgContext(DWMessageContext messageContext) {
        this.msgContext = messageContext;
    }

}
