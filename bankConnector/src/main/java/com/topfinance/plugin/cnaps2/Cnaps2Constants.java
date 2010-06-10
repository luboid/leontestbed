package com.topfinance.plugin.cnaps2;

import com.topfinance.cfg.TestDummy;

import java.util.HashMap;
import java.util.Map;

public class Cnaps2Constants {
    
    public static final String ORIG_MSG_ID_102 =  "fiToFIPmtStsRpt.orgnlGrpInfAndSts.orgnlMsgId";
    public static final String ORIG_MSG_ID_601 =  "bkToCstmrDbtCdtNtfctn.ntfctn[0].id";
    
    public static final String MSG_ID_601 =  "bkToCstmrDbtCdtNtfctn.grpHdr.msgId";
    public static final String MSG_ID_101 =  "fiToFICstmrCdtTrf.grpHdr.msgId";
    
    public static final String TEST_DATA_601_1 =  "bkToCstmrDbtCdtNtfctn.ntfctn[0].addtlNtfctnInf";
    
    public static final String TEST_DATA_101_1 =  "fiToFICstmrCdtTrf.cdtTrfTxInf[0].pmtId.endToEndId";
    public static final String TEST_DATA_101_2 =  "fiToFICstmrCdtTrf.cdtTrfTxInf[0].dbtrAcct.tp.cd";
    
    
    
    public static Map<String, String> OPATHS_ORIG_MSG_ID = new HashMap<String, String>();
    static {
        // TODO this is a static list according to spec
        OPATHS_ORIG_MSG_ID.put(TestDummy.OPERATION_601, ORIG_MSG_ID_601);
        OPATHS_ORIG_MSG_ID.put(TestDummy.OPERATION_102, ORIG_MSG_ID_102);
    }
    
    
}
