package com.invoicingSystem.main.user.domain;

import com.invoicingSystem.main.user.util.Gender;

/**
 * @author LiJuncong at 2018年9月22日
 */

public class UserDTO {
	private String workNum; // 工号，用于登陆
	private String password; // 密码
	private String name; // 真实姓名
	private String gender = "1";
	private String identity; // 身份证
	private String iconUrl; // 头像

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


	public String getIconUrl() {
		return iconUrl;
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

	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
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
}
