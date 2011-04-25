package com.topfinance.util;

import java.io.FileInputStream;
import java.io.InputStream;

import junit.framework.TestCase;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.io.IOUtils;
import org.jpos.iso.ISOMsg;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgFormat;
import com.topfinance.cfg.ICfgOperation;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.TestDummy;
import com.topfinance.message.DefaultCnaps2Packer;
import com.topfinance.message.DefaultCnaps2Parser;
import com.topfinance.message.FormatFactory;
import com.topfinance.message.IMsgPacker;
import com.topfinance.message.IMsgParser;
import com.topfinance.plugin.cnaps2.Cnaps2Constants;
import com.topfinance.runtime.OpInfo;
import com.topfinance.runtime.OperationDefinitions;
import com.topfinance.transform.util.ISOIBPSPackager;
import com.topfinance.transform.util.Iso8583Util;
import com.topfinance.transform.util.IsoHelper;
import com.topfinance.transform.util.IsoObj;
import com.topfinance.transform.util.IsoSchema;

public class OpTester extends TestCase {
	
	
	public static final String PROTOCOL = CfgConstants.PROTOCOL_CNAPS2;
	
	private void debug(String s) {
		System.out.println(s);
	}
	
//	public void up(String op) {
//		up(op, BCUtils.getHomeDir());
//	}
	
	public void up(OpInfo opInfo) {
		try {

		
		// TODO check docid, opId, etc? 
		
			Object ebo = upPrivate(opInfo);
			
			String xml = upPublic(ebo, opInfo);
		
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);
			
		}
	}

	public Object upPrivate(OpInfo opInfo) {
		try {
			String mesgType = opInfo.getMesgType();
			
			ICfgReader reader = CfgImplFactory.loadCfgReader();
			ICfgProtocol protocol = reader.getProtocolByName(PROTOCOL);
			ICfgOperation opn = reader.getOperation(protocol, mesgType);
			
			// In runtime the format should be from PortIn config, but here assume it's the same as in Operation
			ICfgFormat format = reader.getFormatByOpn(opn);
			
			// prepare 8583
			ISOMsg isomsg = Iso8583Util.createDummyISOMsg(new ISOIBPSPackager(), FilePathHelper.sample8583(opInfo));
			String msg = Iso8583Util.packMsg(isomsg);
			debug("msg="+msg);
			
			// process
			IMsgParser parser = FormatFactory.getMsgParser(format);
			Object ebo = parser.parseConvert(msg, format, protocol);
			debug("ebo="+ebo);
			
			return ebo;
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);
			
		}
	}

	public String upPublic(Object ebo, OpInfo opInfo) {
		try {

			// TODO check docid, opId, etc?

			if (opInfo.getMesgType().equals(TestDummy.OPERATION_601)) {
				BeanUtils.setProperty(ebo,
						Cnaps2Constants.ORIG_MSG_ID_601_EBOFLD, "xxxxxx");
			}
			String body = new DefaultCnaps2Packer().packBody(ebo,
					opInfo.getMesgType(), opInfo);

			debug("body=\n" + body);
			return body;

		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);

		}
	}
	
	public void down(OpInfo opInfo) {
		try {

		    Object ebo = downPublic(opInfo);
			
		    Object iso = downPrivate(opInfo, ebo);
	        
	        
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);
			
		}
	}
	public Object downPrivate(OpInfo opInfo, Object ebo) {
        try {
            String mesgType = opInfo.getMesgType();
            ICfgReader reader = CfgImplFactory.loadCfgReader();
            ICfgProtocol protocol = reader.getProtocolByName(PROTOCOL);
            ICfgOperation opn = reader.getOperation(protocol, mesgType);
            IMsgPacker packer = FormatFactory.getMsgPacker(reader.getFormatByOpn(opn)); 
            String msg = packer.convertPack(ebo, opn, opInfo);      
            debug("msg=\n"+msg);
            
            IsoObj obj = IsoHelper.parse(new IsoSchema(), msg);
            debug("f126="+obj.getF126());            
            
            return obj;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);

        }
    }
	public Object downPublic(OpInfo opInfo) {
	    try {
	           String mesgType = opInfo.getMesgType();

	            
	            
	            
	            // prepare xml;
	            String cnaps2Msg = IOUtils.toString(new FileInputStream(FilePathHelper.sampleXml(opInfo)), "UTF-8");
	            
	            // TODO this is only temporary
	            String bodyText = null;
	            int pos = cnaps2Msg.indexOf("}\r\n");
	            if(pos>=0) {
	                String headerText = cnaps2Msg.substring(0, pos);
	                bodyText = cnaps2Msg.substring(pos+3);
	            } else {
	                bodyText = cnaps2Msg;
	            }
	            
	            
	            // process
	            InputStream in = new FileInputStream(FilePathHelper.configOds());
	            OperationDefinitions ods = OperationDefinitions.load(in);

	            DefaultCnaps2Parser parser = new DefaultCnaps2Parser();
	            parser.getOpInfo().setMesgType(opInfo.getMesgType());
//	          String bodyText = parser.parseHeader(cnaps2Msg);
	            Object ebo = parser.parseBody(bodyText, mesgType, ods, null);
	            
	            return ebo;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
            
        }
	    
	}
	
	
	public static void main(String args[]) {
		OpTester tester = new OpTester();
		
        String[] ops = new String[] {
                TestDummy.OPERATION_101
//                ,
//                TestDummy.OPERATION_102
//                ,
//                TestDummy.OPERATION_601
           };
           
		// for running from command line
		if (args != null && args.length > 0) {
			ops = new String[] { args[0] };
		}
		
		
		for(String op : ops) {
			tester.up(OpInfo.fromString(op));
			tester.down(OpInfo.fromString(op));
			
		}
	}
	
	public void testUp() {
        String[] ops = new String[] {
                TestDummy.OPERATION_101
//                ,
//                TestDummy.OPERATION_102
//                ,
//                TestDummy.OPERATION_601
           };
        
        for (String op : ops) {
        	
        }
	}
	
	public void testDown() {
        CfgImplFactory.setType(CfgImplFactory.TYPE_FILE);
        CfgImplFactory.setConfig("D:/bankConnector/bc2/bc2/bin/runBC-A-config-FILE.xml");
        // work in /generated folder
    	BCUtils.setHomeDir("D:/bankConnector/bc2/bc2");
    	
        OpInfo[] ops = new OpInfo[] {
        		TestDummy.OPINFO_111
//        		,
//                TestDummy.OPINFO_101
//                ,
//                TestDummy.OPERATION_102
//                ,
//                TestDummy.OPERATION_601
           };
        
        for (OpInfo op : ops) {
        	try {
        		down(op);
        	} catch (Exception ex) {
        		ex.printStackTrace();
        	}
        }
        
	}
}
