package com.invoicingSystem.main.commodity.domain;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Version;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.invoicingSystem.main.commodity.util.CommodityStatus;
import com.invoicingSystem.main.commodity.util.CommodityType;
import com.invoicingSystem.main.indent.domain.Indent;
import com.invoicingSystem.main.warehouse.domain.Warehouse;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */

/**
 * @author wzh
 * at 2018年9月28日 上午9:17:08
 * getIndent()加@JsonIgnore
 */
@Table(name="t_commodity")
@Entity
public class Commodity {
	private Long id;
	private Long barCode;
	private CommodityType commodityType;
	private Date period;	//保质期
	private String name;
	private String picUrl;
	private int amount;
	private int saveStock;	//安全库存量，低于这个数值高亮
	private Double price;
	private Double cost;	//单价，总价=cost*amount
	private String note;
	private CommodityStatus commodityStatus;
	private Indent indent;
	private int version;
	private Warehouse warehouse;
	

	public Commodity() {
		super();
	}
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}
	public Long getBarCode() {
		return barCode;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
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
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JsonIgnore
	public Indent getIndent() {
		return indent;
	}
	
	public CommodityType getCommodityType() {
		return commodityType;
	}
	@Version
	public int getVersion() {
		return version;
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

	public void setCommodityType(CommodityType commodityType) {
		this.commodityType = commodityType;
	}
	public void setVersion(int version) {
		this.version = version;
	}

	@ManyToOne
    @JsonIgnore
    public Warehouse getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }
}
