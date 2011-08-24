package com.appspot.twitteybot.ui;

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
public class OpenIdManager extends HttpServlet {
    private static final Logger log = Logger.getLogger(OpenIdManager.class.getName());
    
    private static final String OAUTH_PROVIDER_NAME_GOOGLE = "Google";
    private static final String OAUTH_PROVIDER_NAME_YAHOO = "Yahoo";
    private static final String OAUTH_PROVIDER_NAME_MySpace = "MySpace";
    private static final String OAUTH_PROVIDER_NAME_AOL = "AOL";
    private static final String OAUTH_PROVIDER_NAME_MYOPENID = "MyOpenId.com";
    
    private static final Map<String, String> openIdProviders;
    static {
        openIdProviders = new HashMap<String, String>();
        openIdProviders.put(OAUTH_PROVIDER_NAME_GOOGLE, "google.com/accounts/o8/id");
        openIdProviders.put(OAUTH_PROVIDER_NAME_YAHOO, "yahoo.com");
        openIdProviders.put(OAUTH_PROVIDER_NAME_MySpace, "myspace.com");
        openIdProviders.put(OAUTH_PROVIDER_NAME_AOL, "aol.com");
        openIdProviders.put(OAUTH_PROVIDER_NAME_MYOPENID, "myopenid.com");
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
        

        log.warning("raw returnUrl="+returnUrl);
        if(returnUrl==null) {
            returnUrl=Pages.PAGE_HOME;
        }   
        log.warning("qSt="+queryString+", returnUrl="+returnUrl+", homePage="+homePage);
        
        
//         always go to main page after logon
//        returnUrl = Pages.PAGE_MAIN;
        
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();

        if (user != null) {
            
            // won't come here!!!
//            throw new RuntimeException("shouldn't come to openId logon again...");
            
            // will happen if user didn't logout lastime, and click login(openId) link again
            resp.sendRedirect(returnUrl);
            
//            out.println("Hello <i>" + user.getNickname() + "</i>!");
//            out.println("[<a href=\""
//                    + userService.createLogoutURL(homePage)
//                    + "\">sign out</a>]");
            
//            resp.sendRedirect(Pages.PAGE_MAIN);
        } else {
     
            
            if(returnUrl.contains(Pages.PAGE_ADMIN)) {
                out.println("Sign in as Administrator at: ");
            }else {
                out.println("Sign in at: ");
            }
            
            
            
            if(returnUrl.contains("http://")) {
                // do nothing  
            } else {
                // added server name
                if(!returnUrl.startsWith("/")) {
                    returnUrl = "/"+returnUrl;
                }
                returnUrl = "http://"+req.getServerName()+returnUrl;
            }
            
            String providerName = req.getParameter("oauth_org");
            
            //for (String providerName : openIdProviders.keySet()) {
                String providerUrl = openIdProviders.get(providerName);
                if(!providerUrl.equals("")){
                	String loginUrl = userService.createLoginURL(returnUrl, null, providerUrl, attributes);
                    resp.sendRedirect(loginUrl);
                }
                else {
                	resp.sendRedirect(returnUrl);
                }
                
//                out.println("[<a href=\"" + loginUrl + "\">" + providerName + "</a>] ");
//            }
        }
    }
}