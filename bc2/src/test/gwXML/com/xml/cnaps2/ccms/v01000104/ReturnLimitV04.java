//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.03 at 08:44:58 ���� CST 
//


package com.xml.cnaps2.camt.v01000104;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ReturnLimitV04 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ReturnLimitV04">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="MsgId" type="{urn:swift:xsd:camt.010.001.04}MessageIdentification"/>
 *         &lt;element name="BizQryRef" type="{urn:swift:xsd:camt.010.001.04}QueryReference" minOccurs="0"/>
 *         &lt;choice>
 *           &lt;element name="BizRpt" type="{urn:swift:xsd:camt.010.001.04}Limits3"/>
 *           &lt;element name="OprlErr" type="{urn:swift:xsd:camt.010.001.04}ErrorHandling3"/>
 *         &lt;/choice>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ReturnLimitV04", propOrder = {
    "msgId",
    "bizQryRef",
    "bizRpt",
    "oprlErr"
})
public class ReturnLimitV04 {

    @XmlElement(name = "MsgId", required = true)
    protected MessageIdentification msgId;
    @XmlElement(name = "BizQryRef")
    protected QueryReference bizQryRef;
    @XmlElement(name = "BizRpt")
    protected Limits3 bizRpt;
    @XmlElement(name = "OprlErr")
    protected ErrorHandling3 oprlErr;

    /**
     * Gets the value of the msgId property.
     * 
     * @return
     *     possible object is
     *     {@link MessageIdentification }
     *     
     */
    public MessageIdentification getMsgId() {
        return msgId;
    }

    /**
     * Sets the value of the msgId property.
     * 
     * @param value
     *     allowed object is
     *     {@link MessageIdentification }
     *     
     */
    public void setMsgId(MessageIdentification value) {
        this.msgId = value;
    }

    /**
     * Gets the value of the bizQryRef property.
     * 
     * @return
     *     possible object is
     *     {@link QueryReference }
     *     
     */
    public QueryReference getBizQryRef() {
        return bizQryRef;
    }

    /**
     * Sets the value of the bizQryRef property.
     * 
     * @param value
     *     allowed object is
     *     {@link QueryReference }
     *     
     */
    public void setBizQryRef(QueryReference value) {
        this.bizQryRef = value;
    }

    /**
     * Gets the value of the bizRpt property.
     * 
     * @return
     *     possible object is
     *     {@link Limits3 }
     *     
     */
    public Limits3 getBizRpt() {
        return bizRpt;
    }

    /**
     * Sets the value of the bizRpt property.
     * 
     * @param value
     *     allowed object is
     *     {@link Limits3 }
     *     
     */
    public void setBizRpt(Limits3 value) {
        this.bizRpt = value;
    }

    /**
     * Gets the value of the oprlErr property.
     * 
     * @return
     *     possible object is
     *     {@link ErrorHandling3 }
     *     
     */
    public ErrorHandling3 getOprlErr() {
        return oprlErr;
    }

    /**
     * Sets the value of the oprlErr property.
     * 
     * @param value
     *     allowed object is
     *     {@link ErrorHandling3 }
     *     
     */
    public void setOprlErr(ErrorHandling3 value) {
        this.oprlErr = value;
    }

}
