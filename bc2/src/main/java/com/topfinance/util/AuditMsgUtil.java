package com.topfinance.util;

import java.io.File;
import java.io.FileWriter;

import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.db.dao.IDao;
import com.topfinance.runtime.Main;

public class AuditMsgUtil {
    private static Logger logger = Logger.getLogger(AuditMsgUtil.class);

//    public static IIBPSManager getMgr() {
//        return (IIBPSManager)Main.getBean("ibpsManager");
//    }
    
	private static IDao getDao() {
		IDao dao = (IDao) Main.getBean("dao");
		return dao;
	}
    public static void saveMsg(Object ebo) {
        try {
//            String eboClassName = "com.topfinance.ebo.msg."+ParseSampleXml.getEboClassNameFromOp(op);
//            Class eboClass = Class.forName(eboClassName);
//            Object ebo = eboClass.newInstance();
//            Field[] fields = eboClass.getDeclaredFields();
//            for (Field field : fields) {
//                String fName = field.getName();
//                Class fType = field.getType();
//                JaxbMapping mapping = field.getAnnotation(JaxbMapping.class);
//                if (mapping != null) {
//                    String objPath = mapping.objPath();
//                    if (StringUtils.isEmpty(objPath)) {
//                        // added columns, not mapped with jaxbObj
//                        continue;
//                    }
//                    logger.debug("fName=" + fName + ", objPath=" + objPath + ", fType=" + fType);
//
//                    Object value = BCUtils.extractFromJaxbObjByOPath(jaxbObj, objPath);
//                    
//                    logger.debug("fName=" + fName + ", value=" + value);
//                    BeanUtils.setProperty(ebo, fName, value);
//                }
//            }

            // store the ebo
//            BeanUtils.setProperty(ebo, "uuid", BCUtils.getUniqueId("uid-"));
//            getMgr().save(ebo);
        	
        	if(BCUtils.needSaveMsgDb()) {
        		getDao().save(ebo);	
        	}
        	
            
        } catch (Exception ex) {
            logger.error("Failed to saveMsgDb", ex);
            throw new RuntimeException(ex);
        }

    }
    
    public static void saveMsgAsFile(String direction, String msgId, String msg) {
    	FileWriter output = null;
        try {
        	if(BCUtils.needSaveMsgFile()) {
        		String s = CfgConstants.DIRECTION_UP.equals(direction) ? "up" : "down";
        		output = new FileWriter(new File(BCUtils.getHomeDir()+"/bin/logs", msgId+"-"+s+".log"));
        		IOUtils.write(msg, output);
        	}
        } catch (Exception ex) {
        	logger.warn("Failed to saveMsgFile, msgId="+msgId+", direction="+direction, ex);
        } finally {
        	if(output!=null) {
        		try {
        			output.close();
        		} catch(Exception e) {
        		}
        	}
        }

    }
}
