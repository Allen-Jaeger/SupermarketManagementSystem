package com.invoicingSystem.main.statistics.purchaseStatistics.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.invoicingSystem.main.statistics.purchaseStatistics.domain.PurchaseStatisticsQueryDTO;
import com.invoicingSystem.main.statistics.purchaseStatistics.service.IPurchaseStatisticsService;


/**
 * @author Suxj
 * 采购统计 Controller
 */
@RestController
@RequestMapping(value = "/purchaseStatistic")
public class PurchaseStatisticsController {
	@Autowired
    IPurchaseStatisticsService purchaseStatisticsService;
	
	@GetMapping(value = "/getAllPurchase")
	public List<Map<String,String>> getAllPurchase(PurchaseStatisticsQueryDTO purchaseQueryDTO){
		
		return purchaseStatisticsService.findAll(PurchaseStatisticsQueryDTO.buildSpecification(purchaseQueryDTO));
//		System.out.println(indentList);
		
	}
	
//	@GetMapping(value = "/getAll")
//	public void  getAll(){
//		List<Object> resultList = indentRepository.findAllCounts();
//		for (int i = 0; i < resultList.size(); i++) {
//			Object[] obj = (Object[]) resultList.get(i);
//			System.out.println(obj[0]+"----"+obj[1]);
//			
//		}
//		 
////		System.out.println(indentList);
//		
//	}

}
