package com.topfinance.util;

import com.topfinance.runtime.Main;
import com.topfinance.runtime.UpwardProcessor;

import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.JdbcTemplate;

public class DbUtils {
    private static Logger logger = Logger.getLogger(DbUtils.class);
    
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
    public static int executeUpdate(String sql, Object[] params) {
        logger.debug("sql="+sql);
        int res = getJdbcTemplate().update(sql, params);
        logger.debug("res="+res);
        return res;
    }
    
    public static Map executeQuery(String sql, Object[] params) {
        logger.debug("sql="+sql);
        Map res = getJdbcTemplate().queryForMap(sql, params);
        logger.debug("res="+res);
        return res;
        
    }
    
    public static Object executeQuery(String sql, Object[] params, Class type) {
        logger.debug("sql="+sql);
        Object res = getJdbcTemplate().queryForObject(sql, params, type);
        logger.debug("res="+res);
        return res;
        
    }
    
    public static List executeQueryForList(String sql, Object[] params, Class type) {
        logger.debug("sql="+sql);
        List res = getJdbcTemplate().queryForList(sql, params, type);
        logger.debug("res="+res);
        return res;
        
    }
}
