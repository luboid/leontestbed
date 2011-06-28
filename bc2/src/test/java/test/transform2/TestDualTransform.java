package test.transform2;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.xml.transform.stream.StreamSource;

import junit.framework.TestCase;

import org.jpos.iso.ISOMsg;
import org.milyn.Smooks;
import org.milyn.container.ExecutionContext;
import org.milyn.event.report.HtmlReportGenerator;
import org.milyn.payload.JavaResult;
import org.milyn.payload.JavaSource;


import com.cnaps2.xml.iso20022.pacs.v00800102.Document;
import com.topfinance.cfg.TestDummy;
import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.ebo.msg.Ibps10100101;
import com.topfinance.plugin.cnaps2.Cnaps2Constants;
import com.topfinance.transform.smooks.SmooksTransformer;
import com.topfinance.transform.util.ISOIBPSPackager;
import com.topfinance.transform.util.Iso8583Util;
import com.topfinance.transform.util.IsoHelper;
import com.topfinance.transform.util.IsoObj;
import com.topfinance.transform.util.IsoSchema;

public class TestDualTransform extends TestCase {
	
    private static void debug(String s) {
        System.out.println(s);
    }
    
    public static void main(String... args) {
    	try {
    	Date now = new Date();
    	debug("now="+now);
    	String datestr="2011-01-01 14:23:07.0 CST";
    	
    	String format="yyyy-MM-dd HH:mm:ss.S z";
    	
    	SimpleDateFormat st = new SimpleDateFormat(format);
    	String nowstr = st.format(now);
    	debug("nowstr="+nowstr);
    	
    	Date d = st.parse(datestr);
    		debug("d="+d);
    		
    	} catch (Exception e) {
    		e.printStackTrace();
    	}
    }
    
    
	public void testXml2Jaxb2Ebo2Iso() {
        IsoSchema schema = new IsoSchema();
        // prepare 8583 string
        ISOMsg msg = Iso8583Util.createDummyISOMsg(IsoHelper.getDefaultISOPackager(), "D:/bankConnector/source/sample/8583/ibps.101.001.01.8583");
        String input = Iso8583Util.packMsg(msg);
        debug("input="+input);
		
        // parse
        IsoObj iso = IsoHelper.parse(schema, input);
        // test chinese
        iso.setF98("北京");
        debug("iso="+iso);
        
        
        // iso2ebo
        Ibps10100101 ebo = iso2Ebo(iso);
        debug("ebo="+ebo);
        debug("chrgbr="+ebo.getChrgBr());
        
        // ebo2Jaxb
        Document jaxb = ebo2Jaxb(ebo);
        
        // jaxb2Xml
        String mesgType = TestDummy.OPERATION_101;
        Iso8583ToXml main = new Iso8583ToXml(Cnaps2Constants.getPackageName(mesgType));
        String xml = main.objectToXml(jaxb);
        debug("xml=\n"+xml);
        
        
        // xml2ebo
        Ibps10100101 ebo2 = xml2Ebo(xml);
        
        debug("chrgbr="+ebo2.getChrgBr());
        assertTrue(ebo.getChrgBr().equals(ebo2.getChrgBr()));
        debug("ebo2="+ebo2);
		
        // ebo2Iso
        IsoObj iso2 = ebo2Iso(ebo2);
        debug("iso2="+iso2);
		
	}
	public void testIso2Ebo2Jaxb2Xml() {
        IsoSchema schema = new IsoSchema();
        // prepare 8583 string
        ISOMsg msg = Iso8583Util.createDummyISOMsg(IsoHelper.getDefaultISOPackager(), "D:/bankConnector/source/sample/8583/ibps.101.001.01.8583");
        String input = Iso8583Util.packMsg(msg);
        debug("input="+input);
		
        // parse
        IsoObj iso = IsoHelper.parse(schema, input);
        debug("iso="+iso);
        
        // iso2ebo
        Ibps10100101 ebo = iso2Ebo(iso);
        debug("ebo="+ebo);
        
        
        // ebo2Jaxb
        Document jaxb = ebo2Jaxb(ebo);
        
        // jaxb2Xml
        String mesgType = TestDummy.OPERATION_101;
        Iso8583ToXml main = new Iso8583ToXml(Cnaps2Constants.getPackageName(mesgType));
        String xml = main.objectToXml(jaxb);
        debug("xml=\n"+xml);
        

        
        
	}
	
	
    protected Ibps10100101 iso2Ebo(IsoObj src)  {
    	
    	Smooks smooks = null;
        try {
    	String filepath = "D:/bankConnector/source/sample/smooks/iso2Ebo.xml";
    	InputStream cfg = new FileInputStream(filepath);
    	
        smooks = new Smooks(cfg);

            ExecutionContext executionContext = smooks.createExecutionContext();

            // Transform the source Order to the target LineOrder via a
            // JavaSource and JavaResult instance...
            JavaSource source = new JavaSource(src);
            JavaResult result = new JavaResult();

            // Configure the execution context to generate a report...
            executionContext.setEventListener(new HtmlReportGenerator("target/report/report.html"));

            smooks.filterSource(executionContext, source, result);

            return (Ibps10100101) result.getBean(SmooksTransformer.ROOT_BEAN_ID);
        } catch (Exception ex) {
        	ex.printStackTrace();
        	throw new RuntimeException(ex);
        } finally {
        	if(smooks!=null) {
        		smooks.close();	
        	}
            
        }
    }
    
