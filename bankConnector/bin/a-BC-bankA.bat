echo off

call setEnv.bat

set APP_ARGS=-spring runBC-A-spring.xml -cfgType %CFGTYPE% -cfg runBC-A-config-%CFGTYPE%.xml
set JVM_ARGS=-Dlog4j.configuration=file:%BC2_HOME%/bin/log4j/log4j-a.properties

"%JAVA_HOME%\bin\java" -cp "%CLASSPATH%" %JVM_ARGS% com.topfinance.runtime.Main %APP_ARGS% 
