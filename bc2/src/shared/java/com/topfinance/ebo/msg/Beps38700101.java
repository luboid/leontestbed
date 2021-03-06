package com.topfinance.ebo.msg;

import com.topfinance.ebo.msg.JaxbMapping;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

/**
 * Beps38700101 generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_C2_BEPS_387")
public class Beps38700101  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="btchCstmrsAcctQry.btchCstmrsAcctQryInf.acctDtls[0].id")
    private String bid;
    
    @JaxbMapping(objPath="btchCstmrsAcctQry.btchCstmrsAcctQryInf.acctDtls[0].nm")
    private String nm;
    
    @JaxbMapping(objPath="btchCstmrsAcctQry.btchCstmrsAcctQryInf.acctDtls[0].instgPty")
    private String instgPty;
    
    @JaxbMapping(objPath="btchCstmrsAcctQry.btchCstmrsAcctQryInf.acctDtls[0].acctBk")
    private String acctBk;
    
    private Beps38700101Hdr fid;


	/** default constructor */
    public Beps38700101() {
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
   * Returns the bid
   * 
   * @return the bid
   */
    @Column(name = "BID")
    public String getBid() {
        return bid;
    }	 
     
  /**
   * Sets the bid
   *
   * @param newBid the new bid
   */

    public void  setBid(String newBid) {
        bid = newBid;
    }	  
  /**
   * Returns the nm
   * 
   * @return the nm
   */
    @Column(name = "NM")
    public String getNm() {
        return nm;
    }	 
     
  /**
   * Sets the nm
   *
   * @param newNm the new nm
   */

    public void  setNm(String newNm) {
        nm = newNm;
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
   * Returns the acctBk
   * 
   * @return the acctBk
   */
    @Column(name = "ACCTBK")
    public String getAcctBk() {
        return acctBk;
    }	 
     
  /**
   * Sets the acctBk
   *
   * @param newAcctBk the new acctBk
   */

    public void  setAcctBk(String newAcctBk) {
        acctBk = newAcctBk;
    }	  
    
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="FID", nullable=false, updatable=false)
    public Beps38700101Hdr getFid() {
		return fid;
	}


	public void setFid(Beps38700101Hdr fid) {
		this.fid = fid;
	}
    
}    
    
