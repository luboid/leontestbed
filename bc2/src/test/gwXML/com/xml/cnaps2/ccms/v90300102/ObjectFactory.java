//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.03 at 08:45:33 ���� CST 
//


package com.xml.cnaps2.ccms.v90300102;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.xml.cnaps2.ccms.v90300102 package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _Document_QNAME = new QName("urn:cnaps:std:ccms:2010:tech:xsd:ccms.903.001.02", "Document");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.xml.cnaps2.ccms.v90300102
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link CertNtfctnInf1 }
     * 
     */
    public CertNtfctnInf1 createCertNtfctnInf1() {
        return new CertNtfctnInf1();
    }

    /**
     * Create an instance of {@link CertNtfctnV01 }
     * 
     */
    public CertNtfctnV01 createCertNtfctnV01() {
        return new CertNtfctnV01();
    }

    /**
     * Create an instance of {@link Document }
     * 
     */
    public Document createDocument() {
        return new Document();
    }

    /**
     * Create an instance of {@link GroupHeader1 }
     * 
     */
    public GroupHeader1 createGroupHeader1() {
        return new GroupHeader1();
    }

    /**
     * Create an instance of {@link Instd1 }
     * 
     */
    public Instd1 createInstd1() {
        return new Instd1();
    }

    /**
     * Create an instance of {@link Instg1 }
     * 
     */
    public Instg1 createInstg1() {
        return new Instg1();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Document }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "urn:cnaps:std:ccms:2010:tech:xsd:ccms.903.001.02", name = "Document")
    public JAXBElement<Document> createDocument(Document value) {
        return new JAXBElement<Document>(_Document_QNAME, Document.class, null, value);
    }

}
