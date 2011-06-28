echo off

call setEnv.bat

set APP_ARGS=-spring runBC-B-spring.xml -cfgType %CFGTYPE% -cfg runBC-B-config-%CFGTYPE%.xml
set JVM_ARGS=-Dlog4j.configuration=file:%INSTALL_HOME%/bin/log4j/log4j-b.properties 

rem set it to true to skip saving msg to db
set SAVE_MSG_DB=true
set SAVE_MSG_FILE=false

set JVM_EXT_ARGS=
rem set JVM_EXT_ARGS=-Xdebug -Djava.compiler=NONE -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=17999 

rem -XX:HeapDumpPath=%INSTALL_HOME%/bin/logs/bankBOOM
set JVM_EXT_ARGS=%JVM_EXT_ARGS% -Dbc2.saveMsgDb=%SAVE_MSG_DB% -Dbc2.saveMsgFile=%SAVE_MSG_FILE% -Dcom.sun.management.jmxremote.port=19999 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false  -XX:+HeapDumpOnOutOfMemoryError 

"%JAVA_HOME%\bin\java" -cp "%CLASSPATH%" %JVM_ARGS% %JVM_EXT_ARGS% com.topfinance.runtime.Main %APP_ARGS% 
