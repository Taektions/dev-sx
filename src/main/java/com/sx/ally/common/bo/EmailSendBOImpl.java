package com.sx.ally.common.bo;

import java.util.Map;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.sx.ally.common.AllyParamConstants;

@Service
public class EmailSendBOImpl implements EmailSendBO {

	@Autowired
	private JavaMailSender mailSender;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(EmailSendBOImpl.class);
	
	@Override
	public boolean sendEmail(String recipientAddress, String subject, String message) {
		try {
	        Session mailSession = Session.getDefaultInstance(new Properties(), null);
	        mailSession.setDebug(true);

	        MimeMessage mimeMessage = new MimeMessage(mailSession);
	        mimeMessage.setSubject(subject);
	        mimeMessage.setFrom(new InternetAddress("ally@ally.com"));
	        mimeMessage.setContent(message, "text/html;charset=UTF-8");
	        mimeMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(recipientAddress));
	        mailSender.send(mimeMessage);
	        
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error("에러: " + e);
			return false;
		}
        
		return true;
	}

	@Override
	public boolean sendCertificationEmail(Map<String, Object> paramMap) {
		String recipientAddress = (String) paramMap.get(AllyParamConstants.PARAM_MEMBER_LOGIN_ID);
		String crtCode = (String) paramMap.get(AllyParamConstants.PARAM_MEMBER_CERTIFICATION_CODE);
		String companyNo = (String) paramMap.get(AllyParamConstants.PARAM_MEMBER_COMPANY_NUMBER);
		int ageGroup = (Integer) paramMap.get(AllyParamConstants.PARAM_MEMBER_AGE_GROUP);
		String sex = (String) paramMap.get(AllyParamConstants.PARAM_MEMBER_SEX);
		
		String subject = "회원가입 인증메일 입니다.";
		String message = "<p><span style='color: rgb(99, 99, 99);'>안녕하세요.</span></p><p><br></p>"
				+ "<p><span style='color: rgb(99, 99, 99);'>고객님의 가입인증을 위한 인증코드 입니다.</span></p>"
				+ "<a href='http://localhost:9001/ally/member/certificationMember?certificationCode=" + crtCode + "&emailAddress=" + recipientAddress + "&ageGroup=" + ageGroup + "&sex=" + sex + "&companyNo=" + companyNo +"' target='_self' style='cursor: pointer; white-space: pre;'>[이메일 인증]</a>"
				+ "<p><b><span style='font-size: 14pt; color: rgb(0, 117, 200);'>[" + crtCode + "]</span></b></p>"
				+ "<p><br></p><p><span style='color: rgb(99, 99, 99);'>ALLY TEAM.</span></p>";
		
		return sendEmail(recipientAddress, subject, message);
	}
}
