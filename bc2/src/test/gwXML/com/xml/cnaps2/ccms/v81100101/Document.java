//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.03 at 08:45:31 ���� CST 
//


package com.xml.cnaps2.ccms.v81100101;

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
 *         &lt;element name="ACSSpclTmEndNtfctn" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.811.001.01}ACSSpclTmEndNtfctnV01"/>
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
    "acsSpclTmEndNtfctn"
})
public class Document {

    @XmlElement(name = "ACSSpclTmEndNtfctn", required = true)
    protected ACSSpclTmEndNtfctnV01 acsSpclTmEndNtfctn;

    /**
     * Gets the value of the acsSpclTmEndNtfctn property.
     * 
     * @return
     *     possible object is
     *     {@link ACSSpclTmEndNtfctnV01 }
     *     
     */
    public ACSSpclTmEndNtfctnV01 getACSSpclTmEndNtfctn() {
        return acsSpclTmEndNtfctn;
    }

    /**
     * Sets the value of the acsSpclTmEndNtfctn property.
     * 
     * @param value
     *     allowed object is
     *     {@link ACSSpclTmEndNtfctnV01 }
     *     
     */
    public void setACSSpclTmEndNtfctn(ACSSpclTmEndNtfctnV01 value) {
        this.acsSpclTmEndNtfctn = value;
    }

}
