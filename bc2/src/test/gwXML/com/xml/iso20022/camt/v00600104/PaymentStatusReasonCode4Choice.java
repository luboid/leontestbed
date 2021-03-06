//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.12 at 01:56:25 ���� CST 
//


package com.xml.iso20022.camt.v00600104;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for PaymentStatusReasonCode4Choice complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="PaymentStatusReasonCode4Choice">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;choice>
 *           &lt;element name="UmtchdStsRsn" type="{urn:swift:xsd:camt.006.001.04}UnmatchedStatusReason1Code"/>
 *           &lt;element name="CancStsRsn" type="{urn:swift:xsd:camt.006.001.04}CancelledStatusReason1Code"/>
 *           &lt;element name="SspdStsRsn" type="{urn:swift:xsd:camt.006.001.04}SuspendedStatusReason1Code"/>
 *           &lt;element name="PdgFlngSttlm" type="{urn:swift:xsd:camt.006.001.04}PendingFailingSettlement1Code"/>
 *           &lt;element name="PdgSttlm" type="{urn:swift:xsd:camt.006.001.04}PendingSettlement2Code"/>
 *           &lt;element name="PrtryRjctnRsn" type="{urn:swift:xsd:camt.006.001.04}ProprietaryStatusJustification"/>
 *           &lt;element name="PrtryRsn" type="{urn:swift:xsd:camt.006.001.04}Max4AlphaNumericText"/>
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
@XmlType(name = "PaymentStatusReasonCode4Choice", propOrder = {
    "umtchdStsRsn",
    "cancStsRsn",
    "sspdStsRsn",
    "pdgFlngSttlm",
    "pdgSttlm",
    "prtryRjctnRsn",
    "prtryRsn"
})
public class PaymentStatusReasonCode4Choice {

    @XmlElement(name = "UmtchdStsRsn")
    protected String umtchdStsRsn;
    @XmlElement(name = "CancStsRsn")
    protected String cancStsRsn;
    @XmlElement(name = "SspdStsRsn")
    protected String sspdStsRsn;
    @XmlElement(name = "PdgFlngSttlm")
    protected String pdgFlngSttlm;
    @XmlElement(name = "PdgSttlm")
    protected String pdgSttlm;
    @XmlElement(name = "PrtryRjctnRsn")
    protected ProprietaryStatusJustification prtryRjctnRsn;
    @XmlElement(name = "PrtryRsn")
    protected String prtryRsn;

    /**
     * Gets the value of the umtchdStsRsn property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUmtchdStsRsn() {
        return umtchdStsRsn;
    }

    /**
     * Sets the value of the umtchdStsRsn property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUmtchdStsRsn(String value) {
        this.umtchdStsRsn = value;
    }

    /**
     * Gets the value of the cancStsRsn property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCancStsRsn() {
        return cancStsRsn;
    }

    /**
     * Sets the value of the cancStsRsn property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCancStsRsn(String value) {
        this.cancStsRsn = value;
    }

    /**
     * Gets the value of the sspdStsRsn property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSspdStsRsn() {
        return sspdStsRsn;
    }

    /**
     * Sets the value of the sspdStsRsn property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSspdStsRsn(String value) {
        this.sspdStsRsn = value;
    }

    /**
     * Gets the value of the pdgFlngSttlm property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPdgFlngSttlm() {
        return pdgFlngSttlm;
    }

    /**
     * Sets the value of the pdgFlngSttlm property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPdgFlngSttlm(String value) {
        this.pdgFlngSttlm = value;
    }

    /**
     * Gets the value of the pdgSttlm property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPdgSttlm() {
        return pdgSttlm;
    }

    /**
     * Sets the value of the pdgSttlm property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPdgSttlm(String value) {
        this.pdgSttlm = value;
    }

    /**
     * Gets the value of the prtryRjctnRsn property.
     * 
     * @return
     *     possible object is
     *     {@link ProprietaryStatusJustification }
     *     
     */
    public ProprietaryStatusJustification getPrtryRjctnRsn() {
        return prtryRjctnRsn;
    }

    /**
     * Sets the value of the prtryRjctnRsn property.
     * 
     * @param value
     *     allowed object is
     *     {@link ProprietaryStatusJustification }
     *     
     */
    public void setPrtryRjctnRsn(ProprietaryStatusJustification value) {
        this.prtryRjctnRsn = value;
    }

    /**
     * Gets the value of the prtryRsn property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPrtryRsn() {
        return prtryRsn;
    }

    /**
     * Sets the value of the prtryRsn property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPrtryRsn(String value) {
        this.prtryRsn = value;
    }

}
