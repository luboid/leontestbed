package com.tibco.cmidemo.hibernate;

import java.io.Serializable;
import java.util.Date;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/** 
 *        @hibernate.class
 *         table="gi_protbindview"
 *     
*/
public class GiProtbindview extends ModelObject implements Serializable {

    /** identifier field */
    private Long binindex;

    /** nullable persistent field */
    private String type;

    /** persistent field */
    private Long tpBinindex;

    /** persistent field */
    private Long pbBinindex;

    /** nullable persistent field */
    private Integer overrideEp;

    /** nullable persistent field */
    private Long DBinindex;

    /** nullable persistent field */
    private Long as2Binindex;

    /** persistent field */
    private Long trBinindex;

    /** nullable persistent field */
    private Long bacBinindex;

    /** nullable persistent field */
    private Long errBinindex;

    /** nullable persistent field */
    private Long as2Repbinindex;

    /** nullable persistent field */
    private Long as2Rembinindex;

    /** nullable persistent field */
    private Long pk1Binindex;

    /** nullable persistent field */
    private Long pk2Binindex;

    /** nullable persistent field */
    private Date lastmodified;

    /** full constructor */
    public GiProtbindview(String type, Long tpBinindex, Long pbBinindex, Integer overrideEp, Long DBinindex, Long as2Binindex, Long trBinindex, Long bacBinindex, Long errBinindex, Long as2Repbinindex, Long as2Rembinindex, Long pk1Binindex, Long pk2Binindex, Date lastmodified) {
        this.type = type;
        this.tpBinindex = tpBinindex;
        this.pbBinindex = pbBinindex;
        this.overrideEp = overrideEp;
        this.DBinindex = DBinindex;
        this.as2Binindex = as2Binindex;
        this.trBinindex = trBinindex;
        this.bacBinindex = bacBinindex;
        this.errBinindex = errBinindex;
        this.as2Repbinindex = as2Repbinindex;
        this.as2Rembinindex = as2Rembinindex;
        this.pk1Binindex = pk1Binindex;
        this.pk2Binindex = pk2Binindex;
        this.lastmodified = lastmodified;
    }

    /** default constructor */
    public GiProtbindview() {
    }

    /** minimal constructor */
    public GiProtbindview(Long tpBinindex, Long pbBinindex, Long trBinindex) {
        this.tpBinindex = tpBinindex;
        this.pbBinindex = pbBinindex;
        this.trBinindex = trBinindex;
    }

    /** 
     *            @hibernate.id
     *             generator-class="identity"
     *             type="java.lang.Long"
     *             column="BININDEX"
     *             unsaved-value="0"
     *         
     */
    public Long getBinindex() {
        return this.binindex;
    }

    public void setBinindex(Long binindex) {
        this.binindex = binindex;
    }

    /** 
     *            @hibernate.property
     *             column="TYPE"
     *             length="20"
     *         
     */
    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    /** 
     *            @hibernate.property
     *             column="TP_BININDEX"
     *             length="18"
     *             not-null="false"
     *         
     */
    public Long getTpBinindex() {
        return this.tpBinindex;
    }

    public void setTpBinindex(Long tpBinindex) {
        this.tpBinindex = tpBinindex;
    }

    /** 
     *            @hibernate.property
     *             column="PB_BININDEX"
     *             length="18"
     *             not-null="true"
     *         
     */
    public Long getPbBinindex() {
        return this.pbBinindex;
    }

    public void setPbBinindex(Long pbBinindex) {
        this.pbBinindex = pbBinindex;
    }

    /** 
     *            @hibernate.property
     *             column="OVERRIDE_EP"
     *             length="18"
     *         
     */
    public Integer getOverrideEp() {
        return this.overrideEp;
    }

    public void setOverrideEp(Integer overrideEp) {
        this.overrideEp = overrideEp;
    }

    /** 
     *            @hibernate.property
     *             column="D_BININDEX"
     *             length="18"
     *         
     */
    public Long getDBinindex() {
        return this.DBinindex;
    }

    public void setDBinindex(Long DBinindex) {
        this.DBinindex = DBinindex;
    }

    /** 
     *            @hibernate.property
     *             column="AS2_BININDEX"
     *             length="18"
     *         
     */
    public Long getAs2Binindex() {
        return this.as2Binindex;
    }

    public void setAs2Binindex(Long as2Binindex) {
        this.as2Binindex = as2Binindex;
    }

    /** 
     *            @hibernate.property
     *             column="TR_BININDEX"
     *             length="18"
     *             not-null="false"
     *         
     */
    public Long getTrBinindex() {
        return this.trBinindex;
    }

    public void setTrBinindex(Long trBinindex) {
        this.trBinindex = trBinindex;
    }

    /** 
     *            @hibernate.property
     *             column="BAC_BININDEX"
     *             length="18"
     *         
     */
    public Long getBacBinindex() {
        return this.bacBinindex;
    }

    public void setBacBinindex(Long bacBinindex) {
        this.bacBinindex = bacBinindex;
    }

    /** 
     *            @hibernate.property
     *             column="ERR_BININDEX"
     *             length="18"
     *         
     */
    public Long getErrBinindex() {
        return this.errBinindex;
    }

    public void setErrBinindex(Long errBinindex) {
        this.errBinindex = errBinindex;
    }

    /** 
     *            @hibernate.property
     *             column="AS2_REPBININDEX"
     *             length="18"
     *         
     */
    public Long getAs2Repbinindex() {
        return this.as2Repbinindex;
    }

    public void setAs2Repbinindex(Long as2Repbinindex) {
        this.as2Repbinindex = as2Repbinindex;
    }

    /** 
     *            @hibernate.property
     *             column="AS2_REMBININDEX"
     *             length="18"
     *         
     */
    public Long getAs2Rembinindex() {
        return this.as2Rembinindex;
    }

    public void setAs2Rembinindex(Long as2Rembinindex) {
        this.as2Rembinindex = as2Rembinindex;
    }

    /** 
     *            @hibernate.property
     *             column="PK1_BININDEX"
     *             length="18"
     *         
     */
    public Long getPk1Binindex() {
        return this.pk1Binindex;
    }

    public void setPk1Binindex(Long pk1Binindex) {
        this.pk1Binindex = pk1Binindex;
    }

    /** 
     *            @hibernate.property
     *             column="PK2_BININDEX"
     *             length="18"
     *         
     */
    public Long getPk2Binindex() {
        return this.pk2Binindex;
    }

    public void setPk2Binindex(Long pk2Binindex) {
        this.pk2Binindex = pk2Binindex;
    }

    /** 
     *            @hibernate.property
     *             column="LASTMODIFIED"
     *             update="false"
     *             insert="false"
     *             length="19"
     *         
     */
    public Date getLastmodified() {
        return this.lastmodified;
    }

    public void setLastmodified(Date lastmodified) {
        this.lastmodified = lastmodified;
    }

    public String toString() {
        return new ToStringBuilder(this)
            .append("binindex", getBinindex())
            .toString();
    }

    public boolean equals(Object other) {
        if ( !(other instanceof GiProtbindview) ) return false;
        GiProtbindview castOther = (GiProtbindview) other;
        return new EqualsBuilder()
            .append(this.getBinindex(), castOther.getBinindex())
            .isEquals();
    }

    public int hashCode() {
        return new HashCodeBuilder()
            .append(getBinindex())
            .toHashCode();
    }

}
