//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.19 at 01:24:10 ���� CST 
//


package com.xml.iso20022.pacs.v00400102;

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
 *         &lt;element name="PmtRtr" type="{urn:iso:std:iso:20022:tech:xsd:pacs.004.001.02}PaymentReturnV02"/>
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
    "pmtRtr"
})
public class Document {

    @XmlElement(name = "PmtRtr", required = true)
    protected PaymentReturnV02 pmtRtr;

    /**
     * Gets the value of the pmtRtr property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentReturnV02 }
     *     
     */
    public PaymentReturnV02 getPmtRtr() {
        return pmtRtr;
    }

    /**
     * Sets the value of the pmtRtr property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentReturnV02 }
     *     
     */
    public void setPmtRtr(PaymentReturnV02 value) {
        this.pmtRtr = value;
    }

}
