package com.topfinance.stubs.external;

import com.topfinance.cfg.dummy.DummyCfgReader;
import org.apache.activemq.camel.component.ActiveMQComponent;
import org.apache.camel.CamelContext;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.impl.DefaultCamelContext;
import org.apache.camel.spring.spi.ApplicationContextRegistry;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class JmsEchoServer {

    /**
     * @param args
     */
    public static void main(String[] args) {
        try {
            
            ClassPathXmlApplicationContext ctx = 
                new ClassPathXmlApplicationContext("com/bc/stubs/external/JmsEchoServer.xml");
            ctx.start();
            
            ActiveMQComponent amqFactory = (ActiveMQComponent)ctx.getBean("jms");
            System.out.println("amqFactory="+amqFactory);
            
            Object echo = ctx.getBean("echo");
            System.out.println("echo="+echo);
            
            CamelContext camel = new DefaultCamelContext();
            ApplicationContextRegistry registory = new ApplicationContextRegistry(ctx);
            ((DefaultCamelContext)camel).setRegistry(registory);
            
            camel.addComponent("xyz", amqFactory);
            
            
            camel.addRoutes(new RouteBuilder() {
                @Override
                public void configure() throws Exception {
                    from("xyz:"+DummyCfgReader.QUEUE_UP_OUT_ECHO).to("bean:echo?method=echo");
                }
            });
            camel.start();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

}
