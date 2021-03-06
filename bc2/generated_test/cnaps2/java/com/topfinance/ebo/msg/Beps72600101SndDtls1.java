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
 * Beps72600101SndDtls1 generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_MSG_BEPS_726_001_01___SndDtls1")
public class Beps72600101SndDtls1  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="acctChck.acctChckInf.chckInfDtls1[0].sndDtls1[0].orgnlGrpHdr.orgnlMsgId")
    private String bizCheckSenOrgnlMsgId;
    
    @JaxbMapping(objPath="acctChck.acctChckInf.chckInfDtls1[0].sndDtls1[0].orgnlGrpHdr.orgnlInstgPty")
    private String bizCheckSenOrgnlInstgDrctPty;
    
    @JaxbMapping(objPath="acctChck.acctChckInf.chckInfDtls1[0].sndDtls1[0].orgnlGrpHdr.orgnlMsgTp")
    private String bizCheckSenOrgnlMT;
    
    @JaxbMapping(objPath="acctChck.acctChckInf.chckInfDtls1[0].sndDtls1[0].ttlCnt")
    private String bizCheckSenTtlCnt;
    
    @JaxbMapping(objPath="acctChck.acctChckInf.chckInfDtls1[0].sndDtls1[0].ctrlSum.value")
    private Double bizCheckSenCtrlSum;
    
    @JaxbMapping(objPath="acctChck.acctChckInf.chckInfDtls1[0].sndDtls1[0].prcSts")
    private String bizCheckSenPrcSts;
    
    
	
    /** default constructor */
    public Beps72600101SndDtls1() {
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
   * Returns the bizCheckSenOrgnlMsgId
   * 
   * @return the bizCheckSenOrgnlMsgId
   */
    @Column(name = "BIZCHECKSENORGNLMSGID")
    public String getBizCheckSenOrgnlMsgId() {
        return bizCheckSenOrgnlMsgId;
    }	 
     
  /**
   * Sets the bizCheckSenOrgnlMsgId
   *
   * @param newBizCheckSenOrgnlMsgId the new bizCheckSenOrgnlMsgId
   */

    public void  setBizCheckSenOrgnlMsgId(String newBizCheckSenOrgnlMsgId) {
        bizCheckSenOrgnlMsgId = newBizCheckSenOrgnlMsgId;
    }	  
  /**
   * Returns the bizCheckSenOrgnlInstgDrctPty
   * 
   * @return the bizCheckSenOrgnlInstgDrctPty
   */
    @Column(name = "BIZCHECKSENORGNLINSTGDRCTPTY")
    public String getBizCheckSenOrgnlInstgDrctPty() {
        return bizCheckSenOrgnlInstgDrctPty;
    }	 
     
  /**
   * Sets the bizCheckSenOrgnlInstgDrctPty
   *
   * @param newBizCheckSenOrgnlInstgDrctPty the new bizCheckSenOrgnlInstgDrctPty
   */

    public void  setBizCheckSenOrgnlInstgDrctPty(String newBizCheckSenOrgnlInstgDrctPty) {
        bizCheckSenOrgnlInstgDrctPty = newBizCheckSenOrgnlInstgDrctPty;
    }	  
  /**
   * Returns the bizCheckSenOrgnlMT
   * 
   * @return the bizCheckSenOrgnlMT
   */
    @Column(name = "BIZCHECKSENORGNLMT")
    public String getBizCheckSenOrgnlMT() {
        return bizCheckSenOrgnlMT;
    }	 
     
  /**
   * Sets the bizCheckSenOrgnlMT
   *
   * @param newBizCheckSenOrgnlMT the new bizCheckSenOrgnlMT
   */

    public void  setBizCheckSenOrgnlMT(String newBizCheckSenOrgnlMT) {
        bizCheckSenOrgnlMT = newBizCheckSenOrgnlMT;
    }	  
  /**
   * Returns the bizCheckSenTtlCnt
   * 
   * @return the bizCheckSenTtlCnt
   */
    @Column(name = "BIZCHECKSENTTLCNT")
    public String getBizCheckSenTtlCnt() {
        return bizCheckSenTtlCnt;
    }	 
     
  /**
   * Sets the bizCheckSenTtlCnt
   *
   * @param newBizCheckSenTtlCnt the new bizCheckSenTtlCnt
   */

    public void  setBizCheckSenTtlCnt(String newBizCheckSenTtlCnt) {
        bizCheckSenTtlCnt = newBizCheckSenTtlCnt;
    }	  
  /**
   * Returns the bizCheckSenCtrlSum
   * 
   * @return the bizCheckSenCtrlSum
   */
    @Column(name = "BIZCHECKSENCTRLSUM")
    public Double getBizCheckSenCtrlSum() {
        return bizCheckSenCtrlSum;
    }	 
     
  /**
   * Sets the bizCheckSenCtrlSum
   *
   * @param newBizCheckSenCtrlSum the new bizCheckSenCtrlSum
   */

    public void  setBizCheckSenCtrlSum(Double newBizCheckSenCtrlSum) {
        bizCheckSenCtrlSum = newBizCheckSenCtrlSum;
    }	  
  /**
   * Returns the bizCheckSenPrcSts
   * 
   * @return the bizCheckSenPrcSts
   */
    @Column(name = "BIZCHECKSENPRCSTS")
    public String getBizCheckSenPrcSts() {
        return bizCheckSenPrcSts;
    }	 
     
  /**
   * Sets the bizCheckSenPrcSts
   *
   * @param newBizCheckSenPrcSts the new bizCheckSenPrcSts
   */

    public void  setBizCheckSenPrcSts(String newBizCheckSenPrcSts) {
        bizCheckSenPrcSts = newBizCheckSenPrcSts;
    }	  
    
    
}    
    
