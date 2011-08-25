package com.appspot.twitteybot.datastore;

import com.google.appengine.api.users.User;

import java.io.Serializable;

import javax.jdo.annotations.Extension;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable(identityType = IdentityType.APPLICATION)
public class AppUser implements Serializable{
    public static final String REG_USER_DOMAIN = "thisapp";
    public static final String REG_USER_ID = "anyId";
	private static final long serialVersionUID = 3608582617972138042L;

    @PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    @Extension(vendorName = "datanucleus", key = "gae.encoded-pk", value = "true")
    private String encodedKey;

    @Persistent
    @Extension(vendorName = "datanucleus", key = "gae.pk-id", value = "true")
    private Long keyId;

	@Persistent
	private String userName;
	
	@Persistent
	User openId;
	
	@Persistent
	private State state = State.ACTIVE;
	
	@Persistent
	private PayType payType = PayType.PAY;
	
	@Persistent
	private String password;

	   @Persistent
	    private String email;
	

	public boolean isFree() {
	        return PayType.FREE==getPayType();
	}	   
	public boolean isBanned() {
	    return State.BANNED==getState();
	}
	public enum PayType {
           PAY, FREE
	}
	public enum State {
	        ACTIVE, SUSPENDED, BANNED
	}
    
    public boolean isRegUser() {
        return REG_USER_DOMAIN.equals(getOpenId().getAuthDomain());
    }
    
    public AppUser() {
    }
	public AppUser(String userName) {

        // create a dummy openId, used in TwitterAccount
        // to avoid duplication with openId accounts
	    String unique = userName+"@registered"; 
	    setUserName(unique);
	    setOpenId(new User(unique, REG_USER_DOMAIN, REG_USER_ID, unique));
	    
	    
	}
	public AppUser(User openId) {  
	    setUserName(openId.getEmail());
	    setOpenId(openId);
	}
    


	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}



    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public PayType getPayType() {
        return payType;
    }

    public void setPayType(PayType payType) {
        this.payType = payType;
    }

    public User getOpenId() {
        return openId;
    }

    public void setOpenId(User openId) {
        this.openId = openId;
    }

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }



}
