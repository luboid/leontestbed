package com.topfinance.ebo.msg;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;

public class MyList<E> extends ArrayList<E> {

	private Object parent;
	
	public void debug(String s) {
		System.out.println(s);
	}
	
	@Override
	public boolean add(E arg0) {
		debug("adding="+arg0);
		String s = (String)arg0;

		if(s.contains("/")) {
			String t = StringUtils.substringBetween(s, "/", "/");
			String v = StringUtils.substringAfterLast(s, "/");
			debug("t="+t+", v="+v);
			try {
				BeanUtils.setProperty(parent, t, v);
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return super.add(arg0);
	}


	public Object getParent() {
		return parent;
	}


	public void setParent(Object parent) {
		System.out.println("parent="+parent);
		this.parent = parent;
	}
	
	
}
