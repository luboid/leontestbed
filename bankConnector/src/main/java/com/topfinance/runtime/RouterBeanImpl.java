package com.topfinance.runtime;

import org.apache.camel.RecipientList;
import org.springframework.stereotype.Service;

@Service(value = "RouterBean")
public class RouterBeanImpl implements RouterBean{
    
    

    public String[] route(String body) {
        // my logic to decide routing
        
        System.out.println("to decide routing dynamically...");
        
        System.out.println("body="+body);
        
        return new String[]{"externalJms:queue:echo"};
        
        
    }
    
}
