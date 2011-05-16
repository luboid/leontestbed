package com.appspot.twitteybot;

import com.appspot.twitteybot.datastore.DashBoard;
import com.appspot.twitteybot.datastore.DsHelper;
import com.appspot.twitteybot.datastore.PMF;
import com.appspot.twitteybot.datastore.TwitterAccount;
import com.appspot.twitteybot.datastore.UserSummary;
import com.google.appengine.api.users.User;

import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;



public class Tester extends BaseDataStoreTestCase {
    protected boolean noStorage() {
        return false;
    }
    protected String getDbStorePath() {
        debug("==========================");
      return "D:/JCommerce/code.google/twitteybot/war"+"/WEB-INF/appengine-generated/local_db.bin";
//        return "D:/JCommerce/code.google/twitteybot/local_db.bin";
    }
    public void debug(String s) {
        System.out.println(s);
    }
    public void testQuery() {
    
        List<UserSummary> res = DsHelper.getUserSummaries();
        
        for(UserSummary us : res)  {
            debug("us="+us);
        }
        
        DashBoard db = DsHelper.getDashBoard();
        debug("db="+db);
        
        debug("Done");
        
        
    }
    
    
    public void atestUser() {

        try {
            TwitterAccount ta = new TwitterAccount();
            ta.setTwitterScreenName("papaya");
            User user = new User("abc", "xyz");
            ta.setUser(user);
            
            PersistenceManager pm = PMF.get().getPersistenceManager();
            pm.makePersistent(ta);
            
            
            User user2 = new User("abc  ", "xyzz", "xx", "yyy");
            debug("user2="+user2);
            
            Query query = pm.newQuery(TwitterAccount.class);
            query.setFilter("user == userVar");
            query.declareParameters("com.google.appengine.api.users.User userVar");
            @SuppressWarnings("unchecked")
            List<TwitterAccount> list = (List<TwitterAccount>) query.execute(user2);
            
            debug("size="+list.size());

            
            debug("Done");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
