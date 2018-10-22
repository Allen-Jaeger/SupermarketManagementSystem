package com.invoicingSystem.main.test.statistics;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;

import com.invoicingSystem.main.indent.domain.Indent;
import com.invoicingSystem.main.indent.repository.IIndentRepository;
import com.invoicingSystem.main.indent.util.IndentType;
import com.invoicingSystem.main.statistics.purchaseStatistics.domain.PurchaseStatisticsQueryDTO;
import com.invoicingSystem.main.statistics.purchaseStatistics.service.IPurchaseStatisticsService;
/**
 * @author Suxj
 * 采购统计 测试用例
 */
public class Teststatistics {
	@Autowired
    IPurchaseStatisticsService purchaseStatisticsService;
	@Autowired
	IIndentRepository indentRepository;
	//@Test
	public void TestGetAllPurchase() {
		 PurchaseStatisticsQueryDTO queryDTO = new  PurchaseStatisticsQueryDTO();
		 
		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		 try {
			queryDTO.setCreateTimeStart(sdf.parse("2017/10/21 22:28:02"));
		} catch (ParseException e) {
			e.printStackTrace();
		}
//		 queryDTO.setCreateTimeStart(new Date());
//		 queryDTO.setCreateTimeEnd(new Date());
		 queryDTO.setWarehouseId(1L);
//		 System.out.println((new java.text.SimpleDateFormat("yyyy/MM/dd HH:mm:ss")).format(new Date()));
		 System.out.println(purchaseStatisticsService.findAll(PurchaseStatisticsQueryDTO.buildSpecification(queryDTO)));
//		 List<Map<String,String>> indentList = purchaseStatisticsService.findAll(PurchaseStatisticsQueryDTO.buildSpecification(queryDTO));
	}
	
}
