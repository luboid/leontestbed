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
    
    public static final String JAXB_ISO_PACS_v00800102 =  "com.xml.iso20022.pacs.v00800102";
    
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
        	pkgName="com.xml.testNested";
        }
        else if(mesgType.equals("saps.737.001.01")) {
        	pkgName = "com.xml.cnaps2.saps.v73700101";
      }
        else if (mesgType.equals(TestDummy.OPERATION_101)) {
//            pkgName = "com.topfinance.plugin.cnaps2.v00800102";
            pkgName = JAXB_ISO_PACS_v00800102;
        } else if(mesgType.equals(TestDummy.OPERATION_102)) {
            pkgName = "com.xml.iso20022.pacs.v00200103";                
        } else if(mesgType.equals(TestDummy.OPERATION_601)) {
            pkgName = "com.xml.iso20022.camt.v05400102";    
        } else if(mesgType.equals(TestDummy.OPERATION_111)) {
            pkgName = JAXB_ISO_PACS_v00800102;   
        } else if(mesgType.equals(TestDummy.OPERATION_604)) {
            pkgName = "com.xml.iso20022.saps.v60400101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_CCMS_990_001_02)) {
            pkgName = "com.xml.cnaps2.ccms.v99000102";                 
        } else if(mesgType.equals(TestDummy.OPERATION_991)) {
            pkgName = "com.xml.cnaps2.ccms.v99100101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_311)) {
            pkgName = "com.xml.cnaps2.ccms.v31100101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_608)) {
            pkgName = "com.xml.cnaps2.pbcs.v60800101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_303)) {
            pkgName = "com.xml.cnaps2.ccms.v30300102";                 
        } else if(mesgType.equals(TestDummy.OPERATION_310)) {
            pkgName = "com.xml.cnaps2.ccms.v31000101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_312)) {
            pkgName = "com.xml.cnaps2.ccms.v31200101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_313)) {
            pkgName = "com.xml.cnaps2.ccms.v31300101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_314)) {
            pkgName = "com.xml.cnaps2.ccms.v31400101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_315)) {
            pkgName = "com.xml.cnaps2.ccms.v31500101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_801)) {
            pkgName = "com.xml.cnaps2.ccms.v80100102";                 
        } else if(mesgType.equals(TestDummy.OPERATION_805)) {
            pkgName = "com.xml.cnaps2.ccms.v80500102";                 
        } else if(mesgType.equals(TestDummy.OPERATION_806)) {
            pkgName = "com.xml.cnaps2.ccms.v80600102";                 
        } else if(mesgType.equals(TestDummy.OPERATION_807)) {
            pkgName = "com.xml.cnaps2.ccms.v80700102";                 
        } else if(mesgType.equals(TestDummy.OPERATION_811)) {
            pkgName = "com.xml.cnaps2.ccms.v81100101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_900)) {
            pkgName = "com.xml.cnaps2.ccms.v90000102";                 
        } else if(mesgType.equals(TestDummy.OPERATION_903)) {
            pkgName = "com.xml.cnaps2.ccms.v90300102";                 
        } else if(mesgType.equals(TestDummy.OPERATION_911)) {
            pkgName = "com.xml.cnaps2.ccms.v91100102";                 
        } else if(mesgType.equals(TestDummy.OPERATION_358)) {
            pkgName = "com.xml.cnaps2.saps.v35800101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_359)) {
            pkgName = "com.xml.cnaps2.saps.v35900101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_361)) {
            pkgName = "com.xml.cnaps2.saps.v36100101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_362)) {
            pkgName = "com.xml.cnaps2.saps.v36200101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_363)) {
            pkgName = "com.xml.cnaps2.saps.v36300101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_365)) {
            pkgName = "com.xml.cnaps2.saps.v36500101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_366)) {
            pkgName = "com.xml.cnaps2.saps.v36600101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_368)) {
            pkgName = "com.xml.cnaps2.saps.v36800101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_370)) {
            pkgName = "com.xml.cnaps2.saps.v37000101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_371)) {
            pkgName = "com.xml.cnaps2.saps.v37100101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_372)) {
            pkgName = "com.xml.cnaps2.saps.v37200101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_374)) {
            pkgName = "com.xml.cnaps2.saps.v37400101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_375)) {
            pkgName = "com.xml.cnaps2.saps.v37500101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_604)) {
            pkgName = "com.xml.iso20022.saps.v60400101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_606)) {
            pkgName = "com.xml.cnaps2.saps.v60600101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_609)) {
            pkgName = "com.xml.cnaps2.saps.v60900101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_612)) {
            pkgName = "com.xml.cnaps2.saps.v61200101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_613)) {
            pkgName = "com.xml.cnaps2.saps.v61300101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_614)) {
            pkgName = "com.xml.cnaps2.saps.v61400101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_734)) {
            pkgName = "com.xml.cnaps2.saps.v73400101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_142)) {
            pkgName = "com.xml.cnaps2.hvps.v14200101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_143)) {
            pkgName = "com.xml.cnaps2.hvps.v14300101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_144)) {
            pkgName = "com.xml.cnaps2.hvps.v14400101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_151)) {
            pkgName = "com.xml.cnaps2.hvps.v15100101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_152)) {
            pkgName = "com.xml.cnaps2.hvps.v15200101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_153)) {
            pkgName = "com.xml.cnaps2.hvps.v15300101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_710)) {
            pkgName = "com.xml.cnaps2.hvps.v71000101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_711)) {
            pkgName = "com.xml.cnaps2.hvps.v71100101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_712)) {
            pkgName = "com.xml.cnaps2.hvps.v71200101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_713)) {
            pkgName = "com.xml.cnaps2.hvps.v71300101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_714)) {
            pkgName = "com.xml.cnaps2.hvps.v71400101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_715)) {
            pkgName = "com.xml.cnaps2.hvps.v71500101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_716)) {
            pkgName = "com.xml.cnaps2.hvps.v71600101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_717)) {
            pkgName = "com.xml.cnaps2.hvps.v71700101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_401)) {
            pkgName = "com.xml.cnaps2.beps.v40100101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_402)) {
            pkgName = "com.xml.cnaps2.beps.v40200101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_403)) {
            pkgName = "com.xml.cnaps2.beps.v40300101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_413)) {
            pkgName = "com.xml.cnaps2.beps.v41300101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_414)) {
            pkgName = "com.xml.cnaps2.beps.v41400101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_415)) {
            pkgName = "com.xml.cnaps2.beps.v41500101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_416)) {
            pkgName = "com.xml.cnaps2.beps.v41600101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_417)) {
            pkgName = "com.xml.cnaps2.beps.v41700101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_720)) {
            pkgName = "com.xml.cnaps2.beps.v72000101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_725)) {
            pkgName = "com.xml.cnaps2.beps.v72500101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_386)) {
            pkgName = "com.xml.cnaps2.beps.v38600101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_394)) {
            pkgName = "com.xml.cnaps2.beps.v39400101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_395)) {
            pkgName = "com.xml.cnaps2.beps.v39500101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_397)) {
            pkgName = "com.xml.cnaps2.beps.v39700101";                 
        } else if(mesgType.equals(TestDummy.OPERATION_398)) {
            pkgName = "com.xml.cnaps2.beps.v39800101";                 
        }
        
        if(pkgName==null) {
        	throw new RuntimeException("no package found for mesgType="+mesgType);
        }
        return pkgName;
    }
	
	
}
