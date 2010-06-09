package com.topfinance.cfg;

public class ConfigAccessException extends RuntimeException {
    public ConfigAccessException() {
        super();
    }
    public ConfigAccessException(Throwable t) {
        super(t);
    }
    public ConfigAccessException(String msg) {
        super(msg);
    }
    public ConfigAccessException(String msg, Throwable t) {
        super(msg, t);
    }
}
