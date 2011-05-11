//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.11 at 04:35:16 ���� CST 
//


package com.xml.cnaps2.saps.v73600101;

import java.util.Date;
import java.util.List;
import java.util.Vector;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;


/**
 * <p>Java class for AccountingDailyDownLoadInformation1 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="AccountingDailyDownLoadInformation1">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="WorkDt" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.736.001.01}ISODate"/>
 *         &lt;element name="InitlAmt" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.736.001.01}SummaryAmountText"/>
 *         &lt;element name="DailyDbtrAmt" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.736.001.01}SummaryAmountText"/>
 *         &lt;element name="DailyCdtrAmt" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.736.001.01}SummaryAmountText"/>
 *         &lt;element name="FnlAmt" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.736.001.01}SummaryAmountText"/>
 *         &lt;element name="NbOfTx" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.736.001.01}Max8NumericText"/>
 *         &lt;element name="TxList" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.736.001.01}TransactionList1" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "AccountingDailyDownLoadInformation1", propOrder = {
    "workDt",
    "initlAmt",
    "dailyDbtrAmt",
    "dailyCdtrAmt",
    "fnlAmt",
    "nbOfTx",
    "txList"
})
public class AccountingDailyDownLoadInformation1 {

    @XmlElement(name = "WorkDt", required = true, type = String.class)
    @XmlJavaTypeAdapter(Adapter2 .class)
    protected Date workDt;
    @XmlElement(name = "InitlAmt", required = true)
    protected String initlAmt;
    @XmlElement(name = "DailyDbtrAmt", required = true)
    protected String dailyDbtrAmt;
    @XmlElement(name = "DailyCdtrAmt", required = true)
    protected String dailyCdtrAmt;
    @XmlElement(name = "FnlAmt", required = true)
    protected String fnlAmt;
    @XmlElement(name = "NbOfTx", required = true)
    protected String nbOfTx;
    @XmlElement(name = "TxList")
    protected List<TransactionList1> txList = new Vector<TransactionList1>();

    /**
     * Gets the value of the workDt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public Date getWorkDt() {
        return workDt;
    }

    /**
     * Sets the value of the workDt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setWorkDt(Date value) {
        this.workDt = value;
    }

    /**
     * Gets the value of the initlAmt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInitlAmt() {
        return initlAmt;
    }

    /**
     * Sets the value of the initlAmt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInitlAmt(String value) {
        this.initlAmt = value;
    }

    /**
     * Gets the value of the dailyDbtrAmt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDailyDbtrAmt() {
        return dailyDbtrAmt;
    }

    /**
     * Sets the value of the dailyDbtrAmt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDailyDbtrAmt(String value) {
        this.dailyDbtrAmt = value;
    }

    /**
     * Gets the value of the dailyCdtrAmt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDailyCdtrAmt() {
        return dailyCdtrAmt;
    }

    /**
     * Sets the value of the dailyCdtrAmt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDailyCdtrAmt(String value) {
        this.dailyCdtrAmt = value;
    }

    /**
     * Gets the value of the fnlAmt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFnlAmt() {
        return fnlAmt;
    }

    /**
     * Sets the value of the fnlAmt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFnlAmt(String value) {
        this.fnlAmt = value;
    }

    /**
     * Gets the value of the nbOfTx property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNbOfTx() {
        return nbOfTx;
    }

    /**
     * Sets the value of the nbOfTx property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNbOfTx(String value) {
        this.nbOfTx = value;
    }

    /**
     * Gets the value of the txList property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the txList property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getTxList().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TransactionList1 }
     * 
     * 
     */
    public List<TransactionList1> getTxList() {
        if (txList == null) {
            txList = new Vector<TransactionList1>();
        }
        return this.txList;
    }

}
