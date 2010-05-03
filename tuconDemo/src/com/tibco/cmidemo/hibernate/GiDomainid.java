package com.tibco.cmidemo.hibernate;

import java.io.Serializable;
import java.util.Date;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/** 
 *        @hibernate.class
 *         table="gi_domainid"
 *     
*/
public class GiDomainid  extends ModelObject implements Serializable {

    /** identifier field */
    private Long binindex;

    /** nullable persistent field */
    private String displayName;

    /** persistent field */
    private Long PBinindex;

    /** persistent field */
    private String domid;

    /** persistent field */
    private String CDomid;

    /** persistent field */
    private String domaintype;

    /** nullable persistent field */
    private Date lastmodified;

    /** full constructor */
    public GiDomainid(String displayName, Long PBinindex, String domid, String CDomid, String domaintype, Date lastmodified) {
        this.displayName = displayName;
        this.PBinindex = PBinindex;
        this.domid = domid;
        this.CDomid = CDomid;
        this.domaintype = domaintype;
        this.lastmodified = lastmodified;
    }

    /** default constructor */
    public GiDomainid() {
    }

    /** minimal constructor */
    public GiDomainid(Long PBinindex, String domid, String CDomid, String domaintype) {
        this.PBinindex = PBinindex;
        this.domid = domid;
        this.CDomid = CDomid;
        this.domaintype = domaintype;
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
     *             column="P_BININDEX"
     *             length="18"
     *             not-null="true"
     *         
     */
    public Long getPBinindex() {
        return this.PBinindex;
    }

    public void setPBinindex(Long PBinindex) {
        this.PBinindex = PBinindex;
    }

    /** 
     *            @hibernate.property
     *             column="DOMID"
     *             length="255"
     *             not-null="true"
     *         
     */
    public String getDomid() {
        return this.domid;
    }

    public void setDomid(String domid) {
        this.domid = domid;
    }

    /** 
     *            @hibernate.property
     *             column="C_DOMID"
     *             length="255"
     *             not-null="true"
     *         
     */
    public String getCDomid() {
        return this.CDomid;
    }

    public void setCDomid(String CDomid) {
        this.CDomid = CDomid;
    }

    /** 
     *            @hibernate.property
     *             column="DOMAINTYPE"
     *             length="255"
     *             not-null="true"
     *         
     */
    public String getDomaintype() {
        return this.domaintype;
    }

    public void setDomaintype(String domaintype) {
        this.domaintype = domaintype;
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
        if ( !(other instanceof GiDomainid) ) return false;
        GiDomainid castOther = (GiDomainid) other;
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
