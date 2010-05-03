package com.tibco.cmidemo.hibernate;

import java.io.Serializable;
import java.util.Date;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/** 
 *        @hibernate.class
 *         table="gi_pkistoreitem"
 *     
*/
public class GiPkistoreitem  extends ModelObject implements Serializable {

    /** identifier field */
    private Long binindex;

    /** persistent field */
    private String name;

    /** persistent field */
    private Long tpBinindex;

    /** nullable persistent field */
    private String url;

    /** nullable persistent field */
    private byte[] content;

    /** nullable persistent field */
    private byte[] pkcs7content;

    /** nullable persistent field */
    private Date lastmodified;

    /** full constructor */
    public GiPkistoreitem(String name, Long tpBinindex, String url, byte[] content, byte[] pkcs7content, Date lastmodified) {
        this.name = name;
        this.tpBinindex = tpBinindex;
        this.url = url;
        this.content = content;
        this.pkcs7content = pkcs7content;
        this.lastmodified = lastmodified;
    }

    /** default constructor */
    public GiPkistoreitem() {
    }

    /** minimal constructor */
    public GiPkistoreitem(String name, Long tpBinindex) {
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
     *             column="URL"
     *             length="255"
     *         
     */
    public String getUrl() {
        return this.url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    /** 
     *            @hibernate.property
     *             column="CONTENT"
     *             length="2147483647"
     *         
     */
    public byte[] getContent() {
        return this.content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    /** 
     *            @hibernate.property
     *             column="PKCS7CONTENT"
     *             length="2147483647"
     *         
     */
    public byte[] getPkcs7content() {
        return this.pkcs7content;
    }

    public void setPkcs7content(byte[] pkcs7content) {
        this.pkcs7content = pkcs7content;
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
        if ( !(other instanceof GiPkistoreitem) ) return false;
        GiPkistoreitem castOther = (GiPkistoreitem) other;
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
