package com.appspot.twitteybot.ui;

import com.appspot.twitteybot.datastore.AppUser;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

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
    public static User getCurrentUser(HttpServletRequest req) {
        UserService userService = UserServiceFactory.getUserService();
        User user = userService.getCurrentUser();
        if(user==null) {
            AppUser u1 = (AppUser)req.getSession(true).getAttribute("user");
            if(u1!=null) {
                // to avoid duplication with openId accounts
                user = new User(u1.getUserName()+"@registered", "thisapp");
            }
        }
        return user;
    }
    public void doFilter(ServletRequest req1, ServletResponse resp,
            FilterChain chain) throws IOException, ServletException {
        
        HttpServletRequest req = (HttpServletRequest)req1;
        if(AuthFilter.getCurrentUser(req)==null) {
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
