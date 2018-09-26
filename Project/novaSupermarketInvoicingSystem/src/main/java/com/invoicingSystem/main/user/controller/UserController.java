package com.invoicingSystem.main.user.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.user.domain.UserDTO;
import com.invoicingSystem.main.user.service.IUserService;
import com.invoicingSystem.main.user.util.MD5Tool;

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
	 * 	执行登陆
	 * @param userDTO
	 * @param request
	 * @return
	 */
	@PostMapping(value = "/login")
	public String login(UserDTO userDTO, HttpServletRequest request, HttpServletResponse response) {
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
	 * 	请求登陆页面
	 * @param request
	 * @param response
	 */
	@GetMapping(value="/login")
	public void miss(HttpServletRequest request, HttpServletResponse response) {
		if(null != request.getSession().getAttribute("userId") && !request.getSession().getAttribute("userId").equals("")) {
			//认为已经登录
			try {
				request.getRequestDispatcher("/").forward(request, response);
				return;
			} catch (Exception e) {
				e.printStackTrace();
			} 
		}
		try {
			request.getRequestDispatcher("login.html").forward(request, response);
			return;
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 	获取已经登陆者的信息
	 * @param request
	 */
	@GetMapping(value="/findMe")
	public UserDTO findMe(HttpServletRequest request, HttpServletResponse response) {
		String userId = request.getSession().getAttribute("userId").toString();
		User user = userService.findById(Long.parseLong(userId));
		UserDTO userDTO = new UserDTO(user);
		return userDTO;
	}
	
	/**
	 * 
	 * @param pass	旧密码
	 * @param newPass	新密码
	 * @param request	自动注入以查找已登录用户
	 * @return
	 */
	@PostMapping(value = "/password")
	public String changePassword(String pass, String newPass, HttpServletRequest request) {
		String userId = request.getSession().getAttribute("userId").toString();
		User user = userService.findById(Long.parseLong(userId));
		//确认密码长度
		if(newPass.length() <= 5 || newPass.length() >= 15) {
			return "修改失败！新密码长度不足，密码长度应为6-16位";
		}
		if(MD5Tool.ToMd5String(pass).equals(user.getPassword())) {
			user.setPassword(newPass);
			userService.save(user);
			return "修改成功";
		}else {
			return "原密码错误！修改失败";
		}
	}
	
	/**
	 * 注销
	 * @param request
	 * @param response
	 */
	@DeleteMapping(value="/login")
	public void logout(HttpServletRequest request,HttpServletResponse response) {
		request.getSession().removeAttribute("userId");
		try {
			response.sendRedirect("login.html");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
}
