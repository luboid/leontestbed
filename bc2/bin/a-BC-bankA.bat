echo off




call setEnv.bat



set APP_ARGS=-spring runBC-A-spring.xml -cfgType %CFGTYPE% -cfg runBC-A-config-%CFGTYPE%.xml
set JVM_ARGS=-Dlog4j.configuration=file:%BC2_HOME%/bin/log4j/log4j-a.properties

set JVM_EXT_ARGS=-Xdebug -Xnoagent -Djava.compiler=NONE -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=17999


"%JAVA_HOME%\bin\java" -cp "%CLASSPATH%" %JVM_ARGS% %JVM_EXT_ARGS% com.topfinance.runtime.Main %APP_ARGS% 
