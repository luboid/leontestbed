//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.04.27 at 06:59:34 ���� CST 
//


package com.xml.cnaps2.ccms;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ConfInfV01 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ConfInfV01">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="OrigSndr" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.990.001.02}Max14Text"/>
 *         &lt;element name="OrigSndDt" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.990.001.02}Max8Text"/>
 *         &lt;element name="MT" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.990.001.02}Max20Text"/>
 *         &lt;element name="MsgId" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.990.001.02}Max20Text"/>
 *         &lt;element name="MsgRefId" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.990.001.02}Max20Text"/>
 *         &lt;element name="MsgPrcCd" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.990.001.02}Max8Text"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ConfInfV01", propOrder = {
    "origSndr",
    "origSndDt",
    "mt",
    "msgId",
    "msgRefId",
    "msgPrcCd"
})
public class ConfInfV01 {

    @XmlElement(name = "OrigSndr", required = true)
    protected String origSndr;
    @XmlElement(name = "OrigSndDt", required = true)
    protected String origSndDt;
    @XmlElement(name = "MT", required = true)
    protected String mt;
    @XmlElement(name = "MsgId", required = true)
    protected String msgId;
    @XmlElement(name = "MsgRefId", required = true)
    protected String msgRefId;
    @XmlElement(name = "MsgPrcCd", required = true)
    protected String msgPrcCd;

    /**
     * Gets the value of the origSndr property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrigSndr() {
        return origSndr;
    }

    /**
     * Sets the value of the origSndr property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrigSndr(String value) {
        this.origSndr = value;
    }

    /**
     * Gets the value of the origSndDt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrigSndDt() {
        return origSndDt;
    }

    /**
     * Sets the value of the origSndDt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrigSndDt(String value) {
        this.origSndDt = value;
    }

    /**
     * Gets the value of the mt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMT() {
        return mt;
    }

    /**
     * Sets the value of the mt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMT(String value) {
        this.mt = value;
    }

    /**
     * Gets the value of the msgId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMsgId() {
        return msgId;
    }

    /**
     * Sets the value of the msgId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMsgId(String value) {
        this.msgId = value;
    }

    /**
     * Gets the value of the msgRefId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMsgRefId() {
        return msgRefId;
    }

    /**
     * Sets the value of the msgRefId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMsgRefId(String value) {
        this.msgRefId = value;
    }

    /**
     * Gets the value of the msgPrcCd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMsgPrcCd() {
        return msgPrcCd;
    }

    /**
     * Sets the value of the msgPrcCd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMsgPrcCd(String value) {
        this.msgPrcCd = value;
    }

}
