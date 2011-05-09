package com.appspot.twitteybot.pay;

import com.paypal.sdk.core.nvp.NVPDecoder;
import com.paypal.sdk.core.nvp.NVPEncoder;
import com.paypal.sdk.exceptions.PayPalException;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.StringTokenizer;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class PaypalPayment extends Pay {
	/**
	 * 
	 */
    
        private static final Logger log = Logger.getLogger(PaypalPayment.class.getName());
    
	    private String gv_APIUserName = "zouljs_api1.gmail.com";
	    private String gv_APIPassword = "VAP2YMLNEHWT4ZZR";
	    private String gv_APISignature = "AWzhH6wDJyDw0qOKzLtZlz5PeS4KAKIzhhcgcgE7kf6q3KD1QgNp2-cD";

	    private String gv_APIEndpoint = "https://api-3t.paypal.com/nvp";
	    private String PAYPAL_URL = "https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=";
	    private String  gv_BNCode = "PP-ECWizard";

	    private String  gv_Version = "2.3";
	    
	    String returnURL = "http://www.tweeteybot.appspot.com/pages/main";
	    String cancelURL = "http://www.tweeteybot.appspot.com/pages/main";

	    @Override
		protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
			this.doPost(req, resp);
		}
	    
	    @Override
		protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	        
	        String contextPath = req.getContextPath();
	        String serverName = req.getServerName();
	        int port = req.getServerPort();
	        log.info("contextPath="+contextPath+", serverName="+serverName+", port="+port);
	            
	        // Use "request" to read incoming HTTP headers (e.g. cookies)
	        // and HTML form data (e.g. data the user entered and submitted)
	
	        // Use "response" to specify the HTTP response line and headers
	        // (e.g. specifying the content type, setting cookies).
	
	        ///PrintWriter out = response.getWriter();
	        // Use "out" to send content to browser
	        ///  out.println("Hello World");
	
	
	        HttpSession session = req.getSession(true);
	
	        /*
	        '-------------------------------------------
	        ' The paymentAmount is the total value of
	        ' the shopping cart, that was set
	        ' earlier in a session variable
	        ' by the shopping cart page
	        '-------------------------------------------
	        */
	
	        //String paymentAmount = (String) session.getAttribute("Payment_Amount");
	        String paymentAmount = (String) req.getParameter("Payment_Amount");
	
	
	        /*
	        '------------------------------------
	        ' The returnURL is the location where buyers return to when a
	        ' payment has been succesfully authorized.
	        '
	        ' This is set to the value entered on the Integration Assistant
	        '------------------------------------
	        */
	
	        String returnURL = " http://"+serverName+"/pages/paypal?action=";
	
	        /*
	        '------------------------------------
	        ' The cancelURL is the location buyers are sent to when they hit the
	        ' cancel button during authorization of payment during the PayPal flow
	        '
	        ' This is set to the value entered on the Integration Assistant
	        '------------------------------------
	        */
	        String cancelURL = "http://"+serverName+"/OrderConfirmPage.xxx";
	
	        /*
	        '------------------------------------
	        ' Calls the SetExpressCheckout API call
	        '
	        ' The CallShortcutExpressCheckout function is defined in the file PayPalFunctions.asp,
	        ' it is included at the top of this file.
	        '-------------------------------------------------
	        */
	        NVPDecoder nvp = CallShortcutExpressCheckout (paymentAmount, returnURL, cancelURL);
	        String strAck = nvp.get("ACK").toString();
	        if(strAck !=null && strAck.equalsIgnoreCase("Success"))
	        {
	            session.setAttribute("token", nvp.get("TOKEN").toString());
	            //' Redirect to paypal.com
	            resp.sendRedirect("https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token="+ nvp.get("TOKEN").toString());
	        }
	        else
	        {
	            // Display a user friendly Error on the page using any of the following error information returned by PayPal
	
	            String ErrorCode = nvp.get("L_ERRORCODE0").toString();
	            String ErrorShortMsg = nvp.get("L_SHORTMESSAGE0").toString();
	            String ErrorLongMsg = nvp.get("L_LONGMESSAGE0").toString();
	            String ErrorSeverityCode = nvp.get("L_SEVERITYCODE0").toString();
	        }


	}



	/*********************************************************************************
	  * CallShortcutExpressCheckout: Function to perform the SetExpressCheckout API call
	  *
	  * Inputs:
	  *		paymentAmount:  	Total value of the shopping cart
	  *		currencyCodeType: 	Currency code value the PayPal API
	  *		paymentType: 		paymentType has to be one of the following values: Sale or Order or Authorization
	  *		returnURL:			the page where buyers return to after they are done with the payment review on PayPal
	  *		cancelURL:			the page where buyers return to when they cancel the payment review on PayPal
	  *
	  * Output: Returns a HashMap object containing the response from the server.
	*********************************************************************************/
	public NVPDecoder CallShortcutExpressCheckout( String paymentAmount, String returnURL, String cancelURL)
	{

		/*
		'------------------------------------
		' The currencyCodeType and paymentType 
		' are set to the selections made on the Integration Assistant 
		'------------------------------------
		*/

		String currencyCodeType = "USD";
		String paymentType = "Sale";

	    /*
	    Construct the parameter string that describes the PayPal payment
	    the varialbes were set in the web form, and the resulting string
	    is stored in $nvpstr
	    */
	    String nvpstr = "&Amt=" + paymentAmount + "&PAYMENTACTION=" + paymentType + "&RETURNURL=" + URLEncoder.encode( returnURL ) + "&CANCELURL=" + URLEncoder.encode( cancelURL ) + "&CURRENCYCODE=" + currencyCodeType;

	    /*
	    Make the call to PayPal to get the Express Checkout token
	    If the API call succeded, then redirect the buyer to PayPal
	    to begin to authorize payment.  If an error occured, show the
	    resulting errors
	    */

	    NVPDecoder nvp;
		try {
			nvp = httpcall("SetExpressCheckout");
			String strAck = nvp.get("ACK").toString();
		    if(strAck !=null && strAck.equalsIgnoreCase("Success"))
		    {
		        return nvp;
		    }
		} catch (PayPalException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    

	    return null;
	}

	/*********************************************************************************
	  * CallMarkExpressCheckout: Function to perform the SetExpressCheckout API call
	  *
	  * Inputs:
	  *		paymentAmount:  	Total value of the shopping cart
	  *		currencyCodeType: 	Currency code value the PayPal API
	  *		paymentType: 		paymentType has to be one of the following values: Sale or Order or Authorization
	  *		returnURL:			the page where buyers return to after they are done with the payment review on PayPal
	  *		cancelURL:			the page where buyers return to when they cancel the payment review on PayPal
	  *		shipToName:		the Ship to name entered on the merchant's site
	  *		shipToStreet:		the Ship to Street entered on the merchant's site
	  *		shipToCity:			the Ship to City entered on the merchant's site
	  *		shipToState:		the Ship to State entered on the merchant's site
	  *		shipToCountryCode:	the Code for Ship to Country entered on the merchant's site
	  *		shipToZip:			the Ship to ZipCode entered on the merchant's site
	  *		shipToStreet2:		the Ship to Street2 entered on the merchant's site
	  *		phoneNum:			the phoneNum  entered on the merchant's site
	  *
	  * Output: Returns a HashMap object containing the response from the server.
	*********************************************************************************/
	public HashMap CallMarkExpressCheckout( String paymentAmount, String returnURL, String cancelURL, String shipToName, String 										shipToStreet, String shipToCity, String shipToState,
	                                        String shipToCountryCode, String shipToZip, String shipToStreet2, String phoneNum)
	{
		/*
		'------------------------------------
		' The currencyCodeType and paymentType 
		' are set to the selections made on the Integration Assistant 
		'------------------------------------
		*/
		String currencyCodeType = "USD";
		String paymentType = "Sale";

	    /*
	    Construct the parameter string that describes the PayPal payment
	    the varialbes were set in the web form, and the resulting string
	    is stored in $nvpstr
	    */
	    String  nvpstr = "ADDROVERRIDE=1&Amt=" + paymentAmount + "&PAYMENTACTION=" + paymentType;
	    nvpstr=nvpstr.concat("&CURRENCYCODE=" + currencyCodeType + "&ReturnUrl=" + URLEncoder.encode( returnURL  ) + "&CANCELURL=" + 	
		URLEncoder.encode( cancelURL ));
		
	    nvpstr=nvpstr.concat( "&SHIPTONAME=" + shipToName + "&SHIPTOSTREET=" + shipToStreet + "&SHIPTOSTREET2=" + shipToStreet2);
	    nvpstr=nvpstr.concat("&SHIPTOCITY=" + shipToCity + "&SHIPTOSTATE=" + shipToState + "&SHIPTOCOUNTRYCODE=" + shipToCountryCode);
	    nvpstr=nvpstr.concat("&SHIPTOZIP=" + shipToZip + "&PHONENUM" + phoneNum);

	    /*
	    Make the call to PayPal to set the Express Checkout token
	    If the API call succeded, then redirect the buyer to PayPal
	    to begin to authorize payment.  If an error occured, show the
	    resulting errors
	    */

	    HashMap nvp;
		try {
			nvp = httpcall("SetExpressCheckout", nvpstr);
			 String strAck = nvp.get("ACK").toString();
			    if(strAck !=null && !(strAck.equalsIgnoreCase("Success") || strAck.equalsIgnoreCase("SuccessWithWarning")))
			    {
			        return nvp;
			    }
		} catch (PayPalException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	   

		return null;
	}


	/*********************************************************************************
	  * GetShippingDetails: Function to perform the GetExpressCheckoutDetails API call
	  *
	  * Inputs:  None
	  *
	  * Output: Returns a HashMap object containing the response from the server.
	*********************************************************************************/
	public HashMap GetShippingDetails( String token)
	{
	    /*
	    Build a second API request to PayPal, using the token as the
	    ID to get the details on the payment authorization
	    */

	    String nvpstr= "&TOKEN=" + token;

	   /*
	    Make the API call and store the results in an array.  If the
	    call was a success, show the authorization details, and provide
	    an action to complete the payment.  If failed, show the error
	    */

	    HashMap nvp;
		try {
			nvp = httpcall("GetExpressCheckoutDetails", nvpstr);
			 String strAck = nvp.get("ACK").toString();
			    if(strAck !=null && !(strAck.equalsIgnoreCase("Success") || strAck.equalsIgnoreCase("SuccessWithWarning")))
			    {
			        return nvp;
			    }
		} catch (PayPalException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	   
	    return null;
	}

	/*********************************************************************************
	  * GetShippingDetails: Function to perform the DoExpressCheckoutPayment API call
	  *
	  * Inputs:  None
	  *
	  * Output: Returns a HashMap object containing the response from the server.
	*********************************************************************************/
	public HashMap ConfirmPayment( String token, String payerID, String finalPaymentAmount, String serverName)
	{

		/*
		'------------------------------------
		' The currencyCodeType and paymentType 
		' are set to the selections made on the Integration Assistant 
		'------------------------------------
		*/
		String currencyCodeType = "USD";
		String paymentType = "Sale";

	  /*
	    '----------------------------------------------------------------------------
	    '----	Use the values stored in the session from the previous SetEC call
	    '----------------------------------------------------------------------------
	    */
	    String nvpstr  = "&TOKEN=" + token + "&PAYERID=" + payerID + "&PAYMENTACTION=" + paymentType + "&AMT=" + finalPaymentAmount;
		
	    nvpstr = nvpstr + "&CURRENCYCODE=" + currencyCodeType + "&IPADDRESS=" + serverName;

	 /*
	    Make the call to PayPal to finalize payment
	    If an error occured, show the resulting errors
	  */
	    HashMap nvp;
		try {
			nvp = httpcall("DoExpressCheckoutPayment", nvpstr);
			  String strAck = nvp.get("ACK").toString();
			    if(strAck !=null && !(strAck.equalsIgnoreCase("Success") || strAck.equalsIgnoreCase("SuccessWithWarning")))
			    {
			        return nvp;
			    }
		} catch (PayPalException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	  
	    return null;
	    
	}


	/*********************************************************************************
	  * httpcall: Function to perform the API call to PayPal using API signature
	 * @throws PayPalException 
	  * 	@ methodName is name of API  method.
	  * 	@ nvpStr is nvp string.
	  * returns a NVP string containing the response from the server.
	*********************************************************************************/
	public HashMap httpcall( String methodName, String nvpStr) throws PayPalException
	{

	    String version = "2.3";
	    String agent = "Mozilla/4.0";
	    String respText = "";
	    String currencyCodeType = "USD";
		String paymentType = "Sale";
		String paymentAmount = "100";
		HashMap nvp = null;

	    //deformatNVP( nvpStr );
	    String encodedData = "METHOD=" + methodName + "&VERSION=" + gv_Version + "&PWD=" + gv_APIPassword + "&USER=" + gv_APIUserName + "&SIGNATURE=" + gv_APISignature + nvpStr + "&BUTTONSOURCE=" + gv_BNCode;
	    String nvpstr = "&Amt=" + paymentAmount + "&PAYMENTACTION=" + paymentType + "&RETURNURL=" + URLEncoder.encode( returnURL ) + "&CANCELURL=" + URLEncoder.encode( cancelURL ) + "&CURRENCYCODE=" + currencyCodeType;
	    try
	    {
	        URL postURL = new URL( gv_APIEndpoint );
	        HttpURLConnection conn = (HttpURLConnection)postURL.openConnection();
	        
	        NVPEncoder encoder = new NVPEncoder();
	        encoder.add("METHOD", methodName);
	        encoder.add("VERSION", gv_Version);
	        encoder.add("PWD",gv_APIPassword);
	        encoder.add("USER",gv_APIUserName);
	        encoder.add("SIGNATURE",gv_APISignature);
	        encoder.add("SIGNATURE",gv_APISignature);
	        encoder.add("Amt",paymentAmount);
	        encoder.add("PAYMENTACTION",paymentType);
	        encoder.add("ReturnURL",returnURL);
	        encoder.add("CancelURL",cancelURL);
	        encoder.add("CURRENCYCODE",currencyCodeType);
	        encoder.add("BUTTONSOURCE",gv_BNCode);
	        encoder.add("DESC","description");
	        

	        // Set connection parameters. We need to perform input and output,
	        // so set both as true.
	        conn.setDoInput (true);
	        conn.setDoOutput (true);

	        // Set the content type we are POSTing. We impersonate it as
	        // encoded form data
	        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
//	        conn.setRequestProperty( "User-Agent", agent );
//
//	        //conn.setRequestProperty( "Content-Type", type );
//	        conn.setRequestProperty( "Content-Length", String.valueOf( encodedData.length()) );
	        conn.setRequestMethod("POST");

	        // get the output stream to POST to.
	        OutputStreamWriter writer = new OutputStreamWriter(conn.getOutputStream());
	        //DataOutputStream output = new DataOutputStream( conn.getOutputStream());
	        //output.writeBytes(encoder.encode());
	        writer.write(encoder.encode());
	        writer.flush();
	        writer.close();
//	        output.flush();
//	        output.close ();

	        // Read input from the input stream.
	        //InputStreamReader reader = new InputStreamReader(conn.getInputStream());

	        DataInputStream  in = new DataInputStream (conn.getInputStream());
	        int rc = conn.getResponseCode();
	        if ( rc != -1)
	        {
	            BufferedReader is = new BufferedReader(new InputStreamReader( conn.getInputStream()));
	            String _line = null;
	            while(((_line = is.readLine()) !=null))
	            {
	                respText = respText + _line;
	            }
	            nvp = deformatNVP( respText );
	        }
	        return nvp;
	    }
	    catch( IOException e )
	    {
	        // handle the error here
	        return null;
	    }
	}
	
	public NVPDecoder httpcall(String methodName) throws PayPalException{
		   String version = "2.3";
		    String agent = "Mozilla/4.0";
		    String respText = "";
		    String currencyCodeType = "USD";
			String paymentType = "Sale";
			String paymentAmount = "100";
		    try
		    {
		        URL postURL = new URL( gv_APIEndpoint );
		        HttpURLConnection conn = (HttpURLConnection)postURL.openConnection();
		        
		        NVPEncoder encoder = new NVPEncoder();
		        encoder.add("METHOD", methodName);
		        encoder.add("VERSION", gv_Version);
		        encoder.add("PWD",gv_APIPassword);
		        encoder.add("USER",gv_APIUserName);
		        encoder.add("SIGNATURE",gv_APISignature);
		        encoder.add("SIGNATURE",gv_APISignature);
		        encoder.add("Amt",paymentAmount);
		        encoder.add("PAYMENTACTION",paymentType);
		        encoder.add("RETURNURL",returnURL);
		        encoder.add("CANCELURL",cancelURL);
		        encoder.add("CURRENCYCODE",currencyCodeType);
		        encoder.add("BUTTONSOURCE",gv_BNCode);
		        encoder.add("DESC","description");
		        

		        // Set connection parameters. We need to perform input and output,
		        // so set both as true.
		        conn.setDoInput (true);
		        conn.setDoOutput (true);

		        // Set the content type we are POSTing. We impersonate it as
		        // encoded form data
//		        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
//		        conn.setRequestProperty( "User-Agent", agent );
	//
//		        //conn.setRequestProperty( "Content-Type", type );
//		        conn.setRequestProperty( "Content-Length", String.valueOf( encodedData.length()) );
		        conn.setRequestMethod("POST");

		        // get the output stream to POST to.
		        OutputStreamWriter writer = new OutputStreamWriter(conn.getOutputStream());
		        //DataOutputStream output = new DataOutputStream( conn.getOutputStream());
		        //output.writeBytes(encoder.encode());
		        writer.write(encoder.encode());
		        writer.flush();
		        writer.close();
//		        output.flush();
//		        output.close ();

		        // Read input from the input stream.
		        InputStreamReader reader = new InputStreamReader(conn.getInputStream());

		        //DataInputStream  in = new DataInputStream (conn.getInputStream());
		        int data = reader.read();
		        String fetchResponse = "";

		        while(data != -1){
		          char theChar = (char) data;
		          fetchResponse += String.valueOf(theChar);
		          data = reader.read();
		        }
		        NVPDecoder resultValues = new NVPDecoder();
		        try {
					resultValues.decode(fetchResponse);
				} catch (PayPalException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		        return resultValues;
		    }
		    catch( IOException e )
		    {
		        e.printStackTrace();
		        // handle the error here
		        return null;
		    }
	}

	/*********************************************************************************
	  * deformatNVP: Function to break the NVP string into a HashMap
	  * 	pPayLoad is the NVP string.
	  * returns a HashMap object containing all the name value pairs of the string.
	*********************************************************************************/
	public HashMap deformatNVP( String pPayload )
	{
	    HashMap nvp = new HashMap();
	    StringTokenizer stTok = new StringTokenizer( pPayload, "&");
	    while (stTok.hasMoreTokens())
	    {
	        StringTokenizer stInternalTokenizer = new StringTokenizer( stTok.nextToken(), "=");
	        if (stInternalTokenizer.countTokens() == 2)
	        {
	            String key = URLDecoder.decode( stInternalTokenizer.nextToken());
	            String value = URLDecoder.decode( stInternalTokenizer.nextToken());
	            nvp.put( key.toUpperCase(), value );
	        }
	    }
	    return nvp;
	}

	/*********************************************************************************
	  * RedirectURL: Function to redirect the user to the PayPal site
	  * 	token is the parameter that was returned by PayPal
	  * returns a HashMap object containing all the name value pairs of the string.
	*********************************************************************************/
	public void RedirectURL( HttpServletResponse response, String token )
	{
	    String payPalURL = PAYPAL_URL + token;

	    //response.sendRedirect( payPalURL );
	    response.setStatus(302);
	    response.setHeader( "Location", payPalURL );
	    response.setHeader( "Connection", "close" );
	}
}
