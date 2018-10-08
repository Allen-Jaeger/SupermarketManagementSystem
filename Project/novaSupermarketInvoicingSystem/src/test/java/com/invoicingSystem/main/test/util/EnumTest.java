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
		EnumTool<UserStatus> et = new EnumTool<UserStatus>(UserStatus.LAIDOFF);
		System.out.println(et.allToMap().toString());
	}
}
