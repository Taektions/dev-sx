package com.sx.ally.service.dao;

import java.util.List;
import java.util.Map;

import com.sx.ally.service.model.AffiliateShop;

public interface AffiliateShopDAO {

	public List<AffiliateShop> selectAffiliateShopList(Map<String, Object> paramMap);

	public int insertAffiliateShop(Map<String, Object> paramMap);

	public int updateShopStatusCode(Map<String, Object> paramMap);

	public int updateShopProductCount(Map<String, Object> paramMap);

	public AffiliateShop selectAffiliateShop(int affiliateShopNo);

}
