//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.03 at 08:44:41 ���� CST 
//


package com.xml.cnaps2.beps.v41700101;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.xml.cnaps2.beps.v41700101 package. 
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

    private final static QName _Document_QNAME = new QName("urn:cnaps:std:beps:2010:tech:xsd:beps.417.001.01", "Document");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.xml.cnaps2.beps.v41700101
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link OriginalTransaction1 }
     * 
     */
    public OriginalTransaction1 createOriginalTransaction1() {
        return new OriginalTransaction1();
    }

    /**
     * Create an instance of {@link OriginalGroupHeader1 }
     * 
     */
    public OriginalGroupHeader1 createOriginalGroupHeader1() {
        return new OriginalGroupHeader1();
    }

    /**
     * Create an instance of {@link InstdPty1 }
     * 
     */
    public InstdPty1 createInstdPty1() {
        return new InstdPty1();
    }

    /**
     * Create an instance of {@link GroupHeader1 }
     * 
     */
    public GroupHeader1 createGroupHeader1() {
        return new GroupHeader1();
    }

    /**
     * Create an instance of {@link RealTimeInformationReversalResponeseInformation1 }
     * 
     */
    public RealTimeInformationReversalResponeseInformation1 createRealTimeInformationReversalResponeseInformation1() {
        return new RealTimeInformationReversalResponeseInformation1();
    }

    /**
     * Create an instance of {@link Document }
     * 
     */
    public Document createDocument() {
        return new Document();
    }

    /**
     * Create an instance of {@link RealTimeInformationReversalResponese }
     * 
     */
    public RealTimeInformationReversalResponese createRealTimeInformationReversalResponese() {
        return new RealTimeInformationReversalResponese();
    }

    /**
     * Create an instance of {@link InstgPty1 }
     * 
     */
    public InstgPty1 createInstgPty1() {
        return new InstgPty1();
    }

    /**
     * Create an instance of {@link ResponsionInformation1 }
     * 
     */
    public ResponsionInformation1 createResponsionInformation1() {
        return new ResponsionInformation1();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Document }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "urn:cnaps:std:beps:2010:tech:xsd:beps.417.001.01", name = "Document")
    public JAXBElement<Document> createDocument(Document value) {
        return new JAXBElement<Document>(_Document_QNAME, Document.class, null, value);
    }

}
