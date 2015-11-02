package com.sx.ia.service.dao;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ibatis.SqlMapClientTemplate;
import org.springframework.stereotype.Repository;

import com.sx.ia.service.model.HomeModel;

@Repository
public class HomeDAOImpl implements HomeDAO{
	
	private static final String NAMESPACE = "invisibleAffiliates.";
	
	@SuppressWarnings("unused")
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private SqlMapClientTemplate iaSqlMapClientTemplate;

	public SqlMapClientTemplate getSqlMapClientTemplate() {
		return iaSqlMapClientTemplate;
	}

	@Override
	public HomeModel selectData() {
		return (HomeModel) getSqlMapClientTemplate().queryForObject(NAMESPACE + "selectData");
	}
	
}
