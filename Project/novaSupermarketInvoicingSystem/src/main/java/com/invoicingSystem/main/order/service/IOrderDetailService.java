package com.invoicingSystem.main.order.service;

import java.util.List;

import com.invoicingSystem.main.order.domain.OrderDetail;

public interface IOrderDetailService {
	
	public Boolean saveAll(List<OrderDetail> orderDetailList) ;
	
	public List<OrderDetail> findByOrderId(String orderId) ;

}
