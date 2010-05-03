package com.tibco.cmidemo.hibernate;

import java.io.Serializable;
import java.util.Date;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/** 
 *        @hibernate.class
 *         table="gi_emailmoniker"
 *     
*/
public class GiEmailmoniker  extends ModelObject implements Serializable {

    /** identifier field */
    private Long binindex;

    /** persistent field */
    private Long EBinindex;

    /** persistent field */
    private String email;

    /** persistent field */
    private Long tpBinindex;

    /** nullable persistent field */
    private Date lastmodified;

    /** full constructor */
    public GiEmailmoniker(Long EBinindex, String email, Long tpBinindex, Date lastmodified) {
        this.EBinindex = EBinindex;
        this.email = email;
        this.tpBinindex = tpBinindex;
        this.lastmodified = lastmodified;
    }

    /** default constructor */
    public GiEmailmoniker() {
    }

    /** minimal constructor */
    public GiEmailmoniker(Long EBinindex, String email, Long tpBinindex) {
        this.EBinindex = EBinindex;
        this.email = email;
        this.tpBinindex = tpBinindex;
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
     *             column="E_BININDEX"
     *             length="18"
     *             not-null="true"
     *         
     */
    public Long getEBinindex() {
        return this.EBinindex;
    }

    public void setEBinindex(Long EBinindex) {
        this.EBinindex = EBinindex;
    }

    /** 
     *            @hibernate.property
     *             column="EMAIL"
     *             length="255"
     *             not-null="true"
     *         
     */
    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
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
        if ( !(other instanceof GiEmailmoniker) ) return false;
        GiEmailmoniker castOther = (GiEmailmoniker) other;
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
