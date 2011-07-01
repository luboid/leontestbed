package com.appspot.twitteybot.ui;

import com.appspot.twitteybot.datastore.ApplicationProperty;
import com.google.api.client.extensions.appengine.http.urlfetch.UrlFetchTransport;
import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestFactory;
import com.google.api.client.http.HttpResponse;
import com.google.api.client.http.HttpUnsuccessfulResponseHandler;
import com.google.api.client.http.json.JsonHttpContent;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.JsonParser;
import com.google.api.client.json.jackson.JacksonFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class MyUtils {
    private static final Logger log = Logger.getLogger(MyUtils.class.getName());
    
    static final String serviceHome = "http://code.google.com/intl/de-DE/apis/urlshortener/v1/getting_started.html"; 
//    static final String u="https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyATndQS1kC3cEMRKPgNL30LJnc2E2VM2MI";
//    static URL url;

    /**
     * use google short url service
     * @param toshort
     * @return
     */
    public static String getShortUrl(String toshort) {
        final StringBuffer errorResponse = new StringBuffer();
        String serviceUrl = null;
        try {
//        if(url==null) {
//            try {
//                url = new URL(u);
//            } catch (MalformedURLException e) {
//                // should never happen
//                log.severe("[getShortUrl]: Service URL ["+u+"] can't be initialized");
//            }
//        }
        
//      LongUrl data = new LongUrl();
//      data.setLongUrl(toshort);
      
      Map<String, String> data = new HashMap<String, String>();
      data.put("longUrl", toshort);
      
      JsonHttpContent c = new JsonHttpContent();
      c.jsonFactory = new JacksonFactory();
      c.data = data;
      
      // this can print the json request
//      ByteArrayOutputStream out = new ByteArrayOutputStream();
//      c.writeTo(out);
//      debug("data="+new String(out.toByteArray()));
//      if(true) return;
      
      
      serviceUrl = ApplicationProperty.read(ApplicationProperty.SHORTENER_URL);
      
      GenericUrl gu = new GenericUrl(serviceUrl);
      UrlFetchTransport transport = new UrlFetchTransport();
      HttpRequestFactory f = transport.createRequestFactory();
      HttpRequest req = f.buildPostRequest(gu, c);
      debug("req="+c.toString());


      HttpUnsuccessfulResponseHandler handler = new HttpUnsuccessfulResponseHandler() {
          public boolean handleResponse(HttpRequest request,
                  HttpResponse response, boolean retrySupported)
                  throws IOException {
              InputStream in = response.getContent();
              String result = read(in);
              errorResponse.append(result);
//              log.severe("result=\n"+result);
              return false;
          }
          
      };
      
      req.unsuccessfulResponseHandler = handler;
      HttpResponse resp = req.execute();

      InputStream in = resp.getContent();
      
      JsonFactory jfac = new JacksonFactory();
      
      JsonParser jp = jfac.createJsonParser(in);
      jp.nextToken();
      jp.skipToKey("id");
      String shortUrl = jp.getText();
      debug("short="+shortUrl);
      
      return shortUrl;
        } catch (Exception ex) {
            log.log(Level.SEVERE, "[getShortUrl]: exception while invoking Google URL Shortener Service at "+serviceUrl
                    +". response Code="+ex.getMessage()+", msg="+errorResponse.toString(), ex);
            return toshort;
        }
    }
    
    private static String read(InputStream in) throws IOException{
        BufferedReader r = new BufferedReader(new InputStreamReader(in));
        String result = "";
        String content = null;
        while ((content = r.readLine()) != null) {  
            result += content + "\n";  
        }  
        return result;
    }
    public static void debug(String s) {
//        System.out.println(s);
    }
    
    
    
    public static void sendEmail(String emailaddr, String username, String subject, String body) {
        Properties props = new Properties();
        Session session = Session.getDefaultInstance(props, null);


        String adminEmail = null;
        String adminName = null;
        try {
            
            adminEmail = ApplicationProperty.read(ApplicationProperty.ADMIN_EMAIL);
            adminName = ApplicationProperty.read(ApplicationProperty.ADMIN_NAME);
            
            Message msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress(adminEmail, adminName));
            msg.addRecipient(Message.RecipientType.TO,
                             new InternetAddress(emailaddr, username));
            msg.setSubject(subject);
            msg.setText(body);
            Transport.send(msg);
    
        } catch (Exception e) {
            log.log(Level.SEVERE, "error sending email to user="+username+" at "+emailaddr+
                    " on behalf of administrator="+adminName+" at "+adminEmail, e);
            throw new RuntimeException(e);
        }        
    }
    
}
