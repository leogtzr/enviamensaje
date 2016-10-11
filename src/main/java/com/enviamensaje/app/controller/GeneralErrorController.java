package com.enviamensaje.app.controller;

import com.enviamensaje.app.exception.InvalidPhoneException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@ControllerAdvice
@Controller
public class GeneralErrorController {
	
	@ExceptionHandler(InvalidPhoneException.class)
    public ModelAndView handleError(final HttpServletRequest req, final InvalidPhoneException ex) {
		ModelAndView mav = new ModelAndView();
	    mav.addObject("exception", ex);
	    mav.addObject("url", req.getRequestURL());
	    mav.setViewName("error");
	    return mav;
	    
	}
	
}
