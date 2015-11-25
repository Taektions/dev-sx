package com.sx.ally.common.util;

import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class EmailCertificationUtil {
	
	private static final Logger logger = LoggerFactory.getLogger(EmailCertificationUtil.class);
	
	public static String getCertificationCode() {
		
		String crtCode = "";		
		Random oRandom = new Random();		
		for(int loop = 0; loop <6; loop++) {
			crtCode += oRandom.nextInt(10);
		}		
	    
		logger.info("issued certification code : " + crtCode);		
		return crtCode;
	}

}
