package com.sx.ally.service.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

import com.sx.ally.service.bo.ProductBO;
import com.sx.ally.service.model.Product;

@RequestMapping(value = "/service")
@Controller
public class AllyServiceController {
	private static final Logger logger = LoggerFactory.getLogger(AllyServiceController.class);
	
	@Autowired
	private ProductBO productBO;
	
	@Autowired
	private MappingJacksonJsonView jsonView;

	@RequestMapping(value = "/product/list")
	public View home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		List<Product> productList = productBO.getProductList(paramMap);
		
		model.addAttribute("productList", productList);
		
		return jsonView;
	}
}
