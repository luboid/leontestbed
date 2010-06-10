package com.topfinance.runtime;

import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgTransportInfo;
import com.topfinance.util.BCUtils;

import java.util.List;

import org.apache.camel.CamelContext;
import org.apache.camel.impl.DefaultCamelContext;
import org.apache.camel.spring.spi.ApplicationContextRegistry;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.PosixParser;
import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

public class Main {
    private static Logger logger = Logger.getLogger(Main.class);
    
    public static void log(String msg) {
        logger.debug(msg);
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
            options.addOption("cfgType", true, "configuration type");
            options.addOption("cfg", true, "configuration info");
            
            CommandLineParser parser = new PosixParser();
            CommandLine cmd = parser.parse( options, args);
            String spring = null, cfg=null, cfgType=null;
            if( cmd.hasOption( "spring" ) ) {
                spring = cmd.getOptionValue( "spring" );
            }
            if(cmd.hasOption("cfg")) {
                cfg = cmd.getOptionValue("cfg");
            }
            if(cmd.hasOption("cfgType")) {
                cfgType = cmd.getOptionValue("cfgType");
                if(!CfgImplFactory.getSupportedTypes().contains(cfgType)) {
                    throw new RuntimeException("cfgType ["+cfgType+"] not supported");
                }
            }            
            logger.info("spring="+spring +", cfgType="+cfgType+", cfg="+cfg);
            ctx = new FileSystemXmlApplicationContext(spring);

            CamelContext camel = new DefaultCamelContext();
            ApplicationContextRegistry registory = new ApplicationContextRegistry(ctx);
            ((DefaultCamelContext)camel).setRegistry(registory);
            
            CfgImplFactory.setType(cfgType);
            CfgImplFactory.setConfig(cfg);
            ICfgReader reader = CfgImplFactory.loadCfgReader();
            
            // init Camel Components
            // each component owns a set of settings shared by all bound inPorts or outPorts

            List<ICfgTransportInfo> listTi = reader.getListOfTransportInfo();
            for(ICfgTransportInfo ti : listTi) {
                BCUtils.initCamelComponent(camel, ti);
            }
            
            ServerRoutes.init(camel);
            ServerRoutes routes = ServerRoutes.getInstance();
            camel.addRoutes(routes);
            camel.start();
            
            
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

}
