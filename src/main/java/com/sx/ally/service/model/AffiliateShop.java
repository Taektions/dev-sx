package com.sx.ally.service.model;

import java.util.Date;

public class AffiliateShop {

	private int affiliateShopNo;
	private String affiliateShopName;
	private String representative;
	private String shopCategoryCode;
	private String telephoneNo;
	private String cellphoneNo;
	private String loginID;
	private String loginPassword;
	private int productCount;
	private Date lastLoginYmdt;
	private String affiliateShopStatusCode;
	private Date joinAdmissionYmdt;

	public int getAffiliateShopNo() {
		return affiliateShopNo;
	}

	public void setAffiliateShopNo(int affiliateShopNo) {
		this.affiliateShopNo = affiliateShopNo;
	}

	public String getAffiliateShopName() {
		return affiliateShopName;
	}

	public void setAffiliateShopName(String affiliateShopName) {
		this.affiliateShopName = affiliateShopName;
	}

	public String getRepresentative() {
		return representative;
	}

	public void setRepresentative(String representative) {
		this.representative = representative;
	}

	public String getShopCategoryCode() {
		return shopCategoryCode;
	}

	public void setShopCategoryCode(String shopCategoryCode) {
		this.shopCategoryCode = shopCategoryCode;
	}

	public String getTelephoneNo() {
		return telephoneNo;
	}

	public void setTelephoneNo(String telephoneNo) {
		this.telephoneNo = telephoneNo;
	}

	public String getLoginID() {
		return loginID;
	}

	public void setLoginID(String loginID) {
		this.loginID = loginID;
	}

	public String getLoginPassword() {
		return loginPassword;
	}

	public void setLoginPassword(String loginPassword) {
		this.loginPassword = loginPassword;
	}

	public int getProductCount() {
		return productCount;
	}

	public void setProductCount(int productCount) {
		this.productCount = productCount;
	}

	public Date getLastLoginYmdt() {
		return lastLoginYmdt;
	}

	public void setLastLoginYmdt(Date lastLoginYmdt) {
		this.lastLoginYmdt = lastLoginYmdt;
	}

	public String getCellphoneNo() {
		return cellphoneNo;
	}

	public void setCellphoneNo(String cellphoneNo) {
		this.cellphoneNo = cellphoneNo;
	}

	public String getAffiliateShopStatusCode() {
		return affiliateShopStatusCode;
	}

	public void setAffiliateShopStatusCode(String affiliateShopStatusCode) {
		this.affiliateShopStatusCode = affiliateShopStatusCode;
	}

	public Date getJoinAdmissionYmdt() {
		return joinAdmissionYmdt;
	}

	public void setJoinAdmissionYmdt(Date joinAdmissionYmdt) {
		this.joinAdmissionYmdt = joinAdmissionYmdt;
	}

}
