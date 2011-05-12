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
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for PaymentDetails7 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="PaymentDetails7">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="TxRef" type="{urn:swift:xsd:camt.006.001.04}Max35Text" minOccurs="0"/>
 *         &lt;element name="TrfValDt" type="{urn:swift:xsd:camt.006.001.04}DateAndDateTimeChoice" minOccurs="0"/>
 *         &lt;element name="InstrSts" type="{urn:swift:xsd:camt.006.001.04}PaymentStatusDetails4" minOccurs="0"/>
 *         &lt;element name="InstdAmt" type="{urn:swift:xsd:camt.006.001.04}AmountChoice" minOccurs="0"/>
 *         &lt;element name="IntrBkSttlmAmt" type="{urn:swift:xsd:camt.006.001.04}AmountChoice" minOccurs="0"/>
 *         &lt;element name="Purp" type="{urn:swift:xsd:camt.006.001.04}Max10Text" minOccurs="0"/>
 *         &lt;element name="PmtMtd" type="{urn:swift:xsd:camt.006.001.04}PaymentOrigin1Choice" minOccurs="0"/>
 *         &lt;element name="Prty" type="{urn:swift:xsd:camt.006.001.04}PriorityCodeChoice" minOccurs="0"/>
 *         &lt;element name="PrcgVldtyTm" type="{urn:swift:xsd:camt.006.001.04}DateTimePeriodChoice" minOccurs="0"/>
 *         &lt;element name="InstrCpy" type="{urn:swift:xsd:camt.006.001.04}Max20000Text" minOccurs="0"/>
 *         &lt;element name="PmtTp" type="{urn:swift:xsd:camt.006.001.04}PaymentType2Choice" minOccurs="0"/>
 *         &lt;element name="PmtInstrRef" type="{urn:swift:xsd:camt.006.001.04}Max35Text" minOccurs="0"/>
 *         &lt;element name="IntrBkValDt" type="{urn:swift:xsd:camt.006.001.04}ISODate" minOccurs="0"/>
 *         &lt;element name="RltdRef" type="{urn:swift:xsd:camt.006.001.04}Max35Text" minOccurs="0"/>
 *         &lt;element name="PmtTxPty" type="{urn:swift:xsd:camt.006.001.04}PaymentTransactionParty" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "PaymentDetails7", propOrder = {
    "txRef",
    "trfValDt",
    "instrSts",
    "instdAmt",
    "intrBkSttlmAmt",
    "purp",
    "pmtMtd",
    "prty",
    "prcgVldtyTm",
    "instrCpy",
    "pmtTp",
    "pmtInstrRef",
    "intrBkValDt",
    "rltdRef",
    "pmtTxPty"
})
public class PaymentDetails7 {

    @XmlElement(name = "TxRef")
    protected String txRef;
    @XmlElement(name = "TrfValDt")
    protected DateAndDateTimeChoice trfValDt;
    @XmlElement(name = "InstrSts")
    protected PaymentStatusDetails4 instrSts;
    @XmlElement(name = "InstdAmt")
    protected AmountChoice instdAmt;
    @XmlElement(name = "IntrBkSttlmAmt")
    protected AmountChoice intrBkSttlmAmt;
    @XmlElement(name = "Purp")
    protected String purp;
    @XmlElement(name = "PmtMtd")
    protected PaymentOrigin1Choice pmtMtd;
    @XmlElement(name = "Prty")
    protected PriorityCodeChoice prty;
    @XmlElement(name = "PrcgVldtyTm")
    protected DateTimePeriodChoice prcgVldtyTm;
    @XmlElement(name = "InstrCpy")
    protected String instrCpy;
    @XmlElement(name = "PmtTp")
    protected PaymentType2Choice pmtTp;
    @XmlElement(name = "PmtInstrRef")
    protected String pmtInstrRef;
    @XmlElement(name = "IntrBkValDt")
    protected XMLGregorianCalendar intrBkValDt;
    @XmlElement(name = "RltdRef")
    protected String rltdRef;
    @XmlElement(name = "PmtTxPty")
    protected PaymentTransactionParty pmtTxPty;

