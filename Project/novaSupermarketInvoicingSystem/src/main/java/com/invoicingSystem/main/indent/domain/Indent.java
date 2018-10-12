package com.invoicingSystem.main.indent.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.indent.util.IndentStatus;
import com.invoicingSystem.main.indent.util.IndentType;
import com.invoicingSystem.main.shop.domain.Shop;
import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.warehouse.domain.Warehouse;

/**
 * @author LiJuncong
 * at 2018年9月19日
 * @author lzy
 * at 2018年9月25日 :添加工作流数据字段
 * 
 */
@Table(name="t_indent")
@Entity
public class Indent {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String indentNum;
	@OneToMany(fetch=FetchType.LAZY,cascade=CascadeType.MERGE)
	@JoinColumn(name="indent_commodities")
	@Fetch(FetchMode.SUBSELECT)
	private List<Commodity> commodities = new ArrayList<Commodity>();
	private Double cost;	//订单总成本
	private IndentStatus indentStatus;
	private Date createDate;
	@ManyToOne(cascade=CascadeType.MERGE)
	private User creator;
	@ManyToOne(cascade=CascadeType.MERGE)
	private User keeper;
	@ManyToOne(cascade=CascadeType.MERGE)
	private User manager;
	@ManyToOne(cascade=CascadeType.MERGE)
	private Warehouse fromWarehouse;
	@ManyToOne(cascade=CascadeType.MERGE)
	private Warehouse toWarehouse;
	@ManyToOne(cascade=CascadeType.MERGE)
	private Shop fromShop;
	@ManyToOne(cascade=CascadeType.MERGE)
	private Shop toShop;
	private String note;
	private String supplier;	//供应商
	
	//用于接收前端发来的货单中的订单列表
	//转化成commodity类
	private String  commoditiesJSON;
		
	private IndentType indentType;
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
	
	@JsonFormat(pattern="YYYY/MM/dd HH:mm:ss", timezone="GMT+8")
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
	
	public IndentType getIndentType() {
		return indentType;
	}
	public String getSupplier() {
		return supplier;
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

	public void setIndentType(IndentType indentType) {
		this.indentType = indentType;
	}
	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}

	/**
	 * 遍历订单货物，更新订单成本
	 */
	private void updateCost() {
		this.cost = 0.0;
		for (Commodity commodity:this.commodities) {
			this.cost += (commodity.getCost()* commodity.getAmount());
		}
	}

	//工作流
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

    
    
    
	public String getCommoditiesJSON() {
		return commoditiesJSON;
	}

	public void setCommoditiesJSON(String commoditiesJSON) {
		this.commoditiesJSON = commoditiesJSON;
	}

	@Override
	public String toString() {
		return "Indent [id=" + id + ", indentNum=" + indentNum + ", commodities=" + commodities + ", cost=" + cost
				+ ", indentStatus=" + indentStatus + ", createDate=" + createDate + ", creator=" + creator + ", keeper="
				+ keeper + ", manager=" + manager + ", fromWarehouse=" + fromWarehouse + ", toWarehouse=" + toWarehouse
				+ ", fromShop=" + fromShop + ", toShop=" + toShop + ", note=" + note + ", supplier=" + supplier
				+ ", commoditiesJSON=" + commoditiesJSON + ", indentType=" + indentType + ", userId=" + userId
				+ ", processInstanceId=" + processInstanceId + ", getId()=" + getId() + ", getIndentNum()="
				+ getIndentNum() + ", getCommodities()=" + getCommodities() + ", getCost()=" + getCost()
				+ ", getIndentStatus()=" + getIndentStatus() + ", getCreateDate()=" + getCreateDate()
				+ ", getCreator()=" + getCreator() + ", getKeeper()=" + getKeeper() + ", getManager()=" + getManager()
				+ ", getFromWarehouse()=" + getFromWarehouse() + ", getToWarehouse()=" + getToWarehouse()
				+ ", getFromShop()=" + getFromShop() + ", getToShop()=" + getToShop() + ", getNote()=" + getNote()
				+ ", getIndentType()=" + getIndentType() + ", getSupplier()=" + getSupplier() + ", getUserId()="
				+ getUserId() + ", getProcessInstanceId()=" + getProcessInstanceId() + ", getCommoditiesJSON()="
				+ getCommoditiesJSON() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()="
				+ super.toString() + "]";
	}

	
	
}
