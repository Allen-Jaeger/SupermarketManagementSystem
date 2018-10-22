package com.invoicingSystem.main.statistics.salesStatistics.service;

import java.util.List;
import java.util.Map;

import com.invoicingSystem.main.statistics.salesStatistics.domain.SalesStatisticsQueryDTO;
/**
 * @author Suxj
 * 销售订单统计
 * ISalesStatisticsService
 **/
public interface ISalesStatisticsService {
	//季度月份销售统计
	public List<Map<String, String>> findAllSalesByQuarterAndMonth(SalesStatisticsQueryDTO salesStatisticsQueryDTO);
	

}
