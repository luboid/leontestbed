package test.smooks1;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.xml.transform.stream.StreamSource;

import junit.framework.TestCase;

import org.milyn.Smooks;
import org.milyn.SmooksException;
import org.milyn.container.ExecutionContext;
import org.milyn.event.report.HtmlReportGenerator;
import org.milyn.io.StreamUtils;
import org.milyn.payload.JavaResult;
import org.xml.sax.SAXException;

public class TestSmooks extends TestCase {
	
	
	public void debug(String s) {
		System.out.println(s);
	}
	
	public void testTrans() {
		try {
			
			// this will NOT work
			String config1 = "D:/bankConnector/source/src/test/java/test/smooks1/smooks.xml";
			
			// this will work
//			String config1 = "D:/bankConnector/source/src/test/java/test/smooks/config-correct.xml";
			
			
			Doc doc = runSmooks(config1);

			List<Order> orders = doc.getOrders();
			for(Order o : orders) {
				debug("name="+o.getName());
			}
			
			
			
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		
		
	}
	private static byte[] messageIn = readInputMessage();
    private static byte[] readInputMessage() {
        try {
            return StreamUtils.readStream(new FileInputStream("D:/bankConnector/source/src/test/java/test/smooks1/Doc.xml"));
        } catch (IOException e) {
            e.printStackTrace();
            return "<no-message/>".getBytes();
        }
    }
    protected static Doc runSmooks(String smookConfig) throws IOException, SAXException, SmooksException {

    	InputStream config = new FileInputStream(smookConfig);
        // Instantiate Smooks with the config...
        Smooks smooks = new Smooks(config);

        try {
             // Create an exec context - no profiles....
            ExecutionContext executionContext = smooks.createExecutionContext();
            // The result of this transform is a set of Java objects...
            JavaResult result = new JavaResult();

            // Configure the execution context to generate a report...
            executionContext.setEventListener(new HtmlReportGenerator("target/report/report.html"));

            // Filter the input message to extract, using the execution context...
            smooks.filterSource(executionContext, new StreamSource(new ByteArrayInputStream(messageIn)), result);

            return (Doc) result.getBean("doc");
        } finally {
            smooks.close();
        }
    }
}
