package com.appspot.twitteybot.pay;

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
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Pay extends HttpServlet{
	private static final long serialVersionUID = 5897117716535098156L;
	private static final Logger log = Logger.getLogger(Pay.class.getName());
	
    private String gv_APIUserName = "zouljs_api1.gmail.com";
    private String gv_APIPassword = "VAP2YMLNEHWT4ZZR";
    private String gv_APISignature = "AWzhH6wDJyDw0qOKzLtZlz5PeS4KAKIzhhcgcgE7kf6q3KD1QgNp2-cD";

    private String gv_APIEndpoint = "https://api-3t.paypal.com/nvp";
    private String PAYPAL_URL = "https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=";
    private String  gv_BNCode = "PP-ECWizard";

    private String  gv_Version = "2.3";
    
    String returnURL = "http://www.tweeteybot.appspot.com/pages/main";
    String cancelURL = "http://www.tweeteybot.appspot.com/pages/main";

    /*********************************************************************************
      * CallMarkExpressCheckout: Function to perform the SetExpressCheckout API call
      *
      * Inputs:
      *     paymentAmount:      Total value of the shopping cart
      *     currencyCodeType:   Currency code value the PayPal API
      *     paymentType:        paymentType has to be one of the following values: Sale or Order or Authorization
      *     returnURL:          the page where buyers return to after they are done with the payment review on PayPal
      *     cancelURL:          the page where buyers return to when they cancel the payment review on PayPal
      *     shipToName:     the Ship to name entered on the merchant's site
      *     shipToStreet:       the Ship to Street entered on the merchant's site
      *     shipToCity:         the Ship to City entered on the merchant's site
      *     shipToState:        the Ship to State entered on the merchant's site
      *     shipToCountryCode:  the Code for Ship to Country entered on the merchant's site
      *     shipToZip:          the Ship to ZipCode entered on the merchant's site
      *     shipToStreet2:      the Ship to Street2 entered on the merchant's site
      *     phoneNum:           the phoneNum  entered on the merchant's site
      *
      * Output: Returns a HashMap object containing the response from the server.
    *********************************************************************************/
    public HashMap CallMarkExpressCheckout( String paymentAmount, String returnURL, String cancelURL, String shipToName, String                                         shipToStreet, String shipToCity, String shipToState,
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
     * httpcall: Function to perform the API call to PayPal using API signature
    * @throws PayPalException 
     *     @ methodName is name of API  method.
     *     @ nvpStr is nvp string.
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
//         conn.setRequestProperty( "User-Agent", agent );
//
//         //conn.setRequestProperty( "Content-Type", type );
//         conn.setRequestProperty( "Content-Length", String.valueOf( encodedData.length()) );
           conn.setRequestMethod("POST");

           // get the output stream to POST to.
           OutputStreamWriter writer = new OutputStreamWriter(conn.getOutputStream());
           //DataOutputStream output = new DataOutputStream( conn.getOutputStream());
           //output.writeBytes(encoder.encode());
           writer.write(encoder.encode());
           writer.flush();
           writer.close();
//         output.flush();
//         output.close ();

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
   
   /*********************************************************************************
    * deformatNVP: Function to break the NVP string into a HashMap
    *     pPayLoad is the NVP string.
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
}
