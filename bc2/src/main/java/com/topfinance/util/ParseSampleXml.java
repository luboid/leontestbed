package com.topfinance.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
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
import org.jpos.iso.ISODate;
import org.jpos.iso.ISOMsg;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.TestDummy;
import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.plugin.cnaps2.Cnaps2Constants;
import com.topfinance.runtime.BcConstants;
import com.topfinance.runtime.OpInfo;
import com.topfinance.transform.smooks.SmooksTransformer;
import com.topfinance.transform.util.Iso8583Util;
import com.topfinance.transform.util.IsoHelper;
import com.topfinance.util.MetaJaxbElement.Value;
import com.topfinance.util.MetaJaxbElement.Wiring;

import freemarker.template.Configuration;
import freemarker.template.ObjectWrapper;
import freemarker.template.Template;
import freemarker.template.TemplateException;


public class ParseSampleXml{
    

	
    public static class DataEle {
    	
    	public boolean isList() {
    		return type == null;
    	}
    	
        public DataEle(String key, String value, String type, String prefix) {
            super();
            this.key = key;
            this.value = value;
            this.type = type;
            this.prefix = prefix;
        }
        // key is the xpath replaced / with .
        public String key;
        
        public String value;
        
        // This used to be jaxbType, becoz it was initially get from parsing the sample xml and traverse the path in jaxb classes to get the type
        // however now we can get it from metadata tables.
        // so now this is a generic type that need to be mapped to any text in template
        public String type;

        // like A01
        public String prefix;
        
        
        public String eboFldName;
        
        public List<DataEle> leaves = new ArrayList<DataEle>();

		@Override
		public String toString() {
			return "DataEle [key=" + key + ", value=" + value + ", type="
					+ type + ", prefix=" + prefix + ", eboFldName="
					+ eboFldName + ", leaves=" + leaves + "]";
		}




        
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

    public static final String TEMPLATE_NAME_MAP_SMOOKS_EBO2JAXB = "map-smooks-ebo2jaxb.ftl";
    public static final String TEMPLATE_NAME_MAP_SMOOKS_XML2EBO = "map-smooks-xml2ebo.ftl";
    public static final String TEMPLATE_NAME_MAP_PRIVATE_ISO2EBO = "map-private-iso2ebo.ftl";
    public static final String TEMPLATE_NAME_MAP_PRIVATE_EBO2ISO = "map-private-ebo2iso.ftl";
    
    // this is for simple mapping...
    public static final String TEMPLATE_NAME_MAP_PRIVATE_ISO2EBO_SIMPLE = "map-private-iso2ebo-simple.ftl";
    public static final String TEMPLATE_NAME_MAP_PRIVATE_EBO2ISO_SIMPLE = "map-private-ebo2iso-simple.ftl";
    
    
    // this prefix is used in processing to filter out jaxb generated classes
    public static final String JAXB_PKG_PREFIX = "com."; 
    
    // used to construct the msg table name
    public static final String TBL_NAME_PREFIX = "T_MSG_";
    
    public static final String EBO_PKG_NAME = "com.topfinance.ebo.msg";
   
    
    public List<DataEle> parsed = new ArrayList<DataEle>();
    String basePath;
//    String op;
    OpInfo opInfo;
    
    // by convention
    
    String inXmlFile;
    String templatePath;
    String jaxbPkgName;
    String eboPkgName;
    String eboClassName;
    String tblName;
    
    String outSample8583File;
//    String outMapFile;
//    String outReverseMapFile;
//    private String outDdlOracleFile;
//    private String outDdlMysqlFile;
    String outEboPath;
    
    String outMapSmooksEbo2JaxbFile;
    String outMapSmooksXml2EboFile;
    String outMapPrivateIso2EboFile;
    String outMapPrivateEbo2IsoFile;
    
    String outMapPrivateIso2EboSimpleFile;
    String outMapPrivateEbo2IsoSimpleFile;
    
    public ParseSampleXml(String basePath, OpInfo opInfo) {
        this.basePath = basePath;
        this.opInfo = opInfo;
        init();
    }
    
    public static String getTblNameFromOp(OpInfo opInfo) {
//    	return TBL_NAME_PREFIX+StringUtils.upperCase(StringUtils.replace(opInfo.getMesgType(), ".", "_"));
    	return TBL_NAME_PREFIX+StringUtils.upperCase(StringUtils.replace(opInfo.toString(), ".", "_"));
    }
    
    public static String getEboClassNameFromOp(OpInfo opInfo) {
    	
//    	String op = opInfo.getMesgType();
    	String op = opInfo.getMesgType()+opInfo.getOpType()+opInfo.getOpClass();
        return StringUtils.capitalize(StringUtils.remove(op, '.'));
    }
    
    private void init() {
        // the name convention
        inXmlFile = FilePathHelper.sampleXml(opInfo, basePath); // basePath+"/sample/xml/"+op+".xml";
        templatePath = basePath+"/cnaps2/template";
        jaxbPkgName = Cnaps2Constants.getPackageName(opInfo.getMesgType());
        
        eboPkgName = EBO_PKG_NAME;
        eboClassName = getEboClassNameFromOp(opInfo);
        tblName = getTblNameFromOp(opInfo);
        
        outSample8583File = FilePathHelper.sample8583(opInfo, basePath); //basePath+"/sample/8583/"+op+".8583";
//        outMapFile = basePath+"/map/"+op+"-up.map";
//        outReverseMapFile = basePath+"/map/"+op+"-down.map";
        
//      outDdlOracleFile = basePath+"/cnaps2/ddl/"+"oracle-"+opInfo.toString()+".sql";
//      outDdlMysqlFile =  basePath+"/cnaps2/ddl/"+"mysql-"+opInfo.toString()+".sql";        
        
        outEboPath = basePath+"/cnaps2/java/"+StringUtils.replace(eboPkgName, ".", "/");
        
        outMapSmooksEbo2JaxbFile = FilePathHelper.configMapping(opInfo, CfgConstants.DIRECTION_UP,  basePath);   //basePath+"/config/mapping/"+op+"-ebo2jaxb.map";
        outMapSmooksXml2EboFile =  FilePathHelper.configMapping(opInfo, CfgConstants.DIRECTION_DOWN, basePath);  //basePath+"/config/mapping/"+op+"-xml2ebo.map";
        outMapPrivateIso2EboFile = FilePathHelper.sampleMapping(opInfo, CfgConstants.DIRECTION_UP,  basePath);   //basePath+"/sample/mapping/"+op+"-iso2ebo.map";
        outMapPrivateEbo2IsoFile = FilePathHelper.sampleMapping(opInfo, CfgConstants.DIRECTION_DOWN,basePath);   //basePath+"/sample/mapping/"+op+"-ebo2iso.map";
        
        outMapPrivateIso2EboSimpleFile = FilePathHelper.sampleMappingSimple(opInfo, CfgConstants.DIRECTION_UP,  basePath);   //basePath+"/sample/mapping/"+op+"-iso2ebo.map";
        outMapPrivateEbo2IsoSimpleFile = FilePathHelper.sampleMappingSimple(opInfo, CfgConstants.DIRECTION_DOWN,basePath);   //basePath+"/sample/mapping/"+op+"-ebo2iso.map";
    }
    private static void debug(String s) {
//        System.out.println("in [ParseSampleXml] DEBUG: "+s);
    }
    private void info(String s) {
//      System.out.println("in [ParseSampleXml] INFO: "+s);
  }
    public static String getJavaName(String name) {
        return StringUtils.uncapitalize(name);
    }
    
