package com.invoicingSystem.main.statistics.salesStatistics.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.invoicingSystem.main.statistics.salesStatistics.domain.SalesStatisticsQueryDTO;
import com.invoicingSystem.main.statistics.salesStatistics.service.ISalesStatisticsService;
/**
 * @author Suxj
 * 销售统计 Controller
 */
@RestController
@RequestMapping(value = "/salesStatistics")
public class SalesStatisticsController {
	@Autowired
	ISalesStatisticsService salesStatisticsService;
	
	@GetMapping(value = "/getAllSales")//销售订单
	public List<Map<String,String>> getAllSales(SalesStatisticsQueryDTO salesStatisticsQueryDTO){
		return salesStatisticsService.findAllSalesByQuarterAndMonth(salesStatisticsQueryDTO);
		
	}
	
	@GetMapping(value = "/getSalesDetail")//销售订单详情
	public List<Map<String,String>> getSalesDetail(@RequestParam(name = "orderId") String orderId){
//		return salesStatisticsService.findAllSalesByQuarterAndMonth(salesStatisticsQueryDTO);
		return salesStatisticsService.findSalesDetail(orderId);
		
	}
}
