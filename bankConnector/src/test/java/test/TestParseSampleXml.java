package test;

import com.topfinance.cfg.TestDummy;
import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.converter.XMLGregorianCalendarConverter;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;
import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;

import javax.xml.datatype.XMLGregorianCalendar;

import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.jdom.Attribute;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.jpos.iso.ISODate;
import org.jpos.iso.ISOMsg;

import org.xml.sax.helpers.DefaultHandler;

public class TestParseSampleXml extends DefaultHandler{
    
    
    
    public static final boolean PRINT_SAMPLE_VALUE = true; 
    public static final String ENCODING = "UTF-8";
    
    Map<String, String> parsed = new HashMap<String, String>();
    String pkgName;
    String inPath;
    String op; 
    String outPath;
    
    public TestParseSampleXml(String inPath, String op) {
        this.inPath = inPath;
        this.op = op;
        outPath = inPath+".map";
        pkgName = Iso8583ToXml.getPackageName(op);
    }
    
    private void debug(String s) {
//        System.out.println(s);
    }
    
    private String getJavaName(String name) {
        return StringUtils.uncapitalize(name);
    }
    
    private boolean isCollection(Stack<String> pathStack, String name) {
        boolean res = false;

        Class thisClass = findThisClass(pathStack, name);
        debug("thisClass=" + thisClass.getName());
        if (Collection.class.isAssignableFrom(thisClass)) {
            res = true;
        }

        return res;
    }
    
    
    private Class findThisClass(Stack<String> pathStack, String name) {
        Class res = null;
        try {
            Class parentClass = Class.forName(pkgName + ".Document");
            for (String path : pathStack) {
                String fieldName = "";
                if(path.contains("[")) {
                    fieldName = StringUtils.substringBefore(path, "[");
                    Field field = parentClass.getDeclaredField(fieldName);
                    parentClass = Iso8583ToXml.getCollectionGenericType(field);
                } else {
                    fieldName = path;
                    Field field = parentClass.getDeclaredField(fieldName);
                    parentClass = field.getType();
                }
            }
            
            debug("parentClass="+parentClass.getName()+", name="+name);
            Class thisClass = parentClass.getDeclaredField(name).getType();
            debug("thisClass="+thisClass.getName());
            res = thisClass;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
        return res;
    }
    
    private static boolean isClassWithValue(Class thisClass) {
        boolean res = false;
        
        // or another pkg prefix
        if(!thisClass.getName().startsWith("com.") ) {
            // a simple type
            return false;
        } 
        
        try {
            // e.g. in 101, the field fiToFICstmrCdtTrf.cdtTrfTxInf[0].intrBkSttlmAmt
            // which is the class of com.topfinance.plugin.cnaps2.v00800102.ActiveCurrencyAndAmount           
            Field f = thisClass.getDeclaredField("value");
            res = true;
        } catch (Exception ex) {
        }
        return res;
        
    }
    
    private String guessDateValue(String eleName, String strValue) {
        String res = strValue;
        
        // pre-condition
        if(!eleName.contains("Dt") || !strValue.contains("2010")) {
            return res;
        }
        
        
        
        
        String pattern1 = "yyyy-MM-DD'T'hh:mm:ss";
        String pattern2 = "yyyy-MM-DD";
        
        Date date = null;
        try {
            SimpleDateFormat formatter = new SimpleDateFormat(pattern1);
            date = formatter.parse(strValue);
        } catch (Exception ex) {
        }
        if (date == null) {
            try {
                SimpleDateFormat formatter = new SimpleDateFormat(pattern2);
                date = formatter.parse(strValue);
            } catch (Exception ex) {
            }
        }

        if (date == null) {
            debug("Exception in guessing DateValue for eleName=" + eleName + ", strValue=" + strValue);
        } else {
            res = ISODate.getDateTime(date);
            String pattern3 = "yyyy-MM-DD hh:mm:ss";
            debug("date="+new SimpleDateFormat(pattern3).format(date)+", res="+res);
        }
        return res;
    }
    
    
    private void handleElement(Element ele, Stack<String> pathStack) {
        String name = getJavaName(ele.getName());
        
        // special case to handle
        if(name.equals("fIToFICstmrCdtTrf")) {
            // for 101 
            name = "fiToFICstmrCdtTrf";
        }
        
        
        List children = ele.getChildren();
        if(children.size()>0) {
            
            // test if collection is here
            if(isCollection(pathStack, name)) {
                // TODO probably [1][2].. ???
                name=name+"[0]";
            }
        
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
            String value = guessDateValue(name, ele.getText());
            String elementPath = xmlPath+"."+name;
            debug("this is leaf node: "+elementPath+", value="+value);
            
            Class thisClass = findThisClass(pathStack, name);
            boolean isWithValue = isClassWithValue(thisClass);
            if(isWithValue) {
                parsed.put(elementPath+".value", value);
            }else {
                parsed.put(elementPath, value);
            }
            
            // attribute of leaf element
            List attrs = ele.getAttributes();
            for(int i=0;i<attrs.size();i++) {
                Attribute att = (Attribute)attrs.get(i);
                String attName = getJavaName(att.getName());
                String attValue = att.getValue();
                
                String attPath = elementPath+"."+attName;
                debug("this is attribute of leaf node: "+attPath+", value="+attValue);
                parsed.put(attPath, attValue);
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
    
    public void parseXml() {

        
        System.out.println("start parseXml...");
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
            System.out.println("end parseXml... parsed xml in "+inPath+" and generated map at "+outPath);
        } catch (Exception ex) {
            ex.printStackTrace();
            
        }

    }
    
    
    public void testGenerated() {
        
        try {
        // just an empty 8583
        ISOMsg m = new ISOMsg();
        
        Map<String, String> mappings = Iso8583ToXml.loadMappings(new FileInputStream(outPath));
        Iso8583ToXml main = new Iso8583ToXml(pkgName);
        Object obj = main.iso8583ToObject(m, mappings);
        System.out.println("obj="+obj);
        

        String xml = main.objectToXml(obj);
        System.out.println("xml="+xml);      
        
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    public static void main(String[] args) {
        // only 101, 102 and 601
        String op = TestDummy.OPERATION_101;
        String inPath = "D:/bankConnector/ibps.101.001.01.xml";
        
//        boolean b = isClassWithValue(String.class);
//        System.out.println("b="+b);
//        b = isClassWithValue(Boolean.class);
//        System.out.println("b="+b);
//        b = isClassWithValue(ActiveCurrencyAndAmount.class);
//        System.out.println("b="+b);
        
        TestParseSampleXml main = new TestParseSampleXml(inPath, op);
        main.parseXml();
        
        ConvertUtils.register(new XMLGregorianCalendarConverter(), XMLGregorianCalendar.class);
        
        main.testGenerated();
        
    }
    
    
}
