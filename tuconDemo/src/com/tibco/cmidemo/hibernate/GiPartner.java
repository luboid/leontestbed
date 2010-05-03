package com.tibco.cmidemo.hibernate;

import java.io.Serializable;
import java.util.Date;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/** 
 *        @hibernate.class
 *         table="gi_partner"
 *     
*/
public class GiPartner  extends ModelObject implements Serializable {

    /** identifier field */
    private Long binindex;

    /** nullable persistent field */
    private String name;

    /** nullable persistent field */
    private String description;

    /** persistent field */
    private String category;

    /** persistent field */
    private boolean isActive;

    /** nullable persistent field */
    private Integer nouseProxy;

    /** nullable persistent field */
    private Date lastmodified;

    /** full constructor */
    public GiPartner(String name, String description, String category, boolean isActive, Integer nouseProxy, Date lastmodified) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.isActive = isActive;
        this.nouseProxy = nouseProxy;
        this.lastmodified = lastmodified;
    }

    /** default constructor */
    public GiPartner() {
    }

    /** minimal constructor */
    public GiPartner(String category, boolean isActive) {
        this.category = category;
        this.isActive = isActive;
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
     *             column="NAME"
     *             unique="true"
     *             length="255"
     *         
     */
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    /** 
     *            @hibernate.property
     *             column="DESCRIPTION"
     *             length="255"
     *         
     */
    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    /** 
     *            @hibernate.property
     *             column="CATEGORY"
     *             length="255"
     *             not-null="true"
     *         
     */
    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    /** 
     *            @hibernate.property
     *             column="IS_ACTIVE"
     *             length="11"
     *             not-null="true"
     *         
     */
    public boolean isIsActive() {
        return this.isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }

    /** 
     *            @hibernate.property
     *             column="NOUSE_PROXY"
     *             length="11"
     *         
     */
    public Integer getNouseProxy() {
        return this.nouseProxy;
    }

    public void setNouseProxy(Integer nouseProxy) {
        this.nouseProxy = nouseProxy;
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
        if ( !(other instanceof GiPartner) ) return false;
        GiPartner castOther = (GiPartner) other;
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
