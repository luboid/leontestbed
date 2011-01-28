package com.topfinance.cfg.xml;

import com.topfinance.cfg.ICfgTransInAMQ;
import com.topfinance.cfg.meta.ITransportInfoMeta;

public class OmCfgTransInAMQ extends OmCfgTransIn implements ICfgTransInAMQ, ITransportInfoMeta {
    
    
//    @Attribute(required=false)
//    private String brokerUrl;
    
//    public ConnectionFactory getConnectionFactory() {
//        ActiveMQConnectionFactory cf = new ActiveMQConnectionFactory();
//        cf.setBrokerURL(getBrokerUrl());
//        return cf;
//    }

    public String getBrokerUrl() {
        return getProviderConfig().get(AMQ_BROKER_URL);
    }

    public void setBrokerUrl(String brokerUrl) {
        getProviderConfig().put(AMQ_BROKER_URL, brokerUrl);
    }

    public int getMaxConsumer() {
		String s = getProviderConfig().get(AMQ_MAX_CONSUMER);
		return s==null? DEFAULT_AMQ_MAX_CONSUMER : Integer.valueOf(s);
//    	return Integer.valueOf(getProviderConfig().get(AMQ_MAX_CONSUMER));
    }
    public void setMaxConsumer(int maxConsumer) {
    	getProviderConfig().put(AMQ_MAX_CONSUMER, String.valueOf(maxConsumer));
    }
}
