package com.topfinance.util;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgPort;
import com.topfinance.cfg.ICfgRouteRule;
import com.topfinance.cfg.ICfgTransportInfo;
import com.topfinance.cfg.om.OmCfg8583Info;
import com.topfinance.cfg.om.OmCfgAMQInfo;
import com.topfinance.cfg.om.OmCfgJettyInfo;
import com.topfinance.components.tcp8583.Iso8583Codec;

import java.util.List;

import org.apache.activemq.camel.component.ActiveMQComponent;
import org.apache.camel.CamelContext;
import org.apache.camel.component.jetty.JettyHttpComponent;
import org.apache.camel.component.mina.MinaComponent;
import org.apache.camel.component.mina.MinaConfiguration;


public class BCUtils {
    
    public static String getUniqueId() {
        return getUniqueId("uid-");
        
    }
    
    public static ICfgOutPort findRoute(List<ICfgRouteRule> listRouteRule, String operationName) {
        
        // filling in some info of CfgOutPort( which is known) for the next step routing
        // the info can be carried either in a header or property of exchange
        
        
        ICfgRouteRule result = null;
        for(ICfgRouteRule rr : listRouteRule) {
            String operationMask = rr.getOperationMask();
            ICfgInPort ip = rr.getInPort();
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
        
        return result.getOutPort();
        
    }
    
    
    public static void initCamelComponent(CamelContext camel, ICfgTransportInfo ti) {
        String provider = ti.getProvider();
        if(CfgConstants.JMS_PROVIDER_AMQ.equals(provider)) {
            ActiveMQComponent amq = new ActiveMQComponent();
            // ?? won't work unless define as normal JMSComponent
//            amq.setConnectionFactory(jmsInfo.getConnectionFactory());
            OmCfgAMQInfo amqji = (OmCfgAMQInfo)ti;
            amq.setBrokerURL(amqji.getBrokerUrl());
            camel.addComponent(ti.getPrefix(), amq);
            System.out.println("adding component: "+ti.getPrefix()+", brokerUrl="+amqji.getBrokerUrl());
        }
        else if(CfgConstants.HTTP_PROVIDER_JETTY.equals(provider)) {
            JettyHttpComponent jetty = new JettyHttpComponent();
            OmCfgJettyInfo jettyti = (OmCfgJettyInfo)ti;
            // TODO setting up JettyHttpComponent with jettyti
            camel.addComponent(ti.getPrefix(), jetty);
            System.out.println("adding component: "+ti.getPrefix());
        }
        else if(CfgConstants.TCP_PROVIDER_8583.equals(provider)) {
            MinaComponent mina = new MinaComponent();
            MinaConfiguration conf = new MinaConfiguration();
            conf.setCodec(new Iso8583Codec());
            mina.setConfiguration(conf);
            OmCfg8583Info iso8583ti = (OmCfg8583Info)ti;
            // TODO setting up MinaComponent with iso8583ti
            camel.addComponent(ti.getPrefix(), mina);
            System.out.println("adding component: "+ti.getPrefix());
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
    public static String getFullUrlFromPort(ICfgPort port) {
        String url = port.getUrl();
        // handle URL prefix
        ICfgTransportInfo ti = port.getTransportInfo();
        String prefix = ti.getPrefix();
        url = prefix+"://"+url;
        return url;
    }
}
