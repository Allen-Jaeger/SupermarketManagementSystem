package com.invoicingSystem.main.order.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.activiti.engine.impl.asyncexecutor.ResetExpiredJobsRunnable;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.collections.map.HashedMap;
import org.apache.ibatis.jdbc.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.invoicingSystem.main.order.domain.OrderDTO;
import com.invoicingSystem.main.order.domain.OrderDetail;
import com.invoicingSystem.main.order.domain.OrderDetailDTO;
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
	public Object saveOrder(@RequestBody OrderDTO orderDTO )
	{

		OrderInfo orderInfo = orderDTO.getOrderInfo() ;
		orderInfo.setOrderTime( new Date() );
		orderInfo.setPayTime( new Date() );

		orderInfoService.save( orderInfo ) ;
		orderDetailService.saveAll( orderDTO.getOrderDetailList() ) ;

		return orderDTO ;

	}
	
	//分页查询订单列表
	@GetMapping(value="/getOrderList")
	public Page<OrderInfo> getOrderList(Pageable pageable) {
		return orderInfoService.list(pageable) ;
	}
	
	//查询订单详情
	@GetMapping(value="/getOrderDetail") 
	public List<OrderDetail> getOrderDetail(@RequestParam(value="orderId")String orderId) {
		return orderDetailService.findByOrderId(orderId) ;
	}

}
