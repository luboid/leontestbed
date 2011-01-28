#!/bin/sh

. ./setenv.sh


APP_ARGS="-cfgType ${CFGTYPE} -cfg runBC-A-config-${CFGTYPE}.xml -outPortName 8583URL_UP_IN_PP"
JVM_ARGS="-Dlog4j.configuration=file:${BC2_HOME}/bin/log4j/log4j-i.properties"

export APP_ARGS
export JVM_ARGS



${JAVA_HOME}/bin/java -cp "${CLASSPATH}" ${JVM_ARGS} com.topfinance.stubs.internal.PPInitiator ${APP_ARGS}

