//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.12 at 01:56:25 ���� CST 
//


package com.xml.iso20022.camt.v00600104;

import java.math.BigDecimal;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for NumberAndSumOfTransactions2 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="NumberAndSumOfTransactions2">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="NbOfNtries" type="{urn:swift:xsd:camt.006.001.04}Max15NumericText" minOccurs="0"/>
 *         &lt;element name="Sum" type="{urn:swift:xsd:camt.006.001.04}DecimalNumber" minOccurs="0"/>
 *         &lt;element name="TtlNetNtryAmt" type="{urn:swift:xsd:camt.006.001.04}DecimalNumber" minOccurs="0"/>
 *         &lt;element name="CdtDbtInd" type="{urn:swift:xsd:camt.006.001.04}CreditDebitCode" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "NumberAndSumOfTransactions2", propOrder = {
    "nbOfNtries",
    "sum",
    "ttlNetNtryAmt",
    "cdtDbtInd"
})
public class NumberAndSumOfTransactions2 {

    @XmlElement(name = "NbOfNtries")
    protected String nbOfNtries;
    @XmlElement(name = "Sum")
    protected BigDecimal sum;
    @XmlElement(name = "TtlNetNtryAmt")
    protected BigDecimal ttlNetNtryAmt;
    @XmlElement(name = "CdtDbtInd")
    protected String cdtDbtInd;

    /**
     * Gets the value of the nbOfNtries property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNbOfNtries() {
        return nbOfNtries;
    }

    /**
     * Sets the value of the nbOfNtries property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNbOfNtries(String value) {
        this.nbOfNtries = value;
    }

    /**
     * Gets the value of the sum property.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getSum() {
        return sum;
    }

    /**
     * Sets the value of the sum property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setSum(BigDecimal value) {
        this.sum = value;
    }

    /**
     * Gets the value of the ttlNetNtryAmt property.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getTtlNetNtryAmt() {
        return ttlNetNtryAmt;
    }

    /**
     * Sets the value of the ttlNetNtryAmt property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setTtlNetNtryAmt(BigDecimal value) {
        this.ttlNetNtryAmt = value;
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

}
