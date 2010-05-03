package com.tibco.cmidemo.hibernate;

import java.io.Serializable;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/** 
 *        @hibernate.class
 *         table="tbl_test"
 *     
*/
public class TblTest implements Serializable {

    /** identifier field */
    private String oid;

    /** nullable persistent field */
    private String desc;

    /** full constructor */
    public TblTest(String desc) {
        this.desc = desc;
    }

    /** default constructor */
    public TblTest() {
    }

    /** 
     *            @hibernate.id
     *             generator-class="identity"
     *             type="java.lang.String"
     *             column="OID"
     *             unsaved-value="0"
     *         
     */
    public String getOid() {
        return this.oid;
    }

    public void setOid(String oid) {
        this.oid = oid;
    }

    /** 
     *            @hibernate.property
     *             column="DESC"
     *             length="200"
     *         
     */
    public String getDesc() {
        return this.desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String toString() {
        return new ToStringBuilder(this)
            .append("oid", getOid())
            .toString();
    }

    public boolean equals(Object other) {
        if ( !(other instanceof TblTest) ) return false;
        TblTest castOther = (TblTest) other;
        return new EqualsBuilder()
            .append(this.getOid(), castOther.getOid())
            .isEquals();
    }

    public int hashCode() {
        return new HashCodeBuilder()
            .append(getOid())
            .toHashCode();
    }

}
