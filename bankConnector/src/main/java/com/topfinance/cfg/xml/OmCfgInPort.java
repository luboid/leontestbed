package com.topfinance.cfg.xml;

import com.topfinance.cfg.ICfgDownOutMH;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.cfg.ICfgUpInMH;
import org.simpleframework.xml.Element;

public class OmCfgInPort extends OmCfgPort implements ICfgInPort {

    @Element(required=false)
    private ICfgProtocol protocol;


    @Element(required=false)
    private ICfgOutPort ackPort;

    @Element(required=false)
    private ICfgUpInMH upInMH;
    
    @Element(required=false)
    private ICfgDownOutMH syncReplyDownOutMH;
    
    public ICfgProtocol getProtocol() {
        return protocol;
    }

    public void setProtocol(ICfgProtocol protocol) {
        this.protocol = protocol;
    }


    public ICfgOutPort getAckPort() {
        return ackPort;
    }

    public void setAckPort(ICfgOutPort ackPort) {
        this.ackPort = ackPort;
    }

    public ICfgUpInMH getUpInMH() {
        return upInMH;
    }

    public void setUpInMH(ICfgUpInMH upInMH) {
        this.upInMH = upInMH;
    }

    public ICfgDownOutMH getSyncReplyDownOutMH() {
        return syncReplyDownOutMH;
    }

    public void setSyncReplyDownOutMH(ICfgDownOutMH syncReplyDownOutMH) {
        this.syncReplyDownOutMH = syncReplyDownOutMH;
    }



    

}
