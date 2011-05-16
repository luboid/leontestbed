package com.appspot.twitteybot.datastore;

import com.google.appengine.api.users.User;

public class UserSummary {
    long keyId;
    
    String twitterName;
    
    User user;
    
    int noOfPaidTxn;
    int noOfUnpaidTxn;
    
    double totalAmountPaid;
    int noOfTweetsPaid;
    
//    int noOfTweetsSent;

    public long getKeyId() {
        return keyId;
    }

    public void setKeyId(long keyId) {
        this.keyId = keyId;
    }




    public int getNoOfUnpaidTxn() {
        return noOfUnpaidTxn;
    }

    public void setNoOfUnpaidTxn(int noOfUnpaidTxn) {
        this.noOfUnpaidTxn = noOfUnpaidTxn;
    }

    public String getTwitterName() {
        return twitterName;
    }

    public void setTwitterName(String twitterName) {
        this.twitterName = twitterName;
    }



    public int getNoOfPaidTxn() {
        return noOfPaidTxn;
    }

    public void setNoOfPaidTxn(int noOfPaidTxn) {
        this.noOfPaidTxn = noOfPaidTxn;
    }

    public double getTotalAmountPaid() {
        return totalAmountPaid;
    }

    public void setTotalAmountPaid(double totalAmountPaid) {
        this.totalAmountPaid = totalAmountPaid;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getNoOfTweetsPaid() {
        return noOfTweetsPaid;
    }

    public void setNoOfTweetsPaid(int noOfTweetsPaid) {
        this.noOfTweetsPaid = noOfTweetsPaid;
    }

	@Override
	public String toString() {
		return "UserSummary [keyId=" + keyId + ", twitterName=" + twitterName
				+ ", user=" + user + ", noOfPaidTxn=" + noOfPaidTxn
				+ ", noOfUnpaidTxn=" + noOfUnpaidTxn + ", totalAmountPaid="
				+ totalAmountPaid + ", noOfTweetsPaid=" + noOfTweetsPaid
				+ "]";
	}
    
    
    
}
