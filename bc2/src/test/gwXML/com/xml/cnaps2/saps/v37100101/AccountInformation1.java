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
 * <p>Java class for AccountInformation1 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="AccountInformation1">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;choice>
 *           &lt;element name="CntrlBk" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.371.001.01}CentralBank1"/>
 *           &lt;element name="ComrclBK" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.371.001.01}CommercialBank1"/>
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
@XmlType(name = "AccountInformation1", propOrder = {
    "cntrlBk",
    "comrclBK"
})
public class AccountInformation1 {

    @XmlElement(name = "CntrlBk")
    protected CentralBank1 cntrlBk;
    @XmlElement(name = "ComrclBK")
    protected CommercialBank1 comrclBK;

    /**
     * Gets the value of the cntrlBk property.
     * 
     * @return
     *     possible object is
     *     {@link CentralBank1 }
     *     
     */
    public CentralBank1 getCntrlBk() {
        return cntrlBk;
    }

    /**
     * Sets the value of the cntrlBk property.
     * 
     * @param value
     *     allowed object is
     *     {@link CentralBank1 }
     *     
     */
    public void setCntrlBk(CentralBank1 value) {
        this.cntrlBk = value;
    }

    /**
     * Gets the value of the comrclBK property.
     * 
     * @return
     *     possible object is
     *     {@link CommercialBank1 }
     *     
     */
    public CommercialBank1 getComrclBK() {
        return comrclBK;
    }

    /**
     * Sets the value of the comrclBK property.
     * 
     * @param value
     *     allowed object is
     *     {@link CommercialBank1 }
     *     
     */
    public void setComrclBK(CommercialBank1 value) {
        this.comrclBK = value;
    }

}
