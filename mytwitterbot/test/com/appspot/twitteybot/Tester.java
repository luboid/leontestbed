package com.appspot.twitteybot;

import com.appspot.twitteybot.datastore.DashBoard;
import com.appspot.twitteybot.datastore.DsHelper;
import com.appspot.twitteybot.datastore.PMF;
import com.appspot.twitteybot.datastore.TwitterAccount;
import com.appspot.twitteybot.datastore.TwitterStatus;
import com.appspot.twitteybot.datastore.UserSummary;
import com.google.appengine.api.users.User;

import java.util.ArrayList;
import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;



public class Tester extends BaseDataStoreTestCase {
    protected boolean noStorage() {
        return true;
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
    
    
    public void testTwitter() {
        try {
        String sn = "me";
        User user = new User("u1"+"@registered", "ABC");
        
        PersistenceManager pm = PMF.get().getPersistenceManager();
        pm.currentTransaction().begin();
        TwitterStatus ts = new TwitterStatus();
        ts.setUser(user);
        ts.setTwitterScreenName(sn);
        ts.setState(TwitterStatus.State.SCHEDULED);
        ts.setStatus("abc");
        pm.makePersistent(ts);
        pm.currentTransaction().commit();
        pm.close();
        
        pm = PMF.get().getPersistenceManager();
        pm.currentTransaction().begin();
        TwitterStatus ts2 = new TwitterStatus();
        ts2.setUser(user);
        ts2.setTwitterScreenName(sn);
        ts2.setState(TwitterStatus.State.SCHEDULED);
        ts2.setStatus("bbb");
        pm.makePersistent(ts2);
        pm.currentTransaction().commit();
        pm.close();
        
        
        pm = PMF.get().getPersistenceManager();        
        pm.currentTransaction().begin();
        
//        List<TwitterStatus> list = DsHelper.getScheduledTwitterStatus(sn, pm, -1, -1, user);
//        for(TwitterStatus s1 : list) {
//            debug("status="+s1.getStatus());
//            
//            s1.setUpdatedTime(new Date());
//            s1.setStatus("xxx");
//            pm.makePersistent(s1);
//        }

        List<TwitterStatus> list = new ArrayList<TwitterStatus>();
        TwitterStatus s = (TwitterStatus)pm.getObjectById(TwitterStatus.class, ts.getKeyId());
        debug("status1 = "+s.getStatus());
        s.setStatus("xxx");
        list.add(s);
        
        
        ts2 = (TwitterStatus)pm.getObjectById(TwitterStatus.class, ts2.getKeyId());
        debug("status2 = "+ts2.getStatus());
        ts2.setStatus("zzz");
        list.add(ts2);
        
//        pm.makePersistent(s);
//        pm.makePersistent(ts2);
        pm.makePersistentAll(list);
        debug("statusaaa="+s.getStatus());
        debug("statuszzz="+ts2.getStatus());
//        pm.currentTransaction().commit();
        
        Query query = pm.newQuery(TwitterStatus.class);
        query.setFilter("state==stateVar");
        query.declareParameters("String stateVar");
        query.setOrdering("updatedTime asc");
        @SuppressWarnings("unchecked")
        List<TwitterStatus> twitterStatuses = (List<TwitterStatus>) query.execute(TwitterStatus.State.SCHEDULED);
        for(TwitterStatus s1 : twitterStatuses) {
            debug("statusxxxx="+s1.getStatus());
        }
        
        
        List<TwitterStatus> list2 = DsHelper.getScheduledTwitterStatus(sn, pm, -1, -1, user);
        for(TwitterStatus s1 : list2) {
            debug("statusyyy="+s1.getStatus());
        }
        
        debug("statuszzz="+s.getStatus());
        pm.currentTransaction().commit();
        pm.close();
        
        
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        
        
        
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
