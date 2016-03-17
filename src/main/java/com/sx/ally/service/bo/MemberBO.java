package com.sx.ally.service.bo;

import java.util.List;
import java.util.Map;

import com.sx.ally.service.model.Company;
import com.sx.ally.service.model.Member;

public interface MemberBO {

	public List<Member> getMemberList(Map<String, Object> paramMap);

	public boolean applyCertificationCode(Map<String, Object> paramMap);

	public Map<String, Object> certificationMember(Map<String, Object> paramMap);

	public boolean validateMemberCertificationInfo(String loginID, String certificationCode);

	public List<Company> getCompanyList(Map<String, Object> paramMap);

}
