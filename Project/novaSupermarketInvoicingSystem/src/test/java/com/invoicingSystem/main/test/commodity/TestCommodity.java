package com.invoicingSystem.main.test.commodity;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.commodity.service.ICommodityService;

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
		Commodity commodity = new Commodity();
		commodity.setAmount(12);
		commodity.setBarCode(123342345435L);
		commodity.setCost(2.0);
	
	}
}
