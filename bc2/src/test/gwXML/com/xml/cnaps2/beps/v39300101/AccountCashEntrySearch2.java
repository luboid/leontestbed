//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.10 at 04:00:27 ���� CST 
//


package com.xml.cnaps2.beps.v39300101;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for AccountCashEntrySearch2 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="AccountCashEntrySearch2">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="AcctId" type="{urn:swift:xsd:camt.005.001.04}AccountIdentificationSearchCriteriaChoice" minOccurs="0"/>
 *         &lt;element name="NtryAmt" type="{urn:swift:xsd:camt.005.001.04}AmountRangeChoice" minOccurs="0"/>
 *         &lt;element name="NtryAmtCcy" type="{urn:swift:xsd:camt.005.001.04}CurrencyCode" minOccurs="0"/>
 *         &lt;element name="CdtDbtInd" type="{urn:swift:xsd:camt.005.001.04}CreditDebitCode" minOccurs="0"/>
 *         &lt;element name="NtrySts" type="{urn:swift:xsd:camt.005.001.04}EntryStatus1Code" minOccurs="0"/>
 *         &lt;element name="NtryDt" type="{urn:swift:xsd:camt.005.001.04}DateAndDateTimeSearchChoice" minOccurs="0"/>
 *         &lt;element name="AcctOwnr" type="{urn:swift:xsd:camt.005.001.04}AnyBICIdentifier" minOccurs="0"/>
 *         &lt;element name="AcctSvcr" type="{urn:swift:xsd:camt.005.001.04}BICIdentifier" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "AccountCashEntrySearch2", propOrder = {
    "acctId",
    "ntryAmt",
    "ntryAmtCcy",
    "cdtDbtInd",
    "ntrySts",
    "ntryDt",
    "acctOwnr",
    "acctSvcr"
})
public class AccountCashEntrySearch2 {

    @XmlElement(name = "AcctId")
    protected AccountIdentificationSearchCriteriaChoice acctId;
    @XmlElement(name = "NtryAmt")
    protected AmountRangeChoice ntryAmt;
    @XmlElement(name = "NtryAmtCcy")
    protected String ntryAmtCcy;
    @XmlElement(name = "CdtDbtInd")
    protected String cdtDbtInd;
    @XmlElement(name = "NtrySts")
    protected String ntrySts;
    @XmlElement(name = "NtryDt")
    protected DateAndDateTimeSearchChoice ntryDt;
    @XmlElement(name = "AcctOwnr")
    protected String acctOwnr;
    @XmlElement(name = "AcctSvcr")
    protected String acctSvcr;

    /**
     * Gets the value of the acctId property.
     * 
     * @return
     *     possible object is
     *     {@link AccountIdentificationSearchCriteriaChoice }
     *     
     */
    public AccountIdentificationSearchCriteriaChoice getAcctId() {
        return acctId;
    }

    /**
     * Sets the value of the acctId property.
     * 
     * @param value
     *     allowed object is
     *     {@link AccountIdentificationSearchCriteriaChoice }
     *     
     */
    public void setAcctId(AccountIdentificationSearchCriteriaChoice value) {
        this.acctId = value;
    }

    /**
     * Gets the value of the ntryAmt property.
     * 
     * @return
     *     possible object is
     *     {@link AmountRangeChoice }
     *     
     */
    public AmountRangeChoice getNtryAmt() {
        return ntryAmt;
    }

    /**
     * Sets the value of the ntryAmt property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountRangeChoice }
     *     
     */
    public void setNtryAmt(AmountRangeChoice value) {
        this.ntryAmt = value;
    }

    /**
     * Gets the value of the ntryAmtCcy property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNtryAmtCcy() {
        return ntryAmtCcy;
    }

    /**
     * Sets the value of the ntryAmtCcy property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNtryAmtCcy(String value) {
        this.ntryAmtCcy = value;
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
     * Gets the value of the ntrySts property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNtrySts() {
        return ntrySts;
    }

    /**
     * Sets the value of the ntrySts property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNtrySts(String value) {
        this.ntrySts = value;
    }

    /**
     * Gets the value of the ntryDt property.
     * 
     * @return
     *     possible object is
     *     {@link DateAndDateTimeSearchChoice }
     *     
     */
    public DateAndDateTimeSearchChoice getNtryDt() {
        return ntryDt;
    }

    /**
     * Sets the value of the ntryDt property.
     * 
     * @param value
     *     allowed object is
     *     {@link DateAndDateTimeSearchChoice }
     *     
     */
    public void setNtryDt(DateAndDateTimeSearchChoice value) {
        this.ntryDt = value;
    }

    /**
     * Gets the value of the acctOwnr property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAcctOwnr() {
        return acctOwnr;
    }

    /**
     * Sets the value of the acctOwnr property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAcctOwnr(String value) {
        this.acctOwnr = value;
    }

    /**
     * Gets the value of the acctSvcr property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAcctSvcr() {
        return acctSvcr;
    }

    /**
     * Sets the value of the acctSvcr property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAcctSvcr(String value) {
        this.acctSvcr = value;
    }

}
