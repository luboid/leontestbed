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
 * Nets35600101Hdr generated by ParseSampleXml
 */
 
@Entity
@Table(name = "T_C2_NETS_356_HDR")
public class Nets35600101Hdr  implements java.io.Serializable {

    // Fields 
    @JaxbMapping(objPath="")
    private Integer id;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.grpHdr.msgId")
    private String msgId;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.grpHdr.creDtTm")
    private Date creDtTm;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.grpHdr.instgPty.instgDrctPty")
    private String instgDrctPty;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.grpHdr.instgPty.instgPty")
    private String instgIndrctPty;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.grpHdr.instdPty.instdDrctPty")
    private String instdDrctPty;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.grpHdr.instdPty.instdPty")
    private String instdIndrctPty;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.grpHdr.sysCd")
    private String sysCd;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.grpHdr.rmk")
    private String rmk;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.netDbtLmtMgmtNtfctnInf.ntfctnTp")
    private String ntfctnTp;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.netDbtMgmt.oprClss")
    private String nmOprClss;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.netDbtMgmt.oprTp")
    private String nmOprTp;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.netDbtMgmt.netDbtLmtInf.mmbId")
    private String nmMmbId;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.netDbtMgmt.netDbtLmtInf.cdtLd.value")
    private Double nmCdtLd;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.netDbtMgmt.netDbtLmtInf.ttlPldgVal.value")
    private Double nmTtlPldgVal;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.netDbtMgmt.netDbtLmtInf.cdtXtnsnLmt.value")
    private Double nmCdtXtnsnLmt;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.netDbtMgmt.netDbtLmtInf.netDbtLmt.value")
    private Double nmNetDbtLmt;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.netDbtMgmt.netDbtLmtInf.avlblNetDbt.value")
    private Double nmAvlblNetDbt;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.netDbtWrngSetng.swtchTp")
    private Double nwSwtchTp;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.netDbtWrngSetng.mmbId")
    private String mmbId;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.rclmPldg.mmbId")
    private String rpMmbId;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.netDbtWrngSetng.avlblNetDbtWrngVal.value")
    private Double nwAvlblNetDbtWrngVal;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.rclmPldg.dstrbtnPldgVal.value")
    private Double rpDstrbtnPldgVal;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.cdtXtnsnMgmt.mgrId")
    private String cmMgrId;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.cdtXtnsnMgmt.ntfctnTp")
    private String cmNtfctnTp;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.cdtXtnsnMgmt.orgnlNotDstrbtn.value")
    private Double cmOrgnlNotDstrbtn;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.cdtXtnsnMgmt.orgnlIsDstrbtn.value")
    private Double cmOrgnlIsDstrbtn;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.cdtXtnsnMgmt.notDstrbtn.value")
    private Double cmNotDstrbtn;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.cdtXtnsnMgmt.isDstrbtn.value")
    private Double cmIsDstrbtn;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.forceDwnErr.mgrId")
    private String fdMgrId;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.forceDwnErr.orgnlNotDstrbtn.value")
    private Double fdOrgnlNotDstrbtn;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.forceDwnErr.orgnlIsDstrbtn.value")
    private Double fdOrgnlIsDstrbtn;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.forceDwnErr.forceDwn.value")
    private Double fdForceDwn;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.forceDwnErr.brnchQty")
    private String fdBrnchQty;
    
    @JaxbMapping(objPath="netDbtLmtMgmtNtfctn.ntfctnCntt.forceDwnErr.dstrbtnList[0]")
    private java.util.Set<Nets35600101> fdDstrbtnList;
    
    
	
