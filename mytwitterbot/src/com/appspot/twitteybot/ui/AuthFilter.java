package com.appspot.twitteybot.ui;

import com.appspot.twitteybot.datastore.AppUser;
import com.appspot.twitteybot.datastore.DsHelper;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class AuthFilter implements Filter {

    
    
    
    public static boolean isRegUser(AppUser user) {
        return user.isRegUser();
    }
    
    public static void setRegUser(HttpServletRequest req, AppUser user) {
        req.getSession().setAttribute("user", user);
    }
    public static void removeRegUser(HttpServletRequest req) {
        req.getSession().removeAttribute("user");
    }
    
    public static AppUser getCurrentUser(HttpServletRequest req) {
        UserService userService = UserServiceFactory.getUserService();
        User openId = userService.getCurrentUser();
        AppUser appUser = null;
        // for openId user, avoid accessing session which might be expensive
        if(openId==null) {
            appUser = (AppUser)req.getSession(true).getAttribute("user");
//            if(appUser!=null) {
//                if(appUser.getOpenId()==null) {
//                    openId = new User(appUser.getUserName()+"@registered", REG_USER_DOMAIN);
//                    // will it persist??
//                    appUser.setOpenId(openId);
//                }
//                
//            }
        } else {
            appUser = DsHelper.getAppUserForOpenId(openId);
            if(appUser==null) {
                appUser = DsHelper.createAppUserForOpenId(openId);
            }
            
            
        }
        return appUser;
    }
    
    public static String createLogoutURL(String url, HttpServletRequest req) {
        AppUser user = getCurrentUser(req);
        if(user==null) {
            return "";
        }
        else if (isRegUser(user)) {

            String returnUrl = "/";
            try {
                returnUrl = URLEncoder.encode(url, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            return "/user?action="+Pages.PARAM_ACTION_SIGNOUT+"&returnUrl=" + returnUrl;
            
        } else {
            return UserServiceFactory.getUserService().createLogoutURL(url);
        }
        
    }
    
    
    public void doFilter(ServletRequest req1, ServletResponse resp,
            FilterChain chain) throws IOException, ServletException {
        
        HttpServletRequest req = (HttpServletRequest)req1;
        if(AuthFilter.getCurrentUser(req)==null) {
            // TODO return to the requesting url??
            req.getRequestDispatcher("/").forward(req, resp);           
        }
        else {
            // continue
            chain.doFilter(req1, resp);
        }
        
    }

    public void init(FilterConfig arg0) throws ServletException {
        // TODO Auto-generated method stub
        
    }
    public void destroy() {
        // TODO Auto-generated method stub
        
    }

}
