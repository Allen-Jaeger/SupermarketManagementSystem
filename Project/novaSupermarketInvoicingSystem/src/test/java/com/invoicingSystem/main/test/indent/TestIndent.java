package com.invoicingSystem.main.test.indent;

import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.invoicingSystem.main.commodity.service.ICommodityService;
import com.invoicingSystem.main.indent.domain.Indent;
import com.invoicingSystem.main.indent.service.IIndentService;
import com.invoicingSystem.main.indent.util.IndentStatus;
import com.invoicingSystem.main.user.service.IUserService;
import com.invoicingSystem.main.warehouse.service.IWarehouseService;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@SpringBootTest
@RunWith(SpringRunner.class)
public class TestIndent {
	@Autowired
	IIndentService indentService;
	@Autowired
	ICommodityService commodityService;
	@Autowired
	IUserService userService;
	@Autowired
	IWarehouseService warehouseService;
	
	@Test
	public void saveIndent() {
		Indent indent = new Indent();
		indent.getCommodities().add(commodityService.findById(1L));
		//indent.getCommodities().add(commodityService.findById(2L));
		indent.setCost(1.0);
		indent.setCreateDate(new Date());
		indent.setCreator(userService.findById(2L));
		indent.setFromWarehouse(null);
		indent.setIndentNum("BY15312145");
		indent.setIndentStatus(IndentStatus.EXTRACTING);
		indent.setInside(false);
		indent.setKeeper(userService.findById(4L));
		indent.setManager(userService.findById(5L));
		indent.setNote("测试的采购单");
		indent.setToWarehouse(warehouseService.findById(1L));
		indentService.save(indent);
	}
}
