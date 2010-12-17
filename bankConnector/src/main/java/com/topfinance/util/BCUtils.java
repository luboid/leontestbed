package com.topfinance.util;

import com.ibm.mq.jms.MQQueueConnectionFactory;
import com.topfinance.cfg.CfgAccessException;
import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgTransport8583;
import com.topfinance.cfg.ICfgTransportAMQ;
import com.topfinance.cfg.ICfgTransportIBMMQ;
import com.topfinance.cfg.ICfgTransportJetty;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgPort;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgRouteRule;
import com.topfinance.cfg.ICfgTransportInfo;
import com.topfinance.components.tcp8583.Iso8583Codec;
import com.topfinance.converter.CalendarConverter;
import com.topfinance.runtime.BcConstants;

import java.beans.PropertyDescriptor;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.xml.datatype.XMLGregorianCalendar;

import org.apache.activemq.camel.component.ActiveMQComponent;
import org.apache.camel.CamelContext;
import org.apache.camel.Component;
import org.apache.camel.component.jetty.JettyHttpComponent;
import org.apache.camel.component.jms.JmsComponent;
import org.apache.camel.component.jms.JmsConfiguration;
import org.apache.camel.component.mina.MinaComponent;
import org.apache.camel.component.mina.MinaConfiguration;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.jms.connection.CachingConnectionFactory;


public class BCUtils {
    
    private static Logger logger = Logger.getLogger(BCUtils.class);
    
    public static String getUniqueId() {
        return getUniqueId("uid-");
        
    }
    
    public static void registerConverter() {
        ConvertUtils.register(new CalendarConverter(), Date.class);
    }
    
