echo off

call setEnv.bat

set APP_ARGS=-spring runBC-B-spring.xml -cfgType %CFGTYPE% -cfg runBC-B-config-%CFGTYPE%.xml
set JVM_ARGS=-Dlog4j.configuration=file:%BC2_HOME%/bin/log4j/log4j-b.properties 

rem -XX:HeapDumpPath=%BC2_HOME%/bin/logs/bankBOOM
set JVM_EXT_ARGS=-Dcom.sun.management.jmxremote.port=19999 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false  -XX:+HeapDumpOnOutOfMemoryError 

"%JAVA_HOME%\bin\java" -cp "%CLASSPATH%" %JVM_ARGS% %JVM_EXT_ARGS% com.topfinance.runtime.Main %APP_ARGS% 
