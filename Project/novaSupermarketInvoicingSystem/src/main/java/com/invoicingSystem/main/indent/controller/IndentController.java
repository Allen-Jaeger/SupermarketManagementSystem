package com.invoicingSystem.main.indent.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.invoicingSystem.main.activiti.util.WorkflowVariable;
import com.invoicingSystem.main.common.web.ExtAjaxResponse;
import com.invoicingSystem.main.common.web.ExtjsPageRequest;
import com.invoicingSystem.main.common.web.SessionUtil;
import com.invoicingSystem.main.indent.domain.Indent;
import com.invoicingSystem.main.indent.domain.IndentDTO;
import com.invoicingSystem.main.indent.domain.IndentQueryDTO;
import com.invoicingSystem.main.indent.service.IIndentService;
import com.invoicingSystem.main.indent.util.IndentStatus;
import com.invoicingSystem.main.indent.util.IndentType;
import com.invoicingSystem.main.shop.domain.Shop;
import com.invoicingSystem.main.shop.service.IShopService;
import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.user.service.IUserService;;

/**
 * @author Lzy
 * @version 创建时间：2018年9月26日 上午9:01:07 
 * 类说明 : 流程控制层
 */
@RestController
@RequestMapping(value = "/indent")
public class IndentController {

    @Autowired
    private IIndentService indentService;
    @Autowired
	private IUserService userService;
	@Autowired
	private IShopService shopService;
    
    @PostMapping

    public @ResponseBody ExtAjaxResponse save(Indent indent) {
        try {
			User user = userService.findById(3L);
			    		
    		Shop shop = shopService.findById(1L);
    		
    		System.out.println(indent);
    		indent.setCreator(user);
    		indent.setToShop(shop);
    		indent.setCreateDate(new Date());
    		indent.setIndentNum("BY66625412");
    		indent.setIndentType(IndentType.PURCHASE);
			indent.setIndentStatus(IndentStatus.INIT);
            indentService.save(indent);
            return new ExtAjaxResponse(true, "操作成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new ExtAjaxResponse(false, "操作失败!");
        }
    }

    @PutMapping
    public @ResponseBody ExtAjaxResponse update(Indent indent) {
        try {
            indentService.save(indent);
            return new ExtAjaxResponse(true, "操作成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new ExtAjaxResponse(false, "操作失败!");
        }
    }

    @DeleteMapping
    public @ResponseBody ExtAjaxResponse delete(Long id) {
        try {
        	Indent entity = indentService.findById(id);
			if(entity!=null) {
				indentService.delete(id);}
            return new ExtAjaxResponse(true, "操作成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new ExtAjaxResponse(false, "操作失败!");
        }
    }

	@GetMapping
    public Page<Indent> findIndentByCreatorId(IndentQueryDTO indentQueryDTO,HttpSession session,ExtjsPageRequest pageable) 
	{
		Page<Indent> page;
		//String Creator_id = SessionUtil.getUserName(session);
		//Long CreatorId = 9L;
		if(true) {
			//indentQueryDTO.setUserId(1L);
			//indentQueryDTO.setIndentType(IndentType.PURCHASE);//SessionUtil.getUserName(session)
			
			page = indentService.findAll(IndentQueryDTO.getWhereClause(indentQueryDTO), pageable.getPageable());
			
		}else {
			page = new PageImpl<Indent>(new ArrayList<Indent>(),pageable.getPageable(),0);
		}
		return page;
    }
    
	//订单表填充USERNAME
	 @RequestMapping(value = "/userName")
	    public @ResponseBody ExtAjaxResponse fillUserName(HttpSession session) 
	    {
	    	try {
	    		Map<String,String> map=new HashMap<String, String>();
	    		//map.put("userName", SessionUtil.getUserName(session));
	    		map.put("userName", "test");
	        	return new ExtAjaxResponse(true,map);
			} catch (Exception e) {
				return new ExtAjaxResponse(false,"登出失败!");
			}
	    }
	
	
    /*-------------------------------------流程引擎web层------------------------------------------*/
    
    /**
     * 启动流程
     * @param indentId   货单信息Id
     * @param session   通过会话获取登录用户(申请人)
     * @return
     */
    @RequestMapping(value = "/start")
    public @ResponseBody ExtAjaxResponse start(@RequestParam(name="id") Long indentId,HttpSession session) {
        try {
            Indent indent = indentService.findById(indentId);
            String userId = SessionUtil.getUserName(session);
            Map<String, Object> variables = new HashMap<String, Object>();
            //此处编写流程图需要的variables
            variables.put("receiverId", indent.getKeeper().getId());  //请求接受方
            variables.put("applicantId", userId); //请求申请方
           
            if(indent.getIndentType()==IndentType.PURCHASE){//判断货单是否为采购订单
                
              //variables.put("applyId", userId);//调货工作流的变量 可删
              //  indentService.startWorkflow(userId,"采购流程key",indentId, variables);  
                
            }
            else {//否则跑调货流程
                if (indent.getIndentType()==IndentType.RETREAT) {//判断调货单是否为处理残旧品
                    variables.put("applyId", indent.getKeeper().getId());//处理残旧品为接受端接收.
                }
                else {
                    variables.put("applyId", userId);//处理其余调货为申请端接收.
                }
                indentService.startWorkflow(userId,"transfer",indentId, variables);
            }
            return new ExtAjaxResponse(true,"操作成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new ExtAjaxResponse(false,"操作失败!");
        }
    }
    
    /**
     * 查询待处理流程任务
     * @param pageable  分页对象
     * @param session   通过会话获取登录用户(申请人)
     * @return
     */
    @RequestMapping(value = "/tasks")
    public @ResponseBody Page<IndentDTO> findTodoTasks(HttpSession session,ExtjsPageRequest pageable) {
        Page<IndentDTO> page = new PageImpl<IndentDTO>(new ArrayList<IndentDTO>(), pageable.getPageable(), 0);
        try {
            page = indentService.findTodoTasks(SessionUtil.getUserName(session), pageable.getPageable());
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return page;
    }
    
    /**
     * 签收任务
     */
    @RequestMapping(value = "claim/{id}")
    public @ResponseBody ExtAjaxResponse claim(@PathVariable("id") String taskId, HttpSession session) {
        try{
            indentService.claim(taskId, SessionUtil.getUserName(session));
            return new ExtAjaxResponse(true,"任务签收成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new ExtAjaxResponse(false,"任务签收失败!");
        }
    }
    
    /**
     * 完成任务
     * @param id
     * @return
     */
    @RequestMapping(value = "complete/{id}")
    public @ResponseBody ExtAjaxResponse complete(@PathVariable("id") String taskId, WorkflowVariable var) {
        try{
            Map<String, Object> variables = var.getVariableMap();
            indentService.complete(taskId, variables);
            return new ExtAjaxResponse(true,"任务签收成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new ExtAjaxResponse(false,"任务签收失败!");
        }
    }

}
