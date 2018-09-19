package com.invoicingSystem.main.user.domain;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
	@Column(nullable=false)
	private String workNum;				//工号，用于登陆
	@Column(nullable=false)
	private String password;			//密码
	@Column(nullable=false)
	private String name;				//真实姓名
	@Column(nullable=false)
	private Gender gender;				//性别
	@Column(nullable=false)
	private String identity;			//身份证
	@Column(nullable=false)
	private UserType userType;			//用户类型
	@CollectionTable(name="t_privileges")
	@ElementCollection(fetch=FetchType.EAGER,targetClass=Privilege.class)
	private Set<Privilege> privileges = new HashSet<Privilege>();	//可用权限
	@Column(nullable=false)
	private Date hireDate;				//员工聘请日期
	private String iconUrl;				//头像
	@Column(nullable=false)
	private UserStatus userStatus;		//用户状态
	
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
	public Gender getGender() {
		return gender;
	}
	public String getIdentity() {
		return identity;
	}
	public UserType getUserType() {
		return userType;
	}
	public Set<Privilege> getPrivileges() {
		return privileges;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getHireDate() {
		return hireDate;
	}
	public String getIconUrl() {
		return iconUrl;
	}
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
