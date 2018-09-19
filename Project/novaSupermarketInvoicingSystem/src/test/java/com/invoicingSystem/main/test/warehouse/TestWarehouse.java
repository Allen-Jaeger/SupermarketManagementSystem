package com.invoicingSystem.main.test.warehouse;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.invoicingSystem.main.user.service.IUserService;
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
	IWarehouseService warehouseService;
	@Autowired
	IUserService userService;
	@Test
	public void addWarehouse() {
		Warehouse warehouse = new Warehouse();
		warehouse.setLocation("东莞松山湖大学路2号");
		warehouse.setName("3号仓库");
		warehouse.getKeepers().add(userService.findById(1L));
		warehouseService.updateWarehouse(warehouse);
	}
	
	@Test
	public void addKeeper() {
		Warehouse warehouse = warehouseService.findById(1L);
		warehouse.getKeepers().add(userService.findById(3L));
		warehouseService.updateWarehouse(warehouse);
	}
}
