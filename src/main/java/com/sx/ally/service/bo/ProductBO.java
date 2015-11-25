package com.sx.ally.service.bo;

import java.util.List;
import java.util.Map;

import com.sx.ally.service.model.Product;

public interface ProductBO {

	public List<Product> getProductList(Map<String, Object> paramMap);

	public Map<String, Object> registerProduct(Map<String, Object> paramMap);
}
