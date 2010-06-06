package com.topfinance.converter;

import com.topfinance.cfg.dummy.TestDummy;
import com.topfinance.plugin.cnaps2.dummy.Document;
import com.topfinance.runtime.BcConstants;
import com.topfinance.util.BCUtils;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.Marshaller;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.jpos.iso.ISOField;
import org.jpos.iso.ISOMsg;

public class Iso8583ToXml {
    
    
    
    static String pkgName = "com.topfinance.plugin.cnaps2.dummy";
    Map<String, Object> pool = new HashMap<String, Object>();
    String rootName;
    
    public static String buildXml(Object webFlow) {
        String rtnStr = "";
        try {
                JAXBContext jaxbContext = JAXBContext.newInstance(pkgName);
                Marshaller marshaller = jaxbContext.createMarshaller();
                // marshaller.setProperty(Marshaller.JAXB_ENCODING,Constants.ENCODING_GBK);
                marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
                
                Class docClazz = Class.forName(pkgName+".Document");
                Class ofClazz = Class.forName(pkgName+".ObjectFactory");
                Object factory = ofClazz.newInstance();
                Method method = ofClazz.getDeclaredMethod("createDocument", docClazz);
                JAXBElement webFlowElement = (JAXBElement)method.invoke(factory, docClazz.cast(webFlow));
                
//                JAXBElement webFlowElement = factory.createDocument(webFlow);
//                ObjectFactory factory = new ObjectFactory();
//                JAXBElement<Document> webFlowElement = factory.createDocument(webFlow);
                StringWriter sw = new StringWriter();
                marshaller.marshal(webFlowElement, sw);
                rtnStr = sw.toString();
        } catch (Exception e) {
                e.printStackTrace();
                // log.error("Generating xml file failed.",e);
        }
        return rtnStr;
    }
    
    public void objectToXml(Object object) {
        
        String s = buildXml((Document)object);
        System.out.println("xml="+s);
    }
    
    public Object iso8583ToObject(ISOMsg msg, Map<String, Integer> mappings) {
        Object res = null;
        try {
            for(String key: mappings.keySet()) {
                String[] paths = parseObjPath(key);
                String oPath = paths[0];
                String att = paths[1];
                System.out.println("oPath="+oPath+", att="+att);
                
                Object obj = findObject(oPath);
                Integer fldno = mappings.get(key);
                BeanUtils.setProperty(obj, att, msg.getValue(fldno));
            }
            
            res = pool.get(rootName);
            
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
        return res;
    }
    
    private String[] parseObjPath(String key) {
        if(rootName==null) {
            rootName = StringUtils.substringBefore(key, ".");
            if(StringUtils.isEmpty(rootName)) {
                throw new RuntimeException("rootName not found for key="+key);
            }
        }

        int index = key.lastIndexOf('.');
        String oPath = key.substring(0, index);
        String att = key.substring(index+1);
        
        return new String[]{oPath, att};
        
    }
    private Object findObject(String oPath) {

        Object res = null;
        
        String[] levels = StringUtils.split(oPath, '.');
        Object parent = null;
        String parentPath = "";
        for(int i=0;i<levels.length;i++) {
            String level = levels[i];
            System.out.println("i="+i+", level="+level+", parentPath="+parentPath+", parent="+parent);
            Object thisObj = findObject(parent, parentPath, level);
            res = thisObj;
            
            parent = thisObj;
            parentPath = StringUtils.isEmpty(parentPath)? level : parentPath+"."+level;
        }
        return res;
    }
    
    private Object findObject(Object parent, String parentPath, String oPath) {
        Object res = null;
        try {
            String thisName = StringUtils.substringBefore(oPath, ".");
            String thisPath = thisName;
            if(StringUtils.isNotEmpty(parentPath)) {
                thisPath = parentPath + "." + thisName;
            }
            System.out.println("thisName="+thisName+", thisPath="+thisPath);
            // check cache
            res = pool.get(thisPath);
            if (res == null) {
                Class thisClass = null; 
                if(parent==null) {
                    // first level
                    thisClass = Class.forName(pkgName+"."+thisName);
                } else {
                    thisClass = PropertyUtils.getPropertyType(parent, thisName);
                }
                Object thisObj = thisClass.newInstance();
                if(parent!=null) {
                    PropertyUtils.setProperty(parent, thisName, thisObj);
                }
                System.out.println("thisObj="+thisObj);
                pool.put(thisPath, thisObj);
                res = thisObj;
            }
            
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }

        return res;
    }
    
    
    public static void main(String[] args) throws Exception{
        
        ISOMsg m = new ISOMsg();
        m.set (new ISOField (BcConstants.ISO8583_OP_NAME,  TestDummy.OPERATION_101));
        m.set (new ISOField (BcConstants.ISO8583_DOC_ID,  BCUtils.getUniqueDocId()));
        m.set (new ISOField (BcConstants.ISO8583_ORIG_DOC_ID,  ""));
        m.set (new ISOField (BcConstants.ISO8583_HOST_ID,  "xxxx"));
        m.set (new ISOField (BcConstants.ISO8583_PARTNER_ID,  "yyyy"));
        
//        Map<String, Integer> mappings = new HashMap<String, Integer>();
//        mappings.put("Document.opName", 121);
//        mappings.put("Document.docId", 122);
//        mappings.put("Document.origDocId", 123);
//        mappings.put("Document.hostIdentity", 124);
//        mappings.put("Document.partnerIdentity", 125);
        
        Map<String, Integer> mappings = loadMappings();
        
        Iso8583ToXml main = new Iso8583ToXml();
        Object obj = main.iso8583ToObject(m, mappings);
        
        System.out.println("obj="+obj);
        main.objectToXml(obj);
        
        
    }

    private static Map<String, Integer> loadMappings() throws IOException {
        Map<String, Integer> res = new HashMap<String, Integer>();
        // load the mapping rule
        InputStream mapFile = Iso8583ToXml.class.getResourceAsStream("/com/topfinance/plugin/cnaps2/dummy/dummy-up.map");
        System.out.println("mapFile="+mapFile);
        List<String> maps = IOUtils.readLines(mapFile);
        for(String map:maps) {
            String[] ss = StringUtils.split(map, "=");
            if(ss.length==2) {
                Integer val = Integer.valueOf(ss[1]);
                res.put(ss[0], val);
                
            }
            else {
                System.out.println("skipping map="+map);
            }
        }
        
        return res;
    }
}
