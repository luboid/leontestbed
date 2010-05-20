package com.topfinance.util;

import com.topfinance.runtime.Main;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;

public class DbUtils {
    public static JdbcTemplate getJdbcTemplate() {
        return (JdbcTemplate)Main.getBean("jdbcTemplate");
    }
    public static void buildInsertSql(String tableName, Map<String, Object> fields, StringBuffer buf, List<Object> params) {
        buf.append("insert into ").append(tableName).append("(");
        StringBuffer buf2 = new StringBuffer(" values (");
        int i=0;

        for(String key: fields.keySet()) {
            Object val = fields.get(key);
            if(val==null) {
                continue;
            }
            if(i==0) {
                buf.append(key).append("");
                buf2.append("?");
            }else {
                buf.append(", ").append(key);
                buf2.append(", ").append("?");
            }
            i++;
            params.add(fields.get(key));
        }
        buf.append(")").append(buf2.append(")"));
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
    
    public static List executeQueryForList(String sql, Object[] params, Class type) {
        System.out.println("sql="+sql);
        List res = getJdbcTemplate().queryForList(sql, params, type);
        System.out.println("res="+res);
        return res;
        
    }
}
