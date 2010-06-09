package com.topfinance.cfg.om;

import com.topfinance.cfg.ICfgAMQInfo;

import javax.jms.ConnectionFactory;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.simpleframework.xml.Attribute;

public class OmCfgAMQInfo extends OmCfgTransportInfo implements ICfgAMQInfo {
    
    @Attribute(required=false)
    private String brokerUrl;
    
    public ConnectionFactory getConnectionFactory() {
        ActiveMQConnectionFactory cf = new ActiveMQConnectionFactory();
        cf.setBrokerURL(getBrokerUrl());
        return cf;
    }

    public String getBrokerUrl() {
        return brokerUrl;
    }

    public void setBrokerUrl(String brokerUrl) {
        this.brokerUrl = brokerUrl;
    }

}
