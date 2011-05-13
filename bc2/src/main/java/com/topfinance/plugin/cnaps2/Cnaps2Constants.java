package com.topfinance.plugin.cnaps2;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.topfinance.cfg.TestDummy;

public class Cnaps2Constants {

	public static final String ORIG_MSG_ID_102 = "fiToFIPmtStsRpt.orgnlGrpInfAndSts.orgnlMsgId";
	public static final String ORIG_MSG_ID_601 = "bkToCstmrDbtCdtNtfctn.ntfctn[0].id";
	public static final String ORIG_MSG_ID_601_EBOFLD = "ntfctnId";
	public static final String ORIG_MSG_ID_604_EBOFLD = "orgnlMsgId";

	public static final String MSG_ID_EBOFLD = "grpHdrMsgId";

	public static final String MSG_ID_601 = "bkToCstmrDbtCdtNtfctn.grpHdr.msgId";
	public static final String MSG_ID_101 = "fiToFICstmrCdtTrf.grpHdr.msgId";

	// public static final String TEST_DATA_601_1 =
	// "bkToCstmrDbtCdtNtfctn.ntfctn[0].addtlNtfctnInf";
	// public static final String TEST_DATA_101_1 =
	// "fiToFICstmrCdtTrf.cdtTrfTxInf[0].pmtId.endToEndId";
	// public static final String TEST_DATA_101_2 =
	// "fiToFICstmrCdtTrf.cdtTrfTxInf[0].dbtrAcct.tp.cd";

	// using xPATH ( moved to op definition)
	// public static final String X_ORIG_MSG_ID_102 =
	// "/Document/FIToFIPmtStsRpt/OrgnlGrpInfAndSts/OrgnlMsgId";
	// public static final String X_ORIG_MSG_ID_601 =
	// "/Document/BkToCstmrDbtCdtNtfctn/Ntfctn[0]/Id";
	//
	// public static final String X_MSG_ID_101 =
	// "/Document/FIToFICstmrCdtTrf/grpHdr/msgId";
	// public static final String X_MSG_ID_601 =
	// "/Document/BkToCstmrDbtCdtNtfctn/grpHdr/msgId";

