<?xml version="1.0" encoding="UTF-8"?><smooks-resource-list xmlns="http://www.milyn.org/xsd/smooks-1.1.xsd" xmlns:jb="http://www.milyn.org/xsd/smooks/javabean-1.2.xsd">
  <params>
    <param name="stream.filter.type">SAX</param>
    <param name="inputType">input.java</param>
    <param name="input.java" type="input.type.actived">${table.inputClassName}</param>
  </params>
<#list table.metas as meta>   
  <jb:bean beanId="${meta.beanId}" class="${meta.beanClass}" createOnElement="${table.inputClassName}">
<#list meta.values as val> 
 		<jb:value data="/${table.inputClassName}/${val.data}" <#if ("Date"==val.decoder)>decoder="com.topfinance.smooks.IsoDateDecoder" <#elseif ("NULL"!=val.decoder)>decoder="${val.decoder}"<#else></#if> <#if ("NULL"!=val.property)>property="${val.property}"</#if>/>
</#list>  
</#list>  
	</jb:bean>
</smooks-resource-list>  
    
    