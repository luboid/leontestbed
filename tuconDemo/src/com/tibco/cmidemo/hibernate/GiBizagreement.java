package com.tibco.cmidemo.hibernate;

import java.io.Serializable;
import java.util.Date;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/** 
 *        @hibernate.class
 *         table="gi_bizagreement"
 *     
*/
public class GiBizagreement extends ModelObject implements Serializable {

    /** identifier field */
    private Long binindex;

    /** persistent field */
    private String objnid;

    /** nullable persistent field */
    private String displayName;

    /** persistent field */
    private Long HBinindex;

    /** persistent field */
    private Long tpBinindex;

    /** nullable persistent field */
    private Date validStart;

    /** nullable persistent field */
    private Date validEnd;

    /** persistent field */
    private boolean isValid;

    /** nullable persistent field */
    private Date lastmodified;

    /** full constructor */
    public GiBizagreement(String objnid, String displayName, Long HBinindex, Long tpBinindex, Date validStart, Date validEnd, boolean isValid, Date lastmodified) {
        this.objnid = objnid;
        this.displayName = displayName;
        this.HBinindex = HBinindex;
        this.tpBinindex = tpBinindex;
        this.validStart = validStart;
        this.validEnd = validEnd;
        this.isValid = isValid;
        this.lastmodified = lastmodified;
    }

    /** default constructor */
    public GiBizagreement() {
    }

    /** minimal constructor */
    public GiBizagreement(String objnid, Long HBinindex, Long tpBinindex, boolean isValid) {
        this.objnid = objnid;
        this.HBinindex = HBinindex;
        this.tpBinindex = tpBinindex;
        this.isValid = isValid;
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
     *             column="OBJNID"
     *             length="255"
     *             not-null="true"
     *         
     */
    public String getObjnid() {
        return this.objnid;
    }

    public void setObjnid(String objnid) {
        this.objnid = objnid;
    }

    /** 
     *            @hibernate.property
     *             column="DISPLAY_NAME"
     *             length="255"
     *         
     */
    public String getDisplayName() {
        return this.displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    /** 
     *            @hibernate.property
     *             column="H_BININDEX"
     *             length="18"
     *             not-null="true"
     *         
     */
    public Long getHBinindex() {
        return this.HBinindex;
    }

    public void setHBinindex(Long HBinindex) {
        this.HBinindex = HBinindex;
    }

    /** 
     *            @hibernate.property
     *             column="TP_BININDEX"
     *             length="18"
     *             not-null="true"
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
     *             column="VALID_START"
     *             length="19"
     *         
     */
    public Date getValidStart() {
        return this.validStart;
    }

    public void setValidStart(Date validStart) {
        this.validStart = validStart;
    }

    /** 
     *            @hibernate.property
     *             column="VALID_END"
     *             length="19"
     *         
     */
    public Date getValidEnd() {
        return this.validEnd;
    }

    public void setValidEnd(Date validEnd) {
        this.validEnd = validEnd;
    }

    /** 
     *            @hibernate.property
     *             column="IS_VALID"
     *             length="11"
     *             not-null="true"
     *         
     */
    public boolean isIsValid() {
        return this.isValid;
    }

    public void setIsValid(boolean isValid) {
        this.isValid = isValid;
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
        if ( !(other instanceof GiBizagreement) ) return false;
        GiBizagreement castOther = (GiBizagreement) other;
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
