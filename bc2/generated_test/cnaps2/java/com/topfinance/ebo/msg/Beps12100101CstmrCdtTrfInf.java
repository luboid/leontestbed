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
 * Beps12100101CstmrCdtTrfInf generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_MSG_BEPS_121_001_01___CstmrCdtTrfInf")
public class Beps12100101CstmrCdtTrfInf  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].txId")
    private String txId;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].dbtr.nm")
    private String dbtrNm;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].dbtr.pstlAdr.adrLine")
    private String padrLine;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].dbtrAcct.id.othr.id")
    private String dbtrAcctId;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].dbtrAcct.id.othr.issr")
    private String dbtrAcctIssr;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].dbtrAgt.brnchId.id")
    private String dbtrAgtBrnchId;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cdtrAgt.brnchId.id")
    private String cdtrAgtBrnchId;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cdtr.nm")
    private String cdtrNm;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cdtr.pstlAdr.adrLine")
    private String radrLine;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cdtrAcct.id.othr.id")
    private String cdtrAcctId;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cdtrAcct.id.othr.issr")
    private String cdtrAcctIssr;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].amt.value")
    private Double intrBkSttlmAmt;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].pmtTpInf.ctgyPurp.prtry")
    private String bizTpCd;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].purp.prtry")
    private String bizTcCd;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].addtlInf")
    private String addtlInf;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.colltnInf.tp")
    private String infoTp;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.colltnInf.dt")
    private Date infoDt;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.colltnInf.nb")
    private String infoNb;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.colltnWthAccptncInf.dt")
    private Date acceptDt;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.colltnWthAccptncInf.nb")
    private String acceptNb;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.colltnWthAccptncInf.amdsAmt.value")
    private Double amdsAmt;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.colltnWthAccptncInf.rctAmt.value")
    private Double rctAmt;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.ntlTrsrInf.fslInf.flowNb")
    private String flowNb;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.ntlTrsrInf.fslInf.amt.value")
    private Double amt;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.ntlTrsrInf.fslInf.rptCd")
    private String rptCd;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.ntlTrsrInf.fslInf.rcvCd")
    private String rcvCd;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.ntlTrsrInf.fslInf.rptFrms")
    private Date rptFrms;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.ntlTrsrInf.fslInf.rptNb")
    private String rptNb;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.ntlTrsrInf.nbOfTxs")
    private String nbOfTxs;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.ntlTrsrInf.ntlTrsrInfDtls[0]")
    private java.util.Set<Beps12100101NtlTrsrInfDtls> ntlTrsrInfDtls;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.pmtInf.flowNb")
    private String flowNb1;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.pmtInf.term")
    private String term;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.pmtInf.tp")
    private String tp;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.pmtInf.rmk")
    private String rmk;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.rtrInf")
    private java.util.Set<Beps12100101RtrInf> rtrInf;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.rtrInf.orgnlGrpHdr.orgnlMsgId")
    private String orgnlMsgId;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.rtrInf.orgnlGrpHdr.orgnlInstgPty")
    private String orgnlInstgDrctPty;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.rtrInf.orgnlGrpHdr.orgnlMsgTp")
    private String orgnlMT;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.rtrInf.orgnlTx.instgIndrctPty")
    private String instgIndrctPty;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.rtrInf.orgnlTx.instdIndrctPty")
    private String instdIndrctPty;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.rtrInf.orgnlTx.orgnlTxId")
    private String orgnlTxId;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.rtrInf.orgnlTx.orgnlTxTpCd")
    private String orgnlTxTpCd;
    
    @JaxbMapping(objPath="cstmrCdtTrf.cstmrCdtTrfInf[0].cstmrCdtTrfAddtlInf.rtrInf.cnts")
    private String cntt;
    
    
	
    /** default constructor */
    public Beps12100101CstmrCdtTrfInf() {
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
   * Returns the bizTpCd
   * 
   * @return the bizTpCd
   */
    @Column(name = "BIZTPCD")
    public String getBizTpCd() {
        return bizTpCd;
    }	 
     
  /**
   * Sets the bizTpCd
   *
   * @param newBizTpCd the new bizTpCd
   */

    public void  setBizTpCd(String newBizTpCd) {
        bizTpCd = newBizTpCd;
    }	  
  /**
   * Returns the bizTcCd
   * 
   * @return the bizTcCd
   */
    @Column(name = "BIZTCCD")
    public String getBizTcCd() {
        return bizTcCd;
    }	 
     
  /**
   * Sets the bizTcCd
   *
   * @param newBizTcCd the new bizTcCd
   */

    public void  setBizTcCd(String newBizTcCd) {
        bizTcCd = newBizTcCd;
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
   * Returns the infoTp
   * 
   * @return the infoTp
   */
    @Column(name = "INFOTP")
    public String getInfoTp() {
        return infoTp;
    }	 
     
  /**
   * Sets the infoTp
   *
   * @param newInfoTp the new infoTp
   */

    public void  setInfoTp(String newInfoTp) {
        infoTp = newInfoTp;
    }	  
  /**
   * Returns the infoDt
   * 
   * @return the infoDt
   */
    @Column(name = "INFODT")
    public Date getInfoDt() {
        return infoDt;
    }	 
     
  /**
   * Sets the infoDt
   *
   * @param newInfoDt the new infoDt
   */

    public void  setInfoDt(Date newInfoDt) {
        infoDt = newInfoDt;
    }	  
  /**
   * Returns the infoNb
   * 
   * @return the infoNb
   */
    @Column(name = "INFONB")
    public String getInfoNb() {
        return infoNb;
    }	 
     
  /**
   * Sets the infoNb
   *
   * @param newInfoNb the new infoNb
   */

    public void  setInfoNb(String newInfoNb) {
        infoNb = newInfoNb;
    }	  
  /**
   * Returns the acceptDt
   * 
   * @return the acceptDt
   */
    @Column(name = "ACCEPTDT")
    public Date getAcceptDt() {
        return acceptDt;
    }	 
     
  /**
   * Sets the acceptDt
   *
   * @param newAcceptDt the new acceptDt
   */

    public void  setAcceptDt(Date newAcceptDt) {
        acceptDt = newAcceptDt;
    }	  
  /**
   * Returns the acceptNb
   * 
   * @return the acceptNb
   */
    @Column(name = "ACCEPTNB")
    public String getAcceptNb() {
        return acceptNb;
    }	 
     
  /**
   * Sets the acceptNb
   *
   * @param newAcceptNb the new acceptNb
   */

    public void  setAcceptNb(String newAcceptNb) {
        acceptNb = newAcceptNb;
    }	  
  /**
   * Returns the amdsAmt
   * 
   * @return the amdsAmt
   */
    @Column(name = "AMDSAMT")
    public Double getAmdsAmt() {
        return amdsAmt;
    }	 
     
  /**
   * Sets the amdsAmt
   *
   * @param newAmdsAmt the new amdsAmt
   */

    public void  setAmdsAmt(Double newAmdsAmt) {
        amdsAmt = newAmdsAmt;
    }	  
  /**
   * Returns the rctAmt
   * 
   * @return the rctAmt
   */
    @Column(name = "RCTAMT")
    public Double getRctAmt() {
        return rctAmt;
    }	 
     
  /**
   * Sets the rctAmt
   *
   * @param newRctAmt the new rctAmt
   */

    public void  setRctAmt(Double newRctAmt) {
        rctAmt = newRctAmt;
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
   * Returns the ntlTrsrInfDtls
   * 
   * @return the ntlTrsrInfDtls
   */
  	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL, mappedBy = "parent")
    public java.util.Set<Beps12100101NtlTrsrInfDtls> getNtlTrsrInfDtls() {
        return ntlTrsrInfDtls;
    }	 
     
  /**
   * Sets the ntlTrsrInfDtls
   *
   * @param newNtlTrsrInfDtls the new ntlTrsrInfDtls
   */

    public void  setNtlTrsrInfDtls(java.util.Set<Beps12100101NtlTrsrInfDtls> newNtlTrsrInfDtls) {
        ntlTrsrInfDtls = newNtlTrsrInfDtls;
    }	  
  /**
   * Returns the flowNb1
   * 
   * @return the flowNb1
   */
    @Column(name = "FLOWNB1")
    public String getFlowNb1() {
        return flowNb1;
    }	 
     
  /**
   * Sets the flowNb1
   *
   * @param newFlowNb1 the new flowNb1
   */

    public void  setFlowNb1(String newFlowNb1) {
        flowNb1 = newFlowNb1;
    }	  
  /**
   * Returns the term
   * 
   * @return the term
   */
    @Column(name = "TERM")
    public String getTerm() {
        return term;
    }	 
     
  /**
   * Sets the term
   *
   * @param newTerm the new term
   */

    public void  setTerm(String newTerm) {
        term = newTerm;
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
   * Returns the rtrInf
   * 
   * @return the rtrInf
   */
  	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL, mappedBy = "parent")
    public java.util.Set<Beps12100101RtrInf> getRtrInf() {
        return rtrInf;
    }	 
     
  /**
   * Sets the rtrInf
   *
   * @param newRtrInf the new rtrInf
   */

    public void  setRtrInf(java.util.Set<Beps12100101RtrInf> newRtrInf) {
        rtrInf = newRtrInf;
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
   * Returns the orgnlInstgDrctPty
   * 
   * @return the orgnlInstgDrctPty
   */
    @Column(name = "ORGNLINSTGDRCTPTY")
    public String getOrgnlInstgDrctPty() {
        return orgnlInstgDrctPty;
    }	 
     
  /**
   * Sets the orgnlInstgDrctPty
   *
   * @param newOrgnlInstgDrctPty the new orgnlInstgDrctPty
   */

    public void  setOrgnlInstgDrctPty(String newOrgnlInstgDrctPty) {
        orgnlInstgDrctPty = newOrgnlInstgDrctPty;
    }	  
  /**
   * Returns the orgnlMT
   * 
   * @return the orgnlMT
   */
    @Column(name = "ORGNLMT")
    public String getOrgnlMT() {
        return orgnlMT;
    }	 
     
  /**
   * Sets the orgnlMT
   *
   * @param newOrgnlMT the new orgnlMT
   */

    public void  setOrgnlMT(String newOrgnlMT) {
        orgnlMT = newOrgnlMT;
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
   * Returns the orgnlTxId
   * 
   * @return the orgnlTxId
   */
    @Column(name = "ORGNLTXID")
    public String getOrgnlTxId() {
        return orgnlTxId;
    }	 
     
  /**
   * Sets the orgnlTxId
   *
   * @param newOrgnlTxId the new orgnlTxId
   */

    public void  setOrgnlTxId(String newOrgnlTxId) {
        orgnlTxId = newOrgnlTxId;
    }	  
  /**
   * Returns the orgnlTxTpCd
   * 
   * @return the orgnlTxTpCd
   */
    @Column(name = "ORGNLTXTPCD")
    public String getOrgnlTxTpCd() {
        return orgnlTxTpCd;
    }	 
     
  /**
   * Sets the orgnlTxTpCd
   *
   * @param newOrgnlTxTpCd the new orgnlTxTpCd
   */

    public void  setOrgnlTxTpCd(String newOrgnlTxTpCd) {
        orgnlTxTpCd = newOrgnlTxTpCd;
    }	  
  /**
   * Returns the cntt
   * 
   * @return the cntt
   */
    @Column(name = "CNTT")
    public String getCntt() {
        return cntt;
    }	 
     
  /**
   * Sets the cntt
   *
   * @param newCntt the new cntt
   */

    public void  setCntt(String newCntt) {
        cntt = newCntt;
    }	  
    
    
}    
    