	public static final String JAXB_ISO_PACS_v00800102 = "com.xml.iso20022.pacs.v00800102";

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


	
////////////////////////////////////////////////////
	// dev test, do not delete
    if(mesgType.equals("testNested")) {
    	pkgName="com.xml.testNested";
    } 
    else if(mesgType.equals("saps.737.001.01")) {
    	pkgName = "com.xml.cnaps2.saps.v73700101";
    }
    else if(mesgType.equals("beps.123.001.01")) {
    	// reuse this
    	pkgName = JAXB_ISO_PACS_v00800102;
    }    
    else if(mesgType.equals("beps.393.001.01")) {
    	// reuse this
    	pkgName = "com.xml.cnaps2.camt.v00500104";
////////////////////////////////////////////////////    	
    	
    	
		} else if (mesgType.equals(TestDummy.OPERATION_101)) {
			// pkgName = "com.topfinance.plugin.cnaps2.v00800102";
			pkgName = JAXB_ISO_PACS_v00800102;
		} else if (mesgType.equals(TestDummy.OPERATION_102)) {
			pkgName = "com.xml.iso20022.pacs.v00200103";
		} else if (mesgType.equals(TestDummy.OPERATION_111)) {
			pkgName = JAXB_ISO_PACS_v00800102;
		} else if (mesgType.equals(TestDummy.OPERATION_112)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_121)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_122)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_123)) {
			pkgName = "com.xml.cnaps2.beps.v12300101";
		} else if (mesgType.equals(TestDummy.OPERATION_124)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_125)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_127)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_128)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_130)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_131)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_132)) {
			pkgName = "com.xml.cnaps2.beps.v13200101";
		} else if (mesgType.equals(TestDummy.OPERATION_133)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_134)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_141)) {
			pkgName = "com.xml.iso20022.pacs.v00900102";
		} else if (mesgType.equals(TestDummy.OPERATION_142)) {
			pkgName = "com.xml.cnaps2.hvps.v14200101";
		} else if (mesgType.equals(TestDummy.OPERATION_143)) {
			pkgName = "com.xml.cnaps2.hvps.v14300101";
		} else if (mesgType.equals(TestDummy.OPERATION_144)) {
			pkgName = "com.xml.cnaps2.hvps.v14400101";
		} else if (mesgType.equals(TestDummy.OPERATION_151)) {
			pkgName = "com.xml.cnaps2.hvps.v15100101";
		} else if (mesgType.equals(TestDummy.OPERATION_152)) {
			pkgName = "com.xml.cnaps2.hvps.v15200101";
		} else if (mesgType.equals(TestDummy.OPERATION_153)) {
			pkgName = "com.xml.cnaps2.hvps.v15300101";
		} else if (mesgType.equals(TestDummy.OPERATION_303)) {
			pkgName = "com.xml.cnaps2.ccms.v30300102";
		} else if (mesgType.equals(TestDummy.OPERATION_307)) {
			pkgName = "com.xml.iso20022.camt.v05600101";
		} else if (mesgType.equals(TestDummy.OPERATION_308)) {
			pkgName = "com.xml.iso20022.pacs.v00200103";
		} else if (mesgType.equals(TestDummy.OPERATION_310)) {
			pkgName = "com.xml.cnaps2.ccms.v31000101";
		} else if (mesgType.equals(TestDummy.OPERATION_311)) {
			pkgName = "com.xml.cnaps2.ccms.v31100101";
		} else if (mesgType.equals(TestDummy.OPERATION_312)) {
			pkgName = "com.xml.cnaps2.ccms.v31200101";
		} else if (mesgType.equals(TestDummy.OPERATION_313)) {
			pkgName = "com.xml.cnaps2.ccms.v31300101";
		} else if (mesgType.equals(TestDummy.OPERATION_314)) {
			pkgName = "com.xml.cnaps2.ccms.v31400101";
		} else if (mesgType.equals(TestDummy.OPERATION_315)) {
			pkgName = "com.xml.cnaps2.ccms.v31500101";
		} else if (mesgType.equals(TestDummy.OPERATION_316)) {
			pkgName = "com.xml.iso20022.camt.v00500104";
		} else if (mesgType.equals(TestDummy.OPERATION_317)) {
			pkgName = "com.xml.iso20022.camt.v00600104";
		} else if (mesgType.equals(TestDummy.OPERATION_318)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_319)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_350)) {
			pkgName = "com.xml.iso20022.camt.v00900104";
		} else if (mesgType.equals(TestDummy.OPERATION_351)) {
			pkgName = "com.xml.cnaps2.nets.v35100101";
		} else if (mesgType.equals(TestDummy.OPERATION_353)) {
			pkgName = "com.xml.cnaps2.nets.v35300101";
		} else if (mesgType.equals(TestDummy.OPERATION_354)) {
			pkgName = "com.xml.cnaps2.nets.v35400101";
		} else if (mesgType.equals(TestDummy.OPERATION_356)) {
			pkgName = "com.xml.cnaps2.nets.v35600101";
		} else if (mesgType.equals(TestDummy.OPERATION_357)) {
			pkgName = "com.xml.cnaps2.saps.v35700101";
		} else if (mesgType.equals(TestDummy.OPERATION_358)) {
			pkgName = "com.xml.cnaps2.saps.v35800101";
		} else if (mesgType.equals(TestDummy.OPERATION_359)) {
			pkgName = "com.xml.cnaps2.saps.v35900101";
		} else if (mesgType.equals(TestDummy.OPERATION_360)) {
			pkgName = "com.xml.iso20022.camt.v05200102";
		} else if (mesgType.equals(TestDummy.OPERATION_361)) {
			pkgName = "com.xml.cnaps2.saps.v36100101";
		} else if (mesgType.equals(TestDummy.OPERATION_362)) {
			pkgName = "com.xml.cnaps2.saps.v36200101";
		} else if (mesgType.equals(TestDummy.OPERATION_363)) {
			pkgName = "com.xml.cnaps2.saps.v36300101";
		} else if (mesgType.equals(TestDummy.OPERATION_364)) {
			pkgName = "com.xml.cnaps2.saps.v36400101";
		} else if (mesgType.equals(TestDummy.OPERATION_365)) {
			pkgName = "com.xml.cnaps2.saps.v36500101";
		} else if (mesgType.equals(TestDummy.OPERATION_366)) {
			pkgName = "com.xml.cnaps2.saps.v36600101";
		} else if (mesgType.equals(TestDummy.OPERATION_367)) {
			pkgName = "com.xml.cnaps2.saps.v36700101";
		} else if (mesgType.equals(TestDummy.OPERATION_368)) {
			pkgName = "com.xml.cnaps2.saps.v36800101";
		} else if (mesgType.equals(TestDummy.OPERATION_369)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_370)) {
			pkgName = "com.xml.cnaps2.saps.v37000101";
		} else if (mesgType.equals(TestDummy.OPERATION_371)) {
			pkgName = "com.xml.cnaps2.saps.v37100101";
		} else if (mesgType.equals(TestDummy.OPERATION_372)) {
			pkgName = "com.xml.cnaps2.saps.v37200101";
		} else if (mesgType.equals(TestDummy.OPERATION_373)) {
			pkgName = "com.xml.cnaps2.saps.v37300101";
		} else if (mesgType.equals(TestDummy.OPERATION_374)) {
			pkgName = "com.xml.cnaps2.saps.v37400101";
		} else if (mesgType.equals(TestDummy.OPERATION_375)) {
			pkgName = "com.xml.cnaps2.saps.v37500101";
		} else if (mesgType.equals(TestDummy.OPERATION_376)) {
			pkgName = "com.xml.iso20022.camt.v05000102";
		} else if (mesgType.equals(TestDummy.OPERATION_377)) {
			pkgName = "com.xml.iso20022.camt.v05100102";
		} else if (mesgType.equals(TestDummy.OPERATION_381)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_382)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_383)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_384)) {
			pkgName = "com.xml.cnaps2.beps.v38400101";
		} else if (mesgType.equals(TestDummy.OPERATION_385)) {
			pkgName = "com.xml.cnaps2.beps.v38500101";
		} else if (mesgType.equals(TestDummy.OPERATION_386)) {
			pkgName = "com.xml.cnaps2.beps.v38600101";
		} else if (mesgType.equals(TestDummy.OPERATION_387)) {
			pkgName = "com.xml.cnaps2.beps.v38700101";
		} else if (mesgType.equals(TestDummy.OPERATION_388)) {
			pkgName = "com.xml.cnaps2.beps.v38800101";
		} else if (mesgType.equals(TestDummy.OPERATION_391)) {
			pkgName = "com.xml.cnaps2.beps.v39100101";
		} else if (mesgType.equals(TestDummy.OPERATION_392)) {
			pkgName = "com.xml.cnaps2.beps.v39200101";
		} else if (mesgType.equals(TestDummy.OPERATION_393)) {
			pkgName = "com.xml.cnaps2.beps.v39300101";
		} else if (mesgType.equals(TestDummy.OPERATION_394)) {
			pkgName = "com.xml.cnaps2.beps.v39400101";
		} else if (mesgType.equals(TestDummy.OPERATION_395)) {
			pkgName = "com.xml.cnaps2.beps.v39500101";
		} else if (mesgType.equals(TestDummy.OPERATION_397)) {
			pkgName = "com.xml.cnaps2.beps.v39700101";
		} else if (mesgType.equals(TestDummy.OPERATION_398)) {
			pkgName = "com.xml.cnaps2.beps.v39800101";
		} else if (mesgType.equals(TestDummy.OPERATION_401)) {
			pkgName = "com.xml.cnaps2.beps.v40100101";
		} else if (mesgType.equals(TestDummy.OPERATION_402)) {
			pkgName = "com.xml.cnaps2.beps.v40200101";
		} else if (mesgType.equals(TestDummy.OPERATION_403)) {
			pkgName = "com.xml.cnaps2.beps.v40300101";
		} else if (mesgType.equals(TestDummy.OPERATION_405)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_406)) {
			pkgName = "com.xml.cnaps2.nets.v40600101";
		} else if (mesgType.equals(TestDummy.OPERATION_407)) {
			pkgName = "com.xml.cnaps2.nets.v40700101";
		} else if (mesgType.equals(TestDummy.OPERATION_411)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_412)) {
			pkgName = "com.xml.cnaps2.beps.v41200101";
		} else if (mesgType.equals(TestDummy.OPERATION_413)) {
			pkgName = "com.xml.iso20022.camt.v05500101";
		} else if (mesgType.equals(TestDummy.OPERATION_414)) {
			pkgName = "com.xml.cnaps2.beps.v41400101";
		} else if (mesgType.equals(TestDummy.OPERATION_415)) {
			pkgName = "com.xml.cnaps2.beps.v41500101";
		} else if (mesgType.equals(TestDummy.OPERATION_416)) {
			pkgName = "com.xml.iso20022.camt.v05500101";
		} else if (mesgType.equals(TestDummy.OPERATION_417)) {
			pkgName = "com.xml.cnaps2.beps.v41700101";
		} else if (mesgType.equals(TestDummy.OPERATION_601)) {
			pkgName = "com.xml.iso20022.camt.v05400102";
		} else if (mesgType.equals(TestDummy.OPERATION_603)) {
			pkgName = "com.xml.iso20022.camt.v05300102";
		} else if (mesgType.equals(TestDummy.OPERATION_604)) {
			pkgName = "com.xml.iso20022.saps.v60400101";
		} else if (mesgType.equals(TestDummy.OPERATION_606)) {
			pkgName = "com.xml.cnaps2.saps.v60600101";
		} else if (mesgType.equals(TestDummy.OPERATION_607)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_608)) {
			pkgName = "com.xml.cnaps2.pbcs.v60800101";
		} else if (mesgType.equals(TestDummy.OPERATION_609)) {
			pkgName = "com.xml.cnaps2.saps.v60900101";
		} else if (mesgType.equals(TestDummy.OPERATION_610)) {
			pkgName = "com.xml.cnaps2.saps.v61000101";
		} else if (mesgType.equals(TestDummy.OPERATION_611)) {
			pkgName = "com.xml.cnaps2.saps.v61100101";
		} else if (mesgType.equals(TestDummy.OPERATION_612)) {
			pkgName = "com.xml.cnaps2.saps.v61200101";
		} else if (mesgType.equals(TestDummy.OPERATION_613)) {
			pkgName = "com.xml.cnaps2.saps.v61300101";
		} else if (mesgType.equals(TestDummy.OPERATION_614)) {
			pkgName = "com.xml.cnaps2.saps.v61400101";
		} else if (mesgType.equals(TestDummy.OPERATION_615)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_616)) {
			pkgName = "com.xml.cnaps2.saps.v61600101";
		} else if (mesgType.equals(TestDummy.OPERATION_617)) {
			pkgName = "com.xml.cnaps2.nets.v61700101";
		} else if (mesgType.equals(TestDummy.OPERATION_618)) {
			pkgName = "com.xml.cnaps2.nets.v61800101";
		} else if (mesgType.equals(TestDummy.OPERATION_710)) {
			pkgName = "com.xml.cnaps2.hvps.v71000101";
		} else if (mesgType.equals(TestDummy.OPERATION_711)) {
			pkgName = "com.xml.cnaps2.hvps.v71100101";
		} else if (mesgType.equals(TestDummy.OPERATION_712)) {
			pkgName = "com.xml.cnaps2.hvps.v71200101";
		} else if (mesgType.equals(TestDummy.OPERATION_713)) {
			pkgName = "com.xml.cnaps2.hvps.v71300101";
		} else if (mesgType.equals(TestDummy.OPERATION_714)) {
			pkgName = "com.xml.cnaps2.hvps.v71400101";
		} else if (mesgType.equals(TestDummy.OPERATION_715)) {
			pkgName = "com.xml.cnaps2.hvps.v71500101";
		} else if (mesgType.equals(TestDummy.OPERATION_716)) {
			pkgName = "com.xml.cnaps2.hvps.v71600101";
		} else if (mesgType.equals(TestDummy.OPERATION_717)) {
			pkgName = "com.xml.cnaps2.hvps.v71700101";
		} else if (mesgType.equals(TestDummy.OPERATION_720)) {
			pkgName = "com.xml.cnaps2.beps.v72000101";
		} else if (mesgType.equals(TestDummy.OPERATION_721)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_722)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_723)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_724)) {
			pkgName = "com.xml.cnaps2.beps.v72400101";
		} else if (mesgType.equals(TestDummy.OPERATION_725)) {
			pkgName = "com.xml.cnaps2.beps.v72500101";
		} else if (mesgType.equals(TestDummy.OPERATION_726)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_730)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_731)) {
			pkgName = "com.xml.cnaps2.saps.v73100101";
		} else if (mesgType.equals(TestDummy.OPERATION_732)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_733)) {
			pkgName = "com.xml.cnaps2.saps.v73300101";
		} else if (mesgType.equals(TestDummy.OPERATION_734)) {
			pkgName = "com.xml.cnaps2.saps.v73400101";
		} else if (mesgType.equals(TestDummy.OPERATION_735)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_736)) {
			pkgName = "com.xml.cnaps2.saps.v73600101";
		} else if (mesgType.equals(TestDummy.OPERATION_737)) {
			pkgName = "com.xml.cnaps2.saps.v73700101";
		} else if (mesgType.equals(TestDummy.OPERATION_738)) {
			pkgName = "com.xml.cnaps2.saps.v73800101";
		} else if (mesgType.equals(TestDummy.OPERATION_801)) {
			pkgName = "com.xml.cnaps2.ccms.v80100102";
		} else if (mesgType.equals(TestDummy.OPERATION_803)) {
			pkgName = "com.xml.cnaps2.ccms.v80300102";
		} else if (mesgType.equals(TestDummy.OPERATION_805)) {
			pkgName = "com.xml.cnaps2.ccms.v80500102";
		} else if (mesgType.equals(TestDummy.OPERATION_806)) {
			pkgName = "com.xml.cnaps2.ccms.v80600102";
		} else if (mesgType.equals(TestDummy.OPERATION_807)) {
			pkgName = "com.xml.cnaps2.ccms.v80700102";
		} else if (mesgType.equals(TestDummy.OPERATION_809)) {
			pkgName = "com.xml.cnaps2.ccms.v80900102";
		} else if (mesgType.equals(TestDummy.OPERATION_811)) {
			pkgName = "com.xml.cnaps2.ccms.v81100101";
		} else if (mesgType.equals(TestDummy.OPERATION_900)) {
			pkgName = "com.xml.cnaps2.ccms.v90000102";
		} else if (mesgType.equals(TestDummy.OPERATION_903)) {
			pkgName = "com.xml.cnaps2.ccms.v90300102";
		} else if (mesgType.equals(TestDummy.OPERATION_906)) {
			pkgName = "com.xml.cnaps2.ccms.v90600101";
		} else if (mesgType.equals(TestDummy.OPERATION_907)) {
			pkgName = "com.xml.cnaps2.ccms.v90700102";
		} else if (mesgType.equals(TestDummy.OPERATION_911)) {
			pkgName = "com.xml.cnaps2.ccms.v91100102";
		} else if (mesgType.equals(TestDummy.OPERATION_913)) {
			pkgName = "com.xml.cnaps2.ccms.v91300101";
		} else if (mesgType.equals(TestDummy.OPERATION_915)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_916)) {
			pkgName = "com.xml.cnaps2.ccms.v91600101";
		} else if (mesgType.equals(TestDummy.OPERATION_917)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_919)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_921)) {
			pkgName = "com.xml.cnaps2.ccms.v92100101";
		} else if (mesgType.equals(TestDummy.OPERATION_926)) {
			pkgName = "XXXX";
		} else if (mesgType.equals(TestDummy.OPERATION_992)) {
			pkgName = "com.xml.cnaps2.ccms.v99200101";
		} else if (mesgType.equals(TestDummy.OPERATION_991)) {
			pkgName = "com.xml.cnaps2.ccms.v99100101";
		} else if (mesgType.equals(TestDummy.OPERATION_CCMS_990_001_02)) {
			pkgName = "com.xml.cnaps2.ccms.v99000102";
		} else if (mesgType.equals(TestDummy.OPERATION_919)) {
			pkgName = "com.xml.cnaps2.ccms.v91900101";
		}

		if (pkgName == null) {
			throw new RuntimeException("no package found for mesgType=" + mesgType);
		}
		return pkgName;
	}

}
