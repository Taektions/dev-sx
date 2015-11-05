package com.sx.ally.service.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

import com.sx.ally.common.bo.EmailSendBO;
import com.sx.ally.service.bo.MemberBO;

@Controller
public class MemberController {
	
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	
	@Autowired
	private MemberBO memberBO;
	
	@Autowired
	private EmailSendBO emaiSendBO;
	
	@Autowired
	private MappingJacksonJsonView jsonView;

	@RequestMapping(value = "/list")
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);		
		return "service/sendEmail";
	}
	
	@RequestMapping(value = "/sendCertificationEmail")
	public View sendCertificationEmail(Locale locale, Model model,
			@RequestParam(value="emailAddress", required=true) String emailAddress) {
		logger.info("SEND EMAIL :: \n email address : " + emailAddress);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		boolean result = emaiSendBO.sendCertificationEmail(emailAddress);
		
		model.addAttribute("result", result);
		model.addAttribute("serverTime", formattedDate );
		
		return jsonView;
	}
}
