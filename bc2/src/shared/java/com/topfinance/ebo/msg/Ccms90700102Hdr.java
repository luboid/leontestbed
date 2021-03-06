package com.topfinance.ebo.msg;

import com.topfinance.ebo.msg.JaxbMapping;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

/**
 * Ccms90700102Hdr generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_C2_CCMS_907_HDR")
public class Ccms90700102Hdr  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="sysParamNtfctn.grpHdr.msgId")
    private String msgId;
    
    @JaxbMapping(objPath="sysParamNtfctn.grpHdr.creDtTm")
    private Date creDtTm;
    
    @JaxbMapping(objPath="sysParamNtfctn.grpHdr.instgPty.instgDrctPty")
    private String instgDrctPty;
    
    @JaxbMapping(objPath="sysParamNtfctn.grpHdr.instgPty.instgPty")
    private String instgIndrctPty;
    
    @JaxbMapping(objPath="sysParamNtfctn.grpHdr.instdPty.instdDrctPty")
    private String instdDrctPty;
    
    @JaxbMapping(objPath="sysParamNtfctn.grpHdr.instdPty.instdPty")
    private String instdIndrctPty;
    
    @JaxbMapping(objPath="sysParamNtfctn.grpHdr.sysCd")
    private String sysCd;
    
    @JaxbMapping(objPath="sysParamNtfctn.grpHdr.rmk")
    private String rmk;
    
    @JaxbMapping(objPath="sysParamNtfctn.nbInf.chngNb")
    private String chngNb;
    
    @JaxbMapping(objPath="sysParamNtfctn.nbInf.chngRcrdNb")
    private String chngRcrdNb;
    
    @JaxbMapping(objPath="sysParamNtfctn.fctvInf.fctvTp")
    private String fctvTp;
    
    @JaxbMapping(objPath="sysParamNtfctn.fctvInf.fctvDt")
    private Date fctvDt;
    
    @JaxbMapping(objPath="sysParamNtfctn.sysParamInf[0]")
    private java.util.Set<Ccms90700102> sysParamInf;
    
    
	
    /** default constructor */
    public Ccms90700102Hdr() {
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
   * Returns the chngNb
   * 
   * @return the chngNb
   */
    @Column(name = "CHNGNB")
    public String getChngNb() {
        return chngNb;
    }	 
     
  /**
   * Sets the chngNb
   *
   * @param newChngNb the new chngNb
   */

    public void  setChngNb(String newChngNb) {
        chngNb = newChngNb;
    }	  
  /**
   * Returns the chngRcrdNb
   * 
   * @return the chngRcrdNb
   */
    @Column(name = "CHNGRCRDNB")
    public String getChngRcrdNb() {
        return chngRcrdNb;
    }	 
     
  /**
   * Sets the chngRcrdNb
   *
   * @param newChngRcrdNb the new chngRcrdNb
   */

    public void  setChngRcrdNb(String newChngRcrdNb) {
        chngRcrdNb = newChngRcrdNb;
    }	  
  /**
   * Returns the fctvTp
   * 
   * @return the fctvTp
   */
    @Column(name = "FCTVTP")
    public String getFctvTp() {
        return fctvTp;
    }	 
     
  /**
   * Sets the fctvTp
   *
   * @param newFctvTp the new fctvTp
   */

    public void  setFctvTp(String newFctvTp) {
        fctvTp = newFctvTp;
    }	  
  /**
   * Returns the fctvDt
   * 
   * @return the fctvDt
   */
    @Column(name = "FCTVDT")
    public Date getFctvDt() {
        return fctvDt;
    }	 
     
  /**
   * Sets the fctvDt
   *
   * @param newFctvDt the new fctvDt
   */

    public void  setFctvDt(Date newFctvDt) {
        fctvDt = newFctvDt;
    }	  
  /**
   * Returns the sysParamInf
   * 
   * @return the sysParamInf
   */
  	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL, mappedBy = "fid")
    public java.util.Set<Ccms90700102> getSysParamInf() {
        return sysParamInf;
    }	 
     
  /**
   * Sets the sysParamInf
   *
   * @param newSysParamInf the new sysParamInf
   */

    public void  setSysParamInf(java.util.Set<Ccms90700102> newSysParamInf) {
        sysParamInf = newSysParamInf;
    }	  
    
    
}    
    
