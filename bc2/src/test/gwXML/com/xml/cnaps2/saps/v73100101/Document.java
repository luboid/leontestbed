//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.11 at 04:35:08 ���� CST 
//


package com.xml.cnaps2.saps.v73100101;

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
 *         &lt;element name="ACSABSSttlmDtlAppl" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.731.001.01}ACSABSSttlmDtlApplV01"/>
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
    "acsabsSttlmDtlAppl"
})
public class Document {

    @XmlElement(name = "ACSABSSttlmDtlAppl", required = true)
    protected ACSABSSttlmDtlApplV01 acsabsSttlmDtlAppl;

    /**
     * Gets the value of the acsabsSttlmDtlAppl property.
     * 
     * @return
     *     possible object is
     *     {@link ACSABSSttlmDtlApplV01 }
     *     
     */
    public ACSABSSttlmDtlApplV01 getACSABSSttlmDtlAppl() {
        return acsabsSttlmDtlAppl;
    }

    /**
     * Sets the value of the acsabsSttlmDtlAppl property.
     * 
     * @param value
     *     allowed object is
     *     {@link ACSABSSttlmDtlApplV01 }
     *     
     */
    public void setAcsabsSttlmDtlAppl(ACSABSSttlmDtlApplV01 value) {
        this.acsabsSttlmDtlAppl = value;
    }

}
