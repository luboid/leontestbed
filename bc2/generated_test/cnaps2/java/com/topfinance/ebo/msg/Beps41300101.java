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
 * Beps41300101 generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_MSG_BEPS_413_001_01__")
public class Beps41300101  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="cstmrPmtCxlReq.assgnmt.id")
    private String msgId;
    
    @JaxbMapping(objPath="cstmrPmtCxlReq.assgnmt.assgnr.agt.finInstnId.clrSysMmbId.mmbId")
    private String instgDrctPty;
    
    @JaxbMapping(objPath="cstmrPmtCxlReq.assgnmt.assgne.agt.finInstnId.clrSysMmbId.mmbId")
    private String instdDrctPty;
    
    @JaxbMapping(objPath="cstmrPmtCxlReq.assgnmt.creDtTm")
    private Date creDtTm;
    
    @JaxbMapping(objPath="cstmrPmtCxlReq.undrlyg.orgnlGrpInfAndCxl.Case.id")
    private String identification;
    
    @JaxbMapping(objPath="cstmrPmtCxlReq.undrlyg.orgnlGrpInfAndCxl.Case.cretr.agt.finInstnId.clrSysMmbId.mmbId")
    private String mmbId;
    
    @JaxbMapping(objPath="cstmrPmtCxlReq.undrlyg.orgnlGrpInfAndCxl.orgnlMsgId")
    private String orgnlMsgId;
    
    @JaxbMapping(objPath="cstmrPmtCxlReq.undrlyg.orgnlGrpInfAndCxl.orgnlMsgNmId")
    private String orgnlMsgNmId;
    
    @JaxbMapping(objPath="cstmrPmtCxlReq.undrlyg.orgnlGrpInfAndCxl.cxlRsnInf.addtlInf")
    private String addtlInf;
    
    
	
    /** default constructor */
    public Beps41300101() {
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
   * Returns the identification
   * 
   * @return the identification
   */
    @Column(name = "IDENTIFICATION")
    public String getIdentification() {
        return identification;
    }	 
     
  /**
   * Sets the identification
   *
   * @param newIdentification the new identification
   */

    public void  setIdentification(String newIdentification) {
        identification = newIdentification;
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
   * Returns the orgnlMsgNmId
   * 
   * @return the orgnlMsgNmId
   */
    @Column(name = "ORGNLMSGNMID")
    public String getOrgnlMsgNmId() {
        return orgnlMsgNmId;
    }	 
     
  /**
   * Sets the orgnlMsgNmId
   *
   * @param newOrgnlMsgNmId the new orgnlMsgNmId
   */

    public void  setOrgnlMsgNmId(String newOrgnlMsgNmId) {
        orgnlMsgNmId = newOrgnlMsgNmId;
    }	  
  /**
   * Returns the addtlInf
   * 
   * @return the addtlInf
   */
    @Column(name = "ADDTLINF")
    public String getAddtlInf() {
        return addtlInf;
    }	 
     
  /**
   * Sets the addtlInf
   *
   * @param newAddtlInf the new addtlInf
   */

    public void  setAddtlInf(String newAddtlInf) {
        addtlInf = newAddtlInf;
    }	  
    
    
}    
    
