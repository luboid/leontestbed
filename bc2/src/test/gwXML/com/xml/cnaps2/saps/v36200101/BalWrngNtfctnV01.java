//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.11 at 04:34:31 ���� CST 
//


package com.xml.cnaps2.saps.v36200101;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for BalWrngNtfctnV01 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="BalWrngNtfctnV01">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="GrpHdr" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.362.001.01}GroupHeader1"/>
 *         &lt;element name="BalWrngNtfctnInf" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.362.001.01}BalanceWarningNotificationInformation1"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "BalWrngNtfctnV01", propOrder = {
    "grpHdr",
    "balWrngNtfctnInf"
})
public class BalWrngNtfctnV01 {

    @XmlElement(name = "GrpHdr", required = true)
    protected GroupHeader1 grpHdr;
    @XmlElement(name = "BalWrngNtfctnInf", required = true)
    protected BalanceWarningNotificationInformation1 balWrngNtfctnInf;

    /**
     * Gets the value of the grpHdr property.
     * 
     * @return
     *     possible object is
     *     {@link GroupHeader1 }
     *     
     */
    public GroupHeader1 getGrpHdr() {
        return grpHdr;
    }

    /**
     * Sets the value of the grpHdr property.
     * 
     * @param value
     *     allowed object is
     *     {@link GroupHeader1 }
     *     
     */
    public void setGrpHdr(GroupHeader1 value) {
        this.grpHdr = value;
    }

    /**
     * Gets the value of the balWrngNtfctnInf property.
     * 
     * @return
     *     possible object is
     *     {@link BalanceWarningNotificationInformation1 }
     *     
     */
    public BalanceWarningNotificationInformation1 getBalWrngNtfctnInf() {
        return balWrngNtfctnInf;
    }

    /**
     * Sets the value of the balWrngNtfctnInf property.
     * 
     * @param value
     *     allowed object is
     *     {@link BalanceWarningNotificationInformation1 }
     *     
     */
    public void setBalWrngNtfctnInf(BalanceWarningNotificationInformation1 value) {
        this.balWrngNtfctnInf = value;
    }

}
