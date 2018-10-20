package com.invoicingSystem.main.aspect.util;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.user.service.IUserService;

/**
 * @author LiJuncong
 * at 2018年10月20日
 */
@Component
public class BaseAspect{
	protected Logger log =  LoggerFactory.getLogger(this.getClass());
	@Autowired
	protected IUserService userService;
	
	/**
	 * 1.返回数据库中的User
	 * 2.当情况异常时，返回权限为空的User
	 * @return
	 */
	public User getLoginedUser(HttpServletRequest request) {
		Object idObj = request.getSession().getAttribute("userId");
		if(null != idObj && !idObj.equals("")) {
			User user = userService.findById(Long.parseLong(idObj.toString()));
			if(user != null) {
				return user;
			}
		}
		return new User();
	}
}
