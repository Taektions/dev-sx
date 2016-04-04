package com.sx.ally.service.model;

public class Company {

	private int companyNo;
	private String companyName;
	
	private int domainCount;

	public int getCompanyNo() {
		return companyNo;
	}

	public void setCompanyNo(int companyNo) {
		this.companyNo = companyNo;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public int getDomainCount() {
		return domainCount;
	}

	public void setDomainCount(int domainCount) {
		this.domainCount = domainCount;
	}
}
