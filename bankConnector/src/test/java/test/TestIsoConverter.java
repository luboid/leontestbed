package test;

import com.topfinance.cfg.TestDummy;
import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.converter.XMLGregorianCalendarConverter;
import com.topfinance.plugin.cnaps2.Cnaps2Constants;
import com.topfinance.plugin.cnaps2.utils.ISOIBPSPackager;
import com.topfinance.util.BCUtils;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.xml.datatype.XMLGregorianCalendar;

import junit.framework.TestCase;
import org.apache.commons.beanutils.ConvertUtils;
import org.jpos.iso.ISODate;
import org.jpos.iso.ISOField;
import org.jpos.iso.ISOMsg;
import org.jpos.iso.ISOPackager;

public class TestIsoConverter extends TestCase {


	public void testIsoToXml() throws Exception{
            System.out.println("start");
            Date d = new Date();
            String dStr = ISODate.getDateTime(d);
            Date dd = ISODate.parseISODate(dStr);
            String format = "MM/dd/yyyy HH:mm:ss";
            SimpleDateFormat formatter = new SimpleDateFormat(format);
            String ddStr = formatter.format(dd);
            System.out.println("dstr="+dStr+", ddStr="+ddStr);
            
            
            ISOMsg m = new ISOMsg();
            m.set (new ISOField (122,  "122"));
            m.set (new ISOField (100,  "100"));
            m.set (new ISOField (101,  "101"));
            m.set (new ISOField (102,  "COMM"));
            m.set (new ISOField (103,  dStr));
            m.set (new ISOField (104,  "12345678"));
            
            ConvertUtils.register(new XMLGregorianCalendarConverter(), XMLGregorianCalendar.class);
            
            InputStream mapFile = Iso8583ToXml.class.getResourceAsStream("/com/topfinance/plugin/cnaps2/v00800102-up.map");
            System.out.println("mapFile="+mapFile);
            Map<String, String> mappings = Iso8583ToXml.loadMappings(mapFile);
            
            Iso8583ToXml main = new Iso8583ToXml("com.cnaps2.xml.iso20022.pacs.v00800102");
            
            Object obj = main.iso8583ToObject(m, mappings);
            System.out.println("obj="+obj);
            
            
            String msgId = BCUtils.extractMsgId(obj);
            System.out.println("msgId="+msgId);
            
            String xml = main.objectToXml(obj);
            System.out.println("xml="+xml);
        
    }
    
    public static void createDummyIsoMsg(String op) {
        
    }
    
    public void testXmlToIso() throws Exception{
        System.out.println("start");
        
        // prepare jaxbObj
        Map<String, String> mapping = new HashMap<String, String>();
        mapping.put(Cnaps2Constants.MSG_ID_101, BCUtils.getUniqueDocId());
        // just some biz level data
        mapping.put(Cnaps2Constants.TEST_DATA_101_1, BCUtils.getUniqueId("addinfo-"));
        mapping.put(Cnaps2Constants.TEST_DATA_101_2, "COMM");
        
        
        String pkg = Iso8583ToXml.getPackageName(TestDummy.OPERATION_101);
        Iso8583ToXml converter = new Iso8583ToXml(pkg);
        Object jaxbObj = converter.iso8583ToObject(null, mapping);
        
        
        // jaxb->iso
        InputStream mapFile = Iso8583ToXml.class.getResourceAsStream("/com/topfinance/plugin/cnaps2/v00800102-down.map");
        System.out.println("mapFile="+mapFile);
        Map<String, String> mappings = Iso8583ToXml.loadMappings(mapFile);
        
        Iso8583ToXml main = new Iso8583ToXml("com.cnaps2.xml.iso20022.pacs.v00800102");
        ISOMsg isoMsg = main.objectToIso8583(jaxbObj, mappings);
        System.out.println("obj="+isoMsg);
        
        // iso->bytes
        ISOPackager packager = new ISOIBPSPackager();
        isoMsg.setPackager(packager);
        byte[] b = isoMsg.pack();
        System.out.println("packed="+new String(b));
        
        // bytes->iso
		ISOMsg m1 = new ISOMsg();
		m1.setPackager(new ISOIBPSPackager());
		m1.unpack(b);
		
        Object msgId = m1.getValue(122);
        System.out.println("msgId="+msgId);
        
        
        Object o = m1.getValue(100);
        System.out.println("100="+o);

        o = m1.getValue(101);
        System.out.println("101="+o);
        
        o = m1.getValue(102);
        System.out.println("102="+o);

        o = m1.getValue(120);
        System.out.println("120="+o);
}
}
