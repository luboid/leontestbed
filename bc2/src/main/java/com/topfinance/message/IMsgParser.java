package com.topfinance.message;

import com.topfinance.cfg.ICfgFormat;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.runtime.OpInfo;


public interface IMsgParser {
	
	// TODO maybe byte[] ? 
	public Object parseConvert(String msg, ICfgFormat format, ICfgProtocol protocol) throws FatalParseException;
	
	
	public String getDocId();
	public OpInfo getOpInfo();
	public String getOrigDocId();
}


