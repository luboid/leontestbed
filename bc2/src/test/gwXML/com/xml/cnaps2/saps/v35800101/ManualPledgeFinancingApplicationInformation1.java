//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.11 at 04:34:24 ���� CST 
//


package com.xml.cnaps2.saps.v35800101;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ManualPledgeFinancingApplicationInformation1 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ManualPledgeFinancingApplicationInformation1">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="MmbId" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.358.001.01}Max14Text"/>
 *         &lt;element name="PldgId" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.358.001.01}Max14Text" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ManualPledgeFinancingApplicationInformation1", propOrder = {
    "mmbId",
    "pldgId"
})
public class ManualPledgeFinancingApplicationInformation1 {

    @XmlElement(name = "MmbId", required = true)
    protected String mmbId;
    @XmlElement(name = "PldgId")
    protected String pldgId;

    /**
     * Gets the value of the mmbId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMmbId() {
        return mmbId;
    }

    /**
     * Sets the value of the mmbId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMmbId(String value) {
        this.mmbId = value;
    }

    /**
     * Gets the value of the pldgId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPldgId() {
        return pldgId;
    }

    /**
     * Sets the value of the pldgId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPldgId(String value) {
        this.pldgId = value;
    }

}
