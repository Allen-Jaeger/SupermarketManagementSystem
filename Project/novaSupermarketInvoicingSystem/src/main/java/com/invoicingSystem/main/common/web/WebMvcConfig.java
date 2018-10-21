package com.invoicingSystem.main.common.web;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.invoicingSystem.main.aspect.util.ErrorPageInterceptor;

/**
 * @author LiJuncong
 * at 2018年10月20日
 */

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(new ErrorPageInterceptor())
                .addPathPatterns("/**");
    }
}