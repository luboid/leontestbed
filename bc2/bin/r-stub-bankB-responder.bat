echo off

call setEnv.bat

set APP_ARGS=-cfgType %CFGTYPE% -cfg runBC-B-config-%CFGTYPE%.xml
set JVM_ARGS=-Dlog4j.configuration=file:%BC2_HOME%/bin/log4j/log4j-r.properties

"%JAVA_HOME%\bin\java" -cp "%CLASSPATH%" %JVM_ARGS% com.topfinance.stubs.internal.PPResponder %APP_ARGS% 
