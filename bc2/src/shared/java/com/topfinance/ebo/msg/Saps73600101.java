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
 * Saps73600101 generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_C2_SAPS_736")
public class Saps73600101  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="acctgDailyDwnLd.acctgDailyDwnLdInf.txList[0].txTp")
    private String txTp;
    
    @JaxbMapping(objPath="acctgDailyDwnLd.acctgDailyDwnLdInf.txList[0].dailyDbtrAmt")
    private String deDailyDbtrAmt;
    
    @JaxbMapping(objPath="acctgDailyDwnLd.acctgDailyDwnLdInf.txList[0].dailyCdtrAmt")
    private String deDailyCdtrAmt;
    
    private Saps73600101Hdr fid;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="FID", nullable=false, updatable=false)
    public Saps73600101Hdr getFid() {
		return fid;
	}


	public void setFid(Saps73600101Hdr fid) {
		this.fid = fid;
	}


	/** default constructor */
    public Saps73600101() {
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
   * Returns the txTp
   * 
   * @return the txTp
   */
    @Column(name = "TXTP")
    public String getTxTp() {
        return txTp;
    }	 
     
  /**
   * Sets the txTp
   *
   * @param newTxTp the new txTp
   */

    public void  setTxTp(String newTxTp) {
        txTp = newTxTp;
    }	  
  /**
   * Returns the deDailyDbtrAmt
   * 
   * @return the deDailyDbtrAmt
   */
    @Column(name = "DEDAILYDBTRAMT")
    public String getDeDailyDbtrAmt() {
        return deDailyDbtrAmt;
    }	 
     
  /**
   * Sets the dedailyDbtrAmt
   *
   * @param newDeDailyDbtrAmt the new dedailyDbtrAmt
   */

    public void  setDeDailyDbtrAmt(String newDeDailyDbtrAmt) {
    	deDailyDbtrAmt = newDeDailyDbtrAmt;
    }	  
  /**
   * Returns the deDailyCdtrAmt
   * 
   * @return the deDailyCdtrAmt
   */
    @Column(name = "DEDAILYCDTRAMT")
    public String getDeDailyCdtrAmt() {
        return deDailyCdtrAmt;
    }	 
     
  /**
   * Sets the deDailyCdtrAmt
   *
   * @param newDeDailyCdtrAmt the new deDailyCdtrAmt
   */

    public void  setDeDailyCdtrAmt(String newDeDailyCdtrAmt) {
    	deDailyCdtrAmt = newDeDailyCdtrAmt;
    }	  
    
    
}    
    
