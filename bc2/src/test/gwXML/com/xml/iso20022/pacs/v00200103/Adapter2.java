//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.2-147 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2010.06.28 at 06:32:11 PM CST 
//


package com.xml.iso20022.pacs.v00200103;

import java.util.Date;
import javax.xml.bind.annotation.adapters.XmlAdapter;

public class Adapter2
    extends XmlAdapter<String, Date>
{


    public Date unmarshal(String value) {
        return (com.xml.bind.Cnaps2DataTypeConverter.parseDate(value));
    }

    public String marshal(Date value) {
        return (com.xml.bind.Cnaps2DataTypeConverter.printDate(value));
    }

}
