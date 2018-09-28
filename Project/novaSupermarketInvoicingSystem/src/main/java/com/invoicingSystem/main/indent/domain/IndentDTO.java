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
public class IndentDTO {
    
    private Long id;
    private String indentNum;

    private List<Commodity> commodities = new ArrayList<Commodity>();
    
    private Double cost;    //订单总成本
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
    private IndentType indentType;
    
    //工作流字段
    private String userId;//启动流程的用户ID
    //流程实例Id：用于关联流程引擎相关数据没有启动流程之前为""
    private String processInstanceId;
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getIndentNum() {
        return indentNum;
    }
    public void setIndentNum(String indentNum) {
        this.indentNum = indentNum;
    }
    public List<Commodity> getCommodities() {
        return commodities;
    }
    public void setCommodities(List<Commodity> commodities) {
        this.commodities = commodities;
    }
    public Double getCost() {
        return cost;
    }
    public void setCost(Double cost) {
        this.cost = cost;
    }
    public IndentStatus getIndentStatus() {
        return indentStatus;
    }
    public void setIndentStatus(IndentStatus indentStatus) {
        this.indentStatus = indentStatus;
    }
    public Date getCreateDate() {
        return createDate;
    }
    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
    public User getCreator() {
        return creator;
    }
    public void setCreator(User creator) {
        this.creator = creator;
    }
    public User getKeeper() {
        return keeper;
    }
    public void setKeeper(User keeper) {
        this.keeper = keeper;
    }
    public User getManager() {
        return manager;
    }
    public void setManager(User manager) {
        this.manager = manager;
    }
    public Warehouse getFromWarehouse() {
        return fromWarehouse;
    }
    public void setFromWarehouse(Warehouse fromWarehouse) {
        this.fromWarehouse = fromWarehouse;
    }
    public Warehouse getToWarehouse() {
        return toWarehouse;
    }
    public void setToWarehouse(Warehouse toWarehouse) {
        this.toWarehouse = toWarehouse;
    }
    public Shop getFromShop() {
        return fromShop;
    }
    public void setFromShop(Shop fromShop) {
        this.fromShop = fromShop;
    }
    public Shop getToShop() {
        return toShop;
    }
    public void setToShop(Shop toShop) {
        this.toShop = toShop;
    }
    public String getNote() {
        return note;
    }
    public void setNote(String note) {
        this.note = note;
    }
    public IndentType getIndentType() {
        return indentType;
    }
    public void setIndentType(IndentType indentType) {
        this.indentType = indentType;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getProcessInstanceId() {
        return processInstanceId;
    }
    public void setProcessInstanceId(String processInstanceId) {
        this.processInstanceId = processInstanceId;
    }
	@Override
	public String toString() {
		return "IndentDTO [id=" + id + ", indentNum=" + indentNum + ", commodities=" + commodities + ", cost=" + cost
				+ ", indentStatus=" + indentStatus + ", createDate=" + createDate + ", creator=" + creator + ", keeper="
				+ keeper + ", manager=" + manager + ", fromWarehouse=" + fromWarehouse + ", toWarehouse=" + toWarehouse
				+ ", fromShop=" + fromShop + ", toShop=" + toShop + ", note=" + note + ", indentType=" + indentType
				+ ", userId=" + userId + ", processInstanceId=" + processInstanceId + "]";
	}

    

}
