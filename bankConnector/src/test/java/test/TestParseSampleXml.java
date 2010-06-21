package test;

import com.cnaps2.cncc.service.IIBPSManager;
import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.converter.JaxbMapping;
import com.topfinance.converter.XMLGregorianCalendarConverter;
import com.topfinance.ebo.msg.Ibps10100101;
import com.topfinance.plugin.cnaps2.utils.ISOIBPSPackager;
import com.topfinance.runtime.BcConstants;
import com.topfinance.util.Iso8583Util;
import freemarker.template.Configuration;
import freemarker.template.ObjectWrapper;
import freemarker.template.Template;
import freemarker.template.TemplateException;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;

import javax.xml.datatype.XMLGregorianCalendar;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.jdom.Attribute;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.jpos.iso.ISODate;
import org.jpos.iso.ISOMsg;
import org.jpos.iso.ISOPackager;
import org.jpos.iso.ISOUtil;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import org.xml.sax.helpers.DefaultHandler;

public class TestParseSampleXml extends DefaultHandler{
    
    public static class Entry {
        public Entry(String key, String value, Class jaxbType) {
            super();
            this.key = key;
            this.value = value;
            this.jaxbType = jaxbType;
        }
        public String key;
        public String value;
        public Class jaxbType;
    }
    

    
    public static final boolean PRINT_EXTRA_NEWLINE = true; 
//    public static final boolean PRINT_SAMPLE_VALUE = true; 
    
    // should be same as BcConstants.ISO8583_DOC_ID, as the first element is always the grpHdr.msgId
    public static final int ISO8583_MAP_START_POS = 80;
    public static final int ISO8583_VALUE_MAX_LENGTH = 50;
    
    public static final String ENCODING = "UTF-8";
    public static final String TEMPLATE_NAME_EBO = "ebo.ftl";
    public static final String TEMPLATE_NAME_DDL_ORACLE = "ddl-oracle.ftl";
    public static final String TEMPLATE_NAME_DDL_MYSQL = "ddl-mysql.ftl";
    
    // this prefix is used in processing to filter out jaxb generated classes
    public static final String JAXB_PKG_PREFIX = "com."; 
    
    // used to construct the msg table name
    public static final String TBL_NAME_PREFIX = "T_MSG_";
    
    public static final String EBO_PKG_NAME = "com.topfinance.ebo.msg";
   
    
    List<Entry> parsed = new ArrayList<Entry>();
    String basePath;
    String op;

    // by convention
    
    String inXmlFile;
    String templatePath;
    String jaxbPkgName;
    String eboPkgName;
    String eboClassName;
    String tblName;
    
    String outSample8583File;
    String outMapFile;
    String outReverseMapFile;
    String outDdlOracleFile;
    String outDdlMysqlFile;
    String outEboPath;
    


    public TestParseSampleXml(String basePath, String op) {
        this.basePath = basePath;
        this.op = op;
        init();
    }
    
    public static String getEboClassNameFromOp(String op) {
        return StringUtils.capitalize(StringUtils.remove(op, '.'));
    }
    
    private void init() {
        // the name convention
        inXmlFile = basePath+"/xml/"+op+".xml";
        templatePath = basePath+"/template";
        jaxbPkgName = Iso8583ToXml.getPackageName(op);
        
        eboPkgName = EBO_PKG_NAME;
        eboClassName = getEboClassNameFromOp(op);
        tblName = TBL_NAME_PREFIX+StringUtils.upperCase(StringUtils.replace(op, ".", "_"));
        
        outSample8583File = basePath+"/8583/"+op+".8583";
        outMapFile = basePath+"/map/"+op+"-up.map";
        outReverseMapFile = basePath+"/map/"+op+"-down.map";
        outDdlOracleFile = basePath+"/ddl/"+"oracle-"+op+".sql";
        outDdlMysqlFile = basePath+"/ddl/"+"mysql-"+op+".sql";
        
        outEboPath = basePath+"/java/"+StringUtils.replace(eboPkgName, ".", "/");
        
    }
    private void debug(String s) {
//        System.out.println(s);
    }
    private void info(String s) {
      System.out.println(s);
  }
    private String getJavaName(String name) {
        return StringUtils.uncapitalize(name);
    }
    
