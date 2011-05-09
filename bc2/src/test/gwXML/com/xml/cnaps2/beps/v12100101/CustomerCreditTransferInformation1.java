//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.03 at 08:44:14 ���� CST 
//


package com.xml.cnaps2.beps.v12100101;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for CustomerCreditTransferInformation1 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="CustomerCreditTransferInformation1">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="TxId" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.121.001.01}Max16NumericText"/>
 *         &lt;element name="Dbtr" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.121.001.01}Debtor1"/>
 *         &lt;element name="DbtrAcct" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.121.001.01}DebtorAccount1"/>
 *         &lt;element name="DbtrAgt" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.121.001.01}DebtorAgent1"/>
 *         &lt;element name="CdtrAgt" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.121.001.01}CreditorAgent1"/>
 *         &lt;element name="Cdtr" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.121.001.01}Creditor1"/>
 *         &lt;element name="CdtrAcct" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.121.001.01}CreditorAccount1"/>
 *         &lt;element name="Amt" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.121.001.01}ActiveCurrencyAndAmount"/>
 *         &lt;element name="PmtTpInf" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.121.001.01}PaymentTypeInformation1"/>
 *         &lt;element name="Purp" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.121.001.01}Purpose1"/>
 *         &lt;element name="AddtlInf" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.121.001.01}Max256Text" minOccurs="0"/>
 *         &lt;element name="CstmrCdtTrfAddtlInf" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.121.001.01}CustomerCreditTransferAdditionalInformation1" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "CustomerCreditTransferInformation1", propOrder = {
    "txId",
    "dbtr",
    "dbtrAcct",
    "dbtrAgt",
    "cdtrAgt",
    "cdtr",
    "cdtrAcct",
    "amt",
    "pmtTpInf",
    "purp",
    "addtlInf",
    "cstmrCdtTrfAddtlInf"
})
public class CustomerCreditTransferInformation1 {

    @XmlElement(name = "TxId", required = true)
    protected String txId;
    @XmlElement(name = "Dbtr", required = true)
    protected Debtor1 dbtr;
    @XmlElement(name = "DbtrAcct", required = true)
    protected DebtorAccount1 dbtrAcct;
    @XmlElement(name = "DbtrAgt", required = true)
    protected DebtorAgent1 dbtrAgt;
    @XmlElement(name = "CdtrAgt", required = true)
    protected CreditorAgent1 cdtrAgt;
    @XmlElement(name = "Cdtr", required = true)
    protected Creditor1 cdtr;
    @XmlElement(name = "CdtrAcct", required = true)
    protected CreditorAccount1 cdtrAcct;
    @XmlElement(name = "Amt", required = true)
    protected ActiveCurrencyAndAmount amt;
    @XmlElement(name = "PmtTpInf", required = true)
    protected PaymentTypeInformation1 pmtTpInf;
    @XmlElement(name = "Purp", required = true)
    protected Purpose1 purp;
    @XmlElement(name = "AddtlInf")
    protected String addtlInf;
    @XmlElement(name = "CstmrCdtTrfAddtlInf")
    protected CustomerCreditTransferAdditionalInformation1 cstmrCdtTrfAddtlInf;

    /**
     * Gets the value of the txId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTxId() {
        return txId;
    }

    /**
     * Sets the value of the txId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTxId(String value) {
        this.txId = value;
    }

    /**
     * Gets the value of the dbtr property.
     * 
     * @return
     *     possible object is
     *     {@link Debtor1 }
     *     
     */
    public Debtor1 getDbtr() {
        return dbtr;
    }

    /**
     * Sets the value of the dbtr property.
     * 
     * @param value
     *     allowed object is
     *     {@link Debtor1 }
     *     
     */
    public void setDbtr(Debtor1 value) {
        this.dbtr = value;
    }

    /**
     * Gets the value of the dbtrAcct property.
     * 
     * @return
     *     possible object is
     *     {@link DebtorAccount1 }
     *     
     */
    public DebtorAccount1 getDbtrAcct() {
        return dbtrAcct;
    }

    /**
     * Sets the value of the dbtrAcct property.
     * 
     * @param value
     *     allowed object is
     *     {@link DebtorAccount1 }
     *     
     */
    public void setDbtrAcct(DebtorAccount1 value) {
        this.dbtrAcct = value;
    }

