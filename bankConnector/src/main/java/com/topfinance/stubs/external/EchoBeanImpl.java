package com.topfinance.stubs.external;

import org.springframework.stereotype.Service;


@Service(value = "echo")
public class EchoBeanImpl implements EchoBean {
    
    
    public String echo(String in) {
        System.out.println("in echo service: in="+in);
        return "ok! we received: "+in;
    }

}
