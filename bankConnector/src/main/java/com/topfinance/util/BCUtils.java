package com.topfinance.util;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfg8583Info;
import com.topfinance.cfg.ICfgAMQInfo;
import com.topfinance.cfg.ICfgJettyInfo;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgPort;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgRouteRule;
import com.topfinance.cfg.ICfgTransportInfo;
import com.topfinance.components.tcp8583.Iso8583Codec;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

import org.apache.activemq.camel.component.ActiveMQComponent;
import org.apache.camel.CamelContext;
import org.apache.camel.component.jetty.JettyHttpComponent;
import org.apache.camel.component.mina.MinaComponent;
import org.apache.camel.component.mina.MinaConfiguration;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.log4j.Logger;


public class BCUtils {
    
    private static Logger logger = Logger.getLogger(BCUtils.class);
    
    public static String getUniqueId() {
        return getUniqueId("uid-");
        
    }
    
    public static String extractOrigMsgId(Object jaxbObj, String opName, Map<String, String> origMsgIdPaths) {
        String oPath = origMsgIdPaths.get(opName);
        if(oPath==null) {
            return null;
        }
        return extractByPath(jaxbObj, oPath);
    }
    public static String extractByPath(Object jaxbObj, String oPath) {
        // TODO generic objectPath solution
        String res = null;
        try {
            res = (String)PropertyUtils.getProperty(jaxbObj, oPath);
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
    
    public static ICfgOutPort findRoute(List<ICfgRouteRule> listRouteRule, String operationName) {
        
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
    
    
    public static void initCamelComponent(CamelContext camel, ICfgTransportInfo ti) {
        String provider = ti.getProvider();
        if(CfgConstants.JMS_PROVIDER_AMQ.equals(provider)) {
            ActiveMQComponent amq = new ActiveMQComponent();
            // ?? won't work unless define as normal JMSComponent
//            amq.setConnectionFactory(jmsInfo.getConnectionFactory());
            ICfgAMQInfo amqji = (ICfgAMQInfo)ti;
            amq.setBrokerURL(amqji.getBrokerUrl());
            camel.addComponent(ti.getPrefix(), amq);
            logger.info("adding component: "+ti.getPrefix()+", brokerUrl="+amqji.getBrokerUrl());
        }
        else if(CfgConstants.HTTP_PROVIDER_JETTY.equals(provider)) {
            JettyHttpComponent jetty = new JettyHttpComponent();
            ICfgJettyInfo jettyti = (ICfgJettyInfo)ti;
            // TODO setting up JettyHttpComponent with jettyti
            camel.addComponent(ti.getPrefix(), jetty);
            logger.info("adding component: "+ti.getPrefix());
        }
        else if(CfgConstants.TCP_PROVIDER_8583.equals(provider)) {
            MinaComponent mina = new MinaComponent();
            MinaConfiguration conf = new MinaConfiguration();
            conf.setCodec(new Iso8583Codec());
            mina.setConfiguration(conf);
            ICfg8583Info iso8583ti = (ICfg8583Info)ti;
            // TODO setting up MinaComponent with iso8583ti
            camel.addComponent(ti.getPrefix(), mina);
            logger.info("adding component: "+ti.getPrefix());
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
    
    public static String getFullUrlFromPort(ICfgPort port, ICfgReader reader) {
        String url = port.getUrl();
        // handle URL prefix
        
        ICfgTransportInfo ti = reader.getTransInfoByPort(port);
        String prefix = ti.getPrefix();
        url = prefix+"://"+url;
        
        if(CfgConstants.TCP_PROVIDER_8583.equals(ti.getProvider())) {
            
            // TODO more mina configuration
            
            // see mina doc on http://camel.apache.org/mina.html
            url+="?sync=false";
        }
        
        return url;
    }
    
    public static String getFullUrlFromPort(ICfgPort port) {
        ICfgReader reader = CfgImplFactory.loadCfgReader();
        return getFullUrlFromPort(port, reader);
    }
}
