package com.topfinance.cfg.jpa;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Transient;

import com.topfinance.cfg.ICfgTransportAMQ;
import com.topfinance.cfg.meta.ITransportInfoMeta;

@SuppressWarnings("serial")
@Entity
@DiscriminatorValue("AMQ")
public class JpaCfgTransportAMQ extends JpaCfgTransportInfo implements ICfgTransportAMQ, ITransportInfoMeta {
    
    @Transient
    public String getBrokerUrl() {
        return getMap().get(AMQ_BROKER_URL);
    }
    public String setBrokerUrl(String value) {
        return getMap().put(AMQ_BROKER_URL, value);
    }
}
