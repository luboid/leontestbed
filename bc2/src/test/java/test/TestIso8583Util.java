package test;

import java.util.Date;

import junit.framework.TestCase;

import org.jpos.iso.ISODate;
import org.jpos.iso.ISOMsg;


import com.topfinance.transform.util.ISOIBPSPackager;
import com.topfinance.transform.util.Iso8583Util;
import com.topfinance.transform.util.IsoHelper;
import com.topfinance.transform.util.IsoObj;
import com.topfinance.transform.util.IsoSchema;

public class TestIso8583Util extends TestCase {
    
    private void debug(String s) {
        System.out.println(s);
    }
    public void testPackChinese() {
        try {
            // pack
//            ISOMsg msg = Iso8583Util.createDummyISOMsg(new ISOIBPSPackager(), "D:/bankConnector/source/sample/8583/testChinese.8583");
            ISOMsg msg = Iso8583Util.createDummyISOMsg(new ISOIBPSPackager(), "D:/bankConnector/source/sample/8583/ibps.101.001.01.8583");
            debug("raw="+new String(msg.pack(), "UTF-8"));
            String packed = Iso8583Util.packMsg(msg);
            debug("packed="+packed);
            
            // unpack
            ISOMsg unpacked = Iso8583Util.unpackMsg(packed, new ISOIBPSPackager());
//            Map map = unpacked.getChildren();
//            Object obj[] = map.keySet().toArray();
//            for (int i = 0; i < obj.length; i++) {
//                debug("["+i+"]="+Iso8583Util.getField(unpacked, i));
//            }
            
            for(int i=0;i<150;i++){
                if(Iso8583Util.getField(unpacked, i)!=null) {
                    debug("["+i+"]="+Iso8583Util.getField(unpacked, i));
                }
            }
            
            debug("Done");
            
            
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    public void testIsoDate() {
//    	String value="2010-11-07";
//    	String value="2010-10-01T14:23:07";
    	String s = ISODate.getDate(new Date());
    	debug("s="+s);
    	s = ISODate.getDateTime(new Date());
    	debug("s="+s);
    	String value="10-01-2201";
    	Date d = ISODate.parseISODate((String)value);
    	
    	debug("d="+d.getTime());
    }
    
    public void testIsoHelper() {
    	
    	IsoObj iso = new IsoObj();
    	iso.setF100("d100");
    	iso.setF101("f101");
    	IsoSchema schema = new IsoSchema();
    	
    	String s = IsoHelper.pack(schema, iso);
    	debug("s="+s);
    	
    	IsoObj o1 = IsoHelper.parse(schema, s);
    	debug("o1="+o1);
    	
    	
    	
    	
    	
    }
}
