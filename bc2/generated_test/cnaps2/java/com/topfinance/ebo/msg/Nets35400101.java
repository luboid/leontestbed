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
 * Nets35400101 generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_MSG_NETS_354_001_01__")
public class Nets35400101  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="netDbtWrngApply.grpHdr.msgId")
    private String msgId;
    
    @JaxbMapping(objPath="netDbtWrngApply.grpHdr.creDtTm")
    private Date creDtTm;
    
    @JaxbMapping(objPath="netDbtWrngApply.grpHdr.instgPty.instgDrctPty")
    private String instgDrctPty;
    
    @JaxbMapping(objPath="netDbtWrngApply.grpHdr.instgPty.instgPty")
    private String instgIndrctPty;
    
    @JaxbMapping(objPath="netDbtWrngApply.grpHdr.instdPty.instdDrctPty")
    private String instdDrctPty;
    
    @JaxbMapping(objPath="netDbtWrngApply.grpHdr.instdPty.instdPty")
    private String instdIndrctPty;
    
    @JaxbMapping(objPath="netDbtWrngApply.grpHdr.sysCd")
    private String sysCd;
    
    @JaxbMapping(objPath="netDbtWrngApply.grpHdr.rmk")
    private String rmk;
    
    @JaxbMapping(objPath="netDbtWrngApply.netDbtWrngApplyInf.mmbId")
    private String mmbId;
    
    @JaxbMapping(objPath="netDbtWrngApply.netDbtWrngApplyInf.swtchTp")
    private String swtchTp;
    
    @JaxbMapping(objPath="netDbtWrngApply.netDbtWrngApplyInf.wrngVal.value")
    private Double wrngVal;
    
    
	
    /** default constructor */
    public Nets35400101() {
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
   * Returns the swtchTp
   * 
   * @return the swtchTp
   */
    @Column(name = "SWTCHTP")
    public String getSwtchTp() {
        return swtchTp;
    }	 
     
  /**
   * Sets the swtchTp
   *
   * @param newSwtchTp the new swtchTp
   */

    public void  setSwtchTp(String newSwtchTp) {
        swtchTp = newSwtchTp;
    }	  
  /**
   * Returns the wrngVal
   * 
   * @return the wrngVal
   */
    @Column(name = "WRNGVAL")
    public Double getWrngVal() {
        return wrngVal;
    }	 
     
  /**
   * Sets the wrngVal
   *
   * @param newWrngVal the new wrngVal
   */

    public void  setWrngVal(Double newWrngVal) {
        wrngVal = newWrngVal;
    }	  
    
    
}    
    
