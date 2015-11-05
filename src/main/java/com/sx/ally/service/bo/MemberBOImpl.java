package com.sx.ally.service.bo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sx.ally.service.dao.MemberDAO;
import com.sx.ally.service.model.Member;

@Service
public class MemberBOImpl implements MemberBO{

	@Autowired
	private MemberDAO memberDAO;
	
	@Override
	public Member getData() {
		return memberDAO.selectData();
	}

}
