//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.03 at 08:44:41 ���� CST 
//


package com.xml.cnaps2.beps.v41700101;

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
 *         &lt;element name="RealTmInfRvslRspn" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.417.001.01}RealTimeInformationReversalResponese"/>
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
    "realTmInfRvslRspn"
})
public class Document {

    @XmlElement(name = "RealTmInfRvslRspn", required = true)
    protected RealTimeInformationReversalResponese realTmInfRvslRspn;

    /**
     * Gets the value of the realTmInfRvslRspn property.
     * 
     * @return
     *     possible object is
     *     {@link RealTimeInformationReversalResponese }
     *     
     */
    public RealTimeInformationReversalResponese getRealTmInfRvslRspn() {
        return realTmInfRvslRspn;
    }

    /**
     * Sets the value of the realTmInfRvslRspn property.
     * 
     * @param value
     *     allowed object is
     *     {@link RealTimeInformationReversalResponese }
     *     
     */
    public void setRealTmInfRvslRspn(RealTimeInformationReversalResponese value) {
        this.realTmInfRvslRspn = value;
    }

}
