package com.topfinance.cfg.meta;

public interface ITransportInfoMeta {
    // for both
    public static final String AMQ_BROKER_URL = "brokerUrl";
    // for in
    public static final String AMQ_MAX_CONSUMER = "maxConsumer";
    public int DEFAULT_AMQ_MAX_CONSUMER = 5;
    
    // for out
    public static final String AMQ_REQ_TIMEOUT = "reqTimeout";
    public long DEFAULT_AMQ_REQ_TIMEOUT = 3000;
    
    public static final String IBMMQ_HOSTNAME = "hostName";
    public static final String IBMMQ_PORT = "port";
    public static final String IBMMQ_QUEUE_MANAGER = "queueManager";
    public static final String IBMMQ_CHANNEL = "channel";
    public static final String IBMMQ_TRANSPORT_TYPE = "transportType";
    public static final String IBMMQ_CCSID = "ccsid";
    
    // for in
    
    // for out
    public static final String ISO8583_TIMEOUT = "timeout";
    
}
