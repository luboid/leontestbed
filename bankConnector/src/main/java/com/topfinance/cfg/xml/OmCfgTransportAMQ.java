package com.topfinance.cfg.xml;

import com.topfinance.cfg.ICfgTransportAMQ;
import com.topfinance.cfg.meta.ITransportInfoMeta;

public class OmCfgTransportAMQ extends OmCfgTransportInfo implements ICfgTransportAMQ, ITransportInfoMeta {
    
    
//    @Attribute(required=false)
//    private String brokerUrl;
    
//    public ConnectionFactory getConnectionFactory() {
//        ActiveMQConnectionFactory cf = new ActiveMQConnectionFactory();
//        cf.setBrokerURL(getBrokerUrl());
//        return cf;
//    }

    public String getBrokerUrl() {
        return getConfig().get(AMQ_BROKER_URL);
    }

    public void setBrokerUrl(String brokerUrl) {
        getConfig().put(AMQ_BROKER_URL, brokerUrl);
    }

}
