package com.topfinance.plugin.cnaps2;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.topfinance.cfg.TestDummy;

public class Cnaps2Constants {
    
    public static final String ORIG_MSG_ID_102 =  "fiToFIPmtStsRpt.orgnlGrpInfAndSts.orgnlMsgId";
    public static final String ORIG_MSG_ID_601 =  "bkToCstmrDbtCdtNtfctn.ntfctn[0].id";
    public static final String ORIG_MSG_ID_601_EBOFLD =  "ntfctnId";
    public static final String ORIG_MSG_ID_604_EBOFLD =  "orgnlMsgId";
    

    
    public static final String MSG_ID_EBOFLD =  "grpHdrMsgId";
    
    public static final String MSG_ID_601 =  "bkToCstmrDbtCdtNtfctn.grpHdr.msgId";
    public static final String MSG_ID_101 =  "fiToFICstmrCdtTrf.grpHdr.msgId";
    
//    public static final String TEST_DATA_601_1 =  "bkToCstmrDbtCdtNtfctn.ntfctn[0].addtlNtfctnInf";
//    public static final String TEST_DATA_101_1 =  "fiToFICstmrCdtTrf.cdtTrfTxInf[0].pmtId.endToEndId";
//    public static final String TEST_DATA_101_2 =  "fiToFICstmrCdtTrf.cdtTrfTxInf[0].dbtrAcct.tp.cd";
    
    
    // using xPATH ( moved to op definition)
//    public static final String X_ORIG_MSG_ID_102 = "/Document/FIToFIPmtStsRpt/OrgnlGrpInfAndSts/OrgnlMsgId";
//    public static final String X_ORIG_MSG_ID_601 = "/Document/BkToCstmrDbtCdtNtfctn/Ntfctn[0]/Id";
//    
//    public static final String X_MSG_ID_101 = "/Document/FIToFICstmrCdtTrf/grpHdr/msgId";
//    public static final String X_MSG_ID_601 = "/Document/BkToCstmrDbtCdtNtfctn/grpHdr/msgId";
    
    public static final String JAXB_ISO_PACS_v00800102 =  "com.cnaps2.xml.iso20022.pacs.v00800102";
    
    public static Map<String, String> OPATHS_ORIG_MSG_ID = new HashMap<String, String>();
    static {
        // TODO this is a static list according to spec
        OPATHS_ORIG_MSG_ID.put(TestDummy.OPERATION_601, ORIG_MSG_ID_601);
        OPATHS_ORIG_MSG_ID.put(TestDummy.OPERATION_102, ORIG_MSG_ID_102);
    }

    
	public static String getPackageName(String mesgType) {
        // this is a fixed rule
        
        // TODO mesgType is name of operation, could change. 
        // it should be sth like "type" of operation which is enumeration value
        
        String pkgName = null;
        if(mesgType.equals("testNested")) {
        	pkgName="com.cnaps2.xml.testNested";
        }
        else if (mesgType.equals(TestDummy.OPERATION_101)) {
//            pkgName = "com.topfinance.plugin.cnaps2.v00800102";
            pkgName = JAXB_ISO_PACS_v00800102;
        } else if(mesgType.equals(TestDummy.OPERATION_102)) {
            pkgName = "com.cnaps2.xml.iso20022.pacs.v00200103";                
        } else if(mesgType.equals(TestDummy.OPERATION_601)) {
            pkgName = "com.cnaps2.xml.iso20022.camt.v05400102";    
        } else if(mesgType.equals(TestDummy.OPERATION_111)) {
            pkgName = JAXB_ISO_PACS_v00800102;   
        } else if(mesgType.equals(TestDummy.OPERATION_604)) {
            pkgName = "com.cnaps2.xml.iso20022.saps.v60400101";                 
        }         
        
        if(pkgName==null) {
        	throw new RuntimeException("no package found for mesgType="+mesgType);
        }
        return pkgName;
    }
	
	
}
