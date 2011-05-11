//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.11 at 04:34:58 ���� CST 
//


package com.xml.cnaps2.saps.v61100101;

import java.util.List;
import java.util.Vector;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for IntraCityNettingSettlementInformation1 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="IntraCityNettingSettlementInformation1">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="TxTp" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.611.001.01}Max4Text"/>
 *         &lt;element name="CtgyPurpCd" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.611.001.01}Max5Text"/>
 *         &lt;element name="NetgRnd" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.611.001.01}Max10NumericText"/>
 *         &lt;element name="DbtrAmt" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.611.001.01}SummaryAmountText"/>
 *         &lt;element name="CdtrAmt" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.611.001.01}SummaryAmountText"/>
 *         &lt;element name="NbOfMmb" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.611.001.01}Max8NumericText"/>
 *         &lt;element name="BookgList" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.611.001.01}BookingList1" maxOccurs="unbounded"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "IntraCityNettingSettlementInformation1", propOrder = {
    "txTp",
    "ctgyPurpCd",
    "netgRnd",
    "dbtrAmt",
    "cdtrAmt",
    "nbOfMmb",
    "bookgList"
})
public class IntraCityNettingSettlementInformation1 {

    @XmlElement(name = "TxTp", required = true)
    protected String txTp;
    @XmlElement(name = "CtgyPurpCd", required = true)
    protected String ctgyPurpCd;
    @XmlElement(name = "NetgRnd", required = true)
    protected String netgRnd;
    @XmlElement(name = "DbtrAmt", required = true)
    protected String dbtrAmt;
    @XmlElement(name = "CdtrAmt", required = true)
    protected String cdtrAmt;
    @XmlElement(name = "NbOfMmb", required = true)
    protected String nbOfMmb;
    @XmlElement(name = "BookgList", required = true)
    protected List<BookingList1> bookgList = new Vector<BookingList1>();

    /**
     * Gets the value of the txTp property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTxTp() {
        return txTp;
    }

    /**
     * Sets the value of the txTp property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTxTp(String value) {
        this.txTp = value;
    }

    /**
     * Gets the value of the ctgyPurpCd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCtgyPurpCd() {
        return ctgyPurpCd;
    }

    /**
     * Sets the value of the ctgyPurpCd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCtgyPurpCd(String value) {
        this.ctgyPurpCd = value;
    }

    /**
     * Gets the value of the netgRnd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNetgRnd() {
        return netgRnd;
    }

    /**
     * Sets the value of the netgRnd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNetgRnd(String value) {
        this.netgRnd = value;
    }

    /**
     * Gets the value of the dbtrAmt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDbtrAmt() {
        return dbtrAmt;
    }

    /**
     * Sets the value of the dbtrAmt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDbtrAmt(String value) {
        this.dbtrAmt = value;
    }

    /**
     * Gets the value of the cdtrAmt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCdtrAmt() {
        return cdtrAmt;
    }

    /**
     * Sets the value of the cdtrAmt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCdtrAmt(String value) {
        this.cdtrAmt = value;
    }

    /**
     * Gets the value of the nbOfMmb property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNbOfMmb() {
        return nbOfMmb;
    }

    /**
     * Sets the value of the nbOfMmb property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNbOfMmb(String value) {
        this.nbOfMmb = value;
    }

    /**
     * Gets the value of the bookgList property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the bookgList property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getBookgList().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link BookingList1 }
     * 
     * 
     */
    public List<BookingList1> getBookgList() {
        if (bookgList == null) {
            bookgList = new Vector<BookingList1>();
        }
        return this.bookgList;
    }

}
