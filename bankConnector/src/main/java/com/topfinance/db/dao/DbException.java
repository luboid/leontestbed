package com.topfinance.db.dao;

/**
 * 业务异常基类.
 * 
 * @author mz
 */
@SuppressWarnings("serial")
public class DbException extends Exception {
	public static final String NO_RIGHTS_TO_ACCESS="no.rights.to.access";
	private String errorCode="";

	public DbException() {
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public DbException(String message) {
		super(message);
		this.errorCode=message;
	}

	public DbException(String message, Throwable cause) {
		super(message, cause);
		this.errorCode=message;		
	}

	public DbException(Throwable cause) {
		super(cause);
	}
}
