package com.invoicingSystem.main.indent.listener;


import org.activiti.engine.RuntimeService;
import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.TaskListener;
import org.activiti.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.invoicingSystem.main.indent.domain.Indent;
import com.invoicingSystem.main.indent.service.IIndentService;
import com.invoicingSystem.main.indent.util.IndentStatus;

import java.util.Date;

/**
 * 销假后处理器
 * <p>设置销假时间</p>
 * <p>使用Spring代理，可以注入Bean，管理事物</p>
 * bean  id=reportBackEndProcessor
 */
@Component
@Transactional
public class IndentCheckingEndListener implements TaskListener 
{
	private static final long serialVersionUID = -8360605214753688651L;

	@Autowired
    private IIndentService indentService;

    @Autowired
    private RuntimeService runtimeService;
    
    public void notify(DelegateTask delegateTask) {
    	
        String processInstanceId = delegateTask.getProcessInstanceId();
        ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();
        Indent indent = indentService.findById(new Long(processInstance.getBusinessKey()));

        if(delegateTask.getVariable("pass").toString() =="true") {
        	indent.setIndentStatus(IndentStatus.APPROVED);
            
        }else {
        	indent.setIndentStatus(IndentStatus.DISAPPROVED);
        }
        Object reason = delegateTask.getVariable("indentCheckingReason");
        indent.setIndentCheckingReason(reason==null?"":reason.toString());
    }
}
