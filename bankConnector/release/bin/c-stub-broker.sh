#!/bin/sh

BC2_HOME=/bc/bcuser1/liyong/bc2
CFGTYPE=FILE
export CFGTYPE
JAVA_HOME=/usr/java6_64/jre

APP_ARGS="-spring runBroker-C-spring.xml -cfgType ${CFGTYPE} -cfgA runBC-A-config-${CFGTYPE}.xml -cfgB runBC-B-config-${CFGTYPE}.xml"
JVM_ARGS="-Xmx512M"

export JAVA_HOME
export BC2_HOME
export APP_ARGS
export JVM_ARGS

CLASSPATH=.:${BC2_HOME}/lib/bc.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/mysql-connector-java-3.1.12-bin.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/ojdbc14.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/commons-cli-1.2.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/simple-xml-2.3.3.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/activation-1.1.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/activeio-core-3.1.2.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/activemq-camel-5.3.0.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/activemq-core-5.3.0.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/activemq-pool-5.3.0.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/activemq-protobuf-1.0.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/aopalliance-1.0.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/asm-3.1.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/aspectjrt-1.6.2.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/aspectjweaver-1.6.2.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/cglib-nodep-2.1_3.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/commons-logging-1.1.1.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/commons-logging-api-1.1.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/commons-management-1.0.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/commons-net-2.0.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/commons-pool-1.5.4.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/geronimo-j2ee-management_1.0_spec-1.1.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/geronimo-j2ee-management_1.1_spec-1.0.1.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/geronimo-jms_1.1_spec-1.1.1.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/geronimo-jta_1.0.1B_spec-1.0.1.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/groovy-all-1.7.0.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jackson-asl-0.9.4.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jaxb-api-2.1.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jaxb-impl-2.1.12.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jdom-1.0.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jersey-atom-1.1.1-ea.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jersey-core-1.1.1-ea.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jersey-json-1.1.1-ea.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jersey-server-1.1.1-ea.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jersey-spring-1.1.1-ea.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jettison-1.2.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jline-0.9.94.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jruby-1.4.0.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jsr311-api-1.1.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jstl-1.1.2.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/junit-4.4.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/kahadb-5.3.0.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/log4j-1.2.14.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/rome-0.9.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/sitemesh-2.3.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/slf4j-api-1.5.10.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/slf4j-log4j12-1.5.10.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/spring-2.5.6.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/spring-aop-2.5.6.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/spring-beans-2.5.6.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/spring-context-2.5.6.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/spring-context-support-2.5.6.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/spring-core-2.5.6.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/spring-jms-2.5.6.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/spring-tx-2.5.6.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/spring-web-2.5.6.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/standard-1.1.2.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/stax-api-1.0-2.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/stax-api-1.0.1.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/xbean-spring-3.5.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/commons-collections-3.2.1.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/commons-dbcp-1.4.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/commons-io-1.4.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/commons-lang-2.4.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/commons-httpclient-3.1.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/servlet-api-2.5-6.1.14.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/mina-core-1.1.7.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jpos.jar sourcepath=/jpos-1.6.6
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/commons-beanutils-1.8.3.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/switchGW/hibernate-3.2.0.ga.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/switchGW/hibernate-annotations-3.2.0.ga.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/switchGW/switchGWcore.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jdom.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/freemarker.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/switchGW/antlr-2.7.6.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/switchGW/antlr-3.0ea8.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/switchGW/dom4j-1.6.1.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/switchGW/ehcache-1.2.3.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/switchGW/ojdbc14.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/switchGW/persistence-api-1.0.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/gwXML/gwccms.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/gwXML/gwibps.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/gwXML/gwiso.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/gwXML/gwbind.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/camel-core-2.3.0.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/camel-http-2.3.0.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/camel-jetty-2.3.0.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/camel-jms-2.3.0.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/camel-mina-2.3.0.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/camel-ruby-2.3.0.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/camel-spring-2.3.0.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/camel-test-2.3.0.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jetty-continuation-7.0.1.v20091125.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jetty-http-7.0.1.v20091125.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jetty-io-7.0.1.v20091125.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jetty-security-7.0.1.v20091125.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jetty-server-7.0.1.v20091125.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jetty-servlet-7.0.1.v20091125.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jetty-servlets-7.0.1.v20091125.jar
CLASSPATH=${CLASSPATH}:${BC2_HOME}/lib/jetty-util-7.0.1.v20091125.jar


export CLASSPATH

${JAVA_HOME}/bin/java -cp "${CLASSPATH}" ${JVM_ARGS} com.topfinance.stubs.external.Broker ${APP_ARGS}
