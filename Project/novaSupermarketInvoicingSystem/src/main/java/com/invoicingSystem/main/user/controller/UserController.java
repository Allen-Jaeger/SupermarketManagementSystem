package com.invoicingSystem.main.user.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.invoicingSystem.main.common.web.ExtjsPageRequest;
import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.user.domain.UserDTO;
import com.invoicingSystem.main.user.service.IUserService;
import com.invoicingSystem.main.user.util.MD5Tool;

import net.sf.json.JSONObject;

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
		try {
			request.getRequestDispatcher("/").forward(request, response);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}
	
	/**
	 * 	获取已经登陆者的信息
	 * @param request
	 */
	@GetMapping(value="/findMe")
	public Page<UserDTO>  findMe(HttpServletRequest request) {
		String userId = request.getSession().getAttribute("userId").toString();
		User user = userService.findById(Long.parseLong(userId));
		//  将User转化成DTO类
		List<UserDTO> userDtoList = new ArrayList<UserDTO>();
		userDtoList.add(new UserDTO(user));
		return new PageImpl<UserDTO>(userDtoList);
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
			return "修改失败！<br>密码长度应为6-16位";
		}
		if(MD5Tool.ToMd5String(pass).equals(user.getPassword())) {
			user.setPassword(MD5Tool.ToMd5String(newPass));
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
	@GetMapping(value="/logout")
	public void logout(HttpServletRequest request,HttpServletResponse response) {
		request.getSession().removeAttribute("userId");
		try {
			response.sendRedirect("login.html");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Find 分页查询
	 * @return
	 */
	@GetMapping(value="/findAll")
	public Page<UserDTO> findAllUsers(ExtjsPageRequest pageRequest) {
		//	分页的User
		Page<User> userPage = userService.findAll(pageRequest.getPageable());
		//  将User转化成DTO类
		List<UserDTO> userDtoList = new ArrayList<UserDTO>();
		for(User user :userPage){
			UserDTO dto = new UserDTO(user);
			userDtoList.add(dto);
		}
		return new PageImpl<UserDTO>(userDtoList,userPage.getPageable(),userPage.getTotalElements());
	}
	
	/**
	 * 上传头像
	 * @param extFile
	 * @param request
	 * @return
	 * @throws IOException 
	 */
	@PostMapping(value = "/userIcon")
	public void changeIcon(MultipartFile imgFile, HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("text/plain; charset=utf-8");
		//判断上传文件
		if(null == imgFile || imgFile.isEmpty()) {
			response.getWriter().write("{\"success\": true,\"info\":\"上传文件为空文件！\"}");
			return;
		}
		//获取用户信息
		String userId = request.getSession().getAttribute("userId").toString();
		User user = userService.findById(Long.parseLong(userId));
		//执行业务
		String res = userService.writeIcon(user, imgFile);
		response.getWriter().write("{\r\n" + 
				"    \"success\": true,\r\n" + 
				"    \"info\": \""+ res +"\"\r\n" + 
				"}");
		return;
	}
}
