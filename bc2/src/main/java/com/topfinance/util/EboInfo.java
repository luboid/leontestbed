package com.topfinance.util;

import java.util.ArrayList;
import java.util.List;

public class EboInfo {

//	String subClassSurfix;
    String pkgName;
    String destinationClassName;
    String tableName;
    List<Column> basicColumns = new ArrayList<Column>();
    
    public EboInfo() {

    }
    
    // used to gen xml2ebo 
    List<EboInfo> nestedEbo=new ArrayList<EboInfo>();
    String wiringColumnName;
    String wiringXmlPath;
    
    
    public static class Column {
    	
    	String prefix;
    	boolean isNested;
    	
        String variableName;
        String capitalisedVariableName;
        String javaType;
        
        String dbName;
        String dbTypeOracle;
        String dbTypeMysql;
        
        String dbExtraOracle="";
        String dbExtraMysql="";
        
        String objPath="";
        
        
        
        String xmlPath="";
        
        
        
        public String getXmlPath() {
			return xmlPath;
		}

		public void setXmlPath(String xmlPath) {
			this.xmlPath = xmlPath;
		}

		public Column() {
            
        }
        
        public String getVariableName() {
            return variableName;
        }
        public void setVariableName(String variableName) {
            this.variableName = variableName;
        }
        public String getJavaType() {
            return javaType;
        }
        public void setJavaType(String javaType) {
            this.javaType = javaType;
        }
        public String getCapitalisedVariableName() {
            return capitalisedVariableName;
        }
        public void setCapitalisedVariableName(String capitalisedVariableName) {
            this.capitalisedVariableName = capitalisedVariableName;
        }





        public String getDbName() {
            return dbName;
        }

        public void setDbName(String dbName) {
            this.dbName = dbName;
        }



        public String getObjPath() {
            return objPath;
        }

        public void setObjPath(String objPath) {
            this.objPath = objPath;
        }

        public String getDbTypeOracle() {
            return dbTypeOracle;
        }

        public void setDbTypeOracle(String dbTypeOracle) {
            this.dbTypeOracle = dbTypeOracle;
        }

        public String getDbTypeMysql() {
            return dbTypeMysql;
        }

        public void setDbTypeMysql(String dbTypeMysql) {
            this.dbTypeMysql = dbTypeMysql;
        }

        public String getDbExtraOracle() {
            return dbExtraOracle;
        }

        public void setDbExtraOracle(String dbExtraOracle) {
            this.dbExtraOracle = dbExtraOracle;
        }

        public String getDbExtraMysql() {
            return dbExtraMysql;
        }

        public void setDbExtraMysql(String dbExtraMysql) {
            this.dbExtraMysql = dbExtraMysql;
        }

		public boolean isNested() {
			return isNested;
		}

		public void setNested(boolean isNested) {
			this.isNested = isNested;
		}

		public String getPrefix() {
			return prefix;
		}

		public void setPrefix(String prefix) {
			this.prefix = prefix;
		}

		@Override
		public String toString() {
			return "Column [prefix=" + prefix + ", isNested=" + isNested
					+ ", variableName=" + variableName
					+ ", capitalisedVariableName=" + capitalisedVariableName
					+ ", javaType=" + javaType + ", dbName=" + dbName
					+ ", dbTypeOracle=" + dbTypeOracle + ", dbTypeMysql="
					+ dbTypeMysql + ", dbExtraOracle=" + dbExtraOracle
					+ ", dbExtraMysql=" + dbExtraMysql + ", objPath=" + objPath
					+ ", xmlPath=" + xmlPath + "]";
		}






        
        
        
    }



    public String getPkgName() {
        return pkgName;
    }



    public void setPkgName(String pkgName) {
        this.pkgName = pkgName;
    }



    public String getDestinationClassName() {
        return destinationClassName;
    }



    public void setDestinationClassName(String destinationClassName) {
        this.destinationClassName = destinationClassName;
    }



    public String getTableName() {
        return tableName;
    }



    public void setTableName(String tableName) {
        this.tableName = tableName;
    }



    public List<Column> getBasicColumns() {
        return basicColumns;
    }



    public void setBasicColumns(List<Column> basicColumns) {
        this.basicColumns = basicColumns;
    }



	public List<EboInfo> getNestedEbo() {
		return nestedEbo;
	}



	public void setNestedEbo(List<EboInfo> nestedEbo) {
		this.nestedEbo = nestedEbo;
	}



	public String getWiringColumnName() {
		return wiringColumnName;
	}



	public void setWiringColumnName(String wiringColumnName) {
		this.wiringColumnName = wiringColumnName;
	}



	public String getWiringXmlPath() {
		return wiringXmlPath;
	}



	public void setWiringXmlPath(String wiringXmlPath) {
		this.wiringXmlPath = wiringXmlPath;
	}



	@Override
	public String toString() {
		return "EboInfo [pkgName=" + pkgName + ", destinationClassName="
				+ destinationClassName + ", tableName=" + tableName
				+ ", basicColumns=" + basicColumns + ", nestedEbo=" + nestedEbo
				+ ", wiringColumnName=" + wiringColumnName + ", wiringXmlPath="
				+ wiringXmlPath + "]";
	}




    
}
