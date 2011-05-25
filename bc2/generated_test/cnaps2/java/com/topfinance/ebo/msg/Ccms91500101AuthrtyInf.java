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
 * Ccms91500101AuthrtyInf generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_MSG_CCMS_915_001_01___AuthrtyInf")
public class Ccms91500101AuthrtyInf  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="authrtyChngNtfctn.authrtyInf[0].chngCtrl.chngTp")
    private String chngTp;
    
    @JaxbMapping(objPath="authrtyChngNtfctn.authrtyInf[0].chngCtrl.fctvTp")
    private String fctvTp;
    
    @JaxbMapping(objPath="authrtyChngNtfctn.authrtyInf[0].chngCtrl.fctvDt")
    private Date fctvDt;
    
    @JaxbMapping(objPath="authrtyChngNtfctn.authrtyInf[0].chngCtrl.ifctvDt")
    private Date ifctvDt;
    
    @JaxbMapping(objPath="authrtyChngNtfctn.authrtyInf[0].initPtcpt")
    private String initPtcpt;
    
    @JaxbMapping(objPath="authrtyChngNtfctn.authrtyInf[0].rcvPtcpt")
    private String rcvPtcpt;
    
    
	
    /** default constructor */
    public Ccms91500101AuthrtyInf() {
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
   * Returns the chngTp
   * 
   * @return the chngTp
   */
    @Column(name = "CHNGTP")
    public String getChngTp() {
        return chngTp;
    }	 
     
  /**
   * Sets the chngTp
   *
   * @param newChngTp the new chngTp
   */

    public void  setChngTp(String newChngTp) {
        chngTp = newChngTp;
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
   * Returns the ifctvDt
   * 
   * @return the ifctvDt
   */
    @Column(name = "IFCTVDT")
    public Date getIfctvDt() {
        return ifctvDt;
    }	 
     
  /**
   * Sets the ifctvDt
   *
   * @param newIfctvDt the new ifctvDt
   */

    public void  setIfctvDt(Date newIfctvDt) {
        ifctvDt = newIfctvDt;
    }	  
  /**
   * Returns the initPtcpt
   * 
   * @return the initPtcpt
   */
    @Column(name = "INITPTCPT")
    public String getInitPtcpt() {
        return initPtcpt;
    }	 
     
  /**
   * Sets the initPtcpt
   *
   * @param newInitPtcpt the new initPtcpt
   */

    public void  setInitPtcpt(String newInitPtcpt) {
        initPtcpt = newInitPtcpt;
    }	  
  /**
   * Returns the rcvPtcpt
   * 
   * @return the rcvPtcpt
   */
    @Column(name = "RCVPTCPT")
    public String getRcvPtcpt() {
        return rcvPtcpt;
    }	 
     
  /**
   * Sets the rcvPtcpt
   *
   * @param newRcvPtcpt the new rcvPtcpt
   */

    public void  setRcvPtcpt(String newRcvPtcpt) {
        rcvPtcpt = newRcvPtcpt;
    }	  
    
    
}    
    
