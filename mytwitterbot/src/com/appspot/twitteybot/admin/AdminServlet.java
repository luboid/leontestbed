package com.appspot.twitteybot.admin;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.jdo.PersistenceManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.appspot.twitteybot.datastore.ApplicationProperty;
import com.appspot.twitteybot.datastore.PMF;
import com.appspot.twitteybot.ui.FreeMarkerConfiguration;
import com.appspot.twitteybot.ui.Pages;

public class AdminServlet extends HttpServlet {

	private static final long serialVersionUID = 6405416403272879573L;

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		this.wrieAdminForm(resp.getWriter(), null);
	}

	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String action = req.getParameter(Pages.PARAM_ACTION);
		
		if (action != null && action.equalsIgnoreCase(Pages.PARAM_ACTION_ADD)) {
		    
		    // TODO validation on page with js
//		      String unitPriceStr = req.getParameter(ApplicationProperty.UNIT_PRICE);
//		      try {
//		            Double up = Double.parseDouble(unitPriceStr);
//		      } catch (Exception ex) {
//		            this.wrieAdminForm(resp.getWriter(), "Unit Price Must be a number");
//		            return;
//		      }
		        
			ApplicationProperty.write(ApplicationProperty.CONSUMER_KEY, req
					.getParameter(ApplicationProperty.CONSUMER_KEY));
			ApplicationProperty.write(ApplicationProperty.CONSUMER_SECRET, req
					.getParameter(ApplicationProperty.CONSUMER_SECRET));
            ApplicationProperty.write(ApplicationProperty.UNIT_PRICE, req
                    .getParameter(ApplicationProperty.UNIT_PRICE));	
            ApplicationProperty.write(ApplicationProperty.PAYEE_ACCOUNT, req
                    .getParameter(ApplicationProperty.PAYEE_ACCOUNT));             
			resp.getWriter().write("Properties added");
		} else {
			this.wrieAdminForm(resp.getWriter(), null);
		}
	}

	private void wrieAdminForm(PrintWriter w, String error) {
		String consumerKey = ApplicationProperty.read(ApplicationProperty.CONSUMER_KEY);
		String consumerSecret = ApplicationProperty.read(ApplicationProperty.CONSUMER_SECRET);
		String unitPrice = ApplicationProperty.read(ApplicationProperty.UNIT_PRICE);
		String payeeAccount = ApplicationProperty.read(ApplicationProperty.PAYEE_ACCOUNT);
		Map<String, Object> templateValues = new HashMap<String, Object>();
		templateValues.put(ApplicationProperty.CONSUMER_KEY, consumerKey);
		templateValues.put(ApplicationProperty.CONSUMER_SECRET, consumerSecret);
		templateValues.put(ApplicationProperty.UNIT_PRICE, unitPrice);
		templateValues.put(ApplicationProperty.PAYEE_ACCOUNT, payeeAccount);
		
		templateValues.put("error", error);
		FreeMarkerConfiguration.writeResponse(templateValues, Pages.TEMPLATE_ADMINPAGE, w);

	}
}
