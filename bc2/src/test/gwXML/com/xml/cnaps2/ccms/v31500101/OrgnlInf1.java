//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.03 at 08:45:21 ���� CST 
//


package com.xml.cnaps2.ccms.v31500101;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for OrgnlInf1 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="OrgnlInf1">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="OrgnlGrpHdr" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.315.001.01}OrgnlGrpHdr1"/>
 *         &lt;element name="OrgnlTx" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.315.001.01}OrgnlTx1" minOccurs="0"/>
 *         &lt;element name="OrgnlAmt" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.315.001.01}ActiveCurrencyAndAmount"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "OrgnlInf1", propOrder = {
    "orgnlGrpHdr",
    "orgnlTx",
    "orgnlAmt"
})
public class OrgnlInf1 {

    @XmlElement(name = "OrgnlGrpHdr", required = true)
    protected OrgnlGrpHdr1 orgnlGrpHdr;
    @XmlElement(name = "OrgnlTx")
    protected OrgnlTx1 orgnlTx;
    @XmlElement(name = "OrgnlAmt", required = true)
    protected ActiveCurrencyAndAmount orgnlAmt;

    /**
     * Gets the value of the orgnlGrpHdr property.
     * 
     * @return
     *     possible object is
     *     {@link OrgnlGrpHdr1 }
     *     
     */
    public OrgnlGrpHdr1 getOrgnlGrpHdr() {
        return orgnlGrpHdr;
    }

    /**
     * Sets the value of the orgnlGrpHdr property.
     * 
     * @param value
     *     allowed object is
     *     {@link OrgnlGrpHdr1 }
     *     
     */
    public void setOrgnlGrpHdr(OrgnlGrpHdr1 value) {
        this.orgnlGrpHdr = value;
    }

    /**
     * Gets the value of the orgnlTx property.
     * 
     * @return
     *     possible object is
     *     {@link OrgnlTx1 }
     *     
     */
    public OrgnlTx1 getOrgnlTx() {
        return orgnlTx;
    }

    /**
     * Sets the value of the orgnlTx property.
     * 
     * @param value
     *     allowed object is
     *     {@link OrgnlTx1 }
     *     
     */
    public void setOrgnlTx(OrgnlTx1 value) {
        this.orgnlTx = value;
    }

    /**
     * Gets the value of the orgnlAmt property.
     * 
     * @return
     *     possible object is
     *     {@link ActiveCurrencyAndAmount }
     *     
     */
    public ActiveCurrencyAndAmount getOrgnlAmt() {
        return orgnlAmt;
    }

    /**
     * Sets the value of the orgnlAmt property.
     * 
     * @param value
     *     allowed object is
     *     {@link ActiveCurrencyAndAmount }
     *     
     */
    public void setOrgnlAmt(ActiveCurrencyAndAmount value) {
        this.orgnlAmt = value;
    }

}
