package com.topfinance.message;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import test.transform.IsoHelper;
import test.transform.IsoObj;
import test.transform.IsoSchema;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgFormat;
import com.topfinance.cfg.ICfgFormat8583;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.runtime.OpInfo;
import com.topfinance.transform.simple.SimpleMappingRule;
import com.topfinance.transform.simple.SimpleTransformer;

public class MsgParser8583 implements IMsgParser {
    private static Logger logger = Logger.getLogger(MsgParser8583.class);
    
    private String docId;
    private String origDocId;
//    private String opName;
//    private String opType;
    
    private OpInfo opInfo = new OpInfo();
    
	
//    private ISOBasePackager getPackager(ICfgFormat format) throws FatalParseException{
//        ISOBasePackager res = null;
//        String clazz = ((ICfgFormat8583)format).getPackager();
//        try {
//            res = (ISOBasePackager)Class.forName(clazz).newInstance();
//        } catch (Exception ex) {
//            logger.error("cannot load packager class: "+clazz, ex);
//            throw new FatalParseException("cannot load packager class: "+clazz);
//        }
//        return res;
//    }
    
	public Object parseConvert(String msg, ICfgFormat format, ICfgProtocol protocol) throws FatalParseException{
        Object parsedMsg = null;
        
//        ISOMsg iso = Iso8583Util.unpackMsg(msg, getPackager(opn));
//        docId = iso.getString(BcConstants.ISO8583_DOC_ID);
//        opName = iso.getString(BcConstants.ISO8583_OP_NAME);
//        origDocId = iso.getString(BcConstants.ISO8583_ORIG_DOC_ID);
        
        // msg2iso
        List<ICfgFormat8583> config = CfgImplFactory.loadCfgReader().getFormat8583(format);
        IsoSchema schema = IsoHelper.fromConfig(config);
        IsoObj iso = IsoHelper.parse(schema, msg);
//        ISOMsg isomsg = Iso8583Util.unpackMsg(msg, getPackager(format));
//        IsoObj iso = IsoHelper.parse(isomsg);
        
        
        docId = IsoHelper.getField(iso, format.getPathDocId());
        origDocId = IsoHelper.getField(iso, format.getPathOrigDocId());
        
//        opName = IsoHelper.getField(iso, format.getPathOpId());        
//        opType = IsoHelper.getField(iso, format.getPathOpType());
        String pathOpInfo = IsoHelper.getField(iso, format.getPathOpInfo());
        opInfo = OpInfo.fromString(pathOpInfo);
        
        ICfgOperation opn = CfgImplFactory.loadCfgReader().getOperation(protocol, opInfo.getMesgType());
        
        // TODO check exceptions
        
        // iso2ebo
//		InputStream mapping = FormatFactory.loadPpMapping(opn, CfgConstants.DIRECTION_UP);
//        byte[] mapping = CfgImplFactory.loadCfgReader().getMappingRule(opInfo, opn, CfgConstants.DIRECTION_UP);
        SimpleMappingRule rule = CfgImplFactory.loadCfgReader().getMappingRule(opInfo, opn, CfgConstants.DIRECTION_UP);
        
//        parsedMsg = SmooksTransformer.java2Java(iso, mapping);
        parsedMsg = new SimpleTransformer().transform(iso, rule);
        
        return parsedMsg;
	}

	public String getDocId() {
		return docId;
	}

	public void setDocId(String docId) {
		this.docId = docId;
	}



	public String getOrigDocId() {
		return origDocId;
	}

	public void setOrigDocId(String origDocId) {
		this.origDocId = origDocId;
	}

	public OpInfo getOpInfo() {
		return opInfo;
	}

	public void setOpInfo(OpInfo opInfo) {
		this.opInfo = opInfo;
	}

}
