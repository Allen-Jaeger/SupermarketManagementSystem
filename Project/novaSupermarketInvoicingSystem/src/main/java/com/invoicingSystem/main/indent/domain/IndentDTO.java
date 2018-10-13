package com.invoicingSystem.main.indent.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.indent.util.IndentStatus;
import com.invoicingSystem.main.indent.util.IndentType;
import com.invoicingSystem.main.shop.domain.Shop;
import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.warehouse.domain.Warehouse;

/**
* @author Lzy
* @version 创建时间：2018年9月25日 下午9:07:53
* 类说明:DTO
*/

/**
 * @author wuzihao
 * DTO字段类型修改
 */
public class IndentDTO {
    
    private Long id;
    private String indentNum;

    private List<Commodity> commodities = new ArrayList<Commodity>();
    
    private Double cost;    //订单总成本
    private IndentStatus indentStatus;
    private Date createDate; 
    private Long creator;
    private Long keeper; 
    private Long manager;//采购(超级管理员)
    private Long fromWarehouse; 
    private Long toWarehouse;
    private Long fromShop; 
    private Long toShop;
    private String note;
    private IndentType indentType;
    private String  commoditiesJSON;
    
    //工作流字段
    private String userId;//启动流程的用户ID
    //流程实例Id：用于关联流程引擎相关数据没有启动流程之前为""
    private String processInstanceId;
    
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
	public Long getCreator() {
		return creator;
	}
	public Long getKeeper() {
		return keeper;
	}
	public Long getManager() {
		return manager;
	}
	public Long getFromWarehouse() {
		return fromWarehouse;
	}
	public Long getToWarehouse() {
		return toWarehouse;
	}
	public Long getFromShop() {
		return fromShop;
	}
	public Long getToShop() {
		return toShop;
	}
	public String getNote() {
		return note;
	}
	public IndentType getIndentType() {
		return indentType;
	}
	public String getCommoditiesJSON() {
		return commoditiesJSON;
	}
	public String getUserId() {
		return userId;
	}
	public String getProcessInstanceId() {
		return processInstanceId;
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
	public void setCost(String cost) {
		this.cost = Double.parseDouble(cost);
	}
	public void setIndentStatus(IndentStatus indentStatus) {
		this.indentStatus = indentStatus;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public void setCreator(Long creator) {
		this.creator = creator;
	}
	public void setKeeper(Long keeper) {
		this.keeper = keeper;
	}
	public void setManager(Long manager) {
		this.manager = manager;
	}
	public void setFromWarehouse(Long fromWarehouse) {
		this.fromWarehouse = fromWarehouse;
	}
	public void setToWarehouse(Long toWarehouse) {
		this.toWarehouse = toWarehouse;
	}
	public void setFromShop(Long fromShop) {
		this.fromShop = fromShop;
	}
	public void setToShop(Long toShop) {
		this.toShop = toShop;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public void setIndentType(IndentType indentType) {
		this.indentType = indentType;
	}
	public void setCommoditiesJSON(String commoditiesJSON) {
		this.commoditiesJSON = commoditiesJSON;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}
	@Override
	public String toString() {
		return "\n\n\n IndentDTO [id=" + id + ", indentNum=" + indentNum + ", commodities=" + commodities + ", cost=" + cost
				+ ", indentStatus=" + indentStatus + ", createDate=" + createDate + ", creator=" + creator + ", keeper="
				+ keeper + ", manager=" + manager + ", fromWarehouse=" + fromWarehouse + ", toWarehouse=" + toWarehouse
				+ ", fromShop=" + fromShop + ", toShop=" + toShop + ", note=" + note + ", indentType=" + indentType
				+ ", commoditiesJSON=" + commoditiesJSON + ", userId=" + userId + ", processInstanceId="
				+ processInstanceId + "]\n\n\n";
	}
    
    
    
    
}
