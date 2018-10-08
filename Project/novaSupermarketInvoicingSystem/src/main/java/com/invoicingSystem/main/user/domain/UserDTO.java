package com.invoicingSystem.main.user.domain;

import java.util.Date;

import com.invoicingSystem.main.user.util.Gender;

/**
 * @author LiJuncong at 2018年9月22日
 */

public class UserDTO {
	private Long id; // 数据库管理id
	private String workNum; // 工号，用于登陆
	private String password = "123456"; // 初始密码
	private String name; // 真实姓名
	private String gender; // 性别
	private String identity; // 身份证
	private String userType; // 用户类型
	private String privileges; // 可用权限	使用 权限1，权限2，……的方式
	private Date hireDate; // 员工聘请日期
	private String iconUrl; // 头像
	private String userStatus; // 用户状态
	private String depName;	//任职单位

	public UserDTO() {
		super();
	}
	
	public UserDTO(User user) {
		this.id = user.getId();
		this.workNum = user.getWorkNum();
		this.password = user.getPassword();
		this.name = user.getName();
		this.gender = user.getGender().getChineseName();
		this.identity = user.getIdentity();
		this.userType = user.getUserType().getChineseName();
		this.privileges = user.privilegeInString();
		this.hireDate = user.getHireDate();
		this.iconUrl = user.getIconUrl();
		this.userStatus = user.getUserStatus().getChineseName();
		this.depName = "";
		if(null == user.getWarehouse() && null != user.getShop()) {
			depName += user.getShop().getName();
		}
		if(null == user.getShop() && null != user.getWarehouse()) {
			depName += user.getWarehouse().getName();
		}
	}
	
	public User toUserObject() {
		User user = new User();
		user.setWorkNum(workNum);
		user.setPassword(password);
		user.setName(name);
		user.setGender(Gender.getFromInt(Integer.parseInt(gender)));
		user.setIconUrl(iconUrl);
		user.setIdentity(identity);
		return user;
	}
	public User toLoginUser() {
		User user = new User();
		user.setWorkNum(workNum);
		user.setPassword(password);
		return user;
	}

	public Long getId() {
		return id;
	}

	public String getWorkNum() {
		return workNum;
	}

	public String getPassword() {
		return password;
	}

	public String getName() {
		return name;
	}

	public String getGender() {
		return gender;
	}

	public String getIdentity() {
		return identity;
	}

	public String getUserType() {
		return userType;
	}

	public String getPrivileges() {
		return privileges;
	}

	public Date getHireDate() {
		return hireDate;
	}

	public String getIconUrl() {
		return iconUrl;
	}

	public String getUserStatus() {
		return userStatus;
	}

	public String getDepName() {
		return depName;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setWorkNum(String workNum) {
		this.workNum = workNum;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public void setIdentity(String identity) {
		this.identity = identity;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public void setPrivileges(String privileges) {
		this.privileges = privileges;
	}

	public void setHireDate(Date hireDate) {
		this.hireDate = hireDate;
	}

	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}

	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}

	public void setDepName(String depName) {
		this.depName = depName;
	}
}
