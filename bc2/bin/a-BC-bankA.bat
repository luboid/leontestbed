echo off




call setEnv.bat


set CFGFILE=runBC-A-config-%CFGTYPE%.xml
set PROFILE-DIR=D:\resource\JITprofiler\jip-src-1.2\profile

set MAX=1024
set MIN=512

set APP_ARGS=-spring runBC-A-spring.xml -cfgType %CFGTYPE% -cfg %CFGFILE%
set JVM_ARGS=-Xmx%MAX%m -Xms%MIN%m -Dlog4j.configuration=file:%INSTALL_HOME%/bin/log4j/log4j-a.properties

rem set it to true to skip saving msg to db
set SAVE_MSG_DB=true
set SAVE_MSG_FILE=true

set JVM_EXT_ARGS=

rem -Xnoagent 
rem set JVM_EXT_ARGS=-Xdebug -Djava.compiler=NONE -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=17999 

rem set JVM_EXT_ARGS=%JVM_EXT_ARGS% -javaagent:%PROFILE-DIR%\profile.jar -Dprofile.properties=%PROFILE-DIR%\my.profile.properties

rem -XX:+HeapDumpPath=%INSTALL_HOME%/bin/logs/bankAOOM
set JVM_EXT_ARGS=%JVM_EXT_ARGS% -Dbc2.saveMsgDb=%SAVE_MSG_DB% -Dbc2.saveMsgFile=%SAVE_MSG_FILE% -Dcom.sun.management.jmxremote.port=9999 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false -XX:+HeapDumpOnOutOfMemoryError 


"%JAVA_HOME%\bin\java" -cp "%CLASSPATH%" %JVM_ARGS% %JVM_EXT_ARGS% com.topfinance.runtime.Main %APP_ARGS% 
