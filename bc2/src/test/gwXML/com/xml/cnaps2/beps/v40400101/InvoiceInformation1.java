//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.03 at 08:44:35 ���� CST 
//


package com.xml.cnaps2.beps.v40400101;

import java.util.Date;
import java.util.List;
import java.util.Vector;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for InvoiceInformation1 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="InvoiceInformation1">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="StartTm" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.404.001.01}ISODateTime" minOccurs="0"/>
 *         &lt;element name="EndTm" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.404.001.01}ISODateTime" minOccurs="0"/>
 *         &lt;element name="PrtCnt" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.404.001.01}Max2NumericText"/>
 *         &lt;element name="NbOfItms" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.404.001.01}Max2NumericText"/>
 *         &lt;element name="ItmDtls" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.404.001.01}ItemDetails1" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="NbOfFldItms" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.404.001.01}Max2NumericText"/>
 *         &lt;element name="FldItmDtls" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.404.001.01}FieldItemDetails1" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="Rmk" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.404.001.01}Max256Text"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "InvoiceInformation1", propOrder = {
    "startTm",
    "endTm",
    "prtCnt",
    "nbOfItms",
    "itmDtls",
    "nbOfFldItms",
    "fldItmDtls",
    "rmk"
})
public class InvoiceInformation1 {

    @XmlElement(name = "StartTm")
    protected Date startTm;
    @XmlElement(name = "EndTm")
    protected  Date endTm;
    @XmlElement(name = "PrtCnt", required = true)
    protected String prtCnt;
    @XmlElement(name = "NbOfItms", required = true)
    protected String nbOfItms;
    @XmlElement(name = "ItmDtls")
    protected List<ItemDetails1> itmDtls = new Vector<ItemDetails1>();
    @XmlElement(name = "NbOfFldItms", required = true)
    protected String nbOfFldItms;
    @XmlElement(name = "FldItmDtls")
    protected List<FieldItemDetails1> fldItmDtls = new Vector<FieldItemDetails1>();
    @XmlElement(name = "Rmk", required = true)
    protected String rmk;

    /**
     * Gets the value of the startTm property.
     * 
     * @return
     *     possible object is
     *     {@link  Date }
     *     
     */
    public  Date getStartTm() {
        return startTm;
    }

    /**
     * Sets the value of the startTm property.
     * 
     * @param value
     *     allowed object is
     *     {@link  Date }
     *     
     */
    public void setStartTm( Date value) {
        this.startTm = value;
    }

    /**
     * Gets the value of the endTm property.
     * 
     * @return
     *     possible object is
     *     {@link  Date }
     *     
     */
    public  Date getEndTm() {
        return endTm;
    }

    /**
     * Sets the value of the endTm property.
     * 
     * @param value
     *     allowed object is
     *     {@link  Date }
     *     
     */
    public void setEndTm( Date value) {
        this.endTm = value;
    }

    /**
     * Gets the value of the prtCnt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPrtCnt() {
        return prtCnt;
    }

    /**
     * Sets the value of the prtCnt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPrtCnt(String value) {
        this.prtCnt = value;
    }

    /**
     * Gets the value of the nbOfItms property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNbOfItms() {
        return nbOfItms;
    }

    /**
     * Sets the value of the nbOfItms property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNbOfItms(String value) {
        this.nbOfItms = value;
    }

    /**
     * Gets the value of the itmDtls property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the itmDtls property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getItmDtls().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ItemDetails1 }
     * 
     * 
     */
    public List<ItemDetails1> getItmDtls() {
        if (itmDtls == null) {
            itmDtls = new Vector<ItemDetails1>();
        }
        return this.itmDtls;
    }

    public void setItmDtls(List<ItemDetails1> itmDtls) {
		this.itmDtls = itmDtls;
	}

	/**
     * Gets the value of the nbOfFldItms property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNbOfFldItms() {
        return nbOfFldItms;
    }

    /**
     * Sets the value of the nbOfFldItms property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNbOfFldItms(String value) {
        this.nbOfFldItms = value;
    }

    /**
     * Gets the value of the fldItmDtls property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the fldItmDtls property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getFldItmDtls().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link FieldItemDetails1 }
     * 
     * 
     */
    public List<FieldItemDetails1> getFldItmDtls() {
        if (fldItmDtls == null) {
            fldItmDtls = new Vector<FieldItemDetails1>();
        }
        return this.fldItmDtls;
    }

	public void setFldItmDtls(List<FieldItemDetails1> fldItmDtls) {
		this.fldItmDtls = fldItmDtls;
	}

    /**
     * Gets the value of the rmk property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRmk() {
        return rmk;
    }

    /**
     * Sets the value of the rmk property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRmk(String value) {
        this.rmk = value;
    }

}
