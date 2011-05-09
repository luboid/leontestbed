package com.topfinance.ebo.msg;

import com.topfinance.ebo.msg.JaxbMapping;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.SequenceGenerator;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Hvps15100101 generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_C2_HVPS_151")
public class Hvps15100101  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="clrBkDrftAppl.grpHdr.msgId")
    private String msgId;
    
    @JaxbMapping(objPath="clrBkDrftAppl.grpHdr.msgId")
    private String creDtTm;
    
    @JaxbMapping(objPath="clrBkDrftAppl.grpHdr.instgPty.instgDrctPty")
    private String instgDrctPty;
    
    @JaxbMapping(objPath="clrBkDrftAppl.grpHdr.instgPty.instgPty")
    private String instgIndrctPty;
    
    @JaxbMapping(objPath="clrBkDrftAppl.grpHdr.instdPty.instdDrctPty")
    private String instdDrctPty;
    
    @JaxbMapping(objPath="clrBkDrftAppl.grpHdr.instdPty.instdPty")
    private String instdIndrctPty;
    
    @JaxbMapping(objPath="clrBkDrftAppl.grpHdr.sysCd")
    private String sysCd;
    
    @JaxbMapping(objPath="clrBkDrftAppl.grpHdr.rmk")
    private String rmk;
    
    @JaxbMapping(objPath="clrBkDrftAppl.clrBkDrftApplInf.drftInf.dt")
    private String dt;
    
    @JaxbMapping(objPath="clrBkDrftAppl.clrBkDrftApplInf.drftInf.nb")
    private String nb;
    
    @JaxbMapping(objPath="clrBkDrftAppl.clrBkDrftApplInf.drftInf.tstCd")
    private String tstCd;
    
    @JaxbMapping(objPath="clrBkDrftAppl.clrBkDrftApplInf.drftInf.tp")
    private String tp;
    
    @JaxbMapping(objPath="clrBkDrftAppl.clrBkDrftApplInf.drftInf.amt")
    private Double amt;
    
    @JaxbMapping(objPath="clrBkDrftAppl.clrBkDrftApplInf.drftInf.issrBk")
    private String issrBk;
    
    @JaxbMapping(objPath="clrBkDrftAppl.clrBkDrftApplInf.drftInf.issrAcct")
    private String issrAcct;
    
    @JaxbMapping(objPath="clrBkDrftAppl.clrBkDrftApplInf.drftInf.issrNm")
    private String issrNm;
    
    @JaxbMapping(objPath="clrBkDrftAppl.clrBkDrftApplInf.drftInf.rcvrNm")
    private String rcvrNm;
    
    @JaxbMapping(objPath="clrBkDrftAppl.clrBkDrftApplInf.drftInf.hldrBk")
    private String hldrBk;
    
    @JaxbMapping(objPath="clrBkDrftAppl.clrBkDrftApplInf.drftInf.hldrAcct")
    private String hldrAcct;
    
    @JaxbMapping(objPath="clrBkDrftAppl.clrBkDrftApplInf.drftInf.hldrNm")
    private String hldrNm;
    
    @JaxbMapping(objPath="clrBkDrftAppl.clrBkDrftApplInf.rmngAmt")
    private Double rmngAmt;
    
    @JaxbMapping(objPath="clrBkDrftAppl.clrBkDrftApplInf.actlSttlmAmt")
    private Double actlSttlmAmt;
    
    @JaxbMapping(objPath="clrBkDrftAppl.clrBkDrftApplInf.rmndDtPmt")
    private String rmndDtPmt;
    
    
	
    /** default constructor */
    public Hvps15100101() {
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
   * Returns the dt
   * 
   * @return the dt
   */
    @Column(name = "DT")
    public String getDt() {
        return dt;
    }	 
     
  /**
   * Sets the dt
   *
   * @param newDt the new dt
   */

    public void  setDt(String newDt) {
        dt = newDt;
    }	  
  /**
   * Returns the nb
   * 
   * @return the nb
   */
    @Column(name = "NB")
    public String getNb() {
        return nb;
    }	 
     
  /**
   * Sets the nb
   *
   * @param newNb the new nb
   */

    public void  setNb(String newNb) {
        nb = newNb;
    }	  
  /**
   * Returns the tstCd
   * 
   * @return the tstCd
   */
    @Column(name = "TSTCD")
    public String getTstCd() {
        return tstCd;
    }	 
     
  /**
   * Sets the tstCd
   *
   * @param newTstCd the new tstCd
   */

    public void  setTstCd(String newTstCd) {
        tstCd = newTstCd;
    }	  
  /**
   * Returns the tp
   * 
   * @return the tp
   */
    @Column(name = "TP")
    public String getTp() {
        return tp;
    }	 
     
  /**
   * Sets the tp
   *
   * @param newTp the new tp
   */

    public void  setTp(String newTp) {
        tp = newTp;
    }	  
  /**
   * Returns the amt
   * 
   * @return the amt
   */
    @Column(name = "AMT")
    public Double getAmt() {
        return amt;
    }	 
     
  /**
   * Sets the amt
   *
   * @param newAmt the new amt
   */

    public void  setAmt(Double newAmt) {
        amt = newAmt;
    }	  
  /**
   * Returns the issrBk
   * 
   * @return the issrBk
   */
    @Column(name = "ISSRBK")
    public String getIssrBk() {
        return issrBk;
    }	 
     
  /**
   * Sets the issrBk
   *
   * @param newIssrBk the new issrBk
   */

    public void  setIssrBk(String newIssrBk) {
        issrBk = newIssrBk;
    }	  
  /**
   * Returns the issrAcct
   * 
   * @return the issrAcct
   */
    @Column(name = "ISSRACCT")
    public String getIssrAcct() {
        return issrAcct;
    }	 
     
  /**
   * Sets the issrAcct
   *
   * @param newIssrAcct the new issrAcct
   */

    public void  setIssrAcct(String newIssrAcct) {
        issrAcct = newIssrAcct;
    }	  
  /**
   * Returns the issrNm
   * 
   * @return the issrNm
   */
    @Column(name = "ISSRNM")
    public String getIssrNm() {
        return issrNm;
    }	 
     
  /**
   * Sets the issrNm
   *
   * @param newIssrNm the new issrNm
   */

    public void  setIssrNm(String newIssrNm) {
        issrNm = newIssrNm;
    }	  
  /**
   * Returns the rcvrNm
   * 
   * @return the rcvrNm
   */
    @Column(name = "RCVRNM")
    public String getRcvrNm() {
        return rcvrNm;
    }	 
     
  /**
   * Sets the rcvrNm
   *
   * @param newRcvrNm the new rcvrNm
   */

    public void  setRcvrNm(String newRcvrNm) {
        rcvrNm = newRcvrNm;
    }	  
  /**
   * Returns the hldrBk
   * 
   * @return the hldrBk
   */
    @Column(name = "HLDRBK")
    public String getHldrBk() {
        return hldrBk;
    }	 
     
  /**
   * Sets the hldrBk
   *
   * @param newHldrBk the new hldrBk
   */

    public void  setHldrBk(String newHldrBk) {
        hldrBk = newHldrBk;
    }	  
  /**
   * Returns the hldrAcct
   * 
   * @return the hldrAcct
   */
    @Column(name = "HLDRACCT")
    public String getHldrAcct() {
        return hldrAcct;
    }	 
     
  /**
   * Sets the hldrAcct
   *
   * @param newHldrAcct the new hldrAcct
   */

    public void  setHldrAcct(String newHldrAcct) {
        hldrAcct = newHldrAcct;
    }	  
  /**
   * Returns the hldrNm
   * 
   * @return the hldrNm
   */
    @Column(name = "HLDRNM")
    public String getHldrNm() {
        return hldrNm;
    }	 
     
  /**
   * Sets the hldrNm
   *
   * @param newHldrNm the new hldrNm
   */

    public void  setHldrNm(String newHldrNm) {
        hldrNm = newHldrNm;
    }	  
  /**
   * Returns the rmngAmt
   * 
   * @return the rmngAmt
   */
    @Column(name = "RMNGAMT")
    public Double getRmngAmt() {
        return rmngAmt;
    }	 
     
  /**
   * Sets the rmngAmt
   *
   * @param newRmngAmt the new rmngAmt
   */

    public void  setRmngAmt(Double newRmngAmt) {
        rmngAmt = newRmngAmt;
    }	  
  /**
   * Returns the actlSttlmAmt
   * 
   * @return the actlSttlmAmt
   */
    @Column(name = "ACTLSTTLMAMT")
    public Double getActlSttlmAmt() {
        return actlSttlmAmt;
    }	 
     
  /**
   * Sets the actlSttlmAmt
   *
   * @param newActlSttlmAmt the new actlSttlmAmt
   */

    public void  setActlSttlmAmt(Double newActlSttlmAmt) {
        actlSttlmAmt = newActlSttlmAmt;
    }	  
  /**
   * Returns the rmndDtPmt
   * 
   * @return the rmndDtPmt
   */
    @Column(name = "RMNDDTPMT")
    public String getRmndDtPmt() {
        return rmndDtPmt;
    }	 
     
  /**
   * Sets the rmndDtPmt
   *
   * @param newRmndDtPmt the new rmndDtPmt
   */

    public void  setRmndDtPmt(String newRmndDtPmt) {
        rmndDtPmt = newRmndDtPmt;
    }	  
    
    
}    
    
