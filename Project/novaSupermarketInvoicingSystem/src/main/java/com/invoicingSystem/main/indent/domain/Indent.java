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
import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.warehouse.domain.Warehouse;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@Table(name="t_indent")
@Entity
public class Indent {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String indentNum;
	@OneToMany(fetch=FetchType.EAGER,cascade=CascadeType.MERGE)
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
	private boolean isInside;	//是否内部调货
	@ManyToOne(cascade=CascadeType.MERGE)
	private Warehouse fromWarehouse;
	@ManyToOne(cascade=CascadeType.MERGE)
	private Warehouse toWarehouse;
	private String note;
	
	
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
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
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
	public boolean isInside() {
		return isInside;
	}
	public Warehouse getFromWarehouse() {
		return fromWarehouse;
	}
	public Warehouse getToWarehouse() {
		return toWarehouse;
	}
	public String getNote() {
		return note;
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
		this.updateCost();
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
	public void setInside(boolean isInside) {
		this.isInside = isInside;
	}
	public void setFromWarehouse(Warehouse fromWarehouse) {
		this.fromWarehouse = fromWarehouse;
	}
	public void setToWarehouse(Warehouse toWarehouse) {
		this.toWarehouse = toWarehouse;
	}
	public void setNote(String note) {
		this.note = note;
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
	
}
