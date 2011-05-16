package com.appspot.twitteybot.ui;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import javax.jdo.Query;

import javax.jdo.PersistenceManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.appspot.twitteybot.datastore.AppUser;
import com.appspot.twitteybot.datastore.PMF;

public class SignUpManager extends HttpServlet{
	
	/**
	 * sign up an user
	 */
	private static final long serialVersionUID = 1146087434539278009L;
	private static final Logger log = Logger.getLogger(SignUpManager.class.getName());
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		this.doPost(req, resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String action = req.getParameter(Pages.PARAM_ACTION);
		Map<String, Object> templateValues = new HashMap<String, Object>();
		if(action.equals(Pages.PARAM_ACTION_SHOWSIGNUP)){
		    templateValues.put("errorMessage", "Please Sign Up.");
		    templateValues.put("action", Pages.PARAM_ACTION_SIGNUP);
			FreeMarkerConfiguration.writeResponse(templateValues,Pages.TEMPLATE_SIGNUPPAGE,resp.getWriter());
		}
		else if(action.equals(Pages.PARAM_ACTION_SHOWSIGNIN)){
		    templateValues.put("errorMessage", "Please Sign In.");
		    templateValues.put("action", Pages.PARAM_ACTION_SIGNIN);
            FreeMarkerConfiguration.writeResponse(templateValues,Pages.TEMPLATE_SIGNUPPAGE,resp.getWriter());
        }		
		else if(action.equals(Pages.PARAM_ACTION_SIGNUP)){
			AppUser user = new AppUser();
			String name =  req.getParameter(Pages.PARAM_SIGNUP_NAME);
			String pwd =  req.getParameter(Pages.PARAM_SIGNUP_PASSWORD);
			user.setUserName(name);
			user.setPassword(pwd);
			if(isUnique(user)){
				signUp(user);
				req.getSession(true).setAttribute("user", user);
				resp.sendRedirect(Pages.PAGE_MAIN);
			}
			else {
				templateValues.put("errorMessage", "The user has existed, please change another name ");
				templateValues.put("userName",name);
				templateValues.put("password",pwd);
				FreeMarkerConfiguration.writeResponse(templateValues,Pages.TEMPLATE_SIGNUPPAGE , resp.getWriter());
			}
			
		}
		else if(action.equals(Pages.PARAM_ACTION_SIGNIN)){
            AppUser user = new AppUser();
            String name =  req.getParameter(Pages.PARAM_SIGNUP_NAME);
            String pwd =  req.getParameter(Pages.PARAM_SIGNUP_PASSWORD);		    
		    if(login(user)) {
	              req.getSession(true).setAttribute("user", user);
	              resp.sendRedirect(Pages.PAGE_MAIN);
		    } else {
                templateValues.put("errorMessage", "Username and password is incorrect, please change another name ");
                templateValues.put("userName",name);
                templateValues.put("password",pwd);
                FreeMarkerConfiguration.writeResponse(templateValues,Pages.TEMPLATE_SIGNUPPAGE , resp.getWriter());
		    }
		}
	}
	
	private void signUp(AppUser user){
		PersistenceManager pm = PMF.get().getPersistenceManager();
		pm.makePersistent(user);
	}
	
	private Boolean isUnique(AppUser user){
		PersistenceManager pm = PMF.get().getPersistenceManager();
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
	}
	
	   private Boolean login(AppUser user){
	        PersistenceManager pm = PMF.get().getPersistenceManager();
	        Query query = pm.newQuery(AppUser.class);
	        query.setFilter("userName == userNameParam");
	        query.declareParameters("String userNameParam");
//	      query.setFilter("password == passwordParam");
//	      query.declareParameters("String passwordParam");
	        List<AppUser> results = (List<AppUser>) query.execute(user.getUserName());
	        if(results.size()==0){
	            return false;
	        }
	        AppUser res = results.get(0);
	        if(res.getPassword().equals(user.getPassword())) {
	            return true;
	        }else {
	            return false;
	        }
	    }

}
