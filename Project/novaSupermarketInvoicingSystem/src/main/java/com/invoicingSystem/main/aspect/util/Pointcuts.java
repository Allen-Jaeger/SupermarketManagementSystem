package com.invoicingSystem.main.aspect.util;

import org.aspectj.lang.annotation.Pointcut;

/**
 * @author LiJuncong
 * at 2018年10月20日
 */

public class Pointcuts {
	/**
	 *  1.userController所有函数
	 */
	@Pointcut("within(com.invoicingSystem.main.*.controller..*)")
	public void inController() {}
	
	@Pointcut("within(com.invoicingSystem.main.user..*)")
	public void inUserPackage() {}
	/**
	 *  1.抛除 登录、注销功能logout
	 */
	@Pointcut("!execution(public String login(..)) "
			+ "&& !execution(public void logout(..)) ")
	public void openLoginAndLogout() {}
	
	/**
	 * 1.使用到编辑用户的权限
	 */
	@Pointcut("execution( public * *EDIT_USER(..) )")
	public void suffix_EDIT_USER() {}
}
