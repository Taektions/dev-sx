package com.sx.ally.service.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.sx.ally.common.AllyParamConstants;
import com.sx.ally.common.util.CommonUtils;
import com.sx.ally.service.bo.AffiliateShopBO;
import com.sx.ally.service.bo.MemberBO;
import com.sx.ally.service.bo.ProductBO;
import com.sx.ally.service.model.AffiliateShop;
import com.sx.ally.service.model.Member;
import com.sx.ally.service.model.Product;

@RequestMapping(value = "/admin")
@Controller
public class AdminController {
	
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	
	@Autowired
	private MemberBO memberBO;
	
	@Autowired
	private ProductBO productBO;
	
	@Autowired
	private AffiliateShopBO affiliateShopBO;
	
	@Autowired
	private MappingJackson2JsonView jsonView;

	@RequestMapping(value = "/main")
	public String home(Locale locale, Model model) {
		logger.info("Admin Page : The client locale is {}.", locale);

		Map<String, Object> paramMap = new HashMap<String, Object>();
		List<Member> memberList = memberBO.getMemberList(paramMap);
		
		List<AffiliateShop> shopList = affiliateShopBO.getAffiliateShopList(paramMap);
		List<Product> productList = productBO.getProductList(paramMap);
		
		
		model.addAttribute("memberList", memberList);
		model.addAttribute("shopList", shopList);
		model.addAttribute("productList", productList);
		return "admin/main";
	}
	
	@RequestMapping(value = "/shop/list")
	public String getAffiliateShopList(Model model,
			@RequestParam(value="affiliateShopNo", required=false)String affiliateShopNo,
			@RequestParam(value="affiliateShopName", required=false)String affiliateShopName,
			@RequestParam(value="representative", required=false)String representative,
			@RequestParam(value="telephoneNo", required=false)String telephoneNo,
			@RequestParam(value="cellphoneNo", required=false)String cellphoneNo,
			@RequestParam(value="loginID", required=false)String loginID,
			@RequestParam(value="shopCategoryCode", required=false)String shopCategoryCode,
			@RequestParam(value="affiliateShopStatusCode", required=false)String affiliateShopStatusCode,
			@RequestParam(value="searchCondition", required=false)String searchCondition,
			@RequestParam(value="searchValue", required=false)String searchValue) throws UnsupportedEncodingException {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put(AllyParamConstants.PARAM_AFFILIATE_SHOP_NUMBER, affiliateShopNo);
		paramMap.put(AllyParamConstants.PARAM_AFFILIATE_SHOP_NAME, CommonUtils.urlDecodingToUTF8(affiliateShopName));
		paramMap.put(AllyParamConstants.PARAM_AFFILIATE_SHOP_REPRESENTATIVE, CommonUtils.urlDecodingToUTF8(representative));
		paramMap.put(AllyParamConstants.PARAM_AFFILIATE_SHOP_TELEPHONE_NUMBER, telephoneNo);
		paramMap.put(AllyParamConstants.PARAM_AFFILIATE_SHOP_CELLPHONE_NUMBER, cellphoneNo);
		paramMap.put(AllyParamConstants.PARAM_AFFILIATE_SHOP_LOGIN_ID, loginID);
		paramMap.put(AllyParamConstants.PARAM_AFFILIATE_SHOP_CATEGORY_CODE, shopCategoryCode);
		paramMap.put(AllyParamConstants.PARAM_AFFILIATE_SHOP_STATUS_CODE, affiliateShopStatusCode);
		
		List<AffiliateShop> shopList = affiliateShopBO.getAffiliateShopList(paramMap);
		
		model.addAttribute(AllyParamConstants.PARAM_SEARCH_CONDITION, searchCondition);
		model.addAttribute(AllyParamConstants.PARAM_SEARCH_VALUE, searchValue);
		model.addAllAttributes(paramMap);
		model.addAttribute("shopList", shopList);
		return "admin/affiliateShop/affiliateShopList";
	}
	
	@RequestMapping(value = "/shop/aply")
	public String openPageApplyAffiliateShop(Model model) {
		return "admin/affiliateShop/applyAffiliateShop";
	}
	
	@RequestMapping(value = "/shop/adms")
	public String admissionAffiliateShop(Model model) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		
		List<AffiliateShop> shopList = affiliateShopBO.getAffiliateShopList(paramMap);
		
		model.addAttribute("shopList", shopList);
		return "admin/affiliateShop/admissionList";
	}
}
