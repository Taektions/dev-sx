package com.sx.ally.service.bo;

import java.util.List;
import java.util.Map;

import com.sx.ally.service.model.AffiliateShop;

public interface AffiliateShopBO {
	
	public AffiliateShop getAffiliateShop(int affiliateShopNo);

	public List<AffiliateShop> getAffiliateShopList(Map<String, Object> paramMap);

	public Map<String, Object> registerAffiliateShop(Map<String, Object> paramMap);

	public Map<String, Object> admissionRegister(int affiliateShopNo);

	public Map<String, Object> unadmissionRegister(int affiliateShopNo);

	public void increaseProductCount(int affiliateShopNo);

	public void decreaseProductCount(int affiliateShopNo);

}
