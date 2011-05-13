//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.2-147 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.13 at 01:14:20 PM CST 
//


package com.xml.cnaps2.camt.v00500104;

import java.util.List;
import java.util.Vector;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for SystemSearch2 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="SystemSearch2">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="SysId" type="{urn:swift:xsd:camt.005.001.04}CashClearingSystem1Code" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="MmbId" type="{urn:swift:xsd:camt.005.001.04}MemberIdentificationChoice" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="Ctry" type="{urn:swift:xsd:camt.005.001.04}CountryCode" minOccurs="0"/>
 *         &lt;element name="AcctId" type="{urn:swift:xsd:camt.005.001.04}AccountIdentification1Choice" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "SystemSearch2", propOrder = {
    "sysId",
    "mmbId",
    "ctry",
    "acctId"
})
public class SystemSearch2 {

    @XmlElement(name = "SysId")
    protected List<String> sysId = new Vector<String>();
    @XmlElement(name = "MmbId")
    protected List<MemberIdentificationChoice> mmbId = new Vector<MemberIdentificationChoice>();
    @XmlElement(name = "Ctry")
    protected String ctry;
    @XmlElement(name = "AcctId")
    protected AccountIdentification1Choice acctId;

    /**
     * Gets the value of the sysId property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the sysId property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getSysId().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link String }
     * 
     * 
     */
    public List<String> getSysId() {
        if (sysId == null) {
            sysId = new Vector<String>();
        }
        return this.sysId;
    }

    /**
     * Gets the value of the mmbId property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the mmbId property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getMmbId().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link MemberIdentificationChoice }
     * 
     * 
     */
    public List<MemberIdentificationChoice> getMmbId() {
        if (mmbId == null) {
            mmbId = new Vector<MemberIdentificationChoice>();
        }
        return this.mmbId;
    }

    /**
     * Gets the value of the ctry property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCtry() {
        return ctry;
    }

    /**
     * Sets the value of the ctry property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCtry(String value) {
        this.ctry = value;
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
