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
 * Saps73200101NetgList generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_MSG_SAPS_732_001_01___NetgList")
public class Saps73200101NetgList  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.acsAbsSttlmDtlRspnInf.chckngInf.netgList[0].msgId")
    private String netMsgId;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.acsAbsSttlmDtlRspnInf.chckngInf.netgList[0].rspnSts")
    private String netRspnSts;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.acsAbsSttlmDtlRspnInf.chckngInf.netgList[0].ctgyPurpCd")
    private String netCtgyPurpCd;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.acsAbsSttlmDtlRspnInf.chckngInf.netgList[0].netgRnd")
    private String netgRnd;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.acsAbsSttlmDtlRspnInf.chckngInf.netgList[0].dbtrAmt")
    private String netDbtrAmt;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.acsAbsSttlmDtlRspnInf.chckngInf.netgList[0].cdtrAmt")
    private String netCdtrAmt;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.acsAbsSttlmDtlRspnInf.chckngInf.netgList[0].nbOfMmb")
    private String netNbOfMmb;
    
    @JaxbMapping(objPath="acsAbsSttlmDtlRspn.acsAbsSttlmDtlRspnInf.chckngInf.netgList[0].bookgList[0]")
    private java.util.Set<Saps73200101BookgList> bookgList;
    
    
	
    /** default constructor */
    public Saps73200101NetgList() {
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
   * Returns the netMsgId
   * 
   * @return the netMsgId
   */
    @Column(name = "NETMSGID")
    public String getNetMsgId() {
        return netMsgId;
    }	 
     
  /**
   * Sets the netMsgId
   *
   * @param newNetMsgId the new netMsgId
   */

    public void  setNetMsgId(String newNetMsgId) {
        netMsgId = newNetMsgId;
    }	  
  /**
   * Returns the netRspnSts
   * 
   * @return the netRspnSts
   */
    @Column(name = "NETRSPNSTS")
    public String getNetRspnSts() {
        return netRspnSts;
    }	 
     
  /**
   * Sets the netRspnSts
   *
   * @param newNetRspnSts the new netRspnSts
   */

    public void  setNetRspnSts(String newNetRspnSts) {
        netRspnSts = newNetRspnSts;
    }	  
  /**
   * Returns the netCtgyPurpCd
   * 
   * @return the netCtgyPurpCd
   */
    @Column(name = "NETCTGYPURPCD")
    public String getNetCtgyPurpCd() {
        return netCtgyPurpCd;
    }	 
     
  /**
   * Sets the netCtgyPurpCd
   *
   * @param newNetCtgyPurpCd the new netCtgyPurpCd
   */

    public void  setNetCtgyPurpCd(String newNetCtgyPurpCd) {
        netCtgyPurpCd = newNetCtgyPurpCd;
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
   * Returns the netDbtrAmt
   * 
   * @return the netDbtrAmt
   */
    @Column(name = "NETDBTRAMT")
    public String getNetDbtrAmt() {
        return netDbtrAmt;
    }	 
     
  /**
   * Sets the netDbtrAmt
   *
   * @param newNetDbtrAmt the new netDbtrAmt
   */

    public void  setNetDbtrAmt(String newNetDbtrAmt) {
        netDbtrAmt = newNetDbtrAmt;
    }	  
  /**
   * Returns the netCdtrAmt
   * 
   * @return the netCdtrAmt
   */
    @Column(name = "NETCDTRAMT")
    public String getNetCdtrAmt() {
        return netCdtrAmt;
    }	 
     
  /**
   * Sets the netCdtrAmt
   *
   * @param newNetCdtrAmt the new netCdtrAmt
   */

    public void  setNetCdtrAmt(String newNetCdtrAmt) {
        netCdtrAmt = newNetCdtrAmt;
    }	  
  /**
   * Returns the netNbOfMmb
   * 
   * @return the netNbOfMmb
   */
    @Column(name = "NETNBOFMMB")
    public String getNetNbOfMmb() {
        return netNbOfMmb;
    }	 
     
  /**
   * Sets the netNbOfMmb
   *
   * @param newNetNbOfMmb the new netNbOfMmb
   */

    public void  setNetNbOfMmb(String newNetNbOfMmb) {
        netNbOfMmb = newNetNbOfMmb;
    }	  
  /**
   * Returns the bookgList
   * 
   * @return the bookgList
   */
  	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL, mappedBy = "parent")
    public java.util.Set<Saps73200101BookgList> getBookgList() {
        return bookgList;
    }	 
     
  /**
   * Sets the bookgList
   *
   * @param newBookgList the new bookgList
   */

    public void  setBookgList(java.util.Set<Saps73200101BookgList> newBookgList) {
        bookgList = newBookgList;
    }	  
    
    
}    
    
