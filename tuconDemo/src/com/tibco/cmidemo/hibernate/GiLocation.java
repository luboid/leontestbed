package com.tibco.cmidemo.hibernate;

import java.io.Serializable;
import java.util.Date;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/** 
 *        @hibernate.class
 *         table="gi_location"
 *     
*/
public class GiLocation  extends ModelObject implements Serializable {

    /** identifier field */
    private Long binindex;

    /** persistent field */
    private String name;

    /** nullable persistent field */
    private String description;

    /** nullable persistent field */
    private String addr1;

    /** nullable persistent field */
    private String addr2;

    /** nullable persistent field */
    private String addr3;

    /** nullable persistent field */
    private String city;

    /** nullable persistent field */
    private String state;

    /** nullable persistent field */
    private String zip;

    /** nullable persistent field */
    private String country;

    /** nullable persistent field */
    private String phone;

    /** nullable persistent field */
    private String fax;

    /** nullable persistent field */
    private String email;

    /** nullable persistent field */
    private String weburl;

    /** persistent field */
    private Long tpBinindex;

    /** nullable persistent field */
    private Date lastmodified;

    /** full constructor */
    public GiLocation(String name, String description, String addr1, String addr2, String addr3, String city, String state, String zip, String country, String phone, String fax, String email, String weburl, Long tpBinindex, Date lastmodified) {
        this.name = name;
        this.description = description;
        this.addr1 = addr1;
        this.addr2 = addr2;
        this.addr3 = addr3;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
        this.phone = phone;
        this.fax = fax;
        this.email = email;
        this.weburl = weburl;
        this.tpBinindex = tpBinindex;
        this.lastmodified = lastmodified;
    }

    /** default constructor */
    public GiLocation() {
    }

    /** minimal constructor */
    public GiLocation(String name, Long tpBinindex) {
        this.name = name;
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
     *             column="ADDR1"
     *             length="255"
     *         
     */
    public String getAddr1() {
        return this.addr1;
    }

    public void setAddr1(String addr1) {
        this.addr1 = addr1;
    }

    /** 
     *            @hibernate.property
     *             column="ADDR2"
     *             length="255"
     *         
     */
    public String getAddr2() {
        return this.addr2;
    }

    public void setAddr2(String addr2) {
        this.addr2 = addr2;
    }

    /** 
     *            @hibernate.property
     *             column="ADDR3"
     *             length="255"
     *         
     */
    public String getAddr3() {
        return this.addr3;
    }

    public void setAddr3(String addr3) {
        this.addr3 = addr3;
    }

    /** 
     *            @hibernate.property
     *             column="CITY"
     *             length="255"
     *         
     */
    public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    /** 
     *            @hibernate.property
     *             column="STATE"
     *             length="255"
     *         
     */
    public String getState() {
        return this.state;
    }

    public void setState(String state) {
        this.state = state;
    }

    /** 
     *            @hibernate.property
     *             column="ZIP"
     *             length="255"
     *         
     */
    public String getZip() {
        return this.zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    /** 
     *            @hibernate.property
     *             column="COUNTRY"
     *             length="255"
     *         
     */
    public String getCountry() {
        return this.country;
    }

    public void setCountry(String country) {
        this.country = country;
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
     *             column="WEBURL"
     *             length="255"
     *         
     */
    public String getWeburl() {
        return this.weburl;
    }

    public void setWeburl(String weburl) {
        this.weburl = weburl;
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
        if ( !(other instanceof GiLocation) ) return false;
        GiLocation castOther = (GiLocation) other;
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
