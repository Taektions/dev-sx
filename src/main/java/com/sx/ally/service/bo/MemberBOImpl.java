package com.sx.ally.service.bo;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sx.ally.common.AllyParamConstants;
import com.sx.ally.common.bo.EmailSendBO;
import com.sx.ally.common.util.EmailCertificationUtil;
import com.sx.ally.service.dao.MemberDAO;
import com.sx.ally.service.model.Company;
import com.sx.ally.service.model.Member;
import com.sx.ally.service.model.MemberEmailCertificationInfo;

@Service
public class MemberBOImpl implements MemberBO{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MemberBOImpl.class);
	
	@Autowired
	private EmailSendBO emaiSendBO;

	@Autowired
	private MemberDAO memberDAO;
	
	@Override
	public List<Member> getMemberList(Map<String, Object> paramMap) {
		return memberDAO.selectMember(paramMap);
	}
	
	@Override
	public boolean validateMemberCertificationInfo(String loginID, String certificationCode) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put(AllyParamConstants.PARAM_MEMBER_LOGIN_ID, loginID);
		paramMap.put(AllyParamConstants.PARAM_MEMBER_CERTIFICATION_CODE, certificationCode);
		
		int certificationInfoCount = memberDAO.selectMemberEmailCertificationInfoCount(paramMap);
		int memberCount = memberDAO.selectMemberCount(paramMap);
		if (certificationInfoCount == 1 && memberCount == 1) {
			return true;
		}
		
		return false;
	}

	@Transactional
	@Override
	public boolean applyCertificationCode(Map<String, Object> paramMap) {
		try {
			
			String crtCode = EmailCertificationUtil.getCertificationCode();
			paramMap.put(AllyParamConstants.PARAM_MEMBER_CERTIFICATION_CODE, crtCode);
			
			String emailAddress = (String) paramMap.get(AllyParamConstants.PARAM_MEMBER_LOGIN_ID);			
			int memberCrtInfoCount = memberDAO.selectMemberEmailCertificationInfoCount(emailAddress);
			
			int insertUpdateResult = 0;
			if (memberCrtInfoCount < 1) {
				insertUpdateResult = memberDAO.insertMemberEmailCertificationInfo(paramMap);
			} else {
				insertUpdateResult = memberDAO.updateMemberEmailCertificationInfo(paramMap);
			}

			if (insertUpdateResult == 1) {				
				if (!emaiSendBO.sendCertificationEmail(paramMap)) {
					throw new Exception("send certification email is fail.");
				}
				
				return true;
			}			
			return false;
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error("에러: " + e);
			return false;
		}		
	}

	@Override
	public Map<String, Object> certificationMember(Map<String, Object> paramMap) {
		Map<String, Object> result = new HashMap<String, Object>();
		
		MemberEmailCertificationInfo certificationInfo = memberDAO.selectMemberEmailCertificationInfo(paramMap);
		if (certificationInfo == null) {
			result.put(AllyParamConstants.PARAM_RESULT_MESSAGE, "인증번호가 일치하지 않습니다.");
			return result;
		}
		
		long savedCrtTime = certificationInfo.getCertificationCodeIssuedYmdt().getTime();
		long nowTime = new Date().getTime();
		long elapseTime = nowTime - savedCrtTime;
		
		long limitTime = 180000;
		if ( elapseTime < limitTime ) {
			int memberCount = memberDAO.selectMemberCount(paramMap);
			
			if (memberCount < 1) {
				memberDAO.insertMember(paramMap);
			}
			
			result.put("loginKey", (String) paramMap.get(AllyParamConstants.PARAM_MEMBER_CERTIFICATION_CODE));
			result.put(AllyParamConstants.PARAM_RESULT_IS_SUCCESS, true);
			result.put(AllyParamConstants.PARAM_RESULT_MESSAGE, "이메일 인증이 완료되었습니다.");
		} else {
			result.put(AllyParamConstants.PARAM_RESULT_IS_SUCCESS, false);
			result.put(AllyParamConstants.PARAM_RESULT_MESSAGE, "인증번호 유효시간을 초과하였습니다. 인증번호를 다시 발급받아 주세요.");
		}
		
		return result;
	}

	@Override
	public List<Company> getCompanyList(Map<String, Object> paramMap) {
		return memberDAO.selectCompanyList(paramMap);
	}
}
