package com.invoicingSystem.main.test.commodity;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.commodity.service.ICommodityService;
import com.invoicingSystem.main.commodity.util.CommodityStatus;
import com.invoicingSystem.main.commodity.util.CommodityType;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@SpringBootTest
@RunWith(SpringRunner.class)
public class TestCommodity {
	@Autowired
	ICommodityService commodityService;
	
	@Test
	public void saveCommodity() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date period  = null;
		try {
		     period  = sdf.parse("2019-11-06");
		}catch (Exception e){
		    e.printStackTrace();
		}
		for(int i=0;i<20;i++)
		{
		Commodity commodity = new Commodity();
		commodity.setAmount(1000);
		commodity.setBarCode(6902538004045L);
		commodity.setCost(2.0);
		commodity.setName("可乐50"+i+"ml");
		commodity.setNote("冷藏");
		commodity.setPeriod(period);
		commodity.setPicUrl("//111//url");
		commodity.setPrice(3.0);
		commodity.setCommodityStatus(CommodityStatus.UNSALEABLE);
		commodity.setCommodityType(CommodityType.DRINK);
		commodity.setSaveStock(100);
		
		commodityService.save(commodity);}
	}
}
