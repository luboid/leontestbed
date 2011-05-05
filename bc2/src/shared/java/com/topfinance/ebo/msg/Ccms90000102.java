package com.topfinance.ebo.msg;

import com.topfinance.ebo.msg.JaxbMapping;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * Ccms90000102 generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_C2_CCMS_900")
public class Ccms90000102  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="cmonConf.grpHdr.msgId")
    private String msgId;
    
    @JaxbMapping(objPath="cmonConf.grpHdr.creDtTm")
    private String creDtTm;
    
    @JaxbMapping(objPath="cmonConf.grpHdr.instgPty.instgDrctPty")
    private String instgDrctPty;
    
    @JaxbMapping(objPath="cmonConf.grpHdr.instgPty.instgPty")
    private String instgIndrctPty;
    
    @JaxbMapping(objPath="cmonConf.grpHdr.instdPty.instdDrctPty")
    private String instdDrctPty;
    
    @JaxbMapping(objPath="cmonConf.grpHdr.instdPty.instdPty")
    private String instdIndrctPty;
    
    @JaxbMapping(objPath="cmonConf.grpHdr.sysCd")
    private String sysCd;
    
    @JaxbMapping(objPath="cmonConf.grpHdr.rmk")
    private String rmk;
    
    @JaxbMapping(objPath="cmonConf.cmonConfInf.prcSts")
    private String prcSts;
    
    @JaxbMapping(objPath="cmonConf.cmonConfInf.prcCd")
    private String prcCd;
    
    @JaxbMapping(objPath="cmonConf.cmonConfInf.ptyId")
    private String ptyId;
    
    @JaxbMapping(objPath="cmonConf.cmonConfInf.ptyPrcCd")
    private String ptyPrcCd;
    
    @JaxbMapping(objPath="cmonConf.cmonConfInf.rjctInf")
    private String rjctInf;
    
    @JaxbMapping(objPath="cmonConf.cmonConfInf.prcDt")
    private String prcDt;
    
    @JaxbMapping(objPath="cmonConf.cmonConfInf.netgRnd")
    private String netgRnd;
    
    
	
    /** default constructor */
    public Ccms90000102() {
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
   * Returns the ptyId
   * 
   * @return the ptyId
   */
    @Column(name = "PTYID")
    public String getPtyId() {
        return ptyId;
    }	 
     
  /**
   * Sets the ptyId
   *
   * @param newPtyId the new ptyId
   */

    public void  setPtyId(String newPtyId) {
        ptyId = newPtyId;
    }	  
  /**
   * Returns the ptyPrcCd
   * 
   * @return the ptyPrcCd
   */
    @Column(name = "PTYPRCCD")
    public String getPtyPrcCd() {
        return ptyPrcCd;
    }	 
     
  /**
   * Sets the ptyPrcCd
   *
   * @param newPtyPrcCd the new ptyPrcCd
   */

    public void  setPtyPrcCd(String newPtyPrcCd) {
        ptyPrcCd = newPtyPrcCd;
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
   * Returns the prcDt
   * 
   * @return the prcDt
   */
    @Column(name = "PRCDT")
    public String getPrcDt() {
        return prcDt;
    }	 
     
  /**
   * Sets the prcDt
   *
   * @param newPrcDt the new prcDt
   */

    public void  setPrcDt(String newPrcDt) {
        prcDt = newPrcDt;
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
    
    
}    
    
