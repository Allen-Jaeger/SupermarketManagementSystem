package com.invoicingSystem.main.test.statistics;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;

import com.invoicingSystem.main.indent.domain.Indent;
import com.invoicingSystem.main.indent.repository.IIndentRepository;
import com.invoicingSystem.main.indent.util.IndentType;
import com.invoicingSystem.main.statistics.domain.PurchaseStatisticsQueryDTO;
import com.invoicingSystem.main.statistics.service.IPurchaseStatisticsService;
/**
 * @author Suxj
 * 采购统计 测试用例
 */
public class Teststatistics {
	@Autowired
    IPurchaseStatisticsService purchaseStatisticsService;
	@Autowired
	IIndentRepository indentRepository;
	@Test
	public void TestGetAllPurchase() {
		 PurchaseStatisticsQueryDTO queryDTO = new  PurchaseStatisticsQueryDTO();
		 
//		 queryDTO.setCreateTimeStart(createTimeStart);
//		 queryDTO.setCreateTimeEnd(createTimeEnd);
		 queryDTO.setWarehouseId(1L);
		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		 Specification<Indent> spec = null;
		 /*try {
			queryDTO.setCreateTimeStart(sdf.parse("2017/10/21 22:28:02"));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
		 queryDTO.setCreateTimeStart(new Date());
		 queryDTO.setCreateTimeEnd(new Date());
		 queryDTO.setBarCode(null);
		 queryDTO.setCommodityName(null);
//		 queryDTO.setIndentType(IndentType.PURCHASE);
//		 System.out.println((new java.text.SimpleDateFormat("yyyy/MM/dd HH:mm:ss")).format(new Date()));
//		 System.out.println((new java.text.SimpleDateFormat("yyyy/MM/dd HH:mm:ss")).format(date));
//		 System.out.println(queryDTO);
//		List<Indent> indentList = purchaseStatisticsService.findAll(PurchaseStatisticsQueryDTO.buildSpecification(queryDTO));
//		 List<Indent> indentList = purchaseStatisticsService.findAll(null);
		 indentRepository.findAll(spec);
		System.out.println(PurchaseStatisticsQueryDTO.buildSpecification(queryDTO));
//		System.out.println(queryDTO.getCreateTimeStart());
	}
}