    /** default constructor */
    public Nets35600101Hdr() {
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
   * Returns the ntfctnTp
   * 
   * @return the ntfctnTp
   */
    @Column(name = "NTFCTNTP")
    public String getNtfctnTp() {
        return ntfctnTp;
    }	 
     
  /**
   * Sets the ntfctnTp
   *
   * @param newNtfctnTp the new ntfctnTp
   */

    public void  setNtfctnTp(String newNtfctnTp) {
        ntfctnTp = newNtfctnTp;
    }	  
  /**
   * Returns the nmOprClss
   * 
   * @return the nmOprClss
   */
    @Column(name = "NMOPRCLSS")
    public String getNmOprClss() {
        return nmOprClss;
    }	 
     
  /**
   * Sets the nmOprClss
   *
   * @param newNmOprClss the new nmOprClss
   */

    public void  setNmOprClss(String newNmOprClss) {
        nmOprClss = newNmOprClss;
    }	  
  /**
   * Returns the nmOprTp
   * 
   * @return the nmOprTp
   */
    @Column(name = "NMOPRTP")
    public String getNmOprTp() {
        return nmOprTp;
    }	 
     
  /**
   * Sets the nmOprTp
   *
   * @param newNmOprTp the new nmOprTp
   */

    public void  setNmOprTp(String newNmOprTp) {
        nmOprTp = newNmOprTp;
    }	  
  /**
   * Returns the nmMmbId
   * 
   * @return the nmMmbId
   */
    @Column(name = "NMMMBID")
    public String getNmMmbId() {
        return nmMmbId;
    }	 
     
  /**
   * Sets the nmMmbId
   *
   * @param newNmMmbId the new nmMmbId
   */

    public void  setNmMmbId(String newNmMmbId) {
        nmMmbId = newNmMmbId;
    }	  
  /**
   * Returns the nmCdtLd
   * 
   * @return the nmCdtLd
   */
    @Column(name = "NMCDTLD")
    public Double getNmCdtLd() {
        return nmCdtLd;
    }	 
     
  /**
   * Sets the nmCdtLd
   *
   * @param newNmCdtLd the new nmCdtLd
   */

    public void  setNmCdtLd(Double newNmCdtLd) {
        nmCdtLd = newNmCdtLd;
    }	  
  /**
   * Returns the nmTtlPldgVal
   * 
   * @return the nmTtlPldgVal
   */
    @Column(name = "NMTTLPLDGVAL")
    public Double getNmTtlPldgVal() {
        return nmTtlPldgVal;
    }	 
     
  /**
   * Sets the nmTtlPldgVal
   *
   * @param newNmTtlPldgVal the new nmTtlPldgVal
   */

    public void  setNmTtlPldgVal(Double newNmTtlPldgVal) {
        nmTtlPldgVal = newNmTtlPldgVal;
    }	  
  /**
   * Returns the nmCdtXtnsnLmt
   * 
   * @return the nmCdtXtnsnLmt
   */
    @Column(name = "NMCDTXTNSNLMT")
    public Double getNmCdtXtnsnLmt() {
        return nmCdtXtnsnLmt;
    }	 
     
  /**
   * Sets the nmCdtXtnsnLmt
   *
   * @param newNmCdtXtnsnLmt the new nmCdtXtnsnLmt
   */

    public void  setNmCdtXtnsnLmt(Double newNmCdtXtnsnLmt) {
        nmCdtXtnsnLmt = newNmCdtXtnsnLmt;
    }	  
  /**
   * Returns the nmNetDbtLmt
   * 
   * @return the nmNetDbtLmt
   */
    @Column(name = "NMNETDBTLMT")
    public Double getNmNetDbtLmt() {
        return nmNetDbtLmt;
    }	 
     
  /**
   * Sets the nmNetDbtLmt
   *
   * @param newNmNetDbtLmt the new nmNetDbtLmt
   */

    public void  setNmNetDbtLmt(Double newNmNetDbtLmt) {
        nmNetDbtLmt = newNmNetDbtLmt;
    }	  
  /**
   * Returns the nmAvlblNetDbt
   * 
   * @return the nmAvlblNetDbt
   */
    @Column(name = "NMAVLBLNETDBT")
    public Double getNmAvlblNetDbt() {
        return nmAvlblNetDbt;
    }	 
     
  /**
   * Sets the nmAvlblNetDbt
   *
   * @param newNmAvlblNetDbt the new nmAvlblNetDbt
   */

    public void  setNmAvlblNetDbt(Double newNmAvlblNetDbt) {
        nmAvlblNetDbt = newNmAvlblNetDbt;
    }	  
  /**
   * Returns the nwSwtchTp
   * 
   * @return the nwSwtchTp
   */
    @Column(name = "NWSWTCHTP")
    public Double getNwSwtchTp() {
        return nwSwtchTp;
    }	 
     
  /**
   * Sets the nwSwtchTp
   *
   * @param newNwSwtchTp the new nwSwtchTp
   */

    public void  setNwSwtchTp(Double newNwSwtchTp) {
        nwSwtchTp = newNwSwtchTp;
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
   * Returns the rpMmbId
   * 
   * @return the rpMmbId
   */
    @Column(name = "RPMMBID")
    public String getRpMmbId() {
        return rpMmbId;
    }	 
     
  /**
   * Sets the rpMmbId
   *
   * @param newRpMmbId the new rpMmbId
   */

    public void  setRpMmbId(String newRpMmbId) {
        rpMmbId = newRpMmbId;
    }	  
  /**
   * Returns the nwAvlblNetDbtWrngVal
   * 
   * @return the nwAvlblNetDbtWrngVal
   */
    @Column(name = "NWAVLBLNETDBTWRNGVAL")
    public Double getNwAvlblNetDbtWrngVal() {
        return nwAvlblNetDbtWrngVal;
    }	 
     
  /**
   * Sets the nwAvlblNetDbtWrngVal
   *
   * @param newNwAvlblNetDbtWrngVal the new nwAvlblNetDbtWrngVal
   */

    public void  setNwAvlblNetDbtWrngVal(Double newNwAvlblNetDbtWrngVal) {
        nwAvlblNetDbtWrngVal = newNwAvlblNetDbtWrngVal;
    }	  
  /**
   * Returns the rpDstrbtnPldgVal
   * 
   * @return the rpDstrbtnPldgVal
   */
    @Column(name = "RPDSTRBTNPLDGVAL")
    public Double getRpDstrbtnPldgVal() {
        return rpDstrbtnPldgVal;
    }	 
     
  /**
   * Sets the rpDstrbtnPldgVal
   *
   * @param newRpDstrbtnPldgVal the new rpDstrbtnPldgVal
   */

    public void  setRpDstrbtnPldgVal(Double newRpDstrbtnPldgVal) {
        rpDstrbtnPldgVal = newRpDstrbtnPldgVal;
    }	  
  /**
   * Returns the cmMgrId
   * 
   * @return the cmMgrId
   */
    @Column(name = "CMMGRID")
    public String getCmMgrId() {
        return cmMgrId;
    }	 
     
  /**
   * Sets the cmMgrId
   *
   * @param newCmMgrId the new cmMgrId
   */

    public void  setCmMgrId(String newCmMgrId) {
        cmMgrId = newCmMgrId;
    }	  
  /**
   * Returns the cmNtfctnTp
   * 
   * @return the cmNtfctnTp
   */
    @Column(name = "CMNTFCTNTP")
    public String getCmNtfctnTp() {
        return cmNtfctnTp;
    }	 
     
  /**
   * Sets the cmNtfctnTp
   *
   * @param newCmNtfctnTp the new cmNtfctnTp
   */

    public void  setCmNtfctnTp(String newCmNtfctnTp) {
        cmNtfctnTp = newCmNtfctnTp;
    }	  
  /**
   * Returns the cmOrgnlNotDstrbtn
   * 
   * @return the cmOrgnlNotDstrbtn
   */
    @Column(name = "CMORGNLNOTDSTRBTN")
    public Double getCmOrgnlNotDstrbtn() {
        return cmOrgnlNotDstrbtn;
    }	 
     
  /**
   * Sets the cmOrgnlNotDstrbtn
   *
   * @param newCmOrgnlNotDstrbtn the new cmOrgnlNotDstrbtn
   */

    public void  setCmOrgnlNotDstrbtn(Double newCmOrgnlNotDstrbtn) {
        cmOrgnlNotDstrbtn = newCmOrgnlNotDstrbtn;
    }	  
  /**
   * Returns the cmOrgnlIsDstrbtn
   * 
   * @return the cmOrgnlIsDstrbtn
   */
    @Column(name = "CMORGNLISDSTRBTN")
    public Double getCmOrgnlIsDstrbtn() {
        return cmOrgnlIsDstrbtn;
    }	 
     
  /**
   * Sets the cmOrgnlIsDstrbtn
   *
   * @param newCmOrgnlIsDstrbtn the new cmOrgnlIsDstrbtn
   */

    public void  setCmOrgnlIsDstrbtn(Double newCmOrgnlIsDstrbtn) {
        cmOrgnlIsDstrbtn = newCmOrgnlIsDstrbtn;
    }	  
  /**
   * Returns the cmNotDstrbtn
   * 
   * @return the cmNotDstrbtn
   */
    @Column(name = "CMNOTDSTRBTN")
    public Double getCmNotDstrbtn() {
        return cmNotDstrbtn;
    }	 
     
  /**
   * Sets the cmNotDstrbtn
   *
   * @param newCmNotDstrbtn the new cmNotDstrbtn
   */

    public void  setCmNotDstrbtn(Double newCmNotDstrbtn) {
        cmNotDstrbtn = newCmNotDstrbtn;
    }	  
  /**
   * Returns the cmIsDstrbtn
   * 
   * @return the cmIsDstrbtn
   */
    @Column(name = "CMISDSTRBTN")
    public Double getCmIsDstrbtn() {
        return cmIsDstrbtn;
    }	 
     
  /**
   * Sets the cmIsDstrbtn
   *
   * @param newCmIsDstrbtn the new cmIsDstrbtn
   */

    public void  setCmIsDstrbtn(Double newCmIsDstrbtn) {
        cmIsDstrbtn = newCmIsDstrbtn;
    }	  
  /**
   * Returns the fdMgrId
   * 
   * @return the fdMgrId
   */
    @Column(name = "FDMGRID")
    public String getFdMgrId() {
        return fdMgrId;
    }	 
     
  /**
   * Sets the fdMgrId
   *
   * @param newFdMgrId the new fdMgrId
   */

    public void  setFdMgrId(String newFdMgrId) {
        fdMgrId = newFdMgrId;
    }	  
  /**
   * Returns the fdOrgnlNotDstrbtn
   * 
   * @return the fdOrgnlNotDstrbtn
   */
    @Column(name = "FDORGNLNOTDSTRBTN")
    public Double getFdOrgnlNotDstrbtn() {
        return fdOrgnlNotDstrbtn;
    }	 
     
  /**
   * Sets the fdOrgnlNotDstrbtn
   *
   * @param newFdOrgnlNotDstrbtn the new fdOrgnlNotDstrbtn
   */

    public void  setFdOrgnlNotDstrbtn(Double newFdOrgnlNotDstrbtn) {
        fdOrgnlNotDstrbtn = newFdOrgnlNotDstrbtn;
    }	  
  /**
   * Returns the fdOrgnlIsDstrbtn
   * 
   * @return the fdOrgnlIsDstrbtn
   */
    @Column(name = "FDORGNLISDSTRBTN")
    public Double getFdOrgnlIsDstrbtn() {
        return fdOrgnlIsDstrbtn;
    }	 
     
  /**
   * Sets the fdOrgnlIsDstrbtn
   *
   * @param newFdOrgnlIsDstrbtn the new fdOrgnlIsDstrbtn
   */

    public void  setFdOrgnlIsDstrbtn(Double newFdOrgnlIsDstrbtn) {
        fdOrgnlIsDstrbtn = newFdOrgnlIsDstrbtn;
    }	  
  /**
   * Returns the fdForceDwn
   * 
   * @return the fdForceDwn
   */
    @Column(name = "FDFORCEDWN")
    public Double getFdForceDwn() {
        return fdForceDwn;
    }	 
     
  /**
   * Sets the fdForceDwn
   *
   * @param newFdForceDwn the new fdForceDwn
   */

    public void  setFdForceDwn(Double newFdForceDwn) {
        fdForceDwn = newFdForceDwn;
    }	  
  /**
   * Returns the fdBrnchQty
   * 
   * @return the fdBrnchQty
   */
    @Column(name = "FDBRNCHQTY")
    public String getFdBrnchQty() {
        return fdBrnchQty;
    }	 
     
  /**
   * Sets the fdBrnchQty
   *
   * @param newFdBrnchQty the new fdBrnchQty
   */

    public void  setFdBrnchQty(String newFdBrnchQty) {
        fdBrnchQty = newFdBrnchQty;
    }	  
  /**
   * Returns the fdDstrbtnList
   * 
   * @return the fdDstrbtnList
   */
  	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL, mappedBy = "fid")
    public java.util.Set<Nets35600101> getFdDstrbtnList() {
        return fdDstrbtnList;
    }	 
     
  /**
   * Sets the fdDstrbtnList
   *
   * @param newFdDstrbtnList the new fdDstrbtnList
   */

    public void  setFdDstrbtnList(java.util.Set<Nets35600101> newFdDstrbtnList) {
        fdDstrbtnList = newFdDstrbtnList;
    }	  
    
    
}    
    
