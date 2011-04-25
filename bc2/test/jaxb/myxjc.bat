
set JAXB_HOME=D:\resource\jaxb2\jaxb-ri-20091104
set BC2_HOME=D:\bankConnector\source
set GEN_HOME=%BC2_HOME%\generated_test
rem this is test

rem xjc -b %BC2_HOME%\src\schema\document.jxb -d %BC2_HOME%\src\test\java %BC2_HOME%\src\schema\Document.xsd 

rem 101
rem xjc -b %BC2_HOME%\test\jaxb\pacs.008.001.02.jxb -d %GEN_HOME%\cnaps2\java %BC2_HOME%\sample\Schema\pacs.008.001.02.xsd

rem 102
rem xjc -b %BC2_HOME%\test\jaxb\pacs.002.001.03.jxb -d %GEN_HOME%\cnaps2\java %BC2_HOME%\sample\Schema\pacs.002.001.03.xsd

rem 601
rem call %JAXB_HOME%\bin\xjc -b %BC2_HOME%\test\jaxb\camt.054.001.02.jxb -d %GEN_HOME%\cnaps2\java %BC2_HOME%\sample\Schema\camt.054.001.02.xsd

rem 604
rem call %JAXB_HOME%\bin\xjc -b %BC2_HOME%\test\jaxb\saps.604.001.01.jxb -d %GEN_HOME%\cnaps2\java %BC2_HOME%\sample\Schema\saps.604.001.01.xsd

call %JAXB_HOME%\bin\xjc -b %BC2_HOME%\test\jaxb\testNested.jxb -d %GEN_HOME%\cnaps2\java %BC2_HOME%\sample\Schema\testNested.xsd

pause