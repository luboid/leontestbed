//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.03 at 08:44:47 ���� CST 
//


package com.xml.cnaps2.beps.v72300101;

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
 *         &lt;element name="DtlChckRspn" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.723.001.01}DetailCheckResponsion"/>
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
    "dtlChckRspn"
})
public class Document {

    @XmlElement(name = "DtlChckRspn", required = true)
    protected DetailCheckResponsion dtlChckRspn;

    /**
     * Gets the value of the dtlChckRspn property.
     * 
     * @return
     *     possible object is
     *     {@link DetailCheckResponsion }
     *     
     */
    public DetailCheckResponsion getDtlChckRspn() {
        return dtlChckRspn;
    }

    /**
     * Sets the value of the dtlChckRspn property.
     * 
     * @param value
     *     allowed object is
     *     {@link DetailCheckResponsion }
     *     
     */
    public void setDtlChckRspn(DetailCheckResponsion value) {
        this.dtlChckRspn = value;
    }

}
