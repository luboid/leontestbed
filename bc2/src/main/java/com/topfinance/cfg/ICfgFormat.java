package com.topfinance.cfg;

public interface ICfgFormat extends ICfgItem {
	public String getFormat();
	public void setFormat(String format);
	
	public String getPathOpInfo();
	public void setPathOpInfo(String pathOpInfo);
//	public String getPathOpType();
//	public void setPathOpType(String pathOpType);
	public String getPathDocId();
	public void setPathDocId(String pathDocId);
	public String getPathOrigDocId();
	public void setPathOrigDocId(String pathOrigDocId);
	
}
