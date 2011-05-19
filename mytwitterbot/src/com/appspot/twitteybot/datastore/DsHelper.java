package com.appspot.twitteybot.datastore;

import com.appspot.twitteybot.datastore.Transact.TxnState;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserServiceFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

public class DsHelper {
    private static final Logger log = Logger.getLogger(DsHelper.class.getName());
    public static List<TwitterStatus> getTwitterStatus(long txnId, PersistenceManager pm, long start, long end) {
        Query query = pm.newQuery(TwitterStatus.class);
         query.setFilter("transactionId == transactionIdVar");
         query.declareParameters("Long transactionIdVar");
         query.setOrdering("updatedTime asc");
         if(start==-1 || end==-1) {
             // get all
         }else {
             query.setRange(start, end);
         }

         @SuppressWarnings("unchecked")
         List<TwitterStatus> twitterStatuses = (List<TwitterStatus>) query.execute(txnId);
         return twitterStatuses;
    }
    
    public static List<TwitterStatus> getTwitterStatus(String screenName, PersistenceManager pm, long start, long end, User user) {
        Query query = pm.newQuery(TwitterStatus.class);
        query.setFilter("twitterScreenName == twitterScreenNameVar && user == userVar");
        query.declareParameters("String twitterScreenNameVar, com.google.appengine.api.users.User userVar");
        query.setOrdering("updatedTime asc");
        query.setRange(start, end);
        @SuppressWarnings("unchecked")
        List<TwitterStatus> twitterStatuses = (List<TwitterStatus>) query.execute(screenName, user);
        return twitterStatuses;
    }
    
    

    
    public static List<Transact> getTransactList(boolean getpaid, String screenName, PersistenceManager pm, long start, long end, User user) {
        Query query = pm.newQuery(Transact.class);
        query.setFilter("txnState == txnStateVar && twitterScreenName == twitterScreenNameVar && user == userVar");
        query.declareParameters("String txnStateVar, String twitterScreenNameVar, com.google.appengine.api.users.User userVar");
        query.setOrdering("updatedTime asc");
        if(start==-1 || end==-1) {
            // get all
        }else {
            query.setRange(start, end);
        }
        @SuppressWarnings("unchecked")
        List<Transact> unPaidTransact = (List<Transact>) query.execute(getpaid? TxnState.PAID : TxnState.UNPAID, screenName, user);
        return unPaidTransact;
    }
    
    
    public static Transact getTransact(long txnId, PersistenceManager pm) {

//        Query query = pm.newQuery(Transact.class);
//        query.setFilter("keyId == keyIdVar");
//        query.declareParameters("long keyIdVar");
//        @SuppressWarnings("unchecked")
//        Transact res = (Transact) query.execute(txnId);
        
        Transact res = (Transact)pm.getObjectById(Transact.class, txnId);
        return res;

    }
    
    public static List<UserSummary> getUserSummaries () {
        
        PersistenceManager pm = PMF.get().getPersistenceManager();
        try {
            
            Map<String, UserSummary> usermap = new HashMap<String, UserSummary>();
            Query query = pm.newQuery(TwitterAccount.class);
            query.setOrdering("user");
            List<UserSummary> res = new ArrayList<UserSummary>();
            
            @SuppressWarnings("unchecked")
            List<TwitterAccount> taList = (List<TwitterAccount>) query.execute();
            for(TwitterAccount ta : taList) {
                UserSummary us = new UserSummary();
                us.setTwitterName(ta.getTwitterScreenName());
                us.setUser(ta.getUser());
                usermap.put(ta.getTwitterScreenName(), us);
                res.add(us);
            }
            
            
            Query q2 = pm.newQuery(Transact.class);
            q2.setOrdering("twitterScreenName");
            @SuppressWarnings("unchecked")
            List<Transact> transList = (List<Transact>) q2.execute();
            for(Transact trans : transList) {
                String tsn = trans.getTwitterScreenName();
                UserSummary us = usermap.get(tsn);
                if(us==null) {
                    continue;
                }
                if(trans.getTxnState()==Transact.TxnState.PAID) {
                    us.setNoOfPaidTxn(us.getNoOfPaidTxn()+1);
                    us.setTotalAmountPaid(us.getTotalAmountPaid()+trans.getAmount());
                    us.setNoOfTweetsPaid(us.getNoOfTweetsPaid()+trans.getNumberOfStatus());
                }else if(trans.getTxnState()==Transact.TxnState.UNPAID){
                    us.setNoOfUnpaidTxn(us.getNoOfUnpaidTxn()+1);
                }

            }
            
            return res;
        } catch (Exception e) {
            log.log(Level.WARNING, "getUserSummaries", e);
            return new ArrayList<UserSummary>();
            
        } finally {
            pm.close();
        }
        
    }
    

    public static DashBoard getDashBoard() {
        PersistenceManager pm = PMF.get().getPersistenceManager();
        DashBoard db = new DashBoard();
        try {
            // accounts
            Query q1 = pm.newQuery(TwitterAccount.class);
            Set<User> users = new HashSet<User>();
            
            @SuppressWarnings("unchecked")
            List<TwitterAccount> taList = (List<TwitterAccount>) q1.execute();
            for(TwitterAccount ta : taList) {
                users.add(ta.getUser());
            }
            db.setNoOfTwitterAccounts(taList.size());
            db.setNoOfUsers(users.size());

            
            int noOfUnpaidTxns=0;
            double ammountOfUnpaidTxns = 0;
            int noOfPaidTxns=0;
            double ammountOfpaidTxns = 0;
            // transact
            Query q2 = pm.newQuery(Transact.class);
            @SuppressWarnings("unchecked")
            List<Transact> transList = (List<Transact>) q2.execute();
            for(Transact trans : transList) {
                if(trans.getTxnState()==Transact.TxnState.PAID) {
                    noOfPaidTxns++;
                    ammountOfpaidTxns+=trans.getAmount();
                }else if(trans.getTxnState()==Transact.TxnState.UNPAID){
                    noOfUnpaidTxns++;
                    ammountOfUnpaidTxns+=trans.getAmount();
                }
            }
            db.setNoOfUnpaidTxns(noOfUnpaidTxns);
            db.setAmmountOfUnpaidTxns(ammountOfUnpaidTxns);
            db.setNoOfPaidTxns(noOfPaidTxns);
            db.setAmmountOfpaidTxns(ammountOfpaidTxns);
            
            // status
            Query q3 = pm.newQuery(TwitterStatus.class);
            q3.setFilter("state == stateVar");
            q3.declareParameters("String stateVar");
            q3.setResult(" count(this)");
            // TODO should be deleted but deletion not done yet.
            Integer r3 = (Integer)q3.executeWithArray(TwitterStatus.State.QUEUED);
            db.setNoOfSentStatus(r3);
            
            Query q4 = pm.newQuery(TwitterStatus.class);
            q4.setFilter("state == stateVar");
            q4.declareParameters("String stateVar");
            q4.setResult(" count(this)");
            // TODO should be deleted but deletion not done yet.
            Integer r4 = (Integer)q4.executeWithArray(TwitterStatus.State.SCHEDULED);
            db.setNoOfScheduledStatus(r4);
            
            return db;
        } catch (Exception e) {
            log.log(Level.WARNING, "getDashBoard", e);
            return db;
            
        } finally {
            pm.close();
        }
    }
    
}
