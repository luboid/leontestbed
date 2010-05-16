package com.topfinance.cfg;

import javax.jms.ConnectionFactory;

public interface ICfgTransportInfo extends ICfgItem {
    

    
    public String getProvider();
    public void setProvider(String provider);
    
    public String getPrefix();
    public void setPrefix(String prefix);
}
