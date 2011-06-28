echo off

rem IMPORTANT
rem may need put %INSTALL_HOME%\lib\jaxb-api-2.1.jar to JRE/lib/endorsed folder, in order to override JDK's default JAXB lib


rem THESE VALUES ARE TO BE CHANGED

set JAVA_HOME=D:\Program Files\Java\jdk1.6.0_17
set INSTALL_HOME=D:\bankConnector\source

set CONFIG_HOME=%INSTALL_HOME%
rem NOTE!! this is for test only. comment when use in production
rem set CONFIG_HOME=%INSTALL_HOME%\generated_test



rem DO NOT CHANGE THE VALUES BELOW

rem set CFGTYPE=DB
set CFGTYPE=FILE
set LOG_HOME=%INSTALL_HOME%\logs

set CLASSPATH=.;%INSTALL_HOME%\target\bc.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\mysql-connector-java-3.1.12-bin.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\commons-cli-1.2.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\simple-xml-2.3.3.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\activation-1.1.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\activeio-core-3.1.2.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\activemq-camel-5.3.0.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\activemq-core-5.3.0.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\activemq-pool-5.3.0.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\activemq-protobuf-1.0.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\aopalliance-1.0.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\asm-3.1.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\aspectjrt-1.6.2.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\aspectjweaver-1.6.2.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\cglib-nodep-2.1_3.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\commons-logging-1.1.1.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\commons-logging-api-1.1.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\commons-management-1.0.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\commons-net-2.0.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\commons-pool-1.5.4.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\geronimo-j2ee-management_1.0_spec-1.1.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\geronimo-j2ee-management_1.1_spec-1.0.1.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\geronimo-jms_1.1_spec-1.1.1.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\geronimo-jta_1.0.1B_spec-1.0.1.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\groovy-all-1.7.0.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jackson-asl-0.9.4.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jaxb-api-2.1.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jaxb-impl-2.1.12.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jdom-1.0.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jersey-atom-1.1.1-ea.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jersey-core-1.1.1-ea.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jersey-json-1.1.1-ea.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jersey-server-1.1.1-ea.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jersey-spring-1.1.1-ea.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jettison-1.2.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jline-0.9.94.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jruby-1.4.0.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jsr311-api-1.1.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jstl-1.1.2.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\junit-4.4.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\kahadb-5.3.0.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\log4j-1.2.14.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\rome-0.9.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\sitemesh-2.3.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\slf4j-api-1.5.10.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\slf4j-log4j12-1.5.10.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\spring-2.5.6.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\spring-aop-2.5.6.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\spring-beans-2.5.6.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\spring-context-2.5.6.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\spring-context-support-2.5.6.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\spring-core-2.5.6.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\spring-jms-2.5.6.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\spring-tx-2.5.6.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\spring-web-2.5.6.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\standard-1.1.2.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\stax-api-1.0-2.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\stax-api-1.0.1.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\xbean-spring-3.5.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\commons-collections-3.2.1.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\commons-dbcp.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\commons-io-1.4.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\commons-lang-2.4.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\commons-httpclient-3.1.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\servlet-api-2.5-6.1.14.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\mina-core-1.1.7.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jpos.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\commons-beanutils-1.8.3.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\switchGW\hibernate-3.2.0.ga.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\switchGW\hibernate-annotations-3.2.0.ga.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\switchGW\switchGWcore.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jdom.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\freemarker.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\switchGW\antlr-2.7.6.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\switchGW\antlr-3.0ea8.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\switchGW\dom4j-1.6.1.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\switchGW\ehcache-1.2.3.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\switchGW\ojdbc14.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\switchGW\persistence-api-1.0.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\gwXML\gwccms.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\gwXML\gwibps.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\gwXML\gwiso.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\gwXML\gwbind.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\mq\com.ibm.mq.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\mq\com.ibm.mq.jms.Nojndi.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\mq\com.ibm.mq.soap.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\mq\com.ibm.mqjms.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\mq\connector.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\mq\dhbcore.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\camel-core-2.3.0.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\camel-http-2.3.0.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\camel-jetty-2.3.0.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\camel-jms-2.3.0.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\camel-mina-2.3.0.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\camel-ruby-2.3.0.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\camel-spring-2.3.0.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\camel-test-2.3.0.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jetty-continuation-7.0.1.v20091125.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jetty-http-7.0.1.v20091125.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jetty-io-7.0.1.v20091125.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jetty-security-7.0.1.v20091125.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jetty-server-7.0.1.v20091125.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jetty-servlet-7.0.1.v20091125.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jetty-servlets-7.0.1.v20091125.jar
set	CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\jetty-util-7.0.1.v20091125.jar
set CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\smooks\dtdparser-1.21.jar
set CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\smooks\groovy-all-1.5.0.jar
set CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\smooks\jackson-core-lgpl-1.0.1.jar
set CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\smooks\jaxen-1.1.1.jar
set CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\smooks\jline-0.9.93.jar
set CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\smooks\jta-1.1.jar
set CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\smooks\milyn-smooks-all-1.4-20101019.200704-5.jar
set CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\smooks\mvel2-2.0.17.jar
set CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\smooks\ognl-2.7.3.jar
set CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\smooks\opencsv-1.8.jar
set CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\smooks\snakeyaml-1.6.jar
set CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\smooks\stringtemplate-2.2.jar
set CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\smooks\xercesImpl-2.6.2.jar
set CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\smooks\xpp3_min-1.1.3.4.O.jar
set CLASSPATH=%CLASSPATH%;%INSTALL_HOME%\lib\smooks\xstream-1.2.2.jar