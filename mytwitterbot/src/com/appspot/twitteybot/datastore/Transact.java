package com.appspot.twitteybot.datastore;

import com.google.appengine.api.users.User;

import java.io.Serializable;
import java.util.Date;

import javax.jdo.annotations.Extension;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.NotPersistent;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable(identityType = IdentityType.APPLICATION)
public class Transact implements Serializable{
    
    private static final long serialVersionUID = -4733522222852406699L;
    
    @PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    @Extension(vendorName = "datanucleus", key = "gae.encoded-pk", value = "true")
    private String encodedKey;

    @Persistent
    @Extension(vendorName = "datanucleus", key = "gae.pk-id", value = "true")
    private Long keyId;
    
    @Persistent
    private String twitterScreenName;
    @Persistent
    private User user;
    @Persistent
    private Date createdTime;
    
    @Persistent
    private Date updatedTime;
    
    @Persistent
    private double amount;
    
    @Persistent
    private double unitPrice;
    
    @Persistent
    private int numberOfStatus;
    
    // transient
    @NotPersistent
    public String paypalButton;
    
    public enum TxnState {
        UNPAID, PAID, CANCELLED
    }
    
    @Persistent
    private TxnState txnState;

    public String getEncodedKey() {
        return encodedKey;
    }

    public void setEncodedKey(String encodedKey) {
        this.encodedKey = encodedKey;
    }

    public Long getKeyId() {
        return keyId;
    }

    public void setKeyId(Long keyId) {
        this.keyId = keyId;
    }



    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public Date getUpdatedTime() {
        return updatedTime;
    }

    public void setUpdatedTime(Date updatedTime) {
        this.updatedTime = updatedTime;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public int getNumberOfStatus() {
        return numberOfStatus;
    }

    public void setNumberOfStatus(int numberOfStatus) {
        this.numberOfStatus = numberOfStatus;
    }

    public TxnState getTxnState() {
        return txnState;
    }

    public void setTxnState(TxnState txnState) {
        this.txnState = txnState;
    }

    public String getTwitterScreenName() {
        return twitterScreenName;
    }

    public void setTwitterScreenName(String twitterScreenName) {
        this.twitterScreenName = twitterScreenName;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getPaypalButton() {
        return paypalButton;
    }

    public void setPaypalButton(String paypalButton) {
        this.paypalButton = paypalButton;
    }



    
    
}
