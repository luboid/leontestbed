//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-833 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.05.11 at 04:32:33 ���� CST 
//


package com.xml.cnaps2.beps.v41700101;

import java.util.Date;
import javax.xml.bind.annotation.adapters.XmlAdapter;

public class Adapter1
    extends XmlAdapter<String, Date>
{


    public Date unmarshal(String value) {
        return (com.xml.bind.Cnaps2DataTypeConverter.parseDateTime(value));
    }

    public String marshal(Date value) {
        return (com.xml.bind.Cnaps2DataTypeConverter.printDateTime(value));
    }

}
