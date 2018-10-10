package com.invoicingSystem.main.user.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.invoicingSystem.main.shop.domain.Shop;
import com.invoicingSystem.main.user.util.Gender;
import com.invoicingSystem.main.user.util.UserStatus;
import com.invoicingSystem.main.user.util.UserType;
import com.invoicingSystem.main.warehouse.domain.Warehouse;

/**
 * @author LiJuncong
 * at 2018年10月8日
 * 
 * 难点：权限是一个队列  怎么查询？//另外解决
 */

public class UserQueryDTO {
	private String workNum; // 工号，用于登陆
	private String name; // 真实姓名
	private Gender gender; // 性别
	private String identity; // 身份证
	private UserType userType; // 用户类型
	private String privileges; // 可用权限	使用 权限1，权限2，……的方式
	private Date hireDate; // 员工聘请日期
	private UserStatus userStatus; // 用户状态
	private Shop shop;	//商店
	private Warehouse warehouse;
	
	public String getWorkNum() {
		return workNum;
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
	public String getPrivileges() {
		return privileges;
	}
	public Date getHireDate() {
		return hireDate;
	}
	public UserStatus getUserStatus() {
		return userStatus;
	}
	public Shop getShop() {
		return shop;
	}
	public Warehouse getWarehouse() {
		return warehouse;
	}
	public void setWorkNum(String workNum) {
		this.workNum = workNum;
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
	public void setPrivileges(String privileges) {
		this.privileges = privileges;
	}
	public void setHireDate(Date hireDate) {
		this.hireDate = hireDate;
	}
	public void setUserStatus(UserStatus userStatus) {
		this.userStatus = userStatus;
	}
	public void setShop(Shop shop) {
		this.shop = shop;
	}
	public void setWarehouse(Warehouse warehouse) {
		this.warehouse = warehouse;
	}
	
	
    public static Specification<User> getWhereClause(final UserQueryDTO userQueryDTO) {
        return new Specification<User>() {
            /**
			 * 自动序列化版本ID
			 */
			private static final long serialVersionUID = -8171808798662140072L;

			@Override
            public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
            
                List<Predicate> predicate = new ArrayList<>();
        
                if (null!=userQueryDTO.getWorkNum()) {
                    predicate.add(criteriaBuilder.equal(root.get("workNum").as(String.class),
                            userQueryDTO.getWorkNum()));
                }
                if (null!=userQueryDTO.getName()) {
                    predicate.add(criteriaBuilder.equal(root.get("name").as(String.class),
                            userQueryDTO.getName()));
                }
                if (null!=userQueryDTO.getGender()) {
                    predicate.add(criteriaBuilder.equal(root.get("gender").as(Gender.class),
                            userQueryDTO.getGender()));
                }
                if (null!=userQueryDTO.getIdentity()) {
                    predicate.add(criteriaBuilder.equal(root.get("identity").as(String.class),
                            userQueryDTO.getIdentity()));
                }
                if (null!=userQueryDTO.getUserType()) {
                    predicate.add(criteriaBuilder.equal(root.get("userType").as(UserType.class),
                            userQueryDTO.getUserType()));
                }
                if (null!=userQueryDTO.getHireDate()) {
                    predicate.add(criteriaBuilder.equal(root.get("hireDate").as(Date.class),
                            userQueryDTO.getHireDate()));
                }
                if (null!=userQueryDTO.getUserStatus()) {
                    predicate.add(criteriaBuilder.equal(root.get("userStatus").as(UserStatus.class),
                            userQueryDTO.getUserStatus()));
                }
                if (null!=userQueryDTO.getShop()) {
                    predicate.add(criteriaBuilder.equal(root.get("shop").as(Shop.class),
                            userQueryDTO.getShop()));
                }
                if (null!=userQueryDTO.getWarehouse()) {
                    predicate.add(criteriaBuilder.equal(root.get("warehouse").as(Warehouse.class),
                            userQueryDTO.getWarehouse()));
                }
                
                Predicate[] pre = new Predicate[predicate.size()];
                return query.where(predicate.toArray(pre)).getRestriction();
            }
        };
    }
	
}
