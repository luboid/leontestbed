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
 * Ccms31700101 generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_C2_CCMS_317")
public class Ccms31700101  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="rtrTx.msgId.id")
    private String msgId;
    
    @JaxbMapping(objPath="rtrTx.bizQryRef.qryRef")
    private String orgnlMsgId;
    
    @JaxbMapping(objPath="rtrTx.bizQryRef.qryNm")
    private String orgnlInstgDrctPty;
    
    @JaxbMapping(objPath="rtrTx.bizRpt.txRpt.instrRef.pmtInstrRef")
    private String pmtInstrRef;
    
    @JaxbMapping(objPath="rtrTx.bizRpt.txRpt.tx.pmtFr.acctId.dmstAcct.id")
    private String frmOrgnlInstgDrctPty;
    
    @JaxbMapping(objPath="rtrTx.bizRpt.txRpt.tx.pmt.txRef")
    private String frmOrgnlMsgId;
    
    @JaxbMapping(objPath="rtrTx.bizRpt.txRpt.tx.pmt.trfValDt.dt")
    private Date sttlmDt;
    
    @JaxbMapping(objPath="rtrTx.bizRpt.txRpt.tx.pmt.instrSts.pmtInstrSts.prtrySts")
    private String prcSts;
    
    @JaxbMapping(objPath="rtrTx.bizRpt.txRpt.tx.pmt.instrSts.pmtInstrStsRsn[0].prtryRjctnRsn.prtryStsRsn")
    private String prtryStsRsn;
    
    @JaxbMapping(objPath="rtrTx.bizRpt.txRpt.tx.pmt.instrSts.pmtInstrStsRsn[0].prtryRjctnRsn.rsn")
    private String rjctInf;
    
    @JaxbMapping(objPath="rtrTx.bizRpt.txRpt.tx.pmt.prty.prtryCd")
    private String netgRnd;
    
    @JaxbMapping(objPath="rtrTx.bizRpt.txRpt.tx.pmt.prcgVldtyTm.dtTmRg.frDtTm")
    private Date rcvTm;
    
    @JaxbMapping(objPath="rtrTx.bizRpt.txRpt.tx.pmt.prcgVldtyTm.dtTmRg.toDtTm")
    private Date trnsmtTm;
    
    @JaxbMapping(objPath="rtrTx.bizRpt.txRpt.tx.pmt.intrBkValDt")
    private Date intrBkValDt;
    
    @JaxbMapping(objPath="rtrTx.oprlErr.err.prtry")
    private String prtry;
    
    @JaxbMapping(objPath="rtrTx.oprlErr.desc")
    private String desc;
    
    
	
    /** default constructor */
    public Ccms31700101() {
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
   * Returns the pmtInstrRef
   * 
   * @return the pmtInstrRef
   */
    @Column(name = "PMTINSTRREF")
    public String getPmtInstrRef() {
        return pmtInstrRef;
    }	 
     
  /**
   * Sets the pmtInstrRef
   *
   * @param newPmtInstrRef the new pmtInstrRef
   */

    public void  setPmtInstrRef(String newPmtInstrRef) {
        pmtInstrRef = newPmtInstrRef;
    }	  
  /**
   * Returns the frmOrgnlInstgDrctPty
   * 
   * @return the frmOrgnlInstgDrctPty
   */
    @Column(name = "FRMORGNLINSTGDRCTPTY")
    public String getFrmOrgnlInstgDrctPty() {
        return frmOrgnlInstgDrctPty;
    }	 
     
  /**
   * Sets the frmOrgnlInstgDrctPty
   *
   * @param newFrmOrgnlInstgDrctPty the new frmOrgnlInstgDrctPty
   */

    public void  setFrmOrgnlInstgDrctPty(String newFrmOrgnlInstgDrctPty) {
        frmOrgnlInstgDrctPty = newFrmOrgnlInstgDrctPty;
    }	  
  /**
   * Returns the frmOrgnlMsgId
   * 
   * @return the frmOrgnlMsgId
   */
    @Column(name = "FRMORGNLMSGID")
    public String getFrmOrgnlMsgId() {
        return frmOrgnlMsgId;
    }	 
     
  /**
   * Sets the frmOrgnlMsgId
   *
   * @param newFrmOrgnlMsgId the new frmOrgnlMsgId
   */

    public void  setFrmOrgnlMsgId(String newFrmOrgnlMsgId) {
        frmOrgnlMsgId = newFrmOrgnlMsgId;
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
   * Returns the prtryStsRsn
   * 
   * @return the prtryStsRsn
   */
    @Column(name = "PRTRYSTSRSN")
    public String getPrtryStsRsn() {
        return prtryStsRsn;
    }	 
     
  /**
   * Sets the prtryStsRsn
   *
   * @param newPrtryStsRsn the new prtryStsRsn
   */

    public void  setPrtryStsRsn(String newPrtryStsRsn) {
        prtryStsRsn = newPrtryStsRsn;
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
   * Returns the intrBkValDt
   * 
   * @return the intrBkValDt
   */
    @Column(name = "INTRBKVALDT")
    public Date getIntrBkValDt() {
        return intrBkValDt;
    }	 
     
  /**
   * Sets the intrBkValDt
   *
   * @param newIntrBkValDt the new intrBkValDt
   */

    public void  setIntrBkValDt(Date newIntrBkValDt) {
        intrBkValDt = newIntrBkValDt;
    }	  
  /**
   * Returns the prtry
   * 
   * @return the prtry
   */
    @Column(name = "PRTRY")
    public String getPrtry() {
        return prtry;
    }	 
     
  /**
   * Sets the prtry
   *
   * @param newPrtry the new prtry
   */

    public void  setPrtry(String newPrtry) {
        prtry = newPrtry;
    }	  
  /**
   * Returns the desc
   * 
   * @return the desc
   */
    @Column(name = "DESC")
    public String getDesc() {
        return desc;
    }	 
     
  /**
   * Sets the desc
   *
   * @param newDesc the new desc
   */

    public void  setDesc(String newDesc) {
        desc = newDesc;
    }	  
    
    
}    
    
