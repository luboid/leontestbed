package test;

import com.topfinance.cfg.TestDummy;
import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.converter.XMLGregorianCalendarConverter;
import com.topfinance.plugin.cnaps2.utils.ISOIBPSPackager;
import com.topfinance.util.BCUtils;
import com.topfinance.util.Iso8583Util;

import java.beans.PropertyDescriptor;
import java.io.FileInputStream;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.ScheduledThreadPoolExecutor;

import javax.xml.datatype.XMLGregorianCalendar;

import junit.framework.TestCase;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.PropertyUtils;
import org.jpos.iso.ISOMsg;
import org.jpos.iso.ISOPackager;
import org.jpos.iso.ISOUtil;
import test.tcp8583.TestIBPSMsg;

public class TestMisc extends TestCase {
    
    public void testExecutor() throws Exception{
        
        ExecutorService executor = new ScheduledThreadPoolExecutor(5);
        executor.execute(new Runnable() {
            public void run() {
                System.out.println("Job Done");
                
            }
        });
        System.out.println("main done");
    }
    
    public void test8583Encoding() throws Exception{
      String abc = "中国";
      System.out.println("abc="+abc);
      String encoded = TestIBPSMsg.GBKToISO8859(abc);
      System.out.println("encoded="+encoded);
      String hex = ISOUtil.hexString(encoded.getBytes());
      System.out.println("hex="+hex);
      
      String unhex = new String(ISOUtil.hex2byte(hex));
      System.out.println("unhex="+unhex);
      String decoded = TestIBPSMsg.ISO8859ToGBK(unhex);
      System.out.println("decoded="+decoded);        
    }
    
    public void testExtractJaxb() throws Exception {
        ConvertUtils.register(new XMLGregorianCalendarConverter(), XMLGregorianCalendar.class);
        String outSample8583File = "D:/bankConnector/source/test/8583/ibps.101.001.01.8583";
        String outMapFile = "D:/bankConnector/source/test/map/ibps.101.001.01-up.map";
        String op = TestDummy.OPERATION_101;
        String jaxbPkgName = Iso8583ToXml.getPackageName(op);
        ISOMsg m = Iso8583Util.createDummyISOMsg(outSample8583File);
        byte[] bytes = m.pack();
        String s = ISOUtil.hexString(bytes);
        
        ISOMsg m1 = new ISOMsg();
        ISOPackager packager = new ISOIBPSPackager();
        m1.setPackager (packager);
        m1.unpack(ISOUtil.hex2byte(s));
        
        
        Map<String, String> mappings = Iso8583ToXml.loadMappings(new FileInputStream(outMapFile));
        Iso8583ToXml main = new Iso8583ToXml(jaxbPkgName);
        Object obj = main.iso8583ToObject(m, mappings);
        System.out.println("obj=" + obj);
        
        // boolean 
        String oPath = "fiToFICstmrCdtTrf.grpHdr.btchBookg";
        
        Object val = BCUtils.extractFromJaxbObjByOPath(obj, oPath);
        System.out.println("val="+val);
        
        
    }
    public void testMoveJars() throws Exception{
//        String base = "C:/Documents and Settings/yli/.m2/repository";
//        File newbase = new File("D:/bankConnector/source/lib");
//        
//        String jarsfile = "D:/bankConnector/jars.txt"; 
//        String s = "${M2_REPO}";
//       
//        List<String> lines = IOUtils.readLines(new FileInputStream(new File(jarsfile)));
//        
//        for(String line: lines) {
//            if(line.contains(s)) {
//                String path = StringUtils.substringBetween(line, s, "\"/>");
//                System.out.println("copying file: path="+path);
//                String fullpath = base+path;
//                
//                FileUtils.copyFileToDirectory(new File(fullpath), newbase);
//                
//            }
//        }
        
        System.out.println("Done");
    }
    
    public void testCommonBeans() throws Exception{
        
        TestBean bean = new TestBean();
        String name = "aB";
        PropertyDescriptor descriptor = PropertyUtils.getPropertyDescriptor(bean, name);
        
        System.out.println(name+": descriptor="+descriptor);
        
        name = "xy";
        descriptor = PropertyUtils.getPropertyDescriptor(bean, name);
        System.out.println(name+": descriptor="+descriptor);
        
    }
}
