package com.sx.ally.service.model;

import java.util.Date;

public class Product {

	private int productNo;
	private String productName;
	private String categoryCode;
	private String producDescription;
	private Date affiliateStartYmdt;
	private Date affiliateEndYmdt;
	private int productDiscountPercent;
	private int affiliateShopNo;

	public int getProductNo() {
		return productNo;
	}

	public void setProductNo(int productNo) {
		this.productNo = productNo;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getCategoryCode() {
		return categoryCode;
	}

	public void setCategoryCode(String categoryCode) {
		this.categoryCode = categoryCode;
	}

	public String getProducDescription() {
		return producDescription;
	}

	public void setProducDescription(String producDescription) {
		this.producDescription = producDescription;
	}

	public Date getAffiliateStartYmdt() {
		return affiliateStartYmdt;
	}

	public void setAffiliateStartYmdt(Date affiliateStartYmdt) {
		this.affiliateStartYmdt = affiliateStartYmdt;
	}

	public Date getAffiliateEndYmdt() {
		return affiliateEndYmdt;
	}

	public void setAffiliateEndYmdt(Date affiliateEndYmdt) {
		this.affiliateEndYmdt = affiliateEndYmdt;
	}

	public int getProductDiscountPercent() {
		return productDiscountPercent;
	}

	public void setProductDiscountPercent(int productDiscountPercent) {
		this.productDiscountPercent = productDiscountPercent;
	}

	public int getAffiliateShopNo() {
		return affiliateShopNo;
	}

	public void setAffiliateShopNo(int affiliateShopNo) {
		this.affiliateShopNo = affiliateShopNo;
	}

}
