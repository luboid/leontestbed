//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.12 at 01:35:13 ���� CST 
//


package com.xml.iso20022.camt.v00900104;

import java.util.List;
import java.util.Vector;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for LimitSearchCriteria2 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="LimitSearchCriteria2">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="SysId" type="{urn:swift:xsd:camt.009.001.04}SystemIdentificationChoice" minOccurs="0"/>
 *         &lt;element name="BilLmtCtrPtyId" type="{urn:swift:xsd:camt.009.001.04}MemberIdentificationChoice" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="DfltLmtTp" type="{urn:swift:xsd:camt.009.001.04}LimitType2Code" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="CurLmtTp" type="{urn:swift:xsd:camt.009.001.04}LimitType2Code" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="AcctOwnr" type="{urn:swift:xsd:camt.009.001.04}BICIdentifier" minOccurs="0"/>
 *         &lt;element name="AcctId" type="{urn:swift:xsd:camt.009.001.04}AccountIdentification1Choice" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "LimitSearchCriteria2", propOrder = {
    "sysId",
    "bilLmtCtrPtyId",
    "dfltLmtTp",
    "curLmtTp",
    "acctOwnr",
    "acctId"
})
public class LimitSearchCriteria2 {

    @XmlElement(name = "SysId")
    protected SystemIdentificationChoice sysId;
    @XmlElement(name = "BilLmtCtrPtyId")
    protected List<MemberIdentificationChoice> bilLmtCtrPtyId = new Vector<MemberIdentificationChoice>();
    @XmlElement(name = "DfltLmtTp")
    protected List<String> dfltLmtTp = new Vector<String>();
    @XmlElement(name = "CurLmtTp")
    protected List<String> curLmtTp = new Vector<String>();
    @XmlElement(name = "AcctOwnr")
    protected String acctOwnr;
    @XmlElement(name = "AcctId")
    protected AccountIdentification1Choice acctId;

    /**
     * Gets the value of the sysId property.
     * 
     * @return
     *     possible object is
     *     {@link SystemIdentificationChoice }
     *     
     */
    public SystemIdentificationChoice getSysId() {
        return sysId;
    }

    /**
     * Sets the value of the sysId property.
     * 
     * @param value
     *     allowed object is
     *     {@link SystemIdentificationChoice }
     *     
     */
    public void setSysId(SystemIdentificationChoice value) {
        this.sysId = value;
    }

    /**
     * Gets the value of the bilLmtCtrPtyId property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the bilLmtCtrPtyId property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getBilLmtCtrPtyId().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link MemberIdentificationChoice }
     * 
     * 
     */
    public List<MemberIdentificationChoice> getBilLmtCtrPtyId() {
        if (bilLmtCtrPtyId == null) {
            bilLmtCtrPtyId = new Vector<MemberIdentificationChoice>();
        }
        return this.bilLmtCtrPtyId;
    }

    /**
     * Gets the value of the dfltLmtTp property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the dfltLmtTp property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getDfltLmtTp().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link String }
     * 
     * 
     */
    public List<String> getDfltLmtTp() {
        if (dfltLmtTp == null) {
            dfltLmtTp = new Vector<String>();
        }
        return this.dfltLmtTp;
    }

    /**
     * Gets the value of the curLmtTp property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the curLmtTp property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getCurLmtTp().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link String }
     * 
     * 
     */
    public List<String> getCurLmtTp() {
        if (curLmtTp == null) {
            curLmtTp = new Vector<String>();
        }
        return this.curLmtTp;
    }

    /**
     * Gets the value of the acctOwnr property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAcctOwnr() {
        return acctOwnr;
    }

    /**
     * Sets the value of the acctOwnr property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAcctOwnr(String value) {
        this.acctOwnr = value;
    }

    /**
     * Gets the value of the acctId property.
     * 
     * @return
     *     possible object is
     *     {@link AccountIdentification1Choice }
     *     
     */
    public AccountIdentification1Choice getAcctId() {
        return acctId;
    }

    /**
     * Sets the value of the acctId property.
     * 
     * @param value
     *     allowed object is
     *     {@link AccountIdentification1Choice }
     *     
     */
    public void setAcctId(AccountIdentification1Choice value) {
        this.acctId = value;
    }

}
