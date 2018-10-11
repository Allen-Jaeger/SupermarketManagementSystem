package com.invoicingSystem.main.shop.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.invoicingSystem.main.shop.domain.Shop;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@Repository
public interface IShopRepository extends PagingAndSortingRepository<Shop, Long>{
	@Query(value="FROM Shop shop WHERE shop.name IS ?1")
	public Shop findByName(String name);
}
