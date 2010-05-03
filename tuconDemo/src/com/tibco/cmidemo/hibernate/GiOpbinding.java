package com.tibco.cmidemo.hibernate;

import java.io.Serializable;
import java.util.Date;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/** 
 *        @hibernate.class
 *         table="gi_opbinding"
 *     
*/
public class GiOpbinding  extends ModelObject implements Serializable {

    /** identifier field */
    private Long binindex;

    /** persistent field */
    private Long pbvBinindex;

    /** persistent field */
    private String txId;

    /** nullable persistent field */
    private Date lastmodified;

    /** full constructor */
    public GiOpbinding(Long pbvBinindex, String txId, Date lastmodified) {
        this.pbvBinindex = pbvBinindex;
        this.txId = txId;
        this.lastmodified = lastmodified;
    }

    /** default constructor */
    public GiOpbinding() {
    }

    /** minimal constructor */
    public GiOpbinding(Long pbvBinindex, String txId) {
        this.pbvBinindex = pbvBinindex;
        this.txId = txId;
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
     *             column="PBV_BININDEX"
     *             length="18"
     *             not-null="true"
     *         
     */
    public Long getPbvBinindex() {
        return this.pbvBinindex;
    }

    public void setPbvBinindex(Long pbvBinindex) {
        this.pbvBinindex = pbvBinindex;
    }

    /** 
     *            @hibernate.property
     *             column="TX_ID"
     *             length="255"
     *             not-null="true"
     *         
     */
    public String getTxId() {
        return this.txId;
    }

    public void setTxId(String txId) {
        this.txId = txId;
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
        if ( !(other instanceof GiOpbinding) ) return false;
        GiOpbinding castOther = (GiOpbinding) other;
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
