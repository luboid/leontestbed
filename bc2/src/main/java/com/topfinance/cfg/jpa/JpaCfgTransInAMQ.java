package com.topfinance.cfg.jpa;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Transient;

import com.topfinance.cfg.ICfgTransInAMQ;
import com.topfinance.cfg.meta.ITransportInfoMeta;

@SuppressWarnings("serial")
@Entity
@DiscriminatorValue("AMQ")
public class JpaCfgTransInAMQ extends JpaCfgTransIn implements ICfgTransInAMQ, ITransportInfoMeta {
    
    @Transient
    public String getBrokerUrl() {
        return getMap().get(AMQ_BROKER_URL);
    }
    public void setBrokerUrl(String value) {
        getMap().put(AMQ_BROKER_URL, value);
    }
    
    @Transient
    public int getMaxConsumer() {
		String s = getMap().get(AMQ_MAX_CONSUMER);
		return s==null? DEFAULT_AMQ_MAX_CONSUMER : Integer.valueOf(s);
    }
    public void setMaxConsumer(int maxConsumer) {
    	getMap().put(AMQ_MAX_CONSUMER, String.valueOf(maxConsumer));
    }
}
