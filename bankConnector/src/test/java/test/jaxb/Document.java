//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.2-147 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2010.06.28 at 02:03:33 PM CST 
//


package test.jaxb;

import java.util.Calendar;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;


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
 *         &lt;element name="docId" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="origDocId" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="opName" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="hostIdentity" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="partnerIdentity" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="startDate" type="{}ISODate"/>
 *         &lt;element name="startDateTime" type="{}ISODateTime"/>
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
    "docId",
    "origDocId",
    "opName",
    "hostIdentity",
    "partnerIdentity",
    "startDate",
    "startDateTime"
})
public class Document {

    @XmlElement(required = true)
    protected String docId;
    @XmlElement(required = true)
    protected String origDocId;
    @XmlElement(required = true)
    protected String opName;
    @XmlElement(required = true)
    protected String hostIdentity;
    @XmlElement(required = true)
    protected String partnerIdentity;
    @XmlElement(required = true, type = String.class)
    @XmlJavaTypeAdapter(Adapter1 .class)
    protected Calendar startDate;
    @XmlElement(required = true, type = String.class)
    @XmlJavaTypeAdapter(Adapter2 .class)
    protected Calendar startDateTime;

    /**
     * Gets the value of the docId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDocId() {
        return docId;
    }

    /**
     * Sets the value of the docId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDocId(String value) {
        this.docId = value;
    }

    /**
     * Gets the value of the origDocId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrigDocId() {
        return origDocId;
    }

    /**
     * Sets the value of the origDocId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrigDocId(String value) {
        this.origDocId = value;
    }

    /**
     * Gets the value of the opName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOpName() {
        return opName;
    }

    /**
     * Sets the value of the opName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOpName(String value) {
        this.opName = value;
    }

    /**
     * Gets the value of the hostIdentity property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHostIdentity() {
        return hostIdentity;
    }

    /**
     * Sets the value of the hostIdentity property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHostIdentity(String value) {
        this.hostIdentity = value;
    }

    /**
     * Gets the value of the partnerIdentity property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPartnerIdentity() {
        return partnerIdentity;
    }

    /**
     * Sets the value of the partnerIdentity property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPartnerIdentity(String value) {
        this.partnerIdentity = value;
    }

    /**
     * Gets the value of the startDate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public Calendar getStartDate() {
        return startDate;
    }

    /**
     * Sets the value of the startDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStartDate(Calendar value) {
        this.startDate = value;
    }

    /**
     * Gets the value of the startDateTime property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public Calendar getStartDateTime() {
        return startDateTime;
    }

    /**
     * Sets the value of the startDateTime property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStartDateTime(Calendar value) {
        this.startDateTime = value;
    }

}
