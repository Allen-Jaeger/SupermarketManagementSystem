package com.invoicingSystem.main.order.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.invoicingSystem.main.order.domain.OrderDetail;
import com.invoicingSystem.main.order.repository.OrderDetailRepository;

@Service
public class OrderDetailService implements IOrderDetailService{
	
	@Autowired
	public OrderDetailRepository orderDetailRepository ;

	@Override
	public Boolean saveAll(List<OrderDetail> orderDetailList) {
		orderDetailRepository.saveAll(orderDetailList) ;
		return true;
	}

	@Override
	public List<OrderDetail> findByOrderId(String orderId) {
		
		return orderDetailRepository.findByOrderId(orderId);
	}


}
