package com.topfinance.message;

public class FatalParseException extends Exception {
    public FatalParseException() {
        super();
    }
    public FatalParseException(String msg) {
        super(msg);
    }
    public FatalParseException(Throwable throwable) {
        super(throwable);
    }
}
