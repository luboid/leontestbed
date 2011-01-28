package com.topfinance.cfg.xml;

import com.topfinance.cfg.ICfgTransInIBMMQ;
import com.topfinance.cfg.meta.ITransportInfoMeta;

public class OmCfgTransInIBMMQ extends OmCfgTransIn implements ICfgTransInIBMMQ, ITransportInfoMeta {

    public int getCCSID() {
        return Integer.valueOf(getProviderConfig().get(IBMMQ_CCSID));
    }

    public String getChannel() {
        return getProviderConfig().get(IBMMQ_CHANNEL);
    }

    public String getHostName() {
        return getProviderConfig().get(IBMMQ_HOSTNAME);
    }

    public int getPort() {
        return Integer.valueOf(getProviderConfig().get(IBMMQ_PORT));
    }

    public String getQueueManager() {
        return getProviderConfig().get(IBMMQ_QUEUE_MANAGER);
    }

    public int getTransportType() {
        return Integer.valueOf(getProviderConfig().get(IBMMQ_TRANSPORT_TYPE));
    }

}
