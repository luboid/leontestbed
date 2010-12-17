package com.topfinance.cfg.jpa;

import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgUpInMH;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@SuppressWarnings("serial")
@Entity
@DiscriminatorValue("IN")
public class JpaCfgInPort extends JpaCfgPort implements ICfgInPort {
    
    private JpaCfgProtocol protocol;
    
    private JpaCfgOutPort ackPort;
    private JpaCfgUpInMH upInMH;
    private JpaCfgDownOutMH syncReplyDownOutMH;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "PROT_ID")
    public JpaCfgProtocol getProtocol() {
        return protocol;
    }

    public void setProtocol(JpaCfgProtocol cfgProtocol) {
        this.protocol = cfgProtocol;
    }
    
    @ManyToOne(fetch = FetchType.EAGER, optional=true)
    @JoinColumn(name = "ACK_PORT_ID")
    public JpaCfgOutPort getAckPort() {
        return ackPort;
    }

    public void setAckPort(JpaCfgOutPort ackPort) {
        this.ackPort = ackPort;
    }
    
    @ManyToOne(fetch = FetchType.EAGER, optional=true)
    @JoinColumn(name = "SYNCREPLY_MH_ID")
    public JpaCfgDownOutMH getSyncReplyDownOutMH() {
        return syncReplyDownOutMH;
    }
    

    public void setSyncReplyDownOutMH(JpaCfgDownOutMH syncReplyDownOutMH) {
        this.syncReplyDownOutMH = syncReplyDownOutMH;
    }
    
    @ManyToOne(fetch = FetchType.EAGER, optional=true)
    @JoinColumn(name = "UPIN_MH_ID")
    public JpaCfgUpInMH getUpInMH() {
        return upInMH;
    }

    public void setUpInMH(JpaCfgUpInMH upInMH) {
        this.upInMH = upInMH;
    }
    
    
    
}
