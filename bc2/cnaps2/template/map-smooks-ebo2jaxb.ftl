<?xml version="1.0" encoding="ASCII"?>
<smooks-resource-list xmlns="http://www.milyn.org/xsd/smooks-1.1.xsd" xmlns:jb="http://www.milyn.org/xsd/smooks/javabean-1.2.xsd">
  <params>
    <param name="stream.filter.type">SAX</param>
    <param name="inputType">input.java</param>
    <param name="input.java" type="input.type.actived">${table.inputClassName}</param>
  </params>
  <#list table.metas as meta>    
  	<jb:bean beanId="${meta.beanId}" class="${meta.beanClass}" createOnElement="${table.inputClassName}">
  		<#list meta.wirings as wiring> 
    	<jb:wiring beanIdRef="${wiring.beanIdRef}" <#if ("NULL"!=wiring.property)>property="${wiring.property}"</#if>/>
    	</#list>
  		<#list meta.values as val> 
  			<#if ("Date"==val.decoder)>
  		<jb:value data="${val.data}" decoder="Date" property="${val.property}">
    		<jb:decodeParam name="format">yyyy-MM-dd HH:mm:ss.S z</jb:decodeParam>
			</jb:value>
  			<#else>
  		<jb:value data="${val.data}" <#if ("NULL"!=val.decoder)>decoder="${val.decoder}"</#if> <#if ("NULL"!=val.property)>property="${val.property}"</#if>/>
  			</#if>
    	</#list>    	
  	</jb:bean>
	</#list>
</smooks-resource-list>  
    
    