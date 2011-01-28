package com.topfinance.cfg.xml;

import com.topfinance.cfg.ICfgTransOutAMQ;
import com.topfinance.cfg.meta.ITransportInfoMeta;

public class OmCfgTransOutAMQ extends OmCfgTransOut implements ICfgTransOutAMQ, ITransportInfoMeta{
	
	
    public String getBrokerUrl() {
        return getProviderConfig().get(AMQ_BROKER_URL);
    }

    public void setBrokerUrl(String brokerUrl) {
        getProviderConfig().put(AMQ_BROKER_URL, brokerUrl);
    }

	public long getReqTimeout() {
		// TODO in case it's null
		// or force a default value
		String s = getProviderConfig().get(AMQ_REQ_TIMEOUT);
		return s==null? DEFAULT_AMQ_REQ_TIMEOUT : Long.valueOf(s);
	}
	public void setReqTimeout(long reqTimeout) {
		getProviderConfig().put(AMQ_REQ_TIMEOUT, String.valueOf(reqTimeout));
	}

}
