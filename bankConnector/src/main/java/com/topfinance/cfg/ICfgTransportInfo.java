package com.topfinance.cfg;

import java.util.Map;


public interface ICfgTransportInfo extends ICfgItem {
    
    
    
    public String getProvider();
    public void setProvider(String provider);
    
    public String getPrefix();
    public void setPrefix(String prefix);
}
