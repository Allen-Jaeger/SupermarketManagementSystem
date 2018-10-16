package com.invoicingSystem.main.test.warehouse;

import org.junit.Test;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.indent.domain.Indent;
import com.invoicingSystem.main.indent.util.IndentStatus;
import com.invoicingSystem.main.test.TestBase;
import com.invoicingSystem.main.util.Location;
import com.invoicingSystem.main.warehouse.domain.Warehouse;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */

public class TestWarehouse extends TestBase{
	
	@Test
	public void addWarehouse() {
		Warehouse warehouse = new Warehouse();
		warehouse.setLocation(new Location(1.0,1.0,"东莞理工"));
		warehouse.setName("东753仓库");
		//warehouse.getKeepers().add(userService.findById(8L));
		warehouseService.save(warehouse);
	}
	
	@Test
	public void addKeeper() {
		Warehouse warehouse = warehouseService.findById(1L);
		warehouse.setKeeper(userService.findById(3L));
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
	@Test
	public void testFindByNAme() {
		Warehouse warehouse = warehouseService.findByName("仓库一");
		log.warn(warehouse.getName());
	}
	
	@Test
	public void addCommodities() {
		Warehouse warehouse = warehouseService.findById(1L);
		Commodity commodity = new Commodity();
		commodity = commodityService.findById(1L);
		commodity.setWarehouse(warehouse);
		commodity.setAmount(49);
		commodity.setId(null);
		commodityService.save(commodity);
		warehouse.getCommodities().add(commodity);
		warehouseService.save(warehouse);
	}
}
