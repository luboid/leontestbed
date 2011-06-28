package com.topfinance.message;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.log4j.Logger;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgFormat;
import com.topfinance.cfg.ICfgFormat8583;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.runtime.OpInfo;
import com.topfinance.transform.smooks.SmooksTransformer;
import com.topfinance.transform.util.IsoHelper;
import com.topfinance.transform.util.IsoObj;
import com.topfinance.transform.util.IsoSchema;

public class MsgPacker8583 implements IMsgPacker {
	
	private static Logger logger = Logger.getLogger(MsgPacker8583.class);
	

//    private ISOBasePackager getPackager(ICfgFormat8583 format) throws FatalParseException{
//        ISOBasePackager res = null;
//        String clazz = format.getPackager();
//        try {
//            res = (ISOBasePackager)Class.forName(clazz).newInstance();
//        } catch (Exception ex) {
//            logger.error("cannot load packager class: "+clazz, ex);
//            throw new FatalParseException("cannot load packager class: "+clazz);
//        }
//        return res;
//    }
    
	// TODO maybe byte[] ? 
	public String convertPack(Object ebo, ICfgOperation opn, OpInfo opInfo) throws FatalParseException {
		String packedMsg = null;
		
        // ebo2iso
//		InputStream mapping = FormatFactory.loadPpMapping(opn, CfgConstants.DIRECTION_DOWN);

//		SimpleMappingRule rule = CfgImplFactory.loadCfgReader().getMappingRule(opInfo, opn, CfgConstants.DIRECTION_DOWN);
//		Object iso = new SimpleTransformer().transform(ebo, rule);
		
		String uniqueId = opInfo.toString()+CfgConstants.DIRECTION_DOWN+"private";
		byte[] mapping = CfgImplFactory.loadCfgReader().getMappingRuleAsBytes(opInfo, opn, CfgConstants.DIRECTION_DOWN);
		Object iso = SmooksTransformer.java2Java(uniqueId, ebo, new ByteArrayInputStream(mapping));
        
        ICfgFormat format = CfgImplFactory.loadCfgReader().getFormatByOpn(opn);
        
        // TODO 
        // pp simulator need this 
        String xpathOpInfo = format.getPathOpInfo();
        try {
        	BeanUtils.setProperty(iso, "f"+xpathOpInfo, opInfo.toString());
        } catch (Exception ex) {
        	ex.printStackTrace();
        	throw new RuntimeException(ex);
        }
        
        
        List<ICfgFormat8583> config = CfgImplFactory.loadCfgReader().getFormat8583(format);
        
        IsoSchema schema = IsoHelper.fromConfig(config);
        packedMsg = IsoHelper.pack(schema, (IsoObj)iso);
		
		return packedMsg;
	}
}
