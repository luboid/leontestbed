//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.03 at 08:45:39 ���� CST 
//


package com.xml.cnaps2.ccms.v91300101;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Document complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Document">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="CISAgcyChngNtfctn" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.913.001.01}CISAgcyChngNtfctnV01"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Document", propOrder = {
    "cisAgcyChngNtfctn"
})
public class Document {

    @XmlElement(name = "CISAgcyChngNtfctn", required = true)
    protected CISAgcyChngNtfctnV01 cisAgcyChngNtfctn;

    /**
     * Gets the value of the cisAgcyChngNtfctn property.
     * 
     * @return
     *     possible object is
     *     {@link CISAgcyChngNtfctnV01 }
     *     
     */
    public CISAgcyChngNtfctnV01 getCISAgcyChngNtfctn() {
        return cisAgcyChngNtfctn;
    }

    /**
     * Sets the value of the cisAgcyChngNtfctn property.
     * 
     * @param value
     *     allowed object is
     *     {@link CISAgcyChngNtfctnV01 }
     *     
     */
    public void setCISAgcyChngNtfctn(CISAgcyChngNtfctnV01 value) {
        this.cisAgcyChngNtfctn = value;
    }

}
