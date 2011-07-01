package com.appspot.twitteybot.admin;

import com.appspot.twitteybot.datastore.AppUser;
import com.appspot.twitteybot.datastore.ApplicationProperty;
import com.appspot.twitteybot.datastore.DashBoard;
import com.appspot.twitteybot.datastore.DsHelper;
import com.appspot.twitteybot.datastore.PMF;
import com.appspot.twitteybot.datastore.UserSummary;
import com.appspot.twitteybot.datastore.AppUser.PayType;
import com.appspot.twitteybot.datastore.AppUser.State;
import com.appspot.twitteybot.ui.FreeMarkerConfiguration;
import com.appspot.twitteybot.ui.Pages;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserServiceFactory;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jdo.PersistenceManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.datanucleus.util.StringUtils;

public class AdminServlet extends HttpServlet {

	private static final long serialVersionUID = 6405416403272879573L;

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	    doPost(req, resp);
//		this.wrieAdminForm(resp.getWriter(), null);
	}

	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	    String showTab = req.getParameter(Pages.PARAM_SHOW_TAB);
	    if(StringUtils.isEmpty(showTab)) {
	        showTab=Pages.PARAM_TAB_DB;
	    }
	    
		String action = req.getParameter(Pages.PARAM_ACTION);
		String uids = req.getParameter(Pages.PARAM_ADMIN_UID);
		Long uid = null;
		if(uids!=null && uids.length()>0) {
		    uid = Long.valueOf(uids);
		}
		PersistenceManager pm = null;
		
		try { 
		if (action != null && action.equalsIgnoreCase(Pages.PARAM_ACTION_ADD)) {
		    
		    // TODO validation on page with js
//		      String unitPriceStr = req.getParameter(ApplicationProperty.UNIT_PRICE);
//		      try {
//		            Double up = Double.parseDouble(unitPriceStr);
//		      } catch (Exception ex) {
//		            this.wrieAdminForm(resp.getWriter(), "Unit Price Must be a number");
//		            return;
//		      }
		    
            ApplicationProperty.write(ApplicationProperty.IS_TESTING, req
                    .getParameter(ApplicationProperty.IS_TESTING));		        
			ApplicationProperty.write(ApplicationProperty.CONSUMER_KEY, req
					.getParameter(ApplicationProperty.CONSUMER_KEY));
			ApplicationProperty.write(ApplicationProperty.CONSUMER_SECRET, req
					.getParameter(ApplicationProperty.CONSUMER_SECRET));
            ApplicationProperty.write(ApplicationProperty.SHORTENER_URL, req
                    .getParameter(ApplicationProperty.SHORTENER_URL));	
            ApplicationProperty.write(ApplicationProperty.ADMIN_EMAIL, req
                    .getParameter(ApplicationProperty.ADMIN_EMAIL));  
            ApplicationProperty.write(ApplicationProperty.ADMIN_NAME, req
                    .getParameter(ApplicationProperty.ADMIN_NAME));  
            ApplicationProperty.write(ApplicationProperty.SITE_NAME, req
                    .getParameter(ApplicationProperty.SITE_NAME));                
            ApplicationProperty.write(ApplicationProperty.UNIT_PRICE, req
                    .getParameter(ApplicationProperty.UNIT_PRICE));	
            ApplicationProperty.write(ApplicationProperty.PAYEE_ACCOUNT, req
                    .getParameter(ApplicationProperty.PAYEE_ACCOUNT));             
            
            showTab=Pages.PARAM_TAB_SETTING;
            resp.getWriter().write("Properties added<br>"+buildBackUrl(showTab));
			
			
		} else if (action != null && action.equalsIgnoreCase(Pages.PARAM_ACTION_CHANGE_STATE)) {
		    String newState = req.getParameter(Pages.PARAM_ADMIN_STATE);
		    pm = PMF.get().getPersistenceManager();
		    AppUser user = (AppUser)pm.getObjectById(AppUser.class, uid);
		    if(user!=null) {
		        user.setState(State.valueOf(newState));
		    }
		    pm.makePersistent(user);
		    
		    showTab=Pages.PARAM_TAB_USER;
		    resp.getWriter().write("User: "+user.getUserName()+"'s state changed to "+newState+". <br>"+buildBackUrl(showTab));
		    
		} else if (action != null && action.equalsIgnoreCase(Pages.PARAM_ACTION_CHANGE_PAY_TYPE)) {
		    String newPayType = req.getParameter(Pages.PARAM_ADMIN_PAY_TYPE);
            pm = PMF.get().getPersistenceManager();
            AppUser user = (AppUser)pm.getObjectById(AppUser.class, uid);
            if(user!=null) {
                user.setPayType(PayType.valueOf(newPayType));
            }
            pm.makePersistent(user);
            
            showTab=Pages.PARAM_TAB_USER;
            resp.getWriter().write("User: "+user.getUserName()+"'s payType changed to "+newPayType+". <br>"+buildBackUrl(showTab));
        } else if (action != null && action.equalsIgnoreCase(Pages.PARAM_ACTION_DELETE_USER)) {
            String userName = DsHelper.deleteUser(uid);
            showTab=Pages.PARAM_TAB_USER;
            resp.getWriter().write("User: "+userName+" is deleted. <br>"+buildBackUrl(showTab));            
		} else {
			this.wrieAdminForm(showTab, resp.getWriter(), null);
		}
		} finally {
		    if(pm!=null) {
		        // only close is enough
		        pm.close();
		    }
		}
	}
	
	private String buildBackUrl(String showTab) {
	    return "<a href=\"/admin?showTab="+showTab+"\">Back</a>";
	    
	}

	private void wrieAdminForm(String showTab, PrintWriter w, String error) {
	    String isTesting = ApplicationProperty.read(ApplicationProperty.IS_TESTING);
		String consumerKey = ApplicationProperty.read(ApplicationProperty.CONSUMER_KEY);
		String consumerSecret = ApplicationProperty.read(ApplicationProperty.CONSUMER_SECRET);
		String shortenerUrl = ApplicationProperty.read(ApplicationProperty.SHORTENER_URL);
		String adminEmail = ApplicationProperty.read(ApplicationProperty.ADMIN_EMAIL);
		String adminName = ApplicationProperty.read(ApplicationProperty.ADMIN_NAME);
		String siteName = ApplicationProperty.read(ApplicationProperty.SITE_NAME);
		String unitPrice = ApplicationProperty.read(ApplicationProperty.UNIT_PRICE);
		String payeeAccount = ApplicationProperty.read(ApplicationProperty.PAYEE_ACCOUNT);
		
		
		Map<String, Object> templateValues = new HashMap<String, Object>();
		templateValues.put(ApplicationProperty.IS_TESTING, isTesting);
		templateValues.put(ApplicationProperty.CONSUMER_KEY, consumerKey);
		templateValues.put(ApplicationProperty.CONSUMER_SECRET, consumerSecret);
		templateValues.put(ApplicationProperty.SHORTENER_URL, shortenerUrl);
		templateValues.put(ApplicationProperty.ADMIN_EMAIL, adminEmail);
		templateValues.put(ApplicationProperty.ADMIN_NAME, adminName);
		templateValues.put(ApplicationProperty.SITE_NAME, siteName);
		templateValues.put(ApplicationProperty.UNIT_PRICE, unitPrice);
		templateValues.put(ApplicationProperty.PAYEE_ACCOUNT, payeeAccount);
		
		templateValues.put("error", error);
		
		List<UserSummary> res = DsHelper.getUserSummaries();
		templateValues.put("usList", res);
		
		DashBoard db = DsHelper.getDashBoard();
	    templateValues.put("db", db);
	    
	    User user = UserServiceFactory.getUserService().getCurrentUser();
	    templateValues.put("username", user==null? "" : user.getEmail());
	    templateValues.put("logouturl", UserServiceFactory.getUserService().createLogoutURL("/admin"));
	    
	    templateValues.put("showTab", showTab);
		FreeMarkerConfiguration.writeResponse(templateValues, Pages.TEMPLATE_ADMINPAGE, w);

	}
}
