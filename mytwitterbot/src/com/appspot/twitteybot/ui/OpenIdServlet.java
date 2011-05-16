package com.appspot.twitteybot.ui;

import com.appspot.twitteybot.datastore.AppUser;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.logging.Logger;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
public class OpenIdServlet extends HttpServlet {
    private static final Logger log = Logger.getLogger(OpenIdServlet.class.getName());
    
    private static final Map<String, String> openIdProviders;
    static {
        openIdProviders = new HashMap<String, String>();
        openIdProviders.put("Google", "google.com/accounts/o8/id");
        openIdProviders.put("Yahoo", "yahoo.com");
        openIdProviders.put("MySpace", "myspace.com");
        openIdProviders.put("AOL", "aol.com");
        openIdProviders.put("MyOpenId.com", "myopenid.com");
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
    
    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        UserService userService = UserServiceFactory.getUserService();
        User user = userService.getCurrentUser(); // or req.getUserPrincipal()
        Set<String> attributes = new HashSet();

        String queryString = req.getQueryString();

        String returnUrl = req.getParameter("continue");
        String serverName = req.getServerName();
        String homePage="http://"+serverName;
        
        log.warning("qSt="+queryString+", returnUrl="+returnUrl+", homePage="+homePage);
        

        
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();

        if (user != null) {
            out.println("Hello <i>" + user.getNickname() + "</i>!");
            out.println("[<a href=\""
                    + userService.createLogoutURL(homePage)
                    + "\">sign out</a>]");
        } else {
            out.println("Hello world! Sign in at: ");
            for (String providerName : openIdProviders.keySet()) {
                String providerUrl = openIdProviders.get(providerName);
                String loginUrl = userService.createLoginURL(returnUrl, null, providerUrl, attributes);
                out.println("[<a href=\"" + loginUrl + "\">" + providerName + "</a>] ");
            }
        }
    }
}