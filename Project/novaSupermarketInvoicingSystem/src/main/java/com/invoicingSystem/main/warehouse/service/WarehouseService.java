package com.invoicingSystem.main.warehouse.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.invoicingSystem.main.warehouse.domain.Warehouse;
import com.invoicingSystem.main.warehouse.repository.IWarehouseRepository;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@Transactional
@Service
public class WarehouseService implements IWarehouseService {
	@Autowired
	IWarehouseRepository warehouseRepository;
	
	@Override
	public void save(Warehouse warehouse) {
		// TODO Auto-generated method stub
		warehouseRepository.save(warehouse);
	}

	@Override
	public Warehouse findById(Long id) {
		// TODO Auto-generated method stub
		return warehouseRepository.findById(id).get();
	}

}
