package com.topfinance.ebo.msg;

import com.topfinance.ebo.msg.JaxbMapping;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.SequenceGenerator;


/**
 * Saps73200101 generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_MSG_SAPS_732_001_01__")
public class Saps73200101  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.grpHdr.creDtTm")
    private Date creDtTm;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.grpHdr.instgPty.instgDrctPty")
    private String instgDrctPty;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.grpHdr.instgPty.instgPty")
    private String instgIndrctPty;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.grpHdr.instdPty.instdDrctPty")
    private String instdDrctPty;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.grpHdr.instdPty.instdPty")
    private String instdIndrctPty;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.grpHdr.sysCd")
    private String sysCd;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.grpHdr.rmk")
    private String rmk;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.prttn.ttlNb")
    private String ttlNb;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.prttn.ttlNb")
    private String startNb;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.prttn.endNb")
    private String endNb;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.orgnlGrpHdr.orgnlMsgId")
    private String orgnlMsgId;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.grpHdr.msgId")
    private String msgId;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.orgnlGrpHdr.orgnlInstgPty")
    private String orgnlInstgDrctPty;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.orgnlGrpHdr.orgnlMT")
    private String orgnlMT;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.npcPrcInf.prcSts")
    private String prcSts;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.npcPrcInf.prcCd")
    private String prcCd;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.npcPrcInf.rjctInf")
    private String rjctInf;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.npcPrcInf.netgDt")
    private Date netgDt;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.npcPrcInf.netgRnd")
    private String netgRnd;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.npcPrcInf.sttlmDt")
    private Date sttlmDt;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.npcPrcInf.rcvTm")
    private Date rcvTm;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.npcPrcInf.trnsmtTm")
    private Date trnsmtTm;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.acsAbsSttlmDtlRspnInf")
    private java.util.Set<Saps73200101AcsAbsSttlmDtlRspnInf> acsAbsSttlmDtlRspnInf;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.acsAbsSttlmDtlRspnInf.chckngDt")
    private Date chckngDt;
    
    
	
    /** default constructor */
    public Saps73200101() {
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
   * Returns the ttlNb
   * 
   * @return the ttlNb
   */
    @Column(name = "TTLNB")
    public String getTtlNb() {
        return ttlNb;
    }	 
     
  /**
   * Sets the ttlNb
   *
   * @param newTtlNb the new ttlNb
   */

    public void  setTtlNb(String newTtlNb) {
        ttlNb = newTtlNb;
    }	  
  /**
   * Returns the startNb
   * 
   * @return the startNb
   */
    @Column(name = "STARTNB")
    public String getStartNb() {
        return startNb;
    }	 
     
  /**
   * Sets the startNb
   *
   * @param newStartNb the new startNb
   */

    public void  setStartNb(String newStartNb) {
        startNb = newStartNb;
    }	  
  /**
   * Returns the endNb
   * 
   * @return the endNb
   */
    @Column(name = "ENDNB")
    public String getEndNb() {
        return endNb;
    }	 
     
  /**
   * Sets the endNb
   *
   * @param newEndNb the new endNb
   */

    public void  setEndNb(String newEndNb) {
        endNb = newEndNb;
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
   * Returns the orgnlInstgDrctPty
   * 
   * @return the orgnlInstgDrctPty
   */
    @Column(name = "ORGNLINSTGDRCTPTY")
    public String getOrgnlInstgDrctPty() {
        return orgnlInstgDrctPty;
    }	 
     
  /**
   * Sets the orgnlInstgDrctPty
   *
   * @param newOrgnlInstgDrctPty the new orgnlInstgDrctPty
   */

    public void  setOrgnlInstgDrctPty(String newOrgnlInstgDrctPty) {
        orgnlInstgDrctPty = newOrgnlInstgDrctPty;
    }	  
  /**
   * Returns the orgnlMT
   * 
   * @return the orgnlMT
   */
    @Column(name = "ORGNLMT")
    public String getOrgnlMT() {
        return orgnlMT;
    }	 
     
  /**
   * Sets the orgnlMT
   *
   * @param newOrgnlMT the new orgnlMT
   */

    public void  setOrgnlMT(String newOrgnlMT) {
        orgnlMT = newOrgnlMT;
    }	  
  /**
   * Returns the prcSts
   * 
   * @return the prcSts
   */
    @Column(name = "PRCSTS")
    public String getPrcSts() {
        return prcSts;
    }	 
     
  /**
   * Sets the prcSts
   *
   * @param newPrcSts the new prcSts
   */

    public void  setPrcSts(String newPrcSts) {
        prcSts = newPrcSts;
    }	  
  /**
   * Returns the prcCd
   * 
   * @return the prcCd
   */
    @Column(name = "PRCCD")
    public String getPrcCd() {
        return prcCd;
    }	 
     
  /**
   * Sets the prcCd
   *
   * @param newPrcCd the new prcCd
   */

    public void  setPrcCd(String newPrcCd) {
        prcCd = newPrcCd;
    }	  
  /**
   * Returns the rjctInf
   * 
   * @return the rjctInf
   */
    @Column(name = "RJCTINF")
    public String getRjctInf() {
        return rjctInf;
    }	 
     
  /**
   * Sets the rjctInf
   *
   * @param newRjctInf the new rjctInf
   */

    public void  setRjctInf(String newRjctInf) {
        rjctInf = newRjctInf;
    }	  
  /**
   * Returns the netgDt
   * 
   * @return the netgDt
   */
    @Column(name = "NETGDT")
    public Date getNetgDt() {
        return netgDt;
    }	 
     
  /**
   * Sets the netgDt
   *
   * @param newNetgDt the new netgDt
   */

    public void  setNetgDt(Date newNetgDt) {
        netgDt = newNetgDt;
    }	  
  /**
   * Returns the netgRnd
   * 
   * @return the netgRnd
   */
    @Column(name = "NETGRND")
    public String getNetgRnd() {
        return netgRnd;
    }	 
     
  /**
   * Sets the netgRnd
   *
   * @param newNetgRnd the new netgRnd
   */

    public void  setNetgRnd(String newNetgRnd) {
        netgRnd = newNetgRnd;
    }	  
  /**
   * Returns the sttlmDt
   * 
   * @return the sttlmDt
   */
    @Column(name = "STTLMDT")
    public Date getSttlmDt() {
        return sttlmDt;
    }	 
     
  /**
   * Sets the sttlmDt
   *
   * @param newSttlmDt the new sttlmDt
   */

    public void  setSttlmDt(Date newSttlmDt) {
        sttlmDt = newSttlmDt;
    }	  
  /**
   * Returns the rcvTm
   * 
   * @return the rcvTm
   */
    @Column(name = "RCVTM")
    public Date getRcvTm() {
        return rcvTm;
    }	 
     
  /**
   * Sets the rcvTm
   *
   * @param newRcvTm the new rcvTm
   */

    public void  setRcvTm(Date newRcvTm) {
        rcvTm = newRcvTm;
    }	  
  /**
   * Returns the trnsmtTm
   * 
   * @return the trnsmtTm
   */
    @Column(name = "TRNSMTTM")
    public Date getTrnsmtTm() {
        return trnsmtTm;
    }	 
     
  /**
   * Sets the trnsmtTm
   *
   * @param newTrnsmtTm the new trnsmtTm
   */

    public void  setTrnsmtTm(Date newTrnsmtTm) {
        trnsmtTm = newTrnsmtTm;
    }	  
  /**
   * Returns the acsAbsSttlmDtlRspnInf
   * 
   * @return the acsAbsSttlmDtlRspnInf
   */
  	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL, mappedBy = "parent")
    public java.util.Set<Saps73200101AcsAbsSttlmDtlRspnInf> getAcsAbsSttlmDtlRspnInf() {
        return acsAbsSttlmDtlRspnInf;
    }	 
     
  /**
   * Sets the acsAbsSttlmDtlRspnInf
   *
   * @param newAcsAbsSttlmDtlRspnInf the new acsAbsSttlmDtlRspnInf
   */

    public void  setAcsAbsSttlmDtlRspnInf(java.util.Set<Saps73200101AcsAbsSttlmDtlRspnInf> newAcsAbsSttlmDtlRspnInf) {
        acsAbsSttlmDtlRspnInf = newAcsAbsSttlmDtlRspnInf;
    }	  
  /**
   * Returns the chckngDt
   * 
   * @return the chckngDt
   */
    @Column(name = "CHCKNGDT")
    public Date getChckngDt() {
        return chckngDt;
    }	 
     
  /**
   * Sets the chckngDt
   *
   * @param newChckngDt the new chckngDt
   */

    public void  setChckngDt(Date newChckngDt) {
        chckngDt = newChckngDt;
    }	  
    
    
}    
    
