package com.invoicingSystem.main.warehouse.service;

import java.util.List;
import java.util.Map;

import com.invoicingSystem.main.warehouse.domain.Warehouse;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */

public interface IWarehouseService {
	public void save(Warehouse warehouse);
	public void delete(Long id);
	public Warehouse findById(Long id);
	public List<Map<String,String>> getAllForMapList();
	public Warehouse findByName(String name);
}
