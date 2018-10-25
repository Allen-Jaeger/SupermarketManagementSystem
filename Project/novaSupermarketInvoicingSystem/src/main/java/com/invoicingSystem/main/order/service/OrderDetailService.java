package com.invoicingSystem.main.order.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.invoicingSystem.main.commodity.repository.ICommodityRepository;
import com.invoicingSystem.main.order.domain.OrderDetail;
import com.invoicingSystem.main.order.repository.OrderDetailRepository;

@Service
public class OrderDetailService implements IOrderDetailService{
	
	@Autowired
	public OrderDetailRepository orderDetailRepository ;
	
	@Autowired
	public ICommodityRepository commodityRepository ;

	@Override
	public Boolean saveAll(List<OrderDetail> orderDetailList) {
		
		//更新库存信息
//		for(int i=0; i< orderDetailList.size() ;i++  ) {
//			orderDetailList.get(i).getOrderId() ;
////			commodityRepository.up
//		}
		//存储订单
		orderDetailRepository.saveAll(orderDetailList) ;
		return true;
	}

	@Override
	public List<OrderDetail> findByOrderId(String orderId) {
		
		return orderDetailRepository.findByOrderId(orderId);
	}


}
