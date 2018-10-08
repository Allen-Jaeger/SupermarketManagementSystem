package com.invoicingSystem.main.test;

import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.invoicingSystem.main.commodity.service.ICommodityService;
import com.invoicingSystem.main.deal.service.IDealService;
import com.invoicingSystem.main.indent.service.IIndentService;
import com.invoicingSystem.main.shop.service.IShopService;
import com.invoicingSystem.main.user.service.IUserService;
import com.invoicingSystem.main.vipcard.service.IVipCardService;
import com.invoicingSystem.main.warehouse.service.IWarehouseService;

import lombok.extern.slf4j.Slf4j;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@Slf4j
public class TestBase {
	@Autowired
	protected IIndentService indentService;
	@Autowired
	protected ICommodityService commodityService;
	@Autowired
	protected IUserService userService;
	@Autowired
	protected IWarehouseService warehouseService;
	@Autowired
	protected IShopService shopService;
	@Autowired
	protected IDealService dealService;
	@Autowired
	protected IVipCardService vipCardService;
	
	protected Logger log =  LoggerFactory.getLogger(this.getClass());
}
