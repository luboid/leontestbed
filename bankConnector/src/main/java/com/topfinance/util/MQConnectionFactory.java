package com.topfinance.util;




import com.sun.messaging.ConnectionConfiguration;

import javax.jms.ConnectionFactory;

import org.springframework.beans.factory.FactoryBean;



public class MQConnectionFactory implements FactoryBean {

	private String imqDefaultUsername;
	private String imqDefaultPassword;
	private String imqReconnectEnabled;
	private String imqReconnectAttempts;
	private String imqReconnectInterval;
	private String imqAddressListBehavior;
	private String imqAddresses;

	public void setImqDefaultUsername(String imqDefaultUsername) {
		this.imqDefaultUsername = imqDefaultUsername;
	}

	public void setImqDefaultPassword(String imqDefaultPassword) {
		this.imqDefaultPassword = imqDefaultPassword;
	}

	public void setImqReconnectEnabled(String imqReconnectEnabled) {
		this.imqReconnectEnabled = "true".equalsIgnoreCase(imqReconnectEnabled) ? "true"
				: "false";
	}

	public void setImqReconnectAttempts(String imqReconnectAttempts) {
		this.imqReconnectAttempts = imqReconnectAttempts;
	}

	public void setImqReconnectInterval(String imqReconnectInterval) {
		this.imqReconnectInterval = imqReconnectInterval;
	}

	public void setImqAddressListBehavior(String imqAddressListBehavior) {
		this.imqAddressListBehavior = imqAddressListBehavior;
	}

	public void setImqAddresses(String imqAddresses) {
		this.imqAddresses = imqAddresses;
	}

	
	public ConnectionFactory getObject() throws Exception {
	        com.sun.messaging.ConnectionFactory factory = new com.sun.messaging.ConnectionFactory();
		factory.setProperty(ConnectionConfiguration.imqAddressList,
				this.imqAddresses);
		factory.setProperty(ConnectionConfiguration.imqDefaultUsername,
				this.imqDefaultUsername);
		factory.setProperty(ConnectionConfiguration.imqDefaultPassword,
				this.imqDefaultPassword);
		return factory;
	}

	
	public Class<ConnectionFactory> getObjectType() {
		return ConnectionFactory.class;
	}

	
	public boolean isSingleton() {
		return false;
	}

}