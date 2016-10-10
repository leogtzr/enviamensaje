package com.enviamensaje.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AboutController {
	@RequestMapping(value = "/about")
	public String about() {
        return "about";
    }
}