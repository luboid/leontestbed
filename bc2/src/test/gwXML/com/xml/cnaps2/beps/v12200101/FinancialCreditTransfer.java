//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.03 at 08:44:16 ���� CST 
//


package com.xml.cnaps2.beps.v12200101;

import java.util.List;
import java.util.Vector;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for FinancialCreditTransfer complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="FinancialCreditTransfer">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="PKGGrpHdr" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.122.001.01}PKGGroupHeader1"/>
 *         &lt;element name="NPCPrcInf" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.122.001.01}NPCProcessInformation1" minOccurs="0"/>
 *         &lt;element name="FinCdtTrfInf" type="{urn:cnaps:std:beps:2010:tech:xsd:beps.122.001.01}FinancialCreditTransferInformation1" maxOccurs="unbounded"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "FinancialCreditTransfer", propOrder = {
    "pkgGrpHdr",
    "npcPrcInf",
    "finCdtTrfInf"
})
public class FinancialCreditTransfer {

    @XmlElement(name = "PKGGrpHdr", required = true)
    protected PKGGroupHeader1 pkgGrpHdr;
    @XmlElement(name = "NPCPrcInf")
    protected NPCProcessInformation1 npcPrcInf;
    @XmlElement(name = "FinCdtTrfInf", required = true)
    protected List<FinancialCreditTransferInformation1> finCdtTrfInf = new Vector<FinancialCreditTransferInformation1>();

    /**
     * Gets the value of the pkgGrpHdr property.
     * 
     * @return
     *     possible object is
     *     {@link PKGGroupHeader1 }
     *     
     */
    public PKGGroupHeader1 getPKGGrpHdr() {
        return pkgGrpHdr;
    }

    /**
     * Sets the value of the pkgGrpHdr property.
     * 
     * @param value
     *     allowed object is
     *     {@link PKGGroupHeader1 }
     *     
     */
    public void setPKGGrpHdr(PKGGroupHeader1 value) {
        this.pkgGrpHdr = value;
    }

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
     * Gets the value of the finCdtTrfInf property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the finCdtTrfInf property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getFinCdtTrfInf().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link FinancialCreditTransferInformation1 }
     * 
     * 
     */
    public List<FinancialCreditTransferInformation1> getFinCdtTrfInf() {
        if (finCdtTrfInf == null) {
            finCdtTrfInf = new Vector<FinancialCreditTransferInformation1>();
        }
        return this.finCdtTrfInf;
    }

}
