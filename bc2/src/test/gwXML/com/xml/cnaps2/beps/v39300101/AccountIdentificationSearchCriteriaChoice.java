//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.10 at 04:00:27 ���� CST 
//


package com.xml.cnaps2.beps.v39300101;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for AccountIdentificationSearchCriteriaChoice complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="AccountIdentificationSearchCriteriaChoice">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;choice>
 *           &lt;element name="EQ" type="{urn:swift:xsd:camt.005.001.04}AccountIdentification1Choice"/>
 *           &lt;element name="CTTxt" type="{urn:swift:xsd:camt.005.001.04}Max35Text"/>
 *           &lt;element name="NCTTxt" type="{urn:swift:xsd:camt.005.001.04}Max35Text"/>
 *         &lt;/choice>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "AccountIdentificationSearchCriteriaChoice", propOrder = {
    "eq",
    "ctTxt",
    "nctTxt"
})
public class AccountIdentificationSearchCriteriaChoice {

    @XmlElement(name = "EQ")
    protected AccountIdentification1Choice eq;
    @XmlElement(name = "CTTxt")
    protected String ctTxt;
    @XmlElement(name = "NCTTxt")
    protected String nctTxt;

    /**
     * Gets the value of the eq property.
     * 
     * @return
     *     possible object is
     *     {@link AccountIdentification1Choice }
     *     
     */
    public AccountIdentification1Choice getEQ() {
        return eq;
    }

    /**
     * Sets the value of the eq property.
     * 
     * @param value
     *     allowed object is
     *     {@link AccountIdentification1Choice }
     *     
     */
    public void setEQ(AccountIdentification1Choice value) {
        this.eq = value;
    }

    /**
     * Gets the value of the ctTxt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCTTxt() {
        return ctTxt;
    }

    /**
     * Sets the value of the ctTxt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCTTxt(String value) {
        this.ctTxt = value;
    }

    /**
     * Gets the value of the nctTxt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNCTTxt() {
        return nctTxt;
    }

    /**
     * Sets the value of the nctTxt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNCTTxt(String value) {
        this.nctTxt = value;
    }

}
