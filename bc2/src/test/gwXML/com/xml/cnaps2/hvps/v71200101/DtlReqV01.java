//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.11 at 04:33:50 ���� CST 
//


package com.xml.cnaps2.hvps.v71200101;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for DtlReqV01 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="DtlReqV01">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="GrpHdr" type="{urn:cnaps:std:hvps:2010:tech:xsd:hvps.712.001.01}GroupHeader1"/>
 *         &lt;element name="DtlReqInf" type="{urn:cnaps:std:hvps:2010:tech:xsd:hvps.712.001.01}DtlReqInf1"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "DtlReqV01", propOrder = {
    "grpHdr",
    "dtlReqInf"
})
public class DtlReqV01 {

    @XmlElement(name = "GrpHdr", required = true)
    protected GroupHeader1 grpHdr;
    @XmlElement(name = "DtlReqInf", required = true)
    protected DtlReqInf1 dtlReqInf;

    /**
     * Gets the value of the grpHdr property.
     * 
     * @return
     *     possible object is
     *     {@link GroupHeader1 }
     *     
     */
    public GroupHeader1 getGrpHdr() {
        return grpHdr;
    }

    /**
     * Sets the value of the grpHdr property.
     * 
     * @param value
     *     allowed object is
     *     {@link GroupHeader1 }
     *     
     */
    public void setGrpHdr(GroupHeader1 value) {
        this.grpHdr = value;
    }

    /**
     * Gets the value of the dtlReqInf property.
     * 
     * @return
     *     possible object is
     *     {@link DtlReqInf1 }
     *     
     */
    public DtlReqInf1 getDtlReqInf() {
        return dtlReqInf;
    }

    /**
     * Sets the value of the dtlReqInf property.
     * 
     * @param value
     *     allowed object is
     *     {@link DtlReqInf1 }
     *     
     */
    public void setDtlReqInf(DtlReqInf1 value) {
        this.dtlReqInf = value;
    }

}
