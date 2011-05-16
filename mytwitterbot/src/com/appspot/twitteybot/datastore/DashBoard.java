package com.appspot.twitteybot.datastore;

public class DashBoard {

    int noOfUsers;
    int noOfTwitterAccounts;
    
    int noOfUnpaidTxns;
    double ammountOfUnpaidTxns;
    int noOfPaidTxns;
    double ammountOfpaidTxns;
    
    int noOfScheduledStatus;
    int noOfSentStatus;
    
    public int getNoOfUsers() {
        return noOfUsers;
    }
    public void setNoOfUsers(int noOfUsers) {
        this.noOfUsers = noOfUsers;
    }
    public int getNoOfTwitterAccounts() {
        return noOfTwitterAccounts;
    }
    public void setNoOfTwitterAccounts(int noOfTwitterAccounts) {
        this.noOfTwitterAccounts = noOfTwitterAccounts;
    }
    public int getNoOfUnpaidTxns() {
        return noOfUnpaidTxns;
    }
    public void setNoOfUnpaidTxns(int noOfUnpaidTxns) {
        this.noOfUnpaidTxns = noOfUnpaidTxns;
    }
    public double getAmmountOfUnpaidTxns() {
        return ammountOfUnpaidTxns;
    }
    public void setAmmountOfUnpaidTxns(double ammountOfUnpaidTxns) {
        this.ammountOfUnpaidTxns = ammountOfUnpaidTxns;
    }
    public int getNoOfPaidTxns() {
        return noOfPaidTxns;
    }
    public void setNoOfPaidTxns(int noOfPaidTxns) {
        this.noOfPaidTxns = noOfPaidTxns;
    }
    public double getAmmountOfpaidTxns() {
        return ammountOfpaidTxns;
    }
    public void setAmmountOfpaidTxns(double ammountOfpaidTxns) {
        this.ammountOfpaidTxns = ammountOfpaidTxns;
    }
    public int getNoOfScheduledStatus() {
        return noOfScheduledStatus;
    }
    public void setNoOfScheduledStatus(int noOfScheduledStatus) {
        this.noOfScheduledStatus = noOfScheduledStatus;
    }
    public int getNoOfSentStatus() {
        return noOfSentStatus;
    }
    public void setNoOfSentStatus(int noOfSentStatus) {
        this.noOfSentStatus = noOfSentStatus;
    }
	@Override
	public String toString() {
		return "DashBoard [noOfUsers=" + noOfUsers + ", noOfTwitterAccounts="
				+ noOfTwitterAccounts + ", noOfUnpaidTxns=" + noOfUnpaidTxns
				+ ", ammountOfUnpaidTxns=" + ammountOfUnpaidTxns
				+ ", noOfPaidTxns=" + noOfPaidTxns + ", ammountOfpaidTxns="
				+ ammountOfpaidTxns + ", noOfScheduledStatus="
				+ noOfScheduledStatus + ", noOfSentStatus=" + noOfSentStatus
				+ "]";
	}
    
}
