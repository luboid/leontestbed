package com.topfinance.cfg.jpa;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Transient;

import com.topfinance.cfg.ICfgTransInIBMMQ;
import com.topfinance.cfg.meta.ITransportInfoMeta;

@SuppressWarnings("serial")
@Entity
@DiscriminatorValue("IBMMQ")

public class JpaCfgTransInIBMMQ extends JpaCfgTransIn implements ICfgTransInIBMMQ, ITransportInfoMeta {

    @Transient
    public int getCCSID() {
        return Integer.valueOf(getMap().get(IBMMQ_CCSID));
    }
    public void setCCSID(int ccsid) {
        getMap().put(IBMMQ_CCSID, String.valueOf(ccsid));
    }
    
    @Transient
    public String getChannel() {
        return getMap().get(IBMMQ_CHANNEL);
    }
    public void setChannel(String channel) {
        getMap().put(IBMMQ_CHANNEL, channel);
    }

    @Transient
    public String getHostName() {
        return getMap().get(IBMMQ_HOSTNAME);
    }
    public void setHostName(String hostName) {
        getMap().put(IBMMQ_HOSTNAME, hostName);
    }

    @Transient
    public int getPort() {
        return Integer.valueOf(getMap().get(IBMMQ_PORT));    
    }
    public void setPort(int port) {
        getMap().put(IBMMQ_PORT, String.valueOf(port));
    }

    @Transient
    public String getQueueManager() {
        return getMap().get(IBMMQ_QUEUE_MANAGER);
    }
    public void setQueueManager(String queueManager) {
        getMap().put(IBMMQ_QUEUE_MANAGER, queueManager);
    }

    @Transient
    public int getTransportType() {
        return Integer.valueOf(getMap().get(IBMMQ_TRANSPORT_TYPE));
    }
    public void setTransportType(int ttype) {
        getMap().put(IBMMQ_TRANSPORT_TYPE, String.valueOf(ttype));
    }

}
