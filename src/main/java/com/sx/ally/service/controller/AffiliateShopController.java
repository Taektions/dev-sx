package com.sx.ally.service.controller;

import java.util.HashMap;
import java.util.Map;

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
import com.sx.ally.service.bo.AffiliateShopBO;
import com.sx.ally.service.bo.ProductBO;

@RequestMapping(value = "/shop")
@Controller
public class AffiliateShopController {
	
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	
	@Autowired
	private MappingJacksonJsonView jsonView;
	
	@Autowired
	private AffiliateShopBO affiliateShopBO;
	
	@Autowired
	private ProductBO productBO;

	@RequestMapping(value = "/registerAffiliateShop")
	public View registerAffiliateShop(Model model,
			@RequestParam(value="affiliateShopName", required=true)String affiliateShopName,
			@RequestParam(value="representative", required=true)String representative,
			@RequestParam(value="shopCategoryCode", required=true)String shopCategoryCode,
			@RequestParam(value="telephoneNo", required=false)String telephoneNo,
			@RequestParam(value="cellphoneNo", required=true)String cellphoneNo,
			@RequestParam(value="loginID", required=true)String loginID,
			@RequestParam(value="loginPassword", required=true)String loginPassword) {
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put(AllyParamConstants.PARAM_AFFILIATE_SHOP_NAME, affiliateShopName);
		paramMap.put(AllyParamConstants.PARAM_AFFILIATE_SHOP_REPRESENTATIVE, representative);
		paramMap.put(AllyParamConstants.PARAM_AFFILIATE_SHOP_CATEGORY_CODE, shopCategoryCode);
		paramMap.put(AllyParamConstants.PARAM_AFFILIATE_SHOP_TELEPHONE_NUMBER, telephoneNo);
		paramMap.put(AllyParamConstants.PARAM_AFFILIATE_SHOP_CELLPHONE_NUMBER, cellphoneNo);
		paramMap.put(AllyParamConstants.PARAM_AFFILIATE_SHOP_LOGIN_ID, loginID);
		paramMap.put(AllyParamConstants.PARAM_AFFILIATE_SHOP_LOGIN_PASSWORD, loginPassword);
		Map<String, Object> resultMap = affiliateShopBO.registerAffiliateShop(paramMap);
		
		model.addAllAttributes(resultMap);
		return jsonView;
	}
	
	@RequestMapping(value = "/admissionRegister")
	public View admissionRegister(Model model,
			@RequestParam(value="affiliateShopNo", required=true) int affiliateShopNo) {
		logger.debug("admission register shop no." + affiliateShopNo);
		
		Map<String, Object> resultMap = affiliateShopBO.admissionRegister(affiliateShopNo);
		model.addAllAttributes(resultMap);
		return jsonView;
	}
	
	@RequestMapping(value = "/registerProduct")
	public View registerProduct(Model model,
			@RequestParam(value="productName", required=true)String productName,
			@RequestParam(value="categoryCode", required=true)String categoryCode,
			@RequestParam(value="producDescription", required=true)String producDescription,
			@RequestParam(value="affiliateStartYmdt", required=true)String affiliateStartYmdt,
			@RequestParam(value="affiliateEndYmdt", required=true)String affiliateEndYmdt,
			@RequestParam(value="productDiscountPercent", required=true)String productDiscountPercent,
			@RequestParam(value="affiliateShopNo", required=true)String affiliateShopNo) {
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put(AllyParamConstants.PARAM_PRODUCT_NAME, productName);
		paramMap.put(AllyParamConstants.PARAM_PRODUCT_CATEGORY_CODE, categoryCode);
		paramMap.put(AllyParamConstants.PARAM_PRODUCT_DESCRIPTION, producDescription);
		paramMap.put(AllyParamConstants.PARAM_PRODUCT_AFFILIATE_START_DATE, affiliateStartYmdt);
		paramMap.put(AllyParamConstants.PARAM_PRODUCT_AFFILIATE_END_DATE, affiliateEndYmdt);
		paramMap.put(AllyParamConstants.PARAM_PRODUCT_DISCOUNT_PERCENT, productDiscountPercent);
		paramMap.put(AllyParamConstants.PARAM_PRODUCT_AFFILIATE_SHOP_NUMBER, affiliateShopNo);
		
		Map<String, Object> resultMap = productBO.registerProduct(paramMap);
		model.addAllAttributes(resultMap);
		return jsonView;
	}
}
