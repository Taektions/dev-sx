package com.sx.ally.service.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sx.ally.service.model.AffiliateShop;

@Repository
public class AffiliateShopDAOImpl implements AffiliateShopDAO{
	
private static final String NAMESPACE = "affiliateShop.";
	
	@SuppressWarnings("unused")
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private SqlSessionTemplate allySqlMapClientTemplate;
	
	@Override
	public AffiliateShop selectAffiliateShop(int affiliateShopNo) {
		return (AffiliateShop) allySqlMapClientTemplate.selectOne(NAMESPACE + "selectAffiliateShop", affiliateShopNo);
	}
	
	@Override
	public List<AffiliateShop> selectAffiliateShopList(Map<String, Object> paramMap) {
		return allySqlMapClientTemplate.selectList(NAMESPACE + "selectAffiliateShopList", paramMap);
	}

	@Override
	public int insertAffiliateShop(Map<String, Object> paramMap) {
		return allySqlMapClientTemplate.update(NAMESPACE + "insertAffiliateShop", paramMap);
	}

	@Override
	public int updateShopStatusCode(Map<String, Object> paramMap) {
		return allySqlMapClientTemplate.update(NAMESPACE + "updateShopStatusCode", paramMap);
	}
	
	@Override
	public int updateShopProductCount(Map<String, Object> paramMap) {
		return allySqlMapClientTemplate.update(NAMESPACE + "updateShopProductCount", paramMap);
	}
}
