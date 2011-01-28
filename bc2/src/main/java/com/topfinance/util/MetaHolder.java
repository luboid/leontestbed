package com.topfinance.util;

import java.util.ArrayList;
import java.util.List;

public class MetaHolder {
//	String eboPkgName;
//	String eboClassName;
	
	String inputClassName;
	
	List<MetaJaxbElement> metas = new ArrayList<MetaJaxbElement>();




	public String getInputClassName() {
		return inputClassName;
	}

	public void setInputClassName(String inputClassName) {
		this.inputClassName = inputClassName;
	}

	public List<MetaJaxbElement> getMetas() {
		return metas;
	}

	public void setMetas(List<MetaJaxbElement> metas) {
		this.metas = metas;
	}
}
