package com.topfinance.util;

import java.util.ArrayList;
import java.util.List;

public class MetaJaxbElement {
//	String path;
//	String eboPkgName;
//	String eboClassName;
	String beanClass;
	String beanId;
	List<Value> values = new ArrayList<Value>();
	List<Wiring> wirings = new ArrayList<Wiring>();
	
	
	@Override
	public String toString() {
		StringBuffer buf = new StringBuffer();
		buf.append("MetaJaxbElement [" 
//				+ "path=" + path 
//				+ ", eboPkgName=" + eboPkgName
//				+ ", eboClassName=" + eboClassName 
				+ ", jaxbClassName="
				+ beanClass + ", beanId=" + beanId);
		buf.append(", values={ ");
		for(Value v : values) {
			buf.append("{ ").append(v).append(" }");
		}
		buf.append("} wirings = {");
		for(Wiring w : wirings) {
			buf.append(" { ").append(w).append("}");
		}
		buf.append("} ");

		return buf.toString();
	}


	

	public String getBeanClass() {
		return beanClass;
	}
	public void setBeanClass(String beanClass) {
		this.beanClass = beanClass;
	}
	public String getBeanId() {
		return beanId;
	}
	public void setBeanId(String beanId) {
		this.beanId = beanId;
	}
	public List<Value> getValues() {
		return values;
	}
	public void setValues(List<Value> values) {
		this.values = values;
	}
	public List<Wiring> getWirings() {
		return wirings;
	}
	public void setWirings(List<Wiring> wirings) {
		this.wirings = wirings;
	}
	public static class Value {
		String data;
		String property;
		String decoder;
		
		public String getData() {
			return data;
		}
		public void setData(String data) {
			this.data = data;
		}
		public String getProperty() {
			return property;
		}
		public void setProperty(String property) {
			this.property = property;
		}

		public String getDecoder() {
			return decoder;
		}
		public void setDecoder(String decoder) {
			this.decoder = decoder;
		}
		@Override
		public String toString() {
			return "Value [data=" + data + ", property=" + property
					+ ", decoder=" + decoder + "]";
		}
		
		
	}
	public static class Wiring {
		String beanIdRef;
		String property;
		public String getBeanIdRef() {
			return beanIdRef;
		}
		public void setBeanIdRef(String beanIdRef) {
			this.beanIdRef = beanIdRef;
		}
		public String getProperty() {
			return property;
		}
		public void setProperty(String property) {
			this.property = property;
		}
		@Override
		public String toString() {
			return "Wiring [beanIdRef=" + beanIdRef + ", property=" + property
					+ "]";
		}
		
	}
}
