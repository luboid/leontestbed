package com.appspot.twitteybot.ui;

import com.appspot.twitteybot.datastore.AppUser;
import com.appspot.twitteybot.datastore.ApplicationProperty;
import com.appspot.twitteybot.datastore.PMF;
import com.sun.syndication.io.impl.Base64;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RegUserManager extends HttpServlet{
	
	/**
	 * sign up an user
	 */
	private static final long serialVersionUID = 1146087434539278009L;
	private static final Logger log = Logger.getLogger(RegUserManager.class.getName());
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		this.doPost(req, resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String action = req.getParameter(Pages.PARAM_ACTION);
//		String encoded = URLEncoder.encode("/pages/main", "UTF-8");
//		log.info("===================encoded="+encoded);
		Map<String, Object> templateValues = new HashMap<String, Object>();
		if(action.equals(Pages.PARAM_ACTION_SIGNOUT)){
		    
		    AuthFilter.removeRegUser(req);
		    
		    // TODO get returnUrl and forward? 
		    
		    // to simplify, always signout to the homepage...
		    req.getRequestDispatcher("/").forward(req, resp);
		   
		}
		else if(action.equals(Pages.PARAM_ACTION_SHOWSIGNUP)){
		    templateValues.put("errorMessage", "Please Sign Up.");
		    templateValues.put("action", Pages.PARAM_ACTION_SIGNUP);
			FreeMarkerConfiguration.writeResponse(templateValues,Pages.TEMPLATE_SIGNUPPAGE,resp.getWriter());
		}

		else if(action.equals(Pages.PARAM_ACTION_SHOWSIGNIN)){
		    templateValues.put("errorMessage", "Please Sign In.");
		    templateValues.put("action", Pages.PARAM_ACTION_SIGNIN);

            FreeMarkerConfiguration.writeResponse(templateValues,Pages.TEMPLATE_SIGNINPAGE,resp.getWriter());
        }		
        else if(action.equals(Pages.PARAM_ACTION_SHOW_CHANGEPWD)){
            templateValues.put("errorMessage", "Change Password.");
            templateValues.put("userId", AuthFilter.getCurrentUser(req).getKeyId());            
            FreeMarkerConfiguration.writeResponse(templateValues,Pages.TEMPLATE_CHANGEPWDPAGE,resp.getWriter());
        }       		
		else if(action.equals(Pages.PARAM_ACTION_CHANGEPWD)){
		    String oldpwd =  req.getParameter(Pages.PARAM_SIGNUP_OLD_PASSWORD);
		    String newpwd =  req.getParameter(Pages.PARAM_SIGNUP_PASSWORD);
	        long userId = Long.valueOf(req.getParameter("userId"));
	        PersistenceManager pm = PMF.get().getPersistenceManager();
	        try {
	        AppUser user = pm.getObjectById(AppUser.class, userId);
	        if(!user.getPassword().equals(oldpwd)) {
	            templateValues.put("errorMessage", "Old password is not correct.");
	            templateValues.put("userId", AuthFilter.getCurrentUser(req).getKeyId());            
	            FreeMarkerConfiguration.writeResponse(templateValues,Pages.TEMPLATE_CHANGEPWDPAGE,resp.getWriter());
	        }
	        else {
	            user.setPassword(newpwd);
	            pm.makePersistent(user);
	               templateValues.put("errorMessage", "Password is changed.");
	                templateValues.put("userId", AuthFilter.getCurrentUser(req).getKeyId());            
	                FreeMarkerConfiguration.writeResponse(templateValues,Pages.TEMPLATE_CHANGEPWDPAGE,resp.getWriter());
	        }
	        } finally {
	            pm.close();
	        }
	          
	        
	          
		}
		else if(action.equals(Pages.PARAM_ACTION_SIGNUP)){
			
			String name =  req.getParameter(Pages.PARAM_SIGNUP_NAME);
			String pwd =  req.getParameter(Pages.PARAM_SIGNUP_PASSWORD);
			String email =  req.getParameter(Pages.PARAM_SIGNUP_EMAIL);
			AppUser user = new AppUser(name);
			user.setPassword(pwd);
			user.setEmail(email);
			if(isUnique(user)){
				save(user);
				AuthFilter.setRegUser(req, user);
				resp.sendRedirect(Pages.PAGE_MAIN);
			}
			else {
				templateValues.put("errorMessage", "The user has existed, please change another name ");
				templateValues.put("userName",name);
				templateValues.put("password",pwd);
				templateValues.put("email",email);
				FreeMarkerConfiguration.writeResponse(templateValues,Pages.TEMPLATE_SIGNUPPAGE , resp.getWriter());
			}
			
		}
		else if(action.equals(Pages.PARAM_ACTION_SIGNIN)){
            
            String name =  req.getParameter(Pages.PARAM_SIGNUP_NAME);
            String pwd =  req.getParameter(Pages.PARAM_SIGNUP_PASSWORD);
            AppUser dummy = new AppUser(name);
            dummy.setPassword(pwd);
            AppUser user = login(dummy);
		    if(user!=null) {
	              AuthFilter.setRegUser(req, user);
	              resp.sendRedirect(Pages.PAGE_MAIN);
		    } else {
                templateValues.put("errorMessage", "Username and password is incorrect, please change another name ");
                templateValues.put("userName",name);
                templateValues.put("password",pwd);
                FreeMarkerConfiguration.writeResponse(templateValues,Pages.TEMPLATE_SIGNINPAGE , resp.getWriter());
		    }
		}
		else if(action.equals(Pages.PARAM_ACTION_RESET)){
            String name =  req.getParameter(Pages.PARAM_SIGNUP_NAME);
            AppUser dummy = new AppUser(name);
            AppUser user = queryUser(dummy);
            if(user==null) {
                templateValues.put("errorMessage", "Username is not found.");
                templateValues.put("userName",name);
                FreeMarkerConfiguration.writeResponse(templateValues,Pages.TEMPLATE_SIGNINPAGE , resp.getWriter());
            }
            else {

                String newPassword = Base64.encode(""+Math.floor(Math.random()*100000000l));
                user.setPassword(newPassword);
                save(user);
                
                Map<String, Object> values = new HashMap<String, Object>();
                values.put("userName",name);
                values.put("newpassword",newPassword);
                StringWriter out = new StringWriter();
                FreeMarkerConfiguration.writeResponse(values,Pages.TEMPLATE_RESET_EMAIL , new PrintWriter(out));
                String body = out.toString();
                
                String subject = "Your password at"+ApplicationProperty.read(ApplicationProperty.SITE_NAME)+" is reset.";
                String sendTo = user.getEmail();
                System.out.println("body="+body);
                try {
                    MyUtils.sendEmail(sendTo, name, subject, body);
                    templateValues.put("errorMessage", "An email containinng the new password is sent to "+sendTo+", you can change password once login.");
                    templateValues.put("userName",name);
                    FreeMarkerConfiguration.writeResponse(templateValues,Pages.TEMPLATE_SIGNINPAGE , resp.getWriter());                    
                } catch (Exception e) {
                    templateValues.put("errorMessage", "Failed to send new password to "+sendTo+", please make sure it is a valid email address. Please contact site owner.");
                    templateValues.put("userName",name);
                    FreeMarkerConfiguration.writeResponse(templateValues,Pages.TEMPLATE_SIGNINPAGE , resp.getWriter());                    
                }
                
                
            }
            
		}
	}
	
	private void save(AppUser user){
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
		    pm.makePersistent(user);
		} finally {
		    pm.close();
		}
	}
	
	
	
	private Boolean isUnique(AppUser user){
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
		Query query = pm.newQuery(AppUser.class);
		query.setFilter("userName == userNameParam");
		query.declareParameters("String userNameParam");
//		query.setFilter("password == passwordParam");
//		query.declareParameters("String passwordParam");
		List<AppUser> results = (List<AppUser>) query.execute(user.getUserName());
		if(results.size()>0){
			return false;
		}
		return true;
		} finally {
		    pm.close();
		}
	}
	
	
	
	private AppUser queryUser(AppUser appUser){
        PersistenceManager pm = PMF.get().getPersistenceManager();
        try {
        Query query = pm.newQuery(AppUser.class);
        query.setFilter("userName == userNameParam");
        query.declareParameters("String userNameParam");
        List<AppUser> results = (List<AppUser>) query.execute(appUser.getUserName());
        if(results.size()==0){
            return null;
        }
        AppUser res = results.get(0);
        return res;
        } finally {
            pm.close();
        }
    }
	
	   private AppUser login(AppUser appUser){
	       
	        AppUser res = queryUser(appUser);
	        if(res==null) {
	            return null;
	        }
	        else if(res.getPassword().equals(appUser.getPassword())) {
	            return res;
	        }else {
	            return null;
	        }
	    }

}
