package com.sx.ally.common.bo;

public interface EmailSendBO {
	
	public boolean sendEmail(String recipientAddress, String subject, String message);

	public boolean sendCertificationEmail(String recipientAddress);
}
