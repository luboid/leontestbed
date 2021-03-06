//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.12 at 03:04:15 ���� CST 
//


package com.xml.iso20022.camt.v00500104;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TransactionSearchCriteria3 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TransactionSearchCriteria3">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="PmtTo" type="{urn:swift:xsd:camt.005.001.04}SystemSearch2" minOccurs="0"/>
 *         &lt;element name="PmtFr" type="{urn:swift:xsd:camt.005.001.04}SystemSearch2" minOccurs="0"/>
 *         &lt;element name="PmtSch" type="{urn:swift:xsd:camt.005.001.04}PaymentSearch3" minOccurs="0"/>
 *         &lt;element name="AcctNtrySch" type="{urn:swift:xsd:camt.005.001.04}AccountCashEntrySearch2" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TransactionSearchCriteria3", propOrder = {
    "pmtTo",
    "pmtFr",
    "pmtSch",
    "acctNtrySch"
})
public class TransactionSearchCriteria3 {

    @XmlElement(name = "PmtTo")
    protected SystemSearch2 pmtTo;
    @XmlElement(name = "PmtFr")
    protected SystemSearch2 pmtFr;
    @XmlElement(name = "PmtSch")
    protected PaymentSearch3 pmtSch;
    @XmlElement(name = "AcctNtrySch")
    protected AccountCashEntrySearch2 acctNtrySch;

    /**
     * Gets the value of the pmtTo property.
     * 
     * @return
     *     possible object is
     *     {@link SystemSearch2 }
     *     
     */
    public SystemSearch2 getPmtTo() {
        return pmtTo;
    }

    /**
     * Sets the value of the pmtTo property.
     * 
     * @param value
     *     allowed object is
     *     {@link SystemSearch2 }
     *     
     */
    public void setPmtTo(SystemSearch2 value) {
        this.pmtTo = value;
    }

    /**
     * Gets the value of the pmtFr property.
     * 
     * @return
     *     possible object is
     *     {@link SystemSearch2 }
     *     
     */
    public SystemSearch2 getPmtFr() {
        return pmtFr;
    }

    /**
     * Sets the value of the pmtFr property.
     * 
     * @param value
     *     allowed object is
     *     {@link SystemSearch2 }
     *     
     */
    public void setPmtFr(SystemSearch2 value) {
        this.pmtFr = value;
    }

    /**
     * Gets the value of the pmtSch property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentSearch3 }
     *     
     */
    public PaymentSearch3 getPmtSch() {
        return pmtSch;
    }

    /**
     * Sets the value of the pmtSch property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentSearch3 }
     *     
     */
    public void setPmtSch(PaymentSearch3 value) {
        this.pmtSch = value;
    }

    /**
     * Gets the value of the acctNtrySch property.
     * 
     * @return
     *     possible object is
     *     {@link AccountCashEntrySearch2 }
     *     
     */
    public AccountCashEntrySearch2 getAcctNtrySch() {
        return acctNtrySch;
    }

    /**
     * Sets the value of the acctNtrySch property.
     * 
     * @param value
     *     allowed object is
     *     {@link AccountCashEntrySearch2 }
     *     
     */
    public void setAcctNtrySch(AccountCashEntrySearch2 value) {
        this.acctNtrySch = value;
    }

}
