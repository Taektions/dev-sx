package com.sx.ally.common.bo;

import java.util.Map;

public interface EmailSendBO {
	
	public boolean sendEmail(String recipientAddress, String subject, String message);

	public boolean sendCertificationEmail(Map<String, Object> paramMap);
}
