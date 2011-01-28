package test.jaxb;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.util.Calendar;

import junit.framework.TestCase;

import org.apache.commons.io.IOUtils;

import com.topfinance.cfg.TestDummy;
import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.plugin.cnaps2.Cnaps2Constants;

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
    
    public void testXml0x16error() {
        Object jaxbObj = null;
        try {
        	String fn = "D:/bankConnector/source/cnaps2/sample/xml/aaaibps.101.001.01_A100_01000.xml";
        	ByteArrayOutputStream o = new ByteArrayOutputStream();
        	FileInputStream in = new FileInputStream(fn);
        	IOUtils.copy(in,o);
        	String body = new String(o.toByteArray(), "UTF-8");
        	
            jaxbObj = new Iso8583ToXml(Cnaps2Constants.getPackageName(TestDummy.OPERATION_101)).xmlToObject(body);
            
            System.out.println("Done");
        } catch (Exception ex) {
            ex.printStackTrace();

        }
    	
    }
    
}
