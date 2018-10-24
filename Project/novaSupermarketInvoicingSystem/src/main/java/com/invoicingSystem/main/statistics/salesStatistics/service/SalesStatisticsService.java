package com.invoicingSystem.main.statistics.salesStatistics.service;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.invoicingSystem.main.order.domain.OrderDetail;
import com.invoicingSystem.main.order.repository.OrderDetailRepository;
import com.invoicingSystem.main.order.repository.OrderInfoRepository;
import com.invoicingSystem.main.statistics.salesStatistics.domain.SalesStatisticsQueryDTO;
/**
 * @author Suxj
 * 销售订单统计
 * SalesStatisticsService
 **/

@Transactional
@Service
public class SalesStatisticsService implements ISalesStatisticsService {
	@Autowired
	OrderInfoRepository orderInfoRepository;
	@Autowired
	OrderDetailRepository orderDetailRepository ;

	//销售统计
	@Override
	public List<Map<String, String>> findAllSalesByQuarterAndMonth(SalesStatisticsQueryDTO salesStatisticsQueryDTO) {
		List<Map<String, String>> list= new ArrayList<Map<String, String>>();
		DecimalFormat decimalFormat = new DecimalFormat("###################.###########");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM");
		if(salesStatisticsQueryDTO.getCharType().equals("bar")) {
			List<Object> monthResultList = orderInfoRepository.findAllSalesByMonth(salesStatisticsQueryDTO.getShopId(),salesStatisticsQueryDTO.getStarDate(),salesStatisticsQueryDTO.getEndDate());
			for (int j = 0; j <monthResultList.size(); j++) {
				Object[] obj1 = (Object[]) monthResultList.get(j);
				Map<String,String> map = new HashMap<>();
				map.put("month",(String)obj1[0]);
				map.put("mothTotalCosts",decimalFormat.format((double)obj1[1]));
				map.put("monthSales",decimalFormat.format((double)obj1[2]));
				map.put("monthProfits",decimalFormat.format((double)obj1[2]-(double)obj1[1]));
				list.add(map);
			}
		}
		if(salesStatisticsQueryDTO.getCharType().equals("pie")) {
			List<Object> quarterResultList = orderInfoRepository.findAllSalesByQuarter(salesStatisticsQueryDTO.getShopId(), salesStatisticsQueryDTO.getStarDate(), salesStatisticsQueryDTO.getEndDate());
			for (int i = 0; i <quarterResultList.size(); i++) {
				Object[] obj2 = (Object[]) quarterResultList.get(i);
				Map<String,String> map = new HashMap<>();
				map.put("quarter",(String)obj2[0]+"Q");
				map.put("quarterTotalCosts",decimalFormat.format((double)obj2[1]));
				map.put("quarterSales",decimalFormat.format((double)obj2[2]));
				map.put("quarterProfits",decimalFormat.format((double)obj2[2]-(double)obj2[1]));
				list.add(map);
			}
		}
		
		if(salesStatisticsQueryDTO.getCharType().equals("gridpanel")) {
			SimpleDateFormat sdfs = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			List<Object> orderResultList = orderInfoRepository.findAllSalesByDates(salesStatisticsQueryDTO.getShopId(),salesStatisticsQueryDTO.getStarDate(),salesStatisticsQueryDTO.getEndDate());
			for (int k = 0; k < orderResultList.size(); k++) {
				Object[] obj = (Object[]) orderResultList.get(k);
				Map<String,String> map = new HashMap<>();
				map.put("orderId",(String)obj[0]);
				map.put("payTime",sdfs.format((Date)obj[1]));
				map.put("goodsTotalCost",decimalFormat.format((double)obj[2]));
				map.put("orderAmount",decimalFormat.format((double)obj[3]));
				map.put("ordeProfits",decimalFormat.format((double)obj[3]-(double)obj[2]));
				list.add(map);
			}
		}
		
		return list;
	}
	
	@Override
	public List<Map<String, String>> findSalesDetail(String orderId) {
		List<Map<String, String>> list= new ArrayList<Map<String, String>>();
		DecimalFormat decimalFormat = new DecimalFormat("###################.###########");
		List<OrderDetail> orderDetailList = orderDetailRepository.findByOrderId(orderId);
		for (int i = 0; i <orderDetailList.size(); i++) {
			Map<String,String> map = new HashMap<>();
			OrderDetail orderDetail = orderDetailList.get(i);
			map.put("itemTitle",orderDetail.getItemTitle());
			map.put("itemNum",Integer.toString(orderDetail.getItemNum()));
			map.put("itemPrice",decimalFormat.format(orderDetail.getItemPrice()));
			map.put("itemDiscount",decimalFormat.format(orderDetail.getItemDiscount()));
			list.add(map);
		}
		
		return list;
	}

}
