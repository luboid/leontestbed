package com.topfinance.runtime;

public interface BcConstants {

    public static final String INTER_COMM_PREFIX = "interQueue";
    public static final String INTER_COMM_ALERT_RESEND = INTER_COMM_PREFIX+":queue:resend";
    public static final String INTER_COMM_ALERT_HIBER = INTER_COMM_PREFIX+":queue:hiber";
    
    public static final String STATE_RECEIVED_REQ = "RECEIVED_MSG";
    public static final String STATE_PARSE_VALIDATION = "PARSE_AND_VALIDATION";
    public static final String STATE_SEND_ACK = "SEND_ACK";
    public static final String STATE_INITIALISE_CONTEXT = "INITIALISE_CONTEXT";
    public static final String STATE_PKG_OUT_MSG = "PKG_OUT_MSG";
    public static final String STATE_SEND_OUT_MSG = "SENDING_OUT_MSG";
    public static final String STATE_SENT_OUT_MSG = "SENT_OUT_MSG";
    public static final String STATE_RECEIVED_RESP = "RECEIVED_RESPONSE";
    
    public static final String STATUS_PENDING = "PENDING";
    public static final String STATUS_COMPLETED = "COMPLETED";
    public static final String STATUS_ERROR = "ERROR";
    
    public static final Long EXPIRY_RESEND = 1000l*60*3;
    public static final Long EXPIRY_HIBER = 1000l*60*3;

    public static final Long INTERVAL_POLLER = 1000l*30;
    
    public static final String MSG_PP_ERROR = "ERROR!!"; 
    
}
