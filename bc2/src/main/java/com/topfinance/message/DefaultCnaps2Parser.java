package com.topfinance.message;

import java.io.InputStream;
import java.io.StringReader;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathFactory;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.cfg.TestDummy;
import com.topfinance.plugin.cnaps2.AckRoot;
import com.topfinance.plugin.cnaps2.Cnaps2Constants;
import com.topfinance.plugin.cnaps2.MsgHeader;
import com.topfinance.runtime.BcException;
import com.topfinance.runtime.OpInfo;
import com.topfinance.runtime.OperationDefinition;
import com.topfinance.runtime.OperationDefinitions;
import com.topfinance.transform.smooks.SmooksTransformer;

public class DefaultCnaps2Parser  {
    private String mesgId;
    private String mesgRefId;
    private String origSender;
    private String origReceiver;

    private OpInfo opInfo = new OpInfo();
    
    private String docId;
    private String origDocId;

    
    static Logger logger = Logger.getLogger(DefaultCnaps2Parser.class);
    
    // to be overridden ??
    protected String getJaxbPackageName(String opName) {
        return Cnaps2Constants.getPackageName(opName);
    }
    
    public Object parseBody(String bodyText, String mesgType, OperationDefinitions ods, ICfgProtocol protocol) {
    	Object parsedObj = null;
        if (TestDummy.OPERATION_990.equals(mesgType)) {
            try {
                parsedObj = AckRoot.loadFromString(bodyText);
            } catch (BcException ex) {
                logger.warn("failed to parse ack: "+ex.getMessage(), ex);
            }           
        } else {
        	
        	OperationDefinition od = ods.getOd(mesgType);
        	ICfgOperation cfgOpn = CfgImplFactory.loadCfgReader().getOperation(protocol, mesgType);
        	
            // Parse xml body
//            String pkgName = getJaxbPackageName(mesgType);
//            try {
//                parsedObj = new Iso8583ToXml(pkgName).xmlToObject(bodyText);
//            } catch (Exception ex) {
//                logger.warn("failed to parse response: "+ex.getMessage(), ex);
//            }
//            if(parsedObj!=null) {
//                docId = BCUtils.extractMsgId(parsedObj);
//                origDocId = BCUtils.extractOrigMsgId(parsedObj, mesgType, Cnaps2Constants.OPATHS_ORIG_MSG_ID);
//            }
//            // TODO one step convert, while extracting docId and origDocId from ebo
//            // now just convert jaxb to ebo
//            if(true) {
//            	throw new RuntimeException("TODO jaxb2ebo or direct xml2ebo");
//            }
            
        	// Parse xml body
        	try {
        		// TODO is these instances thread-safe to reuse? 
        		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
//        		factory.setNamespaceAware(true); // never forget this!
        		factory.setNamespaceAware(false); // cannot get value if given true, todo 
        		DocumentBuilder builder = factory.newDocumentBuilder();
        		Document doc = builder.parse(new InputSource(new StringReader(bodyText)));
        		XPathFactory xpathFac = XPathFactory.newInstance();
        		XPath xpath = xpathFac.newXPath();
        		
        		String xpathDocId = od.getPathDocId();
        		docId = extract(xpath, xpathDocId, doc);
        		
        		String xpathOrigDocId = od.getPathOrigDocId();
        		origDocId = extract(xpath, xpathOrigDocId, doc);

        		
        		String xpathOpType = od.getPathOpType();
        		opInfo.setOpType(extract(xpath, xpathOpType, doc));
        		
        		String xpathOpClass = od.getPathOpClass();
        		opInfo.setOpClass(extract(xpath, xpathOpClass, doc));
        		
                // xml2ebo
                InputStream mapping = FormatFactory.loadPluginMapping(opInfo, CfgConstants.DIRECTION_DOWN);
        		parsedObj = SmooksTransformer.xml2Java(bodyText, mapping);
        		
        	} catch (Exception ex) {
        		logger.error("failed to parse xml="+bodyText);
        		throw new RuntimeException(ex);
        	}
            logger.info("bodyText: "+bodyText);
            logger.info("docId="+docId+", origDocId: "+origDocId);
        }
        
        
        return parsedObj;
    }
    
    public String extract(XPath xpath, String xpathStr, Document doc) throws Exception{
    	String res = null;
		if(StringUtils.isNotEmpty(xpathStr)) {
			XPathExpression expr = xpath.compile(xpathStr);
			res = expr.evaluate(doc);
		}
		return res==null? "" : res.trim();
    }
    
    public String parseHeader(String msg) throws FatalParseException {
    	
        String headerText = msg.substring(0, MsgHeader.TOTAL_LENGTH);
        String bodyText = msg.substring(MsgHeader.TOTAL_LENGTH);
    	// changed. based on EndFlag now
    	
//    	int pos = msg.indexOf("}\r\n");
//    	String headerText = msg.substring(0, pos);
//    	String bodyText = msg.substring(pos+3);
    	
        MsgHeader header = null;
        try {
            header = MsgHeader.fromText(headerText);
        } catch (Exception ex) {
            ex.printStackTrace();
            // no way to generate any meaningful ack
            throw new FatalParseException(ex);
        }        
        
        mesgId = header.getMesgID();
        mesgRefId = header.getMesgRefID();
        opInfo.setMesgType(header.getMesgType());
        origSender = header.getOrigSender();
        origReceiver = header.getOrigReceiver();
        
        return bodyText;
        
        
    }

    public String getMesgId() {
        return mesgId;
    }

    public String getMesgRefId() {
        return mesgRefId;
    }



    public String getOrigSender() {
        return origSender;
    }

    public String getOrigReceiver() {
        return origReceiver;
    }
    
    public String getDocId() {
        return docId;
    }

    public String getOrigDocId() {
        return origDocId;
    }

	public OpInfo getOpInfo() {
		return opInfo;
	}

	public void setOpInfo(OpInfo opInfo) {
		this.opInfo = opInfo;
	}
}
