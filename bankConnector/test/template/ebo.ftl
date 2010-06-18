package ${table.pkgName};

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * ${table.destinationClassName} generated by ParseSampleXml
 */
 
@Entity
@Table(name = "${table.tableName}")
public class ${table.destinationClassName}  implements java.io.Serializable {

	// Fields 
<#list table.basicColumns as column>    
	private ${column.javaType} ${column.variableName};
</#list>    
    
	
	/** default constructor */
	public ${table.destinationClassName}() {
	}
	
	
<#list table.basicColumns as column >

  /**
   * Returns the ${column.variableName}
   * ${column.objPath}
   * @return the ${column.variableName}
   */
	@Column(name = "${column.dbName}")
  public ${column.javaType} get${column.capitalisedVariableName}() {
    return ${column.variableName};
  }	 
     
  /**
   * Sets the ${column.variableName}
   *
   * @param new${column.capitalisedVariableName} the new ${column.variableName}
   */
	@Column(name = "${column.dbName}")
  public void  set${column.capitalisedVariableName}(${column.javaType} new${column.capitalisedVariableName}) {
    ${column.variableName} = new${column.capitalisedVariableName};
  }	  
</#list>  
    
    
}    
    
    