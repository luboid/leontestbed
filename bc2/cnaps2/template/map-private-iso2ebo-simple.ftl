<#list table.metas as meta>
<simpleMappingRule targetName="${meta.beanClass}">
   <mappings class="java.util.ArrayList">
   <#list meta.values as val> 
      <mapping <#if ("Date"==val.decoder)>targetType="JAVADATE" srcType="ISODATE"</#if> targetPath="${val.property}" srcPath="${val.data}"/>
   </#list>
   </mappings>
</simpleMappingRule>
</#list>
    