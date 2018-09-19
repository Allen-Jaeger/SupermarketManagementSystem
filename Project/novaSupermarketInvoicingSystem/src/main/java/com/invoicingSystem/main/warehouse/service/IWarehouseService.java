package com.invoicingSystem.main.warehouse.service;

import com.invoicingSystem.main.warehouse.domain.Warehouse;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */

public interface IWarehouseService {
	public void updateWarehouse(Warehouse warehouse);
	public Warehouse findById(Long id);
}
