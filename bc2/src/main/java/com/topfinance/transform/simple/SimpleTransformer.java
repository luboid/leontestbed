package com.topfinance.transform.simple;

import java.io.InputStream;
import java.util.Date;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.log4j.Logger;
import org.jpos.iso.ISODate;

import com.topfinance.transform.ITransformer;
import com.topfinance.transform.simple.SimpleMappingRule.Mapping;


public class SimpleTransformer implements ITransformer, IType {

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
	
	
}
