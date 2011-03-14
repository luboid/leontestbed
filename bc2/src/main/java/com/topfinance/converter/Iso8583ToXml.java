package com.topfinance.converter;

import java.io.InputStream;
import java.io.StringReader;
import java.io.StringWriter;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Collection;
import java.util.Date;
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
import org.apache.log4j.Logger;
import org.jpos.iso.ISOBasePackager;
import org.jpos.iso.ISODate;
import org.jpos.iso.ISOMsg;

import com.topfinance.runtime.BcConstants;
import com.topfinance.transform.util.Iso8583Util;
import com.topfinance.transform.util.IsoHelper;
import com.topfinance.transform.util.IsoObj;
import com.topfinance.util.BCUtils;


public class Iso8583ToXml {
    
    private static Logger logger = Logger.getLogger(Iso8583ToXml.class);
    
    private String pkgName = "com.topfinance.plugin.cnaps2.dummy";
    private Map<String, Object> pool = new HashMap<String, Object>();
    private String rootName;
    
    public static final String MAP_ISO_PREFIX = "ISO[";
    public static final String MAP_ISO_SURFIX = "]";
    
    public Iso8583ToXml(String pkgName) {
        this.pkgName = pkgName;
    }
    
    private static void debug(String msg) {
        logger.debug(msg);
    }
    private static void info(String msg) {
        logger.info(msg);
    }
    public String objectToXml(Object object) {
        String rtnStr = "";
        try {
                JAXBContext jaxbContext = JAXBContext.newInstance(pkgName);
                Marshaller marshaller = jaxbContext.createMarshaller();
                marshaller.setProperty(Marshaller.JAXB_ENCODING, BcConstants.ENCODING);
                marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
                marshaller.setProperty(Marshaller.JAXB_FRAGMENT, false);
                
                Class docClazz = Class.forName(pkgName+".Document");
                Class ofClazz = Class.forName(pkgName+".ObjectFactory");
                Object factory = ofClazz.newInstance();
                Method method = ofClazz.getDeclaredMethod("createDocument", docClazz);
                JAXBElement jaxbElement = (JAXBElement)method.invoke(factory, docClazz.cast(object));
                
                StringWriter sw = new StringWriter();
                marshaller.marshal(jaxbElement, sw);
                rtnStr = sw.toString();
                
                // TODO remove the header in a better way: <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
                rtnStr = StringUtils.substringAfter(rtnStr, "?>").trim();
        } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException(e);
        }
        return rtnStr;
    }
    public Object xmlToObject(String xml) {
        Object jaxbObj = null;
        try {
            JAXBContext jaxbContext = JAXBContext.newInstance(pkgName);
            Unmarshaller unMarshaller = jaxbContext.createUnmarshaller();
            JAXBElement jaxbElement = (JAXBElement)unMarshaller.unmarshal(new StringReader(xml));
            jaxbObj = jaxbElement.getValue();
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
        return jaxbObj;
    }
    
    
    public static ISOMsg objectToIso8583(ISOBasePackager packager, Object jaxbObj, Map<String, String> mappings) {
    	ISOMsg res = Iso8583Util.emptyMsg(packager);
    	try {
    		for(String key: mappings.keySet()) {
    			String oPath = mappings.get(key);
    			
    			Object value = BCUtils.extractFromJaxbObjByOPath(jaxbObj, oPath); 
    			debug("oPath="+oPath+", value="+value);
    			String strVal = "";
    			if(value==null) {
    			    strVal="";
    			}
    			else if(value instanceof Date) {
    			    strVal = ISODate.getDateTime((Date)value);
    			}else {
    			    strVal = value.toString();
    			}
    			Integer fldPos = Integer.valueOf(key);
    			
    			Iso8583Util.setField(res, fldPos, strVal);
    			 
    		}
    		

    	} catch (Exception ex) {
    		ex.printStackTrace();
    		throw new RuntimeException(ex);
    	}
    	
    	return res;
    }
    
//    public Object iso8583ToObject(ISOMsg msg, Map<String, String> mappings) {
//    	IsoObj obj = IsoHelper.parse(msg);
//    }
    
    public Object iso8583ToObject(ISOMsg msg, Map<String, String> mappings) {
        Object res = null;
        try {
            for(String key: mappings.keySet()) {
                String[] paths = parseObjPath(key);
                String oPath = paths[0];
                String thisName = paths[1];
                
                debug("================oPath="+oPath+", att="+thisName);
                
                // this is to save the "Document." from mapping rule
                // todo is there a better way?
                // TODO this is not generic enough
                Object obj = findObject("Document."+oPath);
                
                
                String mapto = mappings.get(key);
                Object value = null;
                if (!mapto.contains(MAP_ISO_PREFIX)) {
                    // not a ISO mapping
                    value=mapto;
                } else {
                    Integer fldno = Integer.valueOf(StringUtils.substringBetween(mapto, MAP_ISO_PREFIX, MAP_ISO_SURFIX));
                    
                    value = Iso8583Util.getField(msg, fldno);
                }
                
                
                // the leaf node itself is a List (of Strings?) see 101 RemittanceInformation5.ustrd                
                if(thisName.contains("[")) {
                    if(value==null) {
                        // ISO msg does not contain the mapping field
                        // TODO what to do?
                        // now just neglect
                    } else {
                        String fName = StringUtils.substringBefore(thisName, "[");
                        Collection collection = (Collection)PropertyUtils.getProperty(obj, fName);
                        collection.add(value);
                    }
                } else {
                    Field field = obj.getClass().getDeclaredField(thisName);
                    Class type = field.getType();
                    debug("type=" + type);

                    if (value == null) {
                        // ISO msg does not contain the mapping field
                        // TODO what to do?
                        // now just neglect
                    } else if (type.isEnum()) {
                        Object[] values = type.getEnumConstants();
                        Method m = type.getDeclaredMethod("fromValue", String.class);
                        value = m.invoke(obj, (String)value);
                    }

                    BeanUtils.setProperty(obj, thisName, value);
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
//            rootName = StringUtils.substringBefore(key, ".");
//            if(StringUtils.isEmpty(rootName)) {
//                throw new RuntimeException("rootName not found for key="+key);
//            }
            rootName="Document";
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
            debug("i="+i+", level="+level+", parentPath="+parentPath+", parent="+parent);
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
                            Field field = parent.getClass().getDeclaredField(fName);
                            thisClass = getCollectionGenericType(field);
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
    
    public static Class getCollectionGenericType(Field field) throws Exception{
//        Field field = bean.getClass().getDeclaredField(fName);
        String type = field.getGenericType().toString();
        String paraType = type.substring(type.indexOf('<')+1, type.indexOf('>'));
        debug("paraType="+paraType);
        Class res = Class.forName(paraType);
        return res;
                
    }
    

    
    

    
    public static void main(String[] args) throws Exception{
        
        // for unit test, see test.TestIsoConverter
        
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
                debug("skipping map="+map);
            }
        }
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
        
        return res;
    }

    
    
    
}
