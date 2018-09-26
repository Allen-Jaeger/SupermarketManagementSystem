package com.invoicingSystem.main.aspect;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import lombok.extern.slf4j.Slf4j;

/**
 * @author LiJuncong
 * at 2018年9月26日
 */
@Component
@Aspect
@Slf4j
public class LoginAspect {
	
	Logger log =  LoggerFactory.getLogger(this.getClass());
	
	/**
	 * 切userController 切点
	 */
	@Pointcut("within(com.invoicingSystem.main.user.controller..*)")
	public void inUserController() {}
	
	/**
	 * 开放登录功能
	 */
	@Pointcut("!execution(public String login(..))  && !execution(public public void miss(..))")
	public void openLogin() {}
	
	/**
	 * 过滤请求  将未有登录的请求 重定向到login
	 * @param pjp 增强型 环绕切面 控制切入点函数是否可以执行
	 * @return
	 */
	@Around("inUserController() && openLogin()")
	public Object findLoginedUser(ProceedingJoinPoint pjp) {
		//获取request
		HttpServletRequest request = 
				((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		//获取response
		HttpServletResponse response = 
				((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
		
		//判断是否已经登录
		if(null != request.getSession().getAttribute("userId") 
				&& !request.getSession().getAttribute("userId").toString().equals("")) {
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
				response.sendRedirect("login.html");
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
}
