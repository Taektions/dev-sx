package com.sx.ally.common.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

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
}
