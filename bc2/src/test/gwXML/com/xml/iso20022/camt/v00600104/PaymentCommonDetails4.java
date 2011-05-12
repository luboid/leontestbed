//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.03 at 08:44:55 ���� CST 
//


package com.xml.iso20022.camt.v00600104;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for PaymentCommonDetails4 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="PaymentCommonDetails4">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="PmtFr" type="{urn:swift:xsd:camt.006.001.04}SystemDetails2" minOccurs="0"/>
 *         &lt;element name="PmtTo" type="{urn:swift:xsd:camt.006.001.04}SystemDetails2" minOccurs="0"/>
 *         &lt;element name="CmonInstrSts" type="{urn:swift:xsd:camt.006.001.04}PaymentStatusDetails4" minOccurs="0"/>
 *         &lt;element name="TrfValDt" type="{urn:swift:xsd:camt.006.001.04}DateAndDateTimeChoice" minOccurs="0"/>
 *         &lt;element name="NtryDt" type="{urn:swift:xsd:camt.006.001.04}DateAndDateTimeChoice" minOccurs="0"/>
 *         &lt;element name="CdtDbtInd" type="{urn:swift:xsd:camt.006.001.04}CreditDebitCode" minOccurs="0"/>
 *         &lt;element name="PmtMtd" type="{urn:swift:xsd:camt.006.001.04}PaymentOrigin1Choice" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "PaymentCommonDetails4", propOrder = {
    "pmtFr",
    "pmtTo",
    "cmonInstrSts",
    "trfValDt",
    "ntryDt",
    "cdtDbtInd",
    "pmtMtd"
})
public class PaymentCommonDetails4 {

    @XmlElement(name = "PmtFr")
    protected SystemDetails2 pmtFr;
    @XmlElement(name = "PmtTo")
    protected SystemDetails2 pmtTo;
    @XmlElement(name = "CmonInstrSts")
    protected PaymentStatusDetails4 cmonInstrSts;
    @XmlElement(name = "TrfValDt")
    protected DateAndDateTimeChoice trfValDt;
    @XmlElement(name = "NtryDt")
    protected DateAndDateTimeChoice ntryDt;
    @XmlElement(name = "CdtDbtInd")
    protected String cdtDbtInd;
    @XmlElement(name = "PmtMtd")
    protected PaymentOrigin1Choice pmtMtd;

    /**
     * Gets the value of the pmtFr property.
     * 
     * @return
     *     possible object is
     *     {@link SystemDetails2 }
     *     
     */
    public SystemDetails2 getPmtFr() {
        return pmtFr;
    }

    /**
     * Sets the value of the pmtFr property.
     * 
     * @param value
     *     allowed object is
     *     {@link SystemDetails2 }
     *     
     */
    public void setPmtFr(SystemDetails2 value) {
        this.pmtFr = value;
    }

    /**
     * Gets the value of the pmtTo property.
     * 
     * @return
     *     possible object is
     *     {@link SystemDetails2 }
     *     
     */
    public SystemDetails2 getPmtTo() {
        return pmtTo;
    }

    /**
     * Sets the value of the pmtTo property.
     * 
     * @param value
     *     allowed object is
     *     {@link SystemDetails2 }
     *     
     */
    public void setPmtTo(SystemDetails2 value) {
        this.pmtTo = value;
    }

    /**
     * Gets the value of the cmonInstrSts property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentStatusDetails4 }
     *     
     */
    public PaymentStatusDetails4 getCmonInstrSts() {
        return cmonInstrSts;
    }

    /**
     * Sets the value of the cmonInstrSts property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentStatusDetails4 }
     *     
     */
    public void setCmonInstrSts(PaymentStatusDetails4 value) {
        this.cmonInstrSts = value;
    }

    /**
     * Gets the value of the trfValDt property.
     * 
     * @return
     *     possible object is
     *     {@link DateAndDateTimeChoice }
     *     
     */
    public DateAndDateTimeChoice getTrfValDt() {
        return trfValDt;
    }

    /**
     * Sets the value of the trfValDt property.
     * 
     * @param value
     *     allowed object is
     *     {@link DateAndDateTimeChoice }
     *     
     */
    public void setTrfValDt(DateAndDateTimeChoice value) {
        this.trfValDt = value;
    }

    /**
     * Gets the value of the ntryDt property.
     * 
     * @return
     *     possible object is
     *     {@link DateAndDateTimeChoice }
     *     
     */
    public DateAndDateTimeChoice getNtryDt() {
        return ntryDt;
    }

    /**
     * Sets the value of the ntryDt property.
     * 
     * @param value
     *     allowed object is
     *     {@link DateAndDateTimeChoice }
     *     
     */
    public void setNtryDt(DateAndDateTimeChoice value) {
        this.ntryDt = value;
    }

    /**
     * Gets the value of the cdtDbtInd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCdtDbtInd() {
        return cdtDbtInd;
    }

    /**
     * Sets the value of the cdtDbtInd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCdtDbtInd(String value) {
        this.cdtDbtInd = value;
    }

    /**
     * Gets the value of the pmtMtd property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentOrigin1Choice }
     *     
     */
    public PaymentOrigin1Choice getPmtMtd() {
        return pmtMtd;
    }

    /**
     * Sets the value of the pmtMtd property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentOrigin1Choice }
     *     
     */
    public void setPmtMtd(PaymentOrigin1Choice value) {
        this.pmtMtd = value;
    }

}