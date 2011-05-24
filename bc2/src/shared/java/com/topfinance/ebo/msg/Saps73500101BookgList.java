package com.topfinance.ebo.msg;

import com.topfinance.ebo.msg.JaxbMapping;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.SequenceGenerator;


/**
 * Saps73500101BookgList generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_C2_SAPS_735_DETAIL")
public class Saps73500101BookgList  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="acctgDtlDwnLd.acctgDtlDwnLdInf.acctList[0].bookgList[0].msgCd")
    private String msgCd;
    
    @JaxbMapping(objPath="acctgDtlDwnLd.acctgDtlDwnLdInf.acctList[0].bookgList[0].instgPty")
    private String instgPty;
    
    @JaxbMapping(objPath="acctgDtlDwnLd.acctgDtlDwnLdInf.acctList[0].bookgList[0].netgDt")
    private Date netgDt;
    
    @JaxbMapping(objPath="acctgDtlDwnLd.acctgDtlDwnLdInf.acctList[0].bookgList[0].msgId")
    private String msgId;
    
    @JaxbMapping(objPath="acctgDtlDwnLd.acctgDtlDwnLdInf.acctList[0].bookgList[0].txTp")
    private String txTp;
    
    @JaxbMapping(objPath="acctgDtlDwnLd.acctgDtlDwnLdInf.acctList[0].bookgList[0].ctgyPurpCd")
    private String ctgyPurpCd;
    
    @JaxbMapping(objPath="acctgDtlDwnLd.acctgDtlDwnLdInf.acctList[0].bookgList[0].dbtr")
    private String dbtr;
    
    @JaxbMapping(objPath="acctgDtlDwnLd.acctgDtlDwnLdInf.acctList[0].bookgList[0].cdtr")
    private String cdtr;
    
    @JaxbMapping(objPath="acctgDtlDwnLd.acctgDtlDwnLdInf.acctList[0].bookgList[0].dbtCdtId")
    private String dbtCdtId;
    
    @JaxbMapping(objPath="acctgDtlDwnLd.acctgDtlDwnLdInf.acctList[0].bookgList[0].amt.value")
    private Double amt;
    
    @JaxbMapping(objPath="acctgDtlDwnLd.acctgDtlDwnLdInf.acctList[0].bookgList[0].plusMnsTp")
    private String plusMnsTp;
    
    private Saps73500101AcctList fid;
    
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="FID", nullable=false, updatable=false)
    public Saps73500101AcctList getFid() {
		return fid;
	}


	public void setFid(Saps73500101AcctList fid) {
		this.fid = fid;
	}
    
    
	
    /** default constructor */
    public Saps73500101BookgList() {
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
   * Returns the msgCd
   * 
   * @return the msgCd
   */
    @Column(name = "MSGCD")
    public String getMsgCd() {
        return msgCd;
    }	 
     
  /**
   * Sets the msgCd
   *
   * @param newMsgCd the new msgCd
   */

    public void  setMsgCd(String newMsgCd) {
        msgCd = newMsgCd;
    }	  
  /**
   * Returns the instgPty
   * 
   * @return the instgPty
   */
    @Column(name = "INSTGPTY")
    public String getInstgPty() {
        return instgPty;
    }	 
     
  /**
   * Sets the instgPty
   *
   * @param newInstgPty the new instgPty
   */

    public void  setInstgPty(String newInstgPty) {
        instgPty = newInstgPty;
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
   * Returns the txTp
   * 
   * @return the txTp
   */
    @Column(name = "TXTP")
    public String getTxTp() {
        return txTp;
    }	 
     
  /**
   * Sets the txTp
   *
   * @param newTxTp the new txTp
   */

    public void  setTxTp(String newTxTp) {
        txTp = newTxTp;
    }	  
  /**
   * Returns the ctgyPurpCd
   * 
   * @return the ctgyPurpCd
   */
    @Column(name = "CTGYPURPCD")
    public String getCtgyPurpCd() {
        return ctgyPurpCd;
    }	 
     
  /**
   * Sets the ctgyPurpCd
   *
   * @param newCtgyPurpCd the new ctgyPurpCd
   */

    public void  setCtgyPurpCd(String newCtgyPurpCd) {
        ctgyPurpCd = newCtgyPurpCd;
    }	  
  /**
   * Returns the dbtr
   * 
   * @return the dbtr
   */
    @Column(name = "DBTR")
    public String getDbtr() {
        return dbtr;
    }	 
     
  /**
   * Sets the dbtr
   *
   * @param newDbtr the new dbtr
   */

    public void  setDbtr(String newDbtr) {
        dbtr = newDbtr;
    }	  
  /**
   * Returns the cdtr
   * 
   * @return the cdtr
   */
    @Column(name = "CDTR")
    public String getCdtr() {
        return cdtr;
    }	 
     
  /**
   * Sets the cdtr
   *
   * @param newCdtr the new cdtr
   */

    public void  setCdtr(String newCdtr) {
        cdtr = newCdtr;
    }	  
  /**
   * Returns the dbtCdtId
   * 
   * @return the dbtCdtId
   */
    @Column(name = "DBTCDTID")
    public String getDbtCdtId() {
        return dbtCdtId;
    }	 
     
  /**
   * Sets the dbtCdtId
   *
   * @param newDbtCdtId the new dbtCdtId
   */

    public void  setDbtCdtId(String newDbtCdtId) {
        dbtCdtId = newDbtCdtId;
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
   * Returns the plusMnsTp
   * 
   * @return the plusMnsTp
   */
    @Column(name = "PLUSMNSTP")
    public String getPlusMnsTp() {
        return plusMnsTp;
    }	 
     
  /**
   * Sets the plusMnsTp
   *
   * @param newPlusMnsTp the new plusMnsTp
   */

    public void  setPlusMnsTp(String newPlusMnsTp) {
        plusMnsTp = newPlusMnsTp;
    }	  
    
    
}    
    
