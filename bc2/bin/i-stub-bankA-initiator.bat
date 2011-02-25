echo on

call setEnv.bat

rem to send ibps.101.001.01
rem set MSGCODE=101

rem to send hvps.111.001.01
set MSGCODE=111

set MAXTHREAD=1
set MAXTX=20
set INTERVAL=5


set APP_ARGS=-cfgType %CFGTYPE% -interval %INTERVAL% -maxthread %MAXTHREAD% -maxtx %MAXTX% -msgCode %MSGCODE% -cfg runBC-A-config-%CFGTYPE%.xml -outPortName 8583URL_UP_IN_PP
set JVM_ARGS=-Dlog4j.configuration=file:%BC2_HOME%/bin/log4j/log4j-i.properties

"%JAVA_HOME%\bin\java" -cp "%CLASSPATH%" %JVM_ARGS% com.topfinance.stubs.internal.PPInitiator %APP_ARGS% 
