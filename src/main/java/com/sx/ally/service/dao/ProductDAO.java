package com.sx.ally.service.dao;

import java.util.List;
import java.util.Map;

import com.sx.ally.service.model.Product;

public interface ProductDAO {
	public List<Product> selectProductList(Map<String, Object> paramMap);

	public int insertProduct(Map<String, Object> paramMap);

}
