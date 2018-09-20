package com.invoicingSystem.main.test.user;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.junit.Test;

import com.invoicingSystem.main.test.TestBase;
import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.user.util.Gender;
import com.invoicingSystem.main.user.util.Privilege;
import com.invoicingSystem.main.user.util.UserStatus;
import com.invoicingSystem.main.user.util.UserType;

/**
 * @author LiJuncong
 * at 2018年9月18日
 */

public class Test01 extends TestBase{

	
	@Test
	public void userAdd() {
		Set<Privilege> privileges = new HashSet<Privilege>();
		privileges.add(Privilege.CHANGE_SHELF);
		privileges.add(Privilege.EDIT_SELF);
		for (int i = 0; i < 10; i++) {
			User user = new User();
			user.setGender(Gender.MALE);
			user.setHireDate(new Date());
			user.setIdentity("01000000"+i);
			user.setName("Sales"+i);
			user.setPassword("123456");
			user.setPrivileges(privileges);
			user.setUserStatus(UserStatus.NORMAL);
			user.setUserType(UserType.SALESMAN);
			user.setWorkNum("wk000111"+i);
			userService.save(user);
		}
	}
	
	@Test
	public void saveSales() {
		User user = new User();
		user.setGender(Gender.MALE);
		user.setHireDate(new Date());
		user.setIdentity("1201000000");
		user.setName("SalesT");
		user.setPassword("123456");
		user.setUserStatus(UserStatus.NORMAL);
		user.setUserType(UserType.SALESMAN);
		user.setWorkNum("wk00011127");
		user.setWarehouse(warehouseService.findById(1L));
		userService.save(user);
	}
}
