package com.topfinance.ebo.msg;

import com.topfinance.ebo.msg.JaxbMapping;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * Hvps14200101 generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_C2_HVPS_142")
public class Hvps14200101  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.grpHdr.msgId")
    private String msgId;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.grpHdr.creDtTm")
    private String creDtTm;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.grpHdr.instgPty.instgDrctPty")
    private String instgDrctPty;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.grpHdr.instgPty.instgPty")
    private String instgIndrctPty;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.grpHdr.instdPty.instdDrctPty")
    private String instdDrctPty;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.grpHdr.instdPty.instdPty")
    private String instdIndrctPty;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.grpHdr.sysCd")
    private String sysCd;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.grpHdr.rmk")
    private String rmk;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.imdtTrfNtfctnInf.dbtr.nm")
    private String dbtrNm;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.imdtTrfNtfctnInf.dbtrAcct.id.othr.id")
    private String dbtrAcctId;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.imdtTrfNtfctnInf.dbtrAcct.id.othr.issr")
    private String dbtrAcctIssr;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.imdtTrfNtfctnInf.dbtrAgt.fiId.clrSysMmbId.mmbId")
    private String dbtrClrSysMmbId;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.imdtTrfNtfctnInf.dbtrAgt.brnchId.id")
    private String dbtrAgtBrnchId;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.imdtTrfNtfctnInf.cdtrAgt.fiId.clrSysMmbId.mmbId")
    private String cdtrClrSysMmbId;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.imdtTrfNtfctnInf.cdtrAgt.brnchId.id")
    private String cdtrAgtBrnchId;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.imdtTrfNtfctnInf.cdtr.nm")
    private String cdtrNm;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.imdtTrfNtfctnInf.cdtrAcct.id.othr.id")
    private String cdtrAcctId;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.imdtTrfNtfctnInf.cdtrAcct.id.othr.issr")
    private String cdtrAcctIssr;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.imdtTrfNtfctnInf.amt")
    private Double intrBkSttlmAmt;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.imdtTrfNtfctnInf.pmtTpInf.ctgyPurp.prtry")
    private String prtryTpCd;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.imdtTrfNtfctnInf.purp.prtry")
    private String prtryTcCd;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.imdtTrfNtfctnInf.ntceTp")
    private String ntceTp;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.imdtTrfNtfctnInf.clrSysMmbId.mmbId")
    private String mmbId;
    
    @JaxbMapping(objPath="imdtTrfNtfctn.imdtTrfNtfctnInf.txBtch")
    private String txBtch;
    
    
	
    /** default constructor */
    public Hvps14200101() {
    }
	
	
  /**
   * Returns the id
   * 
   * @return the id
   */
    @Id
	  @Column(name = "ID", unique = true, nullable = false, precision = 22, scale = 0)
	  @SequenceGenerator(name = "CFG_SEQUNCE_GEN", sequenceName = "S_CFG_SEQUNCE")
	  @GeneratedValue(strategy = GenerationType.AUTO, generator = "CFG_SEQUNCE_GEN")
    public Integer getid() {
        return id;
    }	 
     
  /**
   * Sets the id
   *
   * @param newid the new id
   */

    public void  setid(Integer newid) {
        id = newid;
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
   * Returns the creDtTm
   * 
   * @return the creDtTm
   */
    @Column(name = "CREDTTM")
    public String getCreDtTm() {
        return creDtTm;
    }	 
     
  /**
   * Sets the creDtTm
   *
   * @param newCreDtTm the new creDtTm
   */

    public void  setCreDtTm(String newCreDtTm) {
        creDtTm = newCreDtTm;
    }	  
  /**
   * Returns the instgDrctPty
   * 
   * @return the instgDrctPty
   */
    @Column(name = "INSTGDRCTPTY")
    public String getInstgDrctPty() {
        return instgDrctPty;
    }	 
     
  /**
   * Sets the instgDrctPty
   *
   * @param newInstgDrctPty the new instgDrctPty
   */

    public void  setInstgDrctPty(String newInstgDrctPty) {
        instgDrctPty = newInstgDrctPty;
    }	  
  /**
   * Returns the instgIndrctPty
   * 
   * @return the instgIndrctPty
   */
    @Column(name = "INSTGINDRCTPTY")
    public String getInstgIndrctPty() {
        return instgIndrctPty;
    }	 
     
  /**
   * Sets the instgIndrctPty
   *
   * @param newInstgIndrctPty the new instgIndrctPty
   */

    public void  setInstgIndrctPty(String newInstgIndrctPty) {
        instgIndrctPty = newInstgIndrctPty;
    }	  
  /**
   * Returns the instdDrctPty
   * 
   * @return the instdDrctPty
   */
    @Column(name = "INSTDDRCTPTY")
    public String getInstdDrctPty() {
        return instdDrctPty;
    }	 
     
  /**
   * Sets the instdDrctPty
   *
   * @param newInstdDrctPty the new instdDrctPty
   */

    public void  setInstdDrctPty(String newInstdDrctPty) {
        instdDrctPty = newInstdDrctPty;
    }	  
  /**
   * Returns the instdIndrctPty
   * 
   * @return the instdIndrctPty
   */
    @Column(name = "INSTDINDRCTPTY")
    public String getInstdIndrctPty() {
        return instdIndrctPty;
    }	 
     
  /**
   * Sets the instdIndrctPty
   *
   * @param newInstdIndrctPty the new instdIndrctPty
   */

    public void  setInstdIndrctPty(String newInstdIndrctPty) {
        instdIndrctPty = newInstdIndrctPty;
    }	  
  /**
   * Returns the sysCd
   * 
   * @return the sysCd
   */
    @Column(name = "SYSCD")
    public String getSysCd() {
        return sysCd;
    }	 
     
  /**
   * Sets the sysCd
   *
   * @param newSysCd the new sysCd
   */

    public void  setSysCd(String newSysCd) {
        sysCd = newSysCd;
    }	  
  /**
   * Returns the rmk
   * 
   * @return the rmk
   */
    @Column(name = "RMK")
    public String getRmk() {
        return rmk;
    }	 
     
  /**
   * Sets the rmk
   *
   * @param newRmk the new rmk
   */

    public void  setRmk(String newRmk) {
        rmk = newRmk;
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
   * Returns the cdtrAcctIssr
   * 
   * @return the cdtrAcctIssr
   */
    @Column(name = "CDTRACCTISSR")
    public String getCdtrAcctIssr() {
        return cdtrAcctIssr;
    }	 
     
  /**
   * Sets the cdtrAcctIssr
   *
   * @param newCdtrAcctIssr the new cdtrAcctIssr
   */

    public void  setCdtrAcctIssr(String newCdtrAcctIssr) {
        cdtrAcctIssr = newCdtrAcctIssr;
    }	  
  /**
   * Returns the intrBkSttlmAmt
   * 
   * @return the intrBkSttlmAmt
   */
    @Column(name = "INTRBKSTTLMAMT")
    public Double getIntrBkSttlmAmt() {
        return intrBkSttlmAmt;
    }	 
     
  /**
   * Sets the intrBkSttlmAmt
   *
   * @param newIntrBkSttlmAmt the new intrBkSttlmAmt
   */

    public void  setIntrBkSttlmAmt(Double newIntrBkSttlmAmt) {
        intrBkSttlmAmt = newIntrBkSttlmAmt;
    }	  
  /**
   * Returns the prtryTpCd
   * 
   * @return the prtryTpCd
   */
    @Column(name = "PRTRYTPCD")
    public String getPrtryTpCd() {
        return prtryTpCd;
    }	 
     
  /**
   * Sets the prtryTpCd
   *
   * @param newPrtryTpCd the new prtryTpCd
   */

    public void  setPrtryTpCd(String newPrtryTpCd) {
        prtryTpCd = newPrtryTpCd;
    }	  
  /**
   * Returns the prtryTcCd
   * 
   * @return the prtryTcCd
   */
    @Column(name = "PRTRYTCCD")
    public String getPrtryTcCd() {
        return prtryTcCd;
    }	 
     
  /**
   * Sets the prtryTcCd
   *
   * @param newPrtryTcCd the new prtryTcCd
   */

    public void  setPrtryTcCd(String newPrtryTcCd) {
        prtryTcCd = newPrtryTcCd;
    }	  
  /**
   * Returns the ntceTp
   * 
   * @return the ntceTp
   */
    @Column(name = "NTCETP")
    public String getNtceTp() {
        return ntceTp;
    }	 
     
  /**
   * Sets the ntceTp
   *
   * @param newNtceTp the new ntceTp
   */

    public void  setNtceTp(String newNtceTp) {
        ntceTp = newNtceTp;
    }	  
  /**
   * Returns the mmbId
   * 
   * @return the mmbId
   */
    @Column(name = "MMBID")
    public String getMmbId() {
        return mmbId;
    }	 
     
  /**
   * Sets the mmbId
   *
   * @param newMmbId the new mmbId
   */

    public void  setMmbId(String newMmbId) {
        mmbId = newMmbId;
    }	  
  /**
   * Returns the txBtch
   * 
   * @return the txBtch
   */
    @Column(name = "TXBTCH")
    public String getTxBtch() {
        return txBtch;
    }	 
     
  /**
   * Sets the txBtch
   *
   * @param newTxBtch the new txBtch
   */

    public void  setTxBtch(String newTxBtch) {
        txBtch = newTxBtch;
    }	  
    
    
}    
    
