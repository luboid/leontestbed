package com.appspot.twitteybot.datastore;


public class UserSummary {
    long keyId;
    
    String twitterNames;
    
    AppUser appUser;
    
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



    public int getNoOfTweetsPaid() {
        return noOfTweetsPaid;
    }

    public void setNoOfTweetsPaid(int noOfTweetsPaid) {
        this.noOfTweetsPaid = noOfTweetsPaid;
    }

	@Override
	public String toString() {
		return "UserSummary [keyId=" + keyId + ", twitterNames=" + twitterNames
				+ ", user=" + appUser + ", noOfPaidTxn=" + noOfPaidTxn
				+ ", noOfUnpaidTxn=" + noOfUnpaidTxn + ", totalAmountPaid="
				+ totalAmountPaid + ", noOfTweetsPaid=" + noOfTweetsPaid
				+ "]";
	}

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public String getTwitterNames() {
        return twitterNames;
    }

    public void setTwitterNames(String twitterNames) {
        this.twitterNames = twitterNames;
    }
    
    
    
}
