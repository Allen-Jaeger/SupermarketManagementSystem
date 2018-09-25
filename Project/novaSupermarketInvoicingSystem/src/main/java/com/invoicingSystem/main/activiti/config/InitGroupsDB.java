package com.invoicingSystem.main.activiti.config;
/**
* @author Lzy
* @version 创建时间：2018年9月25日 上午9:23:02
* 类说明:添加activiti工作流的group表.
*/
import org.activiti.engine.IdentityService;
import org.activiti.engine.identity.Group;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

//@Component
public class InitGroupsDB {
    @Bean
    InitializingBean groupsInitializer(final IdentityService identityService) {
        return new InitializingBean() {
            public void afterPropertiesSet() throws Exception {
                Group group =identityService.newGroup("SUPER_MANAGER"); 
                group.setType("security-role");
                group.setName("超级管理员");
                Group group2 =identityService.newGroup("PURCHASER"); 
                group2.setName("采购员");
                Group group3 =identityService.newGroup("KEEPER"); 
                group3.setName("仓库管理员");
                Group group4 =identityService.newGroup("STORE_MANAGER"); 
                group4.setName("门店管理员");
                Group group5 =identityService.newGroup("SELESMAN"); 
                group5.setName("销售员");
             

                identityService.saveGroup(group);
                identityService.saveGroup(group2);
                identityService.saveGroup(group3);
                identityService.saveGroup(group4);
                identityService.saveGroup(group5);
            }
        };
    }

}
