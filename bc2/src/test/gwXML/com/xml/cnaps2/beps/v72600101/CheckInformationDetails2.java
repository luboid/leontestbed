//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.11 at 04:32:44 ���� CST 
//


package com.xml.cnaps2.beps.v72600101;

import java.util.List;
import java.util.Vector;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for CheckInformationDetails2 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="CheckInformationDetails2">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="TxTpCd" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.726.001.01}Max35Text"/>
 *         &lt;element name="SndTtlCnt" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.726.001.01}Max8NumericText"/>
 *         &lt;element name="RcvTtlCnt" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.726.001.01}Max8NumericText"/>
 *         &lt;element name="SndDtls2" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.726.001.01}SendDetails2" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="RcvDtls2" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.726.001.01}ReceiveDetails2" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "CheckInformationDetails2", propOrder = {
    "txTpCd",
    "sndTtlCnt",
    "rcvTtlCnt",
    "sndDtls2",
    "rcvDtls2"
})
public class CheckInformationDetails2 {

    @XmlElement(name = "TxTpCd", required = true)
    protected String txTpCd;
    @XmlElement(name = "SndTtlCnt", required = true)
    protected String sndTtlCnt;
    @XmlElement(name = "RcvTtlCnt", required = true)
    protected String rcvTtlCnt;
    @XmlElement(name = "SndDtls2")
    protected List<SendDetails2> sndDtls2 = new Vector<SendDetails2>();
    @XmlElement(name = "RcvDtls2")
    protected List<ReceiveDetails2> rcvDtls2 = new Vector<ReceiveDetails2>();

    /**
     * Gets the value of the txTpCd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTxTpCd() {
        return txTpCd;
    }

    /**
     * Sets the value of the txTpCd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTxTpCd(String value) {
        this.txTpCd = value;
    }

    /**
     * Gets the value of the sndTtlCnt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSndTtlCnt() {
        return sndTtlCnt;
    }

    /**
     * Sets the value of the sndTtlCnt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSndTtlCnt(String value) {
        this.sndTtlCnt = value;
    }

    /**
     * Gets the value of the rcvTtlCnt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRcvTtlCnt() {
        return rcvTtlCnt;
    }

    /**
     * Sets the value of the rcvTtlCnt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRcvTtlCnt(String value) {
        this.rcvTtlCnt = value;
    }

    /**
     * Gets the value of the sndDtls2 property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the sndDtls2 property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getSndDtls2().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link SendDetails2 }
     * 
     * 
     */
    public List<SendDetails2> getSndDtls2() {
        if (sndDtls2 == null) {
            sndDtls2 = new Vector<SendDetails2>();
        }
        return this.sndDtls2;
    }

    /**
     * Gets the value of the rcvDtls2 property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the rcvDtls2 property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getRcvDtls2().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ReceiveDetails2 }
     * 
     * 
     */
    public List<ReceiveDetails2> getRcvDtls2() {
        if (rcvDtls2 == null) {
            rcvDtls2 = new Vector<ReceiveDetails2>();
        }
        return this.rcvDtls2;
    }

}
