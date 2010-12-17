package com.topfinance.cfg.xml;

import com.topfinance.cfg.ICfgTransportJetty;

import java.util.HashMap;
import java.util.Map;

import org.simpleframework.xml.Attribute;

public class OmCfgTransportJetty extends OmCfgTransportInfo implements ICfgTransportJetty {
    
    // TODO wrapping all configuration into an XML using SimpleXml?? 
    
    // persistent
    @Attribute(required=false)
    private String mapSslSccContent;
    
    @Attribute(required=false)
    private String clientTpcContent;
    
    // transient
    private Map<Integer, SslSocketConnectorConfig> mapSslScc = new HashMap<Integer, SslSocketConnectorConfig>(); 
    private HttpClientThreadPoolConfig clientTpc;
    
    public static class SslSocketConnectorConfig {
        
    }
    
    public static class HttpClientThreadPoolConfig {
        
    }
    
    public Map<Integer, SslSocketConnectorConfig> getMapSslScc() {
        return mapSslScc;
    }
    
    public void addSslScc(Integer port, SslSocketConnectorConfig sslScc) {
        mapSslScc.put(port, sslScc);
    }
    
    public HttpClientThreadPoolConfig getClientTpc() {
        return clientTpc;
    }
    public void setClientTpc(HttpClientThreadPoolConfig clientTpc) {
        this.clientTpc = clientTpc;
    }

    public String getMapSslSccContent() {
        return mapSslSccContent;
    }

    public void setMapSslSccContent(String mapSslSccContent) {
        this.mapSslSccContent = mapSslSccContent;
    }

    public String getClientTpcContent() {
        return clientTpcContent;
    }

    public void setClientTpcContent(String clientTpcContent) {
        this.clientTpcContent = clientTpcContent;
    }
    
    
    
    
}
