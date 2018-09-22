package com.invoicingSystem.main.user.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.user.domain.UserDTO;
import com.invoicingSystem.main.user.service.IUserService;

/**
 * @author LiJuncong
 * at 2018年9月22日
 */

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	IUserService userService;
	@Autowired
	HttpServletRequest request;
	
	@RequestMapping(value = "/login", method=RequestMethod.POST)
	public String login(UserDTO userDTO) {
		User user = userService.findByWorkNum(userDTO.getWorkNum());
		String loginResult = userService.userLogin(userDTO.toUserObject(), user);
		if(loginResult.equals("登陆成功")) {
			//跳转到主页
			return loginResult;
		}else {
			return loginResult;
		}
	}
	
	
}
