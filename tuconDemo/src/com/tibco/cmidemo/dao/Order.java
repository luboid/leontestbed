
package com.tibco.cmidemo.dao;

public class Order {
    public final static boolean ASCEND = true;
    public final static boolean DESCEND = false;
    
    String field;
    boolean ascend;



    public Order(String field, boolean ascend) {
        this.field = field;
        this.ascend = ascend;
    }
    
    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public boolean isAscend() {
        return ascend;
    }

    public void setAscend(boolean ascend) {
        this.ascend = ascend;
    }

}
