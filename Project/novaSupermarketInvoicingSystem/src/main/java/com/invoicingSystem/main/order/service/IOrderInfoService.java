package com.invoicingSystem.main.order.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.invoicingSystem.main.order.domain.OrderInfo;

public interface IOrderInfoService {
	
	public Boolean save(OrderInfo order);
	
	public Boolean delete(Long id);
	
	//根据order领域属性查询列表
	public Page<OrderInfo> list(Specification<OrderInfo> spec, Pageable pagebale) ;
}
