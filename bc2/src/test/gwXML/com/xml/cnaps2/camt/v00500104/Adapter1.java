//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.2-147 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.13 at 01:14:20 PM CST 
//


package com.xml.cnaps2.camt.v00500104;

import java.util.Date;
import javax.xml.bind.annotation.adapters.XmlAdapter;

public class Adapter1
    extends XmlAdapter<String, Date>
{


    public Date unmarshal(String value) {
        return (com.xml.bind.Cnaps2DataTypeConverter.parseDate(value));
    }

    public String marshal(Date value) {
        return (com.xml.bind.Cnaps2DataTypeConverter.printDate(value));
    }

}
