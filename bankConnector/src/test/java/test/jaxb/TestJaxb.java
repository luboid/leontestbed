package test.jaxb;

import com.topfinance.converter.Iso8583ToXml;

import java.util.Calendar;

import junit.framework.TestCase;

public class TestJaxb extends TestCase {
    public void testMarshal() {
        Document doc = new Document();
        Calendar cal = Calendar.getInstance(); 
        doc.setStartDate(cal);
        doc.setStartDateTime(Calendar.getInstance());
        doc.setDocId("id-1");
        
        String xml = new Iso8583ToXml("test.jaxb").objectToXml(doc);
        
        System.out.println("xml=");
        System.out.println(xml);
        
    }
    
    
}
