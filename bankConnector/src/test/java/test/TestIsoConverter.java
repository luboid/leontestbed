package test;

import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.util.BCUtils;

import java.io.InputStream;
import java.util.Map;

import junit.framework.TestCase;
import org.jpos.iso.ISOField;
import org.jpos.iso.ISOMsg;

public class TestIsoConverter extends TestCase {
    
    
    public void testIsoToXml() throws Exception{
            System.out.println("start");
            ISOMsg m = new ISOMsg();
            m.set (new ISOField (121,  "121"));
            m.set (new ISOField (100,  "100"));
            m.set (new ISOField (101,  "101"));
            m.set (new ISOField (102,  "COMM"));
            
            
            InputStream mapFile = Iso8583ToXml.class.getResourceAsStream("/com/topfinance/plugin/cnaps2/v00800102-up.map");
            System.out.println("mapFile="+mapFile);
            Map<String, String> mappings = Iso8583ToXml.loadMappings(mapFile);
            
            Iso8583ToXml main = new Iso8583ToXml("com.topfinance.plugin.cnaps2.v00800102");
            
            Object obj = main.iso8583ToObject(m, mappings);
            System.out.println("obj="+obj);
            
            
            String msgId = BCUtils.extractMsgId(obj);
            System.out.println("msgId="+msgId);
            
            String xml = main.objectToXml(obj);
            System.out.println("xml="+xml);
        
    }
    
    
}
