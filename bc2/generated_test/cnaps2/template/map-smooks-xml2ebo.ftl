<?xml version="1.0" encoding="ASCII"?>
<smooks-resource-list xmlns="http://www.milyn.org/xsd/smooks-1.1.xsd" xmlns:jb="http://www.milyn.org/xsd/smooks/javabean-1.2.xsd">
  <params>
    <param name="stream.filter.type">SAX</param>
    <param name="inputType">input.xsd</param>
    <param name="input.xsd.rootElement">Document</param>
    <param name="input.xsd" type="input.type.actived"></param>
  </params>
  <jb:bean beanId="target" class="${table.pkgName}.${table.destinationClassName}" createOnElement="Document">
<#list table.basicColumns as column>   
    <#if (column.nested) >
    		<jb:wiring beanIdRef="${column.variableName}[0]" property="${column.variableName}"/>

		<#elseif (""!=column.xmlPath)>
			<#if (""!=column.prefix) >
				<jb:expression property="${column.variableName}" execOnElement="${column.xmlPath}">
					if (_VALUE contains "${column.prefix}") {
		        return org.apache.commons.lang.StringUtils.substringAfterLast(_VALUE, "/${column.prefix}/");
		      }else {
    		  	return null;
      		}
    		</jb:expression>					
			<#elseif ("Date"==column.javaType)>
  			<jb:value data="${column.xmlPath}" decoder="Date" property="${column.variableName}">
    			<jb:decodeParam name="format">yyyy-MM-dd</jb:decodeParam>
				</jb:value>
			<#elseif ("DateTime"==column.javaType)>				
  			<jb:value data="${column.xmlPath}" decoder="Date" property="${column.variableName}">
    			<jb:decodeParam name="format">yyyy-MM-dd'T'HH:mm:ss</jb:decodeParam>
				</jb:value>			
			<#else>
				<jb:value data="${column.xmlPath}" property="${column.variableName}"/>    
			</#if>
		</#if>
</#list>   
	</jb:bean>
	
<#list table.nestedEbo as ebo>
  <jb:bean beanId="${ebo.wiringColumnName}[0]" class="java.util.HashSet" createOnElement="Document">
   	<jb:wiring beanIdRef="${ebo.wiringColumnName}" />
  </jb:bean>
	<jb:bean beanId="${ebo.wiringColumnName}" class="${table.pkgName}.${ebo.destinationClassName}" createOnElement="${ebo.wiringXmlPath}">
		<jb:wiring beanIdRef="target" property="fid"/>
		<#list ebo.basicColumns as column>
    <#if (column.nested) >
    		<jb:wiring beanIdRef="${column.variableName}[0]" property="${column.variableName}"/>
		<#elseif (""!=column.xmlPath)>
			<#if (""!=column.prefix) >
				<jb:expression property="${column.variableName}" execOnElement="${column.xmlPath}">
					if (_VALUE contains "${column.prefix}") {
		        return org.apache.commons.lang.StringUtils.substringAfterLast(_VALUE, "/${column.prefix}/");
		      }else {
    		  	return null;
      		}
    		</jb:expression>					
			<#elseif ("Date"==column.javaType)>
  			<jb:value data="${column.xmlPath}" decoder="Date" property="${column.variableName}">
    			<jb:decodeParam name="format">yyyy-MM-dd</jb:decodeParam>
				</jb:value>
			<#elseif ("DateTime"==column.javaType)>				
  			<jb:value data="${column.xmlPath}" decoder="Date" property="${column.variableName}">
    			<jb:decodeParam name="format">yyyy-MM-dd'T'HH:mm:ss</jb:decodeParam>
				</jb:value>			
			<#else>
				<jb:value data="${column.xmlPath}" property="${column.variableName}"/>
			</#if>
		</#if>
		</#list>
	</jb:bean>  
</#list> 


</smooks-resource-list>  
    
    