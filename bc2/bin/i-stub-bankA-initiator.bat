echo on

call setEnv.bat

rem to send ibps.101.001.01
rem set MSGCODE=ibps.101.001.01_A100_01000

rem to send hvps.111.001.01
set MSGCODE=hvps.111.001.01_A100_02101
rem set MSGCODE=hvps.111.001.01_A202_05003

set MAXTHREAD=1
set MAXTX=1
set INTERVAL=8


set APP_ARGS=-cfgType %CFGTYPE% -interval %INTERVAL% -maxthread %MAXTHREAD% -maxtx %MAXTX% -msgCode %MSGCODE% -cfg runBC-A-config-%CFGTYPE%.xml -outPortName 8583URL_UP_IN_PP
set JVM_ARGS=-Dlog4j.configuration=file:%BC2_HOME%/bin/log4j/log4j-i.properties

"%JAVA_HOME%\bin\java" -cp "%CLASSPATH%" %JVM_ARGS% com.topfinance.stubs.internal.PPInitiator %APP_ARGS% 
