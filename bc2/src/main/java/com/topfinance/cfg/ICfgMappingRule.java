package com.topfinance.cfg;

public interface ICfgMappingRule {

	public String getMesgType();
	public void setMesgType(String mesgType);
	public String getOpType();
	public void setOpType(String opType);
	public String getOpClass();
	public void setOpClass(String opClass);
	public byte[] getMapping();
	public void setMapping(byte[] mapping);
	public String getDirection();
	public void setDirection(String direction);
}
