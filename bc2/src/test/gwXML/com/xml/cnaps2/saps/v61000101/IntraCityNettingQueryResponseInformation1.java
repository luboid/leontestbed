//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.11 at 04:34:56 ���� CST 
//


package com.xml.cnaps2.saps.v61000101;

import java.util.List;
import java.util.Vector;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for IntraCityNettingQueryResponseInformation1 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="IntraCityNettingQueryResponseInformation1">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="OrgnlGrpHdr" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.610.001.01}OriginalGroupHeader1"/>
 *         &lt;element name="RspnSts" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.610.001.01}Max4Text"/>
 *         &lt;element name="NbOfMmb" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.610.001.01}Max8NumericText"/>
 *         &lt;element name="BookgList" type="{urn:cnaps:std:saps:2010:tech:xsd:saps.610.001.01}BookingList1" maxOccurs="unbounded"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "IntraCityNettingQueryResponseInformation1", propOrder = {
    "orgnlGrpHdr",
    "rspnSts",
    "nbOfMmb",
    "bookgList"
})
public class IntraCityNettingQueryResponseInformation1 {

    @XmlElement(name = "OrgnlGrpHdr", required = true)
    protected OriginalGroupHeader1 orgnlGrpHdr;
    @XmlElement(name = "RspnSts", required = true)
    protected String rspnSts;
    @XmlElement(name = "NbOfMmb", required = true)
    protected String nbOfMmb;
    @XmlElement(name = "BookgList", required = true)
    protected List<BookingList1> bookgList = new Vector<BookingList1>();

    /**
     * Gets the value of the orgnlGrpHdr property.
     * 
     * @return
     *     possible object is
     *     {@link OriginalGroupHeader1 }
     *     
     */
    public OriginalGroupHeader1 getOrgnlGrpHdr() {
        return orgnlGrpHdr;
    }

    /**
     * Sets the value of the orgnlGrpHdr property.
     * 
     * @param value
     *     allowed object is
     *     {@link OriginalGroupHeader1 }
     *     
     */
    public void setOrgnlGrpHdr(OriginalGroupHeader1 value) {
        this.orgnlGrpHdr = value;
    }

    /**
     * Gets the value of the rspnSts property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRspnSts() {
        return rspnSts;
    }

    /**
     * Sets the value of the rspnSts property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRspnSts(String value) {
        this.rspnSts = value;
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
