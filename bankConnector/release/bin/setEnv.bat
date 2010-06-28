echo off

set HOME=D:\bankConnector\source
set CFGTYPE=FILE
set JAVA_HOME=D:\Program Files\Java\jdk1.6.0_17

set APP_ARGS=-spring runBroker-C-spring.xml -cfgType %CFGTYPE% -cfgA runBC-A-config-%CFGTYPE%.xml -cfgB runBC-B-config-%CFGTYPE%.xml
set JVM_ARGS=-Xmx512M