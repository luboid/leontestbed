package com.topfinance.stubs.internal;

import com.topfinance.cfg.dummy.DummyCfgReader;
import org.apache.camel.CamelContext;
import org.apache.camel.Endpoint;
import org.apache.camel.Exchange;
import org.apache.camel.ExchangePattern;
import org.apache.camel.Producer;
import org.apache.camel.component.http.HttpComponent;
import org.apache.camel.impl.DefaultCamelContext;

public class HttpClientMain {

    /**
     * @param args
     */
    public static void main(String[] args) throws Exception{
        System.out.println("This client connect to HttpServer on "+DummyCfgReader.HTTPURL_UP_IN_ECHO);

        CamelContext camel = new DefaultCamelContext();

        String httpScheme = "xxx";
        HttpComponent httpFactory = new HttpComponent();
        camel.addComponent(httpScheme, httpFactory);
        
        // get the endpoint from the camel context
        Endpoint endpoint = camel.getEndpoint(httpScheme+":"+DummyCfgReader.HTTPURL_UP_IN_ECHO);

        // create the exchange used for the communication
        // we use the in out pattern for a synchronized exchange where we expect a response
        Exchange exchange = endpoint.createExchange(ExchangePattern.InOut);
        // set the input on the in body
        // must you correct type to match the expected type of an Integer object
        exchange.getIn().setBody(33);

        // to send the exchange we need an producer to do it for us
        Producer producer = endpoint.createProducer();
        // start the producer so it can operate
        producer.start();
        
//        Consumer consumer = endpoint.createConsumer(null);
//        consumer.start();

        // let the producer process the exchange where it does all the work in this oneline of code
        System.out.println("Invoking the echo with 33");
        producer.process(exchange);

        // get the response from the out body and cast it to an integer
        String response = exchange.getOut().getBody(String.class);
        System.out.println("... the result is: " + response);

        // stop and exit the client
        producer.stop();
        System.exit(0);
    }

}
