package com.topfinance.transform.simple;

import java.io.InputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.jpos.iso.ISODate;
import org.jpos.iso.ISOMsg;

import com.topfinance.transform.ITransformer;
import com.topfinance.transform.simple.SimpleMappingRule.Mapping;
import com.topfinance.transform.util.Iso8583Util;


public class SimpleTransformer implements ITransformer, IType {

	
    private Map<String, Object> pool = new HashMap<String, Object>();
    private String rootName;
    private String pkgName;
    
    private static Logger logger = Logger.getLogger(SimpleTransformer.class);
    
    private static void debug(String msg) {
        logger.debug(msg);
    }
    private static void info(String msg) {
        logger.info(msg);
    }
    
	public Object transform(Object src, SimpleMappingRule rule) {

		// TODO a generic java mapping that can map between flat object and JaxbObject ( similiar as Iso8583ToXml )
		// assume is simple java-2-java mapping
		
		// now a very simple implementation doing flat to flat transform.
		
		String srcPath=null;
		String targetPath =null;
		Object value=null;
		try {
//			SimpleMappingRule rule =  SimpleMappingRule.fromXml(in);
			String targetClassName = rule.getTargetName();
			Object target = Class.forName(targetClassName).newInstance();

			for(Mapping map : rule.getMappings()) {
				srcPath = map.getSrcPath();
				value = PropertyUtils.getProperty(src, srcPath);
				targetPath = map.getTargetPath();
				
				String targetType = map.getTargetType();
				String srcType = map.getSrcType();
				
				if(TYPE_ISODATE.equals(srcType) && TYPE_JAVADATE.equals(targetType)) {
					// isodate to javadate
					BeanUtils.setProperty(target, targetPath, ISODate.parseISODate((String)value));
				}else if(TYPE_JAVADATE.equals(srcType) && TYPE_ISODATE.equals(targetType)) {
					BeanUtils.setProperty(target, targetPath, value==null? "" : ISODate.getDateTime((Date)value));
					
					
				}else {
					BeanUtils.setProperty(target, targetPath, value);
				}
			}
			
			return target;
		} catch (Exception ex) {
			logger.error("srcPath="+srcPath+", targetPath="+targetPath+", value="+value);
			logger.error(ex);
			throw new RuntimeException(ex);
		}

	}
	
	
	
	// 
    public Object transform2(Object src, SimpleMappingRule rule) {
    	
		String targetClassName = rule.getTargetName();
		pkgName = targetClassName.substring(0, targetClassName.lastIndexOf('.'));
//		Object target = Class.forName(targetClassName).newInstance();    	
		Object target = null;
		
        try {
    		String srcPath=null;
    		String targetPath =null;
    		Object value=null;
        	
			for(Mapping map : rule.getMappings()) {
				srcPath = map.getSrcPath();
				targetPath = map.getTargetPath();
				
//            for(String key: mappings.keySet()) {
                String[] paths = parseObjPath(targetPath);
                String oPath = paths[0];
                String thisName = paths[1];
                
                debug("================oPath="+oPath+", att="+thisName);
                
                // this is to save the "Document." from mapping rule
                // todo is there a better way?
                // TODO this is not generic enough
//                Object obj = findObject("Document."+oPath);
                Object obj = findObject(oPath);
                

                value = PropertyUtils.getProperty(src, srcPath);;
                // assume simple value
                
                // TODO handle non-mappings (CONSTANT, FUNCTION, etc)
//              String mapto = mappings.get(key);
//                if (!mapto.contains(MAP_ISO_PREFIX)) {
//                    // not a ISO mapping
//                    value=mapto;
//                } else {
//                    Integer fldno = Integer.valueOf(StringUtils.substringBetween(mapto, MAP_ISO_PREFIX, MAP_ISO_SURFIX));
//                    
//                    value = Iso8583Util.getField(msg, fldno);
//                }
                
                
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
            
			target = pool.get(rootName);
            
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
        return target;
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
//      Field field = bean.getClass().getDeclaredField(fName);
      String type = field.getGenericType().toString();
      String paraType = type.substring(type.indexOf('<')+1, type.indexOf('>'));
      debug("paraType="+paraType);
      Class res = Class.forName(paraType);
      return res;
              
  }
}
