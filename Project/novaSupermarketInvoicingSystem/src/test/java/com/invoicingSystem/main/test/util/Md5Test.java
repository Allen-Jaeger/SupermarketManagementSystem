package com.invoicingSystem.main.test.util;

import org.junit.Test;

import com.invoicingSystem.main.test.TestBase;
import com.invoicingSystem.main.user.util.MD5Tool;

/**
 * @author LiJuncong
 * at 2018年9月26日
 */

public class Md5Test extends TestBase{
	@Test
	public void TestMd5(){
		String one = "one";
		String md5One = MD5Tool.ToMd5String(one);
		String two = new String("one");
		System.out.println(MD5Tool.isSame(two, md5One));
		System.out.println(one + "=" + two + "=" + md5One);
	}
}
