package com.invoicingSystem.main.order.domain;

import java.util.Date;

public class OrderInfoDTO {
	
	//订单号
	private String orderId ;
	
	//柜员号
	private Long salesmanId;
	
	//超市号
	private Long shopId;

	//会员号
	private Long menberId ;
	
	//会员姓名
	private String menberName ;
	
	//会员电话
	private String menberPhone ;
	
	//会员折扣
	private String menberDiscount ;
	
	//商品总成本
	private Double goodsTotalCost ;
	
	//商品总价
	private Double goodsTotalPrice ;
	
	//订单折扣
	private Double orderDiscount ;
	
	//订单总价
	private Double orderAmount ;
	
	//下单时间
	private Date orderTime ;
	
	//支付时间
	private Date payTime ;

	//预留字段（删除判断）
	private Integer type;
	
	
	//Getter And Setter
	
	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public Long getSalesmanId() {
		return salesmanId;
	}

	public void setSalesmanId(Long salesmanId) {
		this.salesmanId = salesmanId;
	}

	public Long getShopId() {
		return shopId;
	}

	public void setShopId(Long shopId) {
		this.shopId = shopId;
	}
	
	public Long getMenberId() {
		return menberId;
	}

	public void setMenberId(Long menberId) {
		this.menberId = menberId;
	}

	public String getMenberName() {
		return menberName;
	}

	public void setMenberName(String menberName) {
		this.menberName = menberName;
	}

	public String getMenberPhone() {
		return menberPhone;
	}

	public void setMenberPhone(String menberPhone) {
		this.menberPhone = menberPhone;
	}

	public String getMenberDiscount() {
		return menberDiscount;
	}

	public void setMenberDiscount(String menberDiscount) {
		this.menberDiscount = menberDiscount;
	}

	public Double getGoodsTotalCost() {
		return goodsTotalCost;
	}

	public void setGoodsTotalCost(Double goodsTotalCost) {
		this.goodsTotalCost = goodsTotalCost;
	}

	public Double getGoodsTotalPrice() {
		return goodsTotalPrice;
	}

	public void setGoodsTotalPrice(Double goodsTotalPrice) {
		this.goodsTotalPrice = goodsTotalPrice;
	}

	public Double getOrderDiscount() {
		return orderDiscount;
	}

	public void setOrderDiscount(Double orderDiscount) {
		this.orderDiscount = orderDiscount;
	}

	public Double getOrderAmount() {
		return orderAmount;
	}

	public void setOrderAmount(Double orderAmount) {
		this.orderAmount = orderAmount;
	}

	public Date getOrderTime() {
		return orderTime;
	}

	public void setOrderTime(Date orderTime) {
		this.orderTime = orderTime;
	}

	public Date getPayTime() {
		return payTime;
	}

	public void setPayTime(Date payTime) {
		this.payTime = payTime;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}
	
}
