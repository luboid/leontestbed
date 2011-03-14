package com.topfinance.ebo.msg;

import com.topfinance.ebo.msg.JaxbMapping;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Hvps11100101A10002101 generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_MSG_HVPS_111_001_01_A100_02101")
public class Hvps11100101A10002101  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private String uuid;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].dbtrAcct.id.othr.id")
    private String dbtrAcctId;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].cdtrAcct.id.othr.id")
    private String cdtrAcctId;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].dbtrAgt.brnchId.id")
    private String dbtrAgtBrnchId;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].pmtId.endToEndId")
    private String endToEndId;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].pmtId.txId")
    private String txId;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.grpHdr.nbOfTxs")
    private String nbOfTxs;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].dbtrAgt.finInstnId.clrSysMmbId.mmbId")
    private String cdtrClrSysMmbId;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].sttlmPrty")
    private String sttlmPrty;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].purp.prtry")
    private String bizTcCd;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].pmtTpInf.ctgyPurp.prtry")
    private String bizTpCd;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].dbtr.nm")
    private String dbtrNm;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.grpHdr.msgId")
    private String msgId;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.grpHdr.sttlmInf.sttlmMtd")
    private String settlementMethod;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].cdtrAgt.brnchId.id")
    private String cdtrAgtBrnchId;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].chrgBr")
    private String chrgBr;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.grpHdr.creDtTm")
    private Date creDtTm;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].dbtrAgt.finInstnId.clrSysMmbId.mmbId")
    private String dbtrClrSysMmbId;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].dbtrAcct.id.othr.issr")
    private String dbtrAcctIssr;
    
    @JaxbMapping(objPath="fiToFICstmrCdtTrf.cdtTrfTxInf[0].cdtr.nm")
    private String cdtrNm;
    
    @JaxbMapping(objPath="")
    private java.util.Date ts;
    
    
	
    /** default constructor */
    public Hvps11100101A10002101() {
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
   * Returns the dbtrAcctId
   * 
   * @return the dbtrAcctId
   */
    @Column(name = "DBTRACCTID")
    public String getDbtrAcctId() {
        return dbtrAcctId;
    }	 
     
  /**
   * Sets the dbtrAcctId
   *
   * @param newDbtrAcctId the new dbtrAcctId
   */

    public void  setDbtrAcctId(String newDbtrAcctId) {
        dbtrAcctId = newDbtrAcctId;
    }	  
  /**
   * Returns the cdtrAcctId
   * 
   * @return the cdtrAcctId
   */
    @Column(name = "CDTRACCTID")
    public String getCdtrAcctId() {
        return cdtrAcctId;
    }	 
     
  /**
   * Sets the cdtrAcctId
   *
   * @param newCdtrAcctId the new cdtrAcctId
   */

    public void  setCdtrAcctId(String newCdtrAcctId) {
        cdtrAcctId = newCdtrAcctId;
    }	  
  /**
   * Returns the dbtrAgtBrnchId
   * 
   * @return the dbtrAgtBrnchId
   */
    @Column(name = "DBTRAGTBRNCHID")
    public String getDbtrAgtBrnchId() {
        return dbtrAgtBrnchId;
    }	 
     
  /**
   * Sets the dbtrAgtBrnchId
   *
   * @param newDbtrAgtBrnchId the new dbtrAgtBrnchId
   */

    public void  setDbtrAgtBrnchId(String newDbtrAgtBrnchId) {
        dbtrAgtBrnchId = newDbtrAgtBrnchId;
    }	  
  /**
   * Returns the endToEndId
   * 
   * @return the endToEndId
   */
    @Column(name = "ENDTOENDID")
    public String getEndToEndId() {
        return endToEndId;
    }	 
     
  /**
   * Sets the endToEndId
   *
   * @param newEndToEndId the new endToEndId
   */

    public void  setEndToEndId(String newEndToEndId) {
        endToEndId = newEndToEndId;
    }	  
  /**
   * Returns the txId
   * 
   * @return the txId
   */
    @Column(name = "TXID")
    public String getTxId() {
        return txId;
    }	 
     
  /**
   * Sets the txId
   *
   * @param newTxId the new txId
   */

    public void  setTxId(String newTxId) {
        txId = newTxId;
    }	  
  /**
   * Returns the nbOfTxs
   * 
   * @return the nbOfTxs
   */
    @Column(name = "NBOFTXS")
    public String getNbOfTxs() {
        return nbOfTxs;
    }	 
     
  /**
   * Sets the nbOfTxs
   *
   * @param newNbOfTxs the new nbOfTxs
   */

    public void  setNbOfTxs(String newNbOfTxs) {
        nbOfTxs = newNbOfTxs;
    }	  
  /**
   * Returns the cdtrClrSysMmbId
   * 
   * @return the cdtrClrSysMmbId
   */
    @Column(name = "CDTRCLRSYSMMBID")
    public String getCdtrClrSysMmbId() {
        return cdtrClrSysMmbId;
    }	 
     
  /**
   * Sets the cdtrClrSysMmbId
   *
   * @param newCdtrClrSysMmbId the new cdtrClrSysMmbId
   */

    public void  setCdtrClrSysMmbId(String newCdtrClrSysMmbId) {
        cdtrClrSysMmbId = newCdtrClrSysMmbId;
    }	  
  /**
   * Returns the sttlmPrty
   * 
   * @return the sttlmPrty
   */
    @Column(name = "STTLMPRTY")
    public String getSttlmPrty() {
        return sttlmPrty;
    }	 
     
  /**
   * Sets the sttlmPrty
   *
   * @param newSttlmPrty the new sttlmPrty
   */

    public void  setSttlmPrty(String newSttlmPrty) {
        sttlmPrty = newSttlmPrty;
    }	  
  /**
   * Returns the bizTcCd
   * 
   * @return the bizTcCd
   */
    @Column(name = "BIZTCCD")
    public String getBizTcCd() {
        return bizTcCd;
    }	 
     
  /**
   * Sets the bizTcCd
   *
   * @param newBizTcCd the new bizTcCd
   */

    public void  setBizTcCd(String newBizTcCd) {
        bizTcCd = newBizTcCd;
    }	  
  /**
   * Returns the bizTpCd
   * 
   * @return the bizTpCd
   */
    @Column(name = "BIZTPCD")
    public String getBizTpCd() {
        return bizTpCd;
    }	 
     
  /**
   * Sets the bizTpCd
   *
   * @param newBizTpCd the new bizTpCd
   */

    public void  setBizTpCd(String newBizTpCd) {
        bizTpCd = newBizTpCd;
    }	  
  /**
   * Returns the dbtrNm
   * 
   * @return the dbtrNm
   */
    @Column(name = "DBTRNM")
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
   * Returns the msgId
   * 
   * @return the msgId
   */
    @Column(name = "MSGID")
    public String getMsgId() {
        return msgId;
    }	 
     
  /**
   * Sets the msgId
   *
   * @param newMsgId the new msgId
   */

    public void  setMsgId(String newMsgId) {
        msgId = newMsgId;
    }	  
  /**
   * Returns the settlementMethod
   * 
   * @return the settlementMethod
   */
    @Column(name = "SETTLEMENTMETHOD")
    public String getSettlementMethod() {
        return settlementMethod;
    }	 
     
  /**
   * Sets the settlementMethod
   *
   * @param newSettlementMethod the new settlementMethod
   */

    public void  setSettlementMethod(String newSettlementMethod) {
        settlementMethod = newSettlementMethod;
    }	  
  /**
   * Returns the cdtrAgtBrnchId
   * 
   * @return the cdtrAgtBrnchId
   */
    @Column(name = "CDTRAGTBRNCHID")
    public String getCdtrAgtBrnchId() {
        return cdtrAgtBrnchId;
    }	 
     
  /**
   * Sets the cdtrAgtBrnchId
   *
   * @param newCdtrAgtBrnchId the new cdtrAgtBrnchId
   */

    public void  setCdtrAgtBrnchId(String newCdtrAgtBrnchId) {
        cdtrAgtBrnchId = newCdtrAgtBrnchId;
    }	  
  /**
   * Returns the chrgBr
   * 
   * @return the chrgBr
   */
    @Column(name = "CHRGBR")
    public String getChrgBr() {
        return chrgBr;
    }	 
     
  /**
   * Sets the chrgBr
   *
   * @param newChrgBr the new chrgBr
   */

    public void  setChrgBr(String newChrgBr) {
        chrgBr = newChrgBr;
    }	  
  /**
   * Returns the creDtTm
   * 
   * @return the creDtTm
   */
    @Column(name = "CREDTTM")
    public Date getCreDtTm() {
        return creDtTm;
    }	 
     
  /**
   * Sets the creDtTm
   *
   * @param newCreDtTm the new creDtTm
   */

    public void  setCreDtTm(Date newCreDtTm) {
        creDtTm = newCreDtTm;
    }	  
  /**
   * Returns the dbtrClrSysMmbId
   * 
   * @return the dbtrClrSysMmbId
   */
    @Column(name = "DBTRCLRSYSMMBID")
    public String getDbtrClrSysMmbId() {
        return dbtrClrSysMmbId;
    }	 
     
  /**
   * Sets the dbtrClrSysMmbId
   *
   * @param newDbtrClrSysMmbId the new dbtrClrSysMmbId
   */

    public void  setDbtrClrSysMmbId(String newDbtrClrSysMmbId) {
        dbtrClrSysMmbId = newDbtrClrSysMmbId;
    }	  
  /**
   * Returns the dbtrAcctIssr
   * 
   * @return the dbtrAcctIssr
   */
    @Column(name = "DBTRACCTISSR")
    public String getDbtrAcctIssr() {
        return dbtrAcctIssr;
    }	 
     
  /**
   * Sets the dbtrAcctIssr
   *
   * @param newDbtrAcctIssr the new dbtrAcctIssr
   */

    public void  setDbtrAcctIssr(String newDbtrAcctIssr) {
        dbtrAcctIssr = newDbtrAcctIssr;
    }	  
  /**
   * Returns the cdtrNm
   * 
   * @return the cdtrNm
   */
    @Column(name = "CDTRNM")
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
    
