package com.tibco.cmidemo.hibernate;

import java.io.Serializable;
import java.util.Date;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/** 
 *        @hibernate.class
 *         table="gi_protbinding"
 *     
*/
public class GiProtbinding  extends ModelObject implements Serializable {

    /** identifier field */
    private Long binindex;

    /** persistent field */
    private String protName;

    /** persistent field */
    private Long BBinindex;

    /** nullable persistent field */
    private boolean allowAllops;

    /** nullable persistent field */
    private boolean nrAllops;

    /** nullable persistent field */
    private Date lastmodified;

    /** full constructor */
    public GiProtbinding(String protName, Long BBinindex, boolean allowAllops, boolean nrAllops, Date lastmodified) {
        this.protName = protName;
        this.BBinindex = BBinindex;
        this.allowAllops = allowAllops;
        this.nrAllops = nrAllops;
        this.lastmodified = lastmodified;
    }

    /** default constructor */
    public GiProtbinding() {
    }

    /** minimal constructor */
    public GiProtbinding(String protName, Long BBinindex) {
        this.protName = protName;
        this.BBinindex = BBinindex;
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
     *             column="PROT_NAME"
     *             length="255"
     *             not-null="true"
     *         
     */
    public String getProtName() {
        return this.protName;
    }

    public void setProtName(String protName) {
        this.protName = protName;
    }

    /** 
     *            @hibernate.property
     *             column="B_BININDEX"
     *             length="18"
     *             not-null="true"
     *         
     */
    public Long getBBinindex() {
        return this.BBinindex;
    }

    public void setBBinindex(Long BBinindex) {
        this.BBinindex = BBinindex;
    }

    /** 
     *            @hibernate.property
     *             column="ALLOW_ALLOPS"
     *             length="11"
     *         
     */
    public boolean isAllowAllops() {
        return this.allowAllops;
    }

    public void setAllowAllops(boolean allowAllops) {
        this.allowAllops = allowAllops;
    }

    /** 
     *            @hibernate.property
     *             column="NR_ALLOPS"
     *             length="11"
     *         
     */
    public boolean isNrAllops() {
        return this.nrAllops;
    }

    public void setNrAllops(boolean nrAllops) {
        this.nrAllops = nrAllops;
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
        if ( !(other instanceof GiProtbinding) ) return false;
        GiProtbinding castOther = (GiProtbinding) other;
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
