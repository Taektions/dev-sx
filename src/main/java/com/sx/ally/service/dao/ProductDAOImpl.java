package com.sx.ally.service.dao;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ibatis.SqlMapClientTemplate;
import org.springframework.stereotype.Repository;

import com.sx.ally.service.model.Product;

@Repository
public class ProductDAOImpl implements ProductDAO{

	private static final String NAMESPACE = "product.";
	
	@SuppressWarnings("unused")
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private SqlMapClientTemplate allySqlMapClientTemplate;

	public SqlMapClientTemplate getSqlMapClientTemplate() {
		return allySqlMapClientTemplate;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Product> selectProductList(Map<String, Object> paramMap) {
		return getSqlMapClientTemplate().queryForList(NAMESPACE + "selectProductList", paramMap);
	}

	@Override
	public int insertProduct(Map<String, Object> paramMap) {
		return getSqlMapClientTemplate().update(NAMESPACE + "insertProduct", paramMap);
	}
}
