package com.invoicingSystem.main.user.domain;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.invoicingSystem.main.user.util.Gender;
import com.invoicingSystem.main.user.util.Privilege;
import com.invoicingSystem.main.user.util.UserStatus;
import com.invoicingSystem.main.user.util.UserType;

/**
 * @author LiJuncong
 * at 2018年9月18日
 */

@Entity
@Table(name="t_user")
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;					//数据库管理id
	private String workNum;				//工号，用于登陆
	private String password;			//密码
	private String name;				//真实姓名
	private Gender gender;				//性别
	private String identity;			//身份证
	private UserType userType;			//用户类型
	private Set<Privilege> privileges;	//可用权限
	private Date hireDate;				//员工聘请日期
	private String iconUrl;				//头像
	private UserStatus userStatus;		//用户状态
	
	public Long getId() {
		return id;
	}
	@Column(nullable=false)
	public String getWorkNum() {
		return workNum;
	}
	@Column(nullable=false)
	public String getPassword() {
		return password;
	}
	@Column(nullable=false)
	public String getName() {
		return name;
	}
	@Column(nullable=false)
	public Gender getGender() {
		return gender;
	}
	@Column(nullable=false)
	public String getIdentity() {
		return identity;
	}
	@Column(nullable=false)
	public UserType getUserType() {
		return userType;
	}
	public Set<Privilege> getPrivileges() {
		return privileges;
	}
	@Column(nullable=false)
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getHireDate() {
		return hireDate;
	}
	public String getIconUrl() {
		return iconUrl;
	}
	@Column(nullable=false)
	public UserStatus getUserStatus() {
		return userStatus;
	}
	
	//setter
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
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	public void setIdentity(String identity) {
		this.identity = identity;
	}
	public void setUserType(UserType userType) {
		this.userType = userType;
	}
	public void setPrivileges(Set<Privilege> privileges) {
		this.privileges = privileges;
	}
	public void setHireDate(Date hireDate) {
		this.hireDate = hireDate;
	}
	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}
	public void setUserStatus(UserStatus userStatus) {
		this.userStatus = userStatus;
	}
}
