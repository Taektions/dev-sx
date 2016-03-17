package com.sx.ally.service.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sx.ally.common.AllyParamConstants;
import com.sx.ally.service.model.Company;
import com.sx.ally.service.model.Member;
import com.sx.ally.service.model.MemberEmailCertificationInfo;

@Repository
public class MemberDAOImpl implements MemberDAO{
	
	private static final String NAMESPACE = "member.";
	
	@SuppressWarnings("unused")
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private SqlSessionTemplate allySqlMapClientTemplate;

	@Override
	public List<Member> selectMember(Map<String, Object> paramMap) {
		return allySqlMapClientTemplate.selectList(NAMESPACE + "selectMember", paramMap);
	}
	
	@Override
	public int selectMemberCount(Map<String, Object> paramMap) {
		return (Integer) allySqlMapClientTemplate.selectOne(NAMESPACE + "selectMemberCount", paramMap);
	}
	
	@Override
	public int insertMember(Map<String, Object> paramMap) {
		return allySqlMapClientTemplate.update(NAMESPACE + "insertMember", paramMap);
	}
	
	@Override
	public MemberEmailCertificationInfo selectMemberEmailCertificationInfo(String emailAddress) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put(AllyParamConstants.PARAM_MEMBER_LOGIN_ID, emailAddress);
		return (MemberEmailCertificationInfo) allySqlMapClientTemplate.selectOne(NAMESPACE + "selectMemberEmailCertificationInfo", paramMap);
	}
	
	@Override
	public MemberEmailCertificationInfo selectMemberEmailCertificationInfo(Map<String, Object> paramMap) {
		return (MemberEmailCertificationInfo) allySqlMapClientTemplate.selectOne(NAMESPACE + "selectMemberEmailCertificationInfo", paramMap);
	}
	
	@Override
	public int selectMemberEmailCertificationInfoCount(String emailAddress) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put(AllyParamConstants.PARAM_MEMBER_LOGIN_ID, emailAddress);
		return (Integer) allySqlMapClientTemplate.selectOne(NAMESPACE + "selectMemberEmailCertificationInfoCount", paramMap);
	}
	
	@Override
	public int selectMemberEmailCertificationInfoCount(Map<String, Object> paramMap) {
		return (Integer) allySqlMapClientTemplate.selectOne(NAMESPACE + "selectMemberEmailCertificationInfoCount", paramMap);
	}

	@Override
	public int insertMemberEmailCertificationInfo(Map<String, Object> paramMap) {
		return allySqlMapClientTemplate.update(NAMESPACE + "insertMemberEmailCertificationInfo", paramMap);
	}

	@Override
	public int updateMemberEmailCertificationInfo(Map<String, Object> paramMap) {
		return allySqlMapClientTemplate.update(NAMESPACE + "updateMemberEmailCertificationInfo", paramMap);
	}

	@Override
	public List<Company> selectCompanyList(Map<String, Object> paramMap) {
		return allySqlMapClientTemplate.selectList(NAMESPACE + "selectCompanyList", paramMap);
	}	
}
