package com.topfinance.cfg.xml;

import com.topfinance.cfg.ICfgTransportIBMMQ;
import com.topfinance.cfg.meta.ITransportInfoMeta;

public class OmCfgTransportIBMMQ extends OmCfgTransportInfo implements ICfgTransportIBMMQ, ITransportInfoMeta {

    public int getCCSID() {
        return Integer.valueOf(getConfig().get(IBMMQ_CCSID));
    }

    public String getChannel() {
        return getConfig().get(IBMMQ_CHANNEL);
    }

    public String getHostName() {
        return getConfig().get(IBMMQ_HOSTNAME);
    }

    public int getPort() {
        return Integer.valueOf(getConfig().get(IBMMQ_PORT));
    }

    public String getQueueManager() {
        return getConfig().get(IBMMQ_QUEUE_MANAGER);
    }

    public int getTransportType() {
        return Integer.valueOf(getConfig().get(IBMMQ_TRANSPORT_TYPE));
    }

}
