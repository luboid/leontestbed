package com.topfinance.ebo.msg;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Ibps10200101 generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_MSG_IBPS_102_001_01")
public class Ibps10200101  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private String uuid;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.grpHdr.msgId")
    private String grpHdrMsgId;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.grpHdr.creDtTm")
    private java.util.Date creDtTm;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.orgnlGrpInfAndSts.orgnlMsgId")
    private String orgnlMsgId;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.orgnlGrpInfAndSts.orgnlMsgNmId")
    private String orgnlMsgNmId;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.orgnlGrpInfAndSts.stsRsnInf[0].addtlInf[0]")
    private String addtlInf;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].stsId")
    private String txInfAndStsStsId;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].orgnlEndToEndId")
    private String orgnlEndToEndId;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].orgnlTxId")
    private String orgnlTxId;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].stsRsnInf[0].rsn.prtry")
    private String rsnPrtry;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].orgnlTxRef.intrBkSttlmAmt.value")
    private Double intrBkSttlmAmtValue;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].orgnlTxRef.intrBkSttlmAmt.ccy")
    private String intrBkSttlmAmtCcy;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].orgnlTxRef.pmtTpInf.instrPrty")
    private String instrPrty;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].orgnlTxRef.pmtTpInf.ctgyPurp.prtry")
    private String ctgyPurpPrtry;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].orgnlTxRef.dbtr.nm")
    private String dbtrNm;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].orgnlTxRef.dbtrAcct.id.othr.id")
    private String dbtrAcctIdOthrId;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].orgnlTxRef.dbtrAcct.id.othr.issr")
    private String dbtrAcctIdOthrIssr;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].orgnlTxRef.dbtrAcct.tp.prtry")
    private String tpPrtry;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].orgnlTxRef.dbtrAgt.finInstnId.clrSysMmbId.mmbId")
    private String clrSysMmbIdMmbId;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].orgnlTxRef.dbtrAgt.brnchId.id")
    private String brnchIdId;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].orgnlTxRef.cdtrAgt.finInstnId.clrSysMmbId.mmbId")
    private String clrSysMmbIdMmbId1;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].orgnlTxRef.cdtrAgt.brnchId.id")
    private String brnchIdId1;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].orgnlTxRef.cdtrAgt.brnchId.pstlAdr.ctrySubDvsn")
    private String ctrySubDvsn;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].orgnlTxRef.cdtr.nm")
    private String cdtrNm;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].orgnlTxRef.cdtr.ctctDtls.emailAdr")
    private String emailAdr;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].orgnlTxRef.cdtrAcct.id.othr.id")
    private String cdtrAcctIdOthrId;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].orgnlTxRef.cdtrAcct.id.othr.issr")
    private String cdtrAcctIdOthrIssr;
    
    @JaxbMapping(objPath="fiToFIPmtStsRpt.txInfAndSts[0].orgnlTxRef.cdtrAcct.tp.prtry")
    private String tpPrtry1;
    
    @JaxbMapping(objPath="")
    private java.util.Date ts;
    
    
	
    /** default constructor */
    public Ibps10200101() {
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
  /**
   * Returns the grpHdrMsgId
   * 
   * @return the grpHdrMsgId
   */
    @Column(name = "GRPHDR_MSGID")
    public String getGrpHdrMsgId() {
        return grpHdrMsgId;
    }	 
     
  /**
   * Sets the grpHdrMsgId
   *
   * @param newGrpHdrMsgId the new grpHdrMsgId
   */

    public void  setGrpHdrMsgId(String newGrpHdrMsgId) {
        grpHdrMsgId = newGrpHdrMsgId;
    }	  
  /**
   * Returns the creDtTm
   * 
   * @return the creDtTm
   */
    @Column(name = "CREDTTM")
    public java.util.Date getCreDtTm() {
        return creDtTm;
    }	 
     
  /**
   * Sets the creDtTm
   *
   * @param newCreDtTm the new creDtTm
   */

    public void  setCreDtTm(java.util.Date newCreDtTm) {
        creDtTm = newCreDtTm;
    }	  
  /**
   * Returns the orgnlMsgId
   * 
   * @return the orgnlMsgId
   */
    @Column(name = "ORGNLMSGID")
    public String getOrgnlMsgId() {
        return orgnlMsgId;
    }	 
     
  /**
   * Sets the orgnlMsgId
   *
   * @param newOrgnlMsgId the new orgnlMsgId
   */

    public void  setOrgnlMsgId(String newOrgnlMsgId) {
        orgnlMsgId = newOrgnlMsgId;
    }	  
  /**
   * Returns the orgnlMsgNmId
   * 
   * @return the orgnlMsgNmId
   */
    @Column(name = "ORGNLMSGNMID")
    public String getOrgnlMsgNmId() {
        return orgnlMsgNmId;
    }	 
     
  /**
   * Sets the orgnlMsgNmId
   *
   * @param newOrgnlMsgNmId the new orgnlMsgNmId
   */

    public void  setOrgnlMsgNmId(String newOrgnlMsgNmId) {
        orgnlMsgNmId = newOrgnlMsgNmId;
    }	  
  /**
   * Returns the addtlInf
   * 
   * @return the addtlInf
   */
    @Column(name = "ADDTLINF")
    public String getAddtlInf() {
        return addtlInf;
    }	 
     
  /**
   * Sets the addtlInf
   *
   * @param newAddtlInf the new addtlInf
   */

    public void  setAddtlInf(String newAddtlInf) {
        addtlInf = newAddtlInf;
    }	  
  /**
   * Returns the txInfAndStsStsId
   * 
   * @return the txInfAndStsStsId
   */
    @Column(name = "TXINFANDSTS_STSID")
    public String getTxInfAndStsStsId() {
        return txInfAndStsStsId;
    }	 
     
  /**
   * Sets the txInfAndStsStsId
   *
   * @param newTxInfAndStsStsId the new txInfAndStsStsId
   */

    public void  setTxInfAndStsStsId(String newTxInfAndStsStsId) {
        txInfAndStsStsId = newTxInfAndStsStsId;
    }	  
  /**
   * Returns the orgnlEndToEndId
   * 
   * @return the orgnlEndToEndId
   */
    @Column(name = "ORGNLENDTOENDID")
    public String getOrgnlEndToEndId() {
        return orgnlEndToEndId;
    }	 
     
  /**
   * Sets the orgnlEndToEndId
   *
   * @param newOrgnlEndToEndId the new orgnlEndToEndId
   */

    public void  setOrgnlEndToEndId(String newOrgnlEndToEndId) {
        orgnlEndToEndId = newOrgnlEndToEndId;
    }	  
  /**
   * Returns the orgnlTxId
   * 
   * @return the orgnlTxId
   */
    @Column(name = "ORGNLTXID")
    public String getOrgnlTxId() {
        return orgnlTxId;
    }	 
     
  /**
   * Sets the orgnlTxId
   *
   * @param newOrgnlTxId the new orgnlTxId
   */

    public void  setOrgnlTxId(String newOrgnlTxId) {
        orgnlTxId = newOrgnlTxId;
    }	  
  /**
   * Returns the rsnPrtry
   * 
   * @return the rsnPrtry
   */
    @Column(name = "RSN_PRTRY")
    public String getRsnPrtry() {
        return rsnPrtry;
    }	 
     
  /**
   * Sets the rsnPrtry
   *
   * @param newRsnPrtry the new rsnPrtry
   */

    public void  setRsnPrtry(String newRsnPrtry) {
        rsnPrtry = newRsnPrtry;
    }	  
  /**
   * Returns the intrBkSttlmAmtValue
   * 
   * @return the intrBkSttlmAmtValue
   */
    @Column(name = "INTRBKSTTLMAMT_VALUE")
    public Double getIntrBkSttlmAmtValue() {
        return intrBkSttlmAmtValue;
    }	 
     
  /**
   * Sets the intrBkSttlmAmtValue
   *
   * @param newIntrBkSttlmAmtValue the new intrBkSttlmAmtValue
   */

    public void  setIntrBkSttlmAmtValue(Double newIntrBkSttlmAmtValue) {
        intrBkSttlmAmtValue = newIntrBkSttlmAmtValue;
    }	  
  /**
   * Returns the intrBkSttlmAmtCcy
   * 
   * @return the intrBkSttlmAmtCcy
   */
    @Column(name = "INTRBKSTTLMAMT_CCY")
    public String getIntrBkSttlmAmtCcy() {
        return intrBkSttlmAmtCcy;
    }	 
     
  /**
   * Sets the intrBkSttlmAmtCcy
   *
   * @param newIntrBkSttlmAmtCcy the new intrBkSttlmAmtCcy
   */

    public void  setIntrBkSttlmAmtCcy(String newIntrBkSttlmAmtCcy) {
        intrBkSttlmAmtCcy = newIntrBkSttlmAmtCcy;
    }	  
  /**
   * Returns the instrPrty
   * 
   * @return the instrPrty
   */
    @Column(name = "INSTRPRTY")
    public String getInstrPrty() {
        return instrPrty;
    }	 
     
  /**
   * Sets the instrPrty
   *
   * @param newInstrPrty the new instrPrty
   */

    public void  setInstrPrty(String newInstrPrty) {
        instrPrty = newInstrPrty;
    }	  
  /**
   * Returns the ctgyPurpPrtry
   * 
   * @return the ctgyPurpPrtry
   */
    @Column(name = "CTGYPURP_PRTRY")
    public String getCtgyPurpPrtry() {
        return ctgyPurpPrtry;
    }	 
     
  /**
   * Sets the ctgyPurpPrtry
   *
   * @param newCtgyPurpPrtry the new ctgyPurpPrtry
   */

    public void  setCtgyPurpPrtry(String newCtgyPurpPrtry) {
        ctgyPurpPrtry = newCtgyPurpPrtry;
    }	  
  /**
   * Returns the dbtrNm
   * 
   * @return the dbtrNm
   */
    @Column(name = "DBTR_NM")
    public String getDbtrNm() {
        return dbtrNm;
    }	 
     
  /**
   * Sets the dbtrNm
   *
   * @param newDbtrNm the new dbtrNm
   */

    public void  setDbtrNm(String newDbtrNm) {
        dbtrNm = newDbtrNm;
    }	  
  /**
   * Returns the dbtrAcctIdOthrId
   * 
   * @return the dbtrAcctIdOthrId
   */
    @Column(name = "DBTRACCT_ID_OTHR_ID")
    public String getDbtrAcctIdOthrId() {
        return dbtrAcctIdOthrId;
    }	 
     
  /**
   * Sets the dbtrAcctIdOthrId
   *
   * @param newDbtrAcctIdOthrId the new dbtrAcctIdOthrId
   */

    public void  setDbtrAcctIdOthrId(String newDbtrAcctIdOthrId) {
        dbtrAcctIdOthrId = newDbtrAcctIdOthrId;
    }	  
  /**
   * Returns the dbtrAcctIdOthrIssr
   * 
   * @return the dbtrAcctIdOthrIssr
   */
    @Column(name = "DBTRACCT_ID_OTHR_ISSR")
    public String getDbtrAcctIdOthrIssr() {
        return dbtrAcctIdOthrIssr;
    }	 
     
  /**
   * Sets the dbtrAcctIdOthrIssr
   *
   * @param newDbtrAcctIdOthrIssr the new dbtrAcctIdOthrIssr
   */

    public void  setDbtrAcctIdOthrIssr(String newDbtrAcctIdOthrIssr) {
        dbtrAcctIdOthrIssr = newDbtrAcctIdOthrIssr;
    }	  
  /**
   * Returns the tpPrtry
   * 
   * @return the tpPrtry
   */
    @Column(name = "TP_PRTRY")
    public String getTpPrtry() {
        return tpPrtry;
    }	 
     
  /**
   * Sets the tpPrtry
   *
   * @param newTpPrtry the new tpPrtry
   */

    public void  setTpPrtry(String newTpPrtry) {
        tpPrtry = newTpPrtry;
    }	  
  /**
   * Returns the clrSysMmbIdMmbId
   * 
   * @return the clrSysMmbIdMmbId
   */
    @Column(name = "CLRSYSMMBID_MMBID")
    public String getClrSysMmbIdMmbId() {
        return clrSysMmbIdMmbId;
    }	 
     
  /**
   * Sets the clrSysMmbIdMmbId
   *
   * @param newClrSysMmbIdMmbId the new clrSysMmbIdMmbId
   */

    public void  setClrSysMmbIdMmbId(String newClrSysMmbIdMmbId) {
        clrSysMmbIdMmbId = newClrSysMmbIdMmbId;
    }	  
  /**
   * Returns the brnchIdId
   * 
   * @return the brnchIdId
   */
    @Column(name = "BRNCHID_ID")
    public String getBrnchIdId() {
        return brnchIdId;
    }	 
     
  /**
   * Sets the brnchIdId
   *
   * @param newBrnchIdId the new brnchIdId
   */

    public void  setBrnchIdId(String newBrnchIdId) {
        brnchIdId = newBrnchIdId;
    }	  
  /**
   * Returns the clrSysMmbIdMmbId1
   * 
   * @return the clrSysMmbIdMmbId1
   */
    @Column(name = "CLRSYSMMBID_MMBID1")
    public String getClrSysMmbIdMmbId1() {
        return clrSysMmbIdMmbId1;
    }	 
     
  /**
   * Sets the clrSysMmbIdMmbId1
   *
   * @param newClrSysMmbIdMmbId1 the new clrSysMmbIdMmbId1
   */

    public void  setClrSysMmbIdMmbId1(String newClrSysMmbIdMmbId1) {
        clrSysMmbIdMmbId1 = newClrSysMmbIdMmbId1;
    }	  
  /**
   * Returns the brnchIdId1
   * 
   * @return the brnchIdId1
   */
    @Column(name = "BRNCHID_ID1")
    public String getBrnchIdId1() {
        return brnchIdId1;
    }	 
     
  /**
   * Sets the brnchIdId1
   *
   * @param newBrnchIdId1 the new brnchIdId1
   */

    public void  setBrnchIdId1(String newBrnchIdId1) {
        brnchIdId1 = newBrnchIdId1;
    }	  
  /**
   * Returns the ctrySubDvsn
   * 
   * @return the ctrySubDvsn
   */
    @Column(name = "CTRYSUBDVSN")
    public String getCtrySubDvsn() {
        return ctrySubDvsn;
    }	 
     
  /**
   * Sets the ctrySubDvsn
   *
   * @param newCtrySubDvsn the new ctrySubDvsn
   */

    public void  setCtrySubDvsn(String newCtrySubDvsn) {
        ctrySubDvsn = newCtrySubDvsn;
    }	  
  /**
   * Returns the cdtrNm
   * 
   * @return the cdtrNm
   */
    @Column(name = "CDTR_NM")
    public String getCdtrNm() {
        return cdtrNm;
    }	 
     
  /**
   * Sets the cdtrNm
   *
   * @param newCdtrNm the new cdtrNm
   */

    public void  setCdtrNm(String newCdtrNm) {
        cdtrNm = newCdtrNm;
    }	  
  /**
   * Returns the emailAdr
   * 
   * @return the emailAdr
   */
    @Column(name = "EMAILADR")
    public String getEmailAdr() {
        return emailAdr;
    }	 
     
  /**
   * Sets the emailAdr
   *
   * @param newEmailAdr the new emailAdr
   */

    public void  setEmailAdr(String newEmailAdr) {
        emailAdr = newEmailAdr;
    }	  
  /**
   * Returns the cdtrAcctIdOthrId
   * 
   * @return the cdtrAcctIdOthrId
   */
    @Column(name = "CDTRACCT_ID_OTHR_ID")
    public String getCdtrAcctIdOthrId() {
        return cdtrAcctIdOthrId;
    }	 
     
  /**
   * Sets the cdtrAcctIdOthrId
   *
   * @param newCdtrAcctIdOthrId the new cdtrAcctIdOthrId
   */

    public void  setCdtrAcctIdOthrId(String newCdtrAcctIdOthrId) {
        cdtrAcctIdOthrId = newCdtrAcctIdOthrId;
    }	  
  /**
   * Returns the cdtrAcctIdOthrIssr
   * 
   * @return the cdtrAcctIdOthrIssr
   */
    @Column(name = "CDTRACCT_ID_OTHR_ISSR")
    public String getCdtrAcctIdOthrIssr() {
        return cdtrAcctIdOthrIssr;
    }	 
     
  /**
   * Sets the cdtrAcctIdOthrIssr
   *
   * @param newCdtrAcctIdOthrIssr the new cdtrAcctIdOthrIssr
   */

    public void  setCdtrAcctIdOthrIssr(String newCdtrAcctIdOthrIssr) {
        cdtrAcctIdOthrIssr = newCdtrAcctIdOthrIssr;
    }	  
  /**
   * Returns the tpPrtry1
   * 
   * @return the tpPrtry1
   */
    @Column(name = "TP_PRTRY1")
    public String getTpPrtry1() {
        return tpPrtry1;
    }	 
     
  /**
   * Sets the tpPrtry1
   *
   * @param newTpPrtry1 the new tpPrtry1
   */

    public void  setTpPrtry1(String newTpPrtry1) {
        tpPrtry1 = newTpPrtry1;
    }	  
  /**
   * Returns the ts
   * 
   * @return the ts
   */
    @Column(name = "TS")
    public java.util.Date getTs() {
        return ts;
    }	 
     
  /**
   * Sets the ts
   *
   * @param newTs the new ts
   */

    public void  setTs(java.util.Date newTs) {
        ts = newTs;
    }	  
    
    
}    
    