    public static boolean isCollection(Class thisClass) {
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
            res = findField(pathStack, name, parentClass);
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
        return res;
    }
    
    public static Field findField(Stack<String> pathStack, String name, Class parentClass) {
        Field res = null;
        try {
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
            
            // array
            if(name.contains("[")) {
            	name = name.substring(0, name.indexOf("["));
            }
            
            Field thisField = parentClass.getDeclaredField(name);
            debug("thisField="+thisField.getName());
            res = thisField;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
        return res;
    }    
    
    public static Class getValueClassIfHave(Class thisClass) {
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
        if(!eleName.toLowerCase().contains("dt") || !strValue.contains("2010")) {
            return res;
        }
        
        
        
        
        String pattern1 = "yyyy-MM-dd'T'hh:mm:ss";
        String pattern2 = "yyyy-MM-dd";
        
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
            String pattern3 = "yyyy-MM-dd hh:mm:ss";
            debug("date="+new SimpleDateFormat(pattern3).format(date)+", res="+res);
        }
        return res;
    }
    
    
    private void handleElement(Element ele, Stack<String> pathStack) throws Exception{
        
        
        String name = ParseSampleXmlHelper.xpath2opath(ele.getName());
        
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

                Class attrClass = getAttrClass(thisClass, attName);
                // adding a "@" to make it suitable for xmlpath(Handled by Smooks when converting from Xml to Ebo)
                // rather than in old way, the objpath(Handled by PropertyUtils when converting from jaxb to ebo) 
                attName="@"+attName;
                String attPath = elementPath+"."+attName;
                
                addToParsed(attPath, attValue, attrClass);
                info("this is attribute of leaf node: "+attPath+", value="+attValue+", attrClass="+attrClass);
            }
            

        }
        
    }


    
    private void addToParsed(String key, String value, Class type) {
    	// now don't use this route (to parse sample xml)
    	// if used, need map the type in jaxb classes to the generic types
    	 
    	debug("addedToParsed: key="+key+", value="+value+", type="+type.getSimpleName());
    	
    	// e.g. (TO DO) 
//    	String genericType = getTypeFromJaxbType(type);
    	// this is to overcome compile but not is wrong
    	String genericType = type.getSimpleName();
    	// TODO
    	String prefix = "dummy";
        parsed.add(new DataEle(key, value, genericType, prefix));
    }
    
    public static String printStack(Stack<String> stack) {
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
            
            System.out.println("xxxxxxxxxxx end parseXml... parsed xml in "+inXmlFile);
        } catch (Exception ex) {
            ex.printStackTrace();
            
        }

    }
    

    
    
    private void generateMap() {
        try {

            
            StringBuffer mapBuf = new StringBuffer();
            StringBuffer reverseMapBuf = new StringBuffer();
            
            StringBuffer sample8583Buf = new StringBuffer();
            
            
            
            MetaJaxbElement metaIso2Ebo = new MetaJaxbElement();
            MetaJaxbElement metaEbo2Iso = new MetaJaxbElement();
            
            Map<String, Integer> nameCounter = new HashMap<String, Integer>();
            int i=0;
            for (DataEle pp : parsed) {
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
                
                key=StringUtils.remove(key, '@');
                
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
                if(i==0) {
                	// just insert OPID as the first line
                    sample8583Line.append(BcConstants.ISO8583_OP_NAME).append("=").append(opInfo.toString());
                    sample8583Line.append("\r\n");
                }
                
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
                
//                StringBuffer reverseLine = new StringBuffer(this8583Pos);
//                reverseLine.append("=").append(key);
//                reverseLine.append("\r\n");
//                // additional new line
//                if (PRINT_EXTRA_NEWLINE) {
//                    reverseLine.append("\r\n");
//                }               
//                reverseMapBuf.append(reverseLine.toString());
//                
//                
//                
                // for iso2ebo and ebo2iso
                StringBuffer javaNameBuf = new StringBuffer();
                StringBuffer dbNameBuf = new StringBuffer();
                getEboVariableNameFromJaxbOPath(javaNameBuf, dbNameBuf, pp);
                
                tellDuplicate(nameCounter, javaNameBuf, dbNameBuf);
                
                String capitizedJavaName = javaNameBuf.toString();
                String eboPropertyName = StringUtils.uncapitalize(capitizedJavaName);

                
                Class eboClass = Class.forName(eboPkgName+"."+eboClassName);
                
                debug("============eboClassName="+eboClassName+", eboPropertyName="+eboPropertyName+", pp="+pp+"=======================");
                String decoder = "";
                try {
                    if("id".equalsIgnoreCase(eboPropertyName)) {
                    	throw new NoSuchFieldException("");
                    }
                Field f= eboClass.getDeclaredField(eboPropertyName);
                String clazz = f.getType().getSimpleName();
        		if("Date".equals(clazz)) {
        			decoder = "Date";
        		}else if("BigDecimal".equals(clazz)) {
        			decoder = "BigDecimal";
        		}else {
        			decoder = "NULL";
        		}
                } catch (java.lang.NoSuchFieldException e ) {
                	// field not found!!!!!!!
                	// need manual change!!!!!
                	eboPropertyName += "_____";
                	capitizedJavaName+="_____";
    				decoder="NULL";
    			}
                
                // iso2ebo
                Value valIso2Ebo = new Value();
//                valIso2Ebo.setData("/test.transform.IsoObj/f"+this8583Pos);
                // use this instead. see template for reason 
                valIso2Ebo.setData("f"+this8583Pos);
                valIso2Ebo.setProperty(eboPropertyName);
                valIso2Ebo.setDecoder(decoder);                
                metaIso2Ebo.getValues().add(valIso2Ebo);

    			
                // ebo2iso
                Value valEbo2Iso = new Value();
//                valEbo2Iso.setData("/"+eboPkgName+"."+eboClassName+"/"+StringUtils.uncapitalize(capitizedJavaName));
                valEbo2Iso.setData(StringUtils.uncapitalize(capitizedJavaName));
             // use this instead. see template for reason 
                valEbo2Iso.setProperty("f"+this8583Pos);
                metaEbo2Iso.getValues().add(valEbo2Iso);
                valEbo2Iso.setDecoder(decoder);
                
                i++;
            }
            debug("outLines=" + mapBuf.toString());
            
//            Writer out = new OutputStreamWriter(new FileOutputStream(new File(outMapFile)), ENCODING);
//            out.write(mapBuf.toString());
//            out.flush();
//            
//            Writer reverseOut = new OutputStreamWriter(new FileOutputStream(new File(outReverseMapFile)), ENCODING);
//            reverseOut.write(reverseMapBuf.toString());
//            reverseOut.flush();            
//            
            Writer sample8583Out = new OutputStreamWriter(new FileOutputStream(new File(outSample8583File)), ENCODING);
            sample8583Out.write(sample8583Buf.toString());
            sample8583Out.flush();
            
            System.out.println("end generateMap... generated"+" sample8583 at "+outSample8583File);
//            		+ ", map at " + outMapFile + "and reverse map at "+outReverseMapFile);
            
            
            MetaHolder mhIso2Ebo = new MetaHolder();
            mhIso2Ebo.setInputClassName("test.transform.IsoObj");
            mhIso2Ebo.getMetas().add(metaIso2Ebo);
            metaIso2Ebo.setBeanId(SmooksTransformer.ROOT_BEAN_ID);
            metaIso2Ebo.setBeanClass(eboPkgName+"."+eboClassName);
//            
            Writer out1 = new OutputStreamWriter(new FileOutputStream(new File(outMapPrivateIso2EboFile)), ENCODING);
            String map1 = renderTemplate(mhIso2Ebo, TEMPLATE_NAME_MAP_PRIVATE_ISO2EBO, templatePath);
            out1.write(map1);
            out1.flush();
            System.out.println("generated outMapPrivateIso2EboFile at " + outMapPrivateIso2EboFile);
//            
            Writer out11 = new OutputStreamWriter(new FileOutputStream(new File(outMapPrivateIso2EboSimpleFile)), ENCODING);
            String map11 = renderTemplate(mhIso2Ebo, TEMPLATE_NAME_MAP_PRIVATE_ISO2EBO_SIMPLE, templatePath);
            out11.write(map11);
            out11.flush();
            System.out.println("generated outMapPrivateIso2EboFileSimple at " + outMapPrivateIso2EboSimpleFile);
//            
            
            
            // ebo2iso
            
            MetaHolder mhEbo2Iso = new MetaHolder();
            mhEbo2Iso.setInputClassName(eboPkgName+"."+eboClassName);
            mhEbo2Iso.getMetas().add(metaEbo2Iso);
            metaEbo2Iso.setBeanId(SmooksTransformer.ROOT_BEAN_ID);
            metaEbo2Iso.setBeanClass("test.transform.IsoObj");
            
            Writer out2 = new OutputStreamWriter(new FileOutputStream(new File(outMapPrivateEbo2IsoFile)), ENCODING);
            String map2 = renderTemplate(mhEbo2Iso, TEMPLATE_NAME_MAP_PRIVATE_EBO2ISO, templatePath);
            out2.write(map2);
            out2.flush();
            System.out.println("generated outMapPrivateEbo2IsoFile at " + outMapPrivateEbo2IsoFile);
            
            Writer out22 = new OutputStreamWriter(new FileOutputStream(new File(outMapPrivateEbo2IsoSimpleFile)), ENCODING);
            String map22 = renderTemplate(mhEbo2Iso, TEMPLATE_NAME_MAP_PRIVATE_EBO2ISO_SIMPLE, templatePath);
            out22.write(map22);
            out22.flush();
            System.out.println("generated outMapPrivateEbo2IsoFileSimple at " + outMapPrivateEbo2IsoSimpleFile);
            
        } catch (Exception ex) {
            ex.printStackTrace();

        }
    }

    public void testGeneratedMap() {

        try {
            ISOMsg m = Iso8583Util.createDummyISOMsg(IsoHelper.getDefaultISOPackager(), outSample8583File);
            
            String s = Iso8583Util.packMsg(m);
            
            ISOMsg m1 = Iso8583Util.unpackMsg(s, IsoHelper.getDefaultISOPackager());
//            ISOMsg m1 = (ISOMsg)new Default8583ToCnaps2UpInMH().parseConvert(s);
                        
            
            
            // TODO testing
//            Map<String, String> mappings = Iso8583ToXml.loadMappings(new FileInputStream(outMapFile));
//            Iso8583ToXml main = new Iso8583ToXml(jaxbPkgName);
//            Object obj = main.iso8583ToObject(m, mappings);
//            System.out.println("obj=" + obj);
//
//            String xml = main.objectToXml(obj);
//            System.out.println("xml=" + xml);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    // mapping of type to EboType
//    private String getEboTypeFromJaxbType(DataEle pp, EboInfo subEbo) {
//    	if(pp.isList()) {
//    		return "java.util.Set<"+subEbo.getDestinationClassName()+">";
//    	}
//
//        String res = "";
        
        
//    	Class jaxbType = pp.type;
//        if(jaxbType.getName().startsWith(JAXB_PKG_PREFIX)) {
//            // one of the enumeration class?
//            if(jaxbType.isEnum()) {
//                // use String instead
//                res = "String";
//            }else {
//                // what is it? 
//                throw new RuntimeException("==============getEboTypeFromJaxbType(): "+jaxbType.getName());
//            }
//            
//        } else if(jaxbType.equals(BigDecimal.class)) {
//            // TODO maybe we should not use bigdecimal even in jaxb class
//            res = "Double";
//        } else if(jaxbType.equals(XMLGregorianCalendar.class)) {
//            res = "java.util.Date";
//        } else if(jaxbType.equals(Boolean.class)) {
//            // todo how to map boolean to db? 
//            res = "Boolean";
//        } else {
//            res = jaxbType.getSimpleName();
//        }
        
//        return res;
//    }
    
    // mapping of type to DbType
//    private String getOracleDbTypeFromJaxbType(DataEle pp) {
//    	
//    	if(pp.isList()) {
//    		return "";
//    	}
//    	Class jaxbType = pp.type;
//        String DB_BOOLEAN = "CHAR(1)";
//        String DB_SHORT_STRING = "VARCHAR2(20)";
//        String DB_STRING = "VARCHAR2(200)";
//        String DB_DATE = "DATE";
//        String DB_NUMBER = "NUMBER";
//        
//        
//        String res = "";
//        if(jaxbType.getName().startsWith(JAXB_PKG_PREFIX)) {
//            // one of the enumeration class?
//            if(jaxbType.isEnum()) {
//                // use String instead
//                res = DB_SHORT_STRING;
//            }else {
//                // what is it? 
//                throw new RuntimeException("==============getEboTypeFromJaxbType(): "+jaxbType.getName());
//            }
//            
//        } else if(jaxbType.equals(BigDecimal.class)) {
//            // TODO maybe we should not use bigdecimal even in jaxb class
//            res = DB_NUMBER;
//        } else if(jaxbType.equals(Double.class)) {
//            res = DB_NUMBER;            
//        } else if(jaxbType.equals(Float.class)) {
//            res = DB_NUMBER;
//        } else if(jaxbType.equals(Integer.class)) {
//            res = DB_NUMBER;
//        } else if(jaxbType.equals(Long.class)) {
//            res = DB_NUMBER;                                                
//        } else if(jaxbType.equals(XMLGregorianCalendar.class)) {
//            res = DB_DATE;
//        } else if(jaxbType.equals(Date.class)) {
//            res = DB_DATE;            
//        } else if(jaxbType.equals(Boolean.class)) {
//            res = DB_BOOLEAN;
//        } else if(jaxbType.equals(String.class)) {
//            res = DB_STRING;
//        } else {
//            // what is it? 
//            throw new RuntimeException("==============getEboTypeFromJaxbType(): "+jaxbType.getName());
//        }
//        return res;
//    }
//    private String getMysqlDbTypeFromJaxbType(DataEle pp) {
//    	Class jaxbType = pp.type;
//    	if(pp.isList()) {
//    		return "";
//    	}
//    	
//        String DB_BOOLEAN = "CHAR(1)";
//        String DB_SHORT_STRING = "VARCHAR(20)";
//        String DB_STRING = "VARCHAR(200)";
//        String DB_DATE = "DATE";
//        String DB_NUMBER = "DOUBLE";
//        
//        
//        String res = "";
//        if(jaxbType.getName().startsWith(JAXB_PKG_PREFIX)) {
//            // one of the enumeration class?
//            if(jaxbType.isEnum()) {
//                // use String instead
//                res = DB_SHORT_STRING;
//            }else {
//                // what is it? 
//                throw new RuntimeException("==============getEboTypeFromJaxbType(): "+jaxbType.getName());
//            }
//            
//        } else if(jaxbType.equals(BigDecimal.class)) {
//            // TODO maybe we should not use bigdecimal even in jaxb class
//            res = DB_NUMBER;
//        } else if(jaxbType.equals(Double.class)) {
//            res = DB_NUMBER;            
//        } else if(jaxbType.equals(Float.class)) {
//            res = DB_NUMBER;
//        } else if(jaxbType.equals(Integer.class)) {
//            res = DB_NUMBER;
//        } else if(jaxbType.equals(Long.class)) {
//            res = DB_NUMBER;                                                
//        } else if(jaxbType.equals(XMLGregorianCalendar.class)) {
//            res = DB_DATE;
//        } else if(jaxbType.equals(Date.class)) {
//            res = DB_DATE;                        
//        } else if(jaxbType.equals(Boolean.class)) {
//            res = DB_BOOLEAN;
//        } else if(jaxbType.equals(String.class)) {
//            res = DB_STRING;
//        } else {
//            // what is it? 
//            throw new RuntimeException("==============getEboTypeFromJaxbType(): "+jaxbType.getName());
//        }
//        return res;
//    }
    // get a meaningful Java name from full opath (while keep reasonably short)  
    private void getEboVariableNameFromJaxbOPath(StringBuffer javaNameBuf, StringBuffer dbNameBuf, DataEle dataEle) {
    	
    	if(dataEle.eboFldName!=null) {

    		javaNameBuf.append(dataEle.eboFldName);
    		dbNameBuf.append(dataEle.eboFldName);
    		return;
    	}
    	
    	String oPath = dataEle.key;
        List<String> temp = new ArrayList<String>();
        String[] words = StringUtils.split(oPath, ".");
        
        // broke the old way
        // now only return the last token
        if(true) {
        	String s = words[words.length-1];
        	javaNameBuf.append(s);
        	dbNameBuf.append(s);
        	return;
        }
        
        
        // max level to extract
        int maxLevel = 2;
        for(int i=0,len = words.length;i<len;i++) {
            // reverse iterate
            String word = words[len-1-i];
            if(word.contains("[")) {
                word = StringUtils.substringBefore(word, "[");
            }
            
            if(word.startsWith("@")) {
            	word = word.substring(1);
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
    
    public void handleOneEle(Map<String, Class> path2Class, Map<String, Integer> nameCounter, Map<String, MetaJaxbElement> path2Meta, DataEle pp, DataEle parent) throws Exception{
		String rootPath="Document";
    	String rootJaxbClassName = jaxbPkgName+".Document";
    	Class rootJaxbClazz = Class.forName(rootJaxbClassName);
    	
        String key = pp.key;
        String value = pp.value;
        String metaType = pp.type;
        String prefix = pp.prefix;
        EboInfo.Column column = new EboInfo.Column();
        StringBuffer javaNameBuf = new StringBuffer();
        StringBuffer dbNameBuf = new StringBuffer();
        getEboVariableNameFromJaxbOPath(javaNameBuf, dbNameBuf, pp);
        
        tellDuplicate(nameCounter, javaNameBuf, dbNameBuf);
        
        String capitizedJavaName = javaNameBuf.toString();
//        String dbName = StringUtils.upperCase(dbNameBuf.toString());
        
//        if(nameCounter.get(dbName)==null) {
//            // first
//            nameCounter.put(dbName, 1);
//        }else {
//            // duplicate happened
//            int oldCount = nameCounter.get(dbName);
//            nameCounter.put(dbName, oldCount+1);
//            dbName+=oldCount;
//            capitizedJavaName+=oldCount;
//            
//        }
        String varName = StringUtils.uncapitalize(capitizedJavaName);
        
        
        //key=fiToFICstmrCdtTrf.cdtTrfTxInf[0].pmtTpInf.instrPrty, value=NORM, type=class java.lang.String
        debug("");
        debug("=========key="+key+", value="+value+", type="+metaType+", varName="+varName+", prefix="+prefix);



        List<String> eNames = new ArrayList<String>();
        
        String[] eNamesTemp = StringUtils.split(key, ".");
        // preprocess, for array insert an extra element
        for(String temp : eNamesTemp) {
        	
//        	if(temp.contains("[")) {
//        		// array
//        		eNames.add(temp.substring(0, temp.indexOf("[")));
//        		eNames.add("xxx");
//        	}else {
//        		eNames.add(temp);
//        	}
        	
        	eNames.add(temp);
        }
        
        StringBuffer pathBuf = new StringBuffer();
        int i=0;            
        String parentPath=rootPath;
        
        Class parentClass = rootJaxbClazz;
        
        for(String eName : eNames) {
        	i++;
        	if(i!=1) {
        		// first
        		pathBuf.append(".");
        	}
        	pathBuf.append(eName);
        	String path=pathBuf.toString();
        	String beanId = path;
        	
        	debug("raw eName="+eName+", parentPath="+parentPath+", parentClass="+parentClass.getSimpleName());
        	
        	if(i==eNames.size()) {
        		// last, is value
            	MetaJaxbElement parentMeta = path2Meta.get(parentPath);
            	if(parentMeta==null) {
            		throw new RuntimeException("should not happen");
            	}
            	
            	if(eName.contains("[")) {
            		
            		if(StringUtils.isNotEmpty(pp.prefix) ) {
            			// handle prefix style fields
            			// now we tell by prefix
            			// maybe can also tell by eName if we see in the jaxb class it is List<String> instead of List<Object>
            			debug("*************prefix="+pp.prefix);
            			MetaJaxbElement meta = path2Meta.get(path);
            			if(meta==null) {
            				// the first time, create the parent wiring
            				meta = new MetaJaxbElement();
                        	meta.setBeanClass("java.util.ArrayList");
                        	meta.setBeanId(beanId);
                        	if(parent==null) {
                        		// is list but only occur once
                        		meta.setCreateOn(eboPkgName+"."+eboClassName);
                        	}
                        	else {
                        		// nested
                        		meta.setCreateOn(eboPkgName+"."+eboClassName+parent.eboFldName);
                        	}                        	
                        	path2Meta.put(path, meta);
                        	
                        	// add wiring to parent
                        	Wiring w = new Wiring();
                        	w.setBeanIdRef(beanId);
                        	w.setProperty(eName.substring(0, eName.indexOf("[")));
                        	parentMeta.getWirings().add(w);
            			}
            			
                    	// value
                    	Value v = new Value();
                    	v.setProperty("NULL");
                    	// this is not necessary
//                    	v.setData("/"+eboPkgName+"."+eboClassName+"/"+varName);
                    	v.setData(varName);
                    	
                    	v.setDecoder("NULL");
                    	v.setPrefix(pp.prefix);
                    	// TODO decoder?
                    	meta.getValues().add(v);
            			
            			
            		}
            		else {
            		// array of values
            		MetaJaxbElement meta = new MetaJaxbElement();
//                	meta.setEboPkgName(eboPkgName);
//                	meta.setEboClassName(eboClassName);
                	meta.setBeanClass("java.util.ArrayList");
                	meta.setBeanId(beanId);
                	meta.setCreateOn(eboPkgName+"."+eboClassName);
                	
//                	meta.setPath(path);
                	path2Meta.put(path, meta);
                	
                	// value
                	Value v = new Value();
                	v.setProperty("NULL");
                	v.setData("/"+eboPkgName+"."+eboClassName+"/"+varName);
                	v.setDecoder("NULL");
                	// TODO decoder?
                	meta.getValues().add(v);
                	
                	// add wiring to parent
                	Wiring w = new Wiring();
                	w.setBeanIdRef(beanId);
                	w.setProperty(eName.substring(0, eName.indexOf("[")));
                	parentMeta.getWirings().add(w);
            		}
            	}
            	
            	else {
            		if(eName.startsWith("@")) {
            			eName = eName.substring(1);
            		}
            		Value v = new Value();
            		if(parent==null) {
//            			v.setData("/"+eboPkgName+"."+eboClassName+"/"+varName);	
            			v.setData(varName);	
            		}
            		else {
            			// nested
//            			v.setData("/"+eboPkgName+"."+eboClassName+parent.eboFldName+"/"+varName);
            			v.setData(varName);
            		}
            		
            		v.setProperty(eName);
        		
            		Field f = parentClass.getDeclaredField(eName);
        		
            		String clazz = f.getType().getSimpleName();
            		if("Date".equals(clazz)) {
            			v.setDecoder("Date");
            		}else if("BigDecimal".equals(clazz)) {
            			v.setDecoder("BigDecimal");
            		}else {
            			v.setDecoder("NULL");
            		}
            		parentMeta.getValues().add(v);
            	}
        		
        		continue;
        	}
        	
        	debug("eName="+eName);
        	
        	Class thisClass = null;
        	MetaJaxbElement meta = path2Meta.get(path);
        	if(meta==null) {
        		// this element
        		
        		if(eName.contains("[")) {
        			// array

            		meta = new MetaJaxbElement();
//                	meta.setEboPkgName(eboPkgName);
//                	meta.setEboClassName(eboClassName);
                	meta.setBeanClass("java.util.ArrayList");
                	meta.setBeanId(beanId);
                	if(parent==null) {
                		// is list but only occur once
                		meta.setCreateOn(eboPkgName+"."+eboClassName);
                	}
                	else {
                		// nested
                		meta.setCreateOn(eboPkgName+"."+eboClassName+"/"+getJavaName(parent.eboFldName));
                	}
//                	meta.setPath(path);
                	path2Meta.put(path, meta);
        			
                	// add wiring for parent element
                	MetaJaxbElement parentMeta = path2Meta.get(parentPath);
                	if(parentMeta==null) {
                		throw new RuntimeException("should not happen");
                	}
                	
                	boolean wiringExisted = false;
                	for(Wiring w : parentMeta.getWirings()) {
                		if(w.getProperty().equals(eName)) {
                			// existed
                			wiringExisted = true;
                		}
                	}
                	if(!wiringExisted) {
                		Wiring w = new Wiring();
                		// property name is without [0]
                		w.setProperty(eName.substring(0, eName.indexOf("[")));
                		w.setBeanIdRef(beanId);
                		parentMeta.getWirings().add(w);
                	}
                	
                	
        			// array member
        			String fn = eName.substring(0, eName.indexOf("["));
        			Field f = parentClass.getDeclaredField(fn);
                	thisClass = Iso8583ToXml.getCollectionGenericType(f);
                	pathBuf.append(".xxx");
                	path+=".xxx";
                	beanId = path;
                	
                	MetaJaxbElement meta2 = new MetaJaxbElement();
//                	meta2.setEboPkgName(eboPkgName);
//                	meta2.setEboClassName(eboClassName);
                	meta2.setBeanClass(thisClass.getName());
                	meta2.setBeanId(beanId);
                	if(parent==null) {
                		// is list but only occur once
                		meta2.setCreateOn(eboPkgName+"."+eboClassName);
                	}
                	else {
                		meta2.setCreateOn(eboPkgName+"."+eboClassName+parent.eboFldName);
                	}
//                	meta2.setPath(path);
                	path2Meta.put(path, meta2);
                	
                	// wiring
                	Wiring w = new Wiring();
                	w.setProperty("NULL");
                	w.setBeanIdRef(beanId);
                	meta.getWirings().add(w);
                	
        		}
        		else {
        			debug("parentClass="+parentClass.getSimpleName()+", eName="+eName);
        			thisClass = parentClass.getDeclaredField(eName).getType();
        			
            		meta = new MetaJaxbElement();
//                	meta.setEboPkgName(eboPkgName);
//                	meta.setEboClassName(eboClassName);
                	meta.setBeanClass(thisClass.getName());
                	meta.setBeanId(beanId);
//                	meta.setPath(path);
                	if(parent==null) {
                		// is list but only occur once
                		meta.setCreateOn(eboPkgName+"."+eboClassName);
                	}
                	else {
                		meta.setCreateOn(eboPkgName+"."+eboClassName+parent.eboFldName);
                	}
                	path2Meta.put(path, meta);
                	
                	// add wiring for parent element
                	MetaJaxbElement parentMeta = path2Meta.get(parentPath);
                	if(parentMeta==null) {
                		throw new RuntimeException("should not happen");
                	}
                	
                	boolean wiringExisted = false;
                	for(Wiring w : parentMeta.getWirings()) {
                		if(w.getProperty().equals(eName)) {
                			// existed
                			wiringExisted = true;
                		}
                	}
                	if(!wiringExisted) {
                		Wiring w = new Wiring();
                		w.setProperty(eName);
                		w.setBeanIdRef(beanId);
                		parentMeta.getWirings().add(w);
                	}
        		}
        		
            	

        	}
        	else {
        		debug("alreadyfound: path="+path);
        		// already found
        		thisClass = Class.forName(meta.getBeanClass());
        		if(eName.contains("[")) {
        			// array, member should already added
        			
        			// modify path
                	pathBuf.append(".xxx");
                	path+=".xxx";
                	MetaJaxbElement memeberMeta = path2Meta.get(path);
                	if(memeberMeta==null) {
                		throw new RuntimeException("should not happen");
                	}
                	thisClass = Class.forName(memeberMeta.getBeanClass());
        		}
        		
        	}
        	
        	parentPath = path;
        	parentClass = thisClass;
        }    	
    }
    public void generateMapEbo2Jaxb() {
    	debug("=======generateMapEbo2Jaxb======");
    	try {
    		String rootPath="Document";
    	String rootJaxbClassName = jaxbPkgName+".Document";
    	Class rootJaxbClazz = Class.forName(rootJaxbClassName);
    	

        
        String rootBeanId=SmooksTransformer.ROOT_BEAN_ID;
        

//    	Map<String, String> path2BeanId = new HashMap<String, String>();
			Map<String, MetaJaxbElement> path2Meta = new HashMap<String, MetaJaxbElement>();
			MetaJaxbElement root = new MetaJaxbElement();
//			root.setEboPkgName(eboPkgName);
//			root.setEboClassName(eboClassName);
			root.setBeanClass(rootJaxbClassName);
			root.setBeanId(rootBeanId);
			root.setCreateOn(eboPkgName+"."+eboClassName);
//			root.setPath(rootPath);
			
			path2Meta.put(rootPath, root);
//			path2BeanId.put(rootPath, rootBeanId);
    	
		Map<String, Class> path2Class = new HashMap<String, Class>();
    	
		
        // avoid duplication
        Map<String, Integer> nameCounter = new HashMap<String, Integer>();
    	for (DataEle pp : parsed) {

            // is it work? 
            if(pp.isList()) {
            	for(DataEle ele : pp.leaves) {
            		handleOneEle(path2Class, nameCounter, path2Meta, ele, pp);
            	}
            }
            else {
            	handleOneEle(path2Class, nameCounter, path2Meta, pp, null);
            }
            
            

            
        }
    	
    	
        // result
    	debug("\n=============result=============");
    	MetaHolder holder = new MetaHolder();
    	holder.setInputClassName(eboPkgName+"."+eboClassName);
//    	holder.setEboPkgName(eboPkgName);
//    	holder.setEboClassName(eboClassName);
    	
        for(String path: path2Meta.keySet()) {
        	MetaJaxbElement meta = path2Meta.get(path);
        	debug("path="+path+", meta="+meta+"\n");
        	holder.getMetas().add(meta);
        }
        
        
        Writer out = new OutputStreamWriter(new FileOutputStream(new File(outMapSmooksEbo2JaxbFile)), ENCODING);
        String content = renderTemplate(holder, TEMPLATE_NAME_MAP_SMOOKS_EBO2JAXB, templatePath);
        out.write(content);
        out.flush();
        System.out.println("generated outMapSmooksEbo2JaxbFile at " + outMapSmooksEbo2JaxbFile);
        
        } catch (Exception ex) {
        	debug("xxxxxxxxxxxxxxx exception="+ex.getMessage());
            ex.printStackTrace();
            throw new RuntimeException(ex);
        } 
    }
    
    

    
    private void tellDuplicate(Map<String, Integer> nameCounter, StringBuffer javaNameBuf, StringBuffer dbNameBuf) {
        if(nameCounter.get(dbNameBuf.toString())==null) {
            // first
            nameCounter.put(dbNameBuf.toString(), 1);
        }else {
            // duplicate happened
        	
            int oldCount = nameCounter.get(dbNameBuf.toString());
            nameCounter.put(dbNameBuf.toString(), oldCount+1);
            dbNameBuf.append(oldCount);
            javaNameBuf.append(oldCount);
            
        }
    }
    
    public void generateDdlAndEbo() {
        try {
            debug("\n============generateDdlAndEbo=======");

            
            EboInfo eboInfo = renderEboInfo(parsed, "");
            
//            EboInfo.Column ts = new EboInfo.Column();
//            ts.setCapitalisedVariableName("Ts");
//            ts.setVariableName("ts");
//            ts.setJavaType("java.util.Date");
//            ts.setDbName("TS");
//            ts.setDbTypeOracle("TIMESTAMP");
//            ts.setDbTypeMysql("TIMESTAMP");
//            ts.setDbExtraOracle("DEFAULT SYSTIMESTAMP");
//            ts.setDbExtraMysql("");
//            eboInfo.getBasicColumns().add(ts);            
            

            
            
            
            System.out.println("end generateMap...");            
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

	private EboInfo renderEboInfo(List<DataEle> elements, String subClassSurfix) throws Exception{
		EboInfo eboInfo = new EboInfo();
		eboInfo.setPkgName(eboPkgName);
		eboInfo.setDestinationClassName(eboClassName+subClassSurfix);
		eboInfo.setTableName(StringUtils.isBlank(subClassSurfix)? tblName : tblName+"_"+subClassSurfix);
//		eboInfo.setSubClassSurfix(subClassSurfix);
		
		// default field:
		EboInfo.Column uuid = new EboInfo.Column();
		uuid.setCapitalisedVariableName("id");
		uuid.setVariableName("id");
		uuid.setJavaType("Integer");
		uuid.setDbName("ID");
		uuid.setDbTypeOracle("Integer");
		uuid.setDbTypeMysql("int");
		eboInfo.getBasicColumns().add(uuid);
		
		// avoid duplication
		Map<String, Integer> nameCounter = new HashMap<String, Integer>();
		
		for (DataEle pp : elements) {
		    String key = pp.key;
		    String value = pp.value;
		    String metaType = pp.type;
		    String prefix = pp.prefix;
		    
		    EboInfo subEbo = null;
		    if(pp.isList()) {
		    	// create subEbo
		    	subEbo = renderEboInfo(pp.leaves, pp.eboFldName);

		    }
		    
		    debug("in [renderEboInfo]: key="+key+", value="+value+", type="+ (metaType==null ? "NULL" : metaType)+", prefix="+prefix );
		    
		    EboInfo.Column column = new EboInfo.Column();
		    if(pp.isList()) {
		    	column.setNested(true);
		    }
		    StringBuffer javaNameBuf = new StringBuffer();
		    StringBuffer dbNameBuf = new StringBuffer();
		    getEboVariableNameFromJaxbOPath(javaNameBuf, dbNameBuf, pp);
		    
		    tellDuplicate(nameCounter, javaNameBuf, dbNameBuf);
		    
		    String capitizedJavaName = javaNameBuf.toString();
		    String dbName = StringUtils.upperCase(dbNameBuf.toString());
		    
//                if(nameCounter.get(dbName)==null) {
//                    // first
//                    nameCounter.put(dbName, 1);
//                }else {
//                    // duplicate happened
//                    int oldCount = nameCounter.get(dbName);
//                    nameCounter.put(dbName, oldCount+1);
//                    dbName+=oldCount;
//                    capitizedJavaName+=oldCount;
//                    
//                }
		    column.setPrefix(prefix);
		    column.setCapitalisedVariableName(capitizedJavaName);
		    column.setVariableName(StringUtils.uncapitalize(capitizedJavaName));
		    column.setJavaType(ParseSampleXmlHelper.getEboTypeFromMetaType(pp, subEbo));

		    column.setDbName(dbName);
		    column.setDbTypeOracle(ParseSampleXmlHelper.getOracleDbTypeFromJaxbType(pp));
		    column.setDbTypeMysql(ParseSampleXmlHelper.getMysqlDbTypeFromJaxbType(pp));
		    
		    column.setObjPath(key);
		     
		    // used in xml2Ebo map
		    List<String> xmlPaths = new ArrayList<String>();
		    xmlPaths.add("Document");
		    String[] ss = StringUtils.split(key, ".");
		    for(String s: ss) {
		    	String xmlPath = ParseSampleXmlHelper.opath2xpath(s);
		    	
		    	if(s.startsWith("@")) {
		    		xmlPath="@"+StringUtils.capitalize(s.substring(1));
		    	}
		    	else {
		    		xmlPath=StringUtils.capitalize(s);
		    	}
		    	
		    	if(xmlPath.contains("[")) {
		    		xmlPath=xmlPath.substring(0, xmlPath.indexOf("["));
		    	}
		    	
		    	if("value".equalsIgnoreCase(xmlPath)) {
		    		continue;
		    	}
		    	xmlPaths.add(xmlPath);
		    }
		    StringBuffer buf = new StringBuffer();
		    
		    for(String xmlPath: xmlPaths) {
		    	buf.append("/").append(xmlPath);
		    }
		    column.setXmlPath(buf.toString());
		    eboInfo.getBasicColumns().add(column);
		    
		    if(pp.isList()) {
		    	// wiring it to parent Ebo?? 
		    	eboInfo.getNestedEbo().add(subEbo);
		    	subEbo.setWiringColumnName(column.getVariableName());
		    	subEbo.setWiringXmlPath(column.getXmlPath());
		    }
		}
		
		renderDdlAndEbo(eboInfo, opInfo);
		debug("end of [renderEboInfo]: eboInfo="+eboInfo);
		return eboInfo;
	}
    
    private String getOutDdlPath(EboInfo eboInfo, OpInfo opInfo, boolean isOracle) {
//    	String ddlFile = basePath+"/cnaps2/ddl/"+ (isOracle? "oracle-":"mysql-")+opInfo.toString()+"_"+eboInfo.subClassSurfix+".sql";
    	String ddlFile = basePath+"/cnaps2/ddl/"+ (isOracle? "oracle-":"mysql-")+eboInfo.getTableName()+".sql";
    	return ddlFile;
    }
    
	private void renderDdlAndEbo(EboInfo eboInfo, OpInfo opInfo)
			throws UnsupportedEncodingException, FileNotFoundException,
			IOException, TemplateException {
		
        File outEboDir = new File(outEboPath);
        if(!outEboDir.exists()) {
            outEboDir.mkdirs();
        }
        
		Writer eboOut = new OutputStreamWriter(new FileOutputStream(new File(outEboDir, 
				eboInfo.getDestinationClassName()+".java")), ENCODING);
		String eboContent = renderTemplate(eboInfo, TEMPLATE_NAME_EBO, templatePath);
		eboOut.write(eboContent);
		eboOut.flush();
		System.out.println("generated ebo at " + outEboPath);
		
		String outDdlOracleFile = getOutDdlPath(eboInfo, opInfo, true);
		Writer ddlOut = new OutputStreamWriter(new FileOutputStream(new File(outDdlOracleFile)), ENCODING);
		String ddlContent = renderTemplate(eboInfo, TEMPLATE_NAME_DDL_ORACLE, templatePath);
		ddlOut.write(ddlContent);
		ddlOut.flush();
		System.out.println("generated oracle ddl at " + outDdlOracleFile);
		
		String outDdlMysqlFile = getOutDdlPath(eboInfo, opInfo, false);
		Writer ddlOutMysql = new OutputStreamWriter(new FileOutputStream(new File(outDdlMysqlFile)), ENCODING);
		String ddlContentMysql = renderTemplate(eboInfo, TEMPLATE_NAME_DDL_MYSQL, templatePath);
		ddlOutMysql.write(ddlContentMysql);
		ddlOutMysql.flush();
		System.out.println("generated oracle ddl at " + outDdlMysqlFile);
		
//            outMapSmooksXml2EboFile = basePath+"/map-smooks/"+op+"-xml2ebo.map";
//            outMapPrivateIso2EboFile = basePath+"/map-private/"+op+"-iso2ebo.map";
//            outMapPrivateEbo2IsoFile = basePath+"/map-private/"+op+"-ebo2iso.map";
//            public static final String TEMPLATE_NAME_MAP_SMOOKS_XML2EBO = "map-smooks-xml2ebo.ftl";
//            public static final String TEMPLATE_NAME_MAP_PRIVATE_ISO2EBO = "map-private-iso2ebo.ftl";
//            public static final String TEMPLATE_NAME_MAP_PRIVATE_EBO2ISO = "map-private-ebo2iso.ftl";
		
		Writer out1 = new OutputStreamWriter(new FileOutputStream(new File(outMapSmooksXml2EboFile)), ENCODING);
		String map1 = renderTemplate(eboInfo, TEMPLATE_NAME_MAP_SMOOKS_XML2EBO, templatePath);
		out1.write(map1);
		out1.flush();
		System.out.println("generated outMapSmooksXml2EboFile at " + outMapSmooksXml2EboFile);
	}
    
    public static String renderTemplate(Object data, String templateName, String templatePath) throws IOException,
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
    
//    public void testGeneratedEbo() {
//        String config = "/test/applicationContext.xml";
//
//        info("start of testGeneratedEbo..." );
//        try {
//            
//            // construct jaxbObj using the generated .map and sample8583
//            ISOMsg m = Iso8583Util.createDummyISOMsg(new ISOIBPSPackager(), BCUtils.getHomeDir()+"/sample/8583/"+op+".8583");
//
//            Map<String, String> mappings = Iso8583ToXml.loadMappings(new FileInputStream(outMapFile));
//            Iso8583ToXml main = new Iso8583ToXml(jaxbPkgName);
//            Object jaxbObj = main.iso8583ToObject(m, mappings);
//            debug("obj=" + jaxbObj);
//            
//            
//            // convert jaxbObj -> ebo
//            // TODO 
//            String eboClassName = EBO_PKG_NAME+"."+getEboClassNameFromOp(op);
//            Class eboClass = Class.forName(eboClassName);
//            Object ebo = eboClass.newInstance();
//            Field[] fields = eboClass.getDeclaredFields();
//            for(Field field : fields) {
//                String fName = field.getName();
//                Class fType = field.getType();
//                
////                if(Date.class.isAssignableFrom(fType)) {
////                    // TODO skip date type... XMLGregorianCalendarconversion is trouble
////                    continue;
////                }
//                if(Boolean.class.isAssignableFrom(fType)) {
//                    // TODO skip boolean type...  public Boolean isBtchBookg() is not a valid getter method
//                    continue;
//                }
//                JaxbMapping mapping = field.getAnnotation(JaxbMapping.class);
//                if(mapping!=null) {
//                    String objPath = mapping.objPath();
//                    if(StringUtils.isEmpty(objPath)) {
//                        // added columns, not mapped with jaxbObj
//                        continue;
//                    }
//                    debug("fName="+fName+", objPath="+objPath+", fType="+fType);
//                    
//                    Object value = PropertyUtils.getProperty(jaxbObj, objPath);
//                    debug("fName="+fName+", value="+value);
//                    BeanUtils.setProperty(ebo, fName, value);
//                }
//            }
//            
//            
//            // store the ebo
//            BeanUtils.setProperty(ebo, "uuid", String.valueOf(new Date().getTime()));
//            
//            info("initializing DB Connection with spring: " + config + "...");
//            ApplicationContext ctx = new ClassPathXmlApplicationContext(config);
//            IIBPSManager mgr = (IIBPSManager)ctx.getBean("ibpsManager");
//            mgr.save(ebo);
//            
//
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//        info("done testGeneratedEbo");
//
//    }
    
    
    public void testGenerated() {
        CfgImplFactory.setType(CfgImplFactory.TYPE_FILE);
        CfgImplFactory.setConfig("D:/bankConnector/source/bin/runBC-A-config-FILE.xml");
        
        // work in /generated folder
    	BCUtils.setHomeDir(basePath);
    	OpTester tester = new OpTester();
    	tester.up(opInfo);
    	tester.down(opInfo);
    }
    
    public static void main(String[] args) throws Exception{
        // only 101, 102 and 601

    	
        OpInfo[] ops = new OpInfo[] {
//             TestDummy.OPINFO_101
//             ,
//             TestDummy.OPINFO_102
//             ,
//        		TestDummy.OPINFO_601
//        		,
//        		TestDummy.OPINFO_111
//        		,
        		TestDummy.OPINFO_112
//        		,
//        		TestDummy.OPINFO_604
        };
        
        // for running from command line
        if(args!=null && args.length>0) {
        	ops = new OpInfo[] {
        		new OpInfo(args[0], args[1], args[2])
        	};
        }
        
        String basePath = "D:/bankConnector/source/generated_test";
        
//        BCUtils.registerConverter();
        
        for (OpInfo op : ops) {
            ParseSampleXml main = new ParseSampleXml(basePath,op);

            // could comment out and skip the steps you don't want
            main.parseXml();

            main.generateMap();
//            main.testGeneratedMap();

            debug("main.generateMapEbo2Jaxb();");
//            main.generateMapEbo2Jaxb();            
//            main.generateDdlAndEbo();
//            
//            main.testGenerated();
             // must copy the generated ebo java to /src/shared/java/ and compile the project, before calling this
//              main.testGeneratedEbo();
        }
        
//        String s = "saps.604.001.01__";
//        String[] ss = StringUtils.split(s, "_");
//        debug("size="+ss.length+", 0="+ss[0]);
//        OpInfo oi = OpInfo.fromString(s);
//        debug("oi="+oi);
    }
    
    
    
    /**
     * This is to get the opath from blzFldPath, based on information from jaxb package
     * The opath contains [0] to indicate this is a List
     * 
     * @param xpath
     * @param op
     * @return
     * @throws Exception
     */
	public static String getKeyFromBizFldPath(String xpath, OpInfo op) throws Exception {
		
		
		String res = "";
		res.startsWith("/");
		
		String[] tokens = StringUtils.split(xpath, "/");
		
//		String key = null;
//		StringBuffer buf = new StringBuffer();
//		for (int i = 1; i < tokens.length; i++) {
//			if (i != 1) {
//				buf.append(".");
//			}
//			String oPath = "";
//			if (tokens[i].equalsIgnoreCase("FIToFICstmrCdtTrf")) {
//				oPath = "fiToFICstmrCdtTrf";
//			} else if (tokens[i].equalsIgnoreCase("cdtTrfTxInf")) {
//				// in com.cnaps2.xml.iso20022.pacs.v00800102.FIToFICustomerCreditTransferV02
//				oPath = "cdtTrfTxInf[0]";
//			} else {
//				oPath = StringUtils.uncapitalize(tokens[i]);
//			}
//			buf.append(oPath);
//		}
//		return buf.toString();
		
		
		Stack<String> pathStack = new Stack<String>();
		String jaxbPkgName = Cnaps2Constants.getPackageName(op.getMesgType());
		Class parentClass = Class.forName(jaxbPkgName + ".Document");
		for (int i = 1; i < tokens.length; i++) {
//			debug("tokens["+i+"]="+tokens[i]);
//			String name = ParseSampleXml.getJavaName(tokens[i]);
			String name = ParseSampleXmlHelper.xpath2opath(tokens[i]);
			
			// because now metatdata contains [1] [2] already
			int index = name.indexOf("[");
			if(index>=0) {
				name = name.substring(0, index);
			}
			
//			if(i==1) {
//				pathStack.push(name);
//				// skip Document which is root
//				continue;
//			}
			
			Field thisField = ParseSampleXml.findField(pathStack, name, parentClass);
			Class thisClass = thisField.getType();
			if(i!=tokens.length-1) {
				// not leaf
				if(ParseSampleXml.isCollection(thisClass)) {
	                // TODO probably [1][2].. ???
	                name =name+"[0]";
	                pathStack.push(name);
	            }else {
	    			pathStack.push(name);
	            }
			}
			else {
				// leaf
	            boolean needAppendValue = false;
	            Class valueClass = null;
	            // test if collection is here
	            if(ParseSampleXml.isCollection(thisClass)) {
	                // TODO probably [1][2].. ???
	            	name =name+"[0]";
	                valueClass = Iso8583ToXml.getCollectionGenericType(thisField);
	            } else {
	                valueClass = ParseSampleXml.getValueClassIfHave(thisClass);
	                if(valueClass==null) {
	                    valueClass = thisClass;
	                }
	                else {
	                    needAppendValue = true;
	                }
	            }
	            
	            String xmlPath = ParseSampleXml.printStack(pathStack);
//	            String value = guessDateValue(name, ele.getText());
	            String elementPath = xmlPath+"."+name;
	            
	            res = needAppendValue? elementPath+".value" : elementPath;				
			}
			
			


		}
		
		return res;

	}
	
	
	// not in use. used to be in TestGenMap
	private Class getJaxbTypeFromBizFldType(String bizFldType) throws Exception {
		String clazz = null;
		Class res = null;

		if(StringUtils.isEmpty(bizFldType)) {
			return null;
			
		}
		else if (bizFldType.contains("Text")) {
			clazz = "java.lang.String";
		} else if (bizFldType.toLowerCase().contains("code")) {
			clazz = "java.lang.String";
		} else if (bizFldType.equalsIgnoreCase("ActiveCurrencyAndAmount")) {
			clazz = "java.math.BigDecimal";
		} else if (bizFldType.equalsIgnoreCase("DecimalNumber") ||
				bizFldType.equalsIgnoreCase("CurrencyAndAmount")) {
			clazz = "java.lang.Double";
			
		} else if (bizFldType.equalsIgnoreCase("ISODateTime")) {
			clazz = "java.util.Date";
		}

		if (clazz != null) {
			res = Class.forName(clazz);
		} else {
			throw new RuntimeException("no clazz matched for bizFldType= " + bizFldType);
		}
		return res;
	}
}
