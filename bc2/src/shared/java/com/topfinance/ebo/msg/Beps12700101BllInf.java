package com.topfinance.ebo.msg;

import com.topfinance.ebo.msg.JaxbMapping;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.SequenceGenerator;


/**
 * Beps12700101BllInf generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_C2_BEPS_121_APX_PJJL")
public class Beps12700101BllInf  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="cstmrDrctDbt.cstmrDrctDbtInf[0].cstmrDrctDbtAddtlInf.bllInf.isseDt")
    private Date commIsseDt;
    
    @JaxbMapping(objPath="cstmrDrctDbt.cstmrDrctDbtInf[0].cstmrDrctDbtAddtlInf.bllInf.amt")
    private Double commAmt;
    
    @JaxbMapping(objPath="cstmrDrctDbt.cstmrDrctDbtInf[0].cstmrDrctDbtAddtlInf.bllInf.payDT")
    private Date commPayDT;
    
    @JaxbMapping(objPath="cstmrDrctDbt.cstmrDrctDbtInf[0].cstmrDrctDbtAddtlInf.bllInf.nb")
    private String commNb;
    
    @JaxbMapping(objPath="cstmrDrctDbt.cstmrDrctDbtInf[0].cstmrDrctDbtAddtlInf.bllInf.pmtPswd")
    private String commPmtPswd;
    
    @JaxbMapping(objPath="cstmrDrctDbt.cstmrDrctDbtInf[0].cstmrDrctDbtAddtlInf.bllInf.mtrtyDt")
    private Date commMtrtyDt;
    
    @JaxbMapping(objPath="cstmrDrctDbt.cstmrDrctDbtInf[0].cstmrDrctDbtAddtlInf.bllInf.seal")
    private String commSeal;
    
    @JaxbMapping(objPath="cstmrDrctDbt.cstmrDrctDbtInf[0].cstmrDrctDbtAddtlInf.bllInf.accptncAgrmtNb")
    private String commAccptncAgrmtNb;
    
    @JaxbMapping(objPath="cstmrDrctDbt.cstmrDrctDbtInf[0].cstmrDrctDbtAddtlInf.bllInf.accptncDt")
    private Date commAccptncDt;
    
    @JaxbMapping(objPath="cstmrDrctDbt.cstmrDrctDbtInf[0].cstmrDrctDbtAddtlInf.bllInf.accptncNm")
    private String commAccptncNm;
    
    @JaxbMapping(objPath="cstmrDrctDbt.cstmrDrctDbtInf[0].cstmrDrctDbtAddtlInf.bllInf.txlCtrctNb")
    private String commTxlCtrctNb;
    
    @JaxbMapping(objPath="cstmrDrctDbt.cstmrDrctDbtInf[0].cstmrDrctDbtAddtlInf.bllInf.purp")
    private String commPurp;
    
    @JaxbMapping(objPath="cstmrDrctDbt.cstmrDrctDbtInf[0].cstmrDrctDbtAddtlInf.bllInf.nbOfEndrsr")
    private String commNbOfEndrsr;
    
    @JaxbMapping(objPath="cstmrDrctDbt.cstmrDrctDbtInf[0].cstmrDrctDbtAddtlInf.bllInf.endrsrDtl[0]")
    private java.util.Set<Beps12700101EndrsrDtl2> endrsrDtl1;
    
    private Beps12700101CstmrDrctDbtInf fid;
    
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="FID", nullable=false, updatable=false)
    public Beps12700101CstmrDrctDbtInf getFid() {
		return fid;
	}


	public void setFid(Beps12700101CstmrDrctDbtInf fid) {
		this.fid = fid;
	}
    /**
     * Returns the endrsrDtl1
     * 
     * @return the endrsrDtl1
     */
    	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL, mappedBy = "parent")
      public java.util.Set<Beps12700101EndrsrDtl2> getEndrsrDtl1() {
          return endrsrDtl1;
      }	 
       
    /**
     * Sets the endrsrDtl1
     *
     * @param newEndrsrDtl1 the new endrsrDtl1
     */

      public void  setEndrsrDtl1(java.util.Set<Beps12700101EndrsrDtl2> newEndrsrDtl1) {
          endrsrDtl1 = newEndrsrDtl1;
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
   * Returns the commIsseDt
   * 
   * @return the commIsseDt
   */
    @Column(name = "COMMISSEDT")
    public Date getCommIsseDt() {
        return commIsseDt;
    }	 
     
  /**
   * Sets the commIsseDt
   *
   * @param newCommIsseDt the new commIsseDt
   */

    public void  setCommIsseDt(Date newCommIsseDt) {
        commIsseDt = newCommIsseDt;
    }	  
  /**
   * Returns the commAmt
   * 
   * @return the commAmt
   */
    @Column(name = "COMMAMT")
    public Double getCommAmt() {
        return commAmt;
    }	 
     
  /**
   * Sets the commAmt
   *
   * @param newCommAmt the new commAmt
   */

    public void  setCommAmt(Double newCommAmt) {
        commAmt = newCommAmt;
    }	  
  /**
   * Returns the commPayDT
   * 
   * @return the commPayDT
   */
    @Column(name = "COMMPAYDT")
    public Date getCommPayDT() {
        return commPayDT;
    }	 
     
  /**
   * Sets the commPayDT
   *
   * @param newCommPayDT the new commPayDT
   */

    public void  setCommPayDT(Date newCommPayDT) {
        commPayDT = newCommPayDT;
    }	  
  /**
   * Returns the commNb
   * 
   * @return the commNb
   */
    @Column(name = "COMMNB")
    public String getCommNb() {
        return commNb;
    }	 
     
  /**
   * Sets the commNb
   *
   * @param newCommNb the new commNb
   */

    public void  setCommNb(String newCommNb) {
        commNb = newCommNb;
    }	  
  /**
   * Returns the commPmtPswd
   * 
   * @return the commPmtPswd
   */
    @Column(name = "COMMPMTPSWD")
    public String getCommPmtPswd() {
        return commPmtPswd;
    }	 
     
  /**
   * Sets the commPmtPswd
   *
   * @param newCommPmtPswd the new commPmtPswd
   */

    public void  setCommPmtPswd(String newCommPmtPswd) {
        commPmtPswd = newCommPmtPswd;
    }	  
  /**
   * Returns the commMtrtyDt
   * 
   * @return the commMtrtyDt
   */
    @Column(name = "COMMMTRTYDT")
    public Date getCommMtrtyDt() {
        return commMtrtyDt;
    }	 
     
  /**
   * Sets the commMtrtyDt
   *
   * @param newCommMtrtyDt the new commMtrtyDt
   */

    public void  setCommMtrtyDt(Date newCommMtrtyDt) {
        commMtrtyDt = newCommMtrtyDt;
    }	  
  /**
   * Returns the commSeal
   * 
   * @return the commSeal
   */
    @Column(name = "COMMSEAL")
    public String getCommSeal() {
        return commSeal;
    }	 
     
  /**
   * Sets the commSeal
   *
   * @param newCommSeal the new commSeal
   */

    public void  setCommSeal(String newCommSeal) {
        commSeal = newCommSeal;
    }	  
  /**
   * Returns the commAccptncAgrmtNb
   * 
   * @return the commAccptncAgrmtNb
   */
    @Column(name = "COMMACCPTNCAGRMTNB")
    public String getCommAccptncAgrmtNb() {
        return commAccptncAgrmtNb;
    }	 
     
  /**
   * Sets the commAccptncAgrmtNb
   *
   * @param newCommAccptncAgrmtNb the new commAccptncAgrmtNb
   */

    public void  setCommAccptncAgrmtNb(String newCommAccptncAgrmtNb) {
        commAccptncAgrmtNb = newCommAccptncAgrmtNb;
    }	  
  /**
   * Returns the commAccptncDt
   * 
   * @return the commAccptncDt
   */
    @Column(name = "COMMACCPTNCDT")
    public Date getCommAccptncDt() {
        return commAccptncDt;
    }	 
     
  /**
   * Sets the commAccptncDt
   *
   * @param newCommAccptncDt the new commAccptncDt
   */

    public void  setCommAccptncDt(Date newCommAccptncDt) {
        commAccptncDt = newCommAccptncDt;
    }	  
  /**
   * Returns the commAccptncNm
   * 
   * @return the commAccptncNm
   */
    @Column(name = "COMMACCPTNCNM")
    public String getCommAccptncNm() {
        return commAccptncNm;
    }	 
     
  /**
   * Sets the commAccptncNm
   *
   * @param newCommAccptncNm the new commAccptncNm
   */

    public void  setCommAccptncNm(String newCommAccptncNm) {
        commAccptncNm = newCommAccptncNm;
    }	  
  /**
   * Returns the commTxlCtrctNb
   * 
   * @return the commTxlCtrctNb
   */
    @Column(name = "COMMTXLCTRCTNB")
    public String getCommTxlCtrctNb() {
        return commTxlCtrctNb;
    }	 
     
  /**
   * Sets the commTxlCtrctNb
   *
   * @param newCommTxlCtrctNb the new commTxlCtrctNb
   */

    public void  setCommTxlCtrctNb(String newCommTxlCtrctNb) {
        commTxlCtrctNb = newCommTxlCtrctNb;
    }	  
  /**
   * Returns the commPurp
   * 
   * @return the commPurp
   */
    @Column(name = "COMMPURP")
    public String getCommPurp() {
        return commPurp;
    }	 
     
  /**
   * Sets the commPurp
   *
   * @param newCommPurp the new commPurp
   */

    public void  setCommPurp(String newCommPurp) {
        commPurp = newCommPurp;
    }	  
  /**
   * Returns the commNbOfEndrsr
   * 
   * @return the commNbOfEndrsr
   */
    @Column(name = "COMMNBOFENDRSR")
    public String getCommNbOfEndrsr() {
        return commNbOfEndrsr;
    }	 
     
  /**
   * Sets the commNbOfEndrsr
   *
   * @param newCommNbOfEndrsr the new commNbOfEndrsr
   */

    public void  setCommNbOfEndrsr(String newCommNbOfEndrsr) {
        commNbOfEndrsr = newCommNbOfEndrsr;
    }	  
    
    
}    
    
