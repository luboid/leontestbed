//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.11 at 04:33:50 ���� CST 
//


package com.xml.cnaps2.hvps.v71200101;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Dtls1 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Dtls1">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="TxTpCd" type="{urn:cnaps:std:hvps:2010:tech:xsd:hvps.712.001.01}Max6Text"/>
 *         &lt;element name="SndRcvTp" type="{urn:cnaps:std:hvps:2010:tech:xsd:hvps.712.001.01}SendReceiveCode1"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Dtls1", propOrder = {
    "txTpCd",
    "sndRcvTp"
})
public class Dtls1 {

    @XmlElement(name = "TxTpCd", required = true)
    protected String txTpCd;
    @XmlElement(name = "SndRcvTp", required = true)
    protected String sndRcvTp;

    /**
     * Gets the value of the txTpCd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTxTpCd() {
        return txTpCd;
    }

    /**
     * Sets the value of the txTpCd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTxTpCd(String value) {
        this.txTpCd = value;
    }

    /**
     * Gets the value of the sndRcvTp property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSndRcvTp() {
        return sndRcvTp;
    }

    /**
     * Sets the value of the sndRcvTp property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSndRcvTp(String value) {
        this.sndRcvTp = value;
    }

}
