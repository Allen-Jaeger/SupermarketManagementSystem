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
	//季度销售统计
	@Override
	public List<Map<String, String>> findAllSalesByQuarterAndMonth(SalesStatisticsQueryDTO salesStatisticsQueryDTO) {
		List<Map<String, String>> list= new ArrayList<Map<String, String>>();
		List<Object> quarterResultList = orderInfoRepository.findAllSalesByQuarter(salesStatisticsQueryDTO.getShopId(), salesStatisticsQueryDTO.getStarDate(), salesStatisticsQueryDTO.getEndDate());
		List<Object> monthResultList = orderInfoRepository.findAllSalesByMonth(salesStatisticsQueryDTO.getShopId(),salesStatisticsQueryDTO.getStarDate(),salesStatisticsQueryDTO.getEndDate());
		DecimalFormat decimalFormat = new DecimalFormat("###################.###########");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM");
		for (int i = 0; i < quarterResultList.size(); i++) {
			Object[] obj = (Object[]) quarterResultList.get(i);
			Map<String,String> map = new HashMap<>();
			map.put("quarter",(String)obj[0]);
			map.put("quarterTotalCosts",decimalFormat.format((double)obj[1]));
			map.put("quarterSales",decimalFormat.format((double)obj[2]));
			map.put("quarterProfits",decimalFormat.format((double)obj[2]-(double)obj[1]));
//			map.put("userType",userType.getChineseName());
//			System.out.println(obj[0]+"----"+obj[1]);
//			select CONCAT(YEAR(pay_time),'_',quarter(pay_time)) quarter,sum(goods_total_cost) as quarterTotalCosts, sum(order_amount) as quarterTotalSales
//			SELECT  date_format(pay_time, '%Y-%m')month ,sum(goods_total_cost) as mothTotalCosts, sum(order_amount) as mothTotalSales 
//			'month', 'monthSales', 'quarter', 'quarterSales','profits'
			list.add(map);
		}
		
		for (int i = 0; i < monthResultList.size(); i++) {
			Object[] obj = (Object[]) monthResultList.get(i);
			Map<String,String> map = new HashMap<>();
			map.put("month",sdf.format((Date)obj[0]));
			map.put("mothTotalCosts",decimalFormat.format((double)obj[1]));
			map.put("monthSales",decimalFormat.format((double)obj[2]));
			map.put("monthProfits",decimalFormat.format((double)obj[2]-(double)obj[1]));
//			'month', 'monthSales', 'quarter', 'quarterSales','profits'
			list.add(map);
		}
		
		
		
		return null;
	}


}
