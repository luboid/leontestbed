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
 * Beps13100101RealTmBllInf generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_MSG_BEPS_131_001_01___RealTmBllInf")
public class Beps13100101RealTmBllInf  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="realTmCstmrDrctDbt.realTmCstmrDrctDbtInf.realTmCstmrDrctDbtAddtlInf.realTmBllInf.isseDt")
    private Date isseDt;
    
    @JaxbMapping(objPath="realTmCstmrDrctDbt.realTmCstmrDrctDbtInf.realTmCstmrDrctDbtAddtlInf.realTmBllInf.amt.value")
    private Double amt;
    
    @JaxbMapping(objPath="realTmCstmrDrctDbt.realTmCstmrDrctDbtInf.realTmCstmrDrctDbtAddtlInf.realTmBllInf.payDT")
    private Date payDT;
    
    @JaxbMapping(objPath="realTmCstmrDrctDbt.realTmCstmrDrctDbtInf.realTmCstmrDrctDbtAddtlInf.realTmBllInf.nb")
    private String nb;
    
    @JaxbMapping(objPath="realTmCstmrDrctDbt.realTmCstmrDrctDbtInf.realTmCstmrDrctDbtAddtlInf.realTmBllInf.pmtPswd")
    private String pmtPswd;
    
    @JaxbMapping(objPath="realTmCstmrDrctDbt.realTmCstmrDrctDbtInf.realTmCstmrDrctDbtAddtlInf.realTmBllInf.mtrtyDt")
    private Date mtrtyDt;
    
    @JaxbMapping(objPath="realTmCstmrDrctDbt.realTmCstmrDrctDbtInf.realTmCstmrDrctDbtAddtlInf.realTmBllInf.seal")
    private String seal;
    
    @JaxbMapping(objPath="realTmCstmrDrctDbt.realTmCstmrDrctDbtInf.realTmCstmrDrctDbtAddtlInf.realTmBllInf.accptncAgrmtNb")
    private String accptncAgrmtNb;
    
    @JaxbMapping(objPath="realTmCstmrDrctDbt.realTmCstmrDrctDbtInf.realTmCstmrDrctDbtAddtlInf.realTmBllInf.accptncDt")
    private Date accptncDt;
    
    @JaxbMapping(objPath="realTmCstmrDrctDbt.realTmCstmrDrctDbtInf.realTmCstmrDrctDbtAddtlInf.realTmBllInf.accptncNm")
    private String accptncNm;
    
    @JaxbMapping(objPath="realTmCstmrDrctDbt.realTmCstmrDrctDbtInf.realTmCstmrDrctDbtAddtlInf.realTmBllInf.txlCtrctNb")
    private String txlCtrctNb;
    
    @JaxbMapping(objPath="realTmCstmrDrctDbt.realTmCstmrDrctDbtInf.realTmCstmrDrctDbtAddtlInf.realTmBllInf.purp")
    private String purp;
    
    @JaxbMapping(objPath="realTmCstmrDrctDbt.realTmCstmrDrctDbtInf.realTmCstmrDrctDbtAddtlInf.realTmBllInf.nbOfEndrsr")
    private String nbOfEndrsr;
    
    
	
    /** default constructor */
    public Beps13100101RealTmBllInf() {
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
   * Returns the isseDt
   * 
   * @return the isseDt
   */
    @Column(name = "ISSEDT")
    public Date getIsseDt() {
        return isseDt;
    }	 
     
  /**
   * Sets the isseDt
   *
   * @param newIsseDt the new isseDt
   */

    public void  setIsseDt(Date newIsseDt) {
        isseDt = newIsseDt;
    }	  
  /**
   * Returns the amt
   * 
   * @return the amt
   */
    @Column(name = "AMT")
    public Double getAmt() {
        return amt;
    }	 
     
  /**
   * Sets the amt
   *
   * @param newAmt the new amt
   */

    public void  setAmt(Double newAmt) {
        amt = newAmt;
    }	  
  /**
   * Returns the payDT
   * 
   * @return the payDT
   */
    @Column(name = "PAYDT")
    public Date getPayDT() {
        return payDT;
    }	 
     
  /**
   * Sets the payDT
   *
   * @param newPayDT the new payDT
   */

    public void  setPayDT(Date newPayDT) {
        payDT = newPayDT;
    }	  
  /**
   * Returns the nb
   * 
   * @return the nb
   */
    @Column(name = "NB")
    public String getNb() {
        return nb;
    }	 
     
  /**
   * Sets the nb
   *
   * @param newNb the new nb
   */

    public void  setNb(String newNb) {
        nb = newNb;
    }	  
  /**
   * Returns the pmtPswd
   * 
   * @return the pmtPswd
   */
    @Column(name = "PMTPSWD")
    public String getPmtPswd() {
        return pmtPswd;
    }	 
     
  /**
   * Sets the pmtPswd
   *
   * @param newPmtPswd the new pmtPswd
   */

    public void  setPmtPswd(String newPmtPswd) {
        pmtPswd = newPmtPswd;
    }	  
  /**
   * Returns the mtrtyDt
   * 
   * @return the mtrtyDt
   */
    @Column(name = "MTRTYDT")
    public Date getMtrtyDt() {
        return mtrtyDt;
    }	 
     
  /**
   * Sets the mtrtyDt
   *
   * @param newMtrtyDt the new mtrtyDt
   */

    public void  setMtrtyDt(Date newMtrtyDt) {
        mtrtyDt = newMtrtyDt;
    }	  
  /**
   * Returns the seal
   * 
   * @return the seal
   */
    @Column(name = "SEAL")
    public String getSeal() {
        return seal;
    }	 
     
  /**
   * Sets the seal
   *
   * @param newSeal the new seal
   */

    public void  setSeal(String newSeal) {
        seal = newSeal;
    }	  
  /**
   * Returns the accptncAgrmtNb
   * 
   * @return the accptncAgrmtNb
   */
    @Column(name = "ACCPTNCAGRMTNB")
    public String getAccptncAgrmtNb() {
        return accptncAgrmtNb;
    }	 
     
  /**
   * Sets the accptncAgrmtNb
   *
   * @param newAccptncAgrmtNb the new accptncAgrmtNb
   */

    public void  setAccptncAgrmtNb(String newAccptncAgrmtNb) {
        accptncAgrmtNb = newAccptncAgrmtNb;
    }	  
  /**
   * Returns the accptncDt
   * 
   * @return the accptncDt
   */
    @Column(name = "ACCPTNCDT")
    public Date getAccptncDt() {
        return accptncDt;
    }	 
     
  /**
   * Sets the accptncDt
   *
   * @param newAccptncDt the new accptncDt
   */

    public void  setAccptncDt(Date newAccptncDt) {
        accptncDt = newAccptncDt;
    }	  
  /**
   * Returns the accptncNm
   * 
   * @return the accptncNm
   */
    @Column(name = "ACCPTNCNM")
    public String getAccptncNm() {
        return accptncNm;
    }	 
     
  /**
   * Sets the accptncNm
   *
   * @param newAccptncNm the new accptncNm
   */

    public void  setAccptncNm(String newAccptncNm) {
        accptncNm = newAccptncNm;
    }	  
  /**
   * Returns the txlCtrctNb
   * 
   * @return the txlCtrctNb
   */
    @Column(name = "TXLCTRCTNB")
    public String getTxlCtrctNb() {
        return txlCtrctNb;
    }	 
     
  /**
   * Sets the txlCtrctNb
   *
   * @param newTxlCtrctNb the new txlCtrctNb
   */

    public void  setTxlCtrctNb(String newTxlCtrctNb) {
        txlCtrctNb = newTxlCtrctNb;
    }	  
  /**
   * Returns the purp
   * 
   * @return the purp
   */
    @Column(name = "PURP")
    public String getPurp() {
        return purp;
    }	 
     
  /**
   * Sets the purp
   *
   * @param newPurp the new purp
   */

    public void  setPurp(String newPurp) {
        purp = newPurp;
    }	  
  /**
   * Returns the nbOfEndrsr
   * 
   * @return the nbOfEndrsr
   */
    @Column(name = "NBOFENDRSR")
    public String getNbOfEndrsr() {
        return nbOfEndrsr;
    }	 
     
  /**
   * Sets the nbOfEndrsr
   *
   * @param newNbOfEndrsr the new nbOfEndrsr
   */

    public void  setNbOfEndrsr(String newNbOfEndrsr) {
        nbOfEndrsr = newNbOfEndrsr;
    }	  
    
    
}    
    
