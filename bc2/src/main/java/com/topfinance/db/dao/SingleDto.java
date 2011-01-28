package com.topfinance.db.dao;

import java.io.Serializable;

public class SingleDto implements Serializable {
	private String name;

	public SingleDto(String name) {
		super();
		this.name = name;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
