package test;

import junit.framework.TestCase;

import org.apache.camel.CamelContext;
import org.apache.camel.Endpoint;
import org.apache.camel.Exchange;
import org.apache.camel.ExchangePattern;
import org.apache.camel.Processor;
import org.apache.camel.Producer;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.jms.JmsComponent;
import org.apache.camel.component.jms.JmsConfiguration;
import org.apache.camel.impl.DefaultCamelContext;
import org.springframework.jms.connection.CachingConnectionFactory;

import com.ibm.mq.jms.MQQueueConnectionFactory;


public class TestJmsComponent extends TestCase {
    
    String imqAddresses = "192.168.67.21:7676";
    String imqDefaultUsername = "admin";
    String imqDefaultPassword = "admin";    
    
    static final String PREFIX = "ibmmq";
    static final String url = "ibmmq:public_qAIn";
    
    public void testSend() {
        try {
            log("prepare to send....");
            
            
            CamelContext camel = new DefaultCamelContext();         
            initCamel(camel);
            
            Endpoint endpoint = camel.getEndpoint(url);

            String requestText = "requestxxxxx";

            Exchange exchange = endpoint.createExchange(ExchangePattern.InOut);
            exchange.getIn().setBody(requestText);

            Producer producer = endpoint.createProducer();
            // start the producer so it can operate
            producer.start();

            producer.process(exchange);
            
            log("received response: "+exchange.getOut().getBody(String.class));
            
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    private void initCamel(CamelContext camel) throws Exception {
        // sun openmq
//        com.sun.messaging.ConnectionFactory factory = new com.sun.messaging.ConnectionFactory();
//        factory.setProperty(ConnectionConfiguration.imqAddressList,
//                        this.imqAddresses);
//        factory.setProperty(ConnectionConfiguration.imqDefaultUsername,
//                        this.imqDefaultUsername);
//        factory.setProperty(ConnectionConfiguration.imqDefaultPassword,
//                        this.imqDefaultPassword);
        
        // ibm mq
        MQQueueConnectionFactory factory = new MQQueueConnectionFactory(); 
        factory.setHostName("192.168.68.173"); 
        factory.setPort(1414); 
//        factory.setQueueManager("queueManager"); 
        factory.setQueueManager("QM_liyong_dt");
        factory.setChannel("S_liyong_dt"); 
        factory.setTransportType(1);
        //Where some_ccsid_int is a Character Code Set identifier. It depends on the system as to what code sets are supported. 819, 1200 and 1208 are good ones to try.
        factory.setCCSID(1381);
        
        
        CachingConnectionFactory cf = new CachingConnectionFactory(factory);
        
        JmsConfiguration jc = new JmsConfiguration(cf);
        JmsComponent ibmmq = new JmsComponent(jc);
               
        camel.addComponent(PREFIX, ibmmq); 
    }
    public void testReceive() {
        try {
            log("ready to receive....");
            
            CamelContext camel = new DefaultCamelContext();         
            initCamel(camel);

            camel.addRoutes( new RouteBuilder(){
                public void configure() { 
                    System.out.println("here??");
                    try {
                        from(url).bean(new Processor(){
                            public void process(Exchange src) throws Exception {
                                String msg = src.getIn().getBody(String.class);
                                System.out.println("received msg!!: "+msg);
                                log("sending response: ");
                                src.getOut().setBody("we have got msg!!");
                                
                            }
                        });
                    } catch (Exception ex) {
                        ex.printStackTrace();
                    }
                 } 
            }); 
            camel.start();
            log("the end");
        } catch (Exception ex) {
            ex.printStackTrace();
        }        
    }
    
    private static void log(String s) {
        System.out.println(s);
    }
    
    public static void main(String[] args) {
        new TestJmsComponent().testReceive();
        
    }
}
