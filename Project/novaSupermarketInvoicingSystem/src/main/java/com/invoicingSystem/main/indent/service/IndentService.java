package com.invoicingSystem.main.indent.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.activiti.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.invoicingSystem.main.activiti.domain.WorkflowDTO;
import com.invoicingSystem.main.activiti.service.IWorkflowService;
import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.commodity.service.ICommodityService;
import com.invoicingSystem.main.common.beans.BeanUtils;
import com.invoicingSystem.main.indent.domain.Indent;
import com.invoicingSystem.main.indent.domain.IndentDTO;
import com.invoicingSystem.main.indent.domain.IndentDTO2;
import com.invoicingSystem.main.indent.repository.IIndentRepository;
import com.invoicingSystem.main.indent.util.IndentStatus;

/**
 * @author LiJuncong
 * at 2018年9月19日
 * @author lzy
 * at 2018年9月26日 : 增加工作流
 * at 2018年9月26日 :修改startWorkflow 传递工作流程图Key
 */
@Transactional
@Service
public class IndentService implements IIndentService {
    
	@Autowired
	IIndentRepository indentRepository;
	
	@Autowired
	private ICommodityService commodityService;
	
	@Autowired 
    private IWorkflowService workflowService;

	@Override
	public void save(Indent indent) {
		indentRepository.save(indent);
	}

    @Override
    public Indent findById(Long id) {
      
        return indentRepository.findById(id).get();
    }

    @Override
    public void delete(Long id) {
        Indent indent = indentRepository.findById(id).get();
        if (indent!=null) {
            indentRepository.delete(indent);
        }
        
    }

    @Override
    public Page<Indent> findIndent(String userId, Pageable pageable) {
        // TODO Auto-generated method stub
        return indentRepository.findLeave(userId, pageable);
    }
    
    
    /*----------------------------------------------流程业务--------------------------------------------*/
    /**
     * 开始货单申请流程
     * @param userId 用户ID
     * @param pageable 分页条件
     * @return
     */

    @Override
    public void startWorkflow(String userId,String processKey, Long indentId, Map<String, Object> variables) {
      //1.声明流程实例
        ProcessInstance processInstance = null;
        //2.获取创建好的请假实例
        Indent indent = indentRepository.findById(indentId).get();
        if(indent!=null){
            try {
                processInstance = workflowService.startWorkflow(userId, processKey, indent.getId().toString(), variables);
                indent.setIndentStatus(IndentStatus.CHECKING);
                indent.setProcessInstanceId(processInstance.getId());
                indent.setCreateDate(new Date());
                //leaveRepository.save(leave);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }  
    }
    /**
    * 查询待办任务
    *
    * @param userId 用户ID
    * @param pageable 分页条件
    * @return
    */

    @Override
    public Page<IndentDTO2> findTodoTasks(String userId, Pageable pageable) {
        List<IndentDTO2> results = null;
        List<WorkflowDTO> workflowLists = workflowService.findTodoTasks(userId);
        // 根据流程的业务ID查询实体并关联
        if(null!=workflowLists) {
        	results = new ArrayList<IndentDTO2>();
            for (WorkflowDTO workflow : workflowLists) {
            	Long businessKey = new Long(workflow.getBusinessKey());
                if (workflow.getBusinessKey() == null) {
                    continue;
                }
                 Indent indent = indentRepository.findById(businessKey).get();
                if(indent!=null){
                	IndentDTO2 indentDTO2 = new IndentDTO2();
                    BeanUtils.copyProperties(indent, indentDTO2);
                     BeanUtils.copyProperties(workflow, indentDTO2);
                    results.add(indentDTO2);
                }
            }
        }
        return new PageImpl<IndentDTO2> (results, pageable, null!=results?results.size():0);
    }

    /**
     * 签收流程任务
     *
     * @param taskId 任务ID
     * @param userId 签收人用户ID
     * @return
     */

    @Override
    public void claim(String taskId, String userId) {
        workflowService.claim(taskId, userId);
    }

    /**
    * 完成流程任务
    *
    * @param taskId 任务ID
    * @param variables 流程变量
    * @return
    */

    @Override
    public void complete(String taskId, Map<String, Object> variables) {
        workflowService.complete(taskId, variables);
        if(variables.get("nextTaskName") != null) {
        //indent.setIndentStatus(IndentStatus.CHECKING);
        }
    }

	@Override
	public Page<Indent> findAll(Specification<Indent> spec, Pageable pageable) {
		return indentRepository.findAll(spec, pageable);
	}

	@Override
	public void deleteAll(Long[] ids) {
		List<Long> idLists = new ArrayList<Long>(Arrays.asList(ids));
		
		List<Indent> indents = (List<Indent>) indentRepository.findAllById(idLists);
		
		for(Indent indent:indents) {
			List<Commodity> commodities = indent.getCommodities();
			commodityService.deleteAll(commodities);
			indent.setCommodities(null);
		}
		if(indents!=null) {
			indentRepository.deleteAll(indents);
		}
		
	}


}
