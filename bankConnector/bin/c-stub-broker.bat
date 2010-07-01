echo off

call setEnv.bat

set APP_ARGS=-spring runBroker-C-spring.xml -cfgType %CFGTYPE% -cfgA runBC-A-config-%CFGTYPE%.xml -cfgB runBC-B-config-%CFGTYPE%.xml
set JVM_ARGS=-Dlog4j.configuration=file:%BC2_HOME%/bin/log4j/log4j-c.properties

"%JAVA_HOME%\bin\java" -cp "%CLASSPATH%" %JVM_ARGS% com.topfinance.stubs.external.Broker %APP_ARGS% 
