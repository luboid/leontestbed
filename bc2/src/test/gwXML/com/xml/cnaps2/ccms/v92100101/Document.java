//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.03 at 08:45:46 ���� CST 
//


package com.xml.cnaps2.ccms.v92100101;

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
 *         &lt;element name="CertDwnLdRspn" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.921.001.01}CertDwnLdRspnV01"/>
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
    "certDwnLdRspn"
})
public class Document {

    @XmlElement(name = "CertDwnLdRspn", required = true)
    protected CertDwnLdRspnV01 certDwnLdRspn;

    /**
     * Gets the value of the certDwnLdRspn property.
     * 
     * @return
     *     possible object is
     *     {@link CertDwnLdRspnV01 }
     *     
     */
    public CertDwnLdRspnV01 getCertDwnLdRspn() {
        return certDwnLdRspn;
    }

    /**
     * Sets the value of the certDwnLdRspn property.
     * 
     * @param value
     *     allowed object is
     *     {@link CertDwnLdRspnV01 }
     *     
     */
    public void setCertDwnLdRspn(CertDwnLdRspnV01 value) {
        this.certDwnLdRspn = value;
    }

}
