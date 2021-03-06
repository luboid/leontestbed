package com.appspot.twitteybot.ui;

import com.appspot.twitteybot.datastore.AppUser;
import com.appspot.twitteybot.datastore.DsHelper;
import com.appspot.twitteybot.datastore.PMF;
import com.appspot.twitteybot.datastore.Transact;
import com.appspot.twitteybot.datastore.TwitterStatus;
import com.appspot.twitteybot.datastore.AppUser.PayType;
import com.appspot.twitteybot.pay.PaypalStandard;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.users.User;
import com.sun.syndication.feed.synd.SyndEntry;
import com.sun.syndication.feed.synd.SyndFeed;
import com.sun.syndication.io.FeedException;
import com.sun.syndication.io.SyndFeedInput;
import freemarker.template.TemplateException;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DateFormat;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.datanucleus.util.StringUtils;



/**
 * Responsible for parsing a file that is uploaded with the status messages.
 * Parses the file and presents it to the user to allow modification
 */
public class StatusManager extends BaseServlet {

	private static final Logger log = Logger.getLogger(StatusManager.class.getName());
	private static final long serialVersionUID = 1551252388567429753L;
	private static final int DEFAULT_TIME_INCREMENT = 60;

	private static final String LEVEL_INFO = "info";
	private static final String LEVEL_ERROR = "error";
	private static final String LEVEL_WARN = "warn";

	
	public static final String DATE_FORMAT = "MM/dd/yyyy";
	public static final String TIME_FORMAT = "HH:mm";

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		this.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String action = req.getParameter(Pages.PARAM_ACTION);
		PersistenceManager pm = PMF.get().getPersistenceManager();
		pm.currentTransaction().begin();
		String twitterScreenName = req.getParameter(Pages.PARAM_SCREENNAME);
		if(StringUtils.isEmpty(twitterScreenName)) {
		    throw new RuntimeException("twitterScreenName is empty, sth wrong...");
		}
		
