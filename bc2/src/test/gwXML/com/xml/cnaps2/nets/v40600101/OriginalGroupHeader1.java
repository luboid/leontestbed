//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.11 at 04:34:05 ���� CST 
//


package com.xml.cnaps2.nets.v40600101;

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
 *         &lt;element name="OrgnlMsgId" type="{urn:cnaps:std:nets:2010:tech:xsd:nets.406.001.01}Max35Text"/>
 *         &lt;element name="OrgnlInstgPty" type="{urn:cnaps:std:nets:2010:tech:xsd:nets.406.001.01}Max14Text"/>
 *         &lt;element name="OrgnlMT" type="{urn:cnaps:std:nets:2010:tech:xsd:nets.406.001.01}Max35Text"/>
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
    "orgnlMT"
})
public class OriginalGroupHeader1 {

    @XmlElement(name = "OrgnlMsgId", required = true)
    protected String orgnlMsgId;
    @XmlElement(name = "OrgnlInstgPty", required = true)
    protected String orgnlInstgPty;
    @XmlElement(name = "OrgnlMT", required = true)
    protected String orgnlMT;

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
     * Gets the value of the orgnlMT property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrgnlMT() {
        return orgnlMT;
    }

    /**
     * Sets the value of the orgnlMT property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrgnlMT(String value) {
        this.orgnlMT = value;
    }

}
