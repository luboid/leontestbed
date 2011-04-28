package com.appspot.twitteybot.ui;

import com.appspot.twitteybot.datastore.TwitterStatus;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class TransactionManager extends HttpServlet {
    
    private static final Logger log = Logger.getLogger(TransactionManager.class.getName());
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        constructResponse(null, "xxxx", null, resp, 0, 0);
        
    }
    
    private void constructResponse(List<TwitterStatus> list, String message, String level, HttpServletResponse resp,
            long start, long end) throws IOException {
        log.info("constructResponse!!!!!!");
        Map<String, Object> templateValues = new HashMap<String, Object>();
//        templateValues.put(Pages.FTLVAR_TWITTER_STATUS, list);
//        templateValues.put(Pages.FTLVAR_LEVEL, level);
//        templateValues.put(Pages.FTLVAR_START, start);
//        templateValues.put(Pages.FTLVAR_END, start + list.size());
//        templateValues.put(Pages.FTLVAR_MESSAGE, message);
        FreeMarkerConfiguration.writeResponse(templateValues, Pages.TEMPLATE_TXNPAGE, resp.getWriter());
    }
}
