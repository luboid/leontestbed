//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.11 at 04:34:01 ���� CST 
//


package com.xml.cnaps2.nets.v35300101;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for NetDbtLmtDstrbtnMgmtV01 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="NetDbtLmtDstrbtnMgmtV01">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="GrpHdr" type="{urn:cnaps:std:nets:2010:tech:xsd:nets.353.001.01}GroupHeader1"/>
 *         &lt;element name="NetDbtLmtDstrbtnMgmtInf" type="{urn:cnaps:std:nets:2010:tech:xsd:nets.353.001.01}NetDebitLimitDistributionManagementInformation1"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "NetDbtLmtDstrbtnMgmtV01", propOrder = {
    "grpHdr",
    "netDbtLmtDstrbtnMgmtInf"
})
public class NetDbtLmtDstrbtnMgmtV01 {

    @XmlElement(name = "GrpHdr", required = true)
    protected GroupHeader1 grpHdr;
    @XmlElement(name = "NetDbtLmtDstrbtnMgmtInf", required = true)
    protected NetDebitLimitDistributionManagementInformation1 netDbtLmtDstrbtnMgmtInf;

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
     * Gets the value of the netDbtLmtDstrbtnMgmtInf property.
     * 
     * @return
     *     possible object is
     *     {@link NetDebitLimitDistributionManagementInformation1 }
     *     
     */
    public NetDebitLimitDistributionManagementInformation1 getNetDbtLmtDstrbtnMgmtInf() {
        return netDbtLmtDstrbtnMgmtInf;
    }

    /**
     * Sets the value of the netDbtLmtDstrbtnMgmtInf property.
     * 
     * @param value
     *     allowed object is
     *     {@link NetDebitLimitDistributionManagementInformation1 }
     *     
     */
    public void setNetDbtLmtDstrbtnMgmtInf(NetDebitLimitDistributionManagementInformation1 value) {
        this.netDbtLmtDstrbtnMgmtInf = value;
    }

}
