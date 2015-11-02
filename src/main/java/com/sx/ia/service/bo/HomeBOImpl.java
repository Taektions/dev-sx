package com.sx.ia.service.bo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sx.ia.service.dao.HomeDAO;
import com.sx.ia.service.model.HomeModel;

@Service
public class HomeBOImpl implements HomeBO{

	@Autowired
	private HomeDAO homeDao;
	
	@Override
	public HomeModel getData() {
		return homeDao.selectData();
	}

}
