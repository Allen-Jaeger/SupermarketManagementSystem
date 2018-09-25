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
	
	/**
	 * 	登陆请求
	 * @param userDTO
	 * @param request
	 * @return
	 */
	@PostMapping(value = "/login")
	public String login(UserDTO userDTO, HttpServletRequest request) {
		User user = userService.findByWorkNum(userDTO.getWorkNum());
		String loginResult = userService.userLogin(userDTO.toLoginUser(), user);
		if(loginResult.equals("登陆成功")) {
			//登陆成功需要存入Session
			request.getSession().setAttribute("userId", user.getId());
			return loginResult;
		}else {
			return loginResult;
		}
	}
	
	/**
	 * 
	 * 	跳转到登陆页面
	 * @param request
	 * @param response
	 */
	@GetMapping(value="/login")
	public void miss(HttpServletRequest request, HttpServletResponse response) {
		try {
			request.getRequestDispatcher("login.html").forward(request, response);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 	获取已经登陆者的信息
	 * @param request
	 */
	@GetMapping(value="/findMe")
	public UserDTO findMe(HttpServletRequest request) {
		String userId = request.getSession().getAttribute("userId").toString();
		User user = userService.findById(Long.parseLong(userId));
		UserDTO userDTO = new UserDTO(user);
		return userDTO;
	}
}
