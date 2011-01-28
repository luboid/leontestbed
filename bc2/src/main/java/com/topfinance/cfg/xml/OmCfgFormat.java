package com.topfinance.cfg.xml;

import org.simpleframework.xml.Attribute;

import com.topfinance.cfg.ICfgFormat;

public class OmCfgFormat implements ICfgFormat {
	
    @Attribute(required=false)
    private String oid;
    @Attribute(required=false)
    private String name;
    
    @Attribute(required=false)
    private String format;

//    @Attribute(required=false)
//    private String pathOpId;
//    @Attribute(required=false)
//    private String pathOpType;
    
    @Attribute(required=false)
    private String pathOpInfo;
    
    @Attribute(required=false)
    private String pathDocId;
    @Attribute(required=false)
    private String pathOrigDocId;
    
//    @ElementMap(entry="config", key="key", attribute=true, inline=true, required=false)
//    private Map<String, String> config;
    
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

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}



	public String getPathDocId() {
		return pathDocId;
	}

	public void setPathDocId(String pathDocId) {
		this.pathDocId = pathDocId;
	}

	public String getPathOrigDocId() {
		return pathOrigDocId;
	}

	public void setPathOrigDocId(String pathOrigDocId) {
		this.pathOrigDocId = pathOrigDocId;
	}

	public String getPathOpInfo() {
		return pathOpInfo;
	}

	public void setPathOpInfo(String pathOpInfo) {
		this.pathOpInfo = pathOpInfo;
	}


    
}
