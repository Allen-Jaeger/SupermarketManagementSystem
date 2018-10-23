package com.invoicingSystem.main.aspect;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.invoicingSystem.main.aspect.util.BaseAspect;
import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.user.util.Privilege;

/**
 * @author LiJuncong
 * at 2018年9月26日
 */
@Aspect
@Component
public class UserAspect extends BaseAspect{
	/**
	 * 	1.过滤请求  将未有登录的请求 重定向到login
	 * @param pjp 增强型 环绕切面 控制切入点函数是否可以执行
	 * @return
	 */
	@Around("com.invoicingSystem.main.aspect.util.Pointcuts.inController() "
			+ "&& com.invoicingSystem.main.aspect.util.Pointcuts.openLoginAndLogout()"
			+ "&& com.invoicingSystem.main.aspect.util.Pointcuts.inUserPackage()")
	public Object findLoginedUser(ProceedingJoinPoint pjp) {
		//获取request
		HttpServletRequest request = 
				((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		//获取response
		HttpServletResponse response = 
				((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
		User user = super.getLoginedUser(request);
		if(null != user.getId()) {
			//已经登录，执行切入点函数
			try {
				return pjp.proceed();
			} catch (Throwable e) {
				e.printStackTrace();
			}
		}else {
			//未登录，执行重定向
			log.warn("no user had logined!");
			try {
				response.sendRedirect("http://localhost:8080/login.html");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}
	
	@Around("com.invoicingSystem.main.aspect.util.Pointcuts.suffix_EDIT_USER()")
	public Object for_EDIT_USER(ProceedingJoinPoint pjp) {
		HttpServletRequest request = 
				((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		HttpServletResponse response = 
				((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
		User user = super.getLoginedUser(request);
		if(user.hasPrivilege(Privilege.EDIT_USER)) {
			try {
				return pjp.proceed();
			} catch (Throwable e) {
				e.printStackTrace();
			}
		}
		log.warn("************"+user.getName()+" has not 'EDIT_USER' or 'ALL' Privilege**************");
		try {
//			request.getRequestDispatcher("login.html").forward(request, response);
			response.sendError(501);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
