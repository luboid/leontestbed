package com.appspot.twitteybot.ui;

public class Pages {
    
//    public static final boolean LOCAL_TEST = true;
    
    public static final String TEMPLATE_RESET_EMAIL="resetEmail.ftl";
    public static final String TEMPLATE_SIGNINPAGE="SignIn.ftl";
    public static final String TEMPLATE_SIGNUPPAGE="SignUp.ftl";
    public static final String TEMPLATE_CHANGEPWDPAGE="changePwd.ftl";
    
    public static final String TEMPLATE_CONFIRM_PAYPAL= "ConfirmPaypal.ftl";
    public static final String TEMPLATE_PAYPALBUTTON= "paypalButton.ftl";
    public static final String TEMPLATE_TXNPAGE= "ShowTransaction.ftl";
    
    public static final String PARAM_TXN_ACTION_ADD = "Add";
    public static final String PARAM_TXN_ACTION_SHOW = "Show";
    public static final String PARAM_TXN_ACTION_MERGE = "MergeTxn";
    public static final String PARAM_TXN_ACTION_CANCEL = "CancelTxn";
    public static final String PARAM_TXN_ACTION_CANCELONE = "CancelOneTxn";
    public static final String PARAM_TXN_ACTION_PAYTXN = "PayTxn";
    
    public static final String PARAM_TXN_ACTION_PAYPAL_RETURN = "PaypalReturn";
    public static final String PARAM_TXN_ACTION_PAYPAL_NOTIFY = "PaypalNotify";
    
    public static final String FTLVAR_TXN = "txnList";
    public static final String FTLVAR_TXN_MESSAGE = "message";
    public static final String FTLVAR_TXN_LEVEL = "level";
    public static final String FTLVAR_TXN_START = "start";
    public static final String FTLVAR_TXN_END = "end";
    
    
	public static final String TEMPLATE_MAIN_PAGE = "MainPage.ftl";
	public static final String TEMPLATE_STATUSPAGE = "ShowStatus.ftl";
	public static final String TEMPLATE_ADMINPAGE = "Admin.ftl";
	
	public static final String TEMPLATE_LOGIN_REQ_PAGE = "loginrequired.ftl";
	
	
	
	public static final String PARAM_SEPARATOR = "separator";
	public static final String PARAM_KEY = "key";
	public static final String PARAM_VALUE = "value";
	public static final String PARAM_TWITTER_NAME = "twitterAccount";

	public static final String PARAM_ACTION = "action";
	public static final String PARAM_ACTION_DELETE = "Delete";
	public static final String PARAM_ACTION_ADD = "Add";
	public static final String PARAM_ACTION_UPDATE = "Update";
	public static final String PARAM_ACTION_SHOW = "Show";
	public static final String PARAM_ACTION_UPLOAD = "Upload";
	public static final String PARAM_ACTION_FETCH = "fetch";
	public static final String PARAM_ACTION_FETCHTEXT = "fetchText";
	
	
	// admin
	public static final String PARAM_SHOW_TAB = "showTab";
	public static final String PARAM_TAB_DB = "0";
	public static final String PARAM_TAB_USER = "1";
	public static final String PARAM_TAB_SETTING = "2";
	public static final String PARAM_ACTION_CHANGE_STATE = "changeState";
	public static final String PARAM_ACTION_CHANGE_PAY_TYPE = "changePayType";
	public static final String PARAM_ACTION_DELETE_USER = "deleteUser";
	
	public static final String PARAM_ADMIN_UID = "uid";
	public static final String PARAM_ADMIN_STATE = "state";
	public static final String PARAM_ADMIN_PAY_TYPE = "type";
	
	// leon
	public static final String PARAM_ACTION_SHOW_TWEET_OF_TXN = "ShowTweetOfTxn";
	
	public static final String PARAM_ACTION_SIGNOUT = "signout";
	public static final String PARAM_ACTION_SIGNUP = "signup";
	public static final String PARAM_ACTION_SIGNIN = "signin";
	public static final String PARAM_ACTION_RESET = "reset";
	public static final String PARAM_ACTION_SHOW_CHANGEPWD = "showChangePwd";
	public static final String PARAM_ACTION_CHANGEPWD = "changePwd";
	
	public static final String PARAM_ACTION_SHOWSIGNUP = "showsignup";
    public static final String PARAM_ACTION_SHOWSIGNIN = "showsignin";
	
	// signup
	public static final String PARAM_SIGNUP_NAME = "sign_up_name";
	public static final String PARAM_SIGNUP_PASSWORD = "sign_up_password";
	public static final String PARAM_SIGNUP_EMAIL = "sign_up_email";
	public static final String PARAM_SIGNUP_OLD_PASSWORD = "old_password";
	
	
	public static final String PARAM_STATUS_CANADD = "item_";
	public static final String PARAM_TOTAL_ITEMS = "totalItems";
	public static final String PARAM_STATUS_UPDATE_DATE = "updatedTime_";
	public static final String PARAM_STATUS_SOURCE = "source_";
	public static final String PARAM_STATUS_CAN_DELETE = "canDelete_";
	public static final String PARAM_STATUS_STATUS = "status_";
	public static final String PARAM_STATUS_TWITTER_SCREEN = "twitterScreenName_";
	public static final String PARAM_STATUS_KEY = "key_";

	public static final String PARAM_OAUTH = "oauth";
	public static final String PARAM_OAUTH_TOKEN = "oauth_token";
	public static final String PARAM_TOKEN = "token";
	public static final String PARAM_SCREENNAME = "screenName";
	public static final String PARAM_CSVFILE = "csvFile";

	// leon
	public static final String PARAM_TXN_ID = "txnId";
	
	public static final String PARAM_START = "start";
	public static final String PARAM_END = "end";

	public static final String PAGE_HOME = "/?";
	public static final String PAGE_MAIN = "/pages/main?";
	public static final String PAGE_ADMIN = "/admin";
	public static final String PAGE_TASK_QUEUE = "/task/status";

	// leon
	public static final String FTLVAR_TWITTER_TXN = "TheTxn";
	
	public static final String FTLVAR_TWITTER_STATUS = "statuses";
	public static final String FTLVAR_TWITTER_ACCOUNTS = "accounts";
	public static final String FTLVAR_USERNAME = "username";
	public static final String FTLVAR_ISTESTING = "isTest";
	public static final String FTLVAR_ISREGUSER = "isRegUser";
	public static final String FTLVAR_ISUSER_ISFREE = "isFree";
	public static final String FTLVAR_ISUSER_BANNED = "banned";
	public static final String FTLVAR_ISUSER_SUSPENDED = "suspended";
	public static final String FTLVAR_LOGOUT = "logoutUrl";
	public static final String FTLVAR_MESSAGE = "message";
	public static final String FTLVAR_LEVEL = "level";
	public static final String FTLVAR_START = "start";
	public static final String FTLVAR_END = "end";

	public static final String	COOKIE_TIMEZONE	= "timeZone";
}