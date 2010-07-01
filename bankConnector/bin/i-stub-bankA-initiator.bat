echo off

call setEnv.bat

set APP_ARGS=-cfgType %CFGTYPE% -cfg runBC-A-config-%CFGTYPE%.xml -outPortName 8583URL_UP_IN_PP
set JVM_ARGS=-Dlog4j.configuration=file:%BC2_HOME%/bin/log4j/log4j-i.properties

"%JAVA_HOME%\bin\java" -cp "%CLASSPATH%" %JVM_ARGS% com.topfinance.stubs.internal.PPInitiator %APP_ARGS% 
