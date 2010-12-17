package com.topfinance.cfg.jpa;

import com.topfinance.cfg.ICfgTransportIBMMQ;
import com.topfinance.cfg.meta.ITransportInfoMeta;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Transient;

@SuppressWarnings("serial")
@Entity
@DiscriminatorValue("IBMMQ")

public class JpaCfgTransportIBMMQ extends JpaCfgTransportInfo implements ICfgTransportIBMMQ, ITransportInfoMeta {

    @Transient
    public int getCCSID() {
        return Integer.valueOf(getMap().get(IBMMQ_CCSID));
    }
    public void setCCSID(int ccsid) {
        getMap().put(IBMMQ_CCSID, String.valueOf(ccsid));
    }

    public String getChannel() {
        return getMap().get(IBMMQ_CHANNEL);
    }
    public void setChannel(String channel) {
        getMap().put(IBMMQ_CHANNEL, channel);
    }

    public String getHostName() {
        return getMap().get(IBMMQ_HOSTNAME);
    }
    public void setHostName(String hostName) {
        getMap().put(IBMMQ_HOSTNAME, hostName);
    }

    public int getPort() {
        return Integer.valueOf(getMap().get(IBMMQ_PORT));    
    }
    public void setPort(int port) {
        getMap().put(IBMMQ_PORT, String.valueOf(port));
    }

    public String getQueueManager() {
        return getMap().get(IBMMQ_QUEUE_MANAGER);
    }
    public void setQueueManager(String queueManager) {
        getMap().put(IBMMQ_QUEUE_MANAGER, queueManager);
    }

    public int getTransportType() {
        return Integer.valueOf(getMap().get(IBMMQ_TRANSPORT_TYPE));
    }
    public void setTransportType(int ttype) {
        getMap().put(IBMMQ_TRANSPORT_TYPE, String.valueOf(ttype));
    }

}
