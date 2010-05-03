package com.tibco.cmidemo.hibernate;

import java.io.Serializable;
import java.util.Date;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/** 
 *        @hibernate.class
 *         table="gi_protocol"
 *     
*/
public class GiProtocol  extends ModelObject implements Serializable {

    /** identifier field */
    private Long binindex;

    /** persistent field */
    private String name;

    /** persistent field */
    private Long tpBinindex;

    /** nullable persistent field */
    private Long DBinindex;

    /** nullable persistent field */
    private Long as2Binindex;

    /** persistent field */
    private int status;

    /** nullable persistent field */
    private String emailId;

    /** nullable persistent field */
    private Date lastmodified;

    /** full constructor */
    public GiProtocol(String name, Long tpBinindex, Long DBinindex, Long as2Binindex, int status, String emailId, Date lastmodified) {
        this.name = name;
        this.tpBinindex = tpBinindex;
        this.DBinindex = DBinindex;
        this.as2Binindex = as2Binindex;
        this.status = status;
        this.emailId = emailId;
        this.lastmodified = lastmodified;
    }

    /** default constructor */
    public GiProtocol() {
    }

    /** minimal constructor */
    public GiProtocol(String name, Long tpBinindex, int status) {
        this.name = name;
        this.tpBinindex = tpBinindex;
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
     *             column="D_BININDEX"
     *             length="255"
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
     *             length="255"
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
     *             column="EMAIL_ID"
     *             length="255"
     *         
     */
    public String getEmailId() {
        return this.emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
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
        if ( !(other instanceof GiProtocol) ) return false;
        GiProtocol castOther = (GiProtocol) other;
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
