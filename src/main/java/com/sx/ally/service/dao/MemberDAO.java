package com.sx.ally.service.dao;

import java.util.List;
import java.util.Map;

import com.sx.ally.service.model.Company;
import com.sx.ally.service.model.Member;
import com.sx.ally.service.model.MemberEmailCertificationInfo;

public interface MemberDAO {
	
	public List<Member> selectMember(Map<String, Object> paramMap);
	
	public int selectMemberCount(Map<String, Object> paramMap);
	
	public int insertMember(Map<String, Object> paramMap);
	
	public MemberEmailCertificationInfo selectMemberEmailCertificationInfo(Map<String, Object> paramMap);
	
	public MemberEmailCertificationInfo selectMemberEmailCertificationInfo(String emailAddress);
	
	public int selectMemberEmailCertificationInfoCount(Map<String, Object> paramMap);
	
	public int selectMemberEmailCertificationInfoCount(String emailAddress);

	public int insertMemberEmailCertificationInfo(Map<String, Object> paramMap);
	
	public int updateMemberEmailCertificationInfo(Map<String, Object> paramMap);

	public List<Company> selectCompanyList(Map<String, Object> paramMap);
	
}
