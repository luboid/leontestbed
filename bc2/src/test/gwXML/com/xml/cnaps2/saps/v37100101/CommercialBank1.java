//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.03 at 08:46:54 ���� CST 
//


package com.xml.cnaps2.saps.v37100101;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for CommercialBank1 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="CommercialBank1">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="IntrBkLnRmngLmt" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.371.001.01}SummaryAmountText" minOccurs="0"/>
 *         &lt;element name="FndsOfPoolRmngLmt" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.371.001.01}SummaryAmountText" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "CommercialBank1", propOrder = {
    "intrBkLnRmngLmt",
    "fndsOfPoolRmngLmt"
})
public class CommercialBank1 {

    @XmlElement(name = "IntrBkLnRmngLmt")
    protected String intrBkLnRmngLmt;
    @XmlElement(name = "FndsOfPoolRmngLmt")
    protected String fndsOfPoolRmngLmt;

    /**
     * Gets the value of the intrBkLnRmngLmt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIntrBkLnRmngLmt() {
        return intrBkLnRmngLmt;
    }

    /**
     * Sets the value of the intrBkLnRmngLmt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIntrBkLnRmngLmt(String value) {
        this.intrBkLnRmngLmt = value;
    }

    /**
     * Gets the value of the fndsOfPoolRmngLmt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFndsOfPoolRmngLmt() {
        return fndsOfPoolRmngLmt;
    }

    /**
     * Sets the value of the fndsOfPoolRmngLmt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFndsOfPoolRmngLmt(String value) {
        this.fndsOfPoolRmngLmt = value;
    }

}
