package com.invoicingSystem.main.aspect.util;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * @author LiJuncong
 * at 2018年10月20日
 */

@Component
public class ErrorPageInterceptor extends HandlerInterceptorAdapter {
    private List<Integer> errorCodeList = Arrays.asList(404, 403, 500, 501, 999);
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws
        Exception {
       if (errorCodeList.contains(response.getStatus())) {
            response.sendRedirect("/error.html");
            return false;
        }
        return super.preHandle(request, response, handler);
    }
}