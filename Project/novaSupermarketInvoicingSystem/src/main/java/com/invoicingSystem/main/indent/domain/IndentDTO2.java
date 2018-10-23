package com.invoicingSystem.main.indent.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.indent.util.IndentStatus;
import com.invoicingSystem.main.indent.util.IndentType;
import com.invoicingSystem.main.shop.domain.Shop;
import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.warehouse.domain.Warehouse;

/**
 * @author wuzihao
 * 专门拿来传工作流查询到的数据
 */
public class IndentDTO2{
    
	
	private Long id;
	private String indentNum;
	
	private List<Commodity> commodities = new ArrayList<Commodity>();
	private Double cost;
	private IndentStatus indentStatus;
	private Date createDate;
	private User creator;
	private User keeper;
	private User manager;
	private Warehouse fromWarehouse;
	private Warehouse toWarehouse;
	private Shop fromShop;
	private Shop toShop;
	private String note;
	private String supplier;	
	private String  commoditiesJSON;
	private IndentType indentType;
	private String userId;
	
     /*任务*/
    private String taskId;
    private String taskName;
    private Date   taskCreateTime;
    private Date   taskClaimTime;
    private String assignee;
    private String taskDefinitionKey;
    /*流程实例*/
    private String processInstanceId;
    /*流程图定义*/
    private String processDefinitionId;
    private boolean suspended;
    private int version;
	public Long getId() {
		return id;
	}
	public String getIndentNum() {
		return indentNum;
	}
	public List<Commodity> getCommodities() {
		return commodities;
	}
	public Double getCost() {
		return cost;
	}
	public IndentStatus getIndentStatus() {
		return indentStatus;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public User getCreator() {
		return creator;
	}
	public User getKeeper() {
		return keeper;
	}
	public User getManager() {
		return manager;
	}
	public Warehouse getFromWarehouse() {
		return fromWarehouse;
	}
	public Warehouse getToWarehouse() {
		return toWarehouse;
	}
	public Shop getFromShop() {
		return fromShop;
	}
	public Shop getToShop() {
		return toShop;
	}
	public String getNote() {
		return note;
	}
	public String getSupplier() {
		return supplier;
	}
	public String getCommoditiesJSON() {
		return commoditiesJSON;
	}
	public IndentType getIndentType() {
		return indentType;
	}
	public String getUserId() {
		return userId;
	}
	public String getTaskId() {
		return taskId;
	}
	public String getTaskName() {
		return taskName;
	}
	public Date getTaskCreateTime() {
		return taskCreateTime;
	}
	public String getAssignee() {
		return assignee;
	}
	public String getTaskDefinitionKey() {
		return taskDefinitionKey;
	}
	public String getProcessInstanceId() {
		return processInstanceId;
	}
	public String getProcessDefinitionId() {
		return processDefinitionId;
	}
	public boolean isSuspended() {
		return suspended;
	}
	public int getVersion() {
		return version;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setIndentNum(String indentNum) {
		this.indentNum = indentNum;
	}
	public void setCommodities(List<Commodity> commodities) {
		this.commodities = commodities;
	}
	public void setCost(Double cost) {
		this.cost = cost;
	}
	public void setIndentStatus(IndentStatus indentStatus) {
		this.indentStatus = indentStatus;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public void setCreator(User creator) {
		this.creator = creator;
	}
	public void setKeeper(User keeper) {
		this.keeper = keeper;
	}
	public void setManager(User manager) {
		this.manager = manager;
	}
	public void setFromWarehouse(Warehouse fromWarehouse) {
		this.fromWarehouse = fromWarehouse;
	}
	public void setToWarehouse(Warehouse toWarehouse) {
		this.toWarehouse = toWarehouse;
	}
	public void setFromShop(Shop fromShop) {
		this.fromShop = fromShop;
	}
	public void setToShop(Shop toShop) {
		this.toShop = toShop;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}
	public void setCommoditiesJSON(String commoditiesJSON) {
		this.commoditiesJSON = commoditiesJSON;
	}
	public void setIndentType(IndentType indentType) {
		this.indentType = indentType;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public void setTaskCreateTime(Date taskCreateTime) {
		this.taskCreateTime = taskCreateTime;
	}
	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}
	public void setTaskDefinitionKey(String taskDefinitionKey) {
		this.taskDefinitionKey = taskDefinitionKey;
	}
	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}
	public void setProcessDefinitionId(String processDefinitionId) {
		this.processDefinitionId = processDefinitionId;
	}
	public void setSuspended(boolean suspended) {
		this.suspended = suspended;
	}
	public void setVersion(int version) {
		this.version = version;
	}
	public Date getTaskClaimTime() {
		return taskClaimTime;
	}
	public void setTaskClaimTime(Date taskClaimTime) {
		this.taskClaimTime = taskClaimTime;
	}
    
    

}
