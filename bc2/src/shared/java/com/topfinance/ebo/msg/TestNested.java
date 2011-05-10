package com.topfinance.ebo.msg;

import java.util.List;

public class TestNested {
	String name;
	List<Book> books;

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

	@Override
	public String toString() {
		return "TestNested [name=" + name + ", books=" + books + "]";
	}

}
