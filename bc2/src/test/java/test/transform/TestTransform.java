package test.transform;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Map;

import junit.framework.TestCase;

import org.jpos.iso.ISOMsg;
import org.milyn.Smooks;
import org.milyn.container.ExecutionContext;
import org.milyn.event.report.HtmlReportGenerator;
import org.milyn.payload.JavaResult;
import org.milyn.payload.JavaSource;

import com.cnaps2.xml.iso20022.pacs.v00800102.CreditTransferTransactionInformation11;
import com.cnaps2.xml.iso20022.pacs.v00800102.Document;
import com.cnaps2.xml.iso20022.pacs.v00800102.FIToFICustomerCreditTransferV02;
import com.cnaps2.xml.iso20022.pacs.v00800102.GroupHeader33;
import com.topfinance.cfg.TestDummy;
import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.plugin.cnaps2.Cnaps2Constants;
import com.topfinance.transform.simple.SimpleMappingRule;
import com.topfinance.transform.simple.SimpleTransformer;
import com.topfinance.transform.util.ISOIBPSPackager;
import com.topfinance.transform.util.Iso8583Util;
import com.topfinance.transform.util.IsoHelper;
import com.topfinance.transform.util.IsoObj;
import com.topfinance.transform.util.IsoSchema;
import com.topfinance.util.BCUtils;

public class TestTransform extends TestCase {
    
    private void debug(String s) {
        System.out.println(s);
    }
    
    public void test8583AndIsoObj() {
        IsoSchema schema = new IsoSchema();
        // prepare 8583 string
        ISOMsg msg = Iso8583Util.createDummyISOMsg(IsoHelper.getDefaultISOPackager(), "D:/bankConnector/source/sample/8583/ibps.101.001.01.8583");
        String input = Iso8583Util.packMsg(msg);
        debug("input="+input);
        
        // parse
        IsoObj parsed = IsoHelper.parse(schema, input);
        debug("parsed="+parsed);
        
        // pack
        String packed = IsoHelper.pack(schema, parsed); 
        debug("packed="+packed);
        
        debug("equal? "+packed.equals(input));
        
//        obj.setF0("04003");
//        obj.setF2("123456789012");
//        obj.setF3("098765432109");
//        obj.setF4("098765432109");
//        obj.setF5("100.01");
//        obj.setF6("123456789012");
//        
//        String s = IsoUtil.pack(schema, obj);
    }
    
    public void testJaxb2Iso() {
    	
    	Document doc = new Document();
    	
    	doc.setFiToFICstmrCdtTrf(new FIToFICustomerCreditTransferV02());
    	doc.getFiToFICstmrCdtTrf().setGrpHdr(new GroupHeader33());
    	doc.getFiToFICstmrCdtTrf().getGrpHdr().setMsgId("xxx");
    	
    	doc.getFiToFICstmrCdtTrf().getCdtTrfTxInf().add(new CreditTransferTransactionInformation11());
    	doc.getFiToFICstmrCdtTrf().getCdtTrfTxInf().get(0).setChrgBr("zzz");
    	
    	IsoObj iso = jaxb2Iso(doc);
    	debug("f80="+iso.getF80());
    	debug("f81="+iso.getF81());
    	
    }
    public void testIsoObjAndJaxbObj() {
    	try {
    	IsoSchema schema = new IsoSchema();
        // prepare 8583 string
        ISOMsg msg = Iso8583Util.createDummyISOMsg(IsoHelper.getDefaultISOPackager(), "D:/bankConnector/source/sample/8583/ibps.101.001.01.8583");
        String input = Iso8583Util.packMsg(msg);
        debug("input="+input);
        
        // parse
        IsoObj parsed = IsoHelper.parse(schema, input);
        debug("parsed="+parsed);
        
        // iso2Jaxb
        Document doc = iso2Jaxb(parsed);
        
        String mesgType = TestDummy.OPERATION_101;
        Iso8583ToXml main = new Iso8583ToXml(Cnaps2Constants.getPackageName(mesgType));
        String xml = main.objectToXml(doc);
        debug("xml=\n"+xml);
        
        // in old way...
        BCUtils.registerConverter();
        String mapFile = "D:/bankConnector/source/sample/map/ibps.101.001.01-up.map";
        InputStream mapping = new FileInputStream(mapFile);
        Map<String, String> mappings = Iso8583ToXml.loadMappings(mapping);
        Iso8583ToXml converter = new Iso8583ToXml(Cnaps2Constants.getPackageName(mesgType));
        Object jaxbObj = converter.iso8583ToObject(msg, mappings);
        String xml2 = main.objectToXml(jaxbObj);
        debug("old xml=\n"+xml2);
        
        
        
        
        // in latest way...
        String mapFile2 = "D:/bankConnector/source/sample/map/ibps.101.001.01-iso2jaxb-simple.map";
        SimpleMappingRule rule = SimpleMappingRule.fromXml(new FileInputStream(mapFile2));
        Object jaxb2 = new SimpleTransformer().transform2(parsed, rule);
        String xml3 = main.objectToXml(jaxb2);
        debug("new xml=\n"+xml3);
        
        // this passed
        assertTrue(xml3.equals(xml2));
        
        // this can't for ignoring some date field in xml
        assertTrue(xml.equals(xml2));
    	} catch (Exception ex) {
    		ex.printStackTrace();
    	}
    }
    protected IsoObj jaxb2Iso(com.cnaps2.xml.iso20022.pacs.v00800102.Document src)  {
    	
    	Smooks smooks = null;
        try {
    	String filepath = "D:/bankConnector/source/sample/smooks/jaxb2Iso.xml";
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

            return (IsoObj) result.getBean("IsoObj");
        } catch (Exception ex) {
        	ex.printStackTrace();
        	throw new RuntimeException(ex);
        } finally {
        	if(smooks!=null) {
        		smooks.close();	
        	}
            
        }
    }
    protected com.cnaps2.xml.iso20022.pacs.v00800102.Document iso2Jaxb(IsoObj src)  {
    	
    	Smooks smooks = null;
        try {
    	String filepath = "D:/bankConnector/source/sample/smooks/iso2Jaxb.xml";
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

            return (com.cnaps2.xml.iso20022.pacs.v00800102.Document) result.getBean("Document");
        } catch (Exception ex) {
        	ex.printStackTrace();
        	throw new RuntimeException(ex);
        } finally {
        	if(smooks!=null) {
        		smooks.close();	
        	}
            
        }
    }
    
    public void testJaxbObjAndXml() {
        
    }
}
