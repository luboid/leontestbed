/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.topfinance.runtime;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgProtocol;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgTransportInfo;
import com.topfinance.plugin.BasePlugin;
import com.topfinance.plugin.IPlugin;
import com.topfinance.util.BCUtils;

import java.util.List;

import org.apache.camel.CamelContext;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.camel.builder.RouteBuilder;

/**
 * This class defines the routes on the Server. The class extends a base class in Camel {@link RouteBuilder}
 * that can be used to easily setup the routes in the configure() method.
 */
// START SNIPPET: e1
public class ServerRoutes extends RouteBuilder implements CfgConstants{
    
    private CamelContext camel;
    public ServerRoutes(CamelContext camel) {
        this.camel = camel;
    }
    
    @Override
    public void configure() throws Exception {
        // route from the numbers queue to our business that is a spring bean registered with the id=multiplier
        // Camel will introspect the multiplier bean and find the best candidate of the method to invoke.
        // You can add annotations etc to help Camel find the method to invoke.
        // As our multiplier bean only have one method its easy for Camel to find the method to use.
//        from("jms:queue:numbers").to("bean:multiplier");

        // Camel has several ways to configure the same routing, we have defined some of them here below

        // as above but with the bean: prefix
        //from("jms:queue:numbers").to("bean:multiplier");

        // beanRef is using explicity bean bindings to lookup the multiplier bean and invoke the multiply method
        //from("jms:queue:numbers").beanRef("multiplier", "multiply");

        // the same as above but expressed as a URI configuration
        //from("activemq:queue:numbers").to("bean:multiplier?methodName=multiply");
        
        
        
//        from("bcJms:queue:echo").recipientList().method(RouterBeanImpl.class, "route");
        
        
        ICfgReader reader = CfgImplFactory.loadCfgReader();
        
        // 1. load a list of URLs, which are belong to the inbound ports configured.
        List<ICfgInPort> inPorts = reader.getListOfEnabledInport();
        
        // 2. iterate and start listening on each URL, and direct them to next step of RuntimeController.
        for(ICfgInPort inPort : inPorts) {
            String url = BCUtils.getFullUrlFromPort(inPort);
            System.out.println("url="+url);

            // TODO be careful that the processor instance will be shared by multiple threads
            from(url)
                
                .process(new Dispatcher(inPort,camel));
            
//                .recipientList().method(p, "route");            
        }
    }

    class Dispatcher implements Processor {
        public Dispatcher(ICfgInPort inPort, CamelContext camel) {
            this.cfgIP = inPort;
            this.camel = camel;
        }
        private CamelContext camel;
        private ICfgInPort cfgIP;
        public void process(Exchange exchange) throws Exception {
            String direction = cfgIP.getDirection();
            ICfgProtocol protocol = cfgIP.getProtocol();
            String pluginName = protocol.getPluginName();
            BasePlugin plugin = BasePlugin.loadPlugin(pluginName);
             
            AbstractProcessor p = null;
            // now the process instance is not shared
            if(DIRECTION_UP.equals(direction)) {
                UWMessageContext msgContext = plugin.createUWMessageContext(cfgIP, exchange);
                p = plugin.createUpwardProcessor(msgContext, camel);
            } else {
                DWMessageContext msgContext = plugin.createDWMessageContext(cfgIP, exchange);
                p = plugin.createDownwardProcessor(msgContext, camel);
            }
            p.process();
        }
    }

}
// END SNIPPET: e1
