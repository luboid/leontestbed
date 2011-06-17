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
 * Saps73000101ACSABSSttlmColltnChckngInf generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_MSG_SAPS_730_001_01___ACSABSSttlmColltnChckngInf")
public class Saps73000101ACSABSSttlmColltnChckngInf  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="acsAbsSttlmColltnChckng.acsAbsSttlmColltnChckngInf.unltrlChckng[0]")
    private java.util.Set<Saps73000101UnltrlChckng> unltrlChckng;
    
    @JaxbMapping(objPath="acsAbsSttlmColltnChckng.acsAbsSttlmColltnChckngInf.rvslChckng[0]")
    private java.util.Set<Saps73000101RvslChckng> rvslChckng;
    
    @JaxbMapping(objPath="acsAbsSttlmColltnChckng.acsAbsSttlmColltnChckngInf.netgChckng[0]")
    private java.util.Set<Saps73000101NetgChckng> netgChckng;
    
    
	
    /** default constructor */
    public Saps73000101ACSABSSttlmColltnChckngInf() {
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
   * Returns the unltrlChckng
   * 
   * @return the unltrlChckng
   */
  	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL, mappedBy = "parent")
    public java.util.Set<Saps73000101UnltrlChckng> getUnltrlChckng() {
        return unltrlChckng;
    }	 
     
  /**
   * Sets the unltrlChckng
   *
   * @param newUnltrlChckng the new unltrlChckng
   */

    public void  setUnltrlChckng(java.util.Set<Saps73000101UnltrlChckng> newUnltrlChckng) {
        unltrlChckng = newUnltrlChckng;
    }	  
  /**
   * Returns the rvslChckng
   * 
   * @return the rvslChckng
   */
  	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL, mappedBy = "parent")
    public java.util.Set<Saps73000101RvslChckng> getRvslChckng() {
        return rvslChckng;
    }	 
     
  /**
   * Sets the rvslChckng
   *
   * @param newRvslChckng the new rvslChckng
   */

    public void  setRvslChckng(java.util.Set<Saps73000101RvslChckng> newRvslChckng) {
        rvslChckng = newRvslChckng;
    }	  
  /**
   * Returns the netgChckng
   * 
   * @return the netgChckng
   */
  	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL, mappedBy = "parent")
    public java.util.Set<Saps73000101NetgChckng> getNetgChckng() {
        return netgChckng;
    }	 
     
  /**
   * Sets the netgChckng
   *
   * @param newNetgChckng the new netgChckng
   */

    public void  setNetgChckng(java.util.Set<Saps73000101NetgChckng> newNetgChckng) {
        netgChckng = newNetgChckng;
    }	  
    
    
}    
    