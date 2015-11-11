package com.sx.ally.common.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.sx.ally.service.bo.MemberBO;

public class AllyInterceptor extends HandlerInterceptorAdapter{
	
	@Autowired MemberBO memberBO;
	
	@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    	String loginID = request.getHeader("id");
    	String crtCode = request.getHeader("crtCode");
    	boolean isMember = memberBO.validateMemberCertificationInfo(loginID, crtCode);
    	
    	if (isMember) {
    		return true;
    	}
        
        response.sendRedirect("/ally/member/login");
    	return false;
    }
 
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        super.postHandle(request, response, handler, modelAndView);
    }
 
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        super.afterCompletion(request, response, handler, ex);
    }
}
