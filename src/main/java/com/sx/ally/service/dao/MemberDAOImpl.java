package com.sx.ally.service.dao;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ibatis.SqlMapClientTemplate;
import org.springframework.stereotype.Repository;

import com.sx.ally.service.model.Member;

@Repository
public class MemberDAOImpl implements MemberDAO{
	
	private static final String NAMESPACE = "member.";
	
	@SuppressWarnings("unused")
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private SqlMapClientTemplate allySqlMapClientTemplate;

	public SqlMapClientTemplate getSqlMapClientTemplate() {
		return allySqlMapClientTemplate;
	}

	@Override
	public Member selectData() {
		return (Member) getSqlMapClientTemplate().queryForObject(NAMESPACE + "selectData");
	}
	
}
