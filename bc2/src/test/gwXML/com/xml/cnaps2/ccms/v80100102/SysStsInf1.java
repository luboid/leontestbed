//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.03 at 08:45:22 ���� CST 
//


package com.xml.cnaps2.ccms.v80100102;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for SysStsInf1 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="SysStsInf1">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="OrgnlSysDt" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.801.001.02}ISODate"/>
 *         &lt;element name="OrgnlSysSts" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.801.001.02}SystemStatus1"/>
 *         &lt;element name="CurSysDt" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.801.001.02}ISODate"/>
 *         &lt;element name="CurSysSts" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.801.001.02}SystemStatus1"/>
 *         &lt;element name="HldayFlg" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.801.001.02}HolidayFlagCode1"/>
 *         &lt;element name="NxtSysDt" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.801.001.02}ISODate" minOccurs="0"/>
 *         &lt;element name="BkChngNb" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.801.001.02}Exact8NumericText" minOccurs="0"/>
 *         &lt;element name="BaseDataChngNb" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.801.001.02}Exact8NumericText" minOccurs="0"/>
 *         &lt;element name="CISChngNb" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.801.001.02}Exact8NumericText" minOccurs="0"/>
 *         &lt;element name="ParamChngNb" type="{urn:cnaps:std:ccms:2010:tech:xsd:ccms.801.001.02}Exact8NumericText" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "SysStsInf1", propOrder = {
    "orgnlSysDt",
    "orgnlSysSts",
    "curSysDt",
    "curSysSts",
    "hldayFlg",
    "nxtSysDt",
    "bkChngNb",
    "baseDataChngNb",
    "cisChngNb",
    "paramChngNb"
})
public class SysStsInf1 {

    @XmlElement(name = "OrgnlSysDt", required = true)
    protected XMLGregorianCalendar orgnlSysDt;
    @XmlElement(name = "OrgnlSysSts", required = true)
    protected String orgnlSysSts;
    @XmlElement(name = "CurSysDt", required = true)
    protected XMLGregorianCalendar curSysDt;
    @XmlElement(name = "CurSysSts", required = true)
    protected String curSysSts;
    @XmlElement(name = "HldayFlg", required = true)
    protected String hldayFlg;
    @XmlElement(name = "NxtSysDt")
    protected XMLGregorianCalendar nxtSysDt;
    @XmlElement(name = "BkChngNb")
    protected String bkChngNb;
    @XmlElement(name = "BaseDataChngNb")
    protected String baseDataChngNb;
    @XmlElement(name = "CISChngNb")
    protected String cisChngNb;
    @XmlElement(name = "ParamChngNb")
    protected String paramChngNb;

    /**
     * Gets the value of the orgnlSysDt property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getOrgnlSysDt() {
        return orgnlSysDt;
    }

    /**
     * Sets the value of the orgnlSysDt property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setOrgnlSysDt(XMLGregorianCalendar value) {
        this.orgnlSysDt = value;
    }

    /**
     * Gets the value of the orgnlSysSts property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrgnlSysSts() {
        return orgnlSysSts;
    }

    /**
     * Sets the value of the orgnlSysSts property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrgnlSysSts(String value) {
        this.orgnlSysSts = value;
    }

    /**
     * Gets the value of the curSysDt property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getCurSysDt() {
        return curSysDt;
    }

    /**
     * Sets the value of the curSysDt property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setCurSysDt(XMLGregorianCalendar value) {
        this.curSysDt = value;
    }

    /**
     * Gets the value of the curSysSts property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCurSysSts() {
        return curSysSts;
    }

    /**
     * Sets the value of the curSysSts property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCurSysSts(String value) {
        this.curSysSts = value;
    }

    /**
     * Gets the value of the hldayFlg property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHldayFlg() {
        return hldayFlg;
    }

    /**
     * Sets the value of the hldayFlg property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHldayFlg(String value) {
        this.hldayFlg = value;
    }

    /**
     * Gets the value of the nxtSysDt property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getNxtSysDt() {
        return nxtSysDt;
    }

    /**
     * Sets the value of the nxtSysDt property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setNxtSysDt(XMLGregorianCalendar value) {
        this.nxtSysDt = value;
    }

    /**
     * Gets the value of the bkChngNb property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBkChngNb() {
        return bkChngNb;
    }

    /**
     * Sets the value of the bkChngNb property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBkChngNb(String value) {
        this.bkChngNb = value;
    }

    /**
     * Gets the value of the baseDataChngNb property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBaseDataChngNb() {
        return baseDataChngNb;
    }

    /**
     * Sets the value of the baseDataChngNb property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBaseDataChngNb(String value) {
        this.baseDataChngNb = value;
    }

    /**
     * Gets the value of the cisChngNb property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCISChngNb() {
        return cisChngNb;
    }

    /**
     * Sets the value of the cisChngNb property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCISChngNb(String value) {
        this.cisChngNb = value;
    }

    /**
     * Gets the value of the paramChngNb property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getParamChngNb() {
        return paramChngNb;
    }

    /**
     * Sets the value of the paramChngNb property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setParamChngNb(String value) {
        this.paramChngNb = value;
    }

}
