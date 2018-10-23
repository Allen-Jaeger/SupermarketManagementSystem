package com.invoicingSystem.main.order.domain;

import java.util.List;

public class OrderDTO {
	
	private List<OrderDetail> orderDetailList ;
	
	private OrderInfo orderInfo;
	
	public OrderInfo getOrderInfo() {
		return orderInfo;
	}

	public void setOrderInfo(OrderInfo orderInfo) {
		this.orderInfo = orderInfo;
	}

	public List<OrderDetail> getOrderDetailList(){
		return orderDetailList;
	}
	
	public void setOrderDetailList(List<OrderDetail> orderDetailList){
		this.orderDetailList=orderDetailList;
	}

}
