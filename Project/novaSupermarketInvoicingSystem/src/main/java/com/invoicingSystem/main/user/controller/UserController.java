package com.invoicingSystem.main.user.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.IdentityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.invoicingSystem.main.common.enum_tools.EnumTool;
import com.invoicingSystem.main.common.web.ExtjsPageRequest;
import com.invoicingSystem.main.shop.service.IShopService;
import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.user.domain.UserDTO;
import com.invoicingSystem.main.user.domain.UserQueryDTO;
import com.invoicingSystem.main.user.service.IUserService;
import com.invoicingSystem.main.user.util.MD5Tool;
import com.invoicingSystem.main.user.util.Privilege;
import com.invoicingSystem.main.user.util.UserStatus;
import com.invoicingSystem.main.user.util.UserType;
import com.invoicingSystem.main.warehouse.service.IWarehouseService;

/**
 * @author LiJuncong
 * at 2018年9月22日
 */

@RestController
@RequestMapping("/")
public class UserController {
	@Autowired
	IUserService userService;
	@Autowired
	IWarehouseService warehouseService;
	@Autowired
	IShopService shopService;
	@Value("#{userDefaultBean.defPassword}")
	private String defPass; // 初始密码	
	@Value("#{userDefaultBean.defIconUrl}")
	private String defIconUrl; // 头像
	@Autowired
	IdentityService identityService;
	
	
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
	 * 	自动跳转
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
			response.sendRedirect("/login.html");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Find 分页查询
	 * @return
	 */
	@GetMapping(value="/findAll")
	public Page<UserDTO> findAllUsers_EDIT_USER(ExtjsPageRequest pageRequest) {
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
	
	@PostMapping(value="/specFind")
	public Page<UserDTO> specFindUsers(UserQueryDTO userQueryDTO ,ExtjsPageRequest pageRequest){
		Page<User> res =  userService.findAll(UserQueryDTO.getWhereClause(userQueryDTO), pageRequest.getPageable());
		List<UserDTO> userDtoList = new ArrayList<UserDTO>();
		for(User user : res) {
			userDtoList.add(new UserDTO(user));
		}
		return new PageImpl<UserDTO>(userDtoList,res.getPageable(),res.getTotalElements());
	}
	
	/**
	 * 获取Enum的键值对集合
	 * @param enumName
	 * @return
	 */
	@GetMapping(value = "/getEnum")
	public List<Map<String,String>> allUserType(@RequestParam String enumName) {
		EnumTool et = null;
		switch(enumName) {
		case "UserType":
			et = new EnumTool(UserType.class);
			break;
		case "Privilege":
			et = new EnumTool(Privilege.class);
			break;
		}
		return et.allToMap();
	}
	/**
	 * 	获取对应用户类型的对应部门
	 * @param userT
	 * @return
	 */
	@GetMapping(value = "/getDep")
	public List<Map<String,String>> getDep(@RequestParam String userT){
		if(userT.equals("all")) {
			List<Map<String,String>> list = warehouseService.getAllForMapList();
			list.addAll(shopService.getAllForMapList());
			return list;
		}
		EnumTool et = new EnumTool(UserType.class);
		UserType ut = (UserType) et.transToEnum(userT);
		if(null == ut) {
			return null;
		}else if(ut.equals(UserType.KEEPER)) {
			//返回仓库
			return warehouseService.getAllForMapList();
		}else if(ut.equals(UserType.STORE_MANAGER) || ut.equals(UserType.SALESMAN)) {
			//返回商店
			return shopService.getAllForMapList();
		}else {
			return null;
		}
	}
	/**
	 * 获取所有可用部门
	 * @return
	 */
	@GetMapping(value = "/getAllDep")
	public List<Map<String,String>> getAllDep(){
		return userService.getAllDep();
	}
	
	/**
	 *  	用于验证工号或证件是否被使用
	 * @param wk_num
	 * @return
	 */
	@GetMapping(value="/valWorkNum")
	public String valWorkNum(String wk_num ,String wk_Id){
		String res = null;
		if(null != userService.findByWorkNum(wk_num)) {
			res = "该工号已经被占用";
		}
		if(null != wk_Id && userService.findById(Long.parseLong(wk_Id)).getWorkNum().equals(wk_num)) {
			res = null;
		}
		return res;
	}
	@GetMapping(value="/valIdentity")
	public String valIdentity(String identity, String wk_Id){
		String res = null;
		if(null != userService.findByIdentity(identity)) {
			res= "该证件号已经被录入";
		}
		if(null != wk_Id && userService.findById(Long.parseLong(wk_Id)).getIdentity().equals(identity)) {
			res = null;
		}
		return res;
	}

	/**
	 * 返回一个未被使用的工号
	 * @return
	 */
	@GetMapping(value="/randomWkNum")
	public String getRandomWkNum(){
		String res = null;
		Random random = new Random();
		while(true) {
			res = "wk" + random.nextInt(9999999);
			if(null == userService.findByWorkNum(res)){
				break;
			}
		}
		return res;
	}
	
	/**
	 * 	添加用户，	日期需要特别处理
	 * @param userDTO
	 * @param hireDateEx
	 * @return
	 */
	@PostMapping(value="/addUser")
	public String addUser_EDIT_USER(UserDTO userDTO, String hireDateEx) {
		//权限控制 使用Aspect
//		String userId = request.getSession().getAttribute("userId").toString();
//		User opUser = userService.findById(Long.parseLong(userId));
//		for(Privilege pr : opUser.getPrivileges()) {
//			if(pr.equals(Privilege.EDIT_USER)) {
//				
//			}
//		}
		userDTO.setPassword(defPass);
		userDTO.setIconUrl(defIconUrl);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			userDTO.setHireDate(sdf.parse(hireDateEx));
		} catch (Exception e) {
			userDTO.setHireDate(new Date());
		}
		User user = userDTO.toUserObject();
		userService.buildDepartment(user, Long.parseLong(userDTO.getDepName()));
		userService.save(user);
		org.activiti.engine.identity.User userForWS = identityService.newUser(user.getName());
		identityService.saveUser(userForWS);
		identityService.createMembership(user.getName(), user.getUserType().toString());
		
		return "{\"success\":\"true\",\"info\":\"添加成功，初始密码为" +defPass+ "\"}";
	}
	/**
	 * 使用复杂查询  与userService的getAllDep()对应
	 * @return
	 */
	@GetMapping(value="/findDepAll")
	public Page<UserDTO> findUsersByDep_EDIT_USER(ExtjsPageRequest pageRequest, String indexStr) {
		//拆分 0:部门类型,1:id
		UserQueryDTO userQ = new UserQueryDTO();
		String[] strs = indexStr.split(",");
		if(strs[0].equals("warehouse")) {
			//仓库
			userQ.setWarehouse(warehouseService.findById(Long.parseLong(strs[1])));
		}else {
			//门店
			userQ.setShop(shopService.findById(Long.parseLong(strs[1])));
		}
		//	分页的User
		Page<User> userPage = userService.findAll(UserQueryDTO.getWhereClause(userQ),pageRequest.getPageable());
		//  将User转化成DTO类
		List<UserDTO> userDtoList = new ArrayList<UserDTO>();
		for(User user :userPage){
			UserDTO dto = new UserDTO(user);
			userDtoList.add(dto);
		}
		return new PageImpl<UserDTO>(userDtoList,userPage.getPageable(),userPage.getTotalElements());
	}
	/**
	 * 重置密码
	 * @param workNum
	 * @return
	 */
	@GetMapping(value="/resetPassword")
	public String resetPassword_EDIT_USER(String workNum) {
		User user = userService.findByWorkNum(workNum);
		user.setPassword(MD5Tool.ToMd5String(defPass));
		userService.save(user);
		return " {\"success\":\"true\",\"info\":\"初始密码为:"+defPass+"\" }";
	}
	@GetMapping(value="/changeStatus")
	public String changeStatus_EDIT_USER(String workNum, String toStatus) {
		User user = userService.findByWorkNum(workNum);
		if(toStatus.equals("FROZEN") && user.getUserStatus().equals(UserStatus.LAIDOFF)) {
			return " {\"success\":\"false\" }";
		}
		user.setUserStatus(UserStatus.valueOf(toStatus));
		userService.save(user);
		return " {\"success\":\"true\" }";
	}
	@PostMapping(value="/updateUser")
	public String updateUser_EDIT_USER(UserDTO userDto, String hireDateEx) {
		User user = userService.findById(userDto.getId());
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			userDto.setHireDate(sdf.parse(hireDateEx));
		} catch (Exception e) {
			userDto.setHireDate(new Date());
		}
		
		User userNew = userDto.toUserObject();
		user.setName(userNew.getName());
		user.setIdentity(userNew.getIdentity());
		user.setGender(userNew.getGender());
		user.setWorkNum(userNew.getWorkNum());
		user.setUserType(userNew.getUserType());
		user.setHireDate(userNew.getHireDate());
		user.setShop(null);
		user.setWarehouse(null);
		if(null != userDto.getDepName()) {
			if(user.getUserType().equals(UserType.KEEPER)) {
				user.setWarehouse(warehouseService.findByName(userDto.getDepName()));
			}else if(user.getUserType().equals(UserType.SALESMAN) 
					||user.getUserType().equals(UserType.STORE_MANAGER) ) {
				user.setShop(shopService.findByName(userDto.getDepName()));
			}
		}
		user.setPrivileges(userNew.getPrivileges());
		userService.save(user);
		return " {\"success\":\"true\" }";
	}
	
	
	/**
	 * 根据每个用户类型统计男女个数
	 * @return
	 */
	@GetMapping(value = "/getGroupGenderCount")
	public List<Map<String,String>> getGroupGenderCount_EDIT_USER(){
		return userService.getGroupGenderCount();
	}
	
}
