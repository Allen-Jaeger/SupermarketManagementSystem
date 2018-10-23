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

/**
* @author Lzy
* @version 创建时间：2018年10月22日 下午12:29:35
* 类说明
*/
@Component
@Transactional
public class PrincipalAudit implements TaskListener{
    private static final long serialVersionUID = 1L;

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
        indent.setIndentCheckingReason(delegateTask.getVariable("indentCheckingReason").toString());
    }
}
