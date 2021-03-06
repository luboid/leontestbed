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
 * Ccms80300102Hdr generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_C2_CCMS_803_HDR")
public class Ccms80300102Hdr  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="trblNtfctn.grpHdr.msgId")
    private String msgId;
    
    @JaxbMapping(objPath="trblNtfctn.grpHdr.creDtTm")
    private Date creDtTm;
    
    @JaxbMapping(objPath="trblNtfctn.grpHdr.instgPty.instgDrctPty")
    private String instgDrctPty;
    
    @JaxbMapping(objPath="trblNtfctn.grpHdr.instgPty.instgPty")
    private String instgIndrctPty;
    
    @JaxbMapping(objPath="trblNtfctn.grpHdr.instdPty.instdDrctPty")
    private String instdDrctPty;
    
    @JaxbMapping(objPath="trblNtfctn.grpHdr.instdPty.instdPty")
    private String instdIndrctPty;
    
    @JaxbMapping(objPath="trblNtfctn.grpHdr.sysCd")
    private String sysCd;
    
    @JaxbMapping(objPath="trblNtfctn.grpHdr.rmk")
    private String rmk;
    
    @JaxbMapping(objPath="trblNtfctn.stsInf.tp")
    private String tp;
    
    @JaxbMapping(objPath="trblNtfctn.stsInf.ptyTp")
    private String ptyTp;
    
    @JaxbMapping(objPath="trblNtfctn.ndInf.ndCd")
    private String ndCd;
    
    @JaxbMapping(objPath="trblNtfctn.ndInf.ptyId[0]")
    private java.util.Set<Ccms80300102> fakeNode;
    
    
	
    /** default constructor */
    public Ccms80300102Hdr() {
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
   * Returns the ptyTp
   * 
   * @return the ptyTp
   */
    @Column(name = "PTYTP")
    public String getPtyTp() {
        return ptyTp;
    }	 
     
  /**
   * Sets the ptyTp
   *
   * @param newPtyTp the new ptyTp
   */

    public void  setPtyTp(String newPtyTp) {
        ptyTp = newPtyTp;
    }	  
  /**
   * Returns the ndCd
   * 
   * @return the ndCd
   */
    @Column(name = "NDCD")
    public String getNdCd() {
        return ndCd;
    }	 
     
  /**
   * Sets the ndCd
   *
   * @param newNdCd the new ndCd
   */

    public void  setNdCd(String newNdCd) {
        ndCd = newNdCd;
    }	  
  /**
   * Returns the fakeNode
   * 
   * @return the fakeNode
   */
  	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL, mappedBy = "fid")
    public java.util.Set<Ccms80300102> getFakeNode() {
        return fakeNode;
    }	 
     
  /**
   * Sets the fakeNode
   *
   * @param newFakeNode the new fakeNode
   */

    public void  setFakeNode(java.util.Set<Ccms80300102> newFakeNode) {
        fakeNode = newFakeNode;
    }	  
    
    
}    
    
