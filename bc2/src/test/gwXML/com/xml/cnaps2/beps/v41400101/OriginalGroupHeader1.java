//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.11 at 04:32:30 ���� CST 
//


package com.xml.cnaps2.beps.v41400101;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for OriginalGroupHeader1 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="OriginalGroupHeader1">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="OrgnlMsgId" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.414.001.01}Max35Text"/>
 *         &lt;element name="OrgnlInstgPty" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.414.001.01}Max14Text"/>
 *         &lt;element name="OrgnlMsgTp" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.414.001.01}Max35Text"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "OriginalGroupHeader1", propOrder = {
    "orgnlMsgId",
    "orgnlInstgPty",
    "orgnlMsgTp"
})
public class OriginalGroupHeader1 {

    @XmlElement(name = "OrgnlMsgId", required = true)
    protected String orgnlMsgId;
    @XmlElement(name = "OrgnlInstgPty", required = true)
    protected String orgnlInstgPty;
    @XmlElement(name = "OrgnlMsgTp", required = true)
    protected String orgnlMsgTp;

    /**
     * Gets the value of the orgnlMsgId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrgnlMsgId() {
        return orgnlMsgId;
    }

    /**
     * Sets the value of the orgnlMsgId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrgnlMsgId(String value) {
        this.orgnlMsgId = value;
    }

    /**
     * Gets the value of the orgnlInstgPty property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrgnlInstgPty() {
        return orgnlInstgPty;
    }

    /**
     * Sets the value of the orgnlInstgPty property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrgnlInstgPty(String value) {
        this.orgnlInstgPty = value;
    }

    /**
     * Gets the value of the orgnlMsgTp property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrgnlMsgTp() {
        return orgnlMsgTp;
    }

    /**
     * Sets the value of the orgnlMsgTp property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrgnlMsgTp(String value) {
        this.orgnlMsgTp = value;
    }

}
