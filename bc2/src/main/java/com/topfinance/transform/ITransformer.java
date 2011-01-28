package com.topfinance.transform;

import java.io.InputStream;

import com.topfinance.transform.simple.SimpleMappingRule;


public interface ITransformer {
	public Object transform(Object src,  SimpleMappingRule rule);
}


