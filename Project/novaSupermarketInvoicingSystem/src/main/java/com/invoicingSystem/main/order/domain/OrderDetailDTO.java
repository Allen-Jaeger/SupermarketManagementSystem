package com.invoicingSystem.main.order.domain;

import java.util.List;

public class OrderDetailDTO {
	
	private List<OrderDetail> orderDetailList ;
	
	public List<OrderDetail> getOrderDetailList(){
		return orderDetailList;
	}
	
	public void setOrderDetailList(List<OrderDetail> orderDetailList){
		this.orderDetailList=orderDetailList;
	}

}
