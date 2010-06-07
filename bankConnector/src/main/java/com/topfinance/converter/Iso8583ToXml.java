package com.topfinance.converter;

import com.topfinance.cfg.dummy.TestDummy;

import java.io.InputStream;
import java.io.StringReader;
import java.io.StringWriter;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.jpos.iso.ISOMsg;

public class Iso8583ToXml {
    
    private String pkgName = "com.topfinance.plugin.cnaps2.dummy";
    
    
    Map<String, Object> pool = new HashMap<String, Object>();
    String rootName;
    
    public Iso8583ToXml(String pkgName) {
        this.pkgName = pkgName;
    }
    
    private static void debug(String msg) {
        System.out.println(msg);
    }
    
    public String objectToXml(Object object) {
        String rtnStr = "";
        try {
                JAXBContext jaxbContext = JAXBContext.newInstance(pkgName);
                Marshaller marshaller = jaxbContext.createMarshaller();
                // marshaller.setProperty(Marshaller.JAXB_ENCODING,Constants.ENCODING_GBK);
                marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
                marshaller.setProperty(Marshaller.JAXB_FRAGMENT, false);
                
                Class docClazz = Class.forName(pkgName+".Document");
                Class ofClazz = Class.forName(pkgName+".ObjectFactory");
                Object factory = ofClazz.newInstance();
                Method method = ofClazz.getDeclaredMethod("createDocument", docClazz);
                JAXBElement webFlowElement = (JAXBElement)method.invoke(factory, docClazz.cast(object));
                
                StringWriter sw = new StringWriter();
                marshaller.marshal(webFlowElement, sw);
                rtnStr = sw.toString();
                
                // TODO remove the header in a better way: <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
                rtnStr = StringUtils.substringAfter(rtnStr, "?>").trim();
        } catch (Exception e) {
                e.printStackTrace();
        }
        return rtnStr;
    }
    public Object xmlToObject(String xml) throws Exception {
        Object jaxbObj = null;

        JAXBContext jaxbContext = JAXBContext.newInstance(pkgName);
        Unmarshaller unMarshaller = jaxbContext.createUnmarshaller();
        JAXBElement jaxbElement = (JAXBElement)unMarshaller.unmarshal(new StringReader(xml));
        jaxbObj = jaxbElement.getValue();

        return jaxbObj;
    }
    public Object iso8583ToObject(ISOMsg msg, Map<String, String> mappings) {
        Object res = null;
        try {
            for(String key: mappings.keySet()) {
                String[] paths = parseObjPath(key);
                String oPath = paths[0];
                String att = paths[1];
                System.out.println("oPath="+oPath+", att="+att);
                
                Object obj = findObject(oPath);
                
                
                String mapto = mappings.get(key);
                if (!mapto.contains("ISO[")) {
                    // not a ISO mapping
                    BeanUtils.setProperty(obj, att, mapto);
                } else {
                    Integer fldno = Integer.valueOf(StringUtils.substringBetween(mapto, "ISO[", "]"));

                    Field field = obj.getClass().getDeclaredField(att);
                    Class type = field.getType();
                    debug("type=" + type);

                    if (type.isEnum()) {
                        Object[] values = type.getEnumConstants();

                        Method m = type.getDeclaredMethod("fromValue", String.class);
                        Object enumValue = m.invoke(obj, (String)msg.getValue(fldno));

                        BeanUtils.setProperty(obj, att, enumValue);
                    } else {
                        BeanUtils.setProperty(obj, att, msg.getValue(fldno));
                    }
                }
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
            debug("parent="+parent+", thisName="+thisName+", thisPath="+thisPath);
            // check cache
            res = pool.get(thisPath);
            if (res == null) {
                Class thisClass = null;
                Object thisObj = null;
                if(parent==null) {
                    // first level
                    thisClass = Class.forName(pkgName+"."+thisName);
                    thisObj = thisClass.newInstance();
                } else {
                    thisClass = PropertyUtils.getPropertyType(parent, thisName);
                    debug("thisClass="+thisClass);    
                    if(Collection.class.isAssignableFrom(thisClass)) {
                        if(!thisName.contains("[")) {
                            // sth wrong. 
                            throw new RuntimeException("mismatch collection types");
                        }
                        else {
                            String fName = StringUtils.substringBefore(thisName, "[");
                            debug("fName="+fName);
                            thisClass = getCollectionGenericType(parent, fName);
                            thisObj = thisClass.newInstance();
                            Collection collection = (Collection)PropertyUtils.getProperty(parent, fName);
                            collection.add(thisObj);
                        }
                    }else {
                        thisObj = thisClass.newInstance();
                        PropertyUtils.setProperty(parent, thisName, thisObj);
                    }
                }
                
                debug("thisObj="+thisObj);
                pool.put(thisPath, thisObj);
                res = thisObj;
            }
            
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }

        return res;
    }
    
    private static Class getCollectionGenericType(Object bean, String fName) throws Exception{
        Field field = bean.getClass().getDeclaredField(fName);
        String type = field.getGenericType().toString();
        String paraType = type.substring(type.indexOf('<')+1, type.indexOf('>'));
        debug("paraType="+paraType);
        Class res = Class.forName(paraType);
        return res;
                
    }
    
    public static Map<String, String> loadMappings(InputStream input)  {
 
        Map<String, String> res = new HashMap<String, String>();
        // load the mapping rule
        try {
        List<String> maps = IOUtils.readLines(input);
        for(String map:maps) {
            if(StringUtils.isBlank(map)) {
                continue;
            }
            
            if(map.trim().startsWith("#")) {
                continue;
            }
            
            String[] ss = StringUtils.split(map, "=");
            if(ss.length==2) {
                res.put(ss[0], ss[1]);
                
            }
            else {
                System.out.println("skipping map="+map);
            }
        }
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
        
        return res;
    }
    
    public static void main(String[] args) throws Exception{
        
//        ISOMsg m = new ISOMsg();
//        m.set (new ISOField (BcConstants.ISO8583_OP_NAME,  TestDummy.OPERATION_101));
//        m.set (new ISOField (BcConstants.ISO8583_DOC_ID,  BCUtils.getUniqueDocId()));
//        m.set (new ISOField (BcConstants.ISO8583_ORIG_DOC_ID,  ""));
//        m.set (new ISOField (BcConstants.ISO8583_HOST_ID,  "xxxx"));
//        m.set (new ISOField (BcConstants.ISO8583_PARTNER_ID,  "yyyy"));
//        
//        InputStream mapFile = Iso8583ToXml.class.getResourceAsStream("/com/topfinance/plugin/cnaps2/dummy/dummy-up.map");
//        System.out.println("mapFile="+mapFile);
//        Map<String, Integer> mappings = Iso8583ToXml.loadMappings(mapFile);
//        
//        Iso8583ToXml main = new Iso8583ToXml();
//        Object obj = main.iso8583ToObject(m, mappings);
//        System.out.println("obj="+obj);
//        
//        String xml = main.objectToXml(obj);
//        System.out.println("xml="+xml);
        
    }

    public static String getPackageName(String mesgType) {
        // this is a fixed rule
        
        // TODO mesgType is name of operation, could change. 
        // it should be sth like "type" of operation which is enumeration value
        
        String pkgName = "";
        if (mesgType.equals(TestDummy.OPERATION_101)) {
            pkgName = "com.topfinance.plugin.cnaps2.v00800102";
        } else if(mesgType.equals(TestDummy.OPERATION_102)) {
            pkgName = "com.topfinance.plugin.cnaps2.v00200103";                
        } else if(mesgType.equals(TestDummy.OPERATION_601)) {
            pkgName = "com.topfinance.plugin.cnaps2.v05400102";                
        }        
        return pkgName;
    }
    

    
    
    
}
