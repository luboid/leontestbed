package test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.jdom.Attribute;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;

import org.xml.sax.helpers.DefaultHandler;

public class TestParseSampleXml extends DefaultHandler{
    
    public static final boolean PRINT_SAMPLE_VALUE = true; 
    public static final String ENCODING = "UTF-8";
    
    Map<String, String> parsed = new HashMap<String, String>();
    
    private void debug(String s) {
        System.out.println(s);
    }
    
    private String getJavaName(String name) {
        return StringUtils.uncapitalize(name);
    }
    
    private void handleElement(Element ele, Stack<String> pathStack) {
        String name = getJavaName(ele.getName());
        
        List children = ele.getChildren();
        if(children.size()>0) {
            pathStack.push(name);
            // not leaf
            debug("this is non-leaf node: "+name);
            for(int i=0;i<children.size();i++) {
                Element subEle = (Element)children.get(i);
                handleElement(subEle, pathStack);
            }
            pathStack.pop();
            
        }
        else {
            // leaf
            String xmlPath = printStack(pathStack);
            String value = ele.getText();
            String key = xmlPath+"."+name;
            debug("this is leaf node: "+key+", value="+value);
            parsed.put(key, value);
            
            List attrs = ele.getAttributes();
            for(int i=0;i<attrs.size();i++) {
                Attribute att = (Attribute)attrs.get(i);
                String attName = getJavaName(att.getName());
                String attValue = att.getValue();
                key = xmlPath+"."+attName;
                debug("this is attribute of leaf node: "+key+", value="+attValue);
                parsed.put(key, attValue);
            }
            

        }
        
    }
    
    private String printStack(Stack<String> stack) {
        StringBuffer buf = new StringBuffer();
        int i=0;
        for(String key : stack) {
            if(i==0) {
                i++;
                buf.append(key);
            }else {
                buf.append(".").append(key);
            }
        }
        return buf.toString();
        
    }
    
    public void testParseXml() {
        String inPath = "D:/bankConnector/ibps.101.001.01.xml";
        String outPath = inPath+".map";
        
        System.out.println("start testParseXml...");
        try {
            
            List lines = IOUtils.readLines(new InputStreamReader(new FileInputStream(inPath), ENCODING));
            
            StringWriter o = new StringWriter(); 
            for(int i=0;i<lines.size();i++) {
                if(i==0) {
                    // skip first line
                    continue;
                }
                String line = (String)lines.get(i);
                IOUtils.write(line, o);
            }
            
            Stack<String> pathStack = new Stack<String>();
            
            SAXBuilder builder = new SAXBuilder(false);
            Document doc = builder.build(new StringReader(o.toString()));
            Element root = doc.getRootElement();

            List children = root.getChildren();
            for(int i=0;i<children.size();i++) {
                Element ele = (Element)children.get(i);
                // iterate all nodes start from the 2nd level
                handleElement(ele, pathStack);
                
            }
            
            Writer out = new OutputStreamWriter(new FileOutputStream(new File(outPath)), ENCODING);
            
            StringBuffer outLines = new StringBuffer();
            for(String key:parsed.keySet()) {
                StringBuffer line = new StringBuffer(key);
                if(PRINT_SAMPLE_VALUE) {
                    line.append("=").append(parsed.get(key));
                }
                line.append("\r\n");
                // additional new line
                line.append("\r\n");
                
                outLines.append(line.toString());
            }
            debug("outLines="+outLines.toString());
            out.write(outLines.toString());
            out.flush();
            
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        System.out.println("end testParseXml... parsed xml in "+inPath+" and generated map at "+outPath);
    }
    
    
    public static void main(String[] args) {
        
        
        TestParseSampleXml main = new TestParseSampleXml();
        main.testParseXml();
        
    }
    
    
}
