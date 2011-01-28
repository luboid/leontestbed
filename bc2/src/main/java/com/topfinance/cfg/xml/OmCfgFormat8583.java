package com.topfinance.cfg.xml;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import com.topfinance.cfg.ICfgFormat;
import com.topfinance.cfg.ICfgFormat8583;


public class OmCfgFormat8583 implements ICfgFormat8583{

//    public String getPackager() {
//    	return getConfig().get(ISO_PACKAGER);
//    }
//    public void setPackager(String packager) {
//    	getConfig().put(ISO_PACKAGER, packager);
//    }
	@Element(required=true)
	ICfgFormat format;
	
	@Attribute(required=true)
	String type;
	@Attribute(required=true)
	int length;
	@Attribute(required=false)
	String desc;
	
	@Attribute(required=false)
	int pos;
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public ICfgFormat getFormat() {
		return format;
	}
	public void setFormat(ICfgFormat format) {
		this.format = format;
	}
	public int getLength() {
		return length;
	}
	public void setLength(int length) {
		this.length = length;
	}
	public int getPos() {
		return pos;
	}
	public void setPos(int pos) {
		this.pos = pos;
	}

}
