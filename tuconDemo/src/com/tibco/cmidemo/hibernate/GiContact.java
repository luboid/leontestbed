package com.tibco.cmidemo.hibernate;

import java.io.Serializable;
import java.util.Date;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/** 
 *        @hibernate.class
 *         table="gi_contact"
 *     
*/
public class GiContact  extends ModelObject implements Serializable {

    /** identifier field */
    private Long binindex;

    /** persistent field */
    private String name;

    /** persistent field */
    private Long LBinindex;

    /** nullable persistent field */
    private String FName;

    /** nullable persistent field */
    private String LName;

    /** nullable persistent field */
    private String phone;

    /** nullable persistent field */
    private String fax;

    /** nullable persistent field */
    private String pager;

    /** nullable persistent field */
    private String email;

    /** persistent field */
    private String category;

    /** nullable persistent field */
    private Date lastmodified;

    /** full constructor */
    public GiContact(String name, Long LBinindex, String FName, String LName, String phone, String fax, String pager, String email, String category, Date lastmodified) {
        this.name = name;
        this.LBinindex = LBinindex;
        this.FName = FName;
        this.LName = LName;
        this.phone = phone;
        this.fax = fax;
        this.pager = pager;
        this.email = email;
        this.category = category;
        this.lastmodified = lastmodified;
    }

    /** default constructor */
    public GiContact() {
    }

    /** minimal constructor */
    public GiContact(String name, Long LBinindex, String category) {
        this.name = name;
        this.LBinindex = LBinindex;
        this.category = category;
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
     *             length="255"
     *             not-null="true"
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
     *             column="L_BININDEX"
     *             length="18"
     *             not-null="true"
     *         
     */
    public Long getLBinindex() {
        return this.LBinindex;
    }

    public void setLBinindex(Long LBinindex) {
        this.LBinindex = LBinindex;
    }

    /** 
     *            @hibernate.property
     *             column="F_NAME"
     *             length="255"
     *         
     */
    public String getFName() {
        return this.FName;
    }

    public void setFName(String FName) {
        this.FName = FName;
    }

    /** 
     *            @hibernate.property
     *             column="L_NAME"
     *             length="255"
     *         
     */
    public String getLName() {
        return this.LName;
    }

    public void setLName(String LName) {
        this.LName = LName;
    }

    /** 
     *            @hibernate.property
     *             column="PHONE"
     *             length="255"
     *         
     */
    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    /** 
     *            @hibernate.property
     *             column="FAX"
     *             length="255"
     *         
     */
    public String getFax() {
        return this.fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    /** 
     *            @hibernate.property
     *             column="PAGER"
     *             length="255"
     *         
     */
    public String getPager() {
        return this.pager;
    }

    public void setPager(String pager) {
        this.pager = pager;
    }

    /** 
     *            @hibernate.property
     *             column="EMAIL"
     *             length="255"
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
        if ( !(other instanceof GiContact) ) return false;
        GiContact castOther = (GiContact) other;
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
