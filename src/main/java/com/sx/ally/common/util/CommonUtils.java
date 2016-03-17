package com.sx.ally.common.util;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.apache.commons.lang.StringUtils;

public class CommonUtils {
	

	/**
	 * Date 타입의 날짜를 string 으로 반환한다. yyyyMMdd_hhmm
	 * 
	 * @param date
	 * @return
	 */
	public static String getDateString(Date date) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd_HHmm", Locale.KOREA);		
		return simpleDateFormat.format(date);
	}
	
	public static String urlDecodingToUTF8(String param) throws UnsupportedEncodingException {
		if (StringUtils.isNotBlank(param)) {
			return URLDecoder.decode(param, "UTF-8");
		}
		
		return null;
	}
}
