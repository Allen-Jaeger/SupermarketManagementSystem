package com.invoicingSystem.main.user.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.user.domain.UserDTO;
import com.invoicingSystem.main.user.service.IUserService;

/**
 * @author LiJuncong
 * at 2018年9月22日
 */

@RestController
@RequestMapping("/")
public class UserController {
	@Autowired
	IUserService userService;
	
	
	@PostMapping(value = "/login")
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
	
	@GetMapping(value="/login")
	public void miss(HttpServletRequest request, HttpServletResponse response) {
		try {
			request.getRequestDispatcher("login.html").forward(request, response);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
}
