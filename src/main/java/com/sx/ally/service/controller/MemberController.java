package com.sx.ally.service.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

import com.sx.ally.common.AllyParamConstants;
import com.sx.ally.common.util.EmailCertificationUtil;
import com.sx.ally.service.bo.MemberBO;
import com.sx.ally.service.model.Member;

@RequestMapping(value = "/member")
@Controller
public class MemberController {
	
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	
	@Autowired
	private MemberBO memberBO;
	
	@Autowired
	private MappingJacksonJsonView jsonView;

	@RequestMapping(value = "/login")
	public String home(Locale locale, Model model) {
		logger.info("Login Page : The client locale is {}.", locale);
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		
		List<Member> memberList = memberBO.getMemberList(paramMap);
		
		EmailCertificationUtil.getCertificationCode();
		
		model.addAttribute("memberList", memberList);
		return "service/allyLogin";
	}
	
	@RequestMapping(value = "/applyCertificationCode")
	public View applyCertificationCode(Locale locale, Model model,
			@RequestParam(value="emailAddress", required=true) String emailAddress) {
		logger.info("SEND EMAIL :: email address : " + emailAddress);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		boolean result = memberBO.applyCertificationCode(emailAddress);
		
		model.addAttribute("result", result);
		model.addAttribute("serverTime", formattedDate );
		
		return jsonView;
	}
	
	@RequestMapping(value = "/certificationMember")
	public View certificationMember(Model model, HttpServletRequest request,
			@RequestParam(value="certificationCode", required=true) String certificationCode,
			@RequestParam(value="emailAddress", required=true) String emailAddress,
			@RequestParam(value="ageGroup", required=true) int ageGroup,
			@RequestParam(value="sex", required=true) String sex,
			@RequestParam(value="companyNo", required=true) String companyNo) {
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put(AllyParamConstants.PARAM_CERTIFICATION_CODE, certificationCode);
		paramMap.put(AllyParamConstants.PARAM_MEMBER_LOGIN_ID, emailAddress);
		paramMap.put(AllyParamConstants.PARAM_MEMBER_AGE_GROUP, ageGroup);
		paramMap.put(AllyParamConstants.PARAM_MEMBER_SEX, sex);
		paramMap.put(AllyParamConstants.PARAM_COMPANY_NUMBER, companyNo);
		
		Map<String, Object> resultMap = memberBO.certificationMember(paramMap);
		
		model.addAllAttributes(resultMap);
		return jsonView;
	}
}