    /**
     * Gets the value of the dbtrAgt property.
     * 
     * @return
     *     possible object is
     *     {@link DebtorAgent1 }
     *     
     */
    public DebtorAgent1 getDbtrAgt() {
        return dbtrAgt;
    }

    /**
     * Sets the value of the dbtrAgt property.
     * 
     * @param value
     *     allowed object is
     *     {@link DebtorAgent1 }
     *     
     */
    public void setDbtrAgt(DebtorAgent1 value) {
        this.dbtrAgt = value;
    }

    /**
     * Gets the value of the cdtrAgt property.
     * 
     * @return
     *     possible object is
     *     {@link CreditorAgent1 }
     *     
     */
    public CreditorAgent1 getCdtrAgt() {
        return cdtrAgt;
    }

    /**
     * Sets the value of the cdtrAgt property.
     * 
     * @param value
     *     allowed object is
     *     {@link CreditorAgent1 }
     *     
     */
    public void setCdtrAgt(CreditorAgent1 value) {
        this.cdtrAgt = value;
    }

    /**
     * Gets the value of the cdtr property.
     * 
     * @return
     *     possible object is
     *     {@link Creditor1 }
     *     
     */
    public Creditor1 getCdtr() {
        return cdtr;
    }

    /**
     * Sets the value of the cdtr property.
     * 
     * @param value
     *     allowed object is
     *     {@link Creditor1 }
     *     
     */
    public void setCdtr(Creditor1 value) {
        this.cdtr = value;
    }

    /**
     * Gets the value of the cdtrAcct property.
     * 
     * @return
     *     possible object is
     *     {@link CreditorAccount1 }
     *     
     */
    public CreditorAccount1 getCdtrAcct() {
        return cdtrAcct;
    }

    /**
     * Sets the value of the cdtrAcct property.
     * 
     * @param value
     *     allowed object is
     *     {@link CreditorAccount1 }
     *     
     */
    public void setCdtrAcct(CreditorAccount1 value) {
        this.cdtrAcct = value;
    }

    /**
     * Gets the value of the amt property.
     * 
     * @return
     *     possible object is
     *     {@link ActiveCurrencyAndAmount }
     *     
     */
    public ActiveCurrencyAndAmount getAmt() {
        return amt;
    }

    /**
     * Sets the value of the amt property.
     * 
     * @param value
     *     allowed object is
     *     {@link ActiveCurrencyAndAmount }
     *     
     */
    public void setAmt(ActiveCurrencyAndAmount value) {
        this.amt = value;
    }

    /**
     * Gets the value of the pmtTpInf property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentTypeInformation1 }
     *     
     */
    public PaymentTypeInformation1 getPmtTpInf() {
        return pmtTpInf;
    }

    /**
     * Sets the value of the pmtTpInf property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentTypeInformation1 }
     *     
     */
    public void setPmtTpInf(PaymentTypeInformation1 value) {
        this.pmtTpInf = value;
    }

    /**
     * Gets the value of the purp property.
     * 
     * @return
     *     possible object is
     *     {@link Purpose1 }
     *     
     */
    public Purpose1 getPurp() {
        return purp;
    }

    /**
     * Sets the value of the purp property.
     * 
     * @param value
     *     allowed object is
     *     {@link Purpose1 }
     *     
     */
    public void setPurp(Purpose1 value) {
        this.purp = value;
    }

    /**
     * Gets the value of the addtlInf property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAddtlInf() {
        return addtlInf;
    }

    /**
     * Sets the value of the addtlInf property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAddtlInf(String value) {
        this.addtlInf = value;
    }

    /**
     * Gets the value of the cstmrCdtTrfAddtlInf property.
     * 
     * @return
     *     possible object is
     *     {@link CustomerCreditTransferAdditionalInformation1 }
     *     
     */
    public CustomerCreditTransferAdditionalInformation1 getCstmrCdtTrfAddtlInf() {
        return cstmrCdtTrfAddtlInf;
    }

    /**
     * Sets the value of the cstmrCdtTrfAddtlInf property.
     * 
     * @param value
     *     allowed object is
     *     {@link CustomerCreditTransferAdditionalInformation1 }
     *     
     */
    public void setCstmrCdtTrfAddtlInf(CustomerCreditTransferAdditionalInformation1 value) {
        this.cstmrCdtTrfAddtlInf = value;
    }

}
