package com.sx.ally.service.bo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sx.ally.common.AllyParamConstants;
import com.sx.ally.service.dao.AffiliateShopDAO;
import com.sx.ally.service.model.AffiliateShop;

@Service
public class AffiliateShopBOImpl implements AffiliateShopBO{
	
	@Autowired
	private AffiliateShopDAO affiliateShopDAO; 
	
	@Override
	public AffiliateShop getAffiliateShop(int affiliateShopNo) {
		return affiliateShopDAO.selectAffiliateShop(affiliateShopNo);
	}
	
	@Override
	public List<AffiliateShop> getAffiliateShopList(Map<String, Object> paramMap) {
		return affiliateShopDAO.selectAffiliateShopList(paramMap);
	}

	@Override
	public Map<String, Object> registerAffiliateShop(Map<String, Object> paramMap) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put(AllyParamConstants.PARAM_RESULT_IS_SUCCESS, true);
		
		int insertResult = affiliateShopDAO.insertAffiliateShop(paramMap);
		if(insertResult < 1) {
			resultMap.put(AllyParamConstants.PARAM_RESULT_MESSAGE, "가입요청 실패. 다시시도해주세요.");
			resultMap.put(AllyParamConstants.PARAM_RESULT_IS_SUCCESS, false);
		}
		return resultMap;
	}

	@Override
	public Map<String, Object> admissionRegister(int affiliateShopNo) {
		return updateShopStatusCode(affiliateShopNo, "NOML");
	}
	
	@Override
	public Map<String, Object> unadmissionRegister(int affiliateShopNo) {
		return updateShopStatusCode(affiliateShopNo, "WAIT");
	}
	
	@Override
	public void increaseProductCount(int affiliateShopNo) {
		updateProductCount(affiliateShopNo, 1);
	}
	
	@Override
	public void decreaseProductCount(int affiliateShopNo) {
		updateProductCount(affiliateShopNo, -1);
	}
	
	private Map<String, Object> updateShopStatusCode(int affiliateShopNo, String statusCode) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put(AllyParamConstants.PARAM_RESULT_IS_SUCCESS, true);
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put(AllyParamConstants.PARAM_AFFILIATE_SHOP_NUMBER, affiliateShopNo);
		paramMap.put(AllyParamConstants.PARAM_AFFILIATE_SHOP_STATUS_CODE, statusCode);
		
		int updateResult = affiliateShopDAO.updateShopStatusCode(paramMap);
		if(updateResult < 1) {
			resultMap.put(AllyParamConstants.PARAM_RESULT_IS_SUCCESS, false);
			resultMap.put(AllyParamConstants.PARAM_RESULT_MESSAGE, "회원 상태 변경에 실패하였습니다.");
		}
		return resultMap;
	}

	private boolean updateProductCount(int affiliateShopNo, int increaseCount) {
		AffiliateShop shopInfo = affiliateShopDAO.selectAffiliateShop(affiliateShopNo);
		int productCount = shopInfo.getProductCount();
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put(AllyParamConstants.PARAM_AFFILIATE_SHOP_NUMBER, affiliateShopNo);
		paramMap.put(AllyParamConstants.PARAM_AFFILIATE_SHOP_PRODUCT_COUNT, productCount + increaseCount);
		
		int updateResult = affiliateShopDAO.updateShopProductCount(paramMap);
		if(updateResult < 1) {
			return false;
		}
		return true;
	}
}
