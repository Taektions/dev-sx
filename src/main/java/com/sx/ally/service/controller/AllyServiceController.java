package com.sx.ally.service.controller;

import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(value = "/service")
@Controller
public class AllyServiceController {
	private static final Logger logger = LoggerFactory.getLogger(AllyServiceController.class);

	@RequestMapping(value = "/main")
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		return "service/main";
	}
}
