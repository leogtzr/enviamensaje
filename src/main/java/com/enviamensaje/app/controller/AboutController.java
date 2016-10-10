package com.enviamensaje.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AboutController {

    @RequestMapping("/about")
    public String about(@RequestParam(value="name", required=false, defaultValue="World") String name, 
    		final ModelMap model) {
        model.addAttribute("name", name);
        return "about";
    }
    
}
