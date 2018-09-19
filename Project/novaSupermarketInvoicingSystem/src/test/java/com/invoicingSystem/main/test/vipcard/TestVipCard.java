package com.invoicingSystem.main.test.vipcard;

import java.util.Date;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.invoicingSystem.main.commodity.service.ICommodityService;
import com.invoicingSystem.main.indent.service.IIndentService;
import com.invoicingSystem.main.user.service.IUserService;
import com.invoicingSystem.main.vipcard.domain.VipCard;
import com.invoicingSystem.main.vipcard.service.IVipCardService;
import com.invoicingSystem.main.warehouse.service.IWarehouseService;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TestVipCard {
	@Autowired
	IIndentService indentService;
	@Autowired
	ICommodityService commodityService;
	@Autowired
	IUserService userService;
	@Autowired
	IWarehouseService warehouseService;
	@Autowired
	IVipCardService vipCardService;
	
	@Test
	public void vipCardAdd() {
		for (int i = 0; i < 10; i++) {
			VipCard card = new VipCard();
			card.setCardNo(Long.parseLong("100000"+i));
			card.setOpenDate(new Date());
			card.setScore(100);
			vipCardService.save(card);
		}
	}
}
