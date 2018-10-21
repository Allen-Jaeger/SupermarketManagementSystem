package com.invoicingSystem.main.test.util;

import org.junit.Test;

import com.invoicingSystem.main.aspect.util.Pointcuts;

/**
 * @author LiJuncong
 * at 2018年10月20日
 */

public class AspectTest {
	@Test
	public void test1() {
		System.out.println(Pointcuts.class.getName());
	}
}
