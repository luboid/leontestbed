//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.03 at 08:45:09 ���� CST 
//


package com.xml.cnaps2.camt.v05500101;

import java.util.List;
import java.util.Vector;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for PaymentTransactionInformation30 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="PaymentTransactionInformation30">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="CxlId" type="{urn:iso:std:iso:20022:tech:xsd:camt.055.001.01}Max35Text" minOccurs="0"/>
 *         &lt;element name="Case" type="{urn:iso:std:iso:20022:tech:xsd:camt.055.001.01}Case2" minOccurs="0"/>
 *         &lt;element name="OrgnlInstrId" type="{urn:iso:std:iso:20022:tech:xsd:camt.055.001.01}Max35Text" minOccurs="0"/>
 *         &lt;element name="OrgnlEndToEndId" type="{urn:iso:std:iso:20022:tech:xsd:camt.055.001.01}Max35Text" minOccurs="0"/>
 *         &lt;element name="OrgnlInstdAmt" type="{urn:iso:std:iso:20022:tech:xsd:camt.055.001.01}ActiveOrHistoricCurrencyAndAmount" minOccurs="0"/>
 *         &lt;element name="OrgnlReqdExctnDt" type="{urn:iso:std:iso:20022:tech:xsd:camt.055.001.01}ISODate" minOccurs="0"/>
 *         &lt;element name="OrgnlReqdColltnDt" type="{urn:iso:std:iso:20022:tech:xsd:camt.055.001.01}ISODate" minOccurs="0"/>
 *         &lt;element name="CxlRsnInf" type="{urn:iso:std:iso:20022:tech:xsd:camt.055.001.01}CancellationReasonInformation3" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="OrgnlTxRef" type="{urn:iso:std:iso:20022:tech:xsd:camt.055.001.01}OriginalTransactionReference13" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "PaymentTransactionInformation30", propOrder = {
    "cxlId",
    "_case",
    "orgnlInstrId",
    "orgnlEndToEndId",
    "orgnlInstdAmt",
    "orgnlReqdExctnDt",
    "orgnlReqdColltnDt",
    "cxlRsnInf",
    "orgnlTxRef"
})
public class PaymentTransactionInformation30 {

    @XmlElement(name = "CxlId")
    protected String cxlId;
    @XmlElement(name = "Case")
    protected Case2 _case;
    @XmlElement(name = "OrgnlInstrId")
    protected String orgnlInstrId;
    @XmlElement(name = "OrgnlEndToEndId")
    protected String orgnlEndToEndId;
    @XmlElement(name = "OrgnlInstdAmt")
    protected ActiveOrHistoricCurrencyAndAmount orgnlInstdAmt;
    @XmlElement(name = "OrgnlReqdExctnDt")
    protected XMLGregorianCalendar orgnlReqdExctnDt;
    @XmlElement(name = "OrgnlReqdColltnDt")
    protected XMLGregorianCalendar orgnlReqdColltnDt;
    @XmlElement(name = "CxlRsnInf")
    protected List<CancellationReasonInformation3> cxlRsnInf = new Vector<CancellationReasonInformation3>();
    @XmlElement(name = "OrgnlTxRef")
    protected OriginalTransactionReference13 orgnlTxRef;

    /**
     * Gets the value of the cxlId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCxlId() {
        return cxlId;
    }

    /**
     * Sets the value of the cxlId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCxlId(String value) {
        this.cxlId = value;
    }

    /**
     * Gets the value of the case property.
     * 
     * @return
     *     possible object is
     *     {@link Case2 }
     *     
     */
    public Case2 getCase() {
        return _case;
    }

    /**
     * Sets the value of the case property.
     * 
     * @param value
     *     allowed object is
     *     {@link Case2 }
     *     
     */
    public void setCase(Case2 value) {
        this._case = value;
    }

    /**
     * Gets the value of the orgnlInstrId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrgnlInstrId() {
        return orgnlInstrId;
    }

    /**
     * Sets the value of the orgnlInstrId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrgnlInstrId(String value) {
        this.orgnlInstrId = value;
    }

    /**
     * Gets the value of the orgnlEndToEndId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrgnlEndToEndId() {
        return orgnlEndToEndId;
    }

    /**
     * Sets the value of the orgnlEndToEndId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrgnlEndToEndId(String value) {
        this.orgnlEndToEndId = value;
    }

    /**
     * Gets the value of the orgnlInstdAmt property.
     * 
     * @return
     *     possible object is
     *     {@link ActiveOrHistoricCurrencyAndAmount }
     *     
     */
    public ActiveOrHistoricCurrencyAndAmount getOrgnlInstdAmt() {
        return orgnlInstdAmt;
    }

    /**
     * Sets the value of the orgnlInstdAmt property.
     * 
     * @param value
     *     allowed object is
     *     {@link ActiveOrHistoricCurrencyAndAmount }
     *     
     */
    public void setOrgnlInstdAmt(ActiveOrHistoricCurrencyAndAmount value) {
        this.orgnlInstdAmt = value;
    }

    /**
     * Gets the value of the orgnlReqdExctnDt property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getOrgnlReqdExctnDt() {
        return orgnlReqdExctnDt;
    }

    /**
     * Sets the value of the orgnlReqdExctnDt property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setOrgnlReqdExctnDt(XMLGregorianCalendar value) {
        this.orgnlReqdExctnDt = value;
    }

    /**
     * Gets the value of the orgnlReqdColltnDt property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getOrgnlReqdColltnDt() {
        return orgnlReqdColltnDt;
    }

    /**
     * Sets the value of the orgnlReqdColltnDt property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setOrgnlReqdColltnDt(XMLGregorianCalendar value) {
        this.orgnlReqdColltnDt = value;
    }

    /**
     * Gets the value of the cxlRsnInf property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the cxlRsnInf property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getCxlRsnInf().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link CancellationReasonInformation3 }
     * 
     * 
     */
    public List<CancellationReasonInformation3> getCxlRsnInf() {
        if (cxlRsnInf == null) {
            cxlRsnInf = new Vector<CancellationReasonInformation3>();
        }
        return this.cxlRsnInf;
    }

    /**
     * Gets the value of the orgnlTxRef property.
     * 
     * @return
     *     possible object is
     *     {@link OriginalTransactionReference13 }
     *     
     */
    public OriginalTransactionReference13 getOrgnlTxRef() {
        return orgnlTxRef;
    }

    /**
     * Sets the value of the orgnlTxRef property.
     * 
     * @param value
     *     allowed object is
     *     {@link OriginalTransactionReference13 }
     *     
     */
    public void setOrgnlTxRef(OriginalTransactionReference13 value) {
        this.orgnlTxRef = value;
    }

}