    protected Document ebo2Jaxb(Ibps10100101 src)  {
    	
    	Smooks smooks = null;
        try {
    	String filepath = "D:/bankConnector/source/sample/cnaps2/v00800102-up.xml";
    	InputStream cfg = new FileInputStream(filepath);
    	
        smooks = new Smooks(cfg);


            ExecutionContext executionContext = smooks.createExecutionContext();

            // Transform the source Order to the target LineOrder via a
            // JavaSource and JavaResult instance...
            JavaSource source = new JavaSource(src);
            JavaResult result = new JavaResult();

            // Configure the execution context to generate a report...
            executionContext.setEventListener(new HtmlReportGenerator("target/report/report.html"));

            smooks.filterSource(executionContext, source, result);

            return (Document) result.getBean(SmooksTransformer.ROOT_BEAN_ID);
        } catch (Exception ex) {
        	ex.printStackTrace();
        	throw new RuntimeException(ex);
        } finally {
        	if(smooks!=null) {
        		smooks.close();	
        	}
            
        }
    }
    
    protected Ibps10100101 xml2Ebo(String src)  {
    	
    	Smooks smooks = null;
        try {
    	String filepath = "D:/bankConnector/source/sample/cnaps2/v00800102-down-2.xml";
    	InputStream cfg = new FileInputStream(filepath);
    	
        smooks = new Smooks(cfg);


            ExecutionContext executionContext = smooks.createExecutionContext();

            // Transform the source Order to the target LineOrder via a
            // JavaSource and JavaResult instance...
            StreamSource source = new StreamSource(new ByteArrayInputStream(src.getBytes()));
            JavaResult result = new JavaResult();

            // Configure the execution context to generate a report...
            executionContext.setEventListener(new HtmlReportGenerator("target/report/report.html"));

            smooks.filterSource(executionContext, source, result);

            return (Ibps10100101) result.getBean(SmooksTransformer.ROOT_BEAN_ID);
        } catch (Exception ex) {
        	ex.printStackTrace();
        	throw new RuntimeException(ex);
        } finally {
        	if(smooks!=null) {
        		smooks.close();	
        	}
            
        }
    }
    
    protected IsoObj ebo2Iso(Ibps10100101 src)  {
    	/*
new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm").format(new java.util.Date())
new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm").format(new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S z").parse(_VALUE))
org.jpos.iso.ISODate.getDateTime(new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S z").parse(_VALUE))
com.topfinance.smooks.IsoDateDecoder.encode(new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S z").parse(_VALUE))
encoder.encode(new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S z").parse(_VALUE))
encoder.encode2(_VALUE)
new com.topfinance.smooks.IsoDateEncoder().encode2(_VALUE) 
    	 */
    	
    	debug("=================ebo2Iso==========================");
    	Smooks smooks = null;
        try {
    	String filepath = "D:/bankConnector/source/sample/smooks/ebo2Iso.xml";
    	InputStream cfg = new FileInputStream(filepath);
    	
        smooks = new Smooks(cfg);


            ExecutionContext executionContext = smooks.createExecutionContext();
            
//            executionContext.getBeanContext().addBean("encoder", new IsoDateEncoder());
            
            // Transform the source Order to the target LineOrder via a
            // JavaSource and JavaResult instance...
            JavaSource source = new JavaSource(src);
            JavaResult result = new JavaResult();

            // Configure the execution context to generate a report...
            executionContext.setEventListener(new HtmlReportGenerator("target/report/report.html"));

            smooks.filterSource(executionContext, source, result);

            return (IsoObj) result.getBean(SmooksTransformer.ROOT_BEAN_ID);
        } catch (Exception ex) {
        	ex.printStackTrace();
        	throw new RuntimeException(ex);
        } finally {
        	if(smooks!=null) {
        		smooks.close();	
        	}
            
        }
    }
    
    public void testSmooksConfig() {
    	try {
    		Smooks smooks = null;
//        	String filepath = "D:/bankConnector/source/sample/smooks/ebo2Iso.xml";
        	
        	String filepath = "D:/bankConnector/source/generated/cnaps2/config/mapping/ibps.101.001.01-A100-01000-xml2ebo.xml";
        	
        	
        	InputStream cfg = new FileInputStream(filepath);
        	
            smooks = new Smooks(cfg);
            
            debug("Done");
    	} catch (Exception ex) {
    		ex.printStackTrace();
    	}
    }
}
