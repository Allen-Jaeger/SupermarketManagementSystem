package com.invoicingSystem.main.indent.service;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.invoicingSystem.main.indent.domain.Indent;
import com.invoicingSystem.main.indent.domain.IndentDTO;
import com.invoicingSystem.main.indent.domain.IndentDTO2;

/**
 * @author LiJuncong
 * at 2018年9月19日
 * @author lzy
 * at 2018年9月25日 :添加业务
 * at 2018年9月26日 :修改startWorkflow 添加 processKey 属性.
 */

public interface IIndentService {
    
    //申请调仓业务
	public void save(Indent indent);
	public Indent findById(Long id);
	public void delete(Long id);
	public void deleteAll(Long[] ids);
	
	
	public Page<Indent> findAll(Specification<Indent> spec, Pageable pageable);
	//流程业务
	
    //1.启动流程
    public void startWorkflow(String userId,String processKey,Long indentId, Map<String, Object> variables);
    //2.查询流程任务
    public Page<IndentDTO2> findTodoTasks(String userId, Pageable pageable);
    //3.签收流程任务
    public void claim(String taskId,String userId);
    //4.完成流程任务
    public void complete(String taskId, Map<String, Object> variables);  
    //5.取消流程任务
    public void delete(String processInstanceId, String deleteReason);

}
