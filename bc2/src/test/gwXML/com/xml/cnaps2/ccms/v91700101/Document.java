//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.03 at 08:45:43 ���� CST 
//


package com.xml.cnaps2.ccms.v91700101;

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
 *         &lt;element name="BsisChngNtfctn" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.917.001.01}BsisChngNtfctnV01"/>
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
    "bsisChngNtfctn"
})
public class Document {

    @XmlElement(name = "BsisChngNtfctn", required = true)
    protected BsisChngNtfctnV01 bsisChngNtfctn;

    /**
     * Gets the value of the bsisChngNtfctn property.
     * 
     * @return
     *     possible object is
     *     {@link BsisChngNtfctnV01 }
     *     
     */
    public BsisChngNtfctnV01 getBsisChngNtfctn() {
        return bsisChngNtfctn;
    }

    /**
     * Sets the value of the bsisChngNtfctn property.
     * 
     * @param value
     *     allowed object is
     *     {@link BsisChngNtfctnV01 }
     *     
     */
    public void setBsisChngNtfctn(BsisChngNtfctnV01 value) {
        this.bsisChngNtfctn = value;
    }

}
