package com.topfinance.ebo.msg;

import java.util.List;

public class TestNested {
	String name;
	List<Book> books;
	
	MyList<String> ustrds;
	String fld1;
	
	String fld2;
	
	String fldNull;
	
	String a01;
	String b02;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Book> getBooks() {
		return books;
	}
	public void setBooks(List<Book> books) {
		this.books = books;
	}

	public MyList<String> getUstrds() {
		return ustrds;
	}
	public void setUstrds(MyList<String> ustrds) {
		this.ustrds = ustrds;
		ustrds.setParent(this);
	}

	public String getFld1() {
		return fld1;
	}
	public void setFld1(String fld1) {
		System.out.println("setFld1 geting called!!!!!!!!!!!!!!!!!!!!!!!");
		this.fld1 = fld1;
	}

	public String getFld2() {
		return fld2;
	}
	public void setFld2(String fld2) {
		this.fld2 = fld2;
	}
	public String getA01() {
		return a01;
	}
	public void setA01(String a01) {
		this.a01 = a01;
	}
	public String getB02() {
		return b02;
	}
	public void setB02(String b02) {
		this.b02 = b02;
	}
	@Override
	public String toString() {
		return "TestNested [name=" + name + ", books=" + books + ", ustrds="
				+ ustrds + ", fld1=" + fld1 + ", fld2=" + fld2 + ", a01=" + a01
				+ ", b02=" + b02 + "]";
	}
	public String getFldNull() {
		return fldNull;
	}
	public void setFldNull(String fldNull) {
		this.fldNull = fldNull;
	}



	
	
}
