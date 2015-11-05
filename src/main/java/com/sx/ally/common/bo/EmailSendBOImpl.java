package com.sx.ally.common.bo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSendBOImpl implements EmailSendBO {

	@Autowired
	private JavaMailSender mailSender;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(EmailSendBOImpl.class);
	
	@Override
	public boolean sendEmail(String recipientAddress, String subject, String message) {
		try {
			SimpleMailMessage email = new SimpleMailMessage();
	        email.setTo(recipientAddress);
	        email.setSubject(subject);
	        email.setText(message);
	        
	        mailSender.send(email);
		} catch (MailException e) {
			e.printStackTrace();
			LOGGER.error("에러: " + e);
			return false;
		}
        
		return true;
	}

	@Override
	public boolean sendCertificationEmail(String recipientAddress) {
		String subject = "회원가입 인증메일 입니다.";
		String message = "";
		
		return sendEmail(recipientAddress, subject, message);
	}
}
