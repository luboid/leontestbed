//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.11 at 04:55:20 ���� CST 
//


package com.xml.cnaps2.nets.v35100101;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Document complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Document">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="NetDbtLmtQryRspn" type="{urn:cnaps:std:nets:2010:tech:xsd:nets.351.001.01}NetDbtLmtQryRspnV01"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Document", propOrder = {
    "netDbtLmtQryRspn"
})
public class Document {

    @XmlElement(name = "NetDbtLmtQryRspn", required = true)
    protected NetDbtLmtQryRspnV01 netDbtLmtQryRspn;

    /**
     * Gets the value of the netDbtLmtQryRspn property.
     * 
     * @return
     *     possible object is
     *     {@link NetDbtLmtQryRspnV01 }
     *     
     */
    public NetDbtLmtQryRspnV01 getNetDbtLmtQryRspn() {
        return netDbtLmtQryRspn;
    }

    /**
     * Sets the value of the netDbtLmtQryRspn property.
     * 
     * @param value
     *     allowed object is
     *     {@link NetDbtLmtQryRspnV01 }
     *     
     */
    public void setNetDbtLmtQryRspn(NetDbtLmtQryRspnV01 value) {
        this.netDbtLmtQryRspn = value;
    }

}
