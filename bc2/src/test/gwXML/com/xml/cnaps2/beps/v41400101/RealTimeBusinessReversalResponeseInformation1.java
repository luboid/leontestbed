//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.03 at 08:44:38 ���� CST 
//


package com.xml.cnaps2.beps.v41400101;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for RealTimeBusinessReversalResponeseInformation1 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="RealTimeBusinessReversalResponeseInformation1">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="NPCPrcInf" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.414.001.01}NPCProcessInformation1"/>
 *         &lt;element name="OrgnlTx" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.414.001.01}OriginalTransaction1" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "RealTimeBusinessReversalResponeseInformation1", propOrder = {
    "npcPrcInf",
    "orgnlTx"
})
public class RealTimeBusinessReversalResponeseInformation1 {

    @XmlElement(name = "NPCPrcInf", required = true)
    protected NPCProcessInformation1 npcPrcInf;
    @XmlElement(name = "OrgnlTx")
    protected OriginalTransaction1 orgnlTx;

    /**
     * Gets the value of the npcPrcInf property.
     * 
     * @return
     *     possible object is
     *     {@link NPCProcessInformation1 }
     *     
     */
    public NPCProcessInformation1 getNPCPrcInf() {
        return npcPrcInf;
    }

    /**
     * Sets the value of the npcPrcInf property.
     * 
     * @param value
     *     allowed object is
     *     {@link NPCProcessInformation1 }
     *     
     */
    public void setNPCPrcInf(NPCProcessInformation1 value) {
        this.npcPrcInf = value;
    }

    /**
     * Gets the value of the orgnlTx property.
     * 
     * @return
     *     possible object is
     *     {@link OriginalTransaction1 }
     *     
     */
    public OriginalTransaction1 getOrgnlTx() {
        return orgnlTx;
    }

    /**
     * Sets the value of the orgnlTx property.
     * 
     * @param value
     *     allowed object is
     *     {@link OriginalTransaction1 }
     *     
     */
    public void setOrgnlTx(OriginalTransaction1 value) {
        this.orgnlTx = value;
    }

}
