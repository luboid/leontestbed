//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.11 at 04:34:04 ���� CST 
//


package com.xml.cnaps2.nets.v35600101;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for NetDbtLmtMgmtNtfctnV01 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="NetDbtLmtMgmtNtfctnV01">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="GrpHdr" type="{urn:cnaps:std:nets:2010:tech:xsd:nets.356.001.01}GroupHeader1"/>
 *         &lt;element name="NetDbtLmtMgmtNtfctnInf" type="{urn:cnaps:std:nets:2010:tech:xsd:nets.356.001.01}NetDebitLimitManagementNotificationInformation1"/>
 *         &lt;element name="NtfctnCntt" type="{urn:cnaps:std:nets:2010:tech:xsd:nets.356.001.01}NotificationContent1"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "NetDbtLmtMgmtNtfctnV01", propOrder = {
    "grpHdr",
    "netDbtLmtMgmtNtfctnInf",
    "ntfctnCntt"
})
public class NetDbtLmtMgmtNtfctnV01 {

    @XmlElement(name = "GrpHdr", required = true)
    protected GroupHeader1 grpHdr;
    @XmlElement(name = "NetDbtLmtMgmtNtfctnInf", required = true)
    protected NetDebitLimitManagementNotificationInformation1 netDbtLmtMgmtNtfctnInf;
    @XmlElement(name = "NtfctnCntt", required = true)
    protected NotificationContent1 ntfctnCntt;

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
     * Gets the value of the netDbtLmtMgmtNtfctnInf property.
     * 
     * @return
     *     possible object is
     *     {@link NetDebitLimitManagementNotificationInformation1 }
     *     
     */
    public NetDebitLimitManagementNotificationInformation1 getNetDbtLmtMgmtNtfctnInf() {
        return netDbtLmtMgmtNtfctnInf;
    }

    /**
     * Sets the value of the netDbtLmtMgmtNtfctnInf property.
     * 
     * @param value
     *     allowed object is
     *     {@link NetDebitLimitManagementNotificationInformation1 }
     *     
     */
    public void setNetDbtLmtMgmtNtfctnInf(NetDebitLimitManagementNotificationInformation1 value) {
        this.netDbtLmtMgmtNtfctnInf = value;
    }

    /**
     * Gets the value of the ntfctnCntt property.
     * 
     * @return
     *     possible object is
     *     {@link NotificationContent1 }
     *     
     */
    public NotificationContent1 getNtfctnCntt() {
        return ntfctnCntt;
    }

    /**
     * Sets the value of the ntfctnCntt property.
     * 
     * @param value
     *     allowed object is
     *     {@link NotificationContent1 }
     *     
     */
    public void setNtfctnCntt(NotificationContent1 value) {
        this.ntfctnCntt = value;
    }

}