    /**
     * Gets the value of the txRef property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTxRef() {
        return txRef;
    }

    /**
     * Sets the value of the txRef property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTxRef(String value) {
        this.txRef = value;
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
     * Gets the value of the instrSts property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentStatusDetails4 }
     *     
     */
    public PaymentStatusDetails4 getInstrSts() {
        return instrSts;
    }

    /**
     * Sets the value of the instrSts property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentStatusDetails4 }
     *     
     */
    public void setInstrSts(PaymentStatusDetails4 value) {
        this.instrSts = value;
    }

    /**
     * Gets the value of the instdAmt property.
     * 
     * @return
     *     possible object is
     *     {@link AmountChoice }
     *     
     */
    public AmountChoice getInstdAmt() {
        return instdAmt;
    }

    /**
     * Sets the value of the instdAmt property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountChoice }
     *     
     */
    public void setInstdAmt(AmountChoice value) {
        this.instdAmt = value;
    }

    /**
     * Gets the value of the intrBkSttlmAmt property.
     * 
     * @return
     *     possible object is
     *     {@link AmountChoice }
     *     
     */
    public AmountChoice getIntrBkSttlmAmt() {
        return intrBkSttlmAmt;
    }

    /**
     * Sets the value of the intrBkSttlmAmt property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountChoice }
     *     
     */
    public void setIntrBkSttlmAmt(AmountChoice value) {
        this.intrBkSttlmAmt = value;
    }

    /**
     * Gets the value of the purp property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPurp() {
        return purp;
    }

    /**
     * Sets the value of the purp property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPurp(String value) {
        this.purp = value;
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

    /**
     * Gets the value of the prty property.
     * 
     * @return
     *     possible object is
     *     {@link PriorityCodeChoice }
     *     
     */
    public PriorityCodeChoice getPrty() {
        return prty;
    }

    /**
     * Sets the value of the prty property.
     * 
     * @param value
     *     allowed object is
     *     {@link PriorityCodeChoice }
     *     
     */
    public void setPrty(PriorityCodeChoice value) {
        this.prty = value;
    }

    /**
     * Gets the value of the prcgVldtyTm property.
     * 
     * @return
     *     possible object is
     *     {@link DateTimePeriodChoice }
     *     
     */
    public DateTimePeriodChoice getPrcgVldtyTm() {
        return prcgVldtyTm;
    }

    /**
     * Sets the value of the prcgVldtyTm property.
     * 
     * @param value
     *     allowed object is
     *     {@link DateTimePeriodChoice }
     *     
     */
    public void setPrcgVldtyTm(DateTimePeriodChoice value) {
        this.prcgVldtyTm = value;
    }

    /**
     * Gets the value of the instrCpy property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInstrCpy() {
        return instrCpy;
    }

    /**
     * Sets the value of the instrCpy property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInstrCpy(String value) {
        this.instrCpy = value;
    }

    /**
     * Gets the value of the pmtTp property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentType2Choice }
     *     
     */
    public PaymentType2Choice getPmtTp() {
        return pmtTp;
    }

    /**
     * Sets the value of the pmtTp property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentType2Choice }
     *     
     */
    public void setPmtTp(PaymentType2Choice value) {
        this.pmtTp = value;
    }

    /**
     * Gets the value of the pmtInstrRef property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPmtInstrRef() {
        return pmtInstrRef;
    }

    /**
     * Sets the value of the pmtInstrRef property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPmtInstrRef(String value) {
        this.pmtInstrRef = value;
    }

    /**
     * Gets the value of the intrBkValDt property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getIntrBkValDt() {
        return intrBkValDt;
    }

    /**
     * Sets the value of the intrBkValDt property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setIntrBkValDt(XMLGregorianCalendar value) {
        this.intrBkValDt = value;
    }

    /**
     * Gets the value of the rltdRef property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRltdRef() {
        return rltdRef;
    }

    /**
     * Sets the value of the rltdRef property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRltdRef(String value) {
        this.rltdRef = value;
    }

    /**
     * Gets the value of the pmtTxPty property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentTransactionParty }
     *     
     */
    public PaymentTransactionParty getPmtTxPty() {
        return pmtTxPty;
    }

    /**
     * Sets the value of the pmtTxPty property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentTransactionParty }
     *     
     */
    public void setPmtTxPty(PaymentTransactionParty value) {
        this.pmtTxPty = value;
    }

}