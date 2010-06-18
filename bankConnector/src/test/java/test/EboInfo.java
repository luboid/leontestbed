package test;

import java.util.ArrayList;
import java.util.List;

public class EboInfo {

    String pkgName;
    String destinationClassName;
    String tableName;
    List<Column> basicColumns = new ArrayList<Column>();
    
    public EboInfo() {

    }
    
    
    public static class Column {
        String variableName;
        String capitalisedVariableName;
        String javaType;
        
        String dbName;
        String dbType;
        
        String dbExtra="";
        
        String objPath="";
        
        
        
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




        public String getDbType() {
            return dbType;
        }

        public void setDbType(String dbType) {
            this.dbType = dbType;
        }

        public String getDbName() {
            return dbName;
        }

        public void setDbName(String dbName) {
            this.dbName = dbName;
        }

        public String getDbExtra() {
            return dbExtra;
        }

        public void setDbExtra(String dbExtra) {
            this.dbExtra = dbExtra;
        }

        public String getObjPath() {
            return objPath;
        }

        public void setObjPath(String objPath) {
            this.objPath = objPath;
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
    
    
}
