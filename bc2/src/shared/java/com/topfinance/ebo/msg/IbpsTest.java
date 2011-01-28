package com.topfinance.ebo.msg;

import javax.persistence.Column;
import javax.persistence.Id;

public class IbpsTest {
    // Fields 
    @JaxbMapping(objPath="")
    private String uuid;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.grpHdr.msgId")
    private String grpHdrMsgId;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.grpHdr.creDtTm")
    private java.util.Date creDtTm;
    
//    @JaxbMapping(objPath="fiToFICstmrCdtTrf.grpHdr.btchBookg")
//    private Boolean btchBookg;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.grpHdr.nbOfTxs")
    private String nbOfTxs;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.grpHdr.ctrlSum")
    private Double ctrlSum;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.grpHdr.intrBkSttlmDt")
    private java.util.Date intrBkSttlmDt;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.grpHdr.sttlmInf.sttlmMtd")
    private String sttlmMtd;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].pmtId.endToEndId")
    private String endToEndId;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].pmtId.txId")
    private String pmtIdTxId;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].pmtTpInf.instrPrty")
    private String instrPrty;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].pmtTpInf.ctgyPurp.prtry")
    private String ctgyPurpPrtry;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].intrBkSttlmAmt.value")
    private Double intrBkSttlmAmtValue;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].intrBkSttlmAmt.ccy")
    private String intrBkSttlmAmtCcy;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].accptncDtTm")
    private java.util.Date accptncDtTm;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].chrgBr")
    private String chrgBr;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].dbtr.nm")
    private String dbtrNm;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].dbtr.ctctDtls.emailAdr")
    private String emailAdr;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].dbtrAcct.id.othr.id")
    private String dbtrAcctIdOthrId;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].dbtrAcct.id.othr.issr")
    private String dbtrAcctIdOthrIssr;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].dbtrAcct.tp.prtry")
    private String tpPrtry;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].dbtrAgt.finInstnId.clrSysMmbId.mmbId")
    private String clrSysMmbIdMmbId;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].dbtrAgt.brnchId.id")
    private String brnchIdId;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].dbtrAgt.brnchId.pstlAdr.ctrySubDvsn")
    private String ctrySubDvsn;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].cdtrAgt.finInstnId.clrSysMmbId.mmbId")
    private String clrSysMmbIdMmbId1;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].cdtrAgt.brnchId.id")
    private String brnchIdId1;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].cdtr.nm")
    private String cdtrNm;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].cdtrAcct.id.othr.id")
    private String cdtrAcctIdOthrId;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].purp.prtry")
    private String purpPrtry;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].rmtInf.ustrd[0]")
    private String rmtInfUstrd;
    
    @JaxbMapping(objPath="")
    private java.util.Date ts;











	public String getNbOfTxs() {
		return nbOfTxs;
	}


	public void setNbOfTxs(String nbOfTxs) {
		this.nbOfTxs = nbOfTxs;
	}


	public Double getCtrlSum() {
		return ctrlSum;
	}


	public void setCtrlSum(Double ctrlSum) {
		this.ctrlSum = ctrlSum;
	}


	public java.util.Date getIntrBkSttlmDt() {
		return intrBkSttlmDt;
	}


	public void setIntrBkSttlmDt(java.util.Date intrBkSttlmDt) {
		this.intrBkSttlmDt = intrBkSttlmDt;
	}


	public String getSttlmMtd() {
		return sttlmMtd;
	}


	public void setSttlmMtd(String sttlmMtd) {
		this.sttlmMtd = sttlmMtd;
	}


	public String getEndToEndId() {
		return endToEndId;
	}


	public void setEndToEndId(String endToEndId) {
		this.endToEndId = endToEndId;
	}


	public String getPmtIdTxId() {
		return pmtIdTxId;
	}


	public void setPmtIdTxId(String pmtIdTxId) {
		this.pmtIdTxId = pmtIdTxId;
	}


	public String getInstrPrty() {
		return instrPrty;
	}


	public void setInstrPrty(String instrPrty) {
		this.instrPrty = instrPrty;
	}


	public String getCtgyPurpPrtry() {
		return ctgyPurpPrtry;
	}


	public void setCtgyPurpPrtry(String ctgyPurpPrtry) {
		this.ctgyPurpPrtry = ctgyPurpPrtry;
	}


	public Double getIntrBkSttlmAmtValue() {
		return intrBkSttlmAmtValue;
	}


	public void setIntrBkSttlmAmtValue(Double intrBkSttlmAmtValue) {
		this.intrBkSttlmAmtValue = intrBkSttlmAmtValue;
	}


	public String getIntrBkSttlmAmtCcy() {
		return intrBkSttlmAmtCcy;
	}


	public void setIntrBkSttlmAmtCcy(String intrBkSttlmAmtCcy) {
		this.intrBkSttlmAmtCcy = intrBkSttlmAmtCcy;
	}


	public java.util.Date getAccptncDtTm() {
		return accptncDtTm;
	}


	public void setAccptncDtTm(java.util.Date accptncDtTm) {
		this.accptncDtTm = accptncDtTm;
	}


	public String getChrgBr() {
		return chrgBr;
	}


	public void setChrgBr(String chrgBr) {
		this.chrgBr = chrgBr;
	}


	public String getDbtrNm() {
		return dbtrNm;
	}


	public void setDbtrNm(String dbtrNm) {
		this.dbtrNm = dbtrNm;
	}


	public String getEmailAdr() {
		return emailAdr;
	}


	public void setEmailAdr(String emailAdr) {
		this.emailAdr = emailAdr;
	}


	public String getDbtrAcctIdOthrId() {
		return dbtrAcctIdOthrId;
	}


	public void setDbtrAcctIdOthrId(String dbtrAcctIdOthrId) {
		this.dbtrAcctIdOthrId = dbtrAcctIdOthrId;
	}


	public String getDbtrAcctIdOthrIssr() {
		return dbtrAcctIdOthrIssr;
	}


	public void setDbtrAcctIdOthrIssr(String dbtrAcctIdOthrIssr) {
		this.dbtrAcctIdOthrIssr = dbtrAcctIdOthrIssr;
	}


	public String getTpPrtry() {
		return tpPrtry;
	}


	public void setTpPrtry(String tpPrtry) {
		this.tpPrtry = tpPrtry;
	}


	public String getClrSysMmbIdMmbId() {
		return clrSysMmbIdMmbId;
	}


	public void setClrSysMmbIdMmbId(String clrSysMmbIdMmbId) {
		this.clrSysMmbIdMmbId = clrSysMmbIdMmbId;
	}


	public String getBrnchIdId() {
		return brnchIdId;
	}


	public void setBrnchIdId(String brnchIdId) {
		this.brnchIdId = brnchIdId;
	}


	public String getCtrySubDvsn() {
		return ctrySubDvsn;
	}


	public void setCtrySubDvsn(String ctrySubDvsn) {
		this.ctrySubDvsn = ctrySubDvsn;
	}


	public String getClrSysMmbIdMmbId1() {
		return clrSysMmbIdMmbId1;
	}


	public void setClrSysMmbIdMmbId1(String clrSysMmbIdMmbId1) {
		this.clrSysMmbIdMmbId1 = clrSysMmbIdMmbId1;
	}


	public String getBrnchIdId1() {
		return brnchIdId1;
	}


	public void setBrnchIdId1(String brnchIdId1) {
		this.brnchIdId1 = brnchIdId1;
	}


	public String getCdtrNm() {
		return cdtrNm;
	}


	public void setCdtrNm(String cdtrNm) {
		this.cdtrNm = cdtrNm;
	}


	public String getCdtrAcctIdOthrId() {
		return cdtrAcctIdOthrId;
	}


	public void setCdtrAcctIdOthrId(String cdtrAcctIdOthrId) {
		this.cdtrAcctIdOthrId = cdtrAcctIdOthrId;
	}


	public String getPurpPrtry() {
		return purpPrtry;
	}


	public void setPurpPrtry(String purpPrtry) {
		this.purpPrtry = purpPrtry;
	}


	public String getRmtInfUstrd() {
		return rmtInfUstrd;
	}


	public void setRmtInfUstrd(String rmtInfUstrd) {
		this.rmtInfUstrd = rmtInfUstrd;
	}


	public java.util.Date getTs() {
		return ts;
	}


	public void setTs(java.util.Date ts) {
		this.ts = ts;
	}


	/** default constructor */
    public IbpsTest() {
    }
	
	
  public String getGrpHdrMsgId() {
		return grpHdrMsgId;
	}


	public void setGrpHdrMsgId(String grpHdrMsgId) {
		this.grpHdrMsgId = grpHdrMsgId;
	}


	public java.util.Date getCreDtTm() {
		return creDtTm;
	}


	public void setCreDtTm(java.util.Date creDtTm) {
		this.creDtTm = creDtTm;
	}


/**
   * Returns the uuid
   * 
   * @return the uuid
   */
  @Id
    @Column(name = "UUID")
    public String getUuid() {
        return uuid;
    }	 
     
  /**
   * Sets the uuid
   *
   * @param newUuid the new uuid
   */

    public void  setUuid(String newUuid) {
        uuid = newUuid;
    }	  

}
