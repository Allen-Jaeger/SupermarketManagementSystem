package com.invoicingSystem.main.test.warehouse;

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
import com.invoicingSystem.main.util.Location;
import com.invoicingSystem.main.warehouse.domain.Warehouse;
import com.invoicingSystem.main.warehouse.service.IWarehouseService;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TestWarehouse {
	@Autowired
	IIndentService indentService;
	@Autowired
	ICommodityService commodityService;
	@Autowired
	IUserService userService;
	@Autowired
	IWarehouseService warehouseService;
	
	@Test
	public void addWarehouse() {
		Warehouse warehouse = new Warehouse();
		warehouse.setLocation(new Location(1.0,1.0,"东莞理工"));
		warehouse.setName("东12仓库");
		warehouse.getKeepers().add(userService.findById(8L));
		warehouseService.save(warehouse);
	}
	
	@Test
	public void addKeeper() {
		Warehouse warehouse = warehouseService.findById(1L);
		warehouse.getKeepers().add(userService.findById(3L));
		warehouseService.save(warehouse);
	}
	
	@Test
	public void indentInputWarehouse() {
		Warehouse warehouse = warehouseService.findById(2L);
		Indent indent = indentService.findById(1L);
		indent.setIndentStatus(IndentStatus.FINISHED);
		warehouse.getCommodities().addAll(indent.getCommodities());
		indentService.save(indent);
		warehouseService.save(warehouse);
	}
}
