package com.topfinance.cfg.jpa;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Transient;

import com.topfinance.cfg.ICfgTransOutAMQ;
import com.topfinance.cfg.meta.ITransportInfoMeta;

@SuppressWarnings("serial")
@Entity
@DiscriminatorValue("AMQ")
public class JpaCfgTransOutAMQ extends JpaCfgTransOut implements
		ICfgTransOutAMQ, ITransportInfoMeta {

	@Transient
    public String getBrokerUrl() {
        return getMap().get(AMQ_BROKER_URL);
    }

    public void setBrokerUrl(String brokerUrl) {
    	getMap().put(AMQ_BROKER_URL, brokerUrl);
    }

    @Transient
	public long getReqTimeout() {
		// TODO in case it's null
		// or force a default value
		String s = getMap().get(AMQ_REQ_TIMEOUT);
		return s==null? DEFAULT_AMQ_REQ_TIMEOUT : Long.valueOf(s);
//		return Long.valueOf(getMap().get(AMQ_REQ_TIMEOUT));
	}
	public void setReqTimeout(long reqTimeout) {
		getMap().put(AMQ_REQ_TIMEOUT, String.valueOf(reqTimeout));
	}


}
