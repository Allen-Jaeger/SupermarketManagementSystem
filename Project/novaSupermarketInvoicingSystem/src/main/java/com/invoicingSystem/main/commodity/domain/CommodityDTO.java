package com.invoicingSystem.main.commodity.domain;

import java.util.Date;

/**
 * @author LiJuncong
 * at 2018年9月29日
 */

public class CommodityDTO {
	private Long id;
	private Long barCode;
	private String commodityType;
	private Date period;	//保质期
	private String name;
	private String picUrl;
	private int amount;
	private int saveStock;	//安全库存量，低于这个数值高亮
	private Double price;
	private Double cost;	//单价，总价=cost*amount
	private String note;
	private String commodityStatus;
	private String indentNum;

	public CommodityDTO() {
		super();
	}
	
	/**
	 * 利用实体构造DTO
	 * @param commodity
	 */
	public CommodityDTO(Commodity commodity) {
		this.id = commodity.getId();
		this.barCode = commodity.getBarCode();
		this.commodityType = commodity.getCommodityType().getChineseName();
		this.period = commodity.getPeriod();
		this.name = commodity.getName();
		this.picUrl = commodity.getPicUrl();
		this.amount = commodity.getAmount();
		this.saveStock = commodity.getSaveStock();
		this.price = commodity.getPrice();
		this.cost = commodity.getCost();
		this.note = commodity.getNote();
		this.commodityStatus = commodity.getCommodityStatus().getChineseName();
		this.indentNum = commodity.getIndent().getIndentNum();
	}
	
	//Getter and Setter
	public Long getId() {
		return id;
	}
	public Long getBarCode() {
		return barCode;
	}
	public String getCommodityType() {
		return commodityType;
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
	public String getCommodityStatus() {
		return commodityStatus;
	}
	public String getIndentNum() {
		return indentNum;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setBarCode(Long barCode) {
		this.barCode = barCode;
	}
	public void setCommodityType(String commodityType) {
		this.commodityType = commodityType;
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
	public void setCommodityStatus(String commodityStatus) {
		this.commodityStatus = commodityStatus;
	}
	public void setIndentNum(String indentNum) {
		this.indentNum = indentNum;
	}
	
	
}
