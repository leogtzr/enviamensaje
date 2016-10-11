package com.enviamensaje.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@Configuration
@EnableConfigurationProperties
@ConfigurationProperties(locations = "classpath:sms.properties", ignoreUnknownFields = false, prefix = "sms")
public class SmsConfiguration {
	
	private String from;
	private String sid;
	private String token;
	
	public String getFrom() {
		return from;
	}
	
	public void setFrom(final String from) {
		this.from = from;
	}
	
	public String getSid() {
		return sid;
	}
	
	public void setSid(final String sid) {
		this.sid = sid;
	}

	public String getToken() {
		return token;
	}

	public void setToken(final String token) {
		this.token = token;
	}
	
}
