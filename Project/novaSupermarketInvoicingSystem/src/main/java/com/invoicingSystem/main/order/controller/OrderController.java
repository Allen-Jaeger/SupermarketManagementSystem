package com.invoicingSystem.main.order.controller;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.invoicingSystem.main.order.domain.OrderDetail;
import com.invoicingSystem.main.order.domain.OrderInfo;
import com.invoicingSystem.main.order.domain.OrderInfoDTO;
import com.invoicingSystem.main.order.service.IOrderDetailService;
import com.invoicingSystem.main.order.service.IOrderInfoService;


@RestController
@RequestMapping(value="/order")


public class OrderController {
	
	@Autowired
	IOrderInfoService orderInfoService ;
	
	@Autowired
	IOrderDetailService orderDetailService ;
	
	@PostMapping(value="/save")
	public Object saveOrder(@RequestParam(value="orderInfo")OrderInfoDTO orderInfoDTO ,
			@RequestParam(value="orderDetailList") List<OrderDetail> orderDetailList )
	{

		OrderInfo orderInfo = new OrderInfo();
		
		BeanUtils.copyProperties(orderInfoDTO, orderInfo);
		
		orderInfoService.save(orderInfo);
		
		orderDetailService.saveAll(orderDetailList);
		
		return true;

	}

}
