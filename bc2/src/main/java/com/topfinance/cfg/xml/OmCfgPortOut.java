package com.topfinance.cfg.xml;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import com.topfinance.cfg.ICfgFormat;
import com.topfinance.cfg.ICfgNode;
import com.topfinance.cfg.ICfgPortOut;
import com.topfinance.cfg.ICfgTransOut;

public class OmCfgPortOut implements ICfgPortOut{

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
    private ICfgTransOut transOut;
    
    @Element(required=false)
    private ICfgFormat format;
    
//    @Element(required=false)
//    private ICfgDownOutMH downOutMH;



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

	public ICfgTransOut getTransOut() {
		return transOut;
	}

	public void setTransOut(ICfgTransOut transOut) {
		this.transOut = transOut;
	}

	public ICfgFormat getFormat() {
		return format;
	}

	public void setFormat(ICfgFormat format) {
		this.format = format;
	}



    
    
}
