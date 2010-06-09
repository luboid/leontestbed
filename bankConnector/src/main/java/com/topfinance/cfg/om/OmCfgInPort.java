package com.topfinance.cfg.om;

import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgNode;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.cfg.ICfgTransportInfo;
import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

public class OmCfgInPort extends OmCfgPort implements ICfgInPort {

    @Element(required=false)
    private ICfgProtocol protocol;


    @Element(required=false)
    private ICfgOutPort ackPort;


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

    

}
