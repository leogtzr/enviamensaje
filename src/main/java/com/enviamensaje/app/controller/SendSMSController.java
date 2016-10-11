package com.enviamensaje.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.enviamensaje.config.SmsConfiguration;
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
    		@RequestParam(value="phone", required=true) String phone, 
    		@RequestParam(value="text", required=true) String text,
    		final ModelMap model) {
		
        model.addAttribute("phone", smsConfiguration.getFrom());
        model.addAttribute("text", smsConfiguration.getToken());
        
        final TwilioRestClient client = new TwilioRestClient.
                Builder("AC8bb6512b63ff0ed79a66b02b424c15e7", "689469ce9456a57153da7d1ffeda8cbc").build();
            MessageCreator messageCreator = new MessageCreator(
                    new PhoneNumber("+52" + phone),
                    new PhoneNumber("+12055498056"),
                    text);
            messageCreator.create(client);
        
        return "sent";
    }
	
	private boolean isPhoneValid(final String phone) {
		return true;
	}

}
