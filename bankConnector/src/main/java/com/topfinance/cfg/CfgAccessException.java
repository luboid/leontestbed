package com.topfinance.cfg;

/**
 * 业务异常基类.
 * 
 * @author mz
 */
@SuppressWarnings("serial")
public class CfgAccessException extends RuntimeException {
	public static final String NO_RIGHTS_TO_ACCESS="no.rights.to.access";
	private String errorCode="";

	public CfgAccessException() {
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public CfgAccessException(String message) {
		super(message);
		this.errorCode=message;
	}

	public CfgAccessException(String message, Throwable cause) {
		super(message, cause);
		this.errorCode=message;		
	}

	public CfgAccessException(Throwable cause) {
		super(cause);
	}
}
