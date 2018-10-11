package com.invoicingSystem.main.warehouse.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.invoicingSystem.main.warehouse.domain.Warehouse;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@Repository
public interface IWarehouseRepository extends PagingAndSortingRepository<Warehouse, Long>{
	@Query("FROM Warehouse warehouse WHERE warehouse.name IS ?1")
	public Warehouse findByName(String name);
}
