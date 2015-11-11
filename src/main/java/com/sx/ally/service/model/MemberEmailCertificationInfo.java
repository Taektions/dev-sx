package com.sx.ally.service.model;

import java.util.Date;

public class MemberEmailCertificationInfo {

	private String emailAddress;
	private String certificationCode;
	private Date certificationCodeIssuedYmdt;

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public String getCertificationCode() {
		return certificationCode;
	}

	public void setCertificationCode(String certificationCode) {
		this.certificationCode = certificationCode;
	}

	public Date getCertificationCodeIssuedYmdt() {
		return certificationCodeIssuedYmdt;
	}

	public void setCertificationCodeIssuedYmdt(Date certificationCodeIssuedYmdt) {
		this.certificationCodeIssuedYmdt = certificationCodeIssuedYmdt;
	}

}