		try {
		if (action == null) {
			resp.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
		} else if (action.equalsIgnoreCase(Pages.PARAM_ACTION_UPLOAD)) {
			this.processUpload(req, resp, pm);
		} else if (action.equalsIgnoreCase(Pages.PARAM_ACTION_FETCH)) {
			this.processFetch(req, resp, pm);
        } else if (action.equalsIgnoreCase(Pages.PARAM_ACTION_FETCHTEXT)) {
            this.processFetchText(req, resp, pm);			
		} else if (action.equalsIgnoreCase(Pages.PARAM_ACTION_ADD)) {
//			this.processAdd(req, resp);
//		    throw new RuntimeException("add txn should not come here");
		    req.getRequestDispatcher("/pages/transaction").forward(req, resp);
		} else if (action.equalsIgnoreCase(Pages.PARAM_ACTION_DELETE)) {
		    this.processUpdate(req, resp, true, pm);
		} else if (action.equalsIgnoreCase(Pages.PARAM_ACTION_UPDATE)) {
			this.processUpdate(req, resp, false, pm);
		} else if (action.equalsIgnoreCase(Pages.PARAM_ACTION_SHOW)) {
			this.processShow(req, resp, pm);
        } else if (action.equalsIgnoreCase(Pages.PARAM_ACTION_SHOW_TWEET_OF_TXN)) {
            this.processShowTweetsOfTxn(req, resp, pm);			
		} else {
			resp.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
		}
		} finally {
		    if(pm!=null) {
		        pm.currentTransaction().commit();
		        pm.close();
		    }
		}
	}

	private void processShow(HttpServletRequest req, HttpServletResponse resp, PersistenceManager pm) throws IOException {
		
		long start = 0;
		long end = PAGE_SIZE;
		try {
			start = Long.parseLong(req.getParameter(Pages.PARAM_START));
		} catch (NumberFormatException e) {
		}
		try {
			end = Long.parseLong(req.getParameter(Pages.PARAM_END));
		} catch (NumberFormatException e) {
		}
		String screenName = req.getParameter(Pages.PARAM_SCREENNAME);
		
		// get status of those paid txn
		// TODO to exclude those sent?
		User user = AuthFilter.getCurrentUser(req).getOpenId();
//		List<TwitterStatus> statuss = new ArrayList<TwitterStatus>();
//		List<Transact> paidTxns = DsHelper.getTransactList(true,screenName, pm, -1, -1, user);
//		for(Transact txn : paidTxns) {
//		    List<TwitterStatus> s = DsHelper.getTwitterStatus(txn.getKeyId(), pm, start, end);
//		    statuss.addAll(s);
//		}
		
		List<TwitterStatus> statuss = DsHelper.getScheduledTwitterStatus(screenName, pm, start, end, user);
        for(TwitterStatus ts : statuss) {
            log.info("status="+ts.getStatus());
        }
		// TODO make it a sing query otherwise start/end won't work
		this.constructResponse(req, null, statuss,
				"Showing " + (end - start) + " tweets", LEVEL_INFO, resp, start, end);

	}
	

    private void processShowTweetsOfTxn(HttpServletRequest req, HttpServletResponse resp, PersistenceManager pm) throws IOException {
        long start = getStart(req);
        long end = getEnd(req);
        long txnId = getTxnId(req);
        Transact txn = null;
        if(txnId!=NO_TXN) {
            txn = DsHelper.getTransact(txnId, pm);
            try {
                PaypalStandard.renderPaypalButton(txn, req.getServerName());
            } catch (TemplateException e) {
                log.log(Level.WARNING, "PaypalStandard.renderPaypalButton", e);
                e.printStackTrace(resp.getWriter());
            }            
        }
        this.constructResponse(req, txn, DsHelper.getTwitterStatus(txnId, pm, start, end),
                "Showing " + (end - start) + " tweets", LEVEL_INFO, resp, start, end);
    }
    
	private void processUpdate(HttpServletRequest req, HttpServletResponse resp, boolean delete, PersistenceManager pm) throws IOException, ServletException {
	    
	    long txnId = getTxnId(req);
	    boolean isPaid = txnId==NO_TXN;
	    
	    String twitterScreenName = req.getParameter(Pages.PARAM_SCREENNAME);
        long start = getStart(req);
        long end = getEnd(req);
        
		int totalItems = Integer.parseInt(req.getParameter(Pages.PARAM_TOTAL_ITEMS));
		AppUser appUser = AuthFilter.getCurrentUser(req);
		User user = appUser.getOpenId();
		
		List<TwitterStatus> twitterStatuses = new ArrayList<TwitterStatus>();
		List<TwitterStatus> toAddStatuses = new ArrayList<TwitterStatus>();
		String message = null;
		String level = LEVEL_INFO;
		for (int i = 0; i <= totalItems; i++) {
			if (this.getBoolFromParam(req.getParameter(Pages.PARAM_STATUS_CANADD + i), "on")) {
				String id = req.getParameter(Pages.PARAM_STATUS_KEY + i);
				TwitterStatus twitterStatus = null;
				if (id.equals("")) {
					twitterStatus = new TwitterStatus();
					twitterStatus.setUser(AuthFilter.getCurrentUser(req).getOpenId());
					twitterStatus.setCanDelete(true);
					twitterStatus.setTwitterScreenName(twitterScreenName);
					twitterStatus.setTransactionId(txnId);
					if(isPaid) {
					    // well, this may not be allowed (to break and gen new status after payment)
					    twitterStatus.setState(TwitterStatus.State.SCHEDULED);
					}else {
					    // by default is UNPAID state
					}
					toAddStatuses.add(twitterStatus);
				} else {
					Key key = KeyFactory.createKey(TwitterStatus.class.getSimpleName(),
							Long.parseLong(id.replace(",", "")));
					twitterStatus = pm.getObjectById(TwitterStatus.class, key);
					twitterStatuses.add(twitterStatus);
				}
				if (twitterStatus != null && user.getEmail().equals(twitterStatus.getUser().getEmail())) {
					if (!delete) {
						try {
							twitterStatus.setTime(req.getParameter(Pages.PARAM_STATUS_UPDATE_DATE + i));
						} catch (RuntimeException e) {
							message = "There were errors parsing the time for tweets. Some tweets were not updated.";
							level = LEVEL_WARN;
							continue;
						}
						twitterStatus.setSource(req.getParameter(Pages.PARAM_STATUS_SOURCE + i));
						twitterStatus.setStatus(req.getParameter(Pages.PARAM_STATUS_STATUS + i));
						
//						pm.makePersistent(twitterStatus);
					}else {
//					    pm.deletePersistent(twitterStatus);
					}
				}
			}
		}

		
		pm.makePersistentAll(toAddStatuses);
		if (delete) {
			message = twitterStatuses.size() + " Tweets successfully deleted";
			pm.deletePersistentAll(twitterStatuses);
		} else {
			if (message == null) {
				message = twitterStatuses.size() + " Tweets successfully updated";
				if (toAddStatuses.size() > 0) {
					message += ", " + toAddStatuses.size() + " Tweets added.";
				}
			}
			pm.makePersistentAll(twitterStatuses);
		}
		

		
		
        if(isPaid) {
            // see processShow
            List<TwitterStatus> statuss = DsHelper.getScheduledTwitterStatus(twitterScreenName, pm, start, end, user);
            for(TwitterStatus ts : statuss) {
                log.info("status="+ts.getStatus());
            }
            // TODO make it a sing query otherwise start/end won't work
            this.constructResponse(req, null, statuss,
                    message, LEVEL_INFO, resp, start, end);
            
        }else {
            // recalculate this txn
            if(toAddStatuses.size()>0 || delete) {
                // cost more money...
                recalculateTxn(appUser, txnId, pm);
            }
            // see processShowTweetsOfTxn(req,resp, pm);
            Transact txn = DsHelper.getTransact(txnId, pm);
            try {
                PaypalStandard.renderPaypalButton(txn, req.getServerName());
            } catch (TemplateException e) {
                log.log(Level.WARNING, "PaypalStandard.renderPaypalButton", e);
                e.printStackTrace(resp.getWriter());
            } 
            this.constructResponse(req, txn, DsHelper.getTwitterStatus(txnId, pm, start, end),
                    message, LEVEL_INFO, resp, start, end);
        }


		
	}

	private void recalculateTxn(AppUser appUser, long txnId, PersistenceManager pm) {
	    try {
	        Transact transact = DsHelper.getTransact(txnId, pm);
	        // TODO get size via query
	        List<TwitterStatus> list = DsHelper.getTwitterStatus(txnId, pm, -1, -1);
	        int size = list.size();
	        transact.setNumberOfStatus(size);
	        transact.setAmount(PayType.FREE==appUser.getPayType()? 0 : transact.getUnitPrice()*size);
	        pm.makePersistent(transact);
	        
	    } catch (Exception e){
	        log.log(Level.SEVERE, "recalculateTxn", e);
	    }
	}
    private void processFetchText(HttpServletRequest req, HttpServletResponse resp, PersistenceManager pm) throws IOException {
        String twitterScreenName = req.getParameter(Pages.PARAM_SCREENNAME);
        String fileLocation = req.getParameter(Pages.PARAM_STATUS_SOURCE);
        String message = null;
        String level = LEVEL_INFO;
        User user = AuthFilter.getCurrentUser(req).getOpenId();
        Date startDate = new Date();
        List<TwitterStatus> statuses = new ArrayList<TwitterStatus>();
        BufferedReader reader= null;
        try {
            URL url = new URL(fileLocation);
            // TODO encoding?
            reader = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
          String line;
          int increment = 0;
          while ((line = reader.readLine()) != null) {
              Calendar cal = Calendar.getInstance();
              cal.setTime(startDate);
              cal.add(Calendar.MINUTE, increment += DEFAULT_TIME_INCREMENT);
              statuses.add(new TwitterStatus(user, twitterScreenName, fileLocation, cal.getTime(), line, true));
          }
    
        } catch (MalformedURLException e) {
            message = "Invalid File location";
            level = LEVEL_ERROR;
            log.log(Level.SEVERE, "Invalid URL " + fileLocation);
        } catch (IOException e) {
            message = "Could not fetch contents from " + fileLocation;
            level = LEVEL_ERROR;
            log.log(Level.SEVERE, "Reading Error from location  " + fileLocation);
        } finally {
            if(reader!=null) {
                try {
                    reader.close();
                } catch (Exception e) {
                }
            }
        }
//      if (message != null) {
//          message = "Please select the tweets that you would like to schedule and then click on Add";
//      }
        this.constructResponse(req, statuses, message, level, resp);
    }
	private void processFetch(HttpServletRequest req, HttpServletResponse resp, PersistenceManager pm) throws IOException {
		String twitterScreenName = req.getParameter(Pages.PARAM_SCREENNAME);
		String fileLocation = req.getParameter(Pages.PARAM_STATUS_SOURCE);
		String message = null;
		String level = LEVEL_INFO;
		User user = AuthFilter.getCurrentUser(req).getOpenId();
		Date startDate = new Date();
		List<TwitterStatus> statuses = new ArrayList<TwitterStatus>();
		BufferedReader reader= null;
		try {
			URL url = new URL(fileLocation);
			// TODO encoding?
			reader = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
			
            SyndFeed sf = new SyndFeedInput().build(reader);
            List l = sf.getEntries();
            int increment = 0;            
            String line;            
            for(Object o : l) {
                SyndEntry item = (SyndEntry)o;
                // TODO
                line = item.getTitle()+" ("+MyUtils.getShortUrl(item.getLink())+")";
                Calendar cal = Calendar.getInstance();
                cal.setTime(startDate);
                cal.add(Calendar.MINUTE, increment += DEFAULT_TIME_INCREMENT);
                statuses.add(new TwitterStatus(user, twitterScreenName, fileLocation, cal.getTime(), line, true));                
            }

		} catch (FeedException e) {
            message = "Failed to parse RSS or ATOM";
            level = LEVEL_ERROR;
            log.log(Level.SEVERE, "Invalid RSS or ATOM " + fileLocation+", error="+e.getMessage());		    
		} catch (MalformedURLException e) {
			message = "Invalid File location";
			level = LEVEL_ERROR;
			log.log(Level.SEVERE, "Invalid URL " + fileLocation);
		} catch (IOException e) {
			message = "Could not fetch contents from " + fileLocation;
			level = LEVEL_ERROR;
			log.log(Level.SEVERE, "Reading Error from location  " + fileLocation);
		} finally {
		    if(reader!=null) {
                try {
                    reader.close();
                } catch (Exception e) {
                }
		    }
		}
//		if (message != null) {
//			message = "Please select the tweets that you would like to schedule and then click on Add";
//		}
		this.constructResponse(req, statuses, message, level, resp);
	}

	private void processUpload(HttpServletRequest req, HttpServletResponse resp, PersistenceManager pm) throws IOException {
		String twitterScreenName = req.getParameter(Pages.PARAM_SCREENNAME);
		boolean isCSVFile = req.getParameter(Pages.PARAM_CSVFILE) != null ? true : false;
		ServletFileUpload upload = new ServletFileUpload();
		String separator = "\n";
		User user = AuthFilter.getCurrentUser(req).getOpenId();
		Date startDate = new Date();
		String message = null, level = LEVEL_INFO;
		List<TwitterStatus> statuses = new ArrayList<TwitterStatus>();

		try {
			FileItemIterator iterator = upload.getItemIterator(req);
			while (iterator.hasNext()) {
				FileItemStream item = iterator.next();
				InputStream stream = item.openStream();
				if (!item.isFormField()) {
					int len;
					byte[] buffer = new byte[8192];
					ByteArrayOutputStream byteStream = new ByteArrayOutputStream();
					while ((len = stream.read(buffer, 0, buffer.length)) != -1) {
						byteStream.write(buffer, 0, len);
					}
					String[] statusArray = byteStream.toString().split(separator);
					DateFormat dateFormat = new SimpleDateFormat(StatusManager.DATE_FORMAT);
					DateFormat timeFormat = new SimpleDateFormat(StatusManager.TIME_FORMAT);
					dateFormat.setLenient(true);
					Calendar cal = Calendar.getInstance();
					cal.setTime(startDate);
					int browserTimeZoneOffset = this.getBrowserTimeZone(req);
					for (String status : statusArray) {
						if (isCSVFile) {
							String[] parts = status.split(",", 3);
							try {
								Date datePart = dateFormat.parse(parts[0], new ParsePosition(0));
								if (datePart != null) {
									cal.setTime(datePart);
								}
								Date timePart = timeFormat.parse(parts[1], new ParsePosition(0));
								System.out.println(timePart.toString() + " >>> ");
								if (timePart != null) {
									Calendar timeCal = Calendar.getInstance();
									timeCal.setTime(timePart);
									cal.set(Calendar.HOUR_OF_DAY, timeCal.get(Calendar.HOUR_OF_DAY));
									cal.set(Calendar.MINUTE, timeCal.get(Calendar.MINUTE));
									cal.add(Calendar.MINUTE, browserTimeZoneOffset);
								}
								status = parts[parts.length - 1];
							} catch (ArrayIndexOutOfBoundsException e) {
								message = "Some lines in the file that you uploaded could not be parsed";
								level = LEVEL_WARN;
								log.log(Level.WARNING, "Could not parse line " + status);
							}
						} else {
							cal.add(Calendar.MINUTE, DEFAULT_TIME_INCREMENT);
						}
						statuses.add(new TwitterStatus(user, twitterScreenName, item.getName(), cal.getTime(), status,
								true));
					}
					log.log(Level.INFO, "Added " + statuses.size() + "tweets from " + item.getName());
				}
			}
		} catch (FileUploadException e) {
			log.log(Level.SEVERE, "", e);
			e.printStackTrace(resp.getWriter());
			message = "There was a problem in uploading the file";
			level = LEVEL_ERROR;
		}
//		if (message == null) {
//			message = "Please select the tweets that you would like to schedule and then click on Add";
//		}
		this.constructResponse(req, statuses, message, level, resp);
	}

	private int getBrowserTimeZone(HttpServletRequest req) {
		Cookie[] cookies = req.getCookies();
		int result = 0;
		for (Cookie cookie : cookies) {
			if (cookie.getName().equals(Pages.COOKIE_TIMEZONE)) {
				try {
					result = Integer.parseInt(cookie.getValue());
					break;
				} catch (NumberFormatException e) {
					log.log(Level.WARNING, "Could not parse timezeon " + cookie.getValue());
				}
			}
		}
		return result;
	}

	private void constructResponse(HttpServletRequest req, Transact txn, List<TwitterStatus> list, String message, String level, HttpServletResponse resp,
			long start, long end) throws IOException {
	    
	    Map<String, Object> templateValues = new HashMap<String, Object>();
	    if(txn!=null) {
	        templateValues.put(Pages.FTLVAR_TWITTER_TXN, txn);
	    }
	    
	    AppUser appUser = AuthFilter.getCurrentUser(req);
	    templateValues.put(Pages.FTLVAR_ISUSER_BANNED, appUser.isBanned());
		templateValues.put(Pages.FTLVAR_TWITTER_STATUS, list);
		templateValues.put(Pages.FTLVAR_LEVEL, level);
		templateValues.put(Pages.FTLVAR_START, start);
		templateValues.put(Pages.FTLVAR_END, start + list.size());
		templateValues.put(Pages.FTLVAR_MESSAGE, message);
		FreeMarkerConfiguration.writeResponse(templateValues, Pages.TEMPLATE_STATUSPAGE, resp.getWriter());
	}

    private void constructResponse(HttpServletRequest req, List<TwitterStatus> list, String message, String level, HttpServletResponse resp)
        throws IOException {
        this.constructResponse(req, null, list, message, level, resp, 0, PAGE_SIZE);
    }
	
	

//    private List<TwitterStatus> getTwitterStatus(String screenName, PersistenceManager pm, User user) {
//        return DsHelper.getTwitterStatus(screenName, pm, 0, PAGE_SIZE, user);
//    }

	private boolean getBoolFromParam(String param, String trueValue) {
		if (param != null && param.equals(trueValue)) {
			return true;
		} else {
			return false;
		}
	}
}