    public static InputStream getMappingRuleFromFS(String fileName) {
        
        String mapFileName = BCUtils.getHomeDir()+"/sample/map/"+fileName;
        BCUtils.testFileExist(mapFileName, false);
        try {
            InputStream mapFile = new FileInputStream(mapFileName);
            return mapFile;
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
    
    public static String getHomeDir() {
        String homeDir = System.getenv().get(BcConstants.ENV_HOME);
        if(StringUtils.isEmpty(homeDir)) {
            String msg = "Please make sure environment variable "+BcConstants.ENV_HOME+" is set correctly according to your local folder structure.";
            throw new RuntimeException(msg);
        }
        try {
            BCUtils.testFileExist(homeDir, true);
        } catch (Exception ex) {
            String msg="Please make sure environment variable "+BcConstants.ENV_HOME+" is set correctly according to your local folder structure. cause: " + ex.getMessage();
            throw new RuntimeException(msg);
        }
        return homeDir;
    }
    
    public static void testFileExist(String path, boolean expectDir) {
        File file = new File(path);
        if(!file.exists()) {
            throw new RuntimeException("file path: "+path +" does not exist"); 
        }else if(expectDir && !file.isDirectory()){
            throw new RuntimeException("expect dir but found file for path: "+path);
        }else if(!expectDir && file.isDirectory()){
            throw new RuntimeException("expect file but found dir for path: "+path);
        }
    }
    
    public static String extractOrigMsgId(Object jaxbObj, String opName, Map<String, String> origMsgIdPaths) {
        String oPath = origMsgIdPaths.get(opName);
        if(oPath==null) {
            return null;
        }
        return (String)extractFromJaxbObjByOPath(jaxbObj, oPath);
    }
    public static Object extractFromJaxbObjByOPath(Object jaxbObj, String oPath) {
        // TODO generic objectPath solution
        Object res = null;
        try {
            PropertyDescriptor pd = PropertyUtils.getPropertyDescriptor(jaxbObj, oPath);
            Class clazz = pd.getPropertyType();
            if (XMLGregorianCalendar.class.isAssignableFrom(clazz)) {
                // TODO skip date type... XMLGregorianCalendarconversion is trouble
                res = new Date(); 
            }
            else if (Boolean.class.isAssignableFrom(clazz)) {
                // TODO skip boolean type... public Boolean isBtchBookg() is
                // not a valid getter method
                res = Boolean.FALSE;
            }
            else {
                res = (String)BeanUtils.getProperty(jaxbObj, oPath);    
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return res;
    }
    public static String extractMsgId(Object jaxbObj) {
        // suppose .grpHdr.msgId is common place to store msgID
        String res = null;
        Field[] fields = jaxbObj.getClass().getDeclaredFields();
        String fn = fields[0].getName();
        try {
            res = (String)PropertyUtils.getProperty(jaxbObj, fn+".grpHdr.msgId");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return res;
    }
    
    public static ICfgOutPort findRoute(List<ICfgRouteRule> listRouteRule, String operationName) throws CfgAccessException{
        
        // filling in some info of CfgOutPort( which is known) for the next step routing
        // the info can be carried either in a header or property of exchange
        
        
        ICfgRouteRule result = null;
        for(ICfgRouteRule rr : listRouteRule) {
            String operationMask = rr.getOperationMask();
//            ICfgInPort ip = rr.getInPort();
            if( operationName.startsWith(operationMask)
                // TODO need match Inport ?
                // && ip.getName().equals(inPort.getName())
                ) {
                result = rr;
                break;
            }
        }
        if(result==null) {
            throw new RuntimeException("cannot found matching route for operation: "+operationName);
        }
        ICfgReader cfgReader = CfgImplFactory.loadCfgReader();
        return cfgReader.getOutPortByRR(result);
        
    }
    
    
    public static void initCamelComponent(CamelContext camel, ICfgTransportInfo ti) throws Exception{
        
        String provider = ti.getProvider();
        Component comp = null;
        if(CfgConstants.JMS_PROVIDER_AMQ.equals(provider)) {
            
            // ?? won't work unless define as normal JMSComponent
//            amq.setConnectionFactory(jmsInfo.getConnectionFactory());
            ICfgTransportAMQ amqji = (ICfgTransportAMQ)ti;
            ActiveMQComponent amq = new ActiveMQComponent();
            comp = amq;
            amq.setBrokerURL(amqji.getBrokerUrl());
            
//            logger.info("adding component: "+ti.getPrefix()+", brokerUrl="+amqji.getBrokerUrl());
        }
        
        else if(CfgConstants.JMS_PROVIDER_IBMMQ.equals(provider)) {
            ICfgTransportIBMMQ ibmmqti = (ICfgTransportIBMMQ)ti;
            // ibm mq
            MQQueueConnectionFactory factory = new MQQueueConnectionFactory(); 
            factory.setHostName(ibmmqti.getHostName()); 
            factory.setPort(ibmmqti.getPort()); 
            factory.setQueueManager(ibmmqti.getQueueManager());
            factory.setChannel(ibmmqti.getChannel()); 
            factory.setTransportType(ibmmqti.getTransportType());
            //Where some_ccsid_int is a Character Code Set identifier. It depends on the system as to what code sets are supported. 819, 1200 and 1208 are good ones to try.
            factory.setCCSID(ibmmqti.getCCSID());
            
            CachingConnectionFactory cf = new CachingConnectionFactory(factory);
            
            JmsConfiguration jc = new JmsConfiguration(cf);
            JmsComponent ibmmq = new JmsComponent(jc);
            comp = ibmmq;
        }
        else if(CfgConstants.HTTP_PROVIDER_JETTY.equals(provider)) {
            ICfgTransportJetty jettyti = (ICfgTransportJetty)ti;
            JettyHttpComponent jetty = new JettyHttpComponent();
            comp = jetty;
            // TODO setting up JettyHttpComponent with jettyti
            
            
        }
        else if(CfgConstants.TCP_PROVIDER_8583.equals(provider)) {
            ICfgTransport8583 iso8583ti = (ICfgTransport8583)ti;
            
            MinaComponent mina = new MinaComponent();
            comp = mina;
            MinaConfiguration conf = new MinaConfiguration();
            conf.setCodec(new Iso8583Codec());
            mina.setConfiguration(conf);
            // TODO setting up MinaComponent with iso8583ti
            
        }
        
        if(camel.getComponent(ti.getPrefix())!=null) {
            logger.warn("skip adding existed component: "+ti.getPrefix());
        } else {
            // TODO typing configurations
            logger.info("adding component: "+ti.getPrefix());
            camel.addComponent(ti.getPrefix(), comp);
        }
    }
    
    
    public static String getUniqueId(String prefix, int maxLength) {
        String id = prefix+System.nanoTime()+"-"+Math.random()*1000000l;
        if(id.length()>maxLength) {
            id = id.substring(0, maxLength);
        }
        return id;
    }
    
    public static String getUniqueId(String prefix) {
        return getUniqueId(prefix, 100);
    }
    public static String getUniqueDocId() {
        return getUniqueId("docid-");
    }    
    public static String getUniqueTxId() {
        return getUniqueId("txid-");
    }
    public static String getUniqueMesgId() {
        return getUniqueId("m-", 20);
    }   
    
    public static String getFullUrlFromPort(ICfgPort port, ICfgReader reader, boolean isConsumer, boolean isInOnly) throws CfgAccessException{
        String url = port.getUrl();
        // handle URL prefix
        
        ICfgTransportInfo ti = reader.getTransInfoByPort(port);
        String prefix = ti.getPrefix();
        url = prefix+"://"+url;
        
        if(CfgConstants.TCP_PROVIDER_8583.equals(ti.getProvider())) {
            
            // decide sync parameter: see mina doc on http://camel.apache.org/mina.html
            
//            String isSync = "";
//            if(port instanceof ICfgInPort) {
//            // TODO more mina configuration
//                ICfg8583InPort in8583 = (ICfg8583InPort)port;
//                isSync = in8583.getIsSync();
//            }else if(port instanceof ICfgOutPort) {
//                ICfg8583OutPort out8583 = (ICfg8583OutPort)port;
//                isSync = out8583.getIsSync();
//            }
//            url+= CfgConstants.BOOLEAN_TRUE.equals(isSync)? "?sync=true" : "?sync=false";
            
            url += isInOnly? "?sync=false" : "?sync=true";
            
            url+=("&timeout="+BcConstants.CHANNEL_DEFAULT_TIMEOUT);
            if(!isConsumer) {
                url+=("&disconnect=true");
            }
        }
        
        return url;
    }
    
    public static String getFullUrlFromPortForConsumer(ICfgPort port) throws CfgAccessException{
        boolean isConsumer = true; 
        boolean isInOnly = false; 
        ICfgReader reader = CfgImplFactory.loadCfgReader();
        return getFullUrlFromPort(port, reader, isConsumer, isInOnly);
    }
    public static String getFullUrlFromPort(ICfgPort port, boolean isInOnly) throws CfgAccessException{
        boolean isConsumer = false;
        ICfgReader reader = CfgImplFactory.loadCfgReader();
        return getFullUrlFromPort(port, reader, isConsumer, isInOnly);
    }
}
