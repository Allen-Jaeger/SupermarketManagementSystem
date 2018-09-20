package com.invoicingSystem.main.commodity.domain;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.invoicingSystem.main.commodity.util.CommodityStatus;
import com.invoicingSystem.main.indent.domain.Indent;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */

@Table(name="t_commodity")
@Entity
public class Commodity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private Long barCode;

	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	private Date period;	//保质期
	private String name;
	private String picUrl;
	private int amount;
	private int saveStock;	//安全库存量，低于这个数值高亮
	private Double price;
	private Double cost;	//单价，总价=cost*amount
	private String note;
	private CommodityStatus commodityStatus;
	@ManyToOne(cascade=CascadeType.ALL)
	private Indent indent;
	public Long getId() {
		return id;
	}
	public Long getBarCode() {
		return barCode;
	}
	public Date getPeriod() {
		return period;
	}
	public String getName() {
		return name;
	}
	public String getPicUrl() {
		return picUrl;
	}
	public int getAmount() {
		return amount;
	}
	public int getSaveStock() {
		return saveStock;
	}
	public Double getPrice() {
		return price;
	}
	public Double getCost() {
		return cost;
	}
	public String getNote() {
		return note;
	}
	public CommodityStatus getCommodityStatus() {
		return commodityStatus;
	}
	public Indent getIndent() {
		return indent;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setBarCode(Long barCode) {
		this.barCode = barCode;
	}
	public void setPeriod(Date period) {
		this.period = period;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setPicUrl(String picUrl) {
		this.picUrl = picUrl;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public void setSaveStock(int saveStock) {
		this.saveStock = saveStock;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public void setCost(Double cost) {
		this.cost = cost;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public void setCommodityStatus(CommodityStatus commodityStatus) {
		this.commodityStatus = commodityStatus;
	}
	public void setIndent(Indent indent) {
		this.indent = indent;
	}
	
}
