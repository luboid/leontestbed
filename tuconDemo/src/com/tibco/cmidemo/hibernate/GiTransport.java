package com.tibco.cmidemo.hibernate;

import java.io.Serializable;
import java.util.Date;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/** 
 *        @hibernate.class
 *         table="gi_transport"
 *     
*/
public class GiTransport  extends ModelObject implements Serializable {

    /** identifier field */
    private Long binindex;

    /** nullable persistent field */
    private String name;

    /** nullable persistent field */
    private String url;

    /** nullable persistent field */
    private String type;

    /** persistent field */
    private Long EBinindex;

    /** nullable persistent field */
    private Integer retrycount;

    /** nullable persistent field */
    private Integer sockTimeout;

    /** nullable persistent field */
    private Integer retryint;

    /** persistent field */
    private int status;

    /** nullable persistent field */
    private Date lastmodified;

    /** full constructor */
    public GiTransport(String name, String url, String type, Long EBinindex, Integer retrycount, Integer sockTimeout, Integer retryint, int status, Date lastmodified) {
        this.name = name;
        this.url = url;
        this.type = type;
        this.EBinindex = EBinindex;
        this.retrycount = retrycount;
        this.sockTimeout = sockTimeout;
        this.retryint = retryint;
        this.status = status;
        this.lastmodified = lastmodified;
    }

    /** default constructor */
    public GiTransport() {
    }

    /** minimal constructor */
    public GiTransport(Long EBinindex, int status) {
        this.EBinindex = EBinindex;
        this.status = status;
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
     *             column="TYPE"
     *             length="60"
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
     *             column="RETRYCOUNT"
     *             length="11"
     *         
     */
    public Integer getRetrycount() {
        return this.retrycount;
    }

    public void setRetrycount(Integer retrycount) {
        this.retrycount = retrycount;
    }

    /** 
     *            @hibernate.property
     *             column="SOCK_TIMEOUT"
     *             length="11"
     *         
     */
    public Integer getSockTimeout() {
        return this.sockTimeout;
    }

    public void setSockTimeout(Integer sockTimeout) {
        this.sockTimeout = sockTimeout;
    }

    /** 
     *            @hibernate.property
     *             column="RETRYINT"
     *             length="11"
     *         
     */
    public Integer getRetryint() {
        return this.retryint;
    }

    public void setRetryint(Integer retryint) {
        this.retryint = retryint;
    }

    /** 
     *            @hibernate.property
     *             column="STATUS"
     *             length="11"
     *             not-null="true"
     *         
     */
    public int getStatus() {
        return this.status;
    }

    public void setStatus(int status) {
        this.status = status;
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
        if ( !(other instanceof GiTransport) ) return false;
        GiTransport castOther = (GiTransport) other;
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
