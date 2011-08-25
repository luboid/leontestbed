package com.appspot.twitteybot.ui;

import com.appspot.twitteybot.datastore.AppUser;
import com.appspot.twitteybot.datastore.PMF;
import com.appspot.twitteybot.datastore.TwitterAccount;
import com.appspot.twitteybot.datastore.AppUser.State;
import com.google.appengine.api.users.User;

import java.io.IOException;
import java.util.ArrayList;
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

public class MainPage extends HttpServlet {

	private static final long serialVersionUID = 9148447220528278458L;
	private static final Logger log = Logger.getLogger(MainPage.class.getName());

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException,
			IOException {

//		User user = UserServiceFactory.getUserService().getCurrentUser();
	    AppUser appUser = AuthFilter.getCurrentUser(req);
	    
	    // TODO
	    if(appUser.getState()== State.ACTIVE) {
	        
	    }else {
	        
	    }
	    
	    User openId = appUser.getOpenId();
//		if(user==null) {
//		    user= new User("abc", "def");
//		}
		PersistenceManager pm = PMF.get().getPersistenceManager();
		log.info("Working for user " + openId.getEmail());
		Query query = pm.newQuery(TwitterAccount.class);
		query.setFilter("user == userVar");
		query.declareParameters("com.google.appengine.api.users.User userVar");
		@SuppressWarnings("unchecked")
		List<TwitterAccount> twitterAccounts = (List<TwitterAccount>) query.execute(openId);

		if (twitterAccounts == null || twitterAccounts.size() == 0) {
			twitterAccounts = new ArrayList<TwitterAccount>();
			// TODO leon: dummy
//			TwitterAccount ta = new TwitterAccount();
//			ta.setTwitterScreenName("dummy");
//			twitterAccounts.add(ta);
		}

		Map<String, Object> templateValues = new HashMap<String, Object>();
		templateValues.put(Pages.FTLVAR_ISREGUSER, String.valueOf(appUser.isRegUser()));
		templateValues.put(Pages.FTLVAR_ISUSER_ISFREE, appUser.isFree());
		templateValues.put(Pages.FTLVAR_ISUSER_BANNED, appUser.isBanned());
		templateValues.put(Pages.FTLVAR_ISUSER_SUSPENDED, AppUser.State.SUSPENDED==appUser.getState());
		templateValues.put(Pages.FTLVAR_USERNAME, openId.getEmail());
//		templateValues.put(Pages.FTLVAR_LOGOUT, UserServiceFactory.getUserService().createLogoutURL(
//				Pages.PAGE_HOME));
        templateValues.put(Pages.FTLVAR_LOGOUT, AuthFilter.createLogoutURL(Pages.PAGE_HOME, req));		
		templateValues.put(Pages.FTLVAR_TWITTER_ACCOUNTS, twitterAccounts);
		FreeMarkerConfiguration.writeResponse(templateValues, Pages.TEMPLATE_MAIN_PAGE, resp.getWriter());
	}
}
