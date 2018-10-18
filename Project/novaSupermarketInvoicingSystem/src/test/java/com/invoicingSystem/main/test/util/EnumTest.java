package com.invoicingSystem.main.test.util;

import org.junit.Test;

import com.invoicingSystem.main.common.enum_tools.EnumTool;
import com.invoicingSystem.main.user.util.UserStatus;

/**
 * @author LiJuncong
 * at 2018年10月8日
 */

public class EnumTest{
	
	@Test
	public void test() {
//		EnumTool<UserType> et = new EnumTool(UserType.KEEPER);
		EnumTool et = new EnumTool(UserStatus.class);
		System.out.println(et.allToMap().toString());
	}
	
	@Test
	public void test2() {
		EnumTool et = new EnumTool(UserStatus.class);
		System.out.println(et.transToEnum("冻结的").toString());
	}	
	@Test
	public void test3() {
		EnumTool et = new EnumTool(UserStatus.class);
		System.out.println(et.transToEnum("冻结的").equals(UserStatus.FROZEN));
	}
}
