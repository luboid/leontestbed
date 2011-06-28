echo on

call setEnv.bat


rem to send beps.122.001.01
set MSGCODE=beps.122.001.01_A104_02201

rem to send hvps.112.001.01
rem set MSGCODE=hvps.112.001.01_A200_02118

rem to send ibps.101.001.01
rem set MSGCODE=ibps.101.001.01_A100_01000

rem to send hvps.111.001.01
rem set MSGCODE=hvps.111.001.01_A100_02101
rem set MSGCODE=hvps.111.001.01_A202_05003

set MAXTHREAD=1
set MAXTX=1
set INTERVAL=2

set JVM_EXT_ARGS=
rem set JVM_EXT_ARGS=-Xdebug -Djava.compiler=NONE -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=17999 


set APP_ARGS=-cfgType %CFGTYPE% -interval %INTERVAL% -maxthread %MAXTHREAD% -maxtx %MAXTX% -msgCode %MSGCODE% -cfg runBC-A-config-%CFGTYPE%.xml -outPortName 8583URL_UP_IN_PP
set JVM_ARGS=-Dlog4j.configuration=file:%INSTALL_HOME%/bin/log4j/log4j-i.properties

"%JAVA_HOME%\bin\java" -cp "%CLASSPATH%" %JVM_ARGS% %JVM_EXT_ARGS% com.topfinance.stubs.internal.PPInitiator %APP_ARGS% 
