package com.appspot.twitteybot.ui;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class AuthFilter implements Filter {

    public void destroy() {
        // TODO Auto-generated method stub
        
    }

    public void doFilter(ServletRequest req1, ServletResponse resp,
            FilterChain chain) throws IOException, ServletException {
        
        HttpServletRequest req = (HttpServletRequest)req1;
        if(OpenIdServlet.getCurrentUser(req)==null) {
            req.getRequestDispatcher("/").forward(req, resp);
        }
        else {
            chain.doFilter(req1, resp);
        }
        
    }

    public void init(FilterConfig arg0) throws ServletException {
        // TODO Auto-generated method stub
        
    }


}
