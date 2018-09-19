package com.invoicingSystem.main.test.shop;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.invoicingSystem.main.commodity.service.ICommodityService;
import com.invoicingSystem.main.indent.service.IIndentService;
import com.invoicingSystem.main.shop.domain.Shop;
import com.invoicingSystem.main.shop.service.IShopService;
import com.invoicingSystem.main.user.service.IUserService;
import com.invoicingSystem.main.util.Location;
import com.invoicingSystem.main.warehouse.service.IWarehouseService;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class TestShop {
	@Autowired
	IIndentService indentService;
	@Autowired
	ICommodityService commodityService;
	@Autowired
	IUserService userService;
	@Autowired
	IWarehouseService warehouseService;
	@Autowired
	IShopService shopService;
	
	@Test
	public void addShop() {
		Shop shop = new Shop();
		shop.setName("第一门店");
		shop.setLocation(new Location(5.0,5.0,"北京路23号"));
		shop.getShopManager().add(userService.findById(5L));
		shop.getCommodities().add(commodityService.findById(1L));
		shopService.save(shop);
	}
	
}