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
 * Beps12200101FinCdtTrfInf generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_MSG_BEPS_122_001_01___FinCdtTrfInf")
public class Beps12200101FinCdtTrfInf  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].txId")
    private String txId;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].dbtr.nm")
    private String dbtrNm;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].dbtr.pstlAdr.adrLine")
    private String padrLine;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].dbtrAcct.id.othr.id")
    private String dbtrAcctId;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].dbtrAcct.id.othr.issr")
    private String dbtrAcctIssr;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].dbtrAgt.brnchId.id")
    private String dbtrAgtBrnchId;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].cdtrAgt.brnchId.id")
    private String cdtrAgtBrnchId;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].cdtr.nm")
    private String cdtrNm;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].cdtr.pstlAdr.adrLine")
    private String radrLine;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].cdtrAcct.id.othr.id")
    private String cdtrAcctId;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].cdtrAcct.id.othr.issr")
    private String cdtrAcctIssr;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].amt.value")
    private Double intrBkSttlmAmt;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].pmtTpInf.ctgyPurp.prtry")
    private String tpCdPrtry;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].purp.prtry")
    private String tcCdPrtry;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].addtlInf")
    private String addtlInf;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrCdtInf")
    private java.util.Set<Beps12200101NtlTrsrCdtInf> ntlTrsrCdtInf;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrCdtInf.fslInf.flowNb")
    private String flowNb;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrCdtInf.fslInf.amt.value")
    private Double tlAmt;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrCdtInf.fslInf.rptCd")
    private String rptCd;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrCdtInf.fslInf.rcvCd")
    private String rcvCd;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrCdtInf.fslInf.rptFrms")
    private Date rptFrms;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrCdtInf.fslInf.rptNb")
    private String rptNb;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrCdtInf.bugtLvl")
    private String bugtLvl;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrCdtInf.ind")
    private String ind;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrCdtInf.bugtTp")
    private String bugtTp;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrCdtInf.nbOfTxs")
    private String nbOfTxs;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrCdtInf.ntlTrsrCdtInfDtls[0]")
    private java.util.Set<Beps12200101NtlTrsrCdtInfDtls> ntlTrsrCdtInfDtls;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrInf")
    private java.util.Set<Beps12200101NtlTrsrInf> ntlTrsrInf;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrInf.fslInf.flowNb")
    private String fisFlowNb;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrInf.fslInf.amt.value")
    private Double fisDetlAmt;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrInf.fslInf.rptCd")
    private String fisRptCd;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrInf.fslInf.rcvCd")
    private String fisRcvCd;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrInf.fslInf.rptFrms")
    private Date fisRptFrms;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrInf.fslInf.rptNb")
    private String fisRptNb;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrInf.nbOfTxs")
    private String fisNbOfTxs;
    
    @JaxbMapping(objPath="finCdtTrf.finCdtTrfInf[0].finCdtTrfAddtlInf.ntlTrsrInf.ntlTrsrInfDtls[0]")
    private java.util.Set<Beps12200101NtlTrsrInfDtls> ntlTrsrInfDtls;
    
    
	
    /** default constructor */
    public Beps12200101FinCdtTrfInf() {
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
   * Returns the txId
   * 
   * @return the txId
   */
    @Column(name = "TXID")
    public String getTxId() {
        return txId;
    }	 
     
  /**
   * Sets the txId
   *
   * @param newTxId the new txId
   */

    public void  setTxId(String newTxId) {
        txId = newTxId;
    }	  
  /**
   * Returns the dbtrNm
   * 
   * @return the dbtrNm
   */
    @Column(name = "DBTRNM")
    public String getDbtrNm() {
        return dbtrNm;
    }	 
     
  /**
   * Sets the dbtrNm
   *
   * @param newDbtrNm the new dbtrNm
   */

    public void  setDbtrNm(String newDbtrNm) {
        dbtrNm = newDbtrNm;
    }	  
  /**
   * Returns the padrLine
   * 
   * @return the padrLine
   */
    @Column(name = "PADRLINE")
    public String getPadrLine() {
        return padrLine;
    }	 
     
  /**
   * Sets the padrLine
   *
   * @param newPadrLine the new padrLine
   */

    public void  setPadrLine(String newPadrLine) {
        padrLine = newPadrLine;
    }	  
  /**
   * Returns the dbtrAcctId
   * 
   * @return the dbtrAcctId
   */
    @Column(name = "DBTRACCTID")
    public String getDbtrAcctId() {
        return dbtrAcctId;
    }	 
     
  /**
   * Sets the dbtrAcctId
   *
   * @param newDbtrAcctId the new dbtrAcctId
   */

    public void  setDbtrAcctId(String newDbtrAcctId) {
        dbtrAcctId = newDbtrAcctId;
    }	  
  /**
   * Returns the dbtrAcctIssr
   * 
   * @return the dbtrAcctIssr
   */
    @Column(name = "DBTRACCTISSR")
    public String getDbtrAcctIssr() {
        return dbtrAcctIssr;
    }	 
     
  /**
   * Sets the dbtrAcctIssr
   *
   * @param newDbtrAcctIssr the new dbtrAcctIssr
   */

    public void  setDbtrAcctIssr(String newDbtrAcctIssr) {
        dbtrAcctIssr = newDbtrAcctIssr;
    }	  
  /**
   * Returns the dbtrAgtBrnchId
   * 
   * @return the dbtrAgtBrnchId
   */
    @Column(name = "DBTRAGTBRNCHID")
    public String getDbtrAgtBrnchId() {
        return dbtrAgtBrnchId;
    }	 
     
  /**
   * Sets the dbtrAgtBrnchId
   *
   * @param newDbtrAgtBrnchId the new dbtrAgtBrnchId
   */

    public void  setDbtrAgtBrnchId(String newDbtrAgtBrnchId) {
        dbtrAgtBrnchId = newDbtrAgtBrnchId;
    }	  
  /**
   * Returns the cdtrAgtBrnchId
   * 
   * @return the cdtrAgtBrnchId
   */
    @Column(name = "CDTRAGTBRNCHID")
    public String getCdtrAgtBrnchId() {
        return cdtrAgtBrnchId;
    }	 
     
  /**
   * Sets the cdtrAgtBrnchId
   *
   * @param newCdtrAgtBrnchId the new cdtrAgtBrnchId
   */

    public void  setCdtrAgtBrnchId(String newCdtrAgtBrnchId) {
        cdtrAgtBrnchId = newCdtrAgtBrnchId;
    }	  
  /**
   * Returns the cdtrNm
   * 
   * @return the cdtrNm
   */
    @Column(name = "CDTRNM")
    public String getCdtrNm() {
        return cdtrNm;
    }	 
     
  /**
   * Sets the cdtrNm
   *
   * @param newCdtrNm the new cdtrNm
   */

    public void  setCdtrNm(String newCdtrNm) {
        cdtrNm = newCdtrNm;
    }	  
  /**
   * Returns the radrLine
   * 
   * @return the radrLine
   */
    @Column(name = "RADRLINE")
    public String getRadrLine() {
        return radrLine;
    }	 
     
  /**
   * Sets the radrLine
   *
   * @param newRadrLine the new radrLine
   */

    public void  setRadrLine(String newRadrLine) {
        radrLine = newRadrLine;
    }	  
  /**
   * Returns the cdtrAcctId
   * 
   * @return the cdtrAcctId
   */
    @Column(name = "CDTRACCTID")
    public String getCdtrAcctId() {
        return cdtrAcctId;
    }	 
     
  /**
   * Sets the cdtrAcctId
   *
   * @param newCdtrAcctId the new cdtrAcctId
   */

    public void  setCdtrAcctId(String newCdtrAcctId) {
        cdtrAcctId = newCdtrAcctId;
    }	  
  /**
   * Returns the cdtrAcctIssr
   * 
   * @return the cdtrAcctIssr
   */
    @Column(name = "CDTRACCTISSR")
    public String getCdtrAcctIssr() {
        return cdtrAcctIssr;
    }	 
     
  /**
   * Sets the cdtrAcctIssr
   *
   * @param newCdtrAcctIssr the new cdtrAcctIssr
   */

    public void  setCdtrAcctIssr(String newCdtrAcctIssr) {
        cdtrAcctIssr = newCdtrAcctIssr;
    }	  
  /**
   * Returns the intrBkSttlmAmt
   * 
   * @return the intrBkSttlmAmt
   */
    @Column(name = "INTRBKSTTLMAMT")
    public Double getIntrBkSttlmAmt() {
        return intrBkSttlmAmt;
    }	 
     
  /**
   * Sets the intrBkSttlmAmt
   *
   * @param newIntrBkSttlmAmt the new intrBkSttlmAmt
   */

    public void  setIntrBkSttlmAmt(Double newIntrBkSttlmAmt) {
        intrBkSttlmAmt = newIntrBkSttlmAmt;
    }	  
  /**
   * Returns the tpCdPrtry
   * 
   * @return the tpCdPrtry
   */
    @Column(name = "TPCDPRTRY")
    public String getTpCdPrtry() {
        return tpCdPrtry;
    }	 
     
  /**
   * Sets the tpCdPrtry
   *
   * @param newTpCdPrtry the new tpCdPrtry
   */

    public void  setTpCdPrtry(String newTpCdPrtry) {
        tpCdPrtry = newTpCdPrtry;
    }	  
  /**
   * Returns the tcCdPrtry
   * 
   * @return the tcCdPrtry
   */
    @Column(name = "TCCDPRTRY")
    public String getTcCdPrtry() {
        return tcCdPrtry;
    }	 
     
  /**
   * Sets the tcCdPrtry
   *
   * @param newTcCdPrtry the new tcCdPrtry
   */

    public void  setTcCdPrtry(String newTcCdPrtry) {
        tcCdPrtry = newTcCdPrtry;
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
  /**
   * Returns the ntlTrsrCdtInf
   * 
   * @return the ntlTrsrCdtInf
   */
  	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL, mappedBy = "parent")
    public java.util.Set<Beps12200101NtlTrsrCdtInf> getNtlTrsrCdtInf() {
        return ntlTrsrCdtInf;
    }	 
     
  /**
   * Sets the ntlTrsrCdtInf
   *
   * @param newNtlTrsrCdtInf the new ntlTrsrCdtInf
   */

    public void  setNtlTrsrCdtInf(java.util.Set<Beps12200101NtlTrsrCdtInf> newNtlTrsrCdtInf) {
        ntlTrsrCdtInf = newNtlTrsrCdtInf;
    }	  
  /**
   * Returns the flowNb
   * 
   * @return the flowNb
   */
    @Column(name = "FLOWNB")
    public String getFlowNb() {
        return flowNb;
    }	 
     
  /**
   * Sets the flowNb
   *
   * @param newFlowNb the new flowNb
   */

    public void  setFlowNb(String newFlowNb) {
        flowNb = newFlowNb;
    }	  
  /**
   * Returns the tlAmt
   * 
   * @return the tlAmt
   */
    @Column(name = "TLAMT")
    public Double getTlAmt() {
        return tlAmt;
    }	 
     
  /**
   * Sets the tlAmt
   *
   * @param newTlAmt the new tlAmt
   */

    public void  setTlAmt(Double newTlAmt) {
        tlAmt = newTlAmt;
    }	  
  /**
   * Returns the rptCd
   * 
   * @return the rptCd
   */
    @Column(name = "RPTCD")
    public String getRptCd() {
        return rptCd;
    }	 
     
  /**
   * Sets the rptCd
   *
   * @param newRptCd the new rptCd
   */

    public void  setRptCd(String newRptCd) {
        rptCd = newRptCd;
    }	  
  /**
   * Returns the rcvCd
   * 
   * @return the rcvCd
   */
    @Column(name = "RCVCD")
    public String getRcvCd() {
        return rcvCd;
    }	 
     
  /**
   * Sets the rcvCd
   *
   * @param newRcvCd the new rcvCd
   */

    public void  setRcvCd(String newRcvCd) {
        rcvCd = newRcvCd;
    }	  
  /**
   * Returns the rptFrms
   * 
   * @return the rptFrms
   */
    @Column(name = "RPTFRMS")
    public Date getRptFrms() {
        return rptFrms;
    }	 
     
  /**
   * Sets the rptFrms
   *
   * @param newRptFrms the new rptFrms
   */

    public void  setRptFrms(Date newRptFrms) {
        rptFrms = newRptFrms;
    }	  
  /**
   * Returns the rptNb
   * 
   * @return the rptNb
   */
    @Column(name = "RPTNB")
    public String getRptNb() {
        return rptNb;
    }	 
     
  /**
   * Sets the rptNb
   *
   * @param newRptNb the new rptNb
   */

    public void  setRptNb(String newRptNb) {
        rptNb = newRptNb;
    }	  
  /**
   * Returns the bugtLvl
   * 
   * @return the bugtLvl
   */
    @Column(name = "BUGTLVL")
    public String getBugtLvl() {
        return bugtLvl;
    }	 
     
  /**
   * Sets the bugtLvl
   *
   * @param newBugtLvl the new bugtLvl
   */

    public void  setBugtLvl(String newBugtLvl) {
        bugtLvl = newBugtLvl;
    }	  
  /**
   * Returns the ind
   * 
   * @return the ind
   */
    @Column(name = "IND")
    public String getInd() {
        return ind;
    }	 
     
  /**
   * Sets the ind
   *
   * @param newInd the new ind
   */

    public void  setInd(String newInd) {
        ind = newInd;
    }	  
  /**
   * Returns the bugtTp
   * 
   * @return the bugtTp
   */
    @Column(name = "BUGTTP")
    public String getBugtTp() {
        return bugtTp;
    }	 
     
  /**
   * Sets the bugtTp
   *
   * @param newBugtTp the new bugtTp
   */

    public void  setBugtTp(String newBugtTp) {
        bugtTp = newBugtTp;
    }	  
  /**
   * Returns the nbOfTxs
   * 
   * @return the nbOfTxs
   */
    @Column(name = "NBOFTXS")
    public String getNbOfTxs() {
        return nbOfTxs;
    }	 
     
  /**
   * Sets the nbOfTxs
   *
   * @param newNbOfTxs the new nbOfTxs
   */

    public void  setNbOfTxs(String newNbOfTxs) {
        nbOfTxs = newNbOfTxs;
    }	  
  /**
   * Returns the ntlTrsrCdtInfDtls
   * 
   * @return the ntlTrsrCdtInfDtls
   */
  	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL, mappedBy = "parent")
    public java.util.Set<Beps12200101NtlTrsrCdtInfDtls> getNtlTrsrCdtInfDtls() {
        return ntlTrsrCdtInfDtls;
    }	 
     
  /**
   * Sets the ntlTrsrCdtInfDtls
   *
   * @param newNtlTrsrCdtInfDtls the new ntlTrsrCdtInfDtls
   */

    public void  setNtlTrsrCdtInfDtls(java.util.Set<Beps12200101NtlTrsrCdtInfDtls> newNtlTrsrCdtInfDtls) {
        ntlTrsrCdtInfDtls = newNtlTrsrCdtInfDtls;
    }	  
  /**
   * Returns the ntlTrsrInf
   * 
   * @return the ntlTrsrInf
   */
  	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL, mappedBy = "parent")
    public java.util.Set<Beps12200101NtlTrsrInf> getNtlTrsrInf() {
        return ntlTrsrInf;
    }	 
     
  /**
   * Sets the ntlTrsrInf
   *
   * @param newNtlTrsrInf the new ntlTrsrInf
   */

    public void  setNtlTrsrInf(java.util.Set<Beps12200101NtlTrsrInf> newNtlTrsrInf) {
        ntlTrsrInf = newNtlTrsrInf;
    }	  
  /**
   * Returns the fisFlowNb
   * 
   * @return the fisFlowNb
   */
    @Column(name = "FISFLOWNB")
    public String getFisFlowNb() {
        return fisFlowNb;
    }	 
     
  /**
   * Sets the fisFlowNb
   *
   * @param newFisFlowNb the new fisFlowNb
   */

    public void  setFisFlowNb(String newFisFlowNb) {
        fisFlowNb = newFisFlowNb;
    }	  
  /**
   * Returns the fisDetlAmt
   * 
   * @return the fisDetlAmt
   */
    @Column(name = "FISDETLAMT")
    public Double getFisDetlAmt() {
        return fisDetlAmt;
    }	 
     
  /**
   * Sets the fisDetlAmt
   *
   * @param newFisDetlAmt the new fisDetlAmt
   */

    public void  setFisDetlAmt(Double newFisDetlAmt) {
        fisDetlAmt = newFisDetlAmt;
    }	  
  /**
   * Returns the fisRptCd
   * 
   * @return the fisRptCd
   */
    @Column(name = "FISRPTCD")
    public String getFisRptCd() {
        return fisRptCd;
    }	 
     
  /**
   * Sets the fisRptCd
   *
   * @param newFisRptCd the new fisRptCd
   */

    public void  setFisRptCd(String newFisRptCd) {
        fisRptCd = newFisRptCd;
    }	  
  /**
   * Returns the fisRcvCd
   * 
   * @return the fisRcvCd
   */
    @Column(name = "FISRCVCD")
    public String getFisRcvCd() {
        return fisRcvCd;
    }	 
     
  /**
   * Sets the fisRcvCd
   *
   * @param newFisRcvCd the new fisRcvCd
   */

    public void  setFisRcvCd(String newFisRcvCd) {
        fisRcvCd = newFisRcvCd;
    }	  
  /**
   * Returns the fisRptFrms
   * 
   * @return the fisRptFrms
   */
    @Column(name = "FISRPTFRMS")
    public Date getFisRptFrms() {
        return fisRptFrms;
    }	 
     
  /**
   * Sets the fisRptFrms
   *
   * @param newFisRptFrms the new fisRptFrms
   */

    public void  setFisRptFrms(Date newFisRptFrms) {
        fisRptFrms = newFisRptFrms;
    }	  
  /**
   * Returns the fisRptNb
   * 
   * @return the fisRptNb
   */
    @Column(name = "FISRPTNB")
    public String getFisRptNb() {
        return fisRptNb;
    }	 
     
  /**
   * Sets the fisRptNb
   *
   * @param newFisRptNb the new fisRptNb
   */

    public void  setFisRptNb(String newFisRptNb) {
        fisRptNb = newFisRptNb;
    }	  
  /**
   * Returns the fisNbOfTxs
   * 
   * @return the fisNbOfTxs
   */
    @Column(name = "FISNBOFTXS")
    public String getFisNbOfTxs() {
        return fisNbOfTxs;
    }	 
     
  /**
   * Sets the fisNbOfTxs
   *
   * @param newFisNbOfTxs the new fisNbOfTxs
   */

    public void  setFisNbOfTxs(String newFisNbOfTxs) {
        fisNbOfTxs = newFisNbOfTxs;
    }	  
  /**
   * Returns the ntlTrsrInfDtls
   * 
   * @return the ntlTrsrInfDtls
   */
  	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL, mappedBy = "parent")
    public java.util.Set<Beps12200101NtlTrsrInfDtls> getNtlTrsrInfDtls() {
        return ntlTrsrInfDtls;
    }	 
     
  /**
   * Sets the ntlTrsrInfDtls
   *
   * @param newNtlTrsrInfDtls the new ntlTrsrInfDtls
   */

    public void  setNtlTrsrInfDtls(java.util.Set<Beps12200101NtlTrsrInfDtls> newNtlTrsrInfDtls) {
        ntlTrsrInfDtls = newNtlTrsrInfDtls;
    }	  
    
    
}    
    
