package com.topfinance.cfg;

public interface ICfgProtocol extends ICfgItem{
    
    public String getPluginName();
    public void setPluginName(String pluginName);
    
    public String getUpSendAckToPP();
    public void setUpSendAckToPP(String upSendAckToPP);
    public String getDownRecievePPAck();
    public void setDownRecievePPAck(String downRecievePPAck);
    
}
