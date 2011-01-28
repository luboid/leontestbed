package tools;

import java.io.File;

import junit.framework.TestCase;

public class TestGenDummySmooks extends TestCase {
	
    private void debug(String s) {
        System.out.println(s);
    }
    
	public void test4JaxbAsInput() {
		String pkg = "com.cnaps2.xml.iso20022.pacs.v00800102.";
		String folderPath = "D:/bankConnector/source/src/test/gwXML/com/cnaps2/xml/iso20022/pacs/v00800102";
		File folder = new File(folderPath);
		
		StringBuffer buf = new StringBuffer();
		for(File file : folder.listFiles()) {
			String fileName = file.getName();
			String className = fileName.substring(0, fileName.indexOf("."));
//			debug("fileName="+fileName+", cassName="+className);
			buf.append("<param name=\"input.java\" type=\"input.type.actived\">"+pkg+className+"</param>").append("\r\n");
		}
		
		debug("buf=\n"+buf.toString());
		
	}
}