    private boolean isCollection(Class thisClass) {
        boolean res = false;
        debug("thisClass=" + thisClass.getName());
        if (Collection.class.isAssignableFrom(thisClass)) {
            res = true;
        }
        return res;
    }
    
    
    private Field findThisField(Stack<String> pathStack, String name) {
        Field res = null;
        try {
            Class parentClass = Class.forName(jaxbPkgName + ".Document");
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
            Field thisField = parentClass.getDeclaredField(name);
            debug("thisField="+thisField.getName());
            res = thisField;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
        return res;
    }
    
    private static Class getValueClassIfHave(Class thisClass) {
        Class res = null;
        
        // or another pkg prefix
        if(!thisClass.getName().startsWith(JAXB_PKG_PREFIX) ) {
            // a simple type
            return res;
        } 
        
        try {
            // e.g. in 101, the field fiToFICstmrCdtTrf.cdtTrfTxInf[0].intrBkSttlmAmt
            // which is the class of com.topfinance.plugin.cnaps2.v00800102.ActiveCurrencyAndAmount           
            Field f = thisClass.getDeclaredField("value");
            res = f.getType();
        } catch (Exception ex) {
        }
        return res;
        
    }
    private static Class getAttrClass(Class thisClass, String attName) {
        Class res = null;
        try {
            Field f = thisClass.getDeclaredField(attName);
            res = f.getType();
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
    
    
    private void handleElement(Element ele, Stack<String> pathStack) throws Exception{
        String name = getJavaName(ele.getName());
        
        // special case to handle
        if(name.equals("fIToFICstmrCdtTrf")) {
            // for 101 
            name = "fiToFICstmrCdtTrf";
        } else if(name.equals("fIToFIPmtStsRpt")) {
            // for 102
            name = "fiToFIPmtStsRpt";
        }
        
        Field thisField = findThisField(pathStack, name);
        Class thisClass = thisField.getType();
        
        List children = ele.getChildren();
        if(children.size()>0) {
            
            // test if collection is here
            if(isCollection(thisClass)) {
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
            
            boolean needAppendValue = false;
            Class valueClass = null;
            // test if collection is here
            if(isCollection(thisClass)) {
                // TODO probably [1][2].. ???
                name=name+"[0]";
                valueClass = Iso8583ToXml.getCollectionGenericType(thisField);
            } else {
                valueClass = getValueClassIfHave(thisClass);
                if(valueClass==null) {
                    valueClass = thisClass;
                }
                else {
                    needAppendValue = true;
                }
            }
            
            String xmlPath = printStack(pathStack);
            String value = guessDateValue(name, ele.getText());
            String elementPath = xmlPath+"."+name;
            
            addToParsed(needAppendValue? elementPath+".value" : elementPath, value, valueClass);
            
            info("this is leaf node: "+elementPath+", value="+value+", valueClass="+valueClass);
            
            // attribute of leaf element
            List attrs = ele.getAttributes();
            for(int i=0;i<attrs.size();i++) {
                Attribute att = (Attribute)attrs.get(i);
                String attName = getJavaName(att.getName());
                String attValue = att.getValue();

                String attPath = elementPath+"."+attName;
                Class attrClass = getAttrClass(thisClass, attName);
                addToParsed(attPath, attValue, attrClass);
                info("this is attribute of leaf node: "+attPath+", value="+attValue+", attrClass="+attrClass);
            }
            

        }
        
    }
    
    private void addToParsed(String key, String value, Class type) {
        parsed.add(new Entry(key, value, type));
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
            
            List lines = IOUtils.readLines(new InputStreamReader(new FileInputStream(inXmlFile), ENCODING));
            
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
            
            System.out.println("end parseXml... parsed xml in "+inXmlFile);
        } catch (Exception ex) {
            ex.printStackTrace();
            
        }

    }
    
    private void generateMap() {
        try {

            
            StringBuffer mapBuf = new StringBuffer();
            StringBuffer reverseMapBuf = new StringBuffer();
            
            StringBuffer sample8583Buf = new StringBuffer();
            
            int i=0;
            for (Entry pp : parsed) {
                String this8583Pos = String.valueOf(ISO8583_MAP_START_POS+i);
                
                String key = pp.key;
                String value = pp.value;
                
                // special for grpHdr.msgId which is always the first
                if(i==0) {
                    if(!key.endsWith("grpHdr.msgId")) {
                        throw new RuntimeException("first is not grpHdr.msgId?? sth wrong?");
                    }
                    this8583Pos = String.valueOf(BcConstants.ISO8583_DOC_ID);
                }
                
                
                
                StringBuffer line = new StringBuffer(key);
//                if (PRINT_SAMPLE_VALUE) {
                line.append("=").append(Iso8583ToXml.MAP_ISO_PREFIX).append(this8583Pos).append(Iso8583ToXml.MAP_ISO_SURFIX);
//                }
                line.append("\r\n");
                // additional new line
                if (PRINT_EXTRA_NEWLINE) {
                    line.append("\r\n");
                }
                mapBuf.append(line.toString());
                
                StringBuffer sample8583Line = new StringBuffer();
                if(value.length()>ISO8583_VALUE_MAX_LENGTH) {
                    // truncate the value field
                    value = value.substring(0, ISO8583_VALUE_MAX_LENGTH);
                }
                sample8583Line.append(this8583Pos).append("=").append(value);
                sample8583Line.append("\r\n");
                // additional new line
                if (PRINT_EXTRA_NEWLINE) {
                    sample8583Line.append("\r\n");
                }
                sample8583Buf.append(sample8583Line.toString());
                
                StringBuffer reverseLine = new StringBuffer(this8583Pos);
                reverseLine.append("=").append(key);
                reverseLine.append("\r\n");
                // additional new line
                if (PRINT_EXTRA_NEWLINE) {
                    reverseLine.append("\r\n");
                }               
                reverseMapBuf.append(reverseLine.toString());
                i++;
            }
            debug("outLines=" + mapBuf.toString());
            
            Writer out = new OutputStreamWriter(new FileOutputStream(new File(outMapFile)), ENCODING);
            out.write(mapBuf.toString());
            out.flush();
            
            Writer reverseOut = new OutputStreamWriter(new FileOutputStream(new File(outReverseMapFile)), ENCODING);
            reverseOut.write(reverseMapBuf.toString());
            reverseOut.flush();            
            
            Writer sample8583Out = new OutputStreamWriter(new FileOutputStream(new File(outSample8583File)), ENCODING);
            sample8583Out.write(sample8583Buf.toString());
            sample8583Out.flush();
            
            System.out.println("end generateMap... generated"+" sample8583 at "+outSample8583File+ ", map at " 
                               + outMapFile + "and reverse map at "+outReverseMapFile);
        } catch (Exception ex) {
            ex.printStackTrace();

        }
    }

    public void testGeneratedMap() {

        try {
            ISOMsg m = Iso8583Util.createDummyISOMsg(outSample8583File);
            
            String s = Iso8583Util.packMsg(m);
            
            ISOMsg m1 = Iso8583Util.unpackMsg(s);
                        
            Map<String, String> mappings = Iso8583ToXml.loadMappings(new FileInputStream(outMapFile));
            Iso8583ToXml main = new Iso8583ToXml(jaxbPkgName);
            Object obj = main.iso8583ToObject(m, mappings);
            System.out.println("obj=" + obj);

            String xml = main.objectToXml(obj);
            System.out.println("xml=" + xml);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    // mapping of jaxbType to EboType
    private String getEboTypeFromJaxbType(Class jaxbType) {
        String res = "";
        if(jaxbType.getName().startsWith(JAXB_PKG_PREFIX)) {
            // one of the enumeration class?
            if(jaxbType.isEnum()) {
                // use String instead
                res = "String";
            }else {
                // what is it? 
                throw new RuntimeException("==============getEboTypeFromJaxbType(): "+jaxbType.getName());
            }
            
        } else if(jaxbType.equals(BigDecimal.class)) {
            // TODO maybe we should not use bigdecimal even in jaxb class
            res = "Double";
        } else if(jaxbType.equals(XMLGregorianCalendar.class)) {
            res = "java.util.Date";
        } else if(jaxbType.equals(Boolean.class)) {
            // todo how to map boolean to db? 
            res = "Boolean";
        } else {
            res = jaxbType.getSimpleName();
        }
        
        return res;
    }
    
    // mapping of jaxbType to DbType
    private String getOracleDbTypeFromJaxbType(Class jaxbType) {
        String DB_BOOLEAN = "CHAR(1)";
        String DB_SHORT_STRING = "VARCHAR2(20)";
        String DB_STRING = "VARCHAR2(200)";
        String DB_DATE = "DATE";
        String DB_NUMBER = "NUMBER";
        
        
        String res = "";
        if(jaxbType.getName().startsWith(JAXB_PKG_PREFIX)) {
            // one of the enumeration class?
            if(jaxbType.isEnum()) {
                // use String instead
                res = DB_SHORT_STRING;
            }else {
                // what is it? 
                throw new RuntimeException("==============getEboTypeFromJaxbType(): "+jaxbType.getName());
            }
            
        } else if(jaxbType.equals(BigDecimal.class)) {
            // TODO maybe we should not use bigdecimal even in jaxb class
            res = DB_NUMBER;
        } else if(jaxbType.equals(Double.class)) {
            res = DB_NUMBER;            
        } else if(jaxbType.equals(Float.class)) {
            res = DB_NUMBER;
        } else if(jaxbType.equals(Integer.class)) {
            res = DB_NUMBER;
        } else if(jaxbType.equals(Long.class)) {
            res = DB_NUMBER;                                                
        } else if(jaxbType.equals(XMLGregorianCalendar.class)) {
            res = DB_DATE;
        } else if(jaxbType.equals(Boolean.class)) {
            res = DB_BOOLEAN;
        } else if(jaxbType.equals(String.class)) {
            res = DB_STRING;
        } else {
            // what is it? 
            throw new RuntimeException("==============getEboTypeFromJaxbType(): "+jaxbType.getName());
        }
        return res;
    }
    private String getMysqlDbTypeFromJaxbType(Class jaxbType) {
        String DB_BOOLEAN = "CHAR(1)";
        String DB_SHORT_STRING = "VARCHAR(20)";
        String DB_STRING = "VARCHAR(200)";
        String DB_DATE = "DATE";
        String DB_NUMBER = "DOUBLE";
        
        
        String res = "";
        if(jaxbType.getName().startsWith(JAXB_PKG_PREFIX)) {
            // one of the enumeration class?
            if(jaxbType.isEnum()) {
                // use String instead
                res = DB_SHORT_STRING;
            }else {
                // what is it? 
                throw new RuntimeException("==============getEboTypeFromJaxbType(): "+jaxbType.getName());
            }
            
        } else if(jaxbType.equals(BigDecimal.class)) {
            // TODO maybe we should not use bigdecimal even in jaxb class
            res = DB_NUMBER;
        } else if(jaxbType.equals(Double.class)) {
            res = DB_NUMBER;            
        } else if(jaxbType.equals(Float.class)) {
            res = DB_NUMBER;
        } else if(jaxbType.equals(Integer.class)) {
            res = DB_NUMBER;
        } else if(jaxbType.equals(Long.class)) {
            res = DB_NUMBER;                                                
        } else if(jaxbType.equals(XMLGregorianCalendar.class)) {
            res = DB_DATE;
        } else if(jaxbType.equals(Boolean.class)) {
            res = DB_BOOLEAN;
        } else if(jaxbType.equals(String.class)) {
            res = DB_STRING;
        } else {
            // what is it? 
            throw new RuntimeException("==============getEboTypeFromJaxbType(): "+jaxbType.getName());
        }
        return res;
    }
    // get a meaningful Java name from full opath (while keep reasonably short)  
    private void getEboVariableNameFromJaxbOPath(StringBuffer javaNameBuf, StringBuffer dbNameBuf, String oPath) {
        List<String> temp = new ArrayList<String>();
        String[] words = StringUtils.split(oPath, ".");
        
        // max level to extract
        int maxLevel = 2;
        for(int i=0,len = words.length;i<len;i++) {
            // reverse iterate
            String word = words[len-1-i];
            if(word.contains("[")) {
                word = StringUtils.substringBefore(word, "[");
            }
            
            String lastNode = i==0? "" : temp.get(i-1);
            if(lastNode.length()>=6) {
                // long enough to differentiate
                break;
            }
            if(i<maxLevel || lastNode.equalsIgnoreCase("Id") || lastNode.equalsIgnoreCase("Othr")) {
                temp.add(StringUtils.capitalize(word));
            }else {
                break;
            }
        }

        
        for(int i=0,len=temp.size();i<len;i++) {
            // reverse iterate
            String word = temp.get(len-1-i);
            
            javaNameBuf.append(word);
            
            if(i!=0) {
                dbNameBuf.append("_");
            }
            dbNameBuf.append(word);
        }
        
        
    }
    
    
    private void generateDdlAndEbo() {
        try {

            
            EboInfo eboInfo = new EboInfo();
            eboInfo.setPkgName(eboPkgName);
            eboInfo.setDestinationClassName(eboClassName);
            eboInfo.setTableName(tblName);
            
            // default field:
            EboInfo.Column uuid = new EboInfo.Column();
            uuid.setCapitalisedVariableName("Uuid");
            uuid.setVariableName("uuid");
            uuid.setJavaType("String");
            uuid.setDbName("UUID");
            uuid.setDbTypeOracle("VARCHAR2(64)");
            uuid.setDbTypeMysql("VARCHAR(64)");
            eboInfo.getBasicColumns().add(uuid);
            
            
            // avoid duplication
            Map<String, Integer> nameCounter = new HashMap<String, Integer>();
            
            for (Entry pp : parsed) {
                String key = pp.key;
                String value = pp.value;
                Class jaxbType = pp.jaxbType;
                
                EboInfo.Column column = new EboInfo.Column();
                StringBuffer javaNameBuf = new StringBuffer();
                StringBuffer dbNameBuf = new StringBuffer();
                getEboVariableNameFromJaxbOPath(javaNameBuf, dbNameBuf, key);
                
                String capitizedJavaName = javaNameBuf.toString();
                String dbName = StringUtils.upperCase(dbNameBuf.toString());
                
                if(nameCounter.get(dbName)==null) {
                    // first
                    nameCounter.put(dbName, 1);
                }else {
                    // duplicate happened
                    int oldCount = nameCounter.get(dbName);
                    nameCounter.put(dbName, oldCount+1);
                    dbName+=oldCount;
                    capitizedJavaName+=oldCount;
                    
                }

                column.setCapitalisedVariableName(capitizedJavaName);
                column.setVariableName(StringUtils.uncapitalize(capitizedJavaName));
                column.setJavaType(getEboTypeFromJaxbType(jaxbType));

                column.setDbName(dbName);
                column.setDbTypeOracle(getOracleDbTypeFromJaxbType(jaxbType));
                column.setDbTypeMysql(getMysqlDbTypeFromJaxbType(jaxbType));
                
                column.setObjPath(key);

                eboInfo.getBasicColumns().add(column);
                
            }
            
            EboInfo.Column ts = new EboInfo.Column();
            ts.setCapitalisedVariableName("Ts");
            ts.setVariableName("ts");
            ts.setJavaType("java.util.Date");
            ts.setDbName("TS");
            ts.setDbTypeOracle("TIMESTAMP");
            ts.setDbTypeMysql("TIMESTAMP");
            ts.setDbExtraOracle("DEFAULT SYSTIMESTAMP");
            ts.setDbExtraMysql("");
            eboInfo.getBasicColumns().add(ts);            
            

            
            File outEboDir = new File(outEboPath);
            if(!outEboDir.exists()) {
                outEboDir.mkdirs();
            }
            Writer eboOut = new OutputStreamWriter(new FileOutputStream(new File(outEboDir, eboClassName+".java")), ENCODING);
            String eboContent = renderTemplate(eboInfo, TEMPLATE_NAME_EBO);
            eboOut.write(eboContent);
            eboOut.flush();
            System.out.println("generated ebo at " + outEboPath);
            
            Writer ddlOut = new OutputStreamWriter(new FileOutputStream(new File(outDdlOracleFile)), ENCODING);
            String ddlContent = renderTemplate(eboInfo, TEMPLATE_NAME_DDL_ORACLE);
            ddlOut.write(ddlContent);
            ddlOut.flush();
            System.out.println("generated oracle ddl at " + outDdlOracleFile);
            
            Writer ddlOutMysql = new OutputStreamWriter(new FileOutputStream(new File(outDdlMysqlFile)), ENCODING);
            String ddlContentMysql = renderTemplate(eboInfo, TEMPLATE_NAME_DDL_MYSQL);
            ddlOutMysql.write(ddlContentMysql);
            ddlOutMysql.flush();
            System.out.println("generated oracle ddl at " + outDdlMysqlFile);
            System.out.println("end generateMap...");
        } catch (Exception ex) {
            ex.printStackTrace();

        }
    }
    
    private String renderTemplate(Object data, String templateName) throws IOException,
        TemplateException {
        Configuration cfg = new Configuration();

        // TODO: initialize freemarker only once
        // as shown in TestFreeMarker, it's not perfect that the ?keys will
        // return method names also, need refer to how spring freemarker plugin
        // do the render
        // NOTE: however in runtime it works ok !!

        // refer to JAVADOC: Configuration.isClassicCompatible()
        cfg.setClassicCompatible(true);
        // refer to Freemarker manuual chapter: Bean wrapper
        cfg.setObjectWrapper(ObjectWrapper.BEANS_WRAPPER);

        // TODO
        cfg.setDirectoryForTemplateLoading(new File(templatePath));
        Template t = cfg.getTemplate(templateName, "UTF-8");
        Map map = new HashMap();
        map.put("table", data);
        StringWriter stringWriter = new StringWriter();
        t.process(map, stringWriter);
        return stringWriter.toString();
    }
    
    public void testGeneratedEbo() {
        String config = "/test/applicationContext.xml";

        info("start of testGeneratedEbo..." );
        try {
            
            // construct jaxbObj using the generated .map 
            ISOMsg m = new ISOMsg();

            Map<String, String> mappings = Iso8583ToXml.loadMappings(new FileInputStream(outMapFile));
            Iso8583ToXml main = new Iso8583ToXml(jaxbPkgName);
            Object jaxbObj = main.iso8583ToObject(m, mappings);
            debug("obj=" + jaxbObj);
            
            
            // convert jaxbObj -> ebo
            // TODO 
            String eboClassName = "com.topfinance.ebo.msg.Ibps10100101";
            Class eboClass = Class.forName(eboClassName);
            Object ebo = eboClass.newInstance();
            Field[] fields = eboClass.getDeclaredFields();
            for(Field field : fields) {
                String fName = field.getName();
                Class fType = field.getType();
                
                if(Date.class.isAssignableFrom(fType)) {
                    // TODO skip date type... XMLGregorianCalendarconversion is trouble
                    continue;
                }
                if(Boolean.class.isAssignableFrom(fType)) {
                    // TODO skip boolean type...  public Boolean isBtchBookg() is not a valid getter method
                    continue;
                }
                JaxbMapping mapping = field.getAnnotation(JaxbMapping.class);
                if(mapping!=null) {
                    String objPath = mapping.objPath();
                    if(StringUtils.isEmpty(objPath)) {
                        // added columns, not mapped with jaxbObj
                        continue;
                    }
                    debug("fName="+fName+", objPath="+objPath+", fType="+fType);
                    
                    Object value = PropertyUtils.getProperty(jaxbObj, objPath);
                    debug("fName="+fName+", value="+value);
                    BeanUtils.setProperty(ebo, fName, value);
                }
            }
            
            
            // store the ebo
            Ibps10100101 ibps101 = (Ibps10100101)ebo;
            ibps101.setUuid(String.valueOf(new Date().getTime()));
            
            info("initializing DB Connection with spring: " + config + "...");
            ApplicationContext ctx = new ClassPathXmlApplicationContext(config);
            IIBPSManager mgr = (IIBPSManager)ctx.getBean("ibpsManager");
            mgr.save(ebo);
            

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        info("done testGeneratedEbo");

    }
    
    
    public static void main(String[] args) throws Exception{
        // only 101, 102 and 601


        
        String[] ops = new String[] {
//             TestDummy.OPERATION_101,
//             TestDummy.OPERATION_102,
//             TestDummy.OPERATION_601
        };
        
        String basePath = "D:/bankConnector/source/test";
        ConvertUtils.register(new XMLGregorianCalendarConverter(), XMLGregorianCalendar.class);
        
        
        for (String op : ops) {
            TestParseSampleXml main = new TestParseSampleXml(basePath, op);

            // could comment out and skip the steps you don't want
            main.parseXml();

            main.generateMap();
            main.testGeneratedMap();

             main.generateDdlAndEbo();

             // must copy the generated ebo java to /src/shared/java/ and compile the project, before calling this
             // main.testGeneratedEbo();
        }
        

        
    }
    
    
}
