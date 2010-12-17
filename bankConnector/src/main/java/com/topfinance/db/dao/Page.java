package com.topfinance.db.dao;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * This class is used to return a Page of records from query requests
 */
@SuppressWarnings("serial")
public class Page implements Serializable {

	private int pageNumber = 0;

	private int pageSize = 0;

	private int totalPages = 0;

	private int totalRecs = 0;

	private List list = new ArrayList();

	/**
	 * Constructor
	 */
	public Page() {
	}

	public Page(List listData,int iPage,int ipageSize){
		if (iPage<=0) iPage = 1;
		
		pageNumber = iPage;
		
		pageSize = ipageSize;
		
		totalRecs = listData.size();
		
		totalPages = totalRecs / pageSize;
		if (totalRecs > totalPages * pageSize) {
			totalPages = totalPages + 1;
		}
		
		if(pageNumber > totalPages) pageNumber = pageNumber;
		if(pageNumber>0)
		{
			int fromIndex = (pageNumber-1) * pageSize;//起始位置
			if(fromIndex>listData.size()) fromIndex = listData.size();
			
			int toIndex = fromIndex + pageSize;//终止位置
			if (toIndex>listData.size()) toIndex = listData.size();
			
			list = listData.subList(fromIndex,toIndex);//取一页数据
		}
		
	
	}

	/**
	 * Returns page number. Page number starting from 1
	 */
	public int getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	/**
	 * Returns number of records in a page.
	 */
	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	/**
	 * Returns the total number of pages of the query results.
	 */
	public int getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	/**
	 * Returns the total number of records of the query results.
	 */
	public int getTotalRecs() {
		return totalRecs;
	}

	public void setTotalRecs(int totalRecs) {
		this.totalRecs = totalRecs;
	}

	/**
	 * Returns the list of records of the current page.
	 */
	public List getList() {
		return list;
	}

	public void setList(List list) {
		this.list = list;
	}

	public String toString() {
		StringBuffer sb = new StringBuffer("Page{").append("pageSize:").append(
				pageSize).append(", pageNumber:").append(pageNumber).append(
				", totalPages:").append(totalPages).append(", totalRecs:")
				.append(totalRecs).append(", list:").append(list).append("}");
		return sb.toString();
	}
}