echo off

call setEnv.bat

set APP_ARGS=-spring runBroker-C-spring.xml -cfgType %CFGTYPE% -cfgA runBC-A-config-%CFGTYPE%.xml -cfgB runBC-B-config-%CFGTYPE%.xml
set JVM_ARGS=-Dlog4j.configuration=file:%BC2_HOME%/bin/log4j/log4j-c.properties

set JVM_EXT_ARGS=-Xdebug -Xnoagent -Djava.compiler=NONE -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8000

"%JAVA_HOME%\bin\java" -cp "%CLASSPATH%" %JVM_ARGS% %JVM_EXT_ARGS% com.topfinance.stubs.external.Broker %APP_ARGS% 
