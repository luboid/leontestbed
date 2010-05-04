/**
* Author: Bob Chen
*/

package com.tibco.cmidemo.dao;

import java.util.ArrayList;
import java.util.List;

public class Criteria {
    
    private Class modelClazz;
    
    private List<Condition> conditions = new ArrayList<Condition>();
    private List<Order> orders = new ArrayList<Order>();

    
    public Criteria(Class modelClazz) {
        setModelClazz(modelClazz);
    }
    
    public List<Condition> getConditions() {
        return conditions;
    }

    public void setConditions(List<Condition> conditions) {
        this.conditions = conditions;
    }
    
    public void addCondition(Condition condition) {
        conditions.add(condition);
    }

    public void removeCondition(Condition condition) {
        conditions.remove(condition);
    }

    public void removeAllCondition(){
    	conditions.clear();
    }
    public List<Order> getOrders() {
        return orders;
    }

    public void setOrder(List<Order> orders) {
        this.orders = orders;
    }
    
    public void addOrder(Order order) {
        orders.add(order);
    }

    public void removeOrder(Order order) {
        orders.remove(order);
    }

    public Class getModelClazz() {
        return modelClazz;
    }

    public void setModelClazz(Class modelClazz) {
        this.modelClazz = modelClazz;
    }



}
