package com.topfinance.util;

public class HiberException extends RuntimeException {
    
    public HiberException(String msg) {
        super(msg);
    }
    public HiberException(String msg, Throwable cause) {
        super(msg, cause);
    }

}
