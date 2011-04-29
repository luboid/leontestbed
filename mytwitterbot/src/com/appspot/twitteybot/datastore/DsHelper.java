package com.appspot.twitteybot.datastore;

import com.appspot.twitteybot.datastore.Transact.TxnState;
import com.google.appengine.api.users.UserServiceFactory;

import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

public class DsHelper {
    
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
    
    public static List<TwitterStatus> getTwitterStatus(String screenName, PersistenceManager pm, long start, long end) {
        Query query = pm.newQuery(TwitterStatus.class);
        query.setFilter("twitterScreenName == twitterScreenNameVar && user == userVar");
        query.declareParameters("String twitterScreenNameVar, com.google.appengine.api.users.User userVar");
        query.setOrdering("updatedTime asc");
        query.setRange(start, end);
        @SuppressWarnings("unchecked")
        List<TwitterStatus> twitterStatuses = (List<TwitterStatus>) query.execute(screenName, UserServiceFactory
                .getUserService().getCurrentUser());
        return twitterStatuses;
    }
    
    

    
    public static List<Transact> getTransactList(boolean getpaid, String screenName, PersistenceManager pm, long start, long end) {
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
        List<Transact> unPaidTransact = (List<Transact>) query.execute(getpaid? TxnState.PAID : TxnState.UNPAID, screenName, UserServiceFactory
                .getUserService().getCurrentUser());
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
    

    
    
}
