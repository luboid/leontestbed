package com.topfinance.message;

import com.topfinance.cfg.ICfgOperation;
import com.topfinance.runtime.OpInfo;

public interface IMsgPacker {
	// TODO maybe byte[] ? 
	public String convertPack(Object obj, ICfgOperation opn, OpInfo opInfo) throws FatalParseException;
}
