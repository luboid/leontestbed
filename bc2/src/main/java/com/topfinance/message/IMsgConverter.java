package com.topfinance.message;

import java.io.InputStream;

public interface IMsgConverter {
	
	
	
	public void setMapping(InputStream mapping);
	
	public Object convert(Object src);
}
