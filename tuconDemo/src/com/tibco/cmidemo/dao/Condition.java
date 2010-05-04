/**
* Author: Bob Chen
*/

package com.tibco.cmidemo.dao;

public class Condition {
    public static int EQUALS = 0;
    public static int CONTAINS = 1;
    public static int LIKE = 2;
    public static int GREATERTHAN = 3;
    public static int LESSTHAN = 4;
    
    private String field;
    private String value;
    int operator;

    public Condition() {
    }
    
    public Condition(String field, int operator, String value) {
        this.field = field;
        this.operator = operator;
        this.value = value;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public int getOperator() {
        return operator;
    }

    public void setOperator(int operator) {
        this.operator = operator;
    }
}
