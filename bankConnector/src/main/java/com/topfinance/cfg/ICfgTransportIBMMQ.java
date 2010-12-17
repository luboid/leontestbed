package com.topfinance.cfg;

public interface ICfgTransportIBMMQ {
    
    public String getHostName();
    public int getPort();
    public String getQueueManager();
    public String getChannel();
    public int getTransportType();
    public int getCCSID();
    
    
}
