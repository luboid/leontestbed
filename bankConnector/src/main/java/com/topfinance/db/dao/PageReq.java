package com.topfinance.db.dao;

import java.io.Serializable;

/**
 * This class is used along with TAS query request to specify the pagenation of
 * the request. It is used usually by WEB.
 */
@SuppressWarnings("serial")
public class PageReq implements Serializable {
	public static final int DEFAULT_PAGE_SIZE = 20;
	public static final int DEFAULT_PAGE_NUM = 1;

	private int pageNumber = 0;

	private int pageSize = 0;

	private boolean autoLast = true;

	/**
	 * Whether to count the number of records or not. Default value is true.
	 */
	private boolean countRec = true; // default

	/**
	 * Constructor.
	 */
	public PageReq() {
		this.pageSize = DEFAULT_PAGE_SIZE;
		this.pageNumber = DEFAULT_PAGE_NUM;
	}

	/**
	 * Constructs a reqeust with specified pageNumber and page size.
	 */
	public PageReq(int pageNumber, int pageSize) {
		this.pageNumber = pageNumber;
		this.pageSize = pageSize;
	}

	/**
	 * Returns page number.
	 */
	public int getPageNumber() {
		return pageNumber;
	}

	/**
	 * Sets requested page number. Page number starts from 0.
	 */
	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	/**
	 * Returns page size.
	 */
	public int getPageSize() {
		return pageSize;
	}

	/**
	 * Sets page size.
	 */
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	/**
	 * Getter for the <b>countRec</b> attribute. If <b>countRec</b> is true,
	 * QueryUtil will count the record count, page count of specified query
	 * criteria before query actual data. If <b>countRec</b> is false,
	 * QueryUtil will simply return the result list.
	 */
	public boolean getCountRec() {
		return countRec;
	}

	/**
	 * Setter for the <b>countRec</b> attribute. If <b>countRec</b> is true,
	 * QueryUtil will count the record count, page count of specified query
	 * criteria before query actual data. If <b>countRec</b> is false,
	 * QueryUtil will simply return the result list. The default value of count
	 * is true. Note. when <b>countRec</b> is set to false, <b>autoLast</b>
	 * attribute will be ignored. QueryUtil won't jump to the last page
	 * automatically when there is no data in specified page.
	 */
	public void setCountRec(boolean countRec) {
		this.countRec = countRec;
	}

	/**
	 * Getter of <b>autoLast</b>
	 */
	public boolean getAutoLast() {
		return autoLast;
	}

	/**
	 * When <b>autoLast</b> is set true, QueryUtil will return the last page of
	 * records, if there is no data the specified page. When it's set to false,
	 * it will simply return an empty list. The default value of <b>autoLast</b>
	 * is true.
	 */
	public void setAutoLast(boolean autoLast) {
		this.autoLast = autoLast;
	}

	public String toString() {
		StringBuffer sb = new StringBuffer("PageReq{").append("pageSize:")
				.append(pageSize).append(", pageNumber:").append(pageNumber)
				.append(", countRec:").append(countRec).append(", autoLast:")
				.append(autoLast).append("}");
		return sb.toString();
	}
}
