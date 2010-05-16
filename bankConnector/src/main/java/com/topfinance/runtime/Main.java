package com.topfinance.runtime;

import com.topfinance.cfg.CfgConstants;
import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgTransportInfo;
import com.topfinance.cfg.om.OmCfgAMQInfo;
import com.topfinance.cfg.om.OmCfgJettyInfo;

import java.util.List;

import org.apache.activemq.camel.component.ActiveMQComponent;
import org.apache.camel.CamelContext;
import org.apache.camel.component.jetty.JettyHttpComponent;
import org.apache.camel.impl.DefaultCamelContext;
import org.apache.camel.spring.spi.ApplicationContextRegistry;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.PosixParser;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

public class Main {
    
    public static void log(String msg) {
        System.out.println(msg);
    }
    private static ApplicationContext ctx;
    
    public static Object getBean(String name){
        return ctx.getBean(name);
    }
    
    /**
     * @param args
     */
    public static void main(String[] args) {
        try {
            Options options = new Options();
            options.addOption("spring", true, "spring configuration file");
            options.addOption("cfg", true, "configuration file");
            
            CommandLineParser parser = new PosixParser();
            CommandLine cmd = parser.parse( options, args);
            String spring = null, cfg=null;
            if( cmd.hasOption( "spring" ) ) {
                spring = cmd.getOptionValue( "spring" );
            }
            if(cmd.hasOption("cfg")) {
                cfg = cmd.getOptionValue("cfg");
            }
            log("spring="+spring +", cfg="+cfg);
            ctx = new FileSystemXmlApplicationContext(spring);
            // load configurations
            CfgImplFactory.init(cfg);

//            if(true) {
//                log("Done");
//                return;
//            }
            
            CamelContext camel = new DefaultCamelContext();
            ApplicationContextRegistry registory = new ApplicationContextRegistry(ctx);
            ((DefaultCamelContext)camel).setRegistry(registory);
            
            
            
            ICfgReader reader = CfgImplFactory.loadCfgReader();
            
            // init Camel Components
            // each component owns a set of settings shared by all bound inPorts or outPorts

            List<ICfgTransportInfo> listTi = reader.getListOfTransportInfo();
            for(ICfgTransportInfo ti : listTi) {
                String provider = ti.getProvider();
                if(CfgConstants.JMS_PROVIDER_AMQ.equals(provider)) {
                    ActiveMQComponent amq = new ActiveMQComponent();
                    // ?? won't work unless define as normal JMSComponent
//                    amq.setConnectionFactory(jmsInfo.getConnectionFactory());
                    OmCfgAMQInfo amqji = (OmCfgAMQInfo)ti;
                    amq.setBrokerURL(amqji.getBrokerUrl());
                    camel.addComponent(ti.getPrefix(), amq);
                    log("adding component: "+ti.getPrefix()+", brokerUrl="+amqji.getBrokerUrl());
                }
                else if(CfgConstants.HTTP_PROVIDER_JETTY.equals(provider)) {
                    JettyHttpComponent jetty = new JettyHttpComponent();
                    OmCfgJettyInfo jettyti = (OmCfgJettyInfo)ti;
                    // TODO setting up JettyHttpComponent with jettyti
                    camel.addComponent(ti.getPrefix(), jetty);
                    log("adding component: "+ti.getPrefix());
                }
            }
            
            ServerRoutes routes = new ServerRoutes(camel);
            camel.addRoutes(routes);
            camel.start();
            
            
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

}
