package com.sx.ally.service.bo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sx.ally.common.AllyParamConstants;
import com.sx.ally.service.dao.ProductDAO;
import com.sx.ally.service.model.Product;

@Service
public class ProductBOImpl implements ProductBO{
	
	@Autowired
	private AffiliateShopBO affiliateShopBO;
	
	@Autowired
	private ProductDAO productDAO;
	
	@Override
	public List<Product> getProductList(Map<String, Object> paramMap) {
		return productDAO.selectProductList(paramMap);
	}

	@Transactional
	@Override
	public Map<String, Object> registerProduct(Map<String, Object> paramMap) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		int updateResult = productDAO.insertProduct(paramMap);
		if(updateResult < 1) {
			resultMap.put(AllyParamConstants.PARAM_RESULT_IS_SUCCESS, false);
			resultMap.put(AllyParamConstants.PARAM_RESULT_MESSAGE, "상풍등록에 실패하였습니다.");
		} else {
			int affiliateShopNo = Integer.parseInt((String) paramMap.get(AllyParamConstants.PARAM_AFFILIATE_SHOP_NUMBER));
			affiliateShopBO.increaseProductCount(affiliateShopNo);
			resultMap.put(AllyParamConstants.PARAM_RESULT_IS_SUCCESS, true);
		}
		
		return resultMap;
	}

}
