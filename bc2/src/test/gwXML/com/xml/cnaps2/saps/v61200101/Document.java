//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.11 at 04:34:59 ���� CST 
//


package com.xml.cnaps2.saps.v61200101;

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
 *         &lt;element name="UnltrlTx" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.612.001.01}UnltrlTxV01"/>
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
    "unltrlTx"
})
public class Document {

    @XmlElement(name = "UnltrlTx", required = true)
    protected UnltrlTxV01 unltrlTx;

    /**
     * Gets the value of the unltrlTx property.
     * 
     * @return
     *     possible object is
     *     {@link UnltrlTxV01 }
     *     
     */
    public UnltrlTxV01 getUnltrlTx() {
        return unltrlTx;
    }

    /**
     * Sets the value of the unltrlTx property.
     * 
     * @param value
     *     allowed object is
     *     {@link UnltrlTxV01 }
     *     
     */
    public void setUnltrlTx(UnltrlTxV01 value) {
        this.unltrlTx = value;
    }

}
