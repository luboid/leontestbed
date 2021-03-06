//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.11 at 04:34:46 ���� CST 
//


package com.xml.cnaps2.saps.v37200101;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for AccountMaintenanceApplication1 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="AccountMaintenanceApplication1">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="MmbId" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.372.001.01}Max14Text"/>
 *         &lt;element name="Nm" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.372.001.01}Max60Text" minOccurs="0"/>
 *         &lt;element name="OverdrftUpperLmt" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.372.001.01}ActiveCurrencyAndAmount" minOccurs="0"/>
 *         &lt;element name="RstrctAmtLwrLmt" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.372.001.01}SummaryAmountText" minOccurs="0"/>
 *         &lt;element name="DbtRstrctSetng" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.372.001.01}DebitRestrictSettingCode1" minOccurs="0"/>
 *         &lt;element name="CdtRstrctSetng" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.372.001.01}CreditRestrictSettingCode1" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "AccountMaintenanceApplication1", propOrder = {
    "mmbId",
    "nm",
    "overdrftUpperLmt",
    "rstrctAmtLwrLmt",
    "dbtRstrctSetng",
    "cdtRstrctSetng"
})
public class AccountMaintenanceApplication1 {

    @XmlElement(name = "MmbId", required = true)
    protected String mmbId;
    @XmlElement(name = "Nm")
    protected String nm;
    @XmlElement(name = "OverdrftUpperLmt")
    protected ActiveCurrencyAndAmount overdrftUpperLmt;
    @XmlElement(name = "RstrctAmtLwrLmt")
    protected String rstrctAmtLwrLmt;
    @XmlElement(name = "DbtRstrctSetng")
    protected String dbtRstrctSetng;
    @XmlElement(name = "CdtRstrctSetng")
    protected String cdtRstrctSetng;

    /**
     * Gets the value of the mmbId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMmbId() {
        return mmbId;
    }

    /**
     * Sets the value of the mmbId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMmbId(String value) {
        this.mmbId = value;
    }

    /**
     * Gets the value of the nm property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNm() {
        return nm;
    }

    /**
     * Sets the value of the nm property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNm(String value) {
        this.nm = value;
    }

    /**
     * Gets the value of the overdrftUpperLmt property.
     * 
     * @return
     *     possible object is
     *     {@link ActiveCurrencyAndAmount }
     *     
     */
    public ActiveCurrencyAndAmount getOverdrftUpperLmt() {
        return overdrftUpperLmt;
    }

    /**
     * Sets the value of the overdrftUpperLmt property.
     * 
     * @param value
     *     allowed object is
     *     {@link ActiveCurrencyAndAmount }
     *     
     */
    public void setOverdrftUpperLmt(ActiveCurrencyAndAmount value) {
        this.overdrftUpperLmt = value;
    }

    /**
     * Gets the value of the rstrctAmtLwrLmt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRstrctAmtLwrLmt() {
        return rstrctAmtLwrLmt;
    }

    /**
     * Sets the value of the rstrctAmtLwrLmt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRstrctAmtLwrLmt(String value) {
        this.rstrctAmtLwrLmt = value;
    }

    /**
     * Gets the value of the dbtRstrctSetng property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDbtRstrctSetng() {
        return dbtRstrctSetng;
    }

    /**
     * Sets the value of the dbtRstrctSetng property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDbtRstrctSetng(String value) {
        this.dbtRstrctSetng = value;
    }

    /**
     * Gets the value of the cdtRstrctSetng property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCdtRstrctSetng() {
        return cdtRstrctSetng;
    }

    /**
     * Sets the value of the cdtRstrctSetng property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCdtRstrctSetng(String value) {
        this.cdtRstrctSetng = value;
    }

}
