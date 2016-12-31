package com.enviamensaje.app.controller;

import static com.enviamensaje.app.utils.EnviaMensajeConstants.MEX_PHONE_PREFIX;
import static com.enviamensaje.app.utils.EnviaMensajeConstants.PHONE_LENGTH;

import static org.apache.commons.lang3.StringUtils.trim;  
import static org.apache.commons.lang3.StringUtils.isBlank;

import com.enviamensaje.app.exception.InvalidPhoneException;
import com.enviamensaje.config.SmsConfiguration;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.twilio.http.TwilioRestClient;
import com.twilio.rest.api.v2010.account.MessageCreator;
import com.twilio.type.PhoneNumber;

@Controller
@ComponentScan(value = "com.enviamensaje.config")
public class SendSMSController {

	@Autowired
	private SmsConfiguration smsConfiguration;
	
	@RequestMapping("/sendsms")
    public String sendsms(
    		@RequestParam(value = "phone", required = true) String phone, 
    		@RequestParam(value = "text", required = true) String text,
    		final ModelMap model) throws InvalidPhoneException {
		
		addAttributesToModelMap(phone, text, model);
        send(phone, text);
        return "sent";
    }
	
	private void addAttributesToModelMap(final String phone, final String text, final ModelMap modelMap) {
		modelMap.addAttribute("phone", phone);
		modelMap.addAttribute("text", text);
	}
	
	private void send(final String phone, final String text) throws InvalidPhoneException {
		if (isPhoneValid(phone)) {
        	final TwilioRestClient client = new TwilioRestClient.
            		Builder(smsConfiguration.getSid(), smsConfiguration.getToken()).build();
        	
            final MessageCreator messageCreator = 
            		new MessageCreator(new PhoneNumber(MEX_PHONE_PREFIX + phone),
            				new PhoneNumber(smsConfiguration.getFrom()), text);
            messageCreator.create(client);
        } else {
        	throw new InvalidPhoneException("Invalid phone: " + phone);
        }
	}
	
	private boolean isPhoneValid(final String phone) {
		if (isBlank(StringUtils.trim(phone)) || trim(phone).length() != PHONE_LENGTH) {
			return false;
		}
		return trim(phone).matches("[0-9]{10}"); 
	}

}
