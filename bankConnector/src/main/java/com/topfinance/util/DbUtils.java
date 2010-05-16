package com.topfinance.util;

import com.topfinance.runtime.Main;

import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;

public class DbUtils {
    public static JdbcTemplate getJdbcTemplate() {
        return (JdbcTemplate)Main.getBean("jdbcTemplate");
    }
    
    public static void executeUpdate(String sql, Object[] params) {
        System.out.println("sql="+sql);
        int res = getJdbcTemplate().update(sql, params);
        System.out.println("res="+res);
    }
    
    public static Map executeQuery(String sql, Object[] params) {
        System.out.println("sql="+sql);
        
        Map res = getJdbcTemplate().queryForMap(sql, params);
        
        System.out.println("res="+res);
        return res;
        
    }
    
    public static Object executeQuery(String sql, Object[] params, Class type) {
        System.out.println("sql="+sql);
        
        Object res = getJdbcTemplate().queryForObject(sql, params, type);
        
        System.out.println("res="+res);
        return res;
        
    }
}
