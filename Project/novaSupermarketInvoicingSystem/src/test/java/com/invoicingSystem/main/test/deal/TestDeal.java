package com.invoicingSystem.main.test.deal;

import java.util.Date;

import org.junit.Test;

import com.invoicingSystem.main.deal.domain.Deal;
import com.invoicingSystem.main.test.TestBase;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */

public class TestDeal extends TestBase{
	@Test
	public void saveDeal() {
		Deal deal = new Deal();
		deal.getCommodities().add(super.commodityService.findById(1L));
		deal.setCost(1.0);
		deal.setDealDate(new Date());
		deal.setPrice(999.0);
		deal.setSalesman(super.userService.findById(9L));
		deal.setVipCard(super.vipCardService.findById(1L));
		super.dealService.save(deal);
	}
}
