package com.invoicingSystem.main.order.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.invoicingSystem.main.order.domain.OrderInfo;
import com.invoicingSystem.main.order.repository.OrderInfoRepository;

@Service
public class OrderInfoService implements IOrderInfoService {
	@Autowired
	private OrderInfoRepository orderRepository ;
	
	public Boolean save(OrderInfo order) {
		orderRepository.save(order);
		return true ;
	}
	
	public Boolean delete(Long id) {
		orderRepository.deleteById(id);
		return true ;
	}
	
	//根据order领域属性查询列表
	public Page<OrderInfo> list(Pageable pageable) {
		orderRepository.findAll(pageable);
		return null ;
	}

}
