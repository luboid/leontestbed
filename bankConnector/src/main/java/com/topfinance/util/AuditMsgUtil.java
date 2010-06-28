package com.topfinance.util;

import com.cnaps2.cncc.service.IIBPSManager;
import com.topfinance.ebo.msg.JaxbMapping;
import com.topfinance.runtime.Main;

import java.lang.reflect.Field;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

public class AuditMsgUtil {
    private static Logger logger = Logger.getLogger(AuditMsgUtil.class);

    public static IIBPSManager getMgr() {
        return (IIBPSManager)Main.getBean("ibpsManager");
    }

    public static void saveMsg(Object jaxbObj, String op) {
        try {
            String eboClassName = "com.topfinance.ebo.msg."+ParseSampleXml.getEboClassNameFromOp(op);
            Class eboClass = Class.forName(eboClassName);
            Object ebo = eboClass.newInstance();
            Field[] fields = eboClass.getDeclaredFields();
            for (Field field : fields) {
                String fName = field.getName();
                Class fType = field.getType();
                JaxbMapping mapping = field.getAnnotation(JaxbMapping.class);
                if (mapping != null) {
                    String objPath = mapping.objPath();
                    if (StringUtils.isEmpty(objPath)) {
                        // added columns, not mapped with jaxbObj
                        continue;
                    }
                    logger.debug("fName=" + fName + ", objPath=" + objPath + ", fType=" + fType);

                    Object value = BCUtils.extractFromJaxbObjByOPath(jaxbObj, objPath);
                    
                    logger.debug("fName=" + fName + ", value=" + value);
                    BeanUtils.setProperty(ebo, fName, value);
                }
            }

            // store the ebo
            BeanUtils.setProperty(ebo, "uuid", BCUtils.getUniqueId("uid-"));

            getMgr().save(ebo);
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }

    }

}
