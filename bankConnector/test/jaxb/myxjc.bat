set JAXB_HOME=D:\resource\jaxb2\jaxb-ri-20091104

rem this is test

rem xjc -b D:\bankConnector\source\src\schema\document.jxb -d D:\bankConnector\source\src\test\java D:\bankConnector\source\src\schema\Document.xsd 

rem 101
rem xjc -b D:\bankConnector\source\test\jaxb\pacs.008.001.02.jxb -d D:\bankConnector\SVN-ROOT\gwXML\src D:\bankConnector\source\sample\Schema\pacs.008.001.02.xsd

rem 102
rem xjc -b D:\bankConnector\source\test\jaxb\pacs.002.001.03.jxb -d D:\bankConnector\SVN-ROOT\gwXML\src D:\bankConnector\source\sample\Schema\pacs.002.001.03.xsd

rem 601
call %JAXB_HOME%\bin\xjc -b D:\bankConnector\source\test\jaxb\camt.054.001.02.jxb -d D:\bankConnector\SVN-ROOT\gwXML\src D:\bankConnector\source\sample\Schema\camt.054.001.02.xsd