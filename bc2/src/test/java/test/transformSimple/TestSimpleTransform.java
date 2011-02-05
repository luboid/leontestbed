package test.transformSimple;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.StringReader;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathFactory;

import junit.framework.TestCase;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;


import com.topfinance.transform.simple.SimpleMappingRule;
import com.topfinance.transform.simple.SimpleMappingRule.Mapping;
import com.topfinance.transform.simple.SimpleTransformer;
import com.topfinance.transform.util.IsoObj;

public class TestSimpleTransform extends TestCase {
	
	public void debug(String s) {
		System.out.println(s);
	}
	
	public void test1() {
		// iso2Ebo
		SimpleMappingRule rule = new SimpleMappingRule();
		rule.setTargetName("com.topfinance.ebo.msg.Ibps10100101");
		
		rule.getMappings().add(new Mapping("f128", "grpHdrMsgId"));
		rule.getMappings().add(new Mapping("f82", "btchBookg"));
		rule.getMappings().add(new Mapping("f83", "nbOfTxs"));
		rule.getMappings().add(new Mapping("f84", "ctrlSum"));
		
		String xml = new String(rule.toXml());
		debug("xml="+xml);
		
		
		IsoObj src = new IsoObj();
		src.setF82("true");
		src.setF83("2");
		src.setF84("5");
		src.setF128("id");
		com.topfinance.ebo.msg.Ibps10100101 target = (com.topfinance.ebo.msg.Ibps10100101)new SimpleTransformer().transform(src, SimpleMappingRule.fromXml(new ByteArrayInputStream(xml.getBytes())));
				
		debug("target="+target.getGrpHdrMsgId()+", "+target.getBtchBookg());
	}
	
	public void testXpath() {
		try {
//		String xmlFile = "D:/bankConnector/source/generated/cnaps2/sample/xml/ibps.101.001.01_A100_01000.xml";
			
			String xmlFile = "D:/bankConnector/source/generated/cnaps2/sample/xml/xpath.xml";
			ByteArrayOutputStream content = new ByteArrayOutputStream();
			IOUtils.copy(new FileInputStream(xmlFile), content);
			
			String xmlstr = new String(content.toByteArray(), "UTF-8");
//			xmlstr = xmlstr.substring(xmlstr.indexOf("}\r\n")+3);
			debug("xmlstr="+xmlstr);
			
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		factory.setNamespaceAware(false); // never forget this!
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document doc = builder.parse(new InputSource(new StringReader(xmlstr)));
		XPathFactory xpathFac = XPathFactory.newInstance();
		XPath xpath = xpathFac.newXPath();
		
//		String xpathDocId = "//Document/FIToFICstmrCdtTrf/GrpHdr/MsgId/text()";
		String xpathDocId = "//Document/FIToFICstmrCdtTrf/GrpHdr/MsgId/text()";
		String docId = extract(xpath, xpathDocId, doc);
		
		debug("docId="+docId);
		
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
    public String extract(XPath xpath, String xpathStr, Document doc) throws Exception{
    	String res = null;
		if(StringUtils.isNotEmpty(xpathStr)) {
			XPathExpression expr = xpath.compile(xpathStr);
			res = expr.evaluate(doc);
		}
		return res;
    }
}
