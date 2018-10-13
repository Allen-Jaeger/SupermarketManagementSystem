package com.invoicingSystem.main.test.user;

import org.junit.Test;

import com.invoicingSystem.main.user.domain.UserDTO;

/**
 * @author LiJuncong
 * at 2018年10月10日
 */

public class TestDto {
	@Test
	public void test01() {
		UserDTO userDto = new UserDTO();
		if(userDto.getDepName().equals("test")) {
			return;
		}
	}
}
