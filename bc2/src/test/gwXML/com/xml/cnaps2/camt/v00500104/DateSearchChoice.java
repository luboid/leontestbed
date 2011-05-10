//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.03 at 08:44:53 ���� CST 
//


package com.xml.cnaps2.camt.v00500104;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for DateSearchChoice complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="DateSearchChoice">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;choice>
 *           &lt;element name="FrDt" type="{urn:swift:xsd:camt.005.001.04}ISODate"/>
 *           &lt;element name="ToDt" type="{urn:swift:xsd:camt.005.001.04}ISODate"/>
 *           &lt;element name="FrToDt" type="{urn:swift:xsd:camt.005.001.04}DatePeriodDetails"/>
 *           &lt;element name="EQDt" type="{urn:swift:xsd:camt.005.001.04}ISODate"/>
 *           &lt;element name="NEQDt" type="{urn:swift:xsd:camt.005.001.04}ISODate"/>
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
@XmlType(name = "DateSearchChoice", propOrder = {
    "frDt",
    "toDt",
    "frToDt",
    "eqDt",
    "neqDt"
})
public class DateSearchChoice {

    @XmlElement(name = "FrDt")
    protected XMLGregorianCalendar frDt;
    @XmlElement(name = "ToDt")
    protected XMLGregorianCalendar toDt;
    @XmlElement(name = "FrToDt")
    protected DatePeriodDetails frToDt;
    @XmlElement(name = "EQDt")
    protected XMLGregorianCalendar eqDt;
    @XmlElement(name = "NEQDt")
    protected XMLGregorianCalendar neqDt;

    /**
     * Gets the value of the frDt property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getFrDt() {
        return frDt;
    }

    /**
     * Sets the value of the frDt property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setFrDt(XMLGregorianCalendar value) {
        this.frDt = value;
    }

    /**
     * Gets the value of the toDt property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getToDt() {
        return toDt;
    }

    /**
     * Sets the value of the toDt property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setToDt(XMLGregorianCalendar value) {
        this.toDt = value;
    }

    /**
     * Gets the value of the frToDt property.
     * 
     * @return
     *     possible object is
     *     {@link DatePeriodDetails }
     *     
     */
    public DatePeriodDetails getFrToDt() {
        return frToDt;
    }

    /**
     * Sets the value of the frToDt property.
     * 
     * @param value
     *     allowed object is
     *     {@link DatePeriodDetails }
     *     
     */
    public void setFrToDt(DatePeriodDetails value) {
        this.frToDt = value;
    }

    /**
     * Gets the value of the eqDt property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getEQDt() {
        return eqDt;
    }

    /**
     * Sets the value of the eqDt property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setEQDt(XMLGregorianCalendar value) {
        this.eqDt = value;
    }

    /**
     * Gets the value of the neqDt property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getNEQDt() {
        return neqDt;
    }

    /**
     * Sets the value of the neqDt property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setNEQDt(XMLGregorianCalendar value) {
        this.neqDt = value;
    }

}