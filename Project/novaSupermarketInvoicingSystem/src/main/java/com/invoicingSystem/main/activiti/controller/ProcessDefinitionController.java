package com.invoicingSystem.main.activiti.controller;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipInputStream;

import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.RepositoryService;
import org.activiti.engine.repository.DeploymentBuilder;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.repository.ProcessDefinitionQuery;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


import org.springframework.web.multipart.MultipartFile;

import com.invoicingSystem.main.activiti.domain.ProcessDefinitionDTO;
import com.invoicingSystem.main.common.web.ExtAjaxResponse;
import com.invoicingSystem.main.common.web.ExtjsPageRequest;

@RestController
@RequestMapping("/process-definition")
public class ProcessDefinitionController {
	@Autowired
    private RepositoryService repositoryService;
    /**
     * 1.流程定义列表
     * 
     * @param pageRequest Extjs分页的封装类
     * @return Page<ProcessDefinitionDTO> 分页对象
     */
    @GetMapping
    public @ResponseBody Page<ProcessDefinitionDTO> findAll(ExtjsPageRequest pageRequest) {
       //1.查询所有已部署的流程定义
       List<ProcessDefinition> sourceList = repositoryService.createProcessDefinitionQuery().list();
       List<ProcessDefinitionDTO> targetList = null;
       if(sourceList!=null){
    	   targetList = new ArrayList<ProcessDefinitionDTO>();
    	   for (ProcessDefinition source : sourceList) {
    		    ProcessDefinitionDTO target = new ProcessDefinitionDTO();
    			BeanUtils.copyProperties(source, target);
    			targetList.add(target);
    	   }
       }
       //2.把流程列表集合封装为Spring分页对象
       return new PageImpl<ProcessDefinitionDTO>(targetList, pageRequest.getPageable(), targetList!=null?targetList.size():0);
    }
    
    /**
     * 2.上传并部署流程资源
     * 
     * @param file 上传部署流程文件(路径)
     * 文件格式: zip、bar、bpmn、bpmn20.xml
     * 
     * @return AJAXResultMessage  ajax的响应内容封装对象
     */
    @PostMapping
    public @ResponseBody ExtAjaxResponse deploy(@RequestParam(value = "file", required = true) MultipartFile file) {
        // 获取上传的文件名
        String fileName = file.getOriginalFilename();
        System.out.println("fileName:"+fileName);
        try {
            // 得到输入流（字节流）对象
            InputStream fileInputStream = file.getInputStream();
            // 文件的扩展名
            String extension = FilenameUtils.getExtension(fileName);
            // zip或者bar类型的文件用ZipInputStream方式部署
            DeploymentBuilder deployment = repositoryService.createDeployment();
            if (extension.equals("zip") || extension.equals("bar")) {
                ZipInputStream zip = new ZipInputStream(fileInputStream);
                deployment.addZipInputStream(zip);
            } else {
                // 其他类型的文件直接部署  bpmn/bpmn20.xml
                deployment.addInputStream(fileName, fileInputStream);
            }
            deployment.deploy();
            return new ExtAjaxResponse(true,"部署成功!");
        } catch (Exception e) {
            
            return new ExtAjaxResponse(false,"部署失败!");
        }
    }
    
    /**
     * 3.读取流程资源
     *
     * @param processDefinitionId 流程定义ID
     * @param resourceName        资源名称
     */
    @RequestMapping(value = "/resource")
    public void readResource(@RequestParam("pdid") String processDefinitionId, @RequestParam("resourceName") String resourceName, HttpServletResponse response)
            throws Exception {
        ProcessDefinitionQuery pdq = repositoryService.createProcessDefinitionQuery();
        ProcessDefinition pd = pdq.processDefinitionId(processDefinitionId).singleResult();
        // 通过接口读取
        InputStream resourceAsStream = repositoryService.getResourceAsStream(pd.getDeploymentId(), resourceName);
        // 输出资源内容到相应对象
        byte[] b = new byte[1024];
        int len = -1;
        while ((len = resourceAsStream.read(b, 0, 1024)) != -1) {
            response.getOutputStream().write(b, 0, len);
        }
    }
    
    /**
     * 4.删除流程定义
     *
     * @param processDefinitionId 流程定义ID
     * @param resourceName        资源名称
     */
    @DeleteMapping
    public  @ResponseBody ExtAjaxResponse deleteProcessDefinition(@RequestBody String deploymentId) {
    	try {
    		repositoryService.deleteDeployment(deploymentId.replace("deploymentId=", ""), true);
	    } catch (Exception e) {
	        return new ExtAjaxResponse(false,"删除失败!");
	    }
	    return new ExtAjaxResponse(true,"删除成功!");
    }

}
