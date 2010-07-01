#!/bin/sh

. ./setenv.sh

APP_ARGS="-spring runBC-B-spring.xml -cfgType ${CFGTYPE} -cfg runBC-B-config-${CFGTYPE}.xml"
JVM_ARGS="-Dlog4j.configuration=file:${BC2_HOME}/bin/log4j/log4j-b.properties"

export APP_ARGS
export JVM_ARGS

${JAVA_HOME}/bin/java -cp "${CLASSPATH}" ${JVM_ARGS} com.topfinance.runtime.Main ${APP_ARGS}

