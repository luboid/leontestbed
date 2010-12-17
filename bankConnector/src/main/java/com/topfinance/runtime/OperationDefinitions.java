package com.topfinance.runtime;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.simpleframework.xml.ElementList;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;
import org.simpleframework.xml.strategy.CycleStrategy;
import org.simpleframework.xml.strategy.Strategy;

public class OperationDefinitions {
    
    @ElementList
    public List<OperationDefinition> list = new ArrayList<OperationDefinition>();
    
    public Map<String, OperationDefinition> maps = new HashMap<String, OperationDefinition>();
    
    static Logger logger = Logger.getLogger(OperationDefinitions.class);
    
    private OperationDefinitions(){
        
    }
    public static OperationDefinitions load(InputStream in) {
        try {
            logger.info("Deserialize configuration from " + "...");
            Strategy strategy = new CycleStrategy("id", "ref");
            Serializer serializer = new Persister(strategy);
            OperationDefinitions dataHolder = serializer.read(OperationDefinitions.class, in);
            dataHolder.init();
            logger.info("Done");
            return dataHolder;
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
    
    private void init() {
        for(OperationDefinition od : list) {
            maps.put(od.getName(), od);
        }
    }
    
    public OperationDefinition getOd(String name) {
        if(maps == null) {
            throw new RuntimeException("not initialized");
        }
        return maps.get(name);
    }

}
