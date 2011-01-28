package com.topfinance.cfg.xml;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import com.topfinance.cfg.ICfgFormat;
import com.topfinance.cfg.ICfgPortIn;
import com.topfinance.cfg.ICfgNode;
import com.topfinance.cfg.ICfgPortOut;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.cfg.ICfgTransIn;

public class OmCfgPortIn implements ICfgPortIn {

    @Attribute(required=false)
    private String oid;
    @Attribute(required=false)
    private String name;
    @Element(required=false)
    private ICfgNode node;
    @Attribute(required=false)
    private String url;
    @Attribute(required=false)
    private String direction;
	
    @Element(required=false)
    private ICfgTransIn transIn;
	
    @Element(required=false)
    private ICfgProtocol protocol;


    @Element(required=false)
    private ICfgPortOut ackPort;

    @Element(required=false)
    private ICfgFormat format;
    
//    @Element(required=false)
//    private ICfgUpInMH upInMH;
//    
//    @Element(required=false)
//    private ICfgDownOutMH syncReplyDownOutMH;
    
    public ICfgProtocol getProtocol() {
        return protocol;
    }

    public void setProtocol(ICfgProtocol protocol) {
        this.protocol = protocol;
    }


    public ICfgPortOut getAckPort() {
        return ackPort;
    }

    public void setAckPort(ICfgPortOut ackPort) {
        this.ackPort = ackPort;
    }

//    public ICfgUpInMH getUpInMH() {
//        return upInMH;
//    }
//
//    public void setUpInMH(ICfgUpInMH upInMH) {
//        this.upInMH = upInMH;
//    }
//
//    public ICfgDownOutMH getSyncReplyDownOutMH() {
//        return syncReplyDownOutMH;
//    }
//
//    public void setSyncReplyDownOutMH(ICfgDownOutMH syncReplyDownOutMH) {
//        this.syncReplyDownOutMH = syncReplyDownOutMH;
//    }

	public String getOid() {
		return oid;
	}

	public void setOid(String oid) {
		this.oid = oid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ICfgNode getNode() {
		return node;
	}

	public void setNode(ICfgNode node) {
		this.node = node;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getDirection() {
		return direction;
	}

	public void setDirection(String direction) {
		this.direction = direction;
	}

	public ICfgTransIn getTransIn() {
		return transIn;
	}

	public void setTransIn(ICfgTransIn transIn) {
		this.transIn = transIn;
	}

	public ICfgFormat getFormat() {
		return format;
	}

	public void setFormat(ICfgFormat format) {
		this.format = format;
	}



    

}
